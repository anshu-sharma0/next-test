export async function loginUser(name) {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, action: 'login' }),
  });

  const data = await response.json();
  return data;
}
