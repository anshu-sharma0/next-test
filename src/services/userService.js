export const updateUserRole = async (id, newRole) => {
  const res = await fetch(`/api/users/${id}/role`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role: newRole }),
  });
  if (!res.ok) throw new Error('Failed to update role');
  return res.json();
};

export const addUser = async ({ name, role, password, email }) => {
  try {
    const res = await fetch('/api/users/add-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, role, password, email })
    });

    const data = await res.json();
    return { ...data, status: res.status };
  } catch (error) {
    console.log('Error adding user');
  }
};
