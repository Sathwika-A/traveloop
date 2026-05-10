const express = require("express");

const router = express.Router();

const Trip = require("../models/Trip");

const authMiddleware = require("../middleware/authMiddleware");


// CREATE TRIP

router.post("/create", authMiddleware, async (req, res) => {

    try {

        const trip = new Trip({

            ...req.body,

            userId: req.user.id

        });

        await trip.save();

        res.status(201).json({
            message: "Trip Created",
            trip
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

});


// GET ALL TRIPS

router.get("/all", authMiddleware, async (req, res) => {

    try {

        const trips = await Trip.find({

            userId: req.user.id

        }).sort({ createdAt: -1 });

        res.status(200).json(trips);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

});

router.put("/update/:id", authMiddleware, async (req, res) => {

    try {

        const updatedTrip = await Trip.findByIdAndUpdate(

            req.params.id,

            req.body,

            { new: true }

        );

        res.status(200).json({

            message: "Trip Updated",

            updatedTrip

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

});

// DELETE TRIP

router.delete("/:id", authMiddleware, async (req, res) => {

    try {

        await Trip.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Trip Deleted"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

});

module.exports = router;