//add new entry
module.exports.add = (obj, task) => {
  let id = obj.todoItems.length + 1;
  let date = Date();
  obj.todoItems.push({ "id" : id, "done" : "[ ]", "task": task, "createdDate": date, "updatedDate": "nil"});
};

//amend list when task is completed
module.exports.done = (obj, index) => {
  let date = Date();
  obj.todoItems[index-1]["done"] = "[X]";
  obj.todoItems[index-1]["updatedDate"] = date;
}

//delete task permanently
module.exports.delete = (obj, index) => {
  //remove item
  obj.todoItems.splice(index-1, 1);
  let listLen = obj.todoItems.length;
  //update ids
  for(let i = 0; i < listLen; i++) {
    obj.todoItems[i]["id"] = i+1;
  }
}

//display list
module.exports.show = (obj) => {
  let listLen = obj.todoItems.length;
  //loop through each index of the array
  for (let i = 0; i < listLen; i++) {
    console.log(`${obj.todoItems[i]["id"]}. ${obj.todoItems[i]["done"]} - ${obj.todoItems[i]["task"]}\n date_created: ${obj.todoItems[i]["createdDate"]}\n updated_at: ${obj.todoItems[i]["updatedDate"]}`);
  }
}

