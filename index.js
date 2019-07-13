//include jsonfile node module
const jsonfile = require('jsonfile');
//file path of json file
const file = 'data.json';

//store user command
const userCommand = process.argv[2];

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
	    const newItem = {
		    item: userInput,
		    check: "[ ]"
	    };
	    todoList.push(newItem);
	    jsonfile.writeFile(file, obj, (err) => {
		    if (!err) {
			    console.log(`'${userInput}' have been added to the todo list!`);
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
	      console.log(`${i+1}. ${todoList[i].check} – ${todoList[i].item}`);
	    }
    }
  })
};

// show instructions
const showInstructions = () => {
  console.log("To use any of the following commands, enter the command key:");
  console.log("1. Add new item – add [item name]");
  console.log("2. Show items – show");
};

// if user did not enter a command
if (!userCommand) {
  showInstructions();
}
else {
  // check what command the user have entered
  switch (userCommand) {
    case "add" :
      addItem();
      break;
    case "show" :
      showItem();
      break;
  }
}