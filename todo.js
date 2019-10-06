// Install jsonfile using npm
const jsonfile = require('jsonfile');

// Create data.json file with empty object syntax
const file = 'data.json';

// Create constant variable to indicate if task is completed
/*const taskIncomplete = ". [ ] - ";
const taskComplete = ". [x] - ";*/

// Read the third argument from command line to add into todoItems array
jsonfile.readFile(file, (err, obj) => {

    // Declare a variable to for obj.todoItems
    let toDoObject = obj.todoItems;

    // Check the last item number
    let currentLastItemNo = toDoObject.length;
    console.log("Current last item no. is " + currentLastItemNo);

    let nextItemNo = currentLastItemNo + 1;
    console.log("Next item no. is " + nextItemNo);

    let created_at = new Date();
    let updated_at = new Date();

    if(process.argv[2] === "add") {

        let record = {
            "taskNum": nextItemNo,
            "taskDescription": process.argv[3],
            "status": "[ ]",
            "created_at": created_at,
            "updated_at": updated_at
        };

        toDoObject.push(record);

        console.log(record.taskNum + ". " + record.status + " - " + record.taskDescription);

    } else if(process.argv[2] === "show") {

        // Display list as per expected format
            // e.g. 1. [ ] - eat bak kut teh
        for(let i = 0; i < toDoObject.length; i++) {

            console.log(toDoObject[i].taskNum + ". " + toDoObject[i].status + " - " + toDoObject[i].taskDescription);
        }

    } else if(process.argv[2] === "done") {

        // Check the item number to be marked as done
        let taskNo = parseInt(process.argv[3]) - 1;

        // Get the record
        let record = toDoObject[taskNo];

        // Update the record status to complete
        record.status = "[x]";
        record.updated_at = updated_at;

        console.log(record);

    }

    jsonfile.writeFile(file, obj, (err) => {
        console.log("Error: " + err);
    });
});
