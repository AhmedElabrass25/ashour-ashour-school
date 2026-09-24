import { useState, useEffect } from "react";
import type { Submission } from "../../types";
import { DashboardStats } from "./DashboardStats";
import { DashboardToolbar } from "./DashboardToolbar";
import { SubmissionsTable } from "./SubmissionsTable";
import { SchoolDetailsModal } from "./SchoolDetailsModal";
import { DashboardPagination, DashboardStateNotices } from "./DashboardStateNotices";
import { DashboardHeader } from "./DashboardHeader";

const PAGE_SIZE = 6;

type DashboardProps = {
  submissions: Submission[];
  filter: string; setFilter: (value: string) => void;
  typeFilter: string; setTypeFilter: (value: string) => void;
  statusFilter: string; setStatusFilter: (value: string) => void;
  areaFilter: string; setAreaFilter: (value: string) => void;
  onUpdate: (id: number, changes: Partial<Submission>) => void | Promise<void>;
  onDelete: (id: number) => void | Promise<void>;
  loading: boolean; loadError: string;
};

export function Dashboard({ submissions, filter, setFilter, typeFilter, setTypeFilter, statusFilter, setStatusFilter, areaFilter, setAreaFilter, onUpdate, onDelete, loading, loadError }: DashboardProps) {
  const [selectedSchool, setSelectedSchool] = useState<Submission | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => { setCurrentPage(1); }, [filter, typeFilter, statusFilter, areaFilter, submissions.length]);

  const totalPages = Math.max(1, Math.ceil(submissions.length / PAGE_SIZE));
  const pagedSubmissions = submissions.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 pb-12">
      <DashboardHeader submissions={submissions} loading={loading} />
      <DashboardStats submissions={submissions} />
      <DashboardStateNotices loading={loading} loadError={loadError} count={submissions.length} />

      <div className="flex flex-col gap-4 mt-2">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">البيانات الواردة للمدارس</h2>
            <p className="text-slate-600 text-sm font-semibold">اضغط على أي مدرسة لمراجعة وتعديل بياناتها فورًا</p>
          </div>
          {submissions.length > 0 && (
            <span className="text-sm font-semibold text-slate-500">
              {submissions.length} مدرسة · صفحة {currentPage} من {totalPages}
            </span>
          )}
        </div>
        <DashboardToolbar filter={filter} setFilter={setFilter} typeFilter={typeFilter} setTypeFilter={setTypeFilter} statusFilter={statusFilter} setStatusFilter={setStatusFilter} areaFilter={areaFilter} setAreaFilter={setAreaFilter} />
        <SubmissionsTable submissions={pagedSubmissions} onOpen={(item) => setSelectedSchool(item)} />
        <DashboardPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>

      {selectedSchool && (
        <SchoolDetailsModal item={selectedSchool} onClose={() => setSelectedSchool(null)} onUpdate={onUpdate} onDelete={onDelete} />
      )}
    </div>
  );
}
