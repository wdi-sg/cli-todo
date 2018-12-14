var commandType = process.argv[2];

console.log("Your command was: "+commandType);

const jsonfile = require("jsonfile");

const file = 'data.json';


function timeGetter(){
  var today = new Date();
  var date = today.getDate();
  var month = today.getMonth() +1;
  var year = today.getFullYear();
  var hour = today.getHours();
  var minute = today.getMinutes();
  
  if (month <10){
    month = "0" + month;
  } 
  
  if (date < 10){
    date = "0" + date;
  }

  if (minute < 10){
    minute = "0" + minute;
  }
  
  var time = `${date}/${month}/${year}, ${hour}:${minute}H`;

  return time;
}


jsonfile.readFile(file, (err, obj) => {

  // console.log(obj);

  // var count = 0;
  // for (var a in obj.){
  //   count++;
  // }

  switch (process.argv[2]){
    case "add":
      var timeNow = timeGetter();

      obj.todoItems.push({"task": [process.argv[3]], "done": false, "date_created": timeNow, "date_updated": ""});
      break;
    
    case "show":
      for (var i=0; i< obj.todoItems.length; i++){
        if (!obj.todoItems[i]["done"]){
          console.log(`${i+1}. [ ] - ${Object.values(obj.todoItems)[i]["task"]} | Date created: ${Object.values(obj.todoItems)[i]["date_created"]} | Date updated: ${Object.values(obj.todoItems)[i]["date_updated"]}`);
        } else {
          console.log(`${i+1}. [x] - ${Object.values(obj.todoItems)[i]["task"]} | Date created: ${Object.values(obj.todoItems)[i]["date_created"]} | Date updated: ${Object.values(obj.todoItems)[i]["date_updated"]}`); 
        }
      }
      break; 
    
    case "done":
      var num = parseInt(process.argv[3]) - 1;
      Object.values(obj.todoItems)[num]["done"] = true;
     
      var timeNow = timeGetter();
      Object.values(obj.todoItems)[num]["date_updated"] = timeNow;

      console.log(`${num+1}. [x] - ${Object.values(obj.todoItems)[num]["task"]} | Date created: ${Object.values(obj.todoItems)[num]["date_created"]} | Date updated: ${Object.values(obj.todoItems)[num]["date_updated"]}`);

      break;

    case "delete":
      var num = parseInt(process.argv[3]) - 1;
      obj.todoItems.splice(num, 1);
      break;

    default:
      console.log("Command not recognised.");
      break;
  }

  jsonfile.writeFile(file, obj, (err) => {
    console.log(err)
  });
  
});
