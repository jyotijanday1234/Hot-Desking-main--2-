const router = require("express").Router();
const Room = require("../models/Room");

// To get all Rooms
router.get("/", async (req, res) => {
	try {
        const resp = await Room.find({})
        res.status(200).send(resp)
    } catch (error) {
        console.log('errr',error);
        res.status(500).send(error)
    }
});
router.post("/", async (req, res) => {
	try {
        console.log(req.body);
        const resp = await Room.find()
        console.log('resp',resp);
        res.status(200).send(resp)
    } catch (error) {
        console.log('errr',error);
        res.status(500).send(error)
    }
});

router.get('/:id',async(req,res)=>{
    console.log('Hitted',req.params.id);
    try {
        const room = await Room.findOne({ _id: req.params.id });
        res.status(200).send(room)
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})
router.get('/:location/:signIn/:signOut',async(req,res)=>{
    console.log('Hitted',req.params.location);
    try {
        const rooms = await Room.find({ location: req.params.location });
        res.status(200).send(rooms)
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})

router.post('/createrooms',async(req,res)=>{
    try {
        console.log(req.body);
        const newObj = await Room.create(req.body)
        await newObj.save()
        return res.status(200).send({message:'New Meeting Room Created Successfully.'})
    } catch (error) {
        return res.status(401).send({ message: "Something Went Wrong, Try Again" });
    }
})
module.exports = router;