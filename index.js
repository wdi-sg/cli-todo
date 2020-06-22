
// Different command types:
// add
// show
// delete


const jsonfile = require('jsonfile');

const file = 'data.json'


//----- Global Variables -----//
let userInput = process.argv[3];

let current_datetime = new Date()
let formatted_date = current_datetime.getDate() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getFullYear() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds()

let asciiArt = `
╔╦╗┌─┐  ╔╦╗┌─┐  ╦  ┬┌─┐┌┬┐
 ║ │ │   ║║│ │  ║  │└─┐ │
 ╩ └─┘  ═╩╝└─┘  ╩═╝┴└─┘ ┴
 `


//----- Function for reading data.json -----//

const readDataFile = () => {

    jsonfile.readFile(file, (err,obj) => {

        if(err) {
            console.log('there is an error')

        } else {

            if (obj["todoItems"] === undefined || obj["todoItems"].length == 0) {
                console.log('There is nothing on the list.\n Would you like to add something to the list?')

            } else if (obj["todoItems"].length > 0) {

                console.log(asciiArt);

                for (let i = 0; i < obj["todoItems"].length; i ++) {
                    console.log((i + 1) + ". " + obj["todoItems"][i])
                }
                console.log("");
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

            if (inputValue === undefined) {
                console.log('Please type in an item to add to the list');

            } else {

                obj["todoItems"].push("[ ] - " + inputValue + " (created at: " + formatted_date + ")");

                jsonfile.writeFile(file, obj, (err) => {
                    if (err) {
                        console.log('there is an error!')

                    } else {

                        console.log(asciiArt);

                        for (let i = 0; i < obj["todoItems"].length; i ++) {
                            console.log((i + 1) + ". " + obj["todoItems"][i])
                        };
                        console.log("");
                    }
                });
            }
        };
    });
}

//----- Function for marking item as done -----//

const markDone = (numOnList) => {

    jsonfile.readFile(file, (err, obj) => {

        if (err) {
            console.log('there is an error!');
        } else {

            if (numOnList === undefined) {
                console.log('Please choose item from list to mark as done');

            } else {


                let itemInArray = obj["todoItems"][numOnList - 1];
                let positionOfDate = itemInArray.indexOf("(");

                itemInArray = itemInArray.substring(0,1) + "x" + itemInArray.substring(2, positionOfDate) + "(updated at: " + formatted_date + ")";

                obj["todoItems"][numOnList - 1] = itemInArray;

                jsonfile.writeFile(file, obj, (err) => {
                    if (err) {
                        console.log('there is an error!')

                    } else {

                        console.log(asciiArt);

                        for (let i = 0; i < obj["todoItems"].length; i ++) {
                            console.log((i + 1) + ". " + obj["todoItems"][i])
                        };
                        console.log("");
                    }
                });
            }

        };
    });
}

//----- Function for deleting items from list -----//

const deleteItem = (numOnList) => {

    jsonfile.readFile(file, (err, obj) => {

        if (err) {
            console.log('there is an error!');

        } else {

            if (numOnList === undefined) {
                console.log('Please type in item number to delete to the list');

            } else {

                obj["todoItems"].splice(numOnList - 1, 1)

                jsonfile.writeFile(file, obj, (err) => {
                    if (err) {
                        console.log('there is an error!')

                    } else {

                        console.log(asciiArt);

                        for (let i = 0; i < obj["todoItems"].length; i ++) {
                            console.log((i + 1) + ". " + obj["todoItems"][i])
                        };
                        console.log("");
                    }
                });
            }
        };
    });
}

const checkCommandType = (userInput) => {

    let commandType = process.argv[2];

    if (commandType === undefined ) {
        console.log('Please choose one of the following options:\n show - See to-do list\n add - Add something to to-do list\n done - Mark an item on list as done\n delete - Delete item from list')
    } else if (commandType === "show") {
        readDataFile();
    } else if (commandType === "add") {
        addNewItem(userInput);
    } else if (commandType === "done") {
        markDone(userInput);
    } else if (commandType === "delete") {
        deleteItem(userInput);
    }
}

checkCommandType(userInput);