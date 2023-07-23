const router = require("express").Router();
const Room = require("../models/Room");
const Redis = require('redis')
const redisClient = Redis.createClient()
const EXPIRATION = 3600
async function RedisConnect() {
    await redisClient.connect();
    console.log('Redis-Cache Connected');
}
RedisConnect()

// To get all Rooms
router.get("/", async (req, res) => {
    try {
        const room = await redisClient.get("allRooms")
        if (room != null) {
            console.log('Cache Hit');
            return res.status(200).send(JSON.parse(room))
        } else {
            console.log('Cache Miss');
            const resp = await Room.find({})
            redisClient.setEx('allRooms', EXPIRATION, JSON.stringify(resp))
            return res.status(200).send(resp)
        }
    } catch (error) {
        return res.status(500).send(error)
    }

});
router.post("/", async (req, res) => {
    try {
        console.log(req.body);
        const resp = await Room.find()
        console.log('resp', resp);
        res.status(200).send(resp)
    } catch (error) {
        console.log('errr', error);
        res.status(500).send(error)
    }
});

router.get('/:id', async (req, res) => {
    try {
        const room = await redisClient.get("roomById")
        if (room != null) {
            console.log('Cache Hit');
            return res.status(200).send(JSON.parse(room))
        } else {
            console.log('Cache Miss');
            const resp = await Room.findOne({ _id: req.params.id });
            redisClient.setEx('roomById', EXPIRATION, JSON.stringify(resp))
            return res.status(200).send(resp)
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})
//This Route is to get all rooms location-wise
router.get('/:location/:signIn/:signOut', async (req, res) => {

    try {
        const rooms = await redisClient.get("locationWiseRooms")
        if (rooms != null) {
            console.log('Cache Hit');
            return res.status(200).send(JSON.parse(rooms))
        } else {
            console.log('Cache Miss');
            const resp = await Room.find({ location: req.params.location });
            redisClient.setEx('locationWiseRooms',EXPIRATION, JSON.stringify(resp))
            return res.status(200).send(resp)
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})

router.post('/createrooms', async (req, res) => {
    try {
        console.log(req.body);
        const newObj = await Room.create(req.body)
        await newObj.save()
        await redisClient.flushAll()
        return res.status(200).send({ message: 'New Meeting Room Created Successfully.' })
    } catch (error) {
        return res.status(401).send({ message: "Something Went Wrong, Try Again" });
    }
})
module.exports = router;