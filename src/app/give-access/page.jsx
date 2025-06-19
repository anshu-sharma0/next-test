'use client'

import Link from 'next/link';
import React, { useEffect } from 'react'

const AuthorizedPage = () => {

  useEffect(() => {
    document.cookie = "role=admin; path=/"; 
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
      <div className="bg-white rounded-lg shadow-lg p-10 max-w-md w-full">
        <h1 className="text-4xl font-extrabold text-green-700 mb-6">
          🎉 Congratulations!
        </h1>
        <p className="text-gray-700 mb-8 text-lg">
          You are now authorized to access admin features.
        </p>
        <Link href="/admin/permissions">
          <p className="inline-block bg-green-600 text-white px-8 py-3 rounded-md font-semibold text-lg hover:bg-green-700 transition">
            Go to Users
          </p>
        </Link>
      </div>
    </div>
  )
}

export default AuthorizedPage
