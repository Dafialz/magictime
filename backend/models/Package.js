import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  price:       { type: Number, required: true },
  duration:    { type: Number, required: true }, // у днях
  tokens:      { type: Number, required: true },
  description: { type: String },
  // додай тут ще інші поля, якщо потрібно
}, { timestamps: true });

export default mongoose.model('Package', packageSchema);
