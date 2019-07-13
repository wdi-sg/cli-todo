//include jsonfile node module
const jsonfile = require('jsonfile');
//file path of json file
const file = 'data.json';

//store user command
let userCommand = process.argv[2];

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
		    created_at: createdAt
	    };
	    todoList.push(newItem);
	    jsonfile.writeFile(file, obj, (err) => {
		    if (!err) {
			    console.log(`'${userInput}' have been added to the todo list on ${dateDisplay}!`);
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
	    for(let i=0;i<todoList.length;i++){
	    	//create date object from item date info
		    let createdAt = new Date(todoList[i]["created_at"]);
		    //get date details from date object
		    let dateDisplay = createdAt.getDate()+"/"+(createdAt.getMonth()+1)+"/"+createdAt.getFullYear();

	        console.log(`${i+1}. ${todoList[i].check} – ${todoList[i].item} (created on ${dateDisplay})`);
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
		console.log("Please key in a valid number.");
	}
	else {
		jsonfile.readFile(file,(err,obj) => {
			if (!err) {
				const todoList = obj.todoItems;
				if (userInput > todoList.length || userInput < 0){
					console.log("Please key in a valid item number.");
				}
				else {
					if (todoList[userInput-1].check === "[x]") {
						console.log(`'${userInput}. ${todoList[userInput - 1].item}' have already been checked as done.`);
					}
					else {
						todoList[userInput - 1].check = "[x]";
						jsonfile.writeFile(file, obj, (err) => {
							if (!err) {
								console.log(`'${userInput}. '${todoList[userInput - 1].item}' have been marked as done!`)
							}
						})
					}
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

// if user did not enter a command
if (!userCommand) {
  showInstructions();
}
else {
	userCommand = userCommand.toLowerCase();
  // check what command the user have entered
  switch (userCommand) {
    case "add" :
	  	addItem();
        break;
    case "show" :
      showItem();
      break;
    case "done" :
    	checkDone();
  }
}