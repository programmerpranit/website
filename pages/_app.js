import { useEffect, useState } from 'react'
import { Footer } from '../components/Footer'
import Navbar from '../components/Navbar'
import '../styles/globals.css'


function MyApp({ Component, pageProps }) {

  const [user, setUser] = useState(null)


  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token) {
      setUser(token)
    }

  }, [])
  

  return <>

    <Navbar user={user}/>

  <Component {...pageProps} setUser={setUser}/>
  
    <Footer/>

  </>
}

export default MyApp
