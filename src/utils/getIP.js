const getIP = async () => {
    try {
        const res = await fetch('https://api.ipify.org?format=json');
        const data = await res.json();
        return data.ip;
    } catch (error) {
        console.error('Failed to fetch IP address', error);
        return 'Unknown';
    }
};

export default getIP;