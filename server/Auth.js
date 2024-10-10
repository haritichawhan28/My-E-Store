import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

// USER REGISTRATION SCHEMA
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

// CREATE THE MODEL
const User = mongoose.model("User", userSchema);

// CREATE ROUTER
const authRouter = express.Router();
authRouter.use(bodyParser.json());

// ROUTE FOR REGISTER USER
authRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // CHECK IF THE USER ALREADY EXISTS OR NOT
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(409).send("User already exists");
        } else {
            // CREATE THE USER
            const newUser = new User({ name, email, password });
            await newUser.save();
            res.status(201).send("User created successfully");
        }
    } catch (error) {
        res.status(500).send("Internal server error: " + error.message);
    }
});

// ROUTE TO LOGIN USER
authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
        if(user) {
            res.status(200).send("User logged in successfully");
        } else {
            res.status(400).send("Invalid credentials");
        }
    } catch (error) {
        res.status(500).send("Internal server error: " + error.message);
    }
});

export default authRouter;