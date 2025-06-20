export const logoutUser = async () => {
  const res = await fetch('/api/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  });

  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message || 'Logout failed');
  }

  return data;
};
