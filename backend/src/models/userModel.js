const db = require("../config/db");

const getBudget = (id, callback) => {
    db.query(
        "SELECT remaining_budget FROM users WHERE id=?",
        [id],
        callback
    );
};

const updateBudget = (id, budget, callback) => {
    db.query(
        "UPDATE users SET remaining_budget=? WHERE id=?",
        [budget, id],
        callback
    );
};

const findUserByEmail = (email, callback) => {
    db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        callback
    );
};

const loginUser = (email, callback) => {
    db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        callback
    );
};

const createUser = (user, callback) => {
    db.query(
        `INSERT INTO users 
        (full_name,email,password,budget,remaining_budget,role) 
        VALUES(?,?,?,?,?,?)`,
        [
            user.full_name,
            user.email,
            user.password,
            1000000000,
            1000000000,
            "user"
        ],
        callback
    );
};

// --- Step 24: New Profile Management Functions ---

// Get password hash for verification during a password change request
const getPasswordHash = (id, callback) => {
    db.query(
        "SELECT password FROM users WHERE id = ?",
        [id],
        callback
    );
};

// Update user profile password with the new secure hash
const updatePassword = (id, newHash, callback) => {
    db.query(
        "UPDATE users SET password = ? WHERE id = ?",
        [newHash, id],
        callback
    );
};

// Update general profile details (full_name and email)
const updateProfile = (id, full_name, email, callback) => {
    db.query(
        "UPDATE users SET full_name = ?, email = ? WHERE id = ?",
        [full_name, email, id],
        callback
    );
};
// ==========================
// ADMIN FUNCTIONS
// ==========================

// Get all users
const getAllUsers = (callback) => {
    db.query(
        "SELECT id, full_name, email, budget, remaining_budget, role FROM users",
        callback
    );
};

// Update any user
const updateUser = (id, full_name, email, budget, role, callback) => {
    db.query(
        "UPDATE users SET full_name=?, email=?, budget=?, remaining_budget=?, role=? WHERE id=?",
        [full_name, email, budget, budget, role || "user", id],
        callback
    );
};

// Delete user
const deleteUser = (id, callback) => {
    db.query(
        "DELETE FROM users WHERE id=?",
        [id],
        callback
    );
};

module.exports = {
    findUserByEmail,
    createUser,
    loginUser,
    getBudget,
    updateBudget,
    getPasswordHash,
    updatePassword,
    updateProfile,

    // Admin
    getAllUsers,
    updateUser,
    deleteUser
};