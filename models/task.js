/* 
	Object tache
*/
class Task{
	constructor(id, title, dateBegin, dateEnd, status, tags){
		this.id = id;
		this.title = title;
		this.dateBegin = dateBegin;
		this.dateEnd = dateEnd;
		this.status = status;
		this.tags = tags;
	}
}

module.exports = Task;