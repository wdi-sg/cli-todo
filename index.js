console.log("works!!", process.argv[2]);

var commandType = process.argv[2];
var task = process.argv[3];

console.log("Your command was: "+commandType);

const jsonfile = require('jsonfile');

const file = 'data.json'

var notDone = "[ ]";
var done = "[x]";
let item = "";

const add = function(obj){
    let counter = obj.todoItems.length + 1;
    item = `${counter}. ${notDone} - ${task}`;
}

if (commandType === "add"){

  jsonfile.readFile(file, (err, obj) => {
    if(obj.todoItems){
        add(obj);
        obj.todoItems.push(item);
        console.log("added: "+item);
    } else {
        obj.todoItems = [];
        console.log("no array found. created array!");
    }

    jsonfile.writeFile(file, obj, (err) => {
    console.log(err)
    });

    });
} else if (commandType === "show"){
    jsonfile.readFile(file, (err, obj) => {
    console.log(obj.todoItems);
});
} else if (commandType === "done"){
    jsonfile.readFile(file, (err, obj) => {
        let doneItemIndex = process.argv[3] - 1;
        console.log("doneitemindex: "+doneItemIndex)

        let oldItem = obj.todoItems[doneItemIndex]
        console.log('oldItem : '+oldItem)

        let newItem = oldItem.replace("[ ]", ["[x]"])
        console.log('newitem : '+newItem)

        // oldItem = newItem;

        obj.todoItems[doneItemIndex] = newItem;

    jsonfile.writeFile(file, obj, (err) => {
    console.log(err)
    });
    });

}

//item: list number, taskstatus, task
//goal, add and show
// 1. [ ] - eat bak kut teh
// 2. [ ] - go shopping
// 3. [ ] - feed dog
// 4. [ ] - swim practice
// 5. [ ] - code app
// 6. [ ] - meet gabriel


// original
// jsonfile.readFile(file, (err, obj) => {


//   obj["helloworld"] = "yo";
//   console.log(obj);
//   jsonfile.writeFile(file, obj, (err) => {
//     console.log(err)
//   });
// });




    // if(obj.todoItems){
    //     add(obj);

    //     obj.todoItems.push(item);
    //     console.log("added: "+item);
    // } else {
    //     obj.todoItems = [];
    // }