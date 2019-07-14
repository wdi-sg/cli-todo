const jsonfile = require('jsonfile');
const file = 'data.json';


let today = new Date ();
// //need to write add argv[2] function to add in details like change the name and type of food in the newList. probably need to take in a few parameter lol tmr then think
let add = (thingsToDo, obj) => {
    let newlist = {};
    newlist["task"]= thingsToDo;
    newlist["completed"]= "[ ]";
    newlist["date created"] = new Date ();
    obj.todoItems.push(newlist);
}

// applying forEach array function to see if it works. edit: it works!
let done = (task, obj) => {
    obj.todoItems.forEach(nestedobj => {if (nestedobj.task == task && nestedobj.completed == "[ ]"){
        nestedobj.completed ="[x]"};})
};



jsonfile.readFile(file, (err, obj) => {
    //checks if object is empty, if it is empty, start to initate a key value
    if (Object.keys(obj).length === 0) {
        obj["todoItems"] = [ ]
    }
    //add function
    if (process.argv[2] === "add" && process.argv[3] !== undefined) {
        add(process.argv[3], obj);
        //done function
    }   if  (process.argv[2] === "done" && process.argv[3] !== undefined) {
        done(process.argv[3], obj);
    }
    console.log(obj);
    jsonfile.writeFile(file, obj, (err) => {
        console.log(err)
    });
});