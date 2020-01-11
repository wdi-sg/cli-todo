console.log("works!!");

// Implement the deliverables in the order shown above.
// Add to the list. (It starts empty)
// Show all the items in the list (Once you have something inside it)

// Hint: you MUST add a data structure into the json file: the array of todo items you want to track.

const jsonfile = require('jsonfile');

const file = 'data.json';
// add item input by user into array
    // starts at number 1 and increment by 1 each time
jsonfile.readFile(file, (err, obj) => {
    console.log(obj);
    //generate number and brackets
    var counter = 0;
    for (var i = 0 ; i <= obj["todoItems"].length ; i++) {
        counter = counter + 1;
    }
        let brackets = `${counter}. [ ]`;

        obj["todoItems"].push(`${brackets} - ${process.argv[3]}`);

        console.log(obj);

  jsonfile.writeFile(file, obj, (err) => {
    console.log(err);
    console.log(obj);
  });
});
