import React from 'react'
import '../styles/profile.css'
import { Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import env from '../env.json'
import Swal from 'sweetalert2'
import { Divider, Space, Tag } from 'antd';
import Loader from '../components/Loader';
const Profile = () => {
  
  const [userDetails,setUserDetails] = useState({})
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const name = localStorage.getItem('userName')
  const userId = localStorage.getItem('userId')
  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
    async function getUserDetails(){
        try {
          const {data} = await axios.get(`${env.backend_url_user}/getSingleUsers/${userId}`)
          console.log(data);
          setUserDetails(data)
        } catch (error) {
          console.log(error);
        }
    }
    getUserDetails()
  }, [])
  return (
    <div>
      <Tabs defaultActiveKey="1" className='pContainer'>
        <TabPane tab="Profile" key="1" className='pProfile'>
          <p>Name : <b>{userDetails.firstName} {userDetails.lastName}</b></p>
          <p>Email : <b>{userDetails.email}</b></p>
          <p>Email Verified : <b>{userDetails.EmailVerified ? 'Verified' : 'Not Verified'}</b></p>
          <p>Admin Rights : <b>{userDetails.isAdmin ? 'Yes' : 'No'}</b></p>
        </TabPane>
        <TabPane tab="Bookings" key="2">
          <MyBooking />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Profile



export function MyBooking() {
  const [loading,setLoading] = useState(false)
  const userId = localStorage.getItem('userId')
  const [rooms, setRooms] = useState([])
  useEffect(() => {
    const getAllBookings = async () => {
      try {
        setLoading(true)
        const { data } = await axios.post(`${env.backend_url_bookedroom}/getBookingsOfUser`, { userId })
        console.log(data);
        setRooms(data)
        setLoading(false)
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
    }
    getAllBookings()
  }, [])
  async function cancelBooking(bookingId, roomId) {
    try {
      setLoading(true)
      const { data } = await axios.post(`${env.backend_url_bookedroom}/cancelBooking`, { bookingId, roomId })
      console.log(data);
      Swal.fire({
        icon: 'success',
        title: 'Cancelled Successfull',
        text: data
      })
      setLoading(false)
      // window.location.reload()
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }
  function isCancellationEligible(checkIn, checkOut, startTime) {
    // debugger
    const [day, month, year] = checkIn.split('-');
    const formattedDate = `${year}-${month}-${day}`;
    const cancellationTime = new Date(`${formattedDate}T${startTime}`);
    cancellationTime.setHours(cancellationTime.getHours() + 24);
    const currentTime = Date.now();
    return currentTime < cancellationTime.getTime();
  }
  return (
    <>
     {loading ? (<Loader/>)  :( <div>
      <div className="row">
        <div className="col-md-6">
          {rooms.toReversed().map((room) => {
            return (
              <div className='pBookingsContainer' >
                <div className='pBookingsContent' key={room._id}>
                  <h3 className='pBookingHeading'>Booked Room : {room.roomName}</h3>
                  <p><b>Total Amount : </b>{room.totalAmount}</p>
                  <p><b>Room Capacity : </b>{room.roomSize}</p>
                  <p><b>Check In : </b>{room.checkIn}</p>
                  <p><b>Check Out : </b>{room.checkOut}</p>
                  <p><b>Start Time : </b>{room.bookingStartTime}</p>
                  <p><b>End Time : </b>{room.bookingEndTime}</p>
                  <p><b>Status : </b>{room.status === 'Booked' ? <Tag bordered={false} color="success"> CONFIRMED</Tag> : <Tag bordered={false} color="error">CANCELLED
      </Tag> }</p>
                  {
                    isCancellationEligible(room.checkIn, room.checkOut, room.bookingStartTime) ?
                     (room.status !== 'cancelled' && (<button className='pBookingsBtn' onClick={() => cancelBooking(room._id, room.roomId)}>Cancel Booking</button>))
                    :(<button className='pBookingsBtnDisabled' disabled={true}>Cancel Booking</button>)

                  }


                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>)}</>
   
   
  )
}
