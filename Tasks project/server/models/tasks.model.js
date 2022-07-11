const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [
            true,
            "Project is required"
        ],
        minlength:[ 3,"Project must be at least 3 characters"] ,
        unique: true //this validation is added to make every title unique from the rest
    },date:{
        type: Date,
        required: [
            true,
            "Due Date is required"
        ]
    }, status:{type: String,default: "todo"}
}, { timestamps: true });

module.exports.Task = mongoose.model('Task', TaskSchema);