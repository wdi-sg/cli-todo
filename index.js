console.log("node.js running!");

//           GLOBAL VARIABLES
const jsonfile = require('jsonfile');
const file = 'data.json'

let input1 = process.argv[2];
let input2 = process.argv[3];
let parsedInt2 = parseInt(input2);
let date = new Date();

//          SHOWING / ADDING / CHECKING / DELETING - TODOS
let showTodos = (obj) => {

    let todoCheck = obj["todoCheck"];
    let userInput = obj["userInput"];
    let createdOn = obj["createdOn"];
    let todoItems = obj["todoItems"];

    if (userInput === 0) {
        //nothing here;
    } else {
        for (let i=0; i<userInput.length; i++) {
            let fullString = `${(i+1)} ${todoCheck[i]} ${userInput[i]} ${createdOn[i]}`;
            todoItems.push(fullString);
        }
    }
    console.log(todoItems);
}

let addTodos = (obj) => {
    // WHY CAN'T I PLACE IT IN HERE?
    // obj["todoItems"] = [];
    if (input2) {
        obj["userInput"].push(input2);
        obj["todoCheck"].push(". [ ] - ");
        obj["createdOn"].push(`--- created on ${date}`);
        showTodos(obj);
    } else {
        console.log('Please add an input!');
    }

}

let checkTodo = (obj) => {
    // WHY CAN'T I PLACE IT IN HERE?
    // let selectedTodo = obj["todoCheck"][parsedInt2-1];
    let todoCheck = obj["todoCheck"];
    if (todoCheck[parsedInt2-1].includes('x')) {
        todoCheck[parsedInt2-1] = '. [ ] - ';
    } else {
        todoCheck[parsedInt2-1] = '. [x] - ';
    }

    obj["createdOn"][parsedInt2-1] = `--- updated on ${date}`
    showTodos(obj);
}

let deleteTodo = (obj) => {

    let todoCheck = obj["todoCheck"];
    let userInput = obj["userInput"];
    let createdOn = obj["createdOn"];

    if (input2 === 'all') {
        obj["todoCheck"] = [];
        obj["userInput"] = [];
        obj["createdOn"] = [];
        console.log('No todos left!');
    } else {
        todoCheck.splice((parsedInt2-1), 1);
        userInput.splice((parsedInt2-1), 1);
        createdOn.splice((parsedInt2-1), 1);
        showTodos(obj);
    }
}

let showOptions = () => {
    console.log(`What would you like to do? \n\n1. show : shows all todos \n2. add [new todo] : adds a todo \n3. check [todo #] : checks/unchecks a todo \n4. delete [todo #] : deletes selected todo`);
}

jsonfile.readFile(file, (err, obj) => {

    obj["todoItems"] = [];
    if (input1 === 'show') {
        showTodos(obj);
    } else if (input1 === 'add') {
        addTodos(obj);
    } else if (input1 === 'check') {
        checkTodo(obj);
    } else if (input1 === 'delete') {
        deleteTodo(obj);
    } else {
        showOptions();
    }

    jsonfile.writeFile(file, obj, (err) => {
        if (err) {
            console.log(err)
        }
    });
});

console.log(`
  __             .___       .__  .__          __
_/  |_  ____   __| _/____   |  | |__| _______/  |_
    __ /  _   / __ |/  _    |  | |  |/  ___/    __
 |  | (  <_> ) /_/ (  <_> ) |  |_|  | ___    |  |
 |__|   ____/ ____ | ____/  |____/__/____>   |__|

 `)