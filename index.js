const express = require('express');
const app = express();
const studentRoutes = require('./route/studentroute');
const deanRoutes = require('./route/deanrouter');
const mongodbconnect = require('./database/mongodbconnect');
const Student = require('./models/studentschema'); // Import the Student model

app.use(express.json());
mongodbconnect();

// async function middle(req, res, next) {
//     const token = req.headers.authorization.split(' ')[1];
//     try {
//         const student = await Student.findOne({ token }).exec();
//         if (!student) {
//             res.status(401).json({ error: 'Unauthorized' });
//             return;
//         }
//         req.student = student;
//         next();
//     } catch (error) {

//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// }

// app.use(middle);

app.use('/student', studentRoutes);
app.use('/dean', deanRoutes);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});