require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3005;
const cors = require('cors');
const mongoose = require('mongoose'); // import package
const connectDB = require('./config/dbConn'); // pull in DB conneciton 


app.use(cors());



app.get('/', (req, res) => {
    res.send('Hello world!');
})




// connect to mongoDB 
connectDB();


// We ONLY want to listen to requests AFTER Mongo has succuessfully conected. 
// 'open' is an event in our mongoose library.
mongoose.connection.once('open', () => {
    console.log(`Connected to MongoDB`);

})

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
