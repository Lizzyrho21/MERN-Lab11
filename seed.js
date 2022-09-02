const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DATABASE_URI);

const Employee = require('./model/Employee'); // Employee Schema.

// What do we want to do?

// I want to create at least 2 employees to check if my DB is up and running and to test data

async function seed() {
    // instaniate the Employee Obj (Schema)
    const myEmployee = new Employee({
     // Employee key / values here
     firstname: "Dylan",

     lastname: "Cooper"
    })

    myEmployee.save(function (err) {
        if(err) console.log(err);
        else console.log('Saved Employee');
    });

    // // alt 
    // await Employee.create({
    //     // Employee key / value pairs here
    // });

  

    mongoose.disconnect();
}

seed(); // calling the function here!