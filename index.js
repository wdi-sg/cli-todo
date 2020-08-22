const jsonfile = require('jsonfile');
const formPhrase = require("font-ascii").default;
const file = 'data.json'

const ENV = process.argv[0];
const PATH = process.argv[1];
const operation = process.argv[2];
const chore = process.argv[3];


//status is either [x] or [ ]
let status;
let num;
let value;
let number;
let newValue;





//helper functions

//function to add things to do list

// everytime a user adds something, push it into file.toDoItems array so you can use .length property to track number of items in the list

function addList () {
  jsonfile.readFile(file, (err, obj) => {
    //check for error, if not will return a promis
    if(err) {
      console.log("Error at jsonreadfile!")
    }
    
    number = obj["todoItems"].length+ 1
    num = number.toString();
    status = ". [ ] - ";
    let dateAdded = new Date();
     value = status + chore + " date added: " + dateAdded
    console.log(num,value);
    obj["todoItems"].push({
      num : value,
      
    });
    formPhrase("Added to the list", { typeface: "Small", color: "magenta" })
    //write changes into the file
    jsonfile.writeFile(file, obj, (err) =>{
      if(err){
        console.log(err, "error at write file!")
      }
    })
  })
}

// show to do list function
function showList () {
  jsonfile.readFile( file, (err, obj) => {
    if(err) {
      console.log("Error at json read file")
    }
    formPhrase("To do List", { typeface: "FlowerPower", color: "cyan" });
    // for loop to console everything in the array
    for(i=0; i< obj["todoItems"].length; i++){
      let showNum = i + 1 
       let showvalue = obj["todoItems"][i].num
      console.log(showNum, showvalue)
    }
  })
}

// mark as done function 

function markDone(numberToParse) {
  jsonfile.readFile( file, (err,obj) => {
    if(err){
      console.log("error at jsonReadfile")
    }
    let arrayNum = parseInt(numberToParse) - 1;
    for(i=0; i< obj["todoItems"].length; i++){
      if(i !==arrayNum){
        num = i + 1 ;
        value = obj["todoItems"][i].num;
        console.log(num, value)
      } else {
       num =  i + 1;
        const dateUpdated = new Date();
        newValue = obj["todoItems"][i].num.replace(". [ ] - ",". [X] - ") + " date updated: " + dateUpdated;
        console.log(num, newValue);
        obj["todoItems"].splice(arrayNum, 1 );
        obj["todoItems"].splice(arrayNum,0, {num: newValue});
      }
    }
    


    jsonfile.writeFile(file, obj, (err) =>{
      if(err){
        console.log(err, "error at write file!")
      }
    })
  })
}

//remove function

function removeItem (removeNum) {
  jsonfile.readFile(file, (err, obj) => {
    if(err){
      console.log("error at jsonRead")
    }
    let removeIndex = removeNum -1;
    obj["todoItems"].splice(removeIndex, 1);
    jsonfile.writeFile(file, obj, (err) =>{
      if(err){
        console.log(err, "error at write file!")
      }
      showList();
    })
  })
}


//COMMAND LINE STUFF
if(operation=== "add"){
  addList()
} else if(operation === "show") {
  showList()
} else if (operation=== "done"){
  markDone(chore)
} else if (operation === "remove") {
  removeItem(chore)
}

