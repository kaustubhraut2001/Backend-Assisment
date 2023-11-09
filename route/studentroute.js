const express = require('express');
const router = express.Router();
const Student = require('../models/studentschema');
const uuid = require('uuid');
const Dean = require('../models/deamschema');

router.post('/register', async(req, res) => {


    try {
        const universityId = req.body.universityId;
        const password = req.body.password;

        const student = new Student({
            universityId,
            password,
        });

        await student.save();

        res.json({ message: 'Student registered successfully' });


    } catch (err) {
        res.status(500).json({ error: 'Internal server error' + err });

    }

})

router.post('/login', async(req, res) => {
    try {
        const universityId = req.body.universityId;
        const password = req.body.password;

        const student = await Student.findOne({ universityId });
        if (!student || student.password !== password) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = uuid.v4();
        student.token = token;
        await student.save();

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/available-slots', async(req, res) => {
    try {
        const token = req.headers.authorization;
        const student = await Student.findOne({ token });

        const availableSlots = [];
        for (const dean of await Dean.find()) {
            for (const slot of dean.availableSlots) {
                if (slot.isAvailable) {
                    availableSlots.push({
                        deanName: dean.name,
                        slotTime: slot.startTime,
                    });
                }
            }
        }

        res.json(availableSlots);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/book-slot', async(req, res) => {
    try {
        const token = req.headers.authorization;
        // const token = req.headers;
        const SStudent = await Student.findOne({ token });

        const deanName = req.body.deanName;
        const slotTime = req.body.slotTime;

        const dean = await Dean.findOne({ name: deanName });
        // const slot = dean.availableSlots.get(slotTime);
        const slot = await dean.availableSlots.find(slot => slot.startTime === slotTime && !slot.isAvailable && slot.student === SStudent);




        // slot.isAvailable = false;



        await dean.save();

        res.json({ message: 'Slot booked successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' + error });
    }
});

module.exports = router;