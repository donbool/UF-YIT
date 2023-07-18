import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";
import SessionsDashboard from "./Admin/SessionsDashboard/sessionsDashboard";
import ManageProfiles from "./Admin/AccountManagement/accoutManagement";
import WelcomePage from "./WelcomePage";
//import ManageStudent from "./ManageStudents";
import StudentProfiles from "./StudentProfiles";
import StudentInfo from "./StudentInfo";
import PayrollDashboard from "./Admin/Payroll/Dashboard.js";
import Surveys from "./SurveyForm.js";
import "./Login.css";
import { Announcement } from "@mui/icons-material";
import WeeklyCalendar from "./Announcements";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/sessions" element={<SessionsDashboard />} /> //to be changed to admin dashboard or something, 
      <Route path="/ManageProfiles" element={<ManageProfiles />} /> 
      <Route path="/WelcomePage" element={<WelcomePage />} /> 
      <Route path="/student" element={<ManageStudent />} /> 
      <Route path="/payroll" element={<PayrollDashboard />} /> 
      <Route path="/surveys" element={<Surveys />} /> 
                                                          //remove dashboard.js file and use the ones inside the role folder
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
