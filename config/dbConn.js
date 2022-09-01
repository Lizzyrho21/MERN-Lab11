const mongoose = require('mongoose'); // mongoose package 

const connectDB = async () => {
    try {
        mongoose.connect(process.env.DATABASE_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
    } catch (error) {
        console.error(error)
    }
}

module.exports = connectDB