import React from "react";
import {
  LayoutDashboard,
  Calendar,
  LogOut,
  HeartPulse,
} from "lucide-react";

export default function Sidebar({
  setActivePage,
  setIsLoggedIn,
}) {
  return (
    <div style={styles.sidebar}>
      {/* Logo */}
      <div style={styles.logoSection}>
        <HeartPulse size={32} color="#60a5fa" />
        <h2 style={styles.logoText}>MediCare</h2>
      </div>

      {/* Navigation */}
      <div style={styles.navSection}>
        <button
          style={styles.button}
          onClick={() => setActivePage("dashboard")}
        >
          <LayoutDashboard size={18} />
          Dashboard
        </button>

        <button
          style={styles.button}
          onClick={() => setActivePage("appointments")}
        >
          <Calendar size={18} />
          Appointments
        </button>
      </div>

      {/* Logout */}
      <button
        style={styles.logoutButton}
        onClick={() => setIsLoggedIn(false)}
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "260px",
    minHeight: "100vh",
    background:
      "linear-gradient(180deg, #1e3a8a 0%, #1f2937 100%)",
    color: "white",
    padding: "25px 20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    boxShadow: "4px 0 12px rgba(0,0,0,0.15)",
    fontFamily: "Arial, sans-serif",
  },

  logoSection: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "40px",
  },

  logoText: {
    margin: 0,
    fontSize: "24px",
    fontWeight: "bold",
  },

  navSection: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    flex: 1,
  },

  button: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "14px",
    border: "none",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.08)",
    color: "white",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "500",
    textAlign: "left",
    transition: "0.3s",
  },

  logoutButton: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "14px",
    border: "none",
    borderRadius: "12px",
    background: "#ef4444",
    color: "white",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "bold",
  },
};
