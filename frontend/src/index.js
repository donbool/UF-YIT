import React from "react";
import ReactDOM from "react-dom";
//import { Route } from "react-router";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Admin/AdminDashboard";
import "./Login.css";
import AdminDashboard from "./Admin/AdminDashboard";

//rn index.js is only goin to admin dashboard

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} /> //to be changed to admin dashboard or something, 
                                                          //remove dashboard.js file and use the ones inside the role folder
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
