export const fetchLogs = async () => {
  const res = await fetch('/api/users/log-users');
  if (!res.ok) throw new Error('Failed to fetch logs');
  const data = await res.json();
  return data.sort((a, b) => a.id - b.id);
};

export const fetchUsersByRole = async (role) => {
  try {
    const res = await fetch (`/api/users/getRole?role=${role}`);
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Failed to fetch users');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}
