console.log("works!!", process.argv[2]);

let commandType = process.argv[2];

console.log("Your command was: "+commandType);

const jsonfile = require('jsonfile');

const file = 'data.json'

jsonfile.readFile(file, (err, obj) => {

  switch (commandType) {

    case 'add':
        //add brackets
        let todo = "[ ] -";
        obj["todoItems"].push(todo);
        //add item
        let item = "";

        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

        for ( let i=3; i<process.argv.length; i++ ) {
            item += " " + process.argv[i] + " Date added:" + date;
        }
        console.log(item);
        obj["todoItems"].push(item);
        jsonfile.writeFile(file, obj, (err) => {
            console.log(err)
        });
        console.log(obj);
        break;

    case 'show':
        let listNumShow=1;
        for ( let j=1; j<obj["todoItems"].length; j++ ) {
            if ( !!(j % 2) ) {  //output only odd index
                console.log(`${listNumShow}. ${obj["todoItems"][j-1]} ${obj["todoItems"][j]}`)
                listNumShow++;
            }
        }
        break;

    case 'done':
        let checkItem = parseInt(process.argv[3]) + (parseInt(process.argv[3]) - 2);
        obj["todoItems"][checkItem] = "[x] -";

        //call add to update array
        jsonfile.writeFile(file, obj, (err) => {
            console.log(err)
        });

        //call show to list again
        let listNumDone=1;
        for ( let k=1; k<obj["todoItems"].length; k++ ) {
            if ( !!(k % 2) ) {  //output only odd index
                console.log(`${listNumDone}. ${obj["todoItems"][k-1]} ${obj["todoItems"][k]}`)
                listNumDone++;
            }
        }
        break;

  }
});