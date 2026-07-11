const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");

const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

// Users
router.get("/users", verifyToken, isAdmin, adminController.getUsers);

router.put("/users/:id", verifyToken, isAdmin, adminController.updateUser);

router.delete("/users/:id", verifyToken, isAdmin, adminController.deleteUser);

// Players
router.get("/players", verifyToken, isAdmin, adminController.getPlayers);

router.post("/players", verifyToken, isAdmin, adminController.addPlayer);

router.put("/players/:id", verifyToken, isAdmin, adminController.updatePlayer);

router.delete("/players/:id", verifyToken, isAdmin, adminController.deletePlayer);

// Contact Messages
router.get("/messages", verifyToken, isAdmin, adminController.getMessages);
router.put("/messages/:id", verifyToken, isAdmin, adminController.updateMessageStatus);
router.delete("/messages/:id", verifyToken, isAdmin, adminController.deleteMessage);

module.exports = router;