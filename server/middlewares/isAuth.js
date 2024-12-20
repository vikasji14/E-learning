import jwt from 'jsonwebtoken';

export const isAuth = (req, res, next) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header (Bearer token)

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req._id = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
