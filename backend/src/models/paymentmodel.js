const db = require("../config/db");

const createPayment = (payment, callback) => {

    db.query(
        `INSERT INTO payments
        (
            user_id,
            player_id,
            amount,
            payment_method,
            payment_status
        )
        VALUES(?,?,?,?,?)`,
        [
            payment.user_id,
            payment.player_id,
            payment.amount,
            payment.payment_method,
            payment.payment_status
        ],
        callback
    );

};

const paymentHistory = (userId, callback) => {

    db.query(

        `SELECT
            payments.*,
            players.name
        FROM payments

        JOIN players
        ON payments.player_id = players.id

        WHERE payments.user_id = ?

        ORDER BY payments.id DESC`,

        [userId],

        callback

    );

};

module.exports = {

    createPayment,

    paymentHistory

};