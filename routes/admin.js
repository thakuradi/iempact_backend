import express from 'express';
import jwt from 'jsonwebtoken';
import emailSignup from '../models/userSchema.js';
import Registration from '../models/registrationSchema.js';
import authenticateUser from '../middleware/authMiddleware.js';

const adminRouter = express.Router();

const ADMIN_CREDENTIALS = {
    email: 'admin@iempact.com',
    password: '7xa3uw8r'
};

// Admin Middleware
const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ success: false, message: 'Access denied. Admins only.' });
    }
};

// Admin Signin
adminRouter.post('/signin', (req, res) => {
    const { email, password } = req.body;

    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        const token = jwt.sign(
            { email: ADMIN_CREDENTIALS.email, role: 'admin' },
            process.env.SECRET_KEY,
            { expiresIn: '1d' }
        );
        return res.status(200).json({ success: true, token, message: 'Admin login successful' });
    }

    return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
});

// Get All Users (Dashboard) - with ALL their registrations
adminRouter.get('/dashboard', authenticateUser, isAdmin, async (req, res) => {
    try {
        const users = await emailSignup.find().select('-password -token');

        // Fetch all registrations for all users
        const usersWithRegistrations = await Promise.all(users.map(async (user) => {
            const registrations = await Registration.find({ userId: user._id }).sort({ createdAt: -1 });
            return {
                ...user.toObject(),
                registrations // Return array of all registrations
            };
        }));

        res.status(200).json({ success: true, users: usersWithRegistrations });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Get Single User Data
adminRouter.post('/user-data', authenticateUser, isAdmin, async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await emailSignup.findById(userId).select('-password -token');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const registrations = await Registration.find({ userId: user._id });

        res.status(200).json({ success: true, user, registrations });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Update Registration Verification Status
adminRouter.post('/update-verification', authenticateUser, isAdmin, async (req, res) => {
    try {
        const { registrationId, verified } = req.body;

        const registration = await Registration.findByIdAndUpdate(
            registrationId,
            { verified: verified },
            { new: true }
        );

        if (!registration) {
            return res.status(404).json({ success: false, message: 'Registration not found' });
        }

        res.status(200).json({ success: true, message: 'Registration status updated', registration });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

export default adminRouter;
