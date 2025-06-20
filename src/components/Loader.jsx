import React from 'react'
import { RefreshCw } from 'lucide-react'

const Loader = () => {
    return (
        <div className="bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm p-8">
                    <div className="flex items-center justify-center space-x-3">
                        <RefreshCw className="w-5 h-5 animate-spin text-blue-600" />
                        <span className="text-gray-600">Loading</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loader