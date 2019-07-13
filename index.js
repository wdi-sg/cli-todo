
// Different command types:
// add
// show
// delete


const jsonfile = require('jsonfile');

const file = 'data.json'


//----- Global Variables -----//
let userInput = process.argv[3];



//----- Function for reading data.json -----//

const readDataFile = () => {

    jsonfile.readFile(file, (err,obj) => {

        if(err) {
            console.log('there is an error')

        } else {

            if (obj["todoItems"] === undefined || obj["todoItems"].length == 0) {
                console.log('There is nothing on the list.\n Would you like to add something to the list?')

            } else if (obj["todoItems"].length > 0) {

                for (let i = 0; i < obj["todoItems"].length; i ++) {
                    console.log((i + 1) + ". " + obj["todoItems"][i])
                }
            }
        }
    });
}


//----- Function for writing new input into data.json -----//

const addNewItem = (inputValue) => {

    jsonfile.readFile(file, (err, obj) => {

        if (err) {
            console.log('there is an error!');
        } else {
            obj["todoItems"].push("[ ] - " + inputValue);

            jsonfile.writeFile(file, obj, (err) => {
                if (err) {
                    console.log('there is an error!')
                } else {
                    console.log(obj);
                }
            });
        };
    });
}

//----- Function for marking item as done -----//

const markDone = (numOnList) => {

    jsonfile.readFile(file, (err, obj) => {

        if (err) {
            console.log('there is an error!');
        } else {

            let itemInArray = obj["todoItems"][numOnList - 1];

            itemInArray = itemInArray.substring(0,1) + "x" + itemInArray.substring(2);

            obj["todoItems"][numOnList - 1] = itemInArray;

            jsonfile.writeFile(file, obj, (err) => {
                if (err) {
                    console.log('there is an error!')
                } else {
                    console.log(obj);
                }
            });
        };
    });
}

const checkCommandType = (userInput) => {

    let commandType = process.argv[2];

    if (commandType === undefined ) {
        console.log('Please choose one of the following options:\n show - See to-do list\n add - Add something to to-do list\n done - Mark an item on list as done')
    } else if (commandType === "show") {
        readDataFile();
    } else if (commandType === "add") {
        addNewItem(userInput);
    } else if (commandType === "done") {
        markDone(userInput);
    }
}

checkCommandType(userInput);