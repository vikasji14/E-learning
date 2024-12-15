import jwt from "jsonwebtoken";

export const generateToken = (res, user, message) => {
    try {
        // Generate the token with the user ID and secret key
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
            expiresIn: "30m",
        });
        // Set the token as an HTTP-only cookie

        res.cookie("token", token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV !== "development", // Secure in production
            secure: true,
            sameSite: "strict", // Prevent CSRF attacks
            maxAge: 24 * 60 * 60 * 1000 * 7, // 7 days
        });
        
        // Send the response with the token and user info
        return res.status(200).json({
            success: true,
            message:"Login Successful",
            user,
            token,
        });
    } catch (error) {
        console.error("Error generating token:", error);

        // Send an error response in case of a failure
        return res.status(500).json({
            success: false,
            message: "Failed to generate token",
        });
    }
};
