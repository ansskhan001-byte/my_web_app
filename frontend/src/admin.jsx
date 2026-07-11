import React, { useEffect, useState } from "react";
import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

const POSITIONS = ["Goalkeeper", "Defender", "Midfielder", "Forward"];

const emptyPlayer = {
  club_id: 1,
  name: "",
  image: "",
  position: "Forward",
  nationality: "",
  age: 25,
  rating: 75,
  market_value: 1000000,
  goals: 0,
  assists: 0,
  appearances: 0,
  clean_sheets: 0,
  yellow_cards: 0,
  red_cards: 0,
};

const styles = {
  card: {
    background: "rgba(30, 41, 59, 0.6)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
  },
  table: { width: "100%", borderCollapse: "collapse", fontSize: 14 },
  th: {
    textAlign: "left",
    padding: "12px 14px",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    color: "#94a3b8",
    fontWeight: 600,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  td: {
    padding: "12px 14px",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
    color: "#e2e8f0",
  },
  btn: (color) => ({
    background: color,
    color: "white",
    border: "none",
    padding: "6px 14px",
    borderRadius: 8,
    fontWeight: 600,
    cursor: "pointer",
    fontSize: 13,
    marginRight: 6,
  }),
  input: {
    width: "100%",
    padding: "10px 14px",
    borderRadius: 8,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(15,23,42,0.8)",
    color: "white",
    fontSize: 14,
    boxSizing: "border-box",
  },
  label: { display: "block", marginBottom: 6, fontSize: 13, color: "#94a3b8", fontWeight: 600 },
  tab: (active) => ({
    padding: "10px 20px",
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 14,
    background: active ? "linear-gradient(135deg, #10b981, #059669)" : "rgba(255,255,255,0.06)",
    color: active ? "white" : "#94a3b8",
    marginRight: 8,
  }),
};

function Modal({ title, onClose, children }) {
  return (
    <div
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)",
        display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#1e293b", borderRadius: 16, padding: 28, width: "100%",
          maxWidth: 520, maxHeight: "85vh", overflowY: "auto",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h3 style={{ margin: 0, fontSize: 20 }}>{title}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#94a3b8", fontSize: 22, cursor: "pointer" }}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Admin({ token }) {
  const [tab, setTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [players, setPlayers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [editPlayer, setEditPlayer] = useState(null);
  const [showPlayerForm, setShowPlayerForm] = useState(false);
  const [playerForm, setPlayerForm] = useState(emptyPlayer);
  const [msg, setMsg] = useState("");

  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => { loadAll(); }, []);

  async function loadAll() {
    try {
      const [u, p, m] = await Promise.all([
        API.get("/admin/users", { headers }),
        API.get("/admin/players", { headers }),
        API.get("/admin/messages", { headers }),
      ]);
      setUsers(u.data.users || []);
      setPlayers(p.data.players || []);
      setMessages(m.data.messages || []);
    } catch {
      setMsg("Failed to load admin data. Make sure you have admin privileges.");
    }
  }

  async function saveUser() {
    await API.put(`/admin/users/${editUser.id}`, editUser, { headers });
    setEditUser(null);
    loadAll();
    setMsg("User updated successfully.");
  }

  async function deleteUser(id) {
    if (!confirm("Delete this user?")) return;
    await API.delete(`/admin/users/${id}`, { headers });
    loadAll();
    setMsg("User deleted.");
  }

  async function savePlayer() {
    if (editPlayer) {
      await API.put(`/admin/players/${editPlayer.id}`, editPlayer, { headers });
      setEditPlayer(null);
    } else {
      await API.post("/admin/players", playerForm, { headers });
      setShowPlayerForm(false);
      setPlayerForm(emptyPlayer);
    }
    loadAll();
    setMsg("Player saved successfully.");
  }

  async function deletePlayer(id) {
    if (!confirm("Delete this player?")) return;
    await API.delete(`/admin/players/${id}`, { headers });
    loadAll();
    setMsg("Player deleted.");
  }

  async function updateMsgStatus(id, status) {
    await API.put(`/admin/messages/${id}`, { status }, { headers });
    loadAll();
  }

  async function deleteMsg(id) {
    if (!confirm("Delete this message?")) return;
    await API.delete(`/admin/messages/${id}`, { headers });
    loadAll();
  }

  const statusBadge = (status) => {
    const colors = { new: "#3b82f6", read: "#f59e0b", resolved: "#10b981" };
    return (
      <span style={{
        background: colors[status] + "22", color: colors[status],
        padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700,
      }}>
        {status}
      </span>
    );
  };

  const renderPlayerFields = (data, setData) => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
      {[
        ["name", "Name", "text"],
        ["nationality", "Nationality", "text"],
        ["image", "Image URL", "text"],
        ["club_id", "Club ID", "number"],
        ["age", "Age", "number"],
        ["rating", "Rating", "number"],
        ["market_value", "Market Value", "number"],
        ["goals", "Goals", "number"],
        ["assists", "Assists", "number"],
        ["appearances", "Appearances", "number"],
        ["clean_sheets", "Clean Sheets", "number"],
        ["yellow_cards", "Yellow Cards", "number"],
        ["red_cards", "Red Cards", "number"],
      ].map(([key, label, type]) => (
        <div key={key}>
          <label style={styles.label}>{label}</label>
          <input
            style={styles.input}
            type={type}
            value={data[key]}
            onChange={(e) => setData({ ...data, [key]: type === "number" ? Number(e.target.value) : e.target.value })}
          />
        </div>
      ))}
      <div style={{ gridColumn: "1 / -1" }}>
        <label style={styles.label}>Position</label>
        <select
          style={styles.input}
          value={data.position}
          onChange={(e) => setData({ ...data, position: e.target.value })}
        >
          {POSITIONS.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>
    </div>
  );

  return (
    <div>
      <h1 style={{ fontSize: 32, fontWeight: 900, marginBottom: 8 }}>
        Admin Panel
      </h1>
      <p style={{ color: "#94a3b8", marginBottom: 24 }}>
        Manage users, players, and contact messages.
      </p>

      {msg && (
        <div style={{
          background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)",
          padding: "12px 16px", borderRadius: 10, marginBottom: 20, color: "#34d399", fontWeight: 600,
        }}>
          {msg}
        </div>
      )}

      <div style={{ marginBottom: 24 }}>
        {["users", "players", "messages"].map((t) => (
          <button key={t} style={styles.tab(tab === t)} onClick={() => setTab(t)}>
            {t === "users" ? `Users (${users.length})` : t === "players" ? `Players (${players.length})` : `Messages (${messages.length})`}
          </button>
        ))}
      </div>

      {/* USERS TAB */}
      {tab === "users" && (
        <div style={styles.card}>
          <table style={styles.table}>
            <thead>
              <tr>
                {["ID", "Name", "Email", "Budget", "Role", "Actions"].map((h) => (
                  <th key={h} style={styles.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td style={styles.td}>{u.id}</td>
                  <td style={styles.td}>{u.full_name}</td>
                  <td style={styles.td}>{u.email}</td>
                  <td style={styles.td}>{Number(u.budget).toLocaleString()}</td>
                  <td style={styles.td}>
                    <span style={{
                      background: u.role === "admin" ? "rgba(239,68,68,0.2)" : "rgba(59,130,246,0.2)",
                      color: u.role === "admin" ? "#f87171" : "#60a5fa",
                      padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700,
                    }}>{u.role}</span>
                  </td>
                  <td style={styles.td}>
                    <button style={styles.btn("linear-gradient(135deg, #3b82f6, #2563eb)")} onClick={() => setEditUser({ ...u })}>Edit</button>
                    <button style={styles.btn("linear-gradient(135deg, #ef4444, #b91c1c)")} onClick={() => deleteUser(u.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* PLAYERS TAB */}
      {tab === "players" && (
        <div style={styles.card}>
          <div style={{ marginBottom: 16 }}>
            <button
              style={styles.btn("linear-gradient(135deg, #10b981, #059669)")}
              onClick={() => { setShowPlayerForm(true); setPlayerForm(emptyPlayer); }}
            >
              + Add Player
            </button>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  {["ID", "Name", "Position", "Club", "Rating", "Value", "Actions"].map((h) => (
                    <th key={h} style={styles.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {players.map((p) => (
                  <tr key={p.id}>
                    <td style={styles.td}>{p.id}</td>
                    <td style={styles.td}>{p.name}</td>
                    <td style={styles.td}>{p.position}</td>
                    <td style={styles.td}>{p.club_name || p.club_id}</td>
                    <td style={styles.td}>{p.rating}</td>
                    <td style={styles.td}>{Number(p.market_value).toLocaleString()}</td>
                    <td style={styles.td}>
                      <button style={styles.btn("linear-gradient(135deg, #3b82f6, #2563eb)")} onClick={() => setEditPlayer({ ...p })}>Edit</button>
                      <button style={styles.btn("linear-gradient(135deg, #ef4444, #b91c1c)")} onClick={() => deletePlayer(p.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MESSAGES TAB */}
      {tab === "messages" && (
        <div style={styles.card}>
          {messages.length === 0 ? (
            <p style={{ color: "#94a3b8", textAlign: "center", padding: 40 }}>No contact messages yet.</p>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr>
                  {["ID", "From", "Subject", "Message", "Status", "Date", "Actions"].map((h) => (
                    <th key={h} style={styles.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {messages.map((m) => (
                  <tr key={m.id}>
                    <td style={styles.td}>{m.id}</td>
                    <td style={styles.td}>
                      <div style={{ fontWeight: 600 }}>{m.name}</div>
                      <div style={{ fontSize: 12, color: "#64748b" }}>{m.email}</div>
                    </td>
                    <td style={styles.td}>{m.subject}</td>
                    <td style={{ ...styles.td, maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.message}</td>
                    <td style={styles.td}>{statusBadge(m.status)}</td>
                    <td style={styles.td}>{new Date(m.created_at).toLocaleDateString()}</td>
                    <td style={styles.td}>
                      {m.status !== "read" && (
                        <button style={styles.btn("#f59e0b")} onClick={() => updateMsgStatus(m.id, "read")}>Read</button>
                      )}
                      {m.status !== "resolved" && (
                        <button style={styles.btn("#10b981")} onClick={() => updateMsgStatus(m.id, "resolved")}>Resolve</button>
                      )}
                      <button style={styles.btn("linear-gradient(135deg, #ef4444, #b91c1c)")} onClick={() => deleteMsg(m.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Edit User Modal */}
      {editUser && (
        <Modal title="Edit User" onClose={() => setEditUser(null)}>
          <div style={{ display: "grid", gap: 14 }}>
            {[
              ["full_name", "Full Name"],
              ["email", "Email"],
              ["budget", "Budget"],
            ].map(([key, label]) => (
              <div key={key}>
                <label style={styles.label}>{label}</label>
                <input
                  style={styles.input}
                  type={key === "budget" ? "number" : "text"}
                  value={editUser[key]}
                  onChange={(e) => setEditUser({ ...editUser, [key]: key === "budget" ? Number(e.target.value) : e.target.value })}
                />
              </div>
            ))}
            <div>
              <label style={styles.label}>Role</label>
              <select
                style={styles.input}
                value={editUser.role}
                onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
              >
                <option value="user">user</option>
                <option value="admin">admin</option>
              </select>
            </div>
            <button style={{ ...styles.btn("linear-gradient(135deg, #10b981, #059669)"), padding: "12px", marginTop: 8 }} onClick={saveUser}>
              Save Changes
            </button>
          </div>
        </Modal>
      )}

      {/* Add/Edit Player Modal */}
      {(showPlayerForm || editPlayer) && (
        <Modal
          title={editPlayer ? "Edit Player" : "Add Player"}
          onClose={() => { setShowPlayerForm(false); setEditPlayer(null); }}
        >
          {renderPlayerFields(editPlayer || playerForm, editPlayer ? setEditPlayer : setPlayerForm)}
          <button
            style={{ ...styles.btn("linear-gradient(135deg, #10b981, #059669)"), padding: "12px", marginTop: 16, width: "100%" }}
            onClick={savePlayer}
          >
            {editPlayer ? "Save Changes" : "Add Player"}
          </button>
        </Modal>
      )}
    </div>
  );
}

export default Admin;
