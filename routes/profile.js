import express from 'express';
import authenticateUser from '../middleware/authMiddleware.js';
import emailSignup from '../models/userSchema.js';
import Registration from '../models/registrationSchema.js';

const profileRouter = express.Router();

profileRouter.get('/', authenticateUser, async (req, res) => {
    try {
        const { email } = req.user;

        // Fetch user data
        const user = await emailSignup.findOne({ email }).select('-password -token'); // Exclude sensitive fields

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Fetch registration data for this user
        const registrations = await Registration.find({ userId: user._id });

        res.status(200).json({
            success: true,
            user,
            registrations
        });

    } catch (error) {
        console.error('Profile fetch error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

export default profileRouter;
