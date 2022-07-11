const TaskController = require('../controllers/tasks.controller');
module.exports = function(app){
    app.get('/api', TaskController.index);
    app.post('/api/task', TaskController.createTask);
    app.get('/api/task', TaskController.getAllTask);
    app.get('/api/task/:id', TaskController.getTask);
    app.get('/api/task/find/:title', TaskController.getTaskTitle);
    app.put('/api/task/:id', TaskController.updateTask);
    app.delete('/api/task/:id', TaskController.deleteTask);}