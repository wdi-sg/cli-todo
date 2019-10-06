
var commandType = process.argv[2];
var val = process.argv[3];

const jsonfile = require('jsonfile');

const file = 'data.json'



jsonfile.readFile(file, (err, obj) => {

  // console.log(obj);


if (commandType === "add"){
    obj["todoList"].push(". [] - ");
    obj["todoItems"].push(val);
    obj["date"].push(" [created at " + new Date() + "]");
    for (i = 0; i < obj["todoItems"].length; i++){
        obj["listNum"][i] = i+1;
        if (obj["todoItems"].length === i+1){
            console.log(obj["listNum"][i] + obj["todoList"][i] + obj["todoItems"][i] + obj["date"][i]);
        }
    }
} else if (commandType === "show"){
    for (i = 0; i < obj["todoItems"].length; i++){
        obj["listNum"][i] = i+1;
        console.log(obj["listNum"][i] + obj["todoList"][i] + obj["todoItems"][i] + obj["date"][i]);
    }
} else if (commandType === "done"){
    for(i = 0; i < obj["todoItems"].length; i++){
        obj["listNum"][i] = i+1;
        if(i+1 === parseInt(val)){
            obj["todoList"][i] = ". [x] - ";
            obj["date"][i] = " [updated at " + new Date() + "]";
        }
        console.log(obj["listNum"][i] + obj["todoList"][i] + obj["todoItems"][i] + obj["date"][i]);
    }
} else if(commandType === "delete"){
    for(i = 0; i < obj["todoItems"].length; i++){
        obj["listNum"][i] = i+1;
        if(i+1 === parseInt(val)){
            obj["todoItems"].splice(i, 1);
            obj["todoList"].splice(i, 1);
            obj["date"].splice(i, 1);
        }
        console.log(obj["listNum"][i] + obj["todoList"][i] + obj["todoItems"][i] + obj["date"][i]);
    }
}


else {
        console.log("Welcome to Ryan's to-do-list application! \nType 'add', followed by the thing you would like to do to start adding in items to the list. \nType 'show' to display all the items in the list currently. \nType 'done', followed by the number of the list item to mark that item as completed. \nType 'delete', followed by the number of the list item you wish to be deleted from the to-do-list.")
}



  jsonfile.writeFile(file, obj, (err) => {

  });
});