const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
	roomName: { type: String, required: true },
	roomSize: { type: String, required: true },
	location: { type: String, required: true },
	rentPerHr : {type:String,required:true},
	printer : {type:Boolean,required:false},
	projector : {type:Boolean,required:false},
	wifi : {type:Boolean,required:false},
	currentBooking : [],
	image:{type:String,required:true},
	isBooked:{type:Boolean,default:false}
});


const Room = mongoose.model("room", roomSchema);

module.exports = Room
