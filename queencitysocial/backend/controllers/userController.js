// const User = require('../models/User');

// // // Get Profile
// // exports.getProfile = async (req, res) => {
// //   try {
// //     const user = await User.findById(req.user.id);
// //     res.json(user);
// //   } catch (error) {
// //     res.status(500).json({ error: 'Server error' });
// //   }
// // };

// // // Update Profile
// // exports.updateProfile = async (req, res) => {
// //   try {
// //     const updates = req.body;
// //     const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true });
// //     res.json(user);
// //   } catch (error) {
// //     res.status(500).json({ error: 'Server error' });
// //   }
// // };

// // Update profile information

// exports.updateUserProfile = async (req, res) => {
//   const { name, email, address, zipcode, phone } = req.body;

//   try {
//       const user = await User.findById(req.params.id);
//       if (!user) {
//           return res.status(404).json({ message: 'User not found' });
//       }

//       // Update the fields based on input
//       user.name = name || user.name;
//       user.email = email || user.email;
//       user.address = address || user.address;
//       user.zipcode = zipcode || user.zipcode;
//       user.phone = phone || user.phone;

//       // Save the updated user
//       await user.save();
//       res.json({ message: 'Profile updated successfully', user });
//   } catch (err) {
//       res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };

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
