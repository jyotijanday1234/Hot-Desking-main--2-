const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
	roomName: { type: String, required: true },
	roomSize: { type: String, required: true },
	location: { type: String, required: true },
	rentPerHr : {type:String,required:true},
	currentBooking : [],
	image:{type:String,required:true},
	isBooked:{type:Boolean,default:false}
});


const Room = mongoose.model("room", roomSchema);

module.exports = Room
