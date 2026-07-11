const User = require("../models/userModel");
const Player = require("../models/playerModel");
const Contact = require("../models/contactModel");

// ======================
// USERS
// ======================

// Get all users
exports.getUsers = (req, res) => {
    User.getAllUsers((err, result) => {
        if (err) return res.status(500).json(err);

        res.json({
            success: true,
            users: result
        });
    });
};

// Update user
exports.updateUser = (req, res) => {

    const { full_name, email, budget, role } = req.body;

    User.updateUser(
        req.params.id,
        full_name,
        email,
        budget,
        role,
        (err) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                success: true,
                message: "User Updated Successfully"
            });

        }
    );
};

// Delete user
exports.deleteUser = (req, res) => {

    User.deleteUser(req.params.id, (err) => {

        if (err)
            return res.status(500).json(err);

        res.json({
            success: true,
            message: "User Deleted Successfully"
        });

    });

};

// ======================
// PLAYERS
// ======================

// Get all players
exports.getPlayers = (req, res) => {

    Player.getAllPlayers({ page: 1, limit: 1000 }, (err, result) => {

        if (err)
            return res.status(500).json(err);

        res.json({
            success: true,
            players: result
        });

    });

};

// Add player
exports.addPlayer = (req, res) => {

    Player.createPlayer(req.body, (err) => {

        if (err)
            return res.status(500).json(err);

        res.json({
            success: true,
            message: "Player Added Successfully"
        });

    });

};

// Update player
exports.updatePlayer = (req, res) => {

    Player.updatePlayer(
        req.params.id,
        req.body,
        (err) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                success: true,
                message: "Player Updated Successfully"
            });

        }
    );

};

// Delete player
exports.deletePlayer = (req, res) => {

    Player.deletePlayer(req.params.id, (err) => {

        if (err)
            return res.status(500).json(err);

        res.json({
            success: true,
            message: "Player Deleted Successfully"
        });

    });

};

// ======================
// CONTACT MESSAGES
// ======================

exports.getMessages = (req, res) => {
    Contact.getAllMessages((err, result) => {
        if (err) return res.status(500).json(err);

        res.json({
            success: true,
            messages: result
        });
    });
};

exports.updateMessageStatus = (req, res) => {
    const { status } = req.body;

    Contact.updateStatus(req.params.id, status, (err) => {
        if (err) return res.status(500).json(err);

        res.json({
            success: true,
            message: "Message status updated"
        });
    });
};

exports.deleteMessage = (req, res) => {
    Contact.deleteMessage(req.params.id, (err) => {
        if (err) return res.status(500).json(err);

        res.json({
            success: true,
            message: "Message deleted"
        });
    });
};