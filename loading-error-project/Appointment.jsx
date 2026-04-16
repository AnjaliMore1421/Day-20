import React, { useState } from "react";
import { CalendarPlus, Pencil, Trash2 } from "lucide-react";
import StatusMessage from "./StatusMessage";

export default function AppointmentForm({
  appointments,
  setAppointments,
}) {
  const [formData, setFormData] = useState({
    patient: "",
    doctor: "",
    date: "",
    reason: "",
  });

  const [editId, setEditId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    setError("");

    if (
      !formData.patient ||
      !formData.doctor ||
      !formData.date ||
      !formData.reason
    ) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      if (editId) {
        const updatedAppointments = appointments.map((item) =>
          item.id === editId
            ? { ...formData, id: editId, status: "Pending" }
            : item
        );

        setAppointments(updatedAppointments);
        setEditId(null);
      } else {
        const newAppointment = {
          ...formData,
          id: Date.now(),
          status: "Pending",
        };

        setAppointments([...appointments, newAppointment]);
      }

      setFormData({
        patient: "",
        doctor: "",
        date: "",
        reason: "",
      });

      setLoading(false);
    }, 1000);
  };

  const handleDelete = (id) => {
    const filtered = appointments.filter(
      (item) => item.id !== id
    );
    setAppointments(filtered);
  };

  const handleEdit = (item) => {
    setFormData({
      patient: item.patient,
      doctor: item.doctor,
      date: item.date,
      reason: item.reason,
    });

    setEditId(item.id);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Appointment Management</h1>

      {/* STATUS (LOADING / ERROR) */}
      <StatusMessage loading={loading} error={error} />

      {/* FORM */}
      <div style={styles.formCard}>
        <input
          placeholder="Patient Name"
          value={formData.patient}
          onChange={(e) =>
            setFormData({ ...formData, patient: e.target.value })
          }
          style={styles.input}
        />

        <input
          placeholder="Doctor Name"
          value={formData.doctor}
          onChange={(e) =>
            setFormData({ ...formData, doctor: e.target.value })
          }
          style={styles.input}
        />

        <input
          type="date"
          value={formData.date}
          onChange={(e) =>
            setFormData({ ...formData, date: e.target.value })
          }
          style={styles.input}
        />

        <input
          placeholder="Reason"
          value={formData.reason}
          onChange={(e) =>
            setFormData({ ...formData, reason: e.target.value })
          }
          style={styles.input}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            ...styles.addButton,
            opacity: loading ? 0.7 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          <CalendarPlus size={18} />
          {loading
            ? "Processing..."
            : editId
            ? "Update Appointment"
            : "Add Appointment"}
        </button>
      </div>

      {/* LIST */}
      <div style={styles.listContainer}>
        {appointments.length === 0 ? (
          <p style={styles.emptyText}>
            No appointments available
          </p>
        ) : (
          appointments.map((item) => (
            <div key={item.id} style={styles.card}>
              <h3 style={styles.cardTitle}>{item.patient}</h3>

              <p><b>Doctor:</b> {item.doctor}</p>
              <p><b>Date:</b> {item.date}</p>
              <p><b>Reason:</b> {item.reason}</p>

              <div style={styles.buttonGroup}>
                <button
                  onClick={() => handleEdit(item)}
                  style={styles.editButton}
                >
                  <Pencil size={16} />
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  style={styles.deleteButton}
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  container: {
    padding: "30px",
    background: "#f8fafc",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
  },

  heading: {
    color: "#1e3a8a",
    marginBottom: "20px",
  },

  formCard: {
    background: "white",
    padding: "25px",
    borderRadius: "16px",
    boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
    marginBottom: "30px",
    display: "grid",
    gap: "15px",
  },

  input: {
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    outline: "none",
    fontSize: "14px",
  },

  addButton: {
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "14px",
    borderRadius: "10px",
    fontWeight: "bold",
  },

  listContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
  },

  cardTitle: {
    color: "#1e3a8a",
    marginBottom: "10px",
  },

  buttonGroup: {
    marginTop: "15px",
    display: "flex",
    gap: "10px",
  },

  editButton: {
    flex: 1,
    background: "#f59e0b",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "8px",
  },

  deleteButton: {
    flex: 1,
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "8px",
  },

  emptyText: {
    color: "#6b7280",
  },
};
