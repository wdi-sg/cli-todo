
const jsonfile = require('jsonfile');
// const chores = require('./chores');

const file = 'data.json'
//let check = process.argv[5];//included whether task is done, if task is not done,no need to type this parameter in terminal, if done, just type anything, it will work and input a cross
// if(check){
//   obj.toDoItems[0][number] = "["+"x"+"] - "+item;
// }else{
//   obj.toDoItems[0][number] = "["+" "+"] - "+item;
// }

let today = new Date();  //source: https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();

today = dd + '/' + mm + '/' + yyyy;

if (process.argv[2] == "add"){ //so instead of being implicit, I now code the read/write JSONfile function to only execute when process.argv[2] is explicitly named "add"
  jsonfile.readFile(file, (err, obj) => {
    let number = process.argv[3];
    let item = process.argv[4];

    if(err){
      console.log("***Error found in reading file***");
    }
      console.log("***Reading file now***");

      obj.toDoItems[number-1][number+"."] = item;
      obj.toDoItems[number-1]["created_at"] = today;

    console.log("***Done reading file***");

  jsonfile.writeFile(file, obj, { spaces: 2 }, (err) => { //used the spaces option so that JSON file contents' structure are always preserved.
    console.log("***Writing file now***");
    //console.log(err);
    if(err){
      console.log("***Error found in writing file***");
    }
    console.log(obj.toDoItems);
    console.log("***Done writing file***");
    console.log(`
        ___          _   ___ _    _ _
      / __|___  ___| | / __| |_ (_) |_
     | (__/ _ \/ _ \ | \__ \ ' \| |  _|
      \___\___/\___/_| |___/_||_|_|\__|
      `);
    });
  });

}else if(process.argv[2] == "done"){
  jsonfile.readFile(file, (err, obj) => {
    let number = process.argv[3];
    if(err){
      console.log("***Error found in reading file***");
    }
    console.log("***Reading file now***");
    obj.toDoItems[number-1]["completion"] = "done";
    obj.toDoItems[number-1]["updated_at"] = today;

    console.log("***Done reading file***");

  jsonfile.writeFile(file, obj, { spaces: 2 }, (err) => {
    console.log("***Writing file now***");
    if(err){
      console.log("***Error found in writing file***");
    }
    console.log(obj.toDoItems);
    console.log("***Done writing file***");
    console.log(`
      ___          _   ___ _    _ _
      / __|___  ___| | / __| |_ (_) |_
     | (__/ _ \/ _ \ | \__ \ ' \| |  _|
      \___\___/\___/_| |___/_||_|_|\__|
      `);
    });
  });

}else if(process.argv[2] == "delete"){
  jsonfile.readFile(file, (err, obj) => {
    let number = process.argv[3];
    if(err){
      console.log("***Error found in reading file***");
    }
    console.log("***Reading file now***");
    delete obj.toDoItems[number-1];

    console.log("***Done deleting array toDo element***");

  jsonfile.writeFile(file, obj, { spaces: 2 }, (err) => {
    console.log("***Writing file now***");
    if(err){
      console.log("***Error found in writing file***");
    }
    console.log(obj.toDoItems);
    console.log("***Done writing file***");
    console.log(`
      ___          _   ___ _    _ _
      / __|___  ___| | / __| |_ (_) |_
     | (__/ _ \/ _ \ | \__ \ ' \| |  _|
      \___\___/\___/_| |___/_||_|_|\__|
      `);
    });
  });

}else if((process.argv[2] == "show")){
  jsonfile.readFile(file, (err, obj) => {
    console.log("***Reading file now***");
    if(err){
      console.log("***Error found in reading file***");
    }
    console.log(obj.toDoItems);
    console.log("***Done reading file***");
    console.log(`
    ___          _   ___ _    _ _
  / __|___  ___| | / __| |_ (_) |_
 | (__/ _ \/ _ \ | \__ \ ' \| |  _|
  \___\___/\___/_| |___/_||_|_|\__|`)
  });

}else{
  console.log("***Dear user,please tell me what items you want to add to the 'to do list' by using keyword 'add', space '[#]', space [item_name] in quotes.\
  Or did you want to see the 'to do list'?\
  If so then just say 'show'.***");
}


//Prompt: User, please enter number as the first input and 'to do item' as the second input.
// 1. "eat bak ku teh"

// console.log("works!!", process.argv[2]);
//
// var commandType = process.argv[2];
//
// console.log("Your command was: "+commandType);
//
// const jsonfile = require('jsonfile');
//
// const file = 'data.json'
//
// jsonfile.readFile(file, (err, obj) => {
//
//   console.log(obj);
//   obj["helloworld"] = "monkey";
//
//   jsonfile.writeFile(file, obj, (err) => {
//     console.log(err)
//   });
// });
