import React, { useState } from "react";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Appointment from "./components/Appointment";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");
  const [appointments, setAppointments] = useState([]);

  // LOGIN SCREEN
  if (!isLoggedIn) {
    return <Login setIsLoggedIn={setIsLoggedIn} />;
  }

  return (
    <div style={styles.appContainer}>
      {/* SIDEBAR */}
      <Sidebar
        setActivePage={setActivePage}
        activePage={activePage}
        setIsLoggedIn={setIsLoggedIn}
      />

      {/* MAIN CONTENT */}
      <div style={styles.mainContent}>
        {activePage === "dashboard" && (
          <Dashboard appointments={appointments} />
        )}

        {activePage === "appointments" && (
          <Appointment
            appointments={appointments}
            setAppointments={setAppointments}
          />
        )}
      </div>
    </div>
  );
}

const styles = {
  appContainer: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
  },

  mainContent: {
    flex: 1,
    background: "#f8fafc",
  },
};
