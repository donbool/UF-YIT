import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";
import StudentDashboard from "./Student/StudentDashboard";
import TutorDashboard from "./Tutor/TutorDashboard";
import AdminDashboard from "./Admin/AdminDashboard";
import ManageProfiles from "./Admin/ManageProfiles";
import AdminWelcomePage from "./Admin/AdminHome"; // Import AdminWelcomePage
import TutorWelcomePage from "./Tutor/TutorHome"; // Import TutorWelcomePage
import StudentWelcomePage from "./Student/StudentHome"; // Import StudentWelcomePage
import ManageStudent from "./Admin/ManageStudents";
import "./Login.css";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/student/dashboard" element={<StudentDashboard />} />
      <Route path="/tutor/dashboard" element={<TutorDashboard />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/profiles" element={<ManageProfiles />} />
      <Route path="/admin/welcome" element={<AdminWelcomePage />} /> // Add AdminWelcomePage route
      <Route path="/tutor/welcome" element={<TutorWelcomePage />} /> // Add TutorWelcomePage route
      <Route path="/student/welcome" element={<StudentWelcomePage />} /> // Add StudentWelcomePage route
      <Route path="/student" element={<ManageStudent />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
