import React from "react";

export default function StatusMessage({ loading, error }) {
  if (loading) {
    return (
      <p style={styles.loading}>
        Loading...
      </p>
    );
  }

  if (error) {
    return (
      <p style={styles.error}>
        {error}
      </p>
    );
  }

  return null;
}

const styles = {
  loading: {
    color: "#2563eb",
    fontWeight: "bold",
    fontSize: "16px",
    margin: "10px 0",
  },

  error: {
    color: "#dc2626",
    fontWeight: "bold",
    fontSize: "16px",
    margin: "10px 0",
  },
};
