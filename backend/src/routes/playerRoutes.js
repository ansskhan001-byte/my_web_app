const express = require("express");
const upload = require("../config/multer");
const router = express.Router();

const playerController = require("../controllers/playerController");

const {
    verifyToken,
    isAdmin
} = require("../middleware/authMiddleware");

router.post(
    "/",
    verifyToken,
    isAdmin,
    upload.single("image"),
    playerController.addPlayer
);

router.get(
    "/",
    playerController.getPlayers
);

module.exports = router;