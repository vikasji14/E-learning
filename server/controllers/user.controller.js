import { User } from "../models/user.model.js"
import { generateToken } from "../utils/tokengenerate.js"
import bcrypt from "bcryptjs"
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js"
import useragent from "useragent"; // Library to parse User-Agent header
import { OAuth2Client } from "google-auth-library";


export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const user = new User({
            name,
            email,
            password: hashPassword
        })
        await user.save()
        return res.status(201).json({
            success: true,
            message: "User created successfully",
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }


}

// export const login = async (req, res) => {
//     try {
//         const { email, password } = req.body
//         if (!email || !password) {
//             return res.status(400).json({
//                 success: false,
//                 message: "All fields are required"
//             })
//         }
//         const user = await User.findOne({ email }).select("+password")
//         if (!user) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid email or password"
//             })
//         }

//         const isMatch = await bcrypt.compare(password, user.password)
//         if (!isMatch) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Password is incorrect"
//             })
//         }
//         return generateToken(res, user, `Welcome back ${user.name}`)

//     } catch (error) {
//         res.status(400).json({
//             success: false,
//             message: error.message
//         })
//     }
// }



export const googleLogin = async (req, res) => {
    try {
        const { code } = req.body;
        // Initialize OAuth2 client with Google credentials
        const oauth2client = new OAuth2Client(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            process.env.GOOGLE_REDIRECT_URI // Add your redirect URI here
        );

        // Exchange `code` for tokens
        const { tokens } = await oauth2client.getToken(code);
        // Set credentials for the OAuth2 client
        oauth2client.setCredentials(tokens);
        // Fetch user info from Google
        const googleRes = await fetch(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`
        );
        const googleUser = await googleRes.json();
        // console.log("User info fetched from Google:", user);

        // Check if the user already exists in the database
        const email = googleUser.email;
        let existingUser = await User.findOne({ email });
         // Extract IP address
         const ipAddress = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
         // Call the geolocation API using fetch
         const geoResponse = await fetch(`http://ip-api.com/json/${ipAddress}?fields=city,region,country,zip`);
         const geoData = await geoResponse.json();
         const { city, region, country, zip } = geoData;
         const location = city ? `city: ${city},region: ${region},contry: ${country}, zip: ${zip}` : "Unknown";
 
         // Parse User-Agent header
         const agent = useragent.parse(req.headers["user-agent"]);
         const os = agent.os.toString(); // Operating System details
         const browser = agent.toAgent(); // Browser details
 
         // Detect login method (for simplicity, assuming password-based login here)
         const loginMethod = "Password";
 
         // Add suspicious login flag (custom logic can be implemented)
         const suspiciousFlag = location === "Unknown";
 
         // Update login history
         const updatedLoginDetails = {
             count: (existingUser?.loginHistory?.count || 0) + 1, // Increment login count
             ip: ipAddress, // IP address
             location: location, // Location details
             date: new Date(), // Timestamp of login
             device: req.headers["user-agent"] || "Unknown", // Full User-Agent string
             os: os, // Operating System details
             browser: browser, // Browser details
             sessionDuration: 0, // Default session duration; to be updated on logout
             loginMethod: loginMethod, // Login method
             suspiciousFlag: suspiciousFlag, // Suspicious login flag
         };
 

        if (existingUser) {
            existingUser.loginHistory = updatedLoginDetails;
            await existingUser.save();
            return generateToken(res, existingUser, `Welcome back ${existingUser.name}`)
        }

        // User does not exist, create a new user in the database
        const newUser = new User({
            name: googleUser?.name,
            email: googleUser?.email,
            photoUrl: googleUser?.picture,
            loginHistory: updatedLoginDetails
        });
        await newUser.save();
        return generateToken(res, newUser, `Welcome ${googleUser?.name}`)

    } catch (error) {
        // Handle errors
        console.error("Error during Google login:", error.message);
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};




export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Find user with password
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // Extract IP address
        const ipAddress = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
        // Call the geolocation API using fetch
        const geoResponse = await fetch(`http://ip-api.com/json/${ipAddress}?fields=city,region,country,zip`);
        const geoData = await geoResponse.json();
        const { city, region, country, zip } = geoData;
        const location = city ? `city: ${city},region: ${region},contry: ${country}, zip: ${zip}` : "Unknown";

        // Parse User-Agent header
        const agent = useragent.parse(req.headers["user-agent"]);
        const os = agent.os.toString(); // Operating System details
        const browser = agent.toAgent(); // Browser details

        // Detect login method (for simplicity, assuming password-based login here)
        const loginMethod = "Password";

        // Add suspicious login flag (custom logic can be implemented)
        const suspiciousFlag = location === "Unknown";

        // Update login history
        const updatedLoginDetails = {
            count: (user?.loginHistory?.count || 0) + 1, // Increment login count
            ip: ipAddress, // IP address
            location: location, // Location details
            date: new Date(), // Timestamp of login
            device: req.headers["user-agent"] || "Unknown", // Full User-Agent string
            os: os, // Operating System details
            browser: browser, // Browser details
            sessionDuration: 0, // Default session duration; to be updated on logout
            loginMethod: loginMethod, // Login method
            suspiciousFlag: suspiciousFlag, // Suspicious login flag
        };

        // Update user's login history in the database
        await User.findByIdAndUpdate(
            user._id,
            {
                $set: { loginHistory: updatedLoginDetails },
            },
            { new: true } // Return updated user document
        );
        await user.save(); // Save the user details

        // Generate the token and send response
        return generateToken(res, user, `Welcome back ${user.name}`);
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("token")
        res.clearCookie("id")
        res.clearCookie("name")
        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req._id).select("-password")
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }
        return res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const updateProfile = async (req, res) => {

    try {
        const userId = req._id; // Correcting the variable name to match usage
        const { name } = req.body; // Destructure name from the request body
        const profilePhoto = req.file; // Multer provides the uploaded file in req.file

        if (!userId || !name) {
            return res.status(400).json({ success: false, message: "Missing required fields (id or name)." });
        }

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        // If the user already has a photo, delete it from Cloudinary
        if (user.photoUrl) {
            const publicId = user.photoUrl.split("/").pop().split(".")[0]; // Extract public ID
            await deleteMediaFromCloudinary(publicId); // Ensure this is an async function
        }

        // Upload the new photo to Cloudinary
        let photoUrl = user.photoUrl; // Fallback to the current photo URL if no new file
        if (profilePhoto) {
            const cloudResponse = await uploadMedia(profilePhoto.path); // Upload the file
            photoUrl = cloudResponse.secure_url; // Get the secure URL of the uploaded photo
        }

        // Update the user details
        const updatedData = { name, photoUrl };
        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
            new: true, // Return the updated document
        }).select("-password"); // Exclude the password field

        return res.status(200).json({
            success: true,
            user: updatedUser,
            message: "Profile updated successfully.",
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update profile.",
        });
    }
};

export const bioChange = async (req, res) => {
    try {
        const user = await User.findById(req._id).select("-password")
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }
        const { bio } = req.body
        let data = await User.findByIdAndUpdate(req._id, { bio: bio }, {
            new: true, // Return the updated document
        }).select("-password"); // Exclude the password field
        return res.status(200).json({
            success: true,
            bio: data.bio,
            message: "Bio changed successfully.",
        });
    } catch (error) {
        console.error("Error updating bio:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update bio.",
        });
    }

}
