import bcrypt from "bcryptjs";
import  User from '../models/authModel.js';
import { generatToken } from "../lib/generatToken.js";

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = generatToken(user._id, res);

        return res.status(200).json({ 
            message: "User login successfully",
            user: {
                id: user._id,
                email: user.email
            }
        });

    } catch (error) {
        console.log("Login Error:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const Register = async (req, res) => { 
    try {
        const { email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email: email, 
            password: hashedPassword
        });

        await newUser.save();
        generatToken(newUser._id, res);

        return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.log("Register Error:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const Logout = (req, res) => {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
};