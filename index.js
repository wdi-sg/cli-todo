// console.log("works!!", process.argv[2]);

// var commandType = process.argv[2];

// console.log("Your command was: "+commandType);

const jsonfile = require('jsonfile');

const file = 'data.json';

const commandType = process.argv[2];
const userInput = process.argv[3];

jsonfile.writeFile(file, obj, (err) => {
	if (err) {
		console.log(err)
	};
	
});

console.log(`updated list`);
	show();

const show() => {
	jsonfile.readFile(file, (err, obj) => {
		if (obj.todoItems.length === 0) {
			console.log("List empty")
		} else {
			console.log("Current list includes:")
			for (var i=0, i < obj.todoItems.length; i++) {
				let itemNumber = (i+1);
				let itemStatus = obj.statusCompleted[i];
				if (itemStatus === "false") {
					statusMark = " ";
				} else {
					statusMark = "x"
				};
				console.log(itemNumber + ". [" + statusMark + " ] - " + obj.todoItems[i])
			}
		}
	 });
};

const add(userInput) => {
	jsonfile.readFile(file, (err, obj) => {
		obj.todoItems.push(userInput);
		obj.statusCompleted.push("false")
	};
}

const done(userInput) => {
	jsonfile.readFile(file, (err, obj) => {
		let itemNumber = (userInput-1);
		obj.statusCompleted[itemNumber] = "true";

	}
}

jsonfile.writeFile(file, obj, (err) => {
	if (err) {
		console.log(err)
	};
});

console.log(`updated list`);
	show();


console.log(`To-do list`);

if (commandType === "show") {
	show();
} else if(commandType === "add") {
	add(userInput);
} else if (commandType === "done") {
	done(userInput);
} else {
	console.log(`Choose to:
		show: shows current List [node index.js show]
		add: adds new item to current list [node index.js add "yourItem"]
		done: marks item on current list as completed [node index.js done]`);
}

  // console.log(obj);
  // // obj["helloworld"] = "monkey";




 
