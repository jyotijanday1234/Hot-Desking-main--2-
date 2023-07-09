import React from "react";
import { useEffect, useState,createContext } from "react";
import "../styles/BookDesk.css";
import {Link} from 'react-router-dom'
import { Select, MenuItem, Button } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SearchIcon from "@mui/icons-material/Search";

export const BookDeskContext = createContext()

const BookDesk = () => {
  let [roomData, setRoomData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState('default');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  function dateConverter(str){
    var date = new Date(str)
    let mnth = ("0" + (date.getMonth()+1)).slice(-2)
    let day  = ("0" + date.getDate()).slice(-2);
    let year = date.getFullYear();
    return `${day}-${mnth}-${year}`
 }
  function handleCheckIn(date){
    setCheckIn(dateConverter(date))
  }
  function handleCheckOut(date){
    setCheckOut(dateConverter(date))
  }
  return (<>
      <div className="bD-container">
        <div className="bd-sub-container-1">
          <p className="bD-para">It's time to Meet</p>
          <h1>Discover the Meeting Rooms </h1>
          <h1>Best In The World</h1>
          <p className="bD-para">
            When you Book Meeting Room,do you want to make sure your room has all
            necessary Aminities? Here's the solution
          </p>
        </div>
        <form style={{ padding: "20px" }}>
          <div className="form sub-container-2">
            <div className="location-container">
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                className="location-input"
                label='Age'
                value={location}
                onChange={(e)=>setLocation(e.target.value)}
              >
                <MenuItem disabled value="default">
                  Select Location
                </MenuItem>
                <MenuItem value="Pune">Pune</MenuItem>
                <MenuItem value="Mumbai">Mumbai</MenuItem>
                <MenuItem value="Nashik">Nashik</MenuItem>
              </Select>
            </div>
            <div className="dates-container">
              <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker label="Check In" onChange={handleCheckIn} className="date-picker" />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker label="Check Out" onChange={handleCheckOut} className="date-picker" />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <Link to={'/rooms/'+location+'/'+checkIn+'/'+checkOut}>  <Button
                className="search-btn"
                variant="contained"
                startIcon={<SearchIcon />}
              >
                Search
              </Button></Link>
            
            </div>
          </div>
        </form>
    </div>
  </>
    
    
    
  );
};

export default BookDesk;
