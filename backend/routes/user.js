import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/user.models.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { username, password, email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashpassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashpassword,
        });

        await newUser.save();

        return res.status(201).json({ status: true, message: "User registered" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not registered" });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        const token = jwt.sign({ username: user.username }, process.env.KEY, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
        return res.status(200).json({ status: true, message: "Login successful" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.post('/forgot-password', async (req, res) => {
    
    const { email } = req.body;
    try {

      const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not registered" });
        }
      const token = jwt.sign({ id: user._id }, process.env.KEY, { expiresIn: '5m' });


      let testAccount = await nodemailer.createTestAccount();


      let transporter = await nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
    
        auth: {
          user: "celestine69@ethereal.email",
          pass: "nS7p5uAJx9YZgv7MzV"
      }
  })

  let info = await transporter.sendMail({
    from: '"Parth Sharma" <trap_sh4010@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Reset Password Link", // Subject line
    text: `Click the link to reset your password: http://localhost:5173/resetPassword/${token}`, // plain text body
    html: "<b>Parth Sharma</b>", // html body
    })

      res.json(info)



        // const user = await User.findOne({ email });
        // if (!user) {
        //     return res.status(404).json({ message: "User not registered" });
        // }

        // const token = jwt.sign({ id: user._id }, process.env.KEY, { expiresIn: '5m' });
        // const transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //         user: process.env.EMAIL,
        //         pass: process.env.PASSWORD
        //     }
        // });

        // const mailOptions = {
        //     from: process.env.EMAIL,
        //     to: email,
        //     subject: 'Password Reset',
        //     text: 
        // };

        // transporter.sendMail(mailOptions, function (error, info) {
        //     if (error) {
        //         return res.status(500).json({ message: "Error. Email not sent" });
        //     } else {
        //         return res.status(200).json({ status: true, message: "Email sent" });
        //     }
        // });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

export { router as UserRouter };
