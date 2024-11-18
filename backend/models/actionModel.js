const mongoose= require('mongoose');
const Schema = mongoose.Schema;


const actionSchema = new Schema({
    task:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "TaskSheet"
    },
    action: {
        type: String
    },
    actionBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    },
    startTime: {
        type: Date,
        required:false
    },
    endTime: {
        type: Date,
        required:false
    },
    complated:{
        type: Number,
        min: 0, 
        max: 100,
        default: 0,
    },
    remark:{
        type: String,
    }
});

const Action = mongoose.model('Action', actionSchema);

module.exports = Action;