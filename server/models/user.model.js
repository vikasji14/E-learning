import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: ['instructor', 'student'],
        default: 'student'

    },
    enrolledCourses: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Course'
        }
    ],
    photoUrl: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
    },
    bio:{
        type:String,
        default:''
    },
    loginHistory:
    {
        count: { type: Number, default: 0 }, // Login count
        ip: { type: String, default: "Unknown" }, // IP address
        location: { type: String, default: "Unknown" }, // City, Region, Country
        device: { type: String, default: "Unknown" }, // Device or User-Agent
        os: { type: String, default: "Unknown" }, // Operating System
        browser: { type: String, default: "Unknown" }, // Browser details
        sessionDuration: { type: Number, default: 0 }, // Session duration in seconds
        loginMethod: { type: String, default: "Unknown" }, // Login method
        suspiciousFlag: { type: Boolean, default: false }, // Suspicious login flag
        date: { type: Date, default: Date.now }, // Timestamp
    },




}, { timestamp: true });

export const User = mongoose.model('User', userSchema);