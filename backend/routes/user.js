import express from 'express'

import bcryt from 'bcrypt'

const router = express.Router();
import { User } from '../models/user.models.js';
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

router.post('/signup', async(req,res) => {
    const {username, password, email} = req.body;
    const user = await User.findOne({email})
    if(user){
        return res.json({message: "User already existed"})
    }

    const hashpassword = await bcryt.hash(password,10)
    const newUser = new User({
        username,
        email, 
        password: hashpassword, 
    })

    await newUser.save()

    return res.json({status: true ,message: "recored registered"})
})

    router.post('/login', async (req,res) => {
        const {email, password} = req.body;
        const user = await User.findOne({email})

        if(!user){
            return res.json({message: "user not registerd"})
        }

        const validPassword = await bcryt.compare(password,user.password)
        if(!validPassword){
            return res.json({message: "Password is Incorrect"})
        }

        const token = jwt.sign({username: user.username},process.env.KEY, {expiresIn: '1h'})
        res.cookie('token', token, { httpOnly : true ,maxAge : 360000})
        return res.json({status: true, message: "login successful"})
    })

    router.post('/forgot-password', async (req, res) => {
        const {email} = req.body;
        try{
            const user = await User.findOne({email})
            if(!user){
                return res.json({message: "user not registerd"})
            }

            const token = jwt.sign({id: user._id}, process.env.KEY, {expiresIn: '5m'})
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: `${process.env.EMAIL}`,
                  pass: `${process.env.PASSWORD}`
                }
              });
              
              var mailOptions = {
                from: `${process.env.EMAIL}`,
                to: email,
                subject: 'Sending Email using Node.js',
                text: `http://localhost:5173/resetPassword/${token}`
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  return res.json({ message: "Error. Email is not sent"})

                } else {
                  return res.json({status: true, message: "email sent"})
                }
              });
        }
        catch(err){
            console.log(err)
        }
    })

export {router as UserRouter}