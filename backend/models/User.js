import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  referrerLogin: { type: String, default: null },
  invitedBy: { type: String, default: null },
  // інші поля
});

const User = mongoose.model('User', userSchema);
export default User;
