import React from 'react'

const LoginForm = ({ handleSubmit, name, setName, loading }) => {
    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
                        placeholder="Enter your full name"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full cursor-pointer py-3 px-6 rounded-xl font-semibold text-white transition-all duration-200 transform ${loading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl'
                        }`}
                >
                    {loading ? (
                        <div className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Signing In...
                        </div>
                    ) : (
                        'Sign In'
                    )}
                </button>
            </form>
        </div>
    )
}

export default LoginForm