const getCookieValue = (name) => {
  if (typeof document === 'undefined') return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    try {
      return decodeURIComponent(parts.pop().split(';').shift());
    } catch (e) {
      console.error('Failed to decode cookie value:', e);
      return null;
    }
  }

  return null;
};

export default getCookieValue;