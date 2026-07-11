const express = require("express");
const router = express.Router();
const squadController = require("../controllers/squadController");
const { verifyToken } = require("../middleware/authMiddleware");

// Step 21: Buy a player using their ID from the URL parameter
router.post(
    "/buy/:id",
    verifyToken,
    squadController.buyPlayer
);

// Step 22: Get User Dashboard summary data
router.get(
    "/dashboard",
    verifyToken,
    squadController.getUserDashboard
);

// Toggle Starting XI Status
router.post(
    "/toggle-starting",
    verifyToken,
    squadController.toggleStartingXI
);

module.exports = router;