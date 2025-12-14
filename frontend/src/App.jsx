import { useState } from 'react'
import { BrowserRouter , Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx"
import Signup from './pages/Signup.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import StudentDashboard from './pages/StudentDashboard.jsx'
import TeacherDashboard from './pages/TeacherDashboard.jsx'
import Home from './pages/Home';
// import './App.css

function App() {
 

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/teacher" element={<TeacherDashboard />} />
        </Routes>
      </BrowserRouter>
      {/* <Login/>
      <Signup/>
      <AdminDashboard/>
      <StudentDashBoard/>
      <TeacherDashboard/> */}
    </>
  )
}

export default App
