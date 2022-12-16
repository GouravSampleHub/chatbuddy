const mongoose = require('mongoose');

const msgSchema = new mongoose.Schema({
    sender : { type : Number , require:true },
    receiver : { type : Number , require:true },
    msg : { type : String , require:true },
    msgdate : { type : Date , require:true }
});
const model = mongoose.model('message',msgSchema,'message')

module.exports = model;