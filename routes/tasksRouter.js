const tasksRouter = require('express').Router();
const task_service = require('../models/task_service.js');
const dbTask = new task_service();
const task = require('../models/task.js');
const { v4: uuidv4 } = require('uuid');



tasksRouter.get('/task',function(requestHTTP, responseHTTP){
	responseHTTP.status(200).json(dbTask.getAllTasks());
});

//Récupération d'une tâche via son ID
tasksRouter.get('/task/id/:id',function(requestHTTP, responseHTTP){
	let result = dbTask.getTaskById(requestHTTP.params.id);
	if(result === null){
		responseHTTP.status(404).json("Task not found");
	}else{
		responseHTTP.status(200).json(result);
	}
});

//Récupération d'une tâche via son status
tasksRouter.get('/task/status/:status',function(requestHTTP, responseHTTP){
	let result = dbTask.getTaskByStatus(requestHTTP.params.status);
	if(result === null){
		responseHTTP.status(404).json("Task not found");
	}else{
		responseHTTP.status(200).json(result);
	}
});

//Récupation d'une tâche via son tags (Ou ses ??)
tasksRouter.get('/task/tags/:tag',function(requestHTTP, responseHTTP){
	let result = dbTask.getTaskByTags(requestHTTP.params.tag);
	if(result === null){
		responseHTTP.status(404).json("Task not found");
	}else{
		responseHTTP.status(200).json(result);
	}
});

//Récupération d'une tâche via un mot clé, titre et description
tasksRouter.get('/task/keyword/:keyword',function(requestHTTP, responseHTTP){
	let result = dbTask.getTaskByKeyword(requestHTTP.params.keyword);
	if(result === null){
		responseHTTP.status(404).json("Task not found");
	}else{
		responseHTTP.status(200).json(result);
	}
});


//Modification tache
tasksRouter.put('/task/:id',function(requestHTTP, responseHTTP){
	dbTask.updateTask(requestHTTP.params.id,requestHTTP.body.title,requestHTTP.body.dateBegin,requestHTTP.body.dateEnd,requestHTTP.body.status,requestHTTP.body.tags);
	responseHTTP.status(200).json(requestHTTP.params.id);
});
//Suppression tache
tasksRouter.delete('/task/:id',function(requestHTTP, responseHTTP){
	let result = dbTask.deleteTask(requestHTTP.params.id);
	if(!result.length){
		responseHTTP.status(404).json("Task not found");
	}else{
		responseHTTP.status(200).json(result);
	}
});
//Création tache
tasksRouter.post('/task',function(requestHTTP, responseHTTP){
	let result = dbTask.createTask(uuidv4(),requestHTTP.body.title,requestHTTP.body.dateBegin,requestHTTP.body.dateEnd,requestHTTP.body.status,requestHTTP.body.tags);
	result.then((value) => {
		if(value === null){
			responseHTTP.status(404).json("Invalid parameters, can't create task. Title must be a String, dateBegin and dateEnd in date format dd/mm/YYYY and dateEnd must be higher than dateBegin, status need to be one of this array ['non précisé', 'une tâche est requise', 'en cours', 'achevée', 'annulé'] and tags must be String");
		}else{
			responseHTTP.status(200).json(value);
		}
	})
});

module.exports = tasksRouter;