const router = require("express").Router();
const Room = require("../models/Room");
const BookedRoom =require('../models/BookedRooms')
const {v4 : uuidv4} = require('uuid')
const stripe = require('stripe')('sk_test_51NRyzPH4DlHcvcxti9kiSOmywAllndORhV98nGNr73sXuT40dEX1mnFEslD5MQICCXKDZE2ZCxJ9Coe7vHHunv6c00VLZpklXH')
const Redis = require('redis')
const redisClient = Redis.createClient()
const EXPIRATION = 3600
async function RedisConnect() {
    await redisClient.connect();
}
RedisConnect()

// Get All Bookings for Admin Panel
router.get('/getAllBookings',async(req,res)=>{
    try {
        const allBooking = await redisClient.get("getAllBookings")
        if (allBooking !== null) {
            console.log('Cache Hit');
            return res.status(200).send(JSON.parse(allBooking))
        } else {
            console.log('Cache Miss');
            const resp = await BookedRoom.find({})
            redisClient.setEx('getAllBookings',1, JSON.stringify(resp))
            return res.status(200).send(resp)
        }
    } catch (error) {
        return res.status(500).send(error)
    }
})

// Booking Rooms Route
router.post("/", async (req, res) => {
    const {token,totalAmount} = req.body
    try {
        const customer = await stripe.customers.create({
            email : token.email,
            source : token.id
        })
        const payment = await stripe.paymentIntents.create({
            amount : totalAmount * 100,
            customer : customer.id,
            currency : 'inr',
            receipt_email : token.email
        },{
            idempotencyKey : uuidv4()
        })
        if(payment){
            const newBooking = new BookedRoom(req.body)
            const room = await Room.findById({_id:req.body.roomId})
            room.currentBooking.push({fromDate:req.body.checkIn,toDate:req.body.checkOut,bookingStartTime:req.body.bookingStartTime,bookingEndTime:req.body.bookingEndTime,bookingId:newBooking._id})
            room.isBooked = true
            await room.save()
            await newBooking.save()
            await redisClient.flushAll()
            return res.status(200).send({message:'Payment Done, Room Booked Successfully'})
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
});

// This route is for profile page, where we will get all bookings of particular user
router.post('/getBookingsOfUser',async(req,res)=>{
    try {
        const bookingOfUser = await redisClient.get("getBookingsOfUser")
        if (bookingOfUser !== null) {
            console.log('Cache Hit');
            return res.status(200).send(JSON.parse(bookingOfUser))
        } else {
            console.log('Cache Miss');
            const resp = await BookedRoom.find({userId: req.body.userId})
            redisClient.setEx('getBookingsOfUser', EXPIRATION, JSON.stringify(resp))
            return res.status(200).send(resp)
        }
    } catch (error) {
        console.log('errr',error);
        res.status(500).send(error)
    }
})
// Route to Cancel Booking
router.post('/cancelBooking',async(req,res)=>{
    const {bookingId,roomId} = req.body
    try {
        await redisClient.flushAll()
        const bookedRoom = await BookedRoom.findOne({_id: bookingId})
        bookedRoom.status = 'cancelled'
        await bookedRoom.save()
        const room = await Room.findOne({_id:roomId})
        const tempArray = room.currentBooking.filter((item)=>item.bookingId.toString() !== bookingId)
        room.currentBooking = tempArray
        await room.save()
        return res.status(200).send('Your Booking Cancelled Successfully.')
    } catch (error) {
        console.log('errr',error);
        return res.status(500).send(error)
    }
})

module.exports = router;