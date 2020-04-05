let commandType = process.argv[2];

let listItem = process.argv[3];

console.log(`Your command was: ${commandType} `);

const jsonfile = require('jsonfile');

const file = 'data.json'

const dateStamp = () => {
    let date = new Date;
    let dateString = date.toDateString();
    return dateString;
}

class Item {
    constructor(name) {
        this._name = name;
        this._done = false;
        this.createdAt = dateStamp();
    }
}

const printUpdated = (updatedAt) => {
    if (updatedAt) {
        return `(updated at ${updatedAt})`;
    } else {
        return "";
    }
}

jsonfile.readFile(file, (err, obj) => {

  switch (commandType) {
// if command is to add
    case 'add':
// push new object to array
        obj['todoItems'].push(new Item(listItem));
        console.log('your wish is my command');
        break;
// if command is to show
    case 'show':
// iterate every item in the list
        for (let i=0; i<obj['todoItems'].length; i++) {
// destructure the object
            let {_name, _done, createdAt, updatedAt} = obj["todoItems"][i];
// if else for checking if the list item is done
            let doneOrNot = _done ? 'X': ' ';
// format the output in a proper list form
            let formatOutput = `${i+1}. [${doneOrNot}] - ${_name} (created at ${createdAt})${printUpdated(updatedAt)}`
            console.log(formatOutput);
        };
        break;
// if command is done
    case 'done':
        let selected = obj["todoItems"][parseInt(listItem)-1];
// toggle done or not done
        selected._done = !selected._done;
        selected['updatedAt'] = dateStamp();
        break;
// if command is delete
    case 'delete':
        obj["todoItems"].splice(parseInt(listItem)-1,1);
        break;
// if command is invalid
    default:
        console.log(`\n
___________                        _________                      __  .__    .__
\\__    ___/__.__.______   ____    /   _____/ ____   _____   _____/  |_|  |__ |__| ____    ____
  |    | <   |  |\\____ \\_/ __ \\   \\_____  \\ /  _ \\ /     \\_/ __ \\   __\\  |  \\|  |/    \\  / ___\\
  |    |  \\___  ||  |_> >  ___/   /        (  <_> )  Y Y  \\  ___/|  | |   Y  \\  |   |  \\/ /_/  >
  |____|  / ____||   __/ \\___  > /_______  /\\____/|__|_|  /\\___  >__| |___|  /__|___|  /\\___  /
          \\/     |__|        \\/          \\/             \\/     \\/          \\/        \\//_____/   \n`)
        console.log('please enter command: add / show / done / delete ');
        break;
  };

  jsonfile.writeFile(file, obj, (err) => {
    console.log(`errors: ${err}`)
  });
});