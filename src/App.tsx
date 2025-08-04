// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CourseDetail from "./pages/CourseDetail";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Página de inicio pública */}
      <Route path="/" element={<Home />} />

      {/* Login */}
      <Route path="/login" element={<Login />} />

      {/* Registro */}
      <Route path="/register" element={<Register />} />

      {/* Dashboard protegido */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Detalle de curso protegido */}
      <Route
        path="/course/:id"
        element={
          <ProtectedRoute>
            <CourseDetail />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
