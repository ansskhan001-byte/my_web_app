import Admin from "./admin";
import Contact from "./Contact";
import Chatbot from "./Chatbot";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  Link,
  useNavigate,
} from "react-router-dom";
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ===========================
// LAYOUT
// ===========================

function Layout({ user, logout }) {
  const navigate = useNavigate();
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(ellipse at top, #0f172a, #020617)",
        color: "white",
        fontFamily: "'Outfit', 'Inter', sans-serif",
      }}
    >
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 40px",
          background: "rgba(15, 23, 42, 0.8)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => navigate("/")}>
          <span style={{ fontSize: 28 }}>⚽</span>
          <h2 style={{ 
            margin: 0, 
            fontSize: 22, 
            fontWeight: 800, 
            background: "linear-gradient(to right, #34d399, #059669)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.5px"
          }}>
            SquadBuilder
          </h2>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
          <Link to="/" style={{ color: "#94a3b8", textDecoration: "none", fontWeight: 600, transition: "color 0.2s" }} onMouseOver={(e) => e.target.style.color = "white"} onMouseOut={(e) => e.target.style.color = "#94a3b8"}>
            Home
          </Link>

          <Link to="/contact" style={{ color: "#94a3b8", textDecoration: "none", fontWeight: 600, transition: "color 0.2s" }} onMouseOver={(e) => e.target.style.color = "white"} onMouseOut={(e) => e.target.style.color = "#94a3b8"}>
            Contact
          </Link>

          {user && (
            <>
              <Link to="/dashboard" style={{ color: "#94a3b8", textDecoration: "none", fontWeight: 600, transition: "color 0.2s" }} onMouseOver={(e) => e.target.style.color = "white"} onMouseOut={(e) => e.target.style.color = "#94a3b8"}>
                Dashboard
              </Link>

              <Link to="/market" style={{ color: "#94a3b8", textDecoration: "none", fontWeight: 600, transition: "color 0.2s" }} onMouseOver={(e) => e.target.style.color = "white"} onMouseOut={(e) => e.target.style.color = "#94a3b8"}>
                Market
              </Link>

              <Link to="/profile" style={{ color: "#94a3b8", textDecoration: "none", fontWeight: 600, transition: "color 0.2s" }} onMouseOver={(e) => e.target.style.color = "white"} onMouseOut={(e) => e.target.style.color = "#94a3b8"}>
                Profile
              </Link>

              {user.role === "admin" && (
                <Link to="/admin" style={{ color: "#fbbf24", textDecoration: "none", fontWeight: 600, transition: "color 0.2s" }} onMouseOver={(e) => e.target.style.color = "#fde68a"} onMouseOut={(e) => e.target.style.color = "#fbbf24"}>
                  Admin
                </Link>
              )}
            </>
          )}

          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 13, color: "#64748b" }}>Logged in as</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#34d399" }}>{user.full_name}</div>
              </div>
              <button
                onClick={logout}
                style={{
                  background: "linear-gradient(135deg, #ef4444, #b91c1c)",
                  color: "white",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(239, 68, 68, 0.2)",
                  transition: "transform 0.2s, opacity 0.2s",
                }}
                onMouseOver={(e) => e.target.style.transform = "translateY(-1px)"}
                onMouseOut={(e) => e.target.style.transform = "none"}
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              style={{
                background: "linear-gradient(135deg, #10b981, #059669)",
                color: "white",
                border: "none",
                padding: "8px 20px",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(16, 185, 129, 0.2)",
              }}
            >
              Login
            </button>
          )}
        </div>
      </nav>

      <div style={{ padding: "40px 20px", maxWidth: 1200, margin: "0 auto" }}>
        <Outlet />
      </div>

      <Chatbot />
    </div>
  );
}

// ===========================
// HOME PAGE
// ===========================

function Home({ token }) {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: "center", padding: "40px 20px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <span style={{ fontSize: 72, display: "inline-block", animation: "bounce 2s infinite" }}>🏆</span>
        <h1 style={{ 
          fontSize: "64px", 
          fontWeight: 900, 
          margin: "20px 0 10px", 
          background: "linear-gradient(135deg, #ffffff 30%, #a7f3d0 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: "-2px",
          lineHeight: 1.1
        }}>
          Build Your Ultimate Football Dream Team
        </h1>
        <p style={{ fontSize: "20px", color: "#94a3b8", lineHeight: 1.6, marginBottom: 40 }}>
          Manage your budget, scout the market of 22+ world-class players, sign superstars, and strategically assemble your perfect 4-4-2 Starting XI.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: 20 }}>
          {token ? (
            <button
              onClick={() => navigate("/dashboard")}
              style={{
                padding: "16px 36px",
                fontSize: "18px",
                fontWeight: "bold",
                borderRadius: "10px",
                border: "none",
                background: "linear-gradient(135deg, #10b981, #059669)",
                color: "white",
                cursor: "pointer",
                boxShadow: "0 10px 25px rgba(16, 185, 129, 0.3)",
                transition: "all 0.2s"
              }}
              onMouseOver={(e) => e.target.style.transform = "translateY(-2px)"}
              onMouseOut={(e) => e.target.style.transform = "none"}
            >
              Go to Squad Dashboard →
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                style={{
                  padding: "16px 36px",
                  fontSize: "18px",
                  fontWeight: "bold",
                  borderRadius: "10px",
                  border: "none",
                  background: "linear-gradient(135deg, #10b981, #059669)",
                  color: "white",
                  cursor: "pointer",
                  boxShadow: "0 10px 25px rgba(16, 185, 129, 0.3)",
                  transition: "all 0.2s"
                }}
                onMouseOver={(e) => e.target.style.transform = "translateY(-2px)"}
                onMouseOut={(e) => e.target.style.transform = "none"}
              >
                Sign In & Get Started
              </button>
            </>
          )}
        </div>

        {/* Feature Highlights */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
          gap: 30, 
          marginTop: 80 
        }}>
          <div style={{ background: "#1e293b", padding: 30, borderRadius: 12, border: "1px solid rgba(255,255,255,0.05)", textAlign: "left" }}>
            <span style={{ fontSize: 32 }}>💶</span>
            <h3 style={{ fontSize: 18, color: "white", margin: "15px 0 10px" }}>100M Budget Control</h3>
            <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.5 }}>Spend wisely. Evaluate price-to-rating ratios to build the strongest possible starting XI without going broke.</p>
          </div>

          <div style={{ background: "#1e293b", padding: 30, borderRadius: 12, border: "1px solid rgba(255,255,255,0.05)", textAlign: "left" }}>
            <span style={{ fontSize: 32 }}>📊</span>
            <h3 style={{ fontSize: 18, color: "white", margin: "15px 0 10px" }}>Transfer Market</h3>
            <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.5 }}>Browse 22+ active superstars. Filter by position, club, rating, and value. Instant transaction receipts provided.</p>
          </div>

          <div style={{ background: "#1e293b", padding: 30, borderRadius: 12, border: "1px solid rgba(255,255,255,0.05)", textAlign: "left" }}>
            <span style={{ fontSize: 32 }}>📋</span>
            <h3 style={{ fontSize: 18, color: "white", margin: "15px 0 10px" }}>Tactical Pitch Builder</h3>
            <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.5 }}>Drag or toggle players directly onto a fully styled interactive soccer field. Perfect your 4-4-2 team chemistry.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===========================
// LOGIN PAGE
// ===========================

function Login({ setUser, setToken }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function login(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setToken(res.data.token);
      setUser(res.data.user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login Failed");
    }
  }

  return (
    <div
      style={{
        maxWidth: 450,
        margin: "60px auto",
        background: "#1e293b",
        padding: "40px 30px",
        borderRadius: 16,
        boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        border: "1px solid rgba(255, 255, 255, 0.05)"
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#10b981",
          margin: "0 0 10px",
          fontSize: 32,
          fontWeight: 800
        }}
      >
        Sign In
      </h1>
      <p style={{ textAlign: "center", color: "#94a3b8", marginBottom: 30, fontSize: 14 }}>
        Enter your details to manage your football squad.
      </p>

      {error && (
        <div
          style={{
            background: "rgba(239, 68, 68, 0.15)",
            border: "1px solid rgba(239, 68, 68, 0.4)",
            color: "#f87171",
            padding: 12,
            borderRadius: 8,
            marginBottom: 20,
            textAlign: "center",
            fontSize: 14
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={login}>
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", fontSize: 14, color: "#cbd5e1", marginBottom: 8, fontWeight: 600 }}>Email Address</label>
          <input
            placeholder="e.g. anss@example.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: 14,
              borderRadius: 8,
              background: "#0f172a",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "white",
              fontSize: 15,
              boxSizing: "border-box"
            }}
            required
          />
        </div>

        <div style={{ marginBottom: 30 }}>
          <label style={{ display: "block", fontSize: 14, color: "#cbd5e1", marginBottom: 8, fontWeight: 600 }}>Password</label>
          <input
            placeholder="••••••••"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: 14,
              borderRadius: 8,
              background: "#0f172a",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "white",
              fontSize: 15,
              boxSizing: "border-box"
            }}
            required
          />
        </div>

        <button
          style={{
            width: "100%",
            padding: 14,
            background: "linear-gradient(135deg, #10b981, #059669)",
            border: "none",
            borderRadius: 8,
            color: "white",
            fontWeight: "bold",
            fontSize: 16,
            cursor: "pointer",
            boxShadow: "0 4px 15px rgba(16, 185, 129, 0.2)",
            transition: "all 0.2s"
          }}
          onMouseOver={(e) => e.target.style.filter = "brightness(1.1)"}
          onMouseOut={(e) => e.target.style.filter = "none"}
        >
          Login
        </button>
      </form>
      <p
  style={{
    textAlign: "center",
    marginTop: "20px",
  }}
>
  Don't have an account?{" "}
  <Link
    to="/signup"
    style={{
      color: "#10b981",
      textDecoration: "none",
      fontWeight: "bold",
    }}
  >
    Sign Up
  </Link>
</p>
    </div>
  );
}
function Signup() {
  const navigate = useNavigate();

  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  async function register(e) {
    e.preventDefault();

    try {
      const res = await API.post("/auth/register", {
        full_name,
        email,
        password,
      });

      setMessage(res.data.message);

      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (err) {
      setMessage(err.response?.data?.message || "Registration Failed");
    }
  }

  return (
    <div style={{
      maxWidth:450,
      margin:"80px auto",
      background:"#1e293b",
      padding:30,
      borderRadius:10
    }}>

      <h1 style={{textAlign:"center",color:"#10b981"}}>
        Sign Up
      </h1>

      <p style={{color:"#10b981"}}>{message}</p>

      <form onSubmit={register}>

        <input
          placeholder="Full Name"
          value={full_name}
          onChange={(e)=>setFullName(e.target.value)}
        />

        <br/><br/>

        <input
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <br/><br/>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <br/><br/>

        <button>
          Sign Up
        </button>

      </form>

    </div>
  );
}
// ===========================
// DASHBOARD & PITCH BUILDER
// ===========================

function Dashboard({ token, updateRemainingBudget }) {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionMessage, setActionMessage] = useState("");

  const fetchDashboard = () => {
    if (!token) return;
    API.get("/squad/dashboard", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        setDashboardData(res.data);
        if (res.data.profile?.remaining_budget !== undefined) {
          updateRemainingBudget(parseFloat(res.data.profile.remaining_budget));
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Unable to load squad dashboard.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDashboard();
  }, [token]);

  const toggleStarting = async (playerId, isCurrentlyStarting) => {
    setActionMessage("");
    try {
      const res = await API.post("/squad/toggle-starting", {
        playerId,
        isStarting: !isCurrentlyStarting
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setActionMessage(res.data.message);
      fetchDashboard(); // reload squad compilation
      
      // Auto-hide success message
      setTimeout(() => setActionMessage(""), 4000);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update squad selection.");
    }
  };

  if (loading) {
    return <div style={{ textAlign: "center", padding: 50, fontSize: 20 }}>Loading your tactical board...</div>;
  }

  if (error) {
    return <div style={{ color: "red", textAlign: "center", padding: 50 }}>{error}</div>;
  }

  const { profile, statistics, squad } = dashboardData;
  const startingXI = squad.filter(p => p.is_starting_xi === 1);
  const reserves = squad.filter(p => p.is_starting_xi !== 1);

  // Group Starting XI into tactical positions for 4-4-2 layout
  const startingGK = startingXI.filter(p => p.position === "Goalkeeper");
  const startingDEF = startingXI.filter(p => p.position === "Defender");
  const startingMID = startingXI.filter(p => p.position === "Midfielder");
  const startingFWD = startingXI.filter(p => p.position === "Forward");

  // Create fixed slots for 4-4-2 (1 GK, 4 DEF, 4 MID, 2 FWD)
  const gkSlots = [startingGK[0] || null];
  const defSlots = [
    startingDEF[0] || null,
    startingDEF[1] || null,
    startingDEF[2] || null,
    startingDEF[3] || null
  ];
  const midSlots = [
    startingMID[0] || null,
    startingMID[1] || null,
    startingMID[2] || null,
    startingMID[3] || null
  ];
  const fwdSlots = [
    startingFWD[0] || null,
    startingFWD[1] || null
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 30 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 36, fontWeight: 800 }}>Squad Management</h1>
          <p style={{ color: "#94a3b8", margin: "5px 0 0" }}>Review finances, check stats, and build your tactical starting 11.</p>
        </div>
        <div style={{ display: "flex", gap: 15 }}>
          <Link to="/market" style={{
            background: "linear-gradient(135deg, #10b981, #059669)",
            color: "white",
            textDecoration: "none",
            padding: "12px 24px",
            borderRadius: "8px",
            fontWeight: "bold",
            boxShadow: "0 4px 12px rgba(16, 185, 129, 0.2)"
          }}>
            🛒 Transfer Market
          </Link>
        </div>
      </div>

      {actionMessage && (
        <div style={{
          background: "rgba(16, 185, 129, 0.15)",
          border: "1px solid rgba(16, 185, 129, 0.4)",
          color: "#34d399",
          padding: "12px 20px",
          borderRadius: 8,
          marginBottom: 25,
          fontWeight: 600,
          textAlign: "center"
        }}>
          {actionMessage}
        </div>
      )}

      {/* Financial & Squad Metrics */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", 
        gap: 20, 
        marginBottom: 40 
      }}>
        {/* Remaining Budget Card */}
        <div style={{ background: "#1e293b", padding: 20, borderRadius: 12, border: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ fontSize: 13, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px" }}>Remaining Budget</div>
          <div style={{ fontSize: 26, fontWeight: 800, color: "#10b981", margin: "10px 0" }}>
            €{Number(profile?.remaining_budget).toLocaleString()}
          </div>
          <div style={{ height: 6, background: "#0f172a", borderRadius: 3, overflow: "hidden" }}>
            <div style={{ 
              height: "100%", 
              background: "#10b981", 
              width: `${(parseFloat(profile?.remaining_budget) / 100000000) * 100}%`,
              transition: "width 0.5s ease-in-out"
            }}></div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#64748b", marginTop: 5 }}>
            <span>0M</span>
            <span>Max 100M</span>
          </div>
        </div>

        {/* Squad Size Card */}
        <div style={{ background: "#1e293b", padding: 20, borderRadius: 12, border: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ fontSize: 13, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px" }}>Players Signed</div>
          <div style={{ fontSize: 26, fontWeight: 800, color: "#38bdf8", margin: "10px 0" }}>
            {statistics?.squadSize} / 22+
          </div>
          <div style={{ fontSize: 12, color: "#64748b" }}>
            Total Value: €{Number(statistics?.totalValue).toLocaleString()}
          </div>
        </div>

        {/* Starting XI Count */}
        <div style={{ background: "#1e293b", padding: 20, borderRadius: 12, border: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ fontSize: 13, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px" }}>Starting XI Active</div>
          <div style={{ fontSize: 26, fontWeight: 800, color: startingXI.length === 11 ? "#10b981" : "#f59e0b", margin: "10px 0" }}>
            {startingXI.length} / 11
          </div>
          <div style={{ fontSize: 12, color: "#64748b" }}>
            {startingXI.length === 11 ? "⚽ Ready for kick-off!" : "⚠️ Select exactly 11 starting players"}
          </div>
        </div>

        {/* Avg Team Rating */}
        <div style={{ background: "#1e293b", padding: 20, borderRadius: 12, border: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ fontSize: 13, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px" }}>Avg Rating</div>
          <div style={{ fontSize: 26, fontWeight: 800, color: "#c084fc", margin: "10px 0" }}>
            {startingXI.length > 0 
              ? (startingXI.reduce((sum, p) => sum + parseFloat(p.rating), 0) / startingXI.length).toFixed(1)
              : "0.0"}
          </div>
          <div style={{ fontSize: 12, color: "#64748b" }}>
            Calculated from Starting XI
          </div>
        </div>
      </div>

      {/* Tactical Layout / Pitch & List */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 40, alignItems: "start" }}>
        
        {/* LEFT COLUMN: Interactive Soccer Pitch */}
        <div style={{ textAlign: "center" }}>
          <h2 style={{ color: "white", fontSize: 20, marginBottom: 15, textAlign: "left", fontWeight: 700 }}>Tactical Pitch Lineup (4-4-2)</h2>
          
          <div style={{
            background: "radial-gradient(circle, #052e16 0%, #14532d 100%)",
            border: "4px solid #ffffff",
            borderRadius: "16px",
            aspectRatio: "3/4",
            position: "relative",
            padding: "20px 10px",
            boxShadow: "0 15px 35px rgba(0,0,0,0.6), inset 0 0 40px rgba(0,0,0,0.3)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}>
            {/* Center Line & Circles */}
            <div style={{
              position: "absolute",
              top: "50%",
              left: 0,
              right: 0,
              height: 2,
              background: "rgba(255,255,255,0.3)",
              transform: "translateY(-50%)",
              zIndex: 1
            }}></div>
            <div style={{
              position: "absolute",
              top: "50%",
              left: "55%",
              width: "100px",
              height: "100px",
              border: "2px solid rgba(255,255,255,0.3)",
              borderRadius: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1
            }}></div>
            
            {/* Top Penalty Area (Opponent Box) */}
            <div style={{
              position: "absolute",
              top: 0,
              left: "50%",
              width: "50%",
              height: "15%",
              border: "2px solid rgba(255,255,255,0.3)",
              borderTop: "none",
              transform: "translateX(-50%)",
              zIndex: 1
            }}></div>

            {/* Bottom Penalty Area (GK Box) */}
            <div style={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              width: "50%",
              height: "15%",
              border: "2px solid rgba(255,255,255,0.3)",
              borderBottom: "none",
              transform: "translateX(-50%)",
              zIndex: 1
            }}></div>

            {/* Pitch Rows */}
            {/* 1. FORWARDS ROW */}
            <div style={{ display: "flex", justifyContent: "space-around", zIndex: 10, width: "100%", height: "20%", alignItems: "center" }}>
              {fwdSlots.map((player, idx) => (
                <PitchSlot key={`fwd-${idx}`} player={player} label="FWD" onRemove={() => toggleStarting(player.id, true)} />
              ))}
            </div>

            {/* 2. MIDFIELDERS ROW */}
            <div style={{ display: "flex", justifyContent: "space-around", zIndex: 10, width: "100%", height: "20%", alignItems: "center" }}>
              {midSlots.map((player, idx) => (
                <PitchSlot key={`mid-${idx}`} player={player} label="MID" onRemove={() => toggleStarting(player.id, true)} />
              ))}
            </div>

            {/* 3. DEFENDERS ROW */}
            <div style={{ display: "flex", justifyContent: "space-around", zIndex: 10, width: "100%", height: "20%", alignItems: "center" }}>
              {defSlots.map((player, idx) => (
                <PitchSlot key={`def-${idx}`} player={player} label="DEF" onRemove={() => toggleStarting(player.id, true)} />
              ))}
            </div>

            {/* 4. GOALKEEPER ROW */}
            <div style={{ display: "flex", justifyContent: "space-around", zIndex: 10, width: "100%", height: "20%", alignItems: "center" }}>
              {gkSlots.map((player, idx) => (
                <PitchSlot key={`gk-${idx}`} player={player} label="GK" onRemove={() => toggleStarting(player.id, true)} />
              ))}
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: Purchased Players List & Bench */}
        <div>
          <h2 style={{ color: "white", fontSize: 20, marginBottom: 15, fontWeight: 700 }}>Your Signed Squad ({squad.length})</h2>
          
          {squad.length === 0 ? (
            <div style={{
              background: "#1e293b",
              borderRadius: 12,
              padding: "40px 20px",
              textAlign: "center",
              border: "1px dashed rgba(255,255,255,0.15)"
            }}>
              <span style={{ fontSize: 40, display: "block", marginBottom: 15 }}>🛒</span>
              <p style={{ color: "#94a3b8", fontSize: 15, marginBottom: 20 }}>You haven't purchased any players yet.</p>
              <Link to="/market" style={{
                background: "#10b981",
                color: "white",
                textDecoration: "none",
                padding: "10px 20px",
                borderRadius: 8,
                fontWeight: "bold",
                fontSize: 14
              }}>
                Browse Transfer Market
              </Link>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12, maxHeight: 600, overflowY: "auto", paddingRight: 5 }}>
              {squad.map((player) => (
                <div
                  key={player.id}
                  style={{
                    background: player.is_starting_xi ? "rgba(16, 185, 129, 0.08)" : "#1e293b",
                    border: player.is_starting_xi ? "1px solid #10b981" : "1px solid rgba(255,255,255,0.05)",
                    borderRadius: 10,
                    padding: 15,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <div style={{ display: "flex", gap: 15, alignItems: "center" }}>
                    <div style={{
                      width: 45,
                      height: 45,
                      borderRadius: "50%",
                      background: "#0f172a",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 20,
                      fontWeight: "bold",
                      color: "#10b981"
                    }}>
                      {player.position[0]}
                    </div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: 16, color: "white" }}>{player.name}</h4>
                      <p style={{ margin: "3px 0 0", fontSize: 12, color: "#94a3b8" }}>
                        <span style={{ color: player.position === "Goalkeeper" ? "#fb7185" : player.position === "Defender" ? "#38bdf8" : player.position === "Midfielder" ? "#c084fc" : "#fb923c", fontWeight: 700 }}>
                          {player.position}
                        </span>
                        {" • "}Rating: <strong style={{ color: "white" }}>{parseFloat(player.rating).toFixed(0)}</strong>
                        {" • "}Value: <strong style={{ color: "white" }}>€{(parseFloat(player.market_value)/1000000).toFixed(1)}M</strong>
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleStarting(player.id, player.is_starting_xi === 1)}
                    style={{
                      background: player.is_starting_xi 
                        ? "linear-gradient(135deg, #ef4444, #dc2626)" 
                        : "linear-gradient(135deg, #10b981, #059669)",
                      color: "white",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: 6,
                      fontSize: 12,
                      fontWeight: "bold",
                      cursor: "pointer",
                      width: 130
                    }}
                  >
                    {player.is_starting_xi ? "Remove from XI" : "Put in XI"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

// Single slot component inside the tactical pitch view
function PitchSlot({ player, label, onRemove }) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: 75,
      textAlign: "center"
    }}>
      {player ? (
        <div 
          onClick={onRemove}
          title="Click to remove player from Starting XI"
          style={{
            position: "relative",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          {/* Player badge icon */}
          <div style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            background: "#ffffff",
            border: "3px solid #10b981",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 6px 12px rgba(0,0,0,0.3)",
            fontSize: 22
          }}>
            🏃‍♂️
          </div>
          {/* Rating tag */}
          <div style={{
            position: "absolute",
            top: -5,
            right: -5,
            background: "#fbbf24",
            color: "black",
            fontSize: 10,
            fontWeight: 800,
            width: 18,
            height: 18,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid black"
          }}>
            {parseFloat(player.rating).toFixed(0)}
          </div>
          {/* Player Name */}
          <div style={{
            background: "rgba(15, 23, 42, 0.85)",
            padding: "2px 6px",
            borderRadius: 4,
            fontSize: 11,
            color: "white",
            fontWeight: 700,
            marginTop: 6,
            maxWidth: 80,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            border: "1.5px solid rgba(255,255,255,0.15)"
          }}>
            {player.name.split(" ").pop()}
          </div>
        </div>
      ) : (
        <div style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          border: "2px dashed rgba(255,255,255,0.4)",
          background: "rgba(255,255,255,0.06)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "rgba(255,255,255,0.4)"
        }}>
          <span style={{ fontSize: 13, fontWeight: "bold" }}>+</span>
          <span style={{ fontSize: 8, textTransform: "uppercase" }}>{label}</span>
        </div>
      )}
    </div>
  );
}

// ===========================
// MARKET PAGE & RECEIPT MODAL
// ===========================

function Market({ token, updateRemainingBudget, userRemainingBudget }) {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filtering & search states
  const [searchTerm, setSearchTerm] = useState("");
  const [positionFilter, setPositionFilter] = useState("");
  const [sortMethod, setSortMethod] = useState("");
  
  // Receipts/messages
  const [errorMessage, setErrorMessage] = useState("");
  const [recentReceipt, setRecentReceipt] = useState(null);

  const fetchMarket = () => {
    if (!token) return;
    setLoading(true);
    API.get("/players", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        setPlayers(res.data.players || res.data);
        setLoading(false);
      })
      .catch(() => {
        setErrorMessage("Unable to load players.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMarket();
  }, [token]);

  async function buyPlayer(player) {
    setErrorMessage("");
    setRecentReceipt(null);
    try {
      const prevBudget = userRemainingBudget;
      const res = await API.post(
        `/squad/buy/${player.id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const newBudget = parseFloat(res.data.remaining_budget);
      
      // Update app budget state
      updateRemainingBudget(newBudget);

      // Create detailed transaction receipt
      setRecentReceipt({
        receiptNumber: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
        timestamp: new Date().toLocaleString(),
        playerName: player.name,
        playerPosition: player.position,
        playerClub: player.club_name || player.club || "Unattached",
        playerRating: parseFloat(player.rating).toFixed(0),
        cost: parseFloat(player.market_value),
        prevBudget,
        newBudget,
        successMessage: res.data.message
      });

    } catch (err) {
      setErrorMessage(
        err.response?.data?.message || "Unable to purchase player."
      );
    }
  }

  // Frontend local filtering/search
  const filteredPlayers = players.filter((player) => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = positionFilter === "" || player.position === positionFilter;
    return matchesSearch && matchesPosition;
  }).sort((a, b) => {
    if (sortMethod === "rating") {
      return parseFloat(b.rating) - parseFloat(a.rating);
    } else if (sortMethod === "value") {
      return parseFloat(b.market_value) - parseFloat(a.market_value);
    }
    return a.id - b.id; // default
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 30 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 36, fontWeight: 800 }}>Transfer Market</h1>
          <p style={{ color: "#94a3b8", margin: "5px 0 0" }}>Sign superstars to build your squad of 11. Current budget: <strong style={{ color: "#10b981" }}>€{Number(userRemainingBudget).toLocaleString()}</strong></p>
        </div>
        <div style={{ display: "flex", gap: 15 }}>
          <Link to="/dashboard" style={{
            background: "#1e293b",
            color: "white",
            textDecoration: "none",
            padding: "12px 24px",
            borderRadius: "8px",
            fontWeight: "bold",
            border: "1px solid rgba(255,255,255,0.08)"
          }}>
            📋 Manage Lineup
          </Link>
        </div>
      </div>

      {errorMessage && (
        <div
          style={{
            background: "rgba(239, 68, 68, 0.15)",
            border: "1px solid rgba(239, 68, 68, 0.4)",
            color: "#f87171",
            padding: 15,
            marginBottom: 25,
            borderRadius: 8,
            textAlign: "center",
            fontWeight: "bold"
          }}
        >
          ❌ {errorMessage}
        </div>
      )}

      {/* Filter and Search Bar */}
      <div style={{
        background: "#1e293b",
        padding: 20,
        borderRadius: 12,
        marginBottom: 30,
        display: "flex",
        flexWrap: "wrap",
        gap: 15,
        alignItems: "center",
        border: "1px solid rgba(255,255,255,0.05)"
      }}>
        {/* Search */}
        <div style={{ flex: 2, minWidth: 200 }}>
          <input
            type="text"
            placeholder="🔍 Search players by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 8,
              background: "#0f172a",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "white",
              fontSize: 14,
              boxSizing: "border-box"
            }}
          />
        </div>

        {/* Position */}
        <div style={{ flex: 1, minWidth: 150 }}>
          <select
            value={positionFilter}
            onChange={(e) => setPositionFilter(e.target.value)}
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 8,
              background: "#0f172a",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "white",
              fontSize: 14
            }}
          >
            <option value="">All Positions</option>
            <option value="Goalkeeper">Goalkeepers</option>
            <option value="Defender">Defenders</option>
            <option value="Midfielder">Midfielders</option>
            <option value="Forward">Forwards</option>
          </select>
        </div>

        {/* Sorting */}
        <div style={{ flex: 1, minWidth: 150 }}>
          <select
            value={sortMethod}
            onChange={(e) => setSortMethod(e.target.value)}
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 8,
              background: "#0f172a",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "white",
              fontSize: 14
            }}
          >
            <option value="">Sort by Default</option>
            <option value="rating">Rating (Highest First)</option>
            <option value="value">Market Value (Highest First)</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: 50, fontSize: 18 }}>Scouting transfer market...</div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 25,
          }}
        >
          {filteredPlayers.map((player) => (
            <div
              key={player.id}
              style={{
                background: "linear-gradient(to bottom, #1e293b, #0f172a)",
                border: "1px solid rgba(255,255,255,0.05)",
                padding: 25,
                borderRadius: 14,
                boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 15 }}>
                  <span style={{
                    background: player.position === "Goalkeeper" ? "#fda4af" : player.position === "Defender" ? "#7dd3fc" : player.position === "Midfielder" ? "#c084fc" : "#fdba74",
                    color: "#0f172a",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    fontSize: "11px",
                    fontWeight: "bold",
                    textTransform: "uppercase"
                  }}>
                    {player.position}
                  </span>
                  
                  <span style={{
                    background: "rgba(255, 191, 36, 0.15)",
                    border: "1px solid #fbbf24",
                    color: "#fbbf24",
                    padding: "4px 8px",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontWeight: "bold"
                  }}>
                    ★ {parseFloat(player.rating).toFixed(0)}
                  </span>
                </div>

                <h2 style={{ fontSize: 20, margin: "0 0 5px", color: "white", textAlign: "left", fontWeight: 700 }}>{player.name}</h2>
                <p style={{ margin: "0 0 15px", fontSize: 13, color: "#64748b", textAlign: "left" }}>
                  🏴‍☠️ {player.nationality} • ⚽ {player.club_name || player.club || "Unattached"}
                </p>

                <div style={{ display: "flex", gap: 15, background: "rgba(255,255,255,0.03)", padding: 10, borderRadius: 8, marginBottom: 20 }}>
                  <div style={{ flex: 1, textAlign: "center" }}>
                    <div style={{ fontSize: 10, color: "#64748b", textTransform: "uppercase" }}>Age</div>
                    <div style={{ fontSize: 14, fontWeight: "bold", color: "white" }}>{player.age}</div>
                  </div>
                  <div style={{ flex: 1, textAlign: "center", borderLeft: "1px solid rgba(255,255,255,0.08)", borderRight: "1px solid rgba(255,255,255,0.08)" }}>
                    <div style={{ fontSize: 10, color: "#64748b", textTransform: "uppercase" }}>Goals</div>
                    <div style={{ fontSize: 14, fontWeight: "bold", color: "white" }}>{player.goals}</div>
                  </div>
                  <div style={{ flex: 1, textAlign: "center" }}>
                    <div style={{ fontSize: 10, color: "#64748b", textTransform: "uppercase" }}>Assists</div>
                    <div style={{ fontSize: 14, fontWeight: "bold", color: "white" }}>{player.assists}</div>
                  </div>
                </div>
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 15 }}>
                  <span style={{ fontSize: 12, color: "#64748b" }}>Market Value</span>
                  <span style={{ fontSize: 18, fontWeight: 800, color: "white" }}>
                    €{Number(player.market_value).toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={() => buyPlayer(player)}
                  style={{
                    width: "100%",
                    padding: 12,
                    background: "linear-gradient(135deg, #10b981, #059669)",
                    border: "none",
                    borderRadius: 8,
                    cursor: "pointer",
                    fontWeight: "bold",
                    color: "white",
                    fontSize: 14,
                    boxShadow: "0 4px 12px rgba(16, 185, 129, 0.2)",
                    transition: "transform 0.1s"
                  }}
                  onMouseOver={(e) => e.target.style.transform = "scale(1.02)"}
                  onMouseOut={(e) => e.target.style.transform = "scale(1.0)"}
                >
                  Sign Player
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* RECEIPT MODAL */}
      {recentReceipt && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(2, 6, 23, 0.85)",
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          animation: "fadeIn 0.3s ease-out"
        }}>
          <div style={{
            background: "#ffffff",
            color: "#0f172a",
            width: "100%",
            maxWidth: "460px",
            borderRadius: "20px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            padding: "35px 25px 25px",
            position: "relative",
            fontFamily: "'Courier New', Courier, monospace", // invoice classic style
            border: "2px solid #e2e8f0"
          }}>
            {/* Top receipt design notches */}
            <div style={{
              position: "absolute",
              top: -8,
              left: 20,
              right: 20,
              height: 16,
              background: "radial-gradient(circle, transparent 30%, #ffffff 40%)",
              backgroundSize: "16px 16px",
              zIndex: 10
            }}></div>

            {/* Success Visual */}
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: "#d1fae5",
                color: "#059669",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 32,
                marginBottom: 10,
                border: "2px solid #34d399"
              }}>
                ✓
              </div>
              <h2 style={{ color: "#059669", margin: 0, fontSize: 18, fontWeight: 900, fontFamily: "sans-serif" }}>
                SIGNING COMPLETED
              </h2>
              <span style={{ fontSize: 11, color: "#64748b" }}>{recentReceipt.receiptNumber}</span>
            </div>

            <div style={{ borderBottom: "2px dashed #cbd5e1", paddingBottom: 15, marginBottom: 15 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#475569" }}>
                <span>DATE/TIME:</span>
                <span style={{ fontWeight: "bold" }}>{recentReceipt.timestamp}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#475569", marginTop: 5 }}>
                <span>STATUS:</span>
                <span style={{ fontWeight: "bold", color: "#059669" }}>PAID & CONTRACTED</span>
              </div>
            </div>

            {/* Player details */}
            <div style={{ borderBottom: "2px dashed #cbd5e1", paddingBottom: 15, marginBottom: 15 }}>
              <h4 style={{ margin: "0 0 10px", fontSize: 13, color: "#64748b" }}>SUPERSTAR DETAILS</h4>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, fontWeight: "bold", margin: "4px 0" }}>
                <span>PLAYER:</span>
                <span>{recentReceipt.playerName} ({recentReceipt.playerRating} OVR)</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#334155" }}>
                <span>POSITION:</span>
                <span>{recentReceipt.playerPosition}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#334155", marginTop: 4 }}>
                <span>CLUB:</span>
                <span>{recentReceipt.playerClub}</span>
              </div>
            </div>

            {/* Financial math */}
            <div style={{ borderBottom: "2px solid #0f172a", paddingBottom: 15, marginBottom: 15 }}>
              <h4 style={{ margin: "0 0 10px", fontSize: 13, color: "#64748b" }}>FINANCIAL STATEMENT</h4>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#475569", margin: "4px 0" }}>
                <span>PREVIOUS BUDGET:</span>
                <span>€{Number(recentReceipt.prevBudget).toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, fontWeight: "bold", color: "#ef4444", margin: "4px 0" }}>
                <span>TRANSFER PRICE:</span>
                <span>- €{Number(recentReceipt.cost).toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, fontWeight: "bold", color: "#059669", margin: "8px 0 4px", borderTop: "1px solid #e2e8f0", paddingTop: 8 }}>
                <span>REMAINING BALANCE:</span>
                <span>€{Number(recentReceipt.newBudget).toLocaleString()}</span>
              </div>
            </div>

            {/* Barcode decoration */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 20 }}>
              <div style={{
                height: 35,
                background: "repeating-linear-gradient(to right, #0f172a, #0f172a 2px, transparent 2px, transparent 6px, #0f172a 6px, #0f172a 8px)",
                width: "80%",
                opacity: 0.8
              }}></div>
              <span style={{ fontSize: 9, color: "#94a3b8", marginTop: 4 }}>*CONTRACT APPROVED BY FIFA*</span>
            </div>

            <button
              onClick={() => setRecentReceipt(null)}
              style={{
                width: "100%",
                padding: "12px",
                background: "#0f172a",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontWeight: "bold",
                fontSize: "14px",
                cursor: "pointer",
                fontFamily: "sans-serif",
                boxShadow: "0 4px 12px rgba(15,23,42,0.2)"
              }}
            >
              Done / Close Ticket
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ===========================
// PROFILE PAGE
// ===========================

function Profile({ token, user, setUser }) {
  const [fullName, setFullName] = useState(user?.full_name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(true);

  async function updateProfile(e) {
    e.preventDefault();
    setMessage("");
    try {
      const res = await API.put(
        "/auth/profile/update",
        { full_name: fullName, email },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedUser = { ...user, full_name: fullName, email };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setSuccess(true);
      setMessage(res.data.message || "Profile updated successfully.");
    } catch (err) {
      setSuccess(false);
      setMessage(err.response?.data?.message || "Profile update failed.");
    }
  }

  async function changePassword(e) {
    e.preventDefault();
    setMessage("");
    try {
      const res = await API.put(
  "/auth/profile/change-password",
  { oldPassword, newPassword },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
      setSuccess(true);
      setMessage(res.data.message || "Password changed successfully.");
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      setSuccess(false);
      setMessage(err.response?.data?.message || "Password change failed.");
    }
  }

  return (
    <div style={{ maxWidth: 850, margin: "0 auto" }}>
      <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 10 }}>Account Profile</h1>
      <p style={{ color: "#94a3b8", marginBottom: 30 }}>Manage your credentials and security details.</p>

      {message && (
        <div
          style={{
            background: success ? "rgba(16, 185, 129, 0.15)" : "rgba(239, 68, 68, 0.15)",
            border: success ? "1px solid rgba(16, 185, 129, 0.4)" : "1px solid rgba(239, 68, 68, 0.4)",
            color: success ? "#34d399" : "#f87171",
            padding: 15,
            borderRadius: 8,
            marginBottom: 25,
            textAlign: "center",
            fontWeight: "bold"
          }}
        >
          {message}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
        
        {/* Left Card: Update Details */}
        <div style={{ background: "#1e293b", padding: 30, borderRadius: 16, border: "1px solid rgba(255,255,255,0.05)" }}>
          <h2 style={{ fontSize: 20, color: "white", marginBottom: 20, fontWeight: 700 }}>Personal Info</h2>
          <form onSubmit={updateProfile}>
            <div style={{ marginBottom: 15 }}>
              <label style={{ display: "block", fontSize: 13, color: "#cbd5e1", marginBottom: 8 }}>Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                style={{
                  width: "100%",
                  padding: 12,
                  borderRadius: 8,
                  background: "#0f172a",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "white",
                  boxSizing: "border-box"
                }}
              />
            </div>

            <div style={{ marginBottom: 25 }}>
              <label style={{ display: "block", fontSize: 13, color: "#cbd5e1", marginBottom: 8 }}>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: 12,
                  borderRadius: 8,
                  background: "#0f172a",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "white",
                  boxSizing: "border-box"
                }}
              />
            </div>

            <button
              style={{
                padding: "12px 24px",
                background: "linear-gradient(135deg, #10b981, #059669)",
                border: "none",
                borderRadius: 8,
                color: "white",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              Save Changes
            </button>
          </form>
        </div>

        {/* Right Card: Change Password */}
        <div style={{ background: "#1e293b", padding: 30, borderRadius: 16, border: "1px solid rgba(255,255,255,0.05)" }}>
          <h2 style={{ fontSize: 20, color: "white", marginBottom: 20, fontWeight: 700 }}>Security Credentials</h2>
          <form onSubmit={changePassword}>
            <div style={{ marginBottom: 15 }}>
              <label style={{ display: "block", fontSize: 13, color: "#cbd5e1", marginBottom: 8 }}>Current Password</label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: 12,
                  borderRadius: 8,
                  background: "#0f172a",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "white",
                  boxSizing: "border-box"
                }}
                required
              />
            </div>

            <div style={{ marginBottom: 25 }}>
              <label style={{ display: "block", fontSize: 13, color: "#cbd5e1", marginBottom: 8 }}>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: 12,
                  borderRadius: 8,
                  background: "#0f172a",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "white",
                  boxSizing: "border-box"
                }}
                required
              />
            </div>

            <button
              style={{
                padding: "12px 24px",
                background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                border: "none",
                borderRadius: 8,
                color: "white",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              Update Password
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

// ===========================
// PROTECTED ROUTE
// ===========================

function ProtectedRoute({ token, children }) {
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

// ===========================
// MAIN APP
// ===========================

function App() {
  const [token, setToken] = useState(
    localStorage.getItem("token") || ""
  );

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken("");
    setUser(null);
  };

  // Callback to update budget immediately in global state and local storage
  const updateRemainingBudget = (newRemainingBudget) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, remaining_budget: newRemainingBudget };
      localStorage.setItem("user", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Layout user={user} logout={logout} />}
        >
          {/* Separate Home Page */}
          <Route
            index
            element={<Home token={token} />}
          />

          {/* Login Page */}
          <Route
            path="login"
            element={
              token ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Login setToken={setToken} setUser={setUser} />
              )
            }
          />
<Route
  path="signup"
  element={
    <Signup />
  }
/>
          {/* Dashboard */}
          <Route
            path="dashboard"
            element={
              <ProtectedRoute token={token}>
                <Dashboard 
                  token={token} 
                  updateRemainingBudget={updateRemainingBudget} 
                />
              </ProtectedRoute>
            }
          />

          {/* Market */}
          <Route
            path="market"
            element={
              <ProtectedRoute token={token}>
                <Market 
                  token={token} 
                  updateRemainingBudget={updateRemainingBudget} 
                  userRemainingBudget={user ? parseFloat(user.remaining_budget) : 100000000} 
                />
              </ProtectedRoute>
            }
          />

          {/* Profile */}
          <Route
            path="profile"
            element={
              <ProtectedRoute token={token}>
                <Profile token={token} user={user} setUser={setUser} />
              </ProtectedRoute>
            }
          />

          {/* Contact */}
          <Route path="contact" element={<Contact />} />

          {/* Admin */}
<Route
  path="admin"
  element={
    <ProtectedRoute token={token}>
      {user?.role === "admin" ? (
        <Admin token={token} />
      ) : (
        <Navigate to="/dashboard" replace />
      )}
    </ProtectedRoute>
  }
/>
          {/* Unknown routes */}
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
         

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;