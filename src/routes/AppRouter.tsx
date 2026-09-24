import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { PublicFormRoute } from "./PublicFormRoute";
import { LeadershipPage } from "../components/leadership/LeadershipPage";
import { DashboardEntry, LoginEntry } from "./RouterEntries";
import type { AppRouterProps } from "./AppRouterTypes";

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
