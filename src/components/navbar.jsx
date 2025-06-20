'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

const Navbar = () => {
  const pathname = usePathname();
  const handleLogout = async () => {
    const response = await fetch('/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });
    const data = await response.json();
    if (data.status === 200) {
      window.location.href = '/login';
    }
  };

  const isAdmin = () => {
    const role = request.cookies.get('role')?.value;
    return role === 'admin';
  };

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex items-center justify-between">
      <div className="text-xl font-semibold text-gray-800">
        Audit Logs
      </div>

      {pathname !== '/login' && <div className="flex items-center space-x-6">
        <Link href="/logs" className={`hover:text-blue-600 transition-colors ${isAdmin ? "" : "hidden"} ${pathname === '/logs' ? "text-blue-500" : "text-gray-700"}`}>
          Logs
        </Link>
        <Link href="/admin/permissions" className={`hover:text-blue-600 transition-colors ${pathname === '/admin/permissions' ? "text-blue-500" : "text-gray-700"}`}>
          Permissions
        </Link>
        <Link href="/admin/addUser" className={`hover:text-blue-600 transition-colors ${pathname === '/admin/addUser' ? "text-blue-500" : "text-gray-700"}`}>
          Add User
        </Link>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition-colors cursor-pointer"
        >
          Logout
        </button>
      </div>}
    </nav>
  )
}

export default Navbar
