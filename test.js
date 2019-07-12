const file = 'todo.json'
const jsonfile = require('jsonfile');

var input1 = process.argv[2] //we can effectively swap in the key value pairs with this
var input2 = process.argv[3] //we can effectively swap in the key value pairs with this

jsonfile.readFile(file, (err, obj) => {

  //to push an object into the object array
  var objSet = {} //declare an object first
  obj["todo"][1] = objSet //asign object to array index
  obj["todo"][1].a = 1 //happy adding
  obj["todo"][1].b = 2 //happy adding
  obj["todo"][1].c = 3 //happy adding

  console.log(obj["todo"]) //expected output - {"todo":[{"a":1,"b":2,"c":3}]}

  jsonfile.writeFile(file, obj, (err) => {
    if (err){
      console.log("--------------------------err message--------------------------")
      console.log(err)
    }
  });
});
