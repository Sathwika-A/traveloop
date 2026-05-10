const express = require("express");

const nodemailer = require("nodemailer");

const bcrypt = require("bcryptjs");

const router = express.Router();

const User = require("../models/User");


// SEND EMAIL

router.post("/forgot-password", async (req, res) => {

    try {

        const { email } = req.body;

        const transporter = nodemailer.createTransport({

            service: "gmail",

            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }

        });

        const mailOptions = {

            from: process.env.EMAIL_USER,

            to: email,

            subject: "Traveloop Password Reset",

            html: `
                <h2>Password Reset</h2>

                <p>Click below to reset password:</p>

                <a href="http://localhost:3000/reset-password">
                    Reset Password
                </a>
            `
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({
            message: "Reset Email Sent"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Email Sending Failed"
        });

    }

});


// RESET PASSWORD

router.post("/reset-password", async (req, res) => {

    try {

        const { email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.findOneAndUpdate(

            { email },

            {
                password: hashedPassword
            }

        );

        res.status(200).json({
            message: "Password Reset Successful"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Reset Failed"
        });

    }

});

module.exports = router;