import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  id: String,
  action: String,
  role: {
    type: String,
    enum: ['admin', 'editor', 'viewer'],
    default: 'viewer',
  },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
