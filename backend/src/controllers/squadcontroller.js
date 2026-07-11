const Squad = require("../models/squadModel");
const User = require("../models/userModel");
const Player = require("../models/playerModel");

// Step 21: Purchase & Budget Logic (Matches your route path parameter /buy/:id)
exports.buyPlayer = (req, res) => {
    const userId = req.user.id;
    const playerId = req.params.id; // Correctly pulls from route param

    Player.getPlayerById(playerId, (err, playerResult) => {
        if (err) return res.status(500).json(err);

        if (playerResult.length === 0) {
            return res.status(404).json({
                message: "Player not found"
            });
        }

        const player = playerResult[0];

        Squad.alreadyPurchased(userId, playerId, (err, squadResult) => {
            if (err) return res.status(500).json(err);

            if (squadResult.length > 0) {
                return res.status(400).json({
                    message: "Player already purchased"
                });
            }

            User.getBudget(userId, (err, budgetResult) => {
                if (err) return res.status(500).json(err);
                if (budgetResult.length === 0) {
                    return res.status(404).json({ message: "User not found" });
                }

                const budget = parseFloat(budgetResult[0].remaining_budget);
                const playerValue = parseFloat(player.market_value);

                // Validating market_value database field
                if (budget < playerValue) {
                    return res.status(400).json({
                        message: "Insufficient Budget"
                    });
                }

                const remaining = budget - playerValue;

                User.updateBudget(userId, remaining, (err) => {
                    if (err) return res.status(500).json(err);

                    Squad.addPlayer(userId, playerId, player.market_value, (err) => {
                        if (err) return res.status(500).json(err);

                        res.json({
                            success: true,
                            message: "Player Purchased Successfully",
                            remaining_budget: remaining
                        });
                    });
                });
            });
        });
    });
};

// Step 22: Live Dashboard Compiler
exports.getUserDashboard = (req, res) => {
    const userId = req.user.id;

    // 1. Fetch remaining budget from user profile
    User.getBudget(userId, (err, budgetResult) => {
        if (err) return res.status(500).json(err);
        if (budgetResult.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        // 2. Fetch all players in this user's squad
        Squad.getUserSquad(userId, (err, squadResult) => {
            if (err) return res.status(500).json(err);

            const totalPlayers = squadResult.length;
            
            // Calculate financial metrics and average team rating
            const totalSpent = squadResult.reduce((sum, player) => sum + parseFloat(player.market_value || 0), 0);
            const avgRating = totalPlayers > 0 
                ? (squadResult.reduce((sum, player) => sum + (player.rating || 0), 0) / totalPlayers).toFixed(1) 
                : 0;

            // Return unified dashboard response
            res.status(200).json({
                success: true,
                profile: {
                    remaining_budget: budgetResult[0].remaining_budget
                },
                statistics: {
                    squadSize: totalPlayers,
                    totalValue: totalSpent,
                    averageRating: parseFloat(avgRating)
                },
                squad: squadResult
            });
        });
    });
};

// Toggle Starting XI Status
exports.toggleStartingXI = (req, res) => {
    const userId = req.user.id;
    const playerId = req.body.playerId;
    const isStarting = req.body.isStarting ? 1 : 0;

    if (isStarting === 1) {
        Squad.getUserSquad(userId, (err, squadResult) => {
            if (err) return res.status(500).json(err);
            
            const startingCount = squadResult.filter(p => p.is_starting_xi === 1).length;
            if (startingCount >= 11) {
                return res.status(400).json({
                    message: "You can only have a maximum of 11 players in your Starting XI. Remove another player first."
                });
            }

            Squad.setStartingStatus(userId, playerId, 1, (err) => {
                if (err) return res.status(500).json(err);
                res.json({
                    success: true,
                    message: "Player added to Starting XI successfully."
                });
            });
        });
    } else {
        Squad.setStartingStatus(userId, playerId, 0, (err) => {
            if (err) return res.status(500).json(err);
            res.json({
                success: true,
                message: "Player removed from Starting XI successfully."
            });
        });
    }
};