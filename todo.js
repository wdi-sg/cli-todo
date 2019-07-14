const jsonfile = require('jsonfile');
const file = 'data.json';


let today = new Date ();
// //need to write add argv[2] function to add in details like change the name and type of food in the newList. probably need to take in a few parameter lol tmr then think
let add = (thingsToDo, obj) => {
    let newlist = {};
    newlist["task"]= thingsToDo;
    newlist["completed"]= "[ ]";
    newlist["date created"] = new Date (year, monthIndex [, day [, hours [);
    obj.todoItems.push(newlist);
}

// applying forEach array function to see if it works. edit: it works!
let done = (task, obj) => {
    obj.todoItems.forEach(nestedobj => {if (nestedobj.task == task && nestedobj.completed == "[ ]"){
        nestedobj.completed ="[x]"};})
};



// need a global variable for obj
//problem statement..currently it adds in the list but it will replace..what should i do?
jsonfile.readFile(file, (err, obj) => {
    // I can only use this once? need to comment out after using it once?
   // obj["todoItems"] = []
    //add items
    if (process.argv[2] === "add" && process.argv[3] !== undefined) {
        add(process.argv[3], obj);
        //check if task is done
    }   if  (process.argv[2] === "done" && process.argv[3] !== undefined) {
        done(process.argv[3], obj);
    }

    console.log(obj);
    jsonfile.writeFile(file, obj, (err) => {
        console.log(err)
    });
});