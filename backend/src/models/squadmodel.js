const db = require("../config/db"); // Adjust this path if your db connection is located elsewhere

const Squad = {
    // Check if the user has already purchased this specific player
    alreadyPurchased: (userId, playerId, callback) => {
        const query = "SELECT * FROM user_squad WHERE user_id = ? AND player_id = ?";
        db.query(query, [userId, playerId], callback);
    },

    // Add a player to the user's squad mapping table
    addPlayer: (userId, playerId, purchasePrice, callback) => {
        const query = "INSERT INTO user_squad (user_id, player_id, purchase_price) VALUES (?, ?, ?)";
        db.query(query, [userId, playerId, purchasePrice], callback);
    },

    // Step 22: Fetch all players belonging to a user's squad
    getUserSquad: (userId, callback) => {
        const query = `
            SELECT p.*, us.is_starting_xi FROM user_squad us
            JOIN players p ON us.player_id = p.id
            WHERE us.user_id = ?
        `;
        db.query(query, [userId], callback);
    },

    // Toggle or set starting XI status
    setStartingStatus: (userId, playerId, isStarting, callback) => {
        const query = "UPDATE user_squad SET is_starting_xi = ? WHERE user_id = ? AND player_id = ?";
        db.query(query, [isStarting, userId, playerId], callback);
    }
};

module.exports = Squad;