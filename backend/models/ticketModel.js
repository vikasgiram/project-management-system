const mongoose= require('mongoose');
const Schema = mongoose.Schema;


const ticketSchema = new Schema({

    company:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
    },
    date:{
        type: Date,
        required: true,
        default: Date.now(),
    },
    client:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
    },
    Address:{
        add: String,
        city: String,
        state: String,
        country: String,
        pincode: Number,
    },
    details:{
        type: String,
        required: true,
    },
    product:{
        type:String,
        enum: [
        'Surveillance System',
        'Access Control System',
        'Turnkey Project',
        'Alleviz',
        'CafeLive',
        'WorksJoy',
        'WorksJoy Blu',
        'Fire Alarm System',
        'Fire Hydrant System',
        'IDS',
        'AI Face Machines',
        'Entrance Automation',
        'Guard Tour System',
        'Home Automation',
        'IP PA and Communication System',
        ],
        required: true,
    },
    contactPerson:{
        type: String,
        required: true,
    },
    contactNumber:{
        type: Number,
        required: true,
    },
    source:{
        type: String,
        enum: [
            'Email',
            'Call',
            'WhatsApp',
            'SMS',
            'Direct',
        ],
        required: true,
    },
    service:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        default: null,
    },
    registerBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
    },
},
{
    timestamps: true,
}
);

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;