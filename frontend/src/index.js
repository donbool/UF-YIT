import React from "react";
import ReactDOM from "react-dom";
//import { Route } from "react-router";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
import StudentDashboard from "./pages/student/StudentSessionDash";
import TutorDashboard from "./pages/tutor/TutorSessionDash";
import AdminDashboard from "./pages/admin/AdminSessionDash";
import ManageProfiles from "./pages/admin/ManageProfiles";
import AdminWelcomePage from "./pages/admin/AdminHome"; // Import AdminWelcomePage
import TutorWelcomePage from "./pages/tutor/TutorHome"; // Import TutorWelcomePage
import StudentWelcomePage from "./pages/student/StudentHome"; // Import StudentWelcomePage
//import ManageStudent from "./ManageStudents";
import PayrollDashboard from "./pages/admin/Payroll/Dashboard.js";
import "./pages/login/Login.css";
import { Announcement } from "@mui/icons-material";
import WeeklyCalendar from "./pages/admin/Announcements";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/student/dashboard" element={<StudentDashboard />} />
      <Route path="/tutor/dashboard" element={<TutorDashboard />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} /> 
      <Route path="/profiles" element={<ManageProfiles />} /> 
      <Route path="/admin/welcome" element={<AdminWelcomePage />} /> 
      <Route path="/tutor/welcome" element={<TutorWelcomePage />} /> 
      <Route path="/student/welcome" element={<StudentWelcomePage />} /> 
      <Route path="/payroll" element={<PayrollDashboard />} /> 
      {/* <Route path="/attendance" element={<WeeklyCalendar />} />  */}
                                                          //remove dashboard.js file and use the ones inside the role folder
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
