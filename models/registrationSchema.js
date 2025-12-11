import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    registrationType: {
        type: String,
        enum: ['solo', 'team'],
        default: 'solo'
    },
    fullName: {
        type: String,
        required: false // Required for solo if different from user? We'll handle validation in route.
    },
    teamName: {
        type: String,
        required: false
    },
    teamLeader: {
        type: String,
        required: false
    },
    teamMembers: [{
        type: String
    }],
    teamNumber: {
        type: String, // Keeping as String to match original schema, but logically is count
        required: false
    },
    transactionUid: {
        type: String,
        required: true
    },
    eventName: {
        type: String,
        required: true
    },
    paymentScreenshotUrl: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Registration = mongoose.model('Registration', registrationSchema);
export default Registration;
