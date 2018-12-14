const jsonfile = require('jsonfile');

const file = 'data.json'

    //[[],[],[]]
    //todoList[item number][item name]
                        // [done or not]
                        // [date]

switch (process.argv[2]) {
    case "show":
        jsonfile.readFile(file, (err, obj) => {
            console.log(obj["todoList"]);
            var list = obj["todoList"];
            for ( var i = 0; i < list.length; i++) {
                console.log(`${i+1}. [${list[i][1]}] - ${list[i][0]} - Added On: ${list[i][2]}`);
            }
        });
        break;

    case "add":
        var itemName = process.argv[3];
        var dateTime = new Date();
        jsonfile.readFile(file, (err, obj) => {

          console.log(obj);

          var list = obj["todoList"];
          list.push([]);
          list[list.length-1].push(itemName);
          list[list.length-1].push(" ");
          list[list.length-1].push(`${dateTime.getDate()}/${dateTime.getMonth()}/${dateTime.getFullYear()}`);

          jsonfile.writeFile(file, obj, (err) => {
            console.log(err)
          });
        });
        break;

    case "done":
        var itemNumber = parseInt(process.argv[3]) - 1;

        jsonfile.readFile(file, (err, obj) => {

          console.log(obj);

          var list = obj["todoList"];
          list[itemNumber][1] = "X";

          jsonfile.writeFile(file, obj, (err) => {
            console.log(err)
          });
        });
        break;
}