import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import { UserContextProvider } from '../context'
import { CalendarContextProvider } from '../context/calendar'
import "react-toastify/dist/ReactToastify.min.css";
import '../styles/globals.css'
import Head from 'next/head';

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
    <>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/logox2.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <UserContextProvider>
        <CalendarContextProvider>
          <Component {...pageProps} />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </CalendarContextProvider>
      </UserContextProvider>
    </>
  )
}

export default MyApp
