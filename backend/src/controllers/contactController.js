const Contact = require("../models/contactModel");

exports.submitMessage = (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    Contact.createMessage({ name, email, subject, message }, (err) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Failed to submit message"
            });
        }

        res.status(201).json({
            success: true,
            message: "Your message has been sent. We'll get back to you soon!"
        });
    });
};
