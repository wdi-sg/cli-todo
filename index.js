

const jsonfile = require('jsonfile');
const file = 'data.json'

var commandType = process.argv[2];
var input = process.argv[3];


function addItem(whatToDo) {
    jsonfile.readFile(file, (err, obj) => {
        let add = new Object();
        let index = obj.todoItems.length + 1;
        add.index = index;
        add.item = whatToDo;
        obj.todoItems.push(add);

    jsonfile.writeFile(file, obj, (err) => {
        console.log(err)
  });
});

}


function showItem() {
    jsonfile.readFile(file, (err, obj) => {
        obj.todoItems.forEach(function(todoList) {
            console.log(`${todoList.index}. [] - ${todoList.item}`);
        });
    });
}

if (commandType === "add") {
    addItem(input);
} else if (commandType === "show") {
    showItem();
}