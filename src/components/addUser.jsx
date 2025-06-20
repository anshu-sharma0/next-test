import React from 'react'

const AddUser = ({ handleForm, userName, setUserName, userRole, setUserRole }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 max-w-md mx-auto w-full">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Add User</h1>
            <form onSubmit={handleForm} className="space-y-4">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <input
                        id="username"
                        type="text"
                        value={userName}
                        placeholder='Enter name'
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <select
                        id="role"
                        value={userRole}
                        onChange={(e) => setUserRole(e.target.value)}
                        className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-gray-50 cursor-pointer"
                        required
                    >
                        <option value="">Select a role</option>
                        <option value="admin">Admin</option>
                        <option value="editor">Editor</option>
                        <option value="viewer">Viewer</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                >
                    Add User
                </button>
            </form>
        </div>
    )
}

export default AddUser