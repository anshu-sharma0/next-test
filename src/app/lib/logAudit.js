import dbConnect from './mongoose';
import AuditLog from '../models/AuditLog';

export default async function logAudit({
  name,
  email,
  password,
  role,
  action,
  meta = {}
}) {
  try {
    await dbConnect();
    await AuditLog.create({ name, email, password, role, action, meta });
    console.log(`✅ Audit log saved for ${action}`);
  } catch (err) {
    console.error('❌ Audit logging failed:', err);
  }
}
export async function getAuditLogs(limit = 100) {
  try {
    await dbConnect();
    const logs = await AuditLog.find().sort({ createdAt: -1 }).limit(limit);
    return logs;
  } catch (err) {
    console.error('❌ Failed to fetch audit logs:', err);
    throw err;
  }
}