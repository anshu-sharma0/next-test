'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import { useSession, signOut } from 'next-auth/react';

const Navbar = () => {
  const pathname = usePathname()
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: ""
  })
  const { data: session } = useSession();
  const dropdownRef = useRef(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleLogout = async () => {
    try {
      if (!session) {
        const response = await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        });

        if (!response.ok) {
          const data = await response.json();
          console.error('Logout error:', data?.message || 'Unknown error');
          return;
        }

        document.cookie = "email=; Path=/; Max-Age=0";
        window.location.href = '/login';
      } else {
        signOut({ callbackUrl: '/login' });
      }
    } catch (error) {
      console.error('An unexpected error occurred during logout:', error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !(dropdownRef.current).contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  useEffect(() => {
    if (pathname === '/login') return

    const fetchRole = async () => {
      try {
        const res = await fetch('/api/user')
        const data = await res.json()
        setUser(prev => ({
          ...prev,
          name: data.name,
          email: data.email,
          role: data.role
        }))
      } catch (error) {
        console.error('Error fetching user role:', error)
      }
    }
    if (!session) {
      fetchRole()
    } else {
      setUser(prev => ({
        ...prev,
        name: session?.user.name,
        email: session?.user.email,
      }))
    }
  }, [pathname, session])

  return (
    <nav className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      <div className="text-2xl font-bold text-gray-800">Audit Logs</div>

      {pathname !== '/login' && (
        <div className="flex items-center space-x-6">
          <Link
            href="/logs"
            className={`hover:text-blue-600 font-medium transition-colors duration-200 ${pathname === '/logs' ? "text-blue-600" : "text-gray-800"
              }`}
          >
            Logs
          </Link>

          {(session || user.role === 'admin') && (
            <>
              <Link
                href="/admin/permissions"
                className={`hover:text-blue-600 font-medium transition-colors duration-200 ${pathname === '/admin/permissions' ? "text-blue-600" : "text-gray-800"
                  }`}
              >
                Permissions
              </Link>

              <Link
                href="/admin/addUser"
                className={`hover:text-blue-600 font-medium transition-colors duration-200 ${pathname === '/admin/addUser' ? "text-blue-600" : "text-gray-800"
                  }`}
              >
                Add User
              </Link>
            </>
          )}

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-2 cursor-pointer rounded-lg transition-all duration-200"
            >
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-sm">
                {user.name?.charAt(0).toUpperCase() || 'U'}
              </div>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 min-w-40 bg-white border border-gray-200 rounded-lg shadow-xl z-50 animate-fade-in">
                <div className="px-4 py-3">
                  <p className="text-gray-900 font-semibold">{user.name}</p>
                  <p className="text-gray-600 text-sm">{user.email}</p>
                </div>
                <hr className="border-gray-200" />
                <button
                  onClick={handleLogout}
                  className="w-full text-left cursor-pointer px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-b-lg transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
