import React, { useState } from "react";
import {
  Users,
  Calendar,
  Stethoscope,
  LogOut,
  Bell,
  Activity,
  Lock,
  Mail,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Card = ({ children, style = {} }) => (
  <div
    style={{
      background: "white",
      borderRadius: "18px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      ...style,
    }}
  >
    {children}
  </div>
);

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [appointment, setAppointment] = useState({
    patientName: "",
    doctorName: "",
    date: "",
    time: "",
  });

  const [appointments, setAppointments] = useState([
    {
      patientName: "Rahul Sharma",
      doctorName: "Dr. Mehta",
      date: "2026-04-18",
      time: "10:30",
    },
    {
      patientName: "Priya Verma",
      doctorName: "Dr. Patil",
      date: "2026-04-19",
      time: "12:00",
    },
  ]);

  const handleLogin = () => {
    if (username.trim() && password.trim()) {
      setIsLoggedIn(true);
    } else {
      alert("Please enter username and password");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
  };

  const handleAppointmentSubmit = (e) => {
    e.preventDefault();

    const newAppointment = { ...appointment };

    setAppointments([...appointments, newAppointment]);

    alert("Appointment booked successfully!");

    setAppointment({
      patientName: "",
      doctorName: "",
      date: "",
      time: "",
    });
  };

  const stats = [
    { title: "Patients", value: "1,248", sub: "+12 today", icon: <Users size={22} /> },
    { title: "Appointments", value: appointments.length, sub: "Updated", icon: <Calendar size={22} /> },
    { title: "Doctors", value: "42", sub: "On duty", icon: <Stethoscope size={22} /> },
    { title: "Emergency", value: "12", sub: "Critical", icon: <Activity size={22} /> },
  ];

  const chartData = [
    { day: "Mon", patients: 30 },
    { day: "Tue", patients: 45 },
    { day: "Wed", patients: 38 },
    { day: "Thu", patients: 52 },
    { day: "Fri", patients: 47 },
    { day: "Sat", patients: 60 },
    { day: "Sun", patients: 55 },
  ];

  const recentPatients = [
    "Rahul Sharma",
    "Priya Patel",
    "Amit Joshi",
    "Sneha More",
  ];

  // LOGIN PAGE
  if (!isLoggedIn) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg,#1e3a8a,#2563eb)",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <Card style={{ width: "400px", padding: "35px" }}>
          <h1 style={{ textAlign: "center", fontSize: "34px" }}>
            MediCare Login
          </h1>

          <div style={{ marginTop: "25px" }}>
            <label>Username</label>
            <div
              style={{
                display: "flex",
                gap: "10px",
                border: "1px solid #ddd",
                padding: "12px",
                borderRadius: "10px",
                marginTop: "8px",
              }}
            >
              <Mail size={18} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ border: "none", outline: "none", width: "100%" }}
              />
            </div>
          </div>

          <div style={{ marginTop: "20px" }}>
            <label>Password</label>
            <div
              style={{
                display: "flex",
                gap: "10px",
                border: "1px solid #ddd",
                padding: "12px",
                borderRadius: "10px",
                marginTop: "8px",
              }}
            >
              <Lock size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ border: "none", outline: "none", width: "100%" }}
              />
            </div>
          </div>

          <button
            onClick={handleLogin}
            style={{
              width: "100%",
              padding: "14px",
              marginTop: "25px",
              background: "#111827",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </Card>
      </div>
    );
  }

  // DASHBOARD
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3f4f6",
        padding: "30px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "30px",
        }}
      >
        <div>
          <h2 style={{ fontSize: "36px", fontWeight: "bold" }}>
            Hospital Dashboard
          </h2>
          <p style={{ color: "gray" }}>Welcome back, {username}</p>
        </div>

        <button
          onClick={handleLogout}
          style={{
            padding: "10px 18px",
            borderRadius: "10px",
            border: "none",
            background: "#111827",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
          }}
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        {stats.map((card) => (
          <Card key={card.title} style={{ padding: "20px" }}>
            {card.icon}
            <p style={{ color: "gray", marginTop: "10px" }}>{card.title}</p>
            <h3 style={{ fontSize: "28px" }}>{card.value}</h3>
            <p style={{ color: "gray", fontSize: "14px" }}>{card.sub}</p>
          </Card>
        ))}
      </div>

      {/* Chart */}
      <Card style={{ padding: "20px", marginBottom: "30px" }}>
        <h3 style={{ marginBottom: "20px", fontSize: "22px" }}>
          Weekly Patients
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line dataKey="patients" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Appointment Form */}
      <Card style={{ padding: "25px", marginBottom: "30px" }}>
        <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>
          Book Appointment
        </h2>

        <form onSubmit={handleAppointmentSubmit}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              gap: "15px",
            }}
          >
            <input
              type="text"
              placeholder="Patient Name"
              value={appointment.patientName}
              onChange={(e) =>
                setAppointment({
                  ...appointment,
                  patientName: e.target.value,
                })
              }
              required
            />

            <input
              type="text"
              placeholder="Doctor Name"
              value={appointment.doctorName}
              onChange={(e) =>
                setAppointment({
                  ...appointment,
                  doctorName: e.target.value,
                })
              }
              required
            />

            <input
              type="date"
              value={appointment.date}
              onChange={(e) =>
                setAppointment({
                  ...appointment,
                  date: e.target.value,
                })
              }
              required
            />

            <input
              type="time"
              value={appointment.time}
              onChange={(e) =>
                setAppointment({
                  ...appointment,
                  time: e.target.value,
                })
              }
              required
            />
          </div>

          <button
            type="submit"
            style={{
              marginTop: "20px",
              padding: "12px 20px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            Book Appointment
          </button>
        </form>
      </Card>

      {/* Appointments List */}
      <Card style={{ padding: "25px", marginBottom: "30px" }}>
        <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>
          Upcoming Appointments
        </h2>

        {appointments.map((appt, index) => (
          <div
            key={index}
            style={{
              padding: "15px",
              background: "#f9fafb",
              borderRadius: "10px",
              marginBottom: "10px",
            }}
          >
            <strong>{appt.patientName}</strong> with {appt.doctorName}
            <br />
            {appt.date} • {appt.time}
          </div>
        ))}
      </Card>

      {/* Recent Patients */}
      <Card style={{ padding: "20px" }}>
        <h3 style={{ marginBottom: "20px", fontSize: "22px" }}>
          Recent Patients
        </h3>

        {recentPatients.map((name) => (
          <div
            key={name}
            style={{
              padding: "12px",
              marginBottom: "10px",
              background: "#f9fafb",
              borderRadius: "10px",
            }}
          >
            {name}
          </div>
        ))}
      </Card>
    </div>
  );
}
