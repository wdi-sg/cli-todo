
/*const jsonfile = require('jsonfile');

const file = 'data.json'

jsonfile.readFile(file, (err, obj) => {
    console.log(obj)
    if(obj.array === undefined){
        obj.array = [];
        obj.array.push(process.argv[3]);
}else{
    obj.array.push(process.argv[3]);
}

  console.log(obj);
  //obj["helloworld"] = "monkey";

  jsonfile.writeFile(file, obj, (err) => {
    console.log(err)
  });
});*/
var actionToPerform = process.argv[2];
const jsonfile = require('jsonfile');

const file = 'data.json'

jsonfile.readFile(file, (err, obj) => {
    if(process.argv[2] === "add"){
        obj["todoItems"].push(process.argv[3])
    }else if(process.argv[2] === "show"){
        for(let i = 0; i < obj["todoItems"].length; i++){
            console.log(i + 1 +". [ ] - " + obj["todoItems"][i]);
        }
    }
   //console.log(obj);
   jsonfile.writeFile(file, obj, (err) => {
     console.log(err)
   });
});
/*var commandType = process.argv[2];
 var inputString = function(){
   var stringArr = process.argv;
   var remove = stringArr.splice(0,3);
   // console.log(remove);
   var outString = "";
   for (id in stringArr){
     outString += stringArr[id];
     outString += " ";
   }
   return outString;
 }
 const jsonfile = require('jsonfile');

 const file = 'data.json'

 jsonfile.readFile(file, (err, obj) => {
    switch (commandType) {
     case "show":
       show(obj.todoItems);
       break;
     case "add":
       add(obj.todoItems);
       break;
     default:
       break;
   }
   // console.log(obj);
   jsonfile.writeFile(file, obj, (err) => {
    if (err != null || err != undefined) {
       console.log(err)
     }

   });
 });

 function show(list) {
   if (list.length == 0) {
     console.log("List is empty...");
   } else if (list.length > 0) {
     var listOut = "";
     for (id in list){
       listOut += `${parseInt(id)+1}. [ ] - ${list[id]}\n`;
     }
     listOut = listOut.trim();
     console.log(listOut);
   }

 }

 function add(list) {
   var input = inputString().trim();
   list.push(input);
   show(list);

 }*/