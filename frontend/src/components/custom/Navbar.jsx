import React from 'react'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { logout, setLoggedIn } from '@/store/authSlice'
import { Link } from 'react-router-dom'
import ThemeSwitcher from './ThemeSwitcher'

const Navbar = () => {

  const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()

  const handleLogout = () => {
    // Implement logout functionality here
    dispatch(logout())
    dispatch(setLoggedIn(false))
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  }

  return (
    <div className='w-full h-16 bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-600 shadow-sm flex items-center px-4'>
      <div className='flex justify-between items-center w-full container mx-auto'>
        <img className='w-40' src="/NavLogo.png" alt="ClipZen" />
        <div className='flex items-center gap-4'>
          <ThemeSwitcher />
          {user ? (
            <Button size="sm" className='ml-4' onClick={handleLogout}>Log Out</Button>
          ) : (
            <div className='flex items-center justify-center gap-4'>
              <Link to="/login" className='font-semibold'>Log In</Link>
              <Link to="/register" className='font-semibold'>Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar