import React from 'react'
import { Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import env from '../env.json'
import Loader from '../components/Loader';
import Swal from 'sweetalert2'
import '../styles/admin.css'
import CreateRooms from '../components/CreateRooms';
const Admin = () => {
    const navigate = useNavigate()
    const [loading,setLoading] = useState(true)
    const [isAdmin,setIsAdmin] = useState(false)
    const userId = localStorage.getItem('userId')
    const token = localStorage.getItem('token')
    useEffect(()=>{
        async function checkAdmin(){
            try {
                setLoading(true)
                const {data} = await axios.get(`${env.backend_url_user}/checkAdmin/${userId}`)
                setIsAdmin(data)
                if(!data || token==null){
                    Swal.fire({
                        icon: 'warning',
                        title: 'Admin Route',
                        text: 'Only Admin has access to this Page',
                        footer: 'You will be Redirecting to Home Page.'
                      }).then(()=>{
                        setLoading(false)
                        navigate('/home')
                      })
                }
                setLoading(false)
            } catch (error) {
                console.log(error);
                setLoading(false)
            }
        }
        checkAdmin()
    },[])
    return ( <>
        {loading && (<Loader/>)}
       {isAdmin && ( <div className='adminMainContainer'>
        <h3 className='adminHeading'>Admin Panel</h3>
        <Tabs defaultActiveKey="1" className='pContainer'>
            <TabPane tab="Booked Rooms" key="1">
                <Bookings/>
            </TabPane>
            <TabPane tab="Rooms" key="2">
                <Rooms/>
            </TabPane>
            <TabPane tab="Create Room" key="3">
                <CreateRooms/>
            </TabPane>
            <TabPane tab="Users" key="4">
                <Users/>
            </TabPane>
        </Tabs>
    </div>)}
    </>
    )
}

export default Admin



export function Bookings(){
  const [loading,setLoading] = useState(true)
  const [booking,setBooking] = useState([])
  useEffect(()=>{
    async function getAllBookings(){
        try {
            const {data} = await axios.get(`${env.backend_url_bookedroom}/getAllBookings`)
            // console.log(data);
            setBooking(data)
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)

        }
    }
    getAllBookings()
  },[])
  return (
    <div className='row bookingsContainer'>
        <div className="col-md-10">
            {loading && (<Loader/>)}
            {booking.length && (  <table className='table table-bordered table-striped'>
                <thead>
                    <tr>
                        <th>Booking Id</th>
                        <th>User Id</th>
                        <th>Room Name</th>
                        <th>CheckIN</th>
                        <th>CheckOut</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {booking.toReversed().map((b)=>{
                        return <tr key={b._id}>
                            <td>{b._id}</td>
                            <td>{b.userId}</td>
                            <td>{b.roomName}</td>
                            <td>{b.checkIn}</td>
                            <td>{b.checkOut}</td>
                            <td>{b.status.toUpperCase()}</td>
                        </tr>
                    })}
                </tbody>
            </table>)}
          
        </div>
    </div>
  )
}

export function Rooms(){
    const [loading,setLoading] = useState(true)
    const [room,setRoom] = useState([])
    useEffect(()=>{
      async function getAllrooms(){
          try {
              const {data} = await axios.get(`${env.backend_url_room}`)
            //   console.log(data);
              setRoom(data)
              setLoading(false)
          } catch (error) {
              console.log(error);
              setLoading(false)
  
          }
      }
      getAllrooms()
    },[])
    return (
      <div className='row'>
          <div className="col-md-10">
              {loading && (<Loader/>)}
              {room.length && (   <table className='table table-bordered table-striped'>
                  <thead>
                      <tr>
                          <th>Room Id</th>
                          <th>RoomName</th>
                          <th>RoomSize</th>
                          <th>Location</th>
                      </tr>
                  </thead>
                  <tbody>
                      {room.map((b)=>{
                          return <tr key={b._id}>
                              <td>{b._id}</td>
                              <td>{b.roomName}</td>
                              <td>{b.roomSize}</td>
                              <td>{b.location}</td>
                          </tr>
                      })}
                  </tbody>
              </table>)}
           
          </div>
      </div>
    )
}

export function Users(){
    const [loading,setLoading] = useState(true)
    const [user,setUser] = useState([])
    useEffect(()=>{
      async function getAllusers(){
          try {
              const {data} = await axios.get(`${env.backend_url_user}/getAllUsers`)
              console.log(data);
              setUser(data)
              setLoading(false)
          } catch (error) {
              console.log(error);
              setLoading(false)
  
          }
      }
      getAllusers()
    },[])
    return (
      <div className='row'>
          <div className="col-md-10">
              {loading && (<Loader/>)}
              {user.length && (   <table className='table table-bordered table-striped'>
                  <thead>
                      <tr>
                          <th>User Id</th>
                          <th>UserName</th>
                          <th>UserEmail</th>
                          <th>Email Verified</th>
                          <th>isAdmin</th>
                      </tr>
                  </thead>
                  <tbody>
                      {user.map((b)=>{
                          return <tr key={b._id}>
                              <td>{b._id}</td>
                              <td>{b.firstName} {b.lastName}</td>
                              <td>{b.email}</td>
                              <td>{b.verified ? 'Yes' : 'No'}</td>
                              <td>{b.isAdmin ? 'Yes' : 'No'}</td>
                          </tr>
                      })}
                  </tbody>
              </table>)}
           
          </div>
      </div>
    )
}


