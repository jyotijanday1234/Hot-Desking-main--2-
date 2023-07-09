import * as React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import env from "../env.json";
import axios from "axios";
import RoomCard from "./RoomCard";
import Button from "@mui/material/Button";
import moment from 'moment'
import Loader from "./Loader";
import '../styles/rooms.css'
export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading,setLoading] = useState(true)
  const [bookedRooms, setBookedRooms] = useState([]);
  const [availableRoomsFlag,setAvailableRoomsFlag] =  useState(true)
  const [bookedRoomsFlag,setBookedRoomsFlag] =  useState(false)
  let [duplicateRooms,setDuplicateRooms] = useState([])
  const param = useParams();
  useEffect(() => {
    console.log("inside useEffect");
    const url = `${env.backend_url_room}/${param.location}/${param.checkIn}/${param.checkOut}`;
    (async() => {
      try {
        setLoading(true)
        const { data } = await axios.get(url);
        console.log('utk',data);
        setRooms(data);
        duplicateRooms = data
        setDuplicateRooms(duplicateRooms)
        filterRooms()
        setLoading(false)
      } catch (error) {
        console.log(error);
        setLoading(false)

      }
    })();
  }, []);
  function filterRooms(){
    // debugger
    console.log('dr',duplicateRooms);
    let tempRooms = [];
    let filteredRooms = []
    let bookedRooms = []
    for (const room of duplicateRooms) {
      const currentDateTime = moment().format('DD-MM-YYYY HH:mm');
      if (room.currentBooking.length > 0) {
        filteredRooms = []
        filteredRooms = room.currentBooking.filter((room) => {
        const bookingStartDateTime = moment(`${room.fromDate} ${room.bookingStartTime}`, 'DD-MM-YYYY HH:mm');
        const bookingEndDateTime = moment(`${room.toDate} ${room.bookingEndTime}`, 'DD-MM-YYYY HH:mm');
  
        return (
          moment(currentDateTime, 'DD-MM-YYYY HH:mm').isAfter(bookingStartDateTime) && moment(currentDateTime, 'DD-MM-YYYY HH:mm').isBefore(bookingEndDateTime)
          );     
       });
        if (filteredRooms.length === 0) {
          tempRooms.push(room);
        }else{
          bookedRooms.push(room)
        }
      } else{
        tempRooms.push(room)
      }
   }
    console.log('filtedred room',filteredRooms);
    console.log('bookedRooom',bookedRooms);
    console.log('tempRooms',tempRooms);
    setBookedRooms(bookedRooms)
    setRooms(tempRooms);
  }
  function handleAvailability1(){
    setAvailableRoomsFlag(true)
    setBookedRoomsFlag(false)
  }
  function handleAvailability2(){
      setAvailableRoomsFlag(false)
      setBookedRoomsFlag(true)
  }
  return (
    <>
    {
      loading ? (<Loader/>) : (  
      <div style={{ display: "flex" }}>
        <div style={{borderRight:'4px solid blue',width:'17%'}}>
          <div style={{marginLeft:'10px',marginTop:'15px',}}>
            <Button variant="outlined" style={{color:'green'}} onClick={handleAvailability1}>Available Rooms</Button>
          </div>
          <div style={{marginLeft:'10px',marginTop:'15px'}}>
            <Button variant="outlined" onClick={handleAvailability2}>Booked Rooms</Button>
          </div>
        </div>
      { availableRoomsFlag && (  <div className="roomsContainer-2">
        {rooms.map((d) => {
          return <RoomCard  data={d} checkIn={param.checkIn} checkOut={param.checkOut}  btnFlag={availableRoomsFlag}/>;
        })} 
      </div>) 
      }
      { bookedRoomsFlag && (  <div className="roomsContainer-2">
              {bookedRooms.map((d) => {
                return <RoomCard  data={d} checkIn={param.checkIn} checkOut={param.checkOut} btnFlag={availableRoomsFlag}/>;
              })} 
            </div>) 
      }
    
    </div>)
    }
    </>
    
  
  );
}
