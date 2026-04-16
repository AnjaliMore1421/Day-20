import React, { useState } from "react";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import AppointmentForm from "./components/AppointmentForm";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patient: "Anjali",
      doctor: "Dr. Sharma",
      date: "2026-04-20",
      reason: "General Checkup",
    },
  ]);

  const [editData, setEditData] = useState(null);

  if (!isLoggedIn) {
    return <Login setIsLoggedIn={setIsLoggedIn} />;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar
        setActivePage={setActivePage}
        setIsLoggedIn={setIsLoggedIn}
      />

      <div style={{ flex: 1, padding: "30px", background: "#f3f4f6" }}>
        {activePage === "dashboard" && (
          <Dashboard appointments={appointments} />
        )}

        {activePage === "appointments" && (
          <AppointmentForm
            appointments={appointments}
            setAppointments={setAppointments}
            editData={editData}
            setEditData={setEditData}
          />
        )}
      </div>
    </div>
  );
}
