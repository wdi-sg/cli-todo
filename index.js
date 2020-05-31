// console.log("works!!", process.argv[2]);

////console.log without showing the process.argv[2]////

console.log("works!!");
var action = process.argv[2];
var addThingsToDo = process.argv[3];
// console.log("Your command was: "+commandType);

const jsonfile = require('jsonfile');

const file = 'data.json'

// var add = function(check,thingsToDo){
//     jsonfile.readFile(file, (err, obj) => {
//         // console.log(obj);
//         // obj["helloworld"] = "monkey";
//         obj["toToDoList"] = []
//         jsonfile.writeFile(file, obj, (err) => {
//         console.log(obj);
//         });
//     });
// }
// add(title);

var addThings = function(itemPush){
    jsonfile.readFile(file, (err, obj) =>{
        // console.log(obj)
        obj.counter++;
        obj.counterItem.push(obj.counter);
        obj.toDoList.push(itemPush);
        obj.showToDoList.push(": [ ] " + itemPush)
        jsonfile.writeFile(file, obj, (err) =>{
            // console.log(obj);
            console.log("You have added a new to-do item.")
        });
    });
}

// addThings(title,addThingsToDo);

var show = function(){
    jsonfile.readFile(file, (err,obj)=>{
        // console.log(obj);
        for (let i = 0; i<obj.toDoList.length; i++){
            // console.log(obj.counterItem[i] + obj.toDoList[i]);
            // console.log("Number of to do things: ", i)
            console.log((i+1) + obj.showToDoList[i]);
        };
    });
};

// show(title);

var done = function(doneNum){
    jsonfile.readFile(file, (err,obj) =>{
        for(let i = 0; i < obj.counterItem.length; i++){
            // console.log("the value of i is: " + i);
            // console.log(obj.counterItem[i]);
            if(doneNum == obj.counterItem[i]){
                obj.showToDoList[i] =(": [x] " + obj.toDoList[i]);
            };
        };
        jsonfile.writeFile(file , obj, (err)=>{
            console.log("You have complete this to-do");
        });
    });
};

var remove = function(delNum){
    jsonfile.readFile(file, (err,obj) =>{
        for(let i = 0; i < obj.counterItem.length; i++){
            // console.log("Testing remove function :", i);
            // console.log(obj.counterItem);
            if(delNum == obj.counterItem[i]){
                obj.toDoList.splice(i,1);
                console.log(obj.toDoList);
                obj.counterItem.pop();
                console.log(obj.counterItem);
                obj.showToDoList.splice(i,1);
                console.log(obj.showToDoList);
            };
        };
        obj.counter -= 1;
        console.log(obj.counter);
        jsonfile.writeFile(file , obj, (err)=>{
            console.log("Item is removed." )
        });
    });
};


var toToDoList = function(input,input2){
    if (input === "add"){
        addThings(input2);
    }
    else if(input === "show"){
        show();
    }
    else if(input === "done"){
        done(input2);
    }
    else if(input === "delete"){
        remove(input2);
    }
    else{
        console.log("invalid entry")
    }
}

toToDoList(action,addThingsToDo);

// {"toDoList":[],"showToDoList":[],"counterItem":[],"counter":0}

// {"toDoList":["go home","go toilet","go smoke","go sleep"],"showToDoList":["1: [ ] go home","2: [ ] go toilet","3: [x] go smoke","4: [x] go sleep"],"counterItem":[1,2,3,4],"counter":4}

// var show = function(){
//     jsonfile.readFile(file, (err))
// }