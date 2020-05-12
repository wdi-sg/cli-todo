console.log("To Do List");
console.log("To add item: add 'thing to do'");
console.log("To view list: show");
console.log("Check off item: done 'number on list'");
console.log("Delete item: delete 'number on list'");
console.log(" ");

let commandType = process.argv[2];

console.log("Your command was: "+commandType);

const jsonfile = require('jsonfile');

const file = 'data.json'

jsonfile.readFile(file, (err, obj) => {

    function recordItems() {
        jsonfile.writeFile(file, obj, function (err) {
            if (err) console.error(err)
        });
    }

    function listItems() {
        let listNumShow=1;
        for ( let j=1; j<obj["todoItems"].length; j++ ) {
            if ( !!(j % 2) ) {  //output only odd index
                console.log(`${listNumShow}. ${obj["todoItems"][j-1]} ${obj["todoItems"][j]}`)
                    listNumShow++;
            }
        }
    }

    //add date
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();


  switch (commandType) {

    case 'add':
        //add brackets
        let todo = "[ ] -";
        obj["todoItems"].push(todo);
        //declare item to be added
        let item = "";

        for ( let i=3; i<process.argv.length; i++ ) {
            item += " " + process.argv[i];
        }
        console.log(item);
        obj["todoItems"].push(item + " created_at:" + date);
        recordItems();

        break;

    case 'show':
        listItems();
        break;

    case 'done':
        let checkItem = parseInt(process.argv[3]) + (parseInt(process.argv[3]) - 2);
        obj["todoItems"][checkItem] = "[x] -";

        //update array
        jsonfile.writeFile(file, obj, function (err) {
            if (err) console.error(err)
        });

        //list
        listItems();
        break;

    case 'delete':
        let delItem = parseInt(process.argv[3]) + (parseInt(process.argv[3]) - 2);
        obj["todoItems"].splice(delItem, 2);

        //update array
        jsonfile.writeFile(file, obj, function (err) {
            if (err) console.error(err)
        });

        //list
        listItems();
        break;

  }
});