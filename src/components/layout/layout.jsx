import React from 'react'
import Navbar from '../navbar/navbar'
import Footer from '../footer/footer'

function Layout({children}) {
  return (
    
    <div className="container mx-auto px-4 sm:px-6 lg:px-8" >
        <Navbar />
        <div className="content">
          {children}
        </div>
        <Footer/>
    </div>
    
  )
}

export default Layout
