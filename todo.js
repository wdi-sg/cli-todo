console.log("works!!", process.argv[2]);

var commandType = process.argv[2];

console.log("Your command was: " + commandType);

const jsonfile = require('jsonfile');

const file = 'data.json'
var userInput1 = process.argv[3];
var userInput2 = process.argv[4];
var today = new Date();
var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

const editStuff = (err, obj) => {
    if (commandType == 'add') {
        let box = '- [ ] - ';
        let count = obj.toDoItems.length + 1;
        obj.toDoItems.push(`${count}. ${userInput1} ${userInput2} ${box}created at ${date} ${time}`);
    } else if (commandType == 'done') {
        let box = '- [X] - ';
        let currentTime = ` - completed at ${date} ${time}`
        let choice = parseInt(userInput1)-1;
        var change = obj.toDoItems[choice].split('-');
        change[1] = box;
        change.push(currentTime);
        var completed = change.join('');
        obj.toDoItems[choice] = completed
    } else if (commandType == 'show') {
        console.log(obj)
    }else if (commandType == 'delete'){
        itemToSplice = parseInt(userInput1)-1;
        obj.toDoItems.splice(itemToSplice,1);
        for(i = 0; i < obj.toDoItems.length; i++){
            var index = `${i + 1}.`;
            var updateIndex = obj.toDoItems[i].split('.')
            updateIndex[0] = index;
            updatedIndex = updateIndex.join('');
            obj.toDoItems[i] = updatedIndex;
        }
    }else {
        console.log('error')
    }
    const doneEditing = (err) => {
        console.log('done editing')
    }
    jsonfile.writeFile(file, obj, doneEditing)
};

jsonfile.readFile(file, editStuff);
console.log("file read called");