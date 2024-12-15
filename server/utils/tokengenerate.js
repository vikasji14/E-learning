import jwt from "jsonwebtoken";

export const generateToken = (res, user, message) => {
    try {
        // Generate the token with the user ID and secret key
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
            expiresIn: "30m",
        });
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
