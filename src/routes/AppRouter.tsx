import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { Login } from "../components/auth/Login";
import type { StudentRow, Submission } from "../types";
import type { SchoolFormValues } from "../validation/schoolSchema";
import { AdminRoute } from "./AdminRoute";
import { PublicFormRoute } from "./PublicFormRoute";
import { LeadershipPage } from "../components/leadership/LeadershipPage";

type AppRouterProps = {
  authenticated: boolean;
  onLogin: () => void;
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

export function AppRouter(props: AppRouterProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<LeadershipPage submissions={props.submissions} />}
        />
        <Route
          path="/login"
          element={
            <LoginEntry
              authenticated={props.authenticated}
              onLogin={props.onLogin}
            />
          }
        />
        <Route
          path="/form"
          element={
            <PublicFormRoute
              rows={props.rows}
              updateRow={props.updateRow}
              submitForm={props.submitForm}
              submitted={props.submitted}
            />
          }
        />
        <Route path="/dashboard" element={<DashboardEntry {...props} />} />
        <Route
          path="/dashboard/schools/:schoolId"
          element={<Navigate to="/dashboard" replace />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

function LoginEntry({
  authenticated,
  onLogin,
}: {
  authenticated: boolean;
  onLogin: () => void;
}) {
  const navigate = useNavigate();
  if (authenticated) return <Navigate to="/dashboard" replace />;
  return (
    <Login
      onLogin={() => {
        onLogin();
        navigate("/dashboard");
      }}
    />
  );
}

function DashboardEntry(props: AppRouterProps) {
  const navigate = useNavigate();
  if (!props.authenticated) return <Login onLogin={props.onLogin} />;
  return (
    <AdminRoute
      view="dashboard"
      onViewChange={(view) =>
        navigate(view === "form" ? "/form" : "/dashboard")
      }
      onLogout={props.onLogout}
      submissions={props.submissions}
      filter={props.filter}
      setFilter={props.setFilter}
      typeFilter={props.typeFilter}
      setTypeFilter={props.setTypeFilter}
      statusFilter={props.statusFilter}
      setStatusFilter={props.setStatusFilter}
      areaFilter={props.areaFilter}
      setAreaFilter={props.setAreaFilter}
      onUpdate={props.onUpdate}
      onDelete={props.onDelete}
      rows={props.rows}
      updateRow={props.updateRow}
      submitForm={props.submitForm}
      submitted={props.submitted}
      loading={props.loading}
      loadError={props.loadError}
    />
  );
}
