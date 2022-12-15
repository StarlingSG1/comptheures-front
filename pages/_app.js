import { useEffect } from 'react'
import { UserContextProvider } from '../context'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (
      localStorage.getItem('comptheuresTheme') === 'dark' || (!localStorage.getItem('comptheuresTheme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  return (
    <UserContextProvider>
      <Component {...pageProps} />
    </UserContextProvider>
  )
}

export default MyApp
