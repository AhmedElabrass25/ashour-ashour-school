import { AppShell } from "../components/layout/AppShell";
import { Dashboard } from "../components/dashboard/Dashboard";
import { FormView } from "../components/form/FormView";
import type { StudentRow, Submission } from "../types";
import type { SchoolFormValues } from "../validation/schoolSchema";

type AdminRouteProps = {
  view: "form" | "dashboard";
  onViewChange: (view: "form" | "dashboard") => void;
  onLogout: () => void;
  submissions: Submission[];
  filter: string;
  setFilter: (value: string) => void;
  typeFilter: string;
  setTypeFilter: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  areaFilter: string;
  setAreaFilter: (value: string) => void;
  onUpdate: (id: number, changes: Partial<Submission>) => void | Promise<void>;
  onDelete: (id: number) => void | Promise<void>;
  rows: StudentRow[];
  updateRow: (
    index: number,
    key: "students" | "classes",
    value: string,
  ) => void;
  submitForm: (
    values: SchoolFormValues,
  ) =>
    | { ok: boolean; message?: string }
    | Promise<{ ok: boolean; message?: string }>;
  submitted: boolean;
  loading: boolean;
  loadError: string;
};

export function AdminRoute({
  view,
  onViewChange,
  onLogout,
  submissions,
  filter,
  setFilter,
  typeFilter,
  setTypeFilter,
  statusFilter,
  setStatusFilter,
  areaFilter,
  setAreaFilter,
  onUpdate,
  onDelete,
  rows,
  updateRow,
  submitForm,
  submitted,
  loading,
  loadError,
}: AdminRouteProps) {
  return (
    <AppShell view={view} onViewChange={onViewChange} onLogout={onLogout}>
      {view === "dashboard" ? (
        <Dashboard
          submissions={submissions}
          filter={filter}
          setFilter={setFilter}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          areaFilter={areaFilter}
          setAreaFilter={setAreaFilter}
          onUpdate={onUpdate}
          onDelete={onDelete}
          loading={loading}
          loadError={loadError}
        />
      ) : (
        <FormView
          rows={rows}
          updateRow={updateRow}
          submitForm={submitForm}
          submitted={submitted}
        />
      )}
    </AppShell>
  );
}
