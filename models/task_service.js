/*
	Gestion des tâches, stockage à partir de lowDB
*/

const FileSync = require('lowdb/adapters/FileSync')	
const low = require('lowdb')
const adapter = new FileSync('dbTasks.json')
const dbTasks = low(adapter)
const Task = require('./task.js');
const validateDate = require("validate-date");


let statusList = ["non précisé", "une tâche est requise", "en cours", "achevée", "annulé"]


//Return un boolean
function dataValidation(title,dateBegin,dateEnd,status,tags){
	if(typeof title === 'string' && title instanceof String){
		console.log("Title is not a String")
		return false;
	}
	if(!(validateDate(dateBegin, responseType="boolean", dateFormat="dd/mm/yyyy") && validateDate(dateEnd, responseType="boolean", dateFormat="dd/mm/yyyy"))){
		console.log("One of the data is not valid")
		return false;
	}
	//Vérifier que le status est bien présent dans un tableau de status possible
	// Attention la casse et les accent
	if(!(typeof status === 'string' || status instanceof String || statusList.includes(status))){
		console.log("Status is not a String")
		return false
	}
	// TAGS = array de String
	if(!(tags && typeof tags === 'object' && tags.constructor === Array)){
		console.log("Tags is not array")
		return false
	}else{
		for(var i=0; i<tags.length; i++){
			if(!(typeof tags[i] === 'string' || tags[i] instanceof String)) {
				console.log("Tags is an array but contain other type than String")
				return false;
			}
		}
	}
	return true;
}
class Task_service{
	constructor(){
		//Permet de rajouter un tableau qui va stocker les objets task
		dbTasks.defaults({ tasks: [] }).write()
	}
	// Fonction de création d'une tâche dans la base de données
	createTask(id,title,dateBegin,dateEnd,status,tags){
		console.log("[INFO][createTask] Création d'une nouvelle tâche dans la base de données")
		let task = null
		if(dataValidation()){
			task = new Task(id,title,dateBegin,dateEnd,status,tags);
			dbTasks.get('tasks').push({ 
				id: task.id, 
				title: task.title, 
				dateBegin: task.dateBegin,
				dateEnd: task.dateEnd,
				status: task.status,
				tags: task.tags
			}).write();
		}
		return task;
	}
	// Fonction de suppression d'une tâche dans la base de données
	deleteTask(taskID){
		console.log("[INFO][deleteTask] Suppression de la tâche d'ID : "+ taskID)
		return dbTasks.get('tasks')
		  .remove({ id: taskID })
		  .write()
	}
	// Fonction qui retourne un objet Task grâce au login
	getTaskById(taskID){
		console.log("[INFO][getTaskById] Recherche d'une tâche dans la base de données d'ID : "+ taskID)
		let info = dbTasks.get('tasks')
		  .find({ id: taskID })
		  .value()
		let task = null;
		if(info){
		 	task = new Task(info.id, info.title, info.dateBegin, info.dateEnd, info.status, info.tags)
		}
		return task;
	}
	// Fonction qui retourne toutes les tâches présentes dans la base de données
	getAllTasks() {
		console.log("[INFO][getAllTasks] Retourne toutes les tâches présentent dans la BDD")
		return dbTasks.get("tasks").value();
	}

	//Fonction qui met à jour une tâche dans la base de données
	updateTask(id,title,dateBegin,dateEnd,status,tags){
		dbTasks.get('tasks').find({id: id}).assign({ title: title, dateBegin: dateBegin, dateEnd: dateEnd, status: status, tags: tags}).write();
	}

	//UTILISER LA FONCTION FILTER DE LOWDB
	getTaskByStatus(status){

	}
}

module.exports = Task_service;