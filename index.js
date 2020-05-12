//include commander node module
const program = require('commander');
program.version('0.0.1');
//include jsonfile node module
const jsonfile = require('jsonfile');
//include figlet node module, for ascii text art
const figlet = require('figlet');

//file path of json file
const file = 'data.json';

// add item function
const addItem = () => {
  //store user input
  let userInput = "";
  for(let i=0;i<process.argv.length-3;i++){
    userInput += process.argv[i+3]+" ";
  }
  userInput = userInput.substring(0, userInput.length-1);

  //read json file and then, write into file
  jsonfile.readFile(file,(err,obj) => {
  	if (!err) {
	    const todoList = obj.todoItems;
	    //create new date object with current date info
	    const createdAt = new Date();
	    //get date details from date object
	    const dateDisplay = createdAt.getDate()+"/"+(createdAt.getMonth()+1)+"/"+createdAt.getFullYear();
	    const newItem = {
		    item: userInput,
		    check: "[ ]",
		    created_at: createdAt,
		    updated_at: ""
	    };
	    todoList.push(newItem);
	    jsonfile.writeFile(file, obj, (err) => {
		    if (!err) {
			    asciiText("Added!");
			    console.log(`'${userInput}' have been added to the todo list on ${dateDisplay}.`);
		    }
	    });
    }
  });
};

// show items function
const showItem = () => {
  jsonfile.readFile(file,(err,obj) => {
  	if (!err){
	    const todoList = obj.todoItems;
	    asciiText("To-Do List");
	    if (todoList.length === 0) {
	    	console.log("There are no items in the todo list.");
	    }
	    else {
		    for (let i = 0; i < todoList.length; i++) {
			    if (todoList[i]["updated_at"] === "") {
				    //create date object from item date info
				    let createdAt = new Date(todoList[i]["created_at"]);
				    //get date details from date object
				    let dateDisplay = createdAt.getDate() + "/" + (createdAt.getMonth() + 1) + "/" + createdAt.getFullYear();

				    console.log(`${i + 1}. ${todoList[i].check} – ${todoList[i].item} (created on ${dateDisplay})`);
			    } else {
				    //create date object from item date info
				    let updatedAt = new Date(todoList[i]["updated_at"]);
				    //get date details from date object
				    let dateDisplay = updatedAt.getDate() + "/" + (updatedAt.getMonth() + 1) + "/" + updatedAt.getFullYear();

				    console.log(`${i + 1}. ${todoList[i].check} – ${todoList[i].item} (updated on ${dateDisplay})`);
			    }
		    }
	    }
    }
  })
};

// check item as done function
const checkDone = () => {
	//store user input
	let userInput = parseInt(process.argv[3]);
	// check if user input is a number
	if (Number.isNaN(userInput)){
		asciiText("Oh no!");
		console.log("Please key in a valid number.");
	}
	else {
		jsonfile.readFile(file,(err,obj) => {
			if (!err) {
				const todoList = obj.todoItems;
				if (userInput > todoList.length || userInput < 0){
					asciiText("Oh no!");
					console.log("Please key in a valid item number.");
				}
				else {
					if (todoList[userInput-1].check === "[x]") {
						asciiText("Hold on!");
						console.log(`'${userInput}. ${todoList[userInput - 1].item}' have already been checked as done.`);
					}
					else {
						//create new date object with current date info
						const updatedAt = new Date();
						//get date details from date object
						const dateDisplay = updatedAt.getDate()+"/"+(updatedAt.getMonth()+1)+"/"+updatedAt.getFullYear();
						console.log(updatedAt);
						todoList[userInput - 1].updated_at = updatedAt;
						todoList[userInput - 1].check = "[x]";
						jsonfile.writeFile(file, obj, (err) => {
							if (!err) {
								asciiText("Checked as done!");
								console.log(`'${userInput}. ${todoList[userInput - 1].item}' have been checked as done on ${dateDisplay}.`)
							}
						})
					}
				}
			}
		})
	}
};

const deleteItem = () => {
	//store user input
	let userInput = parseInt(process.argv[3]);
	// check if user input is a number
	if (Number.isNaN(userInput)){
		asciiText("Oh no!");
		console.log("Please key in a valid number.");
	}
	else {
		jsonfile.readFile(file,(err,obj) => {
			if (!err) {
				const todoList = obj.todoItems;
				if (userInput > todoList.length || userInput < 0) {
					asciiText("Oh no!");
					console.log("Please key in a valid item number.");
				}
				else {
					let removedItem = todoList.splice((userInput-1), 1);
					jsonfile.writeFile(file, obj, (err) => {
						if (!err) {
							asciiText("Deleted!");
							console.log(`'${userInput}. ${removedItem[0].item}' have been deleted.`);
						}
					})
				}
			}
		})
	}
};
// show instructions
const showInstructions = () => {
  console.log("To use any of the following commands, enter the command key:");
  console.log("add – Add new item (e.g. add buy groceries)");
  console.log("show – Show items");
  console.log("done – Check item as done (e.g. done 2)");
};

//
const asciiText = (string) => {
	console.log(figlet.textSync(string, {
		font: 'small',
		horizontalLayout: 'default',
		verticalLayout: 'default'
	}));
}

//setting program options
program
	.option('-a, --add <item>', 'add item to todo list', addItem)
	.option('-s, --show', 'show todo list', showItem)
	.option('-c, --check <item>', 'check item as done', checkDone)
	.option('-d, --delete <item>', 'delete item from todo list', deleteItem);

//let commander program process the user's input
program.parse(process.argv);
