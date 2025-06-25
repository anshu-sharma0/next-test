import mongoose from 'mongoose';

const AuditLogSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    action: {
        type: String,
        enum: ['login', 'logout', 'password reset', 'role changed', 'user updates', 'user created'],
        default: 'user created',
        required: true
    },
    role: { type: String, required: true },
    meta: { type: Object },
}, {
    collection: 'audit_logs',
    timestamps: true,
});

export default mongoose.models.AuditLog || mongoose.model('AuditLog', AuditLogSchema);
