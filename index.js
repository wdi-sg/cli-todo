console.log("node.js running!");
////////////////////////////////////////////////////////////////
//                      GLOBAL VARIABLES                     //
////////////////////////////////////////////////////////////////

const jsonfile = require('jsonfile');
const figlet = require('figlet');
const file = 'data.json'

let input1 = process.argv[2];
let input2 = process.argv[3];
let parsedInt2 = parseInt(input2);
let date = new Date;
let fixedDate = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

////////////////////////////////////////////////////////////////
//      SHOWING / ADDING / CHECKING / DELETING - TODOS        //
////////////////////////////////////////////////////////////////

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
        obj["createdOn"].push(`--- created on ${fixedDate}`);
        showTodos(obj);
    } else {
        console.log('Please add an input!');
    }
}

let checkTodo = (obj) => {
    // WHY CAN'T I SET THE VARIABLE BELOW?
    // let selectedTodo = obj["todoCheck"][parsedInt2-1];
    // console.log('selectedTodo: ' + selectedTodo);

    let todoCheck = obj["todoCheck"];
    if (parsedInt2 > todoCheck.length || parsedInt2 <= 0 || isNaN(parsedInt2)){
        console.log('Type a valid number!');
    } else {
        if (todoCheck[parsedInt2-1].includes('x')) {
            todoCheck[parsedInt2-1] = '. [ ] - ';
        } else {
            todoCheck[parsedInt2-1] = '. [x] - ';
        }
        obj["createdOn"][parsedInt2-1] = `--- updated on ${fixedDate}`
        showTodos(obj);
    }
}

let deleteTodo = (obj) => {

    let todoCheck = obj["todoCheck"];
    let userInput = obj["userInput"];
    let createdOn = obj["createdOn"];

    if (parsedInt2 > userInput.length || parsedInt2 <= 0 || isNaN(parsedInt2)){
        console.log('Type a valid number!');
    } else {
        if (input2 === 'all') {
            obj["todoCheck"] = [];
            obj["userInput"] = [];
            obj["createdOn"] = [];
            console.log('Deleted all todos!');
        } else {
            todoCheck.splice((parsedInt2-1), 1);
            userInput.splice((parsedInt2-1), 1);
            createdOn.splice((parsedInt2-1), 1);
            showTodos(obj);
        }
    }
}

let showOptions = () => {
    console.log(`What would you like to do? \n\n1. show : shows all todos \n2. add [new todo] : adds a todo \n3. check [todo #] : checks/unchecks a todo \n4. delete [todo #] : deletes selected todo\n\n* fonts : check available figlet fonts`);
}

jsonfile.readFile(file, (err, obj) => {

    if (err) {
        console.log(err);
    } else {
        obj["todoItems"] = [];
        switch(input1)
        {
            case 'show':
                showFig('Current Todos');
                showTodos(obj);
                break;
            case 'add':
                showFig('Add');
                addTodos(obj);
                break;
            case 'check':
                showFig('Check');
                checkTodo(obj);
                break;
            case 'delete':
                showFig('Delete');
                deleteTodo(obj);
                break;
            case 'fonts':
                showFig('Fonts');
                checkFigFonts();
                break;
            default:
                showFig('The Todolist!');
                showOptions();
                break;
        }
    }

    jsonfile.writeFile(file, obj, (err) => {
        if (err) {
            console.log(err)
        }
    });
});

////////////////////////////////////////////////////////////////
//                       FIGLET SECTION                       //
////////////////////////////////////////////////////////////////

// THIS IS USING SYNC FONT FUNCTIONS

let showFig = (feature, font = generateRandomFont()) => {
    console.log(figlet.textSync( feature , {
        font: font,
        horizontalLayout: 'default',
        verticalLayout: 'default'
    }));
}

let generateRandomFont = () => {
    let randomNum = Math.floor(Math.random()*287);
    let font = figlet.fontsSync()[randomNum];
    return font;
}

// THIS IS USING ASYNC FONT FUNCTION
let checkFigFonts = () => {
    figlet.fonts(function(err, fonts) {
        if (err) {
            console.log('something went wrong...');
            console.log(err);
            return;
        }
        console.dir(fonts.length);
    });
}