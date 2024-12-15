export const checkApi = (req, res, next) => {
    const clientApiKey = req.headers["api-key"];
    const serverApiKey = process.env.FRONTEND_API_KEY // Replace with your actual API key
  
    if (!clientApiKey || clientApiKey !== serverApiKey) {
      return res.status(403).json({ message: "Forbidden: Invalid API key" });
    }
    next();
  };
  