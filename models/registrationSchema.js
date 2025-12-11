import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    teamName: {
        type: String,
        required: true
    },
    teamNumber: {
        type: String,
        required: true
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
    }
}, { timestamps: true });

const Registration = mongoose.model('Registration', registrationSchema);
export default Registration;
