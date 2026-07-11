const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const User = require("../models/userModel");

exports.register = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }

    const { full_name, email, password } = req.body;

    User.findUserByEmail(email, async (err, result) => {
        if (err) return res.status(500).json(err);

        if (result.length > 0) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        User.createUser(
            {
                full_name,
                email,
                password: hashedPassword
            },
            (err) => {
                if (err) return res.status(500).json(err);

                res.status(201).json({
                    success: true,
                    message: "User Registered Successfully"
                });
            }
        );
    });
};

exports.login = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }

    const { email, password } = req.body;

    User.loginUser(email, async (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        if (result.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email or Password"
            });
        }

        const user = result[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email or Password"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            user: {
                id: user.id,
                full_name: user.full_name,
                email: user.email,
                role: user.role,
                budget: user.budget,
                remaining_budget: user.remaining_budget
            }
        });
    });
};

// --- Step 24: New Profile Management Logic ---

// Update standard profile details
exports.updateProfile = (req, res) => {
    const userId = req.user.id; // From verifyToken middleware
    const { full_name, email } = req.body;

    if (!full_name || !email) {
        return res.status(400).json({ message: "Full name and email are required." });
    }

    User.updateProfile(userId, full_name, email, (err, result) => {
        if (err) return res.status(500).json(err);

        res.status(200).json({
            success: true,
            message: "Profile details updated successfully",
            updatedData: { full_name, email }
        });
    });
};

// Securely check old password and set a new hash
exports.changePassword = (req, res) => {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        return res.status(400).json({ message: "Both old and new passwords are required." });
    }

    // 1. Fetch current stored password hash
    User.getPasswordHash(userId, (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.length === 0) return res.status(404).json({ message: "User not found" });

        const currentHash = result[0].password;

        // 2. Compare user input with database hash
        bcrypt.compare(oldPassword, currentHash, async (err, isMatch) => {
            if (err) return res.status(500).json(err);
            if (!isMatch) return res.status(400).json({ message: "Incorrect current password." });

            // 3. Hash the new password securely
            try {
                const newHash = await bcrypt.hash(newPassword, 10);

                // 4. Save the updated hash back to the user record
                User.updatePassword(userId, newHash, (err) => {
                    if (err) return res.status(500).json(err);

                    res.status(200).json({
                        success: true,
                        message: "Password changed successfully"
                    });
                });
            } catch (hashError) {
                return res.status(500).json({ message: "Error secure hashing the password." });
            }
        });
    });
};