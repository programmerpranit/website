import { useEffect, useState } from 'react'
import { Footer } from '../components/Footer'
import Navbar from '../components/Navbar'
import '../styles/globals.css'
import Head from 'next/head'


function MyApp({ Component, pageProps }) {

  const [user, setUser] = useState(null)


  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token) {
      setUser(token)
    }

  }, [])
  

  return <>
    
          <Head>
        <title>Pranit Patil</title>
        <meta name="description" content="Portfolio Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

    <Navbar user={user}/>

  <Component {...pageProps} setUser={setUser}/>
  
    <Footer/>

  </>
}

export default MyApp
