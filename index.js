console.log("works!!", process.argv[2]);

var commandType = process.argv[2];

const jsonfile = require('jsonfile');

const file = 'data.json'

const addItem = () =>{
    let userInput = "";
    for(let i=0; i<process.argv.length-3; i++){
        userInput += process.argv[i+3]+ " ";
    }
    userInput = userInput.substring(0, userInput.length-1);

    jsonfile.readFile(file,(err,obj) => {
        if(!err){
            const todoList = obj.todoItems;
            const createdAt = new Date();

            const newItem = {
                item: userInput,
                created_at: createdAt
            };
            todoList.push(newItem);
            jsonfile.writeFile(file.obj,(err) => {
                if(!err){
                    console.log("todo list has been updated");
                }
            })
        }
    })
}