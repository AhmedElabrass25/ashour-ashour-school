import { useEffect, useMemo, useState } from "react";
import { initialRows } from "../data/schoolData";
import { supabase } from "../lib/supabase";
import { toSubmission } from "../lib/submissionMapper";
import type { StudentRow, Submission } from "../types";
import type { SchoolFormValues } from "../validation/schoolSchema";

function removeSecondaryRows(rows: StudentRow[]) {
  return rows.filter(
    (row) => !row.level.includes("الثانوي") && !row.level.includes("ثانوي"),
  );
}

export function useSchoolData(_authenticated?: boolean) {
  const [rows, setRows] = useState(initialRows);
  const [submitted, setSubmitted] = useState(false);
  const [filter, setFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("الكل");
  const [statusFilter, setStatusFilter] = useState("الكل");
  const [areaFilter, setAreaFilter] = useState("الكل");
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    if (!supabase) return;
    setLoading(true);
    setLoadError("");
    void supabase
      .listSubmissions()
      .then(({ data, error }) => {
        if (data) setSubmissions(data.map(toSubmission));
        if (error) setLoadError(error.message);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredSubmissions = useMemo(
    () =>
      submissions.filter(
        (item) =>
          (item.schoolName.includes(filter) ||
            item.principal.includes(filter) ||
            (item.schoolCode && item.schoolCode.includes(filter))) &&
          (typeFilter === "الكل" || item.schoolType === typeFilter) &&
          (statusFilter === "الكل" || item.status === statusFilter) &&
          (areaFilter === "الكل" || item.area === areaFilter),
      ),
    [filter, submissions, typeFilter, statusFilter, areaFilter],
  );

  const updateRow = (
    index: number,
    key: "students" | "classes",
    value: string,
  ) =>
    setRows((current) => {
      const targetLevel = current[index]?.level;
      return current.map((row, rowIndex) => {
        if (key === "classes" && targetLevel && row.level === targetLevel) {
          return { ...row, classes: value };
        }
        if (rowIndex === index) {
          return { ...row, [key]: value };
        }
        return row;
      });
    });

  const submitForm = async (
    values: SchoolFormValues,
  ): Promise<{ ok: boolean; message?: string }> => {
    // 1. Check for duplicate school name or code
    const normName = values.schoolName.trim().toLowerCase();
    const normCode = values.schoolCode ? values.schoolCode.trim().toLowerCase() : "";

    const duplicateName = submissions.some(
      (sub) => sub.schoolName.trim().toLowerCase() === normName
    );

    const duplicateCode = Boolean(
      normCode &&
        submissions.some(
          (sub) => sub.schoolCode && sub.schoolCode.trim().toLowerCase() === normCode
        )
    );

    if (duplicateName) {
      return {
        ok: false,
        message: `عذرًا، اسم المدرسة "${values.schoolName}" مسجّل مسبقًا في النظام، ولا يمكن تكراره.`,
      };
    }

    if (duplicateCode) {
      return {
        ok: false,
        message: `عذرًا، الكود التعريفي "${values.schoolCode}" مسجّل مسبقًا بمدرسة أخرى، ولا يمكن تكراره.`,
      };
    }

    const schoolRows = removeSecondaryRows(rows);
    const payload = {
      school_name: values.schoolName,
      school_code: values.schoolCode,
      school_type: values.schoolType,
      area: values.area,
      shift: values.shift,
      available_spaces: Number(values.availableSpaces),
      fire_hoses: Number(values.fireHoses),
      water_tanks: Number(values.waterTanks),
      water_tanks_status: values.waterTanksStatus,
      fire_hydrants: Number(values.fireHydrants),
      principal_name: values.principal,
      principal_code: values.principalCode,
      principal_national_id: values.nationalId,
      principal_phone: values.phone,
      principal_type: values.principalType,
      deputy_name: values.deputy,
      deputy_code: values.deputyCode,
      deputy_national_id: values.deputyNationalId,
      deputy_phone: values.deputyPhone,
      deputy_type: values.deputyType,
      students: schoolRows,
    };

    if (supabase) {
      const result = await supabase.insertSubmission(payload);
      if (result.error) return { ok: false, message: result.error.message };
    }

    const studentTotal = rows.reduce(
      (sum, row) => sum + Number(row.students || 0),
      0,
    );
    const seenLevels = new Set<string>();
    const classTotal = schoolRows.reduce((sum, row) => {
      if (!seenLevels.has(row.level)) {
        seenLevels.add(row.level);
        const rawVal = Number(row.classes || 0);
        const sanitized = rawVal > 40 ? Math.max(1, Math.round(rawVal / 35)) : rawVal;
        return sum + sanitized;
      }
      return sum;
    }, 0);

    setSubmissions((current) => [
      {
        id: Date.now(),
        schoolName: values.schoolName,
        schoolCode: payload.school_code,
        principal: values.principal,
        principalCode: payload.principal_code,
        principalNationalId: payload.principal_national_id,
        principalPhone: payload.principal_phone,
        principalType: payload.principal_type,
        deputyName: payload.deputy_name,
        deputyCode: payload.deputy_code,
        deputyNationalId: payload.deputy_national_id,
        deputyPhone: payload.deputy_phone,
        deputyType: payload.deputy_type,
        availableSpaces: payload.available_spaces,
        fireHoses: payload.fire_hoses,
        waterTanks: payload.water_tanks,
        waterTanksStatus: payload.water_tanks_status,
        fireHydrants: payload.fire_hydrants,
        studentRows: schoolRows,
        schoolType: payload.school_type,
        area: payload.area,
        shift: payload.shift,
        students: studentTotal,
        classes: classTotal,
        status: "مراجعة",
      },
      ...current,
    ]);
    setSubmitted(true);
    return { ok: true };
  };

  const updateSubmission = async (id: number, changes: Partial<Submission>) => {
    if (
      supabase &&
      (
        await supabase.updateSubmission(id, {
          school_name: changes.schoolName,
          school_code: changes.schoolCode,
          school_type: changes.schoolType,
          area: changes.area,
          shift: changes.shift,
          available_spaces: changes.availableSpaces,
          fire_hoses: changes.fireHoses,
          water_tanks: changes.waterTanks,
          water_tanks_status: changes.waterTanksStatus,
          fire_hydrants: changes.fireHydrants,
          principal_name: changes.principal,
          principal_code: changes.principalCode,
          principal_national_id: changes.principalNationalId,
          principal_phone: changes.principalPhone,
          principal_type: changes.principalType,
          deputy_name: changes.deputyName,
          deputy_code: changes.deputyCode,
          deputy_national_id: changes.deputyNationalId,
          deputy_phone: changes.deputyPhone,
          deputy_type: changes.deputyType,
          students: changes.studentRows
            ? removeSecondaryRows(changes.studentRows)
            : changes.studentRows,
          status: changes.status,
        })
      ).error
    )
      return;

    setSubmissions((current) =>
      current.map((item) => (item.id === id ? { ...item, ...changes } : item)),
    );
  };

  const deleteSubmission = async (id: number) => {
    if (supabase && (await supabase.deleteSubmission(id)).error) return;
    setSubmissions((current) => current.filter((item) => item.id !== id));
  };

  return {
    rows,
    submitted,
    filter,
    setFilter,
    typeFilter,
    setTypeFilter,
    statusFilter,
    setStatusFilter,
    areaFilter,
    setAreaFilter,
    filteredSubmissions,
    loading,
    loadError,
    updateRow,
    submitForm,
    updateSubmission,
    deleteSubmission,
  };
}
