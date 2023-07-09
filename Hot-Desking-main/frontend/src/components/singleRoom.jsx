import React, { useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import '../styles/singleroom.css'
import axios from 'axios'
import env from '../env.json'
import Swal from 'sweetalert2'
import Loader from '../components/Loader';
import StripeCheckout from 'react-stripe-checkout';

const SingleRoom = () => {
    const [data, setData] = useState([])
    const navigate = useNavigate()
    const [capacity, setCapacity] = useState(0)
    const [loading,setLoading] = useState(false)
    const [totalAmount,setTotalAmount] = useState(null)
    const [bookingStartTime, setBookingStartTime] = useState(null)
    const [bookingEndTime, setBookingEndTime] = useState(null)
    const [formValues, setFormValues] = useState([{ name: "", email: "" }])
    const param = useParams();
    const userId = localStorage.getItem('userId')
    useEffect(() => {
        console.log('inside useEffect');
        const url = `${env.backend_url_room}/${param.id}`;
        console.log(url);
        const fectchRoom = async () => {
            try {
                console.log(url);
                const { data } = await axios.get(url);
                console.log('data', data);
                setCapacity(data.roomSize)
                setData(data)
            } catch (error) {
                console.log(error);
            }
        }
        fectchRoom()
    }, [])
    console.log('ca', capacity);
    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
    }

    let addFormFields = () => {
        setCapacity(preValue => preValue - 1)
        setFormValues([...formValues, { name: "", email: "" }])
    }

    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
        setCapacity(preValue => preValue + 1)
    }

    let handleSubmit = async (event) => {
        event.preventDefault();
        // const obj = {
        //     userId,
        //     roomId: param.id,
        //     roomName: data.roomName,
        //     roomSize: data.roomSize,
        //     checkIn: param.checkIn,
        //     checkOut: param.checkOut,
        //     bookingStartTime,
        //     bookingEndTime,
        //     meetingUsers: formValues
        // }
        // try {
        //     setLoading(true)
        //     const response = await axios.post(env.backend_url_bookedroom, obj)
        //     Swal.fire({
        //         icon: 'success',
        //         title: 'Room Booked Successfully',
        //         footer: 'You will be Redirecting to Profile Page.'
        //       }).then(()=>{
        //         navigate('/profile')
        //       })
        //     setLoading(false)
        // } catch (error) {
        //     Swal.fire({
        //         icon: 'error',
        //         title: 'Booking Failed',
        //         text: error.response.data.message,
        //       })
        //     setLoading(false)
        // }
        // console.log(response);
        // alert(JSON.stringify(formValues));
    }
    function calulateTotalAmount(){
        console.log(bookingStartTime);
        console.log(bookingEndTime);
        let totalHrs = calulateTotalHrs(bookingStartTime,bookingEndTime)
        console.log('totalHrs',totalHrs);
        let tA = Number(data.rentPerHr) * Number(totalHrs)
        console.log(tA);
        setTotalAmount(tA)
    }
    function calulateTotalHrs(startTime,endTime){
        const startParts = startTime.split(":");
        const endParts = endTime.split(":");

        // Convert the hours and minutes to numbers
        const startHour = parseInt(startParts[0], 10);
        const startMinute = parseInt(startParts[1], 10);
        const endHour = parseInt(endParts[0], 10);
        const endMinute = parseInt(endParts[1], 10);

        // Calculate the difference in hours and minutes
        let hourDiff = endHour - startHour;
        let minuteDiff = endMinute - startMinute;

        // Adjust for negative minute difference and borrow an hour
        if (minuteDiff < 0) {
            hourDiff--;
            minuteDiff += 60;
        }

        // Convert the minute difference to decimal hours
        const minuteDecimal = minuteDiff / 60;

        // Calculate the total hours
        let totalHours = hourDiff + minuteDecimal
        totalHours = Math.ceil(totalHours);
        return totalHours;

    }
    async function onToken(token){
        console.log(token);
         const obj = {
            userId,
            totalAmount,
            roomId: param.id,
            roomName: data.roomName,
            roomSize: data.roomSize,
            checkIn: param.checkIn,
            checkOut: param.checkOut,
            bookingStartTime,
            bookingEndTime,
            meetingUsers: formValues,
            token
        }
        console.log(obj);
        try {
            setLoading(true)
            const response = await axios.post(env.backend_url_bookedroom, obj)
            Swal.fire({
                icon: 'success',
                title: 'Room Booked Successfully',
                footer: 'You will be Redirecting to Profile Page.'
              }).then(()=>{
                navigate('/profile')
              })
            setLoading(false)
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Booking Failed',
                text: error.response.data.message,
              })
            setLoading(false)
        }
    }
    return ( <>
    {loading ? (<Loader/>) : (  <div className='srMainContainer'>
    <h1 className='srRoomName'>Meeting Room: {data.roomName}</h1>
    <div className='srContainer'>
        <img src={data.image} alt="" className='srImg' />
        <div>
            <div className='srRoomDetails'> 
                <p className='srRoomInfo'>CheckIn :<b> {param.checkIn}</b></p>
                <p className='srRoomInfo'>CheckOut : <b>{param.checkOut}</b></p>
                <p className='srRoomInfo'>Capacity :<b>{data.roomSize}</b> </p>
                <p className='srRoomInfo'>Rent Per Hour : <b> {data.rentPerHr}</b> </p>
            </div>
            <div>
                <div className='srBookingDetails'>
                    <h4 className='srBookingDetailsHeading'>Booking Details</h4>
                    <div className='srTimingInfo'>
                        <label htmlFor="">Booking Start Time</label>
                        <input type="time" value={bookingStartTime} onChange={(e) => setBookingStartTime(e.target.value)} /> <br />
                        <label htmlFor="">Booking End Time</label>
                        <input type="time" value={bookingEndTime} onChange={(e) => setBookingEndTime(e.target.value)} />
                    </div>
                    <button className='srTotalAmount' onClick={calulateTotalAmount} disabled={!bookingStartTime && !bookingEndTime}>Calculate Total Amount <b>{totalAmount}</b></button>
                    <form onSubmit={handleSubmit} className='srForm'>


                        <h5>People Info</h5>
                        {formValues.map((element, index) => (
                            <div className="form-inline" key={index}>
                                <label>Name</label>
                                <input type="text" name="name" value={element.name || ""} onChange={e => handleChange(index, e)} />
                                <label>Email</label>
                                <input type="text" name="email" value={element.email || ""} onChange={e => handleChange(index, e)} />
                                {
                                    index ?
                                        <button type="button" className="button remove" onClick={() => removeFormFields(index)}>Remove</button>
                                        : null
                                }
                            </div>
                        ))}
                        <div className="sr-button-section">
                            {capacity > 1 && <button className="srbutton add" type="button" onClick={() => addFormFields()}>Add</button>}
                            <StripeCheckout
        token={onToken}
        currency='INR'
        amount={  100}
        stripeKey="pk_test_51NRyzPH4DlHcvcxtZCskx8wSL7RGcZcoiwpdXRquBe7fxiGOGqyrSQjylq48t5p21Yy3kGKlOKCQpyei2n69YqFr00NjJdPbAR"
    > <button className="srbutton submit" type="submit">Pay Now</button></StripeCheckout>
                           
                        </div>
                    </form>
                </div>

            </div>
        </div>
    </div>
   
</div>)}
</>
    )
}


export default SingleRoom