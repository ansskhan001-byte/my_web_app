const db = require("../config/db");

const createPlayer = (player, callback) => {
    db.query(
        `INSERT INTO players
        (
            club_id,
            name,
            image,
            position,
            nationality,
            age,
            rating,
            market_value,
            goals,
            assists,
            appearances,
            clean_sheets,
            yellow_cards,
            red_cards
        )
        VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [
            player.club_id,
            player.name,
            player.image,
            player.position,
            player.nationality,
            player.age,
            player.rating,
            player.market_value,
            player.goals,
            player.assists,
            player.appearances,
            player.clean_sheets,
            player.yellow_cards,
            player.red_cards
        ],
        callback
    );
};
const getPlayerById = (id, callback) => {

    db.query(
        "SELECT * FROM players WHERE id=?",
        [id],
        callback
    );

};
const getAllPlayers = (filters, callback) => {

    let sql = `
        SELECT
            players.*,
            clubs.name AS club_name
        FROM players
        LEFT JOIN clubs
        ON players.club_id = clubs.id
        WHERE 1=1
    `;

    let values = [];

    // Search by name
    if (filters.search) {
        sql += " AND players.name LIKE ?";
        values.push(`%${filters.search}%`);
    }

    // Filter by position
    if (filters.position) {
        sql += " AND players.position = ?";
        values.push(filters.position);
    }

    // Filter by club
    if (filters.club_id) {
        sql += " AND players.club_id = ?";
        values.push(filters.club_id);
    }

    // Sorting
    if (filters.sort === "rating") {
        sql += " ORDER BY players.rating DESC";
    }
    else if (filters.sort === "value") {
        sql += " ORDER BY players.market_value DESC";
    }
    else {
        sql += " ORDER BY players.id DESC";
    }

    // Pagination
    const page = Number(filters.page) || 1;
    const limit = Number(filters.limit) || 10;

    const offset = (page - 1) * limit;

    sql += " LIMIT ? OFFSET ?";

    values.push(limit);
    values.push(offset);

    db.query(sql, values, callback);
};

// ==========================
// ADMIN FUNCTIONS
// ==========================

// Update Player
const updatePlayer = (id, player, callback) => {

    db.query(
        `UPDATE players SET
            club_id=?,
            name=?,
            image=?,
            position=?,
            nationality=?,
            age=?,
            rating=?,
            market_value=?,
            goals=?,
            assists=?,
            appearances=?,
            clean_sheets=?,
            yellow_cards=?,
            red_cards=?
        WHERE id=?`,
        [
            player.club_id,
            player.name,
            player.image,
            player.position,
            player.nationality,
            player.age,
            player.rating,
            player.market_value,
            player.goals,
            player.assists,
            player.appearances,
            player.clean_sheets,
            player.yellow_cards,
            player.red_cards,
            id
        ],
        callback
    );

};

// Delete Player
const deletePlayer = (id, callback) => {

    db.query(
        "DELETE FROM players WHERE id=?",
        [id],
        callback
    );

};
module.exports = {
    createPlayer,
    getAllPlayers,
    getPlayerById,

    // Admin
    updatePlayer,
    deletePlayer
};