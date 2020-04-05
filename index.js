console.log("works!!", process.argv[2]);

var commandType = process.argv[2];
var task = process.argv[3];

console.log("Your command was: "+commandType);

const jsonfile = require('jsonfile');

const file = 'data.json'

var notDone = "[ ]";
var done = "[x]";
let item = "";
var listItem = {};

var year = 0;
var month = 0;
var day = 0;


const add = function(obj){
    let counter = obj.todoItems.length + 1;
    item = `${counter}. ${notDone} - ${task}`;
}

const getDate = function(){
    let dateEverything = new Date();
    year = dateEverything.getFullYear();
    month = dateEverything.getMonth();
    day = dateEverything.getDate();
}


if (commandType === "add"){
  jsonfile.readFile(file, (err, obj) => {
    if(obj.todoItems){
        add(obj);
        getDate();
        let displayDate = `${year}-${month}-${day}`
        listItem.task = item;
        listItem.dateAdded = displayDate;
        obj.todoItems.push(listItem);
        console.log(`added: ${listItem.task} at date: ${listItem.dateAdded}`);
    } else {
        obj.todoItems = [];
        console.log("initialised. Please input again! >_<");
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

        let oldItem = obj.todoItems[doneItemIndex].task;
        console.log('oldItem : '+oldItem)

        let newItem = oldItem.replace("[ ]", ["[x]"]);
        console.log('newItem : '+newItem)

        // oldItem = newItem;

        obj.todoItems[doneItemIndex].task = newItem;

    jsonfile.writeFile(file, obj, (err) => {
    console.log(err)
    });
    });

} else if (commandType === "delete"){
  jsonfile.readFile(file, (err, obj) => {
    let deleteItemIndex = process.argv[3] - 1;
    console.log("deleteItemIndex: "+deleteItemIndex);
    obj.todoItems.splice(deleteItemIndex, 1);

    for (let j=deleteItemIndex; j<obj.todoItems.length; j+=1){
        let oldItem = obj.todoItems[j].task;
        console.log('oldItem : '+oldItem)

        let newItem = oldItem.replace((j+2), (j+1));
        console.log('newItem : '+newItem)


        obj.todoItems[j].task = newItem;
    }






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