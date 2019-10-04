console.log("works!!", process.argv[2]);

var commandType = process.argv[2];

console.log("Your command was: "+commandType);

const jsonfile = require('jsonfile');

const file = 'data.json'

jsonfile.readFile(file, (err, obj) => {

  let todo = "";

  switch (commandType) {

    case 'add':
        for ( let i=3; i<process.argv.length; i++ ) {
            todo += process.argv[i] + " ";
        }
        console.log(todo);
        obj["todoItems"].push(todo);
        jsonfile.writeFile(file, obj, (err) => {
            console.log(err)
        });
        console.log(obj);
        break;

    case 'show':
        for ( let j=0; j<obj["todoItems"].length; j++ ) {
            console.log(`${j+1}. [ ] - ${obj["todoItems"][j]}`)
        }
        break;

    case 'done':
        for ( let k=0; k<obj["todoItems"].length; k++ ) {
            if ( k === parseInt(process.argv[3])-1 ) {
                console.log(`${k+1}. [x] - ${obj["todoItems"][k]}`)
            } else {
                console.log(`${k+1}. [ ] - ${obj["todoItems"][k]}`)
            }
        }
        break;

  }
});