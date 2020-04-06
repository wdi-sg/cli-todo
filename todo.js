const user_command = process.argv[2];

const input = process.argv[3];

const jsonfile = require('jsonfile');

const file = 'data.json'

const currentDate = function(){
	let date = new Date();
	return date.toDateString();
};

const Todo = function(thing, done = '[ ]', created_at = '', updated_at = ''){
	this.done = done;
	this.thing = thing;
	this.created_at = created_at;
	this.updated_at = updated_at;
};

jsonfile.readFile(file, (err, obj) => {
	if (!obj.todoItems){
		obj.todoItems = [];
	};
	if (user_command == 'add'){
		let index = obj.todoItems.length + 1;
		let item = new Todo(input);
		item.created_at = currentDate();
		obj.todoItems.push(item);
		console.log(`${index}. ${item.done} - ${item.thing}, Created at: ${item.created_at}, Updated at: ${item.updated_at}`);
	} else if (user_command == 'show'){
		for (i = 0; i < obj.todoItems.length; i++){
			let item = obj.todoItems[i];
			let index = i + 1;
			console.log(`${index}. ${item.done} - ${item.thing}, Created at: ${item.created_at}, Updated at: ${item.updated_at}`);
		};
	} else if (user_command == 'done' && input){
			let item = obj.todoItems[input-1];
			item.done = '[X]';
			item.updated_at = currentDate();
		for (i = 0; i < obj.todoItems.length; i++){
			let item = obj.todoItems[i];
			let index = i + 1;
			console.log(`${index}. ${item.done} - ${item.thing}, Created at: ${item.created_at}, Updated at: ${item.updated_at}`);} 
	} else if (user_command == 'delete' && input){
			obj.todoItems.splice(input-1, 1);
	};

  jsonfile.writeFile(file, obj, (err) => {
  	(err) ? console.log(err): "";
  });

});


