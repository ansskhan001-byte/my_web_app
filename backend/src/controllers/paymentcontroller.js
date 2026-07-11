const Payment = require("../models/paymentModel");

exports.demoPayment = (req, res) => {

    const payment = {

        user_id: req.user.id,

        player_id: req.body.player_id,

        amount: req.body.amount,

        payment_method: "Demo Card",

       payment_status: "Completed"

    };

    Payment.createPayment(payment, (err) => {

        if (err)
            return res.status(500).json(err);

        res.status(201).json({

            success: true,

            message: "Payment Successful",

            payment

        });

    });

};

exports.paymentHistory = (req, res) => {

    Payment.paymentHistory(req.user.id, (err, result) => {

        if (err)
            return res.status(500).json(err);

        res.json({

            success: true,

            total: result.length,

            history: result

        });

    });

};