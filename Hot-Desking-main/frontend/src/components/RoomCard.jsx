import React from "react";
import { Link } from "react-router-dom";
import '../styles/roomcard.css'
const RoomCard = ({ data,checkIn,checkOut,btnFlag}) => {

  return (
    <>
      <div className="roomCardContainer">
        <img src={data.image} alt="Room Thumbnail" className="roomCardImg"></img>
        <div className="roomCardRightContainer">
          <div>
            <p className="roomCardRoomName"> Room-Name : <b>{data.roomName}</b></p>
          </div>
          <div>
            <p>Capacity : <b> {data.roomSize}</b></p>
          </div>
          <div>
            <p>Rent Per Hour : <b> {data.rentPerHr}</b></p>
          </div>
          { btnFlag && (  <Link to={`/singleroom/${checkIn}/${checkOut}/${data._id}`}>
            <button className="roomCardbtn">BookNow</button>
          </Link>) }
        
        </div>
      </div>
    </>
  );
};

export default RoomCard;
