import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  sender: { type: String, enum: ['user', 'admin'], required: true }, // хто відправив
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // id користувача
  message: { type: String, required: true },    // текст повідомлення
  createdAt: { type: Date, default: Date.now }  // коли відправлено
});

export default mongoose.model('SupportChat', MessageSchema);
