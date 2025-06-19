// app/unauthorized/page.tsx (or wherever your page file is)

import Link from 'next/link'
import React from 'react'

const UnauthorizedPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
            <h1 className="text-3xl font-bold text-red-600 mb-4">Unauthorized Access</h1>
            <p className="text-gray-700 mb-6">Sorry, you are not authorized to view this page.</p>
            <Link href="/give-access">
                <p className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                    Authorize Yourself
                </p>
            </Link>
        </div>
    )
}

export default UnauthorizedPage
