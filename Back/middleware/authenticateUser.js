const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateUser = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: "Access Denied: No token provided" });
    }

    const token = authHeader.split(' ')[1]; // Extract token after "Bearer"

    if (!token) {
        return res.status(401).json({ message: "Access Denied: Token missing" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded; // Attach decoded user data to `req.user`
        next();
    } catch (error) {
        console.error("Token verification failed:", error);
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};

module.exports = authenticateUser;
