import { useLayoutContext } from '@/hooks/LayoutContextContext'
import { FC, useEffect } from 'react'

const ThemeToggleLogo: FC = () => {
  const { darkTheme, setDarkTheme } = useLayoutContext()
  const handleToggle = () => {
    setDarkTheme(!darkTheme)
  }
  const storeUserSetPreference = pref => {
    window.localStorage.setItem('theme', pref)
  }
  const Logo = () => {
    return (
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          display: 'inline-block',
        }}
        onClick={handleToggle}
      >
        <path
          d="M5.99864 12.375H7.2583C7.63233 10.8354 8.40519 9.43824 9.48905 8.34217C10.5729 7.2461 11.9243 6.49512 13.3897 6.17454C14.8551 5.85397 16.3757 5.97667 17.7788 6.52869C19.1819 7.08072 20.4111 8.03993 21.3268 9.29734C22.2426 10.5548 22.8081 12.0599 22.9591 13.6419C23.1102 15.2238 22.8407 16.819 22.1813 18.2463C21.5219 19.6736 20.499 20.8757 19.2289 21.716C17.9588 22.5563 16.4923 23.0012 14.9962 23H5.99864C4.67292 23 3.40149 22.4403 2.46407 21.444C1.52664 20.4477 1 19.0965 1 17.6875C1 16.2785 1.52664 14.9273 2.46407 13.931C3.40149 12.9347 4.67292 12.375 5.99864 12.375Z"
          // fill="transparent"
        />
        <path
          d="M5.99864 12.375H7.2583C7.63233 10.8354 8.40519 9.43824 9.48905 8.34217C10.5729 7.2461 11.9243 6.49512 13.3897 6.17454C14.8551 5.85397 16.3757 5.97667 17.7788 6.52869C19.1819 7.08072 20.4111 8.03993 21.3268 9.29734C22.2426 10.5548 22.8081 12.0599 22.9591 13.6419C23.1102 15.2238 22.8407 16.819 22.1813 18.2463C21.5219 19.6736 20.499 20.8757 19.2289 21.716C17.9588 22.5563 16.4923 23.0012 14.9962 23H5.99864C4.67292 23 3.40149 22.4403 2.46407 21.444C1.52664 20.4477 1 19.0965 1 17.6875C1 16.2785 1.52664 14.9273 2.46407 13.931C3.40149 12.9347 4.67292 12.375 5.99864 12.375Z"
          // fill="transparent"
        />
      </svg>
    )
  }

  useEffect(() => {
    const initialColorValue = document.documentElement.style.getPropertyValue(
      '--initial-color-mode',
    )
    setDarkTheme(initialColorValue === 'dark')
  }, [])

  useEffect(() => {
    if (darkTheme) {
      document.documentElement.setAttribute('data-theme', 'dark')
      storeUserSetPreference('dark')
    } else {
      document.documentElement.removeAttribute('data-theme')
      storeUserSetPreference('light')
    }
  }, [darkTheme])

  return <Logo />
}

export default ThemeToggleLogo
