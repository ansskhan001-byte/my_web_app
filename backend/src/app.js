const adminRoutes = require("./routes/adminRoutes");
const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const playerRoutes = require("./routes/playerRoutes");
const squadRoutes = require("./routes/squadRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const contactRoutes = require("./routes/contactRoutes");
const chatRoutes = require("./routes/chatRoutes");
const app = express();

// ==========================
// Middlewares
// ==========================

app.use(cors());
app.use(express.json());
// ==========================
// Static Folder
// ==========================

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// ==========================
// API Routes
// ==========================

app.use("/api/auth", authRoutes);
app.use("/api/players", playerRoutes);
app.use("/api/squad", squadRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/chat", chatRoutes);
// ==========================
// Home Route
// ==========================

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Football Fantasy API Running"
    });
});

// ==========================
// 404 Route
// ==========================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found"
    });
});

module.exports = app;