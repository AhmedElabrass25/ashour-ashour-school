import { useState } from "react";
import { AppRouter } from "./routes/AppRouter";
import { useSchoolData } from "./hooks/useSchoolData";

function App() {
  const [authenticated, setAuthenticated] = useState(
    () => localStorage.getItem("madarisna_admin_session") === "active",
  );
  const data = useSchoolData(authenticated);
  const logout = () => {
    localStorage.removeItem("madarisna_admin_session");
    setAuthenticated(false);
  };
  return (
    <AppRouter
      authenticated={authenticated}
      onLogin={() => {
        localStorage.setItem("madarisna_admin_session", "active");
        setAuthenticated(true);
      }}
      onLogout={logout}
      submissions={data.filteredSubmissions}
      filter={data.filter}
      setFilter={data.setFilter}
      typeFilter={data.typeFilter}
      setTypeFilter={data.setTypeFilter}
      onUpdate={data.updateSubmission}
      onDelete={data.deleteSubmission}
      rows={data.rows}
      updateRow={data.updateRow}
      submitForm={data.submitForm}
      submitted={data.submitted}
      loading={data.loading}
      loadError={data.loadError}
    />
  );
}

export default App;
