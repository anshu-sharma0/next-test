'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Navbar = () => {
  const pathname = usePathname()
  const [role, setRole] = useState("")

  const getCookieValue = (name) => {
    const cookies = document.cookie.split('; ')
    const cookie = cookies.find(row => row.startsWith(`${name}=`))
    return cookie ? decodeURIComponent(cookie.split('=')[1]) : null
  }

  const handleLogout = async () => {
    const email = getCookieValue('email')

    const response = await fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })

    const data = await response.json()
    if (response.status === 200) {
      document.cookie = "email=; Path=/; Max-Age=0"
      window.location.href = '/login'
    } else {
      console.error('Logout error:', data.message)
    }
  }

  useEffect(() => {
    if (pathname === '/login') {
      return
    }
    const fetchRole = async () => {
      try {
        const res = await fetch('/api/user')
        const data = await res.json()
        setRole(data.role || "")
      } catch (error) {
        console.error('Error fetching user role:', error)
      }
    }
    fetchRole()
  }, [pathname])

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex items-center justify-between">
      <div className="text-xl font-semibold text-gray-800">Audit Logs</div>

      {pathname !== '/login' && (
        <div className="flex items-center space-x-6">
          <Link
            href="/logs"
            className={`hover:text-blue-700 transition-colors ${pathname === '/logs' ? "text-blue-700" : "text-gray-800"}`}
          >
            Logs
          </Link>

          <Link
            href="/admin/permissions"
            className={`hover:text-blue-700 transition-colors ${role !== 'viewer' ? "" : "hidden"} ${pathname === '/admin/permissions' ? "text-blue-700" : "text-gray-800"}`}
          >
            Permissions
          </Link>

          <Link
            href="/admin/addUser"
            className={`hover:text-blue-700 transition-colors ${role === 'admin' ? "" : "hidden"} ${pathname === '/admin/addUser' ? "text-blue-700" : "text-gray-800"}`}
          >
            Add User
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition-colors cursor-pointer"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  )
}

export default Navbar
