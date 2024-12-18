const mongoose= require('mongoose');
const Schema = mongoose.Schema;


const serviceSchema = new Schema({
    company:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
    },
   ticket:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket',
   },
   serviceType:{
        type: String,
        enum:[
            'AMC',
            'Warranty',
            'One Time',
        ]
   },
   priority:{
        type: String,
        enum:[
            'High',
            'Medium',
            'Low',
        ]
   },
   zone:{
        type: String,
        enum:[
            'North',
            'South',
            'East',
            'West',
        ],
        required: true,
   },
   allotmentDate:{
        type: Date,
        required: true,
   },
   allotTo:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Employee',
        }
    ],
   
   workMode:{
        type: String,
        enum:[
            'Onsite',
            'Remote',
        ],
        required: true,
    },
    status:{
          type: String,
          enum:[
                'Pending',
                'Inprogress',
                'Completed',
          ],
          default: 'Pending',
          required: true,
    },
    completionDate:{
        type: Date,
    },
    Days:{
        type: Number,
    },
    remarks:[{
        type: String,
    }],
    actualCompletionDate:{
        type: Date,
    },
    feedback:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Feedback',
        default: null,
    }

});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;