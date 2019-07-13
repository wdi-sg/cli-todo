console.log("node.js running!");

let input1 = process.argv[2];
let input2 = process.argv[3];
let parsedInt2 = parseInt(input2);

const jsonfile = require('jsonfile');
const file = 'data.json'

let showInput = (obj) => {
    console.log(obj['todoItems']);
}

let addInput = (obj) => {
    let todoList = obj["todoItems"];
    let unchecked = '[ ]';

    todoList.push(input2);

    for (let i=0; i< todoList.length; i++) {
        console.log('what is value of todolist length?: ' + todoList.length);
        if (i === todoList.length - 1) {
            console.log('in if statement of addInput');
            todoList[i] = (i+1) + '. ' + unchecked + ' ' + input2;
        } else {
            // todoList[i] = (i+1) + '. ' + unchecked + ' ' + input2;
        }
    }
    return todoList;
}

let toggleInput = (obj) => {
    let todoList = obj["todoItems"];
    // let unchecked = '[ ]';
    // let checked = '[x]';
    let selectedTodo = todoList[parsedInt2 - 1];
    console.log('selectedTodo: '+ selectedTodo)

    for (let i=0; i<todoList.length; i++) {

    }


    if (selectedTodo.includes('x')){
        console.log('in if of: selectedTodo includes x');
        console.log('sel todo [4]:' + selectedTodo[4]);
        selectedTodo = ' ';
        // selectedTodo = `${input2}. ${unchecked} ${selectedTodo}`;
    } else {
        console.log('in if of: selectedTodo no x');
        console.log('sel todo [4]:' + selectedTodo[4]);
        selectedTodo[4] = 'x';
        // selectedTodo = `${input2}. ${checked} ${selectedTodo}`;
        console.log('selectedTodo: ' + selectedTodo )
    }
    return todoList;
}

let errorMessages = () => {
    console.log('Error! Write a valid statement!')
}

jsonfile.readFile(file, (err, obj) => {

    if (input1 === 'show') {
        showInput(obj);
    } else if (input1 === 'add') {
        addInput(obj);
    } else if (input1 === 'done') {
        toggleInput(obj);
    } else {
        errorMessages();
    }

    jsonfile.writeFile(file, obj, (err) => {
        if (err) {
            console.log(err)
        }
    });

});