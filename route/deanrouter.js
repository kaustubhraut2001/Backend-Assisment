const express = require('express');
const router = express.Router();
const Dean = require('../models/deamschema');
const uuid = require("uuid");




router.post('/register', async(req, res) => {
    try {

        const name = req.body.name;
        const universityId = req.body.universityId;
        const password = req.body.password;

        const dean = new Dean({
            name,
            universityId,
            password,
        });

        await dean.save();

        res.json({ message: 'Dean registered successfully' });




    } catch (err) {
        res.status(500).json({ error: 'Internal server error' + err });

    }
})

router.post('/login', async(req, res) => {
    try {
        const universityId = req.body.universityId;
        const password = req.body.password;

        const dean = await Dean.findOne({ universityId });
        if (!dean || dean.password !== password) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = uuid.v4();
        dean.token = token;
        await dean.save();

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/pending-sessions', async(req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const dean = await Dean.findOne({ token });

        const pendingSessions = [];
        for (const slot of dean.availableSlots.all()) {
            if (!slot.isAvailable) {
                student = slot.student;
                pendingSessions.push({
                    studentName: student.name,
                    slotTime: slot.startTime
                });
            }
        }

        res.json(pendingSessions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;