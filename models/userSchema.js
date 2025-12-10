import mongoose from 'mongoose';

const emailAccountSchema = new mongoose.Schema({
  uid: String,
  email: String,
  password: Object,
  token: {
  type: String,
  required: false
}
}, { timestamps: true });

const emailSignup = mongoose.model('users', emailAccountSchema);
export default emailSignup;
