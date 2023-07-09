const mongoose = require("mongoose");

const bookedRoomSchema = new mongoose.Schema({
	userId: { type: String, required: true },
	roomId: { type: String, required: true },
    roomName:{ type: String, required: true },
    roomSize : {type:Number,required:true},
	checkIn: { type: String, required: true },
	checkOut: { type: String, required: true },
	totalAmount: { type: String, required: true },
	bookingStartTime:{type:String,required:true},
	bookingEndTime:{type:String,required:true},
	status:{type:String,required:true,default:'Booked'},
	meetingUsers:[{name:String,email:String}]
});


const BookedRoom = mongoose.model("bookedroom", bookedRoomSchema);

module.exports = BookedRoom
