import React, { useEffect, useState } from "react";
import {
  CalendarCheck,
  Users,
  Activity,
  Bell,
} from "lucide-react";
import StatusMessage from "./StatusMessage";

export default function Dashboard({ appointments }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // simulate API call
  useEffect(() => {
    setLoading(true);
    setError("");

    const timer = setTimeout(() => {
      const fail = Math.random() < 0.15;

      if (fail) {
        setError("Failed to load dashboard data");
      }

      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, [appointments]);

  const pending = appointments.filter(
    (item) => item.status === "Pending"
  ).length;

  const completed = appointments.filter(
    (item) => item.status === "Completed"
  ).length;

  if (loading || error) {
    return (
      <div style={styles.center}>
        <StatusMessage loading={loading} error={error} />
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.heading}>Hospital Dashboard</h1>
          <p style={styles.subText}>Welcome back, Admin</p>
        </div>

        <div style={styles.notification}>
          <Bell size={22} />
        </div>
      </div>

      {/* Cards */}
      <div style={styles.cardsContainer}>
        <div style={styles.card}>
          <CalendarCheck size={35} color="#2563eb" />
          <h2>{appointments.length}</h2>
          <p>Total Appointments</p>
        </div>

        <div style={styles.card}>
          <Users size={35} color="#10b981" />
          <h2>{pending}</h2>
          <p>Pending Cases</p>
        </div>

        <div style={styles.card}>
          <Activity size={35} color="#f59e0b" />
          <h2>{completed}</h2>
          <p>Completed Cases</p>
        </div>
      </div>

      {/* Table */}
      <div style={styles.tableBox}>
        <h3 style={styles.sectionTitle}>Recent Appointments</h3>

        {appointments.length === 0 ? (
          <p style={styles.emptyText}>
            No appointments added yet
          </p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((item) => (
                <tr key={item.id}>
                  <td>{item.patient}</td>
                  <td>{item.doctor}</td>
                  <td>{item.date}</td>
                  <td>
                    <span
                      style={{
                        padding: "5px 10px",
                        borderRadius: "8px",
                        background:
                          item.status === "Completed"
                            ? "#dcfce7"
                            : "#fef3c7",
                        color:
                          item.status === "Completed"
                            ? "#166534"
                            : "#92400e",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      {item.status || "Pending"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  container: {
    padding: "30px",
    minHeight: "100vh",
    background: "#f8fafc",
    fontFamily: "Arial, sans-serif",
  },

  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "60vh",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },

  heading: {
    margin: 0,
    fontSize: "30px",
    color: "#1e3a8a",
  },

  subText: {
    marginTop: "5px",
    color: "#6b7280",
  },

  notification: {
    background: "white",
    padding: "12px",
    borderRadius: "50%",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    cursor: "pointer",
  },

  cardsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    marginBottom: "30px",
  },

  card: {
    background: "white",
    padding: "25px",
    borderRadius: "16px",
    boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
    textAlign: "center",
  },

  tableBox: {
    background: "white",
    padding: "25px",
    borderRadius: "16px",
    boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
  },

  sectionTitle: {
    marginBottom: "20px",
    color: "#1e3a8a",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  emptyText: {
    color: "#6b7280",
  },
};
