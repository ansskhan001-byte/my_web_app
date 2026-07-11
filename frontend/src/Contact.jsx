import React, { useState } from "react";
import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await API.post("/contact", form);
      setStatus({ type: "success", text: res.data.message });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus({
        type: "error",
        text: err.response?.data?.message || "Failed to send message. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(15,23,42,0.8)",
    color: "white",
    fontSize: 15,
    boxSizing: "border-box",
    outline: "none",
  };

  return (
    <div style={{ maxWidth: 640, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <span style={{ fontSize: 48 }}>📬</span>
        <h1 style={{
          fontSize: 36, fontWeight: 900, margin: "16px 0 8px",
          background: "linear-gradient(135deg, #ffffff 30%, #a7f3d0 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          Contact Us
        </h1>
        <p style={{ color: "#94a3b8", fontSize: 16, lineHeight: 1.6 }}>
          Have a question, feedback, or need help with SquadBuilder? Send us a message and we'll get back to you.
        </p>
      </div>

      <div style={{
        background: "rgba(30, 41, 59, 0.6)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 20,
        padding: 32,
      }}>
        {status && (
          <div style={{
            padding: "14px 18px", borderRadius: 10, marginBottom: 20, fontWeight: 600,
            background: status.type === "success" ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.15)",
            border: `1px solid ${status.type === "success" ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)"}`,
            color: status.type === "success" ? "#34d399" : "#f87171",
          }}>
            {status.text}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 20 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <label style={{ display: "block", marginBottom: 8, fontSize: 13, color: "#94a3b8", fontWeight: 600 }}>Name</label>
              <input
                style={inputStyle}
                required
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: 8, fontSize: 13, color: "#94a3b8", fontWeight: 600 }}>Email</label>
              <input
                style={inputStyle}
                type="email"
                required
                placeholder="you@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label style={{ display: "block", marginBottom: 8, fontSize: 13, color: "#94a3b8", fontWeight: 600 }}>Subject</label>
            <input
              style={inputStyle}
              required
              placeholder="What is this about?"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: 8, fontSize: 13, color: "#94a3b8", fontWeight: 600 }}>Message</label>
            <textarea
              style={{ ...inputStyle, minHeight: 140, resize: "vertical" }}
              required
              placeholder="Tell us how we can help..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              background: loading ? "#374151" : "linear-gradient(135deg, #10b981, #059669)",
              color: "white", border: "none", padding: "14px 28px", borderRadius: 10,
              fontWeight: 700, fontSize: 16, cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 4px 16px rgba(16,185,129,0.25)",
            }}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>

      <div style={{
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginTop: 32,
      }}>
        {[
          { icon: "⚽", title: "Squad Help", desc: "Questions about building your team" },
          { icon: "💰", title: "Budget Issues", desc: "Transfer budget or purchase problems" },
          { icon: "🔧", title: "Technical", desc: "Bug reports or account issues" },
        ].map((item) => (
          <div key={item.title} style={{
            background: "rgba(30,41,59,0.4)", borderRadius: 14, padding: 20, textAlign: "center",
            border: "1px solid rgba(255,255,255,0.06)",
          }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>{item.title}</div>
            <div style={{ fontSize: 13, color: "#64748b" }}>{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Contact;
