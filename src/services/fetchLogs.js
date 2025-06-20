export const fetchLogs = async () => {
  const res = await fetch('/api/users/log-users');
  if (!res.ok) throw new Error('Failed to fetch logs');
  const data = await res.json();
  return data.sort((a, b) => a.id - b.id);
};
