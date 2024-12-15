import jwt from "jsonwebtoken";
export const isAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req._id = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};  
