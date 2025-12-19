import { useState } from 'react'
import { BrowserRouter , Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx"
import Signup from './pages/Signup.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import StudentDashboard from './pages/StudentDashboard.jsx'
import TeacherDashboard from './pages/TeacherDashboard.jsx'
import Home from './pages/Home';
import Unauthorized from "./pages/Unauthorized.jsx";

import RoleProtectedRoute from './routes/RoleProtectedRoute.jsx'
// import './App.css

function App() {
 

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          <Route
            path="/admin"
            element={
              <RoleProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </RoleProtectedRoute>
            }
          />
          <Route
              path="/student"
              element={
                <RoleProtectedRoute allowedRoles={["student"]}>
                  <StudentDashboard />
                </RoleProtectedRoute>
              }
            />

          <Route
            path="/teacher"
            element={
              <RoleProtectedRoute allowedRoles={["teacher"]}>
                <TeacherDashboard />
              </RoleProtectedRoute>
            }
          />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
