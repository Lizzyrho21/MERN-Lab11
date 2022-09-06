require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3005;
const cors = require('cors');
const mongoose = require('mongoose'); // import package
const connectDB = require('./config/dbConn'); // pull in DB conneciton 
const Employee = require('./model/Employee');
const bodyParser = require('body-parser');


app.use(cors());

// parse application/json
app.use(bodyParser.json())


// Read ALL
app.get('/employees', async (req, res) => {

    const employees = await Employee.find(); // if empty, gets all employees

    res.status(200).send(employees);
})

// Read +1
app.get('/employee', async (req, res) => {
    const { firstName } = req.query; // from the user
    // use the findOne() method
    const employees = await Employee.findOne({ firstname: firstName }); // if empty, gets all employees

    res.status(200).send(employees);
})




// Create
app.post('/new-employee', async (req, res) => {
    try {
        //If req.body has everything you need in the right place
        // then you can pass it straight to Model
        // But often you'll need to tweak the data a bit
        const newEmployee = await Employee.create(req.body); // same thing as seed data.. We are giving the user control
        res.send(`Employee sucuessfully Created : ${newEmployee}`); // send the created employee to our user
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating Employee');
    }
})

// delete
app.delete('/employee/:id', async (req, res) => {
    const id = req.params.id; // From the client :)

    try {

        await Employee.findByIdAndDelete(id); // thos does ALL the work for me. yay!

        // We don't need to send any data, but we do need a success message
        res.send('Employee Deleted :)');

    } catch (error) {
        console.error(error);
        res.status(404).send('Unable to delete :( ')
    }

})

// update 
app.put('/employee/update/:id', async (req, res) => {
    try {
        await Employee.findByIdAndUpdate(req.params.id, req.body);
        res.send(`Employee changed. Please refresh for changes.`);
    } catch (error) {
        console.error('Cannot Update', error)
    }
});



// connect to mongoDB 
connectDB();


// We ONLY want to listen to requests AFTER Mongo has succuessfully conected. 
// 'open' is an event in our mongoose library.
mongoose.connection.once('open', () => {
    console.log(`Connected to MongoDB`);
    app.listen(PORT, () => console.log(`Listening on ${PORT}`)); // run port ONLY AFTER it is connected to MongoDB


})

