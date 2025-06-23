import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  action: String,
  role: {
    type: String,
    enum: ['admin', 'editor', 'viewer'],
    default: 'viewer',
  },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
