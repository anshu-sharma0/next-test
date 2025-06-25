import React from 'react'
import { RefreshCw } from 'lucide-react'

const Loader = () => {
    return (
        <div className="p-6 flex items-center justify-center h-[300px]">
            <RefreshCw className="w-5 h-5 animate-spin text-blue-600 mr-2" />
            <span className="text-gray-600"> Loading</span>
        </div>
    )
}

export default Loader