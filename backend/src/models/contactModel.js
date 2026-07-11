const db = require("../config/db");

const createMessage = (data, callback) => {
    db.query(
        `INSERT INTO contact_messages (name, email, subject, message, status)
         VALUES (?, ?, ?, ?, 'new')`,
        [data.name, data.email, data.subject, data.message],
        callback
    );
};

const getAllMessages = (callback) => {
    db.query(
        `SELECT id, name, email, subject, message, status, created_at
         FROM contact_messages
         ORDER BY created_at DESC`,
        callback
    );
};

const updateStatus = (id, status, callback) => {
    db.query(
        "UPDATE contact_messages SET status = ? WHERE id = ?",
        [status, id],
        callback
    );
};

const deleteMessage = (id, callback) => {
    db.query(
        "DELETE FROM contact_messages WHERE id = ?",
        [id],
        callback
    );
};

module.exports = {
    createMessage,
    getAllMessages,
    updateStatus,
    deleteMessage
};
