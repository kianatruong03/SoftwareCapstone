const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Replace with the actual user model

// Get user profile
exports.profile = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ error: 'Unauthorized' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).lean();

        if (!user) return res.status(404).json({ error: 'User not found' });

        res.json({ user });
    } catch (err) {
        next(err);
    }
};

// Logout user
exports.logout = (req, res, next) => {
    res.clearCookie('token'); // Clear JWT cookie if used
    res.status(200).json({ message: 'Logged out successfully' });
};
