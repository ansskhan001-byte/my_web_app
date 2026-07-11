import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

const WELCOME = {
  role: "bot",
  text: "Hi! I'm the SquadBuilder AI assistant. Ask me anything about this website — registration, transfer market, budget, Starting XI, and more!",
};

function formatText(text) {
  return text.split("\n").map((line, i) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    return (
      <span key={i}>
        {parts.map((part, j) =>
          part.startsWith("**") && part.endsWith("**")
            ? <strong key={j}>{part.slice(2, -2)}</strong>
            : part
        )}
        {i < text.split("\n").length - 1 && <br />}
      </span>
    );
  });
}

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      const res = await API.post("/chat", { message: text });
      setMessages((prev) => [...prev, { role: "bot", text: res.data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Sorry, I'm having trouble connecting. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickQuestions = [
    "How do I buy a player?",
    "What is the budget?",
    "How does Starting XI work?",
    "What pages are available?",
  ];

  return (
    <>
      {/* Chat Panel */}
      {open && (
        <div style={{
          position: "fixed", bottom: 90, right: 24, width: 380, height: 520,
          background: "#1e293b", borderRadius: 20, border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)", display: "flex", flexDirection: "column",
          zIndex: 9999, overflow: "hidden",
          fontFamily: "'Outfit', 'Inter', sans-serif",
        }}>
          {/* Header */}
          <div style={{
            background: "linear-gradient(135deg, #10b981, #059669)",
            padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 24 }}>🤖</span>
              <div>
                <div style={{ fontWeight: 800, fontSize: 15, color: "white" }}>SquadBuilder AI</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.8)" }}>Ask me anything about this site</div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "white", borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: 18 }}
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                  maxWidth: "85%",
                  background: m.role === "user"
                    ? "linear-gradient(135deg, #10b981, #059669)"
                    : "rgba(255,255,255,0.06)",
                  color: "white",
                  padding: "10px 14px",
                  borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                  fontSize: 14,
                  lineHeight: 1.5,
                }}
              >
                {m.role === "bot" ? formatText(m.text) : m.text}
              </div>
            ))}
            {loading && (
              <div style={{ alignSelf: "flex-start", color: "#94a3b8", fontSize: 13, padding: "4px 8px" }}>
                Thinking...
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick questions */}
          {messages.length <= 1 && (
            <div style={{ padding: "0 16px 8px", display: "flex", flexWrap: "wrap", gap: 6 }}>
              {quickQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => { setInput(q); }}
                  style={{
                    background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)",
                    color: "#34d399", padding: "5px 10px", borderRadius: 20, fontSize: 12,
                    cursor: "pointer", fontWeight: 600,
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", gap: 8 }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask about SquadBuilder..."
              style={{
                flex: 1, padding: "10px 14px", borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.12)", background: "rgba(15,23,42,0.8)",
                color: "white", fontSize: 14, outline: "none",
              }}
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              style={{
                background: "linear-gradient(135deg, #10b981, #059669)",
                border: "none", color: "white", borderRadius: 10, padding: "10px 16px",
                fontWeight: 700, cursor: "pointer", fontSize: 14,
                opacity: loading || !input.trim() ? 0.5 : 1,
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed", bottom: 24, right: 24, width: 58, height: 58,
          borderRadius: "50%", border: "none", cursor: "pointer",
          background: "linear-gradient(135deg, #10b981, #059669)",
          boxShadow: "0 8px 24px rgba(16,185,129,0.4)",
          fontSize: 26, zIndex: 9999,
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "transform 0.2s",
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.08)"}
        onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
        title="Chat with SquadBuilder AI"
      >
        {open ? "×" : "💬"}
      </button>
    </>
  );
}

export default Chatbot;
