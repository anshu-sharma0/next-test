export const loginUser = async (email, password) => {
  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    return { ...data, status: res.status };
  } catch (err) {
    throw new Error('Failed to login');
  }
};
