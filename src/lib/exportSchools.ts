import * as XLSX from "xlsx";
import type { Submission } from "../types";

export function exportSchoolsToExcel(submissions: Submission[]) {
  const data = submissions.map((item, index) => {
    const studentDetails = (item.studentRows || [])
      .map(
        (row) =>
          `${row.level} (${row.gender}): ${row.students} طالب - ${row.classes} فصل`
      )
      .join(" | ");

    return {
      "م": index + 1,
      "اسم المدرسة": item.schoolName,
      "الكود التعريفي": item.schoolCode || "غير مسجل",
      "نوع المدرسة": item.schoolType,
      "النطاق الجغرافي": item.area,
      "الفترة الدراسية": item.shift,
      "الفراغات الصالحة": item.availableSpaces || 0,
      "خراطيم الحريق": item.fireHoses || 0,
      "خزانات المياه": item.waterTanks || 0,
      "حالة الخزانات": item.waterTanksStatus || "صالح",
      "حنفيات الحريق": item.fireHydrants || 0,
      "اسم المدير": item.principal,
      "كود المدير": item.principalCode || "-",
      "الرقم القومي للمدير": item.principalNationalId || "-",
      "هاتف المدير": item.principalPhone || "-",
      "طبيعة عمل المدير": item.principalType || "أصلي",
      "اسم الوكيل": item.deputyName || "-",
      "كود الوكيل": item.deputyCode || "-",
      "الرقم القومي للوكيل": item.deputyNationalId || "-",
      "هاتف الوكيل": item.deputyPhone || "-",
      "طبيعة عمل الوكيل": item.deputyType || "-",
      "إجمالي الطلاب": item.students,
      "إجمالي الفصول": item.classes,
      "حالة البيان": item.status,
      "تفاصيل الفصول والصفوف": studentDetails,
    };
  });

  const worksheet = XLSX.utils.json_to_sheet(data);
  
  // Set Right-To-Left view for Arabic Excel layout
  worksheet["!views"] = [{ RTL: true }];

  // Column width specifications for optimal Excel readability
  worksheet["!cols"] = [
    { wch: 6 },   // م
    { wch: 32 },  // اسم المدرسة
    { wch: 16 },  // الكود التعريفي
    { wch: 15 },  // نوع المدرسة
    { wch: 14 },  // النطاق
    { wch: 14 },  // الفترة
    { wch: 16 },  // الفراغات الصالحة
    { wch: 14 },  // خراطيم الحريق
    { wch: 14 },  // خزانات المياه
    { wch: 14 },  // حالة الخزانات
    { wch: 14 },  // حنفيات الحريق
    { wch: 26 },  // اسم المدير
    { wch: 15 },  // كود المدير
    { wch: 18 },  // الرقم القومي للمدير
    { wch: 15 },  // هاتف المدير
    { wch: 16 },  // طبيعة عمل المدير
    { wch: 26 },  // اسم الوكيل
    { wch: 15 },  // كود الوكيل
    { wch: 18 },  // الرقم القومي للوكيل
    { wch: 15 },  // هاتف الوكيل
    { wch: 16 },  // طبيعة عمل الوكيل
    { wch: 15 },  // إجمالي الطلاب
    { wch: 15 },  // إجمالي الفصول
    { wch: 14 },  // حالة البيان
    { wch: 60 },  // تفاصيل الفصول والصفوف
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "بيانات المدارس");

  const today = new Date().toISOString().slice(0, 10);
  XLSX.writeFile(workbook, `بيانات_مدارسنا_${today}.xlsx`);
}
