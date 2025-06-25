export async function isAdmin(request) {
  // 🔐 Replace with actual session/auth check (e.g. NextAuth or JWT)
  const user = {
    id: '123',
    name: 'Anshu',
    role: 'admin' // Only this role is allowed
  };

  // Attach user to request if needed
  return user?.role === 'admin' ? user : null;
}
export async function isEditor(request) {
  // 🔐 Replace with actual session/auth check (e.g. NextAuth or JWT)
  const user = {
    id: '123',
    name: 'Anshu',
    role: 'editor' // Only this role is allowed
  };

  // Attach user to request if needed
  return user?.role === 'editor' ? user : null;
}
export async function isViewer(request) {
  // 🔐 Replace with actual session/auth check (e.g. NextAuth or JWT)
  const user = {
    id: '123',
    name: 'Anshu',
    role: 'viewer' // Only this role is allowed
  };

  // Attach user to request if needed
  return user?.role === 'viewer' ? user : null;
}