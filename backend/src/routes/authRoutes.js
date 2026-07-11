const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

const {
    registerValidation,
    loginValidation
} = require("../validators/authValidator");

const {
    verifyToken,
    isAdmin
} = require("../middleware/authMiddleware");


// ==========================
// Authentication
// ==========================

// Register
router.post(
    "/register",
    registerValidation,
    authController.register
);

// Login
router.post(
    "/login",
    loginValidation,
    authController.login
);


// ==========================
// Protected User Routes (Profile Management)
// ==========================

// Get Profile Info
router.get(
    "/profile",
    verifyToken,
    (req, res) => {
        res.status(200).json({
            success: true,
            message: "Protected Route Access Granted",
            user: req.user
        });
    }
);

// Update Profile Details (Full Name & Email)
router.put(
    "/profile/update",
    verifyToken,
    authController.updateProfile
);

// Securely Change Password
router.put(
    "/profile/change-password",
    verifyToken,
    authController.changePassword
);


// ==========================
// Admin Only Route
// ==========================

router.get(
    "/admin",
    verifyToken,
    isAdmin,
    (req, res) => {
        res.status(200).json({
            success: true,
            message: "Welcome Admin!",
            admin: req.user
        });
    }
);

module.exports = router;