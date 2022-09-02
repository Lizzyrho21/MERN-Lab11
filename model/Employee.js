// What we want our documents to look like
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    // map out data here! Two string fields that are required
    firstname: {
        type:String,
        required:true
    },

    lastname: {
        type:String,
        required:true
    }


})

module.exports = mongoose.model('Employee', employeeSchema); // Mongoose will set this to lowercase and plural 