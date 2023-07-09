import React from 'react'
import '../styles/home.css'
import {Link} from 'react-router-dom'
const home = () => {
  return (
    <div className='home-container homeBg'>
        <div className='home-title'>
        <div className="home-heading">
            <h1>Welcome to Our Room Of Requriements</h1>
            <h1>Online Booking Website</h1>
        </div>
        <div className="home-para">
            <p>We Provide Best in world Meeting Room for you to book and dicuss your bussiness needs.</p>
        </div>
        <div >
            <Link to='/bookdesk'><button className="home-btn">Discover Now</button></Link>
        </div>
        </div>
    </div>
  )
}

export default home