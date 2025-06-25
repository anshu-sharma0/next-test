const getBrowserMeta = () => {
    return {
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
    };
};

export default getBrowserMeta;