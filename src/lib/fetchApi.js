export const fetchApi = async (apiEndPoint, options = {}) => {
  try {
    const res = await fetch(apiEndPoint, options);

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Failed to fetch data');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
