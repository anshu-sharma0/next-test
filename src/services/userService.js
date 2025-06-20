export const addUser = async ({ name, role }) => {
  const res = await fetch('/api/users/add-user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, role }),
  });
  const data = await res.json();
//   if (!res.ok) throw new Error(data?.error || 'Something went wrong');
  return data;
};

export const updateUserRole = async (id, newRole) => {
  const res = await fetch(`/api/users/${id}/role`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role: newRole }),
  });
  if (!res.ok) throw new Error('Failed to update role');
  return res.json();
};
