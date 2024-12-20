import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AdminRoutes } from "./routes/AdminRoutes";
import { StaffRoutes } from "./routes/StaffRoutes";
import { CustomerRoutes } from "./routes/CustomerRoutes";
import { PublicRoutes } from "./routes/PublicRoutes";
import { useAuth } from "./services/useAuth";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {isAuthenticated ? (
          <>
            {AdminRoutes()}
            {StaffRoutes()}
            {CustomerRoutes()}
          </>
        ) : (
          <>{PublicRoutes()}</>
        )}
        <Route path="/unauthorized" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
