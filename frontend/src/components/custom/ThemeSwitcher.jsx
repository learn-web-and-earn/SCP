import { toggleTheme } from '@/store/themeStore'
import { MoonIcon, SunIcon } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const ThemeSwitcher = () => {

  const dispatch = useDispatch()

  const theme = useSelector((state) => state.theme.theme)

  return (
    <div>
      <button onClick={() => dispatch(toggleTheme())} className='cursor-pointer text-gray-600 dark:text-gray-300 font-semibold flex items-center'>
        {theme === 'light' ?
          <>
            <MoonIcon className='inline mb-1 mr-1' size={20} />
          </>
          :
          <>
            <SunIcon className='inline mb-1 mr-1' size={20} />
          </>
        }
      </button>
    </div>
  )
}

export default ThemeSwitcher