import React, { useState } from "react";
import { HeartPulse } from "lucide-react";

export default function Login({ setIsLoggedIn }) {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    setError("");

    if (!loginData.username || !loginData.password) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);

    // simulate API call
    setTimeout(() => {
      if (
        loginData.username === "admin" &&
        loginData.password === "admin123"
      ) {
        setIsLoggedIn(true);
      } else {
        setError("Invalid username or password");
      }

      setLoading(false);
    }, 1200);
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <div style={styles.box}>
          <div style={styles.logoBox}>
            <HeartPulse size={40} color="#2563eb" />
            <h2 style={styles.heading}>Hospital Portal</h2>
            <p style={styles.subText}>Welcome back, please login</p>
          </div>

          {/* ERROR MESSAGE (NEW) */}
          {error && <p style={styles.errorText}>{error}</p>}

          <input
            type="text"
            placeholder="Username"
            value={loginData.username}
            onChange={(e) =>
              setLoginData({
                ...loginData,
                username: e.target.value,
              })
            }
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({
                ...loginData,
                password: e.target.value,
              })
            }
            style={styles.input}
          />

          <button
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login to Dashboard"}
          </button>

          <p style={styles.footerText}>
            Use: <b>admin</b> / <b>admin123</b>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 50%, #93c5fd 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
  },

  overlay: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  box: {
    width: "380px",
    padding: "40px",
    background: "rgba(255,255,255,0.9)",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    backdropFilter: "blur(10px)",
    textAlign: "center",
  },

  logoBox: {
    marginBottom: "25px",
  },

  heading: {
    margin: "10px 0 5px",
    color: "#1e3a8a",
    fontSize: "28px",
    fontWeight: "bold",
  },

  subText: {
    color: "#6b7280",
    fontSize: "14px",
    marginBottom: "20px",
  },

  input: {
    width: "100%",
    padding: "14px",
    margin: "12px 0",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    outline: "none",
    fontSize: "15px",
    boxSizing: "border-box",
  },

  button: {
    width: "100%",
    padding: "14px",
    marginTop: "15px",
    background: "linear-gradient(90deg, #2563eb, #1d4ed8)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    boxShadow: "0 4px 12px rgba(37,99,235,0.3)",
  },

  footerText: {
    marginTop: "18px",
    fontSize: "13px",
    color: "#6b7280",
  },

  errorText: {
    color: "#dc2626",
    fontSize: "14px",
    marginBottom: "10px",
    fontWeight: "bold",
  },
};
