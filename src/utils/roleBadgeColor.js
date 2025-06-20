const getRoleBadgeColor = (role) => {
    switch (role) {
        case 'admin':
            return 'bg-red-100 text-red-800 border-red-200';
        case 'editor':
            return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'viewer':
            return 'bg-green-100 text-green-800 border-green-200';
        default:
            return 'bg-gray-100 text-gray-800 border-gray-200';
    }
};

export default getRoleBadgeColor