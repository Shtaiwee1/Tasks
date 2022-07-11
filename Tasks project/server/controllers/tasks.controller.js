const {Task}  = require('../models/tasks.model');
module.exports.index = (request, response) => {
    response.json({
       message: "Hello World"
    });
}

module.exports.createTask= (request, response) => {
    const { title, date,status } = request.body;
    Task.create({
        title,
        date,
        status
    })
        .then(task => response.json(task))
        .catch(err => response.status(400).json(err));
}

module.exports.getAllTask = (request, response) => {
    Task.find({})
        .then(task => response.json(task))
        .catch(err => response.json(err))
}

module.exports.getTask = (request, response) => {
    Task.findOne({_id:request.params.id})
        .then(task => response.json(task))
        .catch(err => response.json(err))
}

module.exports.getTaskTitle = (request, response) => {
    Task.findOne({title:request.params.title})
        .then(task => response.json(task))
        .catch(err => response.json(err))
}
module.exports.updateTask = (request, response) => {
    Task.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
        .then(updatedTask => response.json(updatedTask))
        .catch(err => response.json(err))
}

module.exports.deleteTask = (request, response) => {
    Task.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}