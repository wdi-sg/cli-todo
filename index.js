console.log('works!!');

// Implement the deliverables in the order shown above.
// Add to the list. (It starts empty)
// Show all the items in the list (Once you have something inside it)

// Hint: you MUST add a data structure into the json file: the array of todo items you want to track.


//if process.argv[2] == add - push to array
//else if  process.argv[2] == done - create [x] string
const jsonfile = require('jsonfile');

const file = 'data.json';

var counter = 0; // to track count of items in array


jsonfile.readFile(file, (err, obj) => {
    console.log(obj);
//generate number and brackets
    for (var i = 0 ; i <= obj['todoItems'].length ; i++) {
    counter = counter + 1;
    }
    let openTaskNum = `${counter}. [ ]`;


    if (process.argv[2] == 'add'){
        let task = process.argv[3];
        console.log(task);
        obj['todoItems'].push(`${openTaskNum} - ${task}`);
        console.log(obj);
    }
    else if (process.argv[2] == 'done'){
        let taskNumber = process.argv[3];
        console.log(taskNumber);
        let taskIndex = taskNumber-1;
        let item = obj['todoItems'][taskIndex];
        let itemArray = item.split(" "); //splits item into array
        console.log(itemArray);
        itemArray.splice(2,0,'x');
        item = itemArray.join(' ');
        obj['todoItems'].splice(taskNumber-1,1,item);
        console.log(obj);

    }

  jsonfile.writeFile(file, obj, (err) => {
    console.log(err);
    console.log(obj);
  });

});
