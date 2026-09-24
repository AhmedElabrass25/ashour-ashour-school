import { Navigate, useNavigate } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { AdminRoute } from "./AdminRoute";
import type { AppRouterProps } from "./AppRouterTypes";

export function LoginEntry({
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

export function DashboardEntry(props: AppRouterProps) {
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
