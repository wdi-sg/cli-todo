
module.exports.add = (obj, task) => {
  let id = obj.todoItems.length + 1;
  obj.todoItems.push({ "id" : id, "done" : "[ ]", "task": task});

};

module.exports.show = (obj) => {
  let showList = obj.todoItems.length;

  for (let i = 0; i < showList; i++) {
    console.log(`${obj.todoItems[i]["id"]}.${obj.todoItems[i]["done"]} - ${obj.todoItems[i]["task"]}`);
  }
  // console.log('check show function');
};

module.exports.done = (obj, id) => {
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

module.exports.undone = (obj, id) => {
    let itemId = process.argv[3];

    for (let i = 0; i < obj.todoItems.length; i++) {
         if (parseInt(itemId) === parseInt(obj.todoItems[i].id)) {
            obj.todoItems[i].done = "[ ]";
         };

    }
};