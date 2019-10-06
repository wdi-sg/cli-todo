console.log("works!!", process.argv[2]);

var commandType = process.argv[2];
let task = process.argv[3];

console.log("Your command was: "+commandType);

const jsonfile = require('jsonfile');

const file = 'data.json'

jsonfile.readFile(file, (err, obj) => {

  console.log(obj);
  // obj["helloworld"] = "monkey";
  // add(obj, task);
  if (commandType === "add") {
      add(obj, task);
  } else if (commandType === "done") {
     done(obj, process.argv[3]);
  } else if (commandType === "undone") {
    undone(obj, process.argv[3]);
  };

  jsonfile.writeFile(file, obj, (err) => {
    console.log(err)
  });
});

add = (obj, task) => {
  let id = obj.todoItems.length + 1;
  obj.todoItems.push({ "id" : id, "done" : "[ ]", "task": task});

};

show = (obj) => {
  let showList = obj.todoItems.length;

  for (let i = 0; i < showList; i++) {
    console.log(`${obj.todoItems[i]["id"]}.${obj.todoItems[i]["done"]} - ${obj.todoItems[i]["task"]}`);
  }
};

done = (obj, id) => {
    let itemId = process.argv[3];

    for (let i = 0; i < obj.todoItems.length; i++) {
        // console.log("for loop running");
        // console.log(obj.todoItems[i].id);
         if (parseInt(itemId) === parseInt(obj.todoItems[i].id)) {

            // console.log("if statement running");
            obj.todoItems[i].done = "[X]";
         };
    // } else {
    //     console.log('condition not true')
    // }
    }
};

undone = (obj, id) => {
    let itemId = process.argv[3];

    for (let i = 0; i < obj.todoItems.length; i++) {
         if (parseInt(itemId) === parseInt(obj.todoItems[i].id)) {
            obj.todoItems[i].done = "[ ]";
         };

    }
};