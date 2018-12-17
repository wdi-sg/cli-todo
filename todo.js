
function getTodaysDate() {
  var today = new Date();
  var day = today.getDate();
  var month = today.getMonth()+1; 
  var year = today.getFullYear();
  var hour = today.getHours();
  var minute = today.getMinutes();
  
  if(day<10) {
      day = '0'+day
  } 
  
  if(month<10) {
      month = '0'+month
  } 
  
  if(hour<10) {
    hour = '0'+hour
} 

if(minute<10) {
  minute = '0'+minute
} 

  today = day + '/' + month + '/' + year + " " + hour + ":" + minute;

  return today
}
var commandType = process.argv[2].toUpperCase();

var userData="";

var userInput= process.argv.slice(3);

for (var i=0; i < userInput.length; i++) {
  userData += userInput[i] +  " ";
}


const jsonfile = require('jsonfile');

const file = 'data.json'

var today = getTodaysDate();

jsonfile.readFile(file, (err, todoList) => {

  if (err) console.error(err)

  if (commandType === "ADD") {

    // if (todoList.hasOwnProperty('index')) {

    //   var idx = parseInt(todoList.index) + 1;
    //   todoList.index = String(idx);
    // } else {
    //   var idx = 0;
    //   todoList['index'] = String(idx);
    // }

    

    const todoItem = {
      // idx: String(idx),
      status: "O",
      created_at: today,
      updated_at: today,
      userData: userData
    };

    if (todoList.hasOwnProperty('todoItems')) {
      todoList.todoItems.push(todoItem);
    } else {
      todoList["todoItems"] = [todoItem];
    }

  } else if (commandType === "SHOW") {
    
    console.log('(        )    (               ');
    console.log('  *   )     )\ )  ( /(    )\ )         )  ');
    console.log('` )  /(    (()/(  )\())  (()/((     ( /(  ');
    console.log(' ( )(_)|    /(_))((_)\    /(_))\ (  )\()) ');
    console.log('(_(_()))\  (_))_   ((_)  (_))((_))\(_))/  ');
    console.log('|_   _((_)  |   \ / _ \  | |  (_|(_) |_   ');
    console.log('  | |/ _ \  | |) | (_) | | |__| (_-<  _|  ');
    console.log('  |_|\___/  |___/ \___/  |____|_/__/\__|  ');
    
    console.log(" ");
    console.log("Item" + " sts   " + "Created on "+"      Updated At " +   "      To Do Lists");
    console.log("====" + " ===   " + "==========="+"===== ================" + " ==========================");
    for (var i = 0; i < todoList.todoItems.length; i++) {
      var item = todoList.todoItems[i];
      var status = item.status.toUpperCase();

      if (status === 'D') {
        status = 'X'
      } else {
        status = " " 
      }

      console.log(" " + (i + 1) + ".  [" + status +"] - " + item.created_at + " " + item.updated_at + " " + item.userData)
    }
  
  } else if (commandType === "DELETE") {
    var idx = parseInt(userData) - 1;
    todoList.todoItems.splice(idx, 1);
  } else if (commandType === "DONE") {
    var idx = parseInt(userData) - 1;
    todoList.todoItems[idx].status = "D"
    todoList.todoItems[idx].updated_at = today;
  }


  jsonfile.writeFile(file, todoList, (err) => {
    // console.log(err)
    if (err) console.error(err)
  });

});