//imports
// const _ = require('lodash');
const jsonfile = require('jsonfile');
const file = './data.json';
const date = new Date();

//shorthand
const arg = process.argv                //array
var argArray = [];


//helper functions
var doneMarker = (list, done)=>{
    argArray.forEach(function(ele, num){
        let string = list[parseInt(ele[0]) - 1][0];
        list[parseInt(ele[0]) - 1][0] = string.substring(0, 1) + done + string.substring(2, parseInt(string.length) + 1);
        list[parseInt(ele[0]) - 1].push(date)
        console.log(list[parseInt(ele[0]) - 1][0]);
    });
};
var del = (list)=>{
    argArray.forEach(function(ele, num){
        list.splice(parseInt(ele[0]) - 1, 1);
    });
    console.log(list);
};


//ADD data.json
const write = (command)=>{
    jsonfile.readFile(file, (err, obj) => {
        let list = obj.todoItems;
        if(err){
            console.log(err);
            return;
        }
        switch(command){
            case "add":                     //ADD arraypush
                console.log(date)
                argArray.forEach(function(ele, num){
                    list.push([`[ ] - ${ele}`, date]);
                });
                break;
            case "done":                    //Change string x
                doneMarker(list, "x");
                break;
            case "notDone":                 //Change string " "
                doneMarker(list, " ");
                break;
            case "delete":                 //Change string " "
                del(list);
                break;
            default:
                return;
        }
        jsonfile.writeFile(file, obj, (err) => {
            if (err){
                console.log(err);
            }
        });
    });
};
//show
const show = (type)=>{
    jsonfile.readFile(file, (err, obj) => {
        let list = obj.todoItems;
        list.forEach(function(ele, num){
            if(type === "list"){
                console.log(`${num + 1}. ${ele[0]}`);
            }else if(type === "c-date"){
                console.log(`${num + 1}. ${ele[1]}`);
            }else if(type === "u-date"){
                console.log(`${num + 1}. ${ele[2]}`);
            }else {
                console.log(`${num + 1}. ${ele}`);
            }
        })

    });
};

//processing inputs
arg.forEach(function(ele, num){
    if(num >= 3){
        argArray.push(ele);
    }
});
//processing commands (add, show)
switch(arg[2]) {
    case "add":
        console.log(arg[2]);
        write("add");
        break;
    case "show":
        console.log(arg[2]);
        show(argArray[0]);
        break;
    case "done":
        console.log(arg[2]);
        write("done");
        break;
    case "notDone":
        console.log(arg[2]);
        write("notDone");
        break;
    case "delete":
        console.log(arg[2]);
        write("delete");
        break;
    case "help":
        console.log(arg[2]);
        console.log("\n    TYPE (node index.js) followed by (add/ show/ done/ notDone/ delete)\n    ADD: todo item of yours (\"buy dinner\")\n    DONE/notDone/delete: no. of item you completed(node index.js done/notDone/delete 3)\n    SHOW: (list/ c-date/ u-date)");
        break;
  default:
    console.log("ERROR: type \"help\" to check accepted commands");
}