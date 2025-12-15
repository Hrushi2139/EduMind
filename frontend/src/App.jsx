import { useState } from 'react'
import { BrowserRouter , Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx"
import Signup from './pages/Signup.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import StudentDashboard from './pages/StudentDashboard.jsx'
import TeacherDashboard from './pages/TeacherDashboard.jsx'
import Home from './pages/Home';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
// import './App.css

function App() {
 

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
            }
          />
          <Route path="/student" element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
            }
          />
          <Route path="/teacher" element={
            <ProtectedRoute>
              <TeacherDashboard />
            </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
