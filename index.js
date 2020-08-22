const jsonfile = require('jsonfile');
const file = 'data.json'

const ENV = process.argv[0];
const PATH = process.argv[1];
const operation = process.argv[2];
const chore = process.argv[3];

//status is either [x] or [ ]
let status;





//helper functions

//function to add things to do list

// everytime a user adds something, push it into file.toDoItems array so you can use .length property to track number of items in the list

function addList () {
  jsonfile.readFile(file, (err, obj) => {
    //check for error, if not will return a promis
    if(err) {
      console.log("Error at jsonreadfile!")
    }
    let num = `${obj["todoItems"].length+ 1}. [ ] - `.toString();
    console.log(num,chore);
    const value = chore;
    
    obj["todoItems"].push({
      num : value
    });
    //write changes into the file
    jsonfile.writeFile(file, obj, (err) =>{
      if(err){
        console.log(err, "error at write file!")
      }
    })
  })
}

function showList () {
  jsonfile.readFile( file, (err, obj) => {
    if(err) {
      console.log("Error at json read file")
    }
    // for loop to console everything in the array
    for(i=0; i< obj["todoItems"].length; i++){
      let showNum = i + 1 + ". [ ] - "
      let value = obj["todoItems"][i].num
      console.log(showNum, value)
    }
  })
}




//COMMAND LINE STUFF
if(operation=== "add"){
  console.log(addList())
} else if(operation === "show") {
  console.log(showList())
}