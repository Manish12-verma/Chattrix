import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import cloudinary from "../lib/cloudinary.js";

//Signup new user
export const signup = async (req, res) => {
    const { fullName, email, password, bio } = req.body;

    try {
        if (!fullName || !email || !password || !bio) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword,
            bio
        })
        const token = generateToken(newUser._id);

        res.status(201).json({
            success: true,
            userData: newUser,
            token,
            message: "User created successfully",
        })
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}

//Login user

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userData = await User.findOne({ email });

        const isPasswordValid = await bcrypt.compare(password, userData.password);

        if (!userData || !isPasswordValid) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }

        const token = generateToken(userData._id);
        res.status(200).json({
            success: true,
            userData,
            token,
            message: "Login successful",
        });
    } catch (error) {
        console.error("Error during Login:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}

//controller to check if user is authenticated
export const checkAuth = (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user,
        message: "User is authenticated",
    });
}

//controller to update user profile
export const updateProfile = async (req, res) => {
    try {
        const { fullName, profilePic, bio } = req.body;
        const userId = req.user._id;
        let updatedUser;


        if (!profilePic) {
            updatedUser = await User.findByIdAndUpdate(userId, { bio, fullName }, { new: true });
        } else {
            const upload = await cloudinary.uploader.upload(profilePic);

            updatedUser = await User.findByIdAndUpdate(userId, {

                profilePic: upload.secure_url,
                bio,
                fullName,
            }, { new: true });
        }
        res.status(200).json({
            success: true,
            user: updatedUser,
            message: "Profile updated successfully",
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}