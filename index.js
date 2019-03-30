console.log("works!!");

var commandType = process.argv[2];

console.log("Your command was: " + commandType);

const jsonfile = require("jsonfile");

const file = "data.json";

if (process.argv[2] === "add") {
  //add an item to the to do list
  let todoString = process.argv[3];
  jsonfile.readFile(file, (err, obj) => {
    if (err) {
      console.log(err);
    }
    const todolistLength = Object.keys(obj).length;
    //json file must have an index as key, and text as the value
    for (let i = 1; i < todolistLength + 2; i++) {
      if (obj[i] === undefined) {
        const dateObj = new Date();
        obj[i] = { value: todoString, done: false, updated_at: dateObj };
        
        console.log(i + ". [ ] - " + todoString + " | Updated at: " + dateObj);
      }
    }

    jsonfile.writeFile(file, obj, err => {
      console.log(err);
    });
  });
}
if (process.argv[2] === "delete") {
  //delete an item to the to do list

  jsonfile.readFile(file, (err, obj) => {
    if (err) {
      console.log(err);
    }
    const processArgsLength = process.argv.length;
    const todolistLength = Object.keys(obj).length;
    for (let i = 3; i < processArgsLength; i++) {
      //json file must have an index as key, and text as the value
      for (let j = 1; j < todolistLength + 1; j++) {
        if (j === parseInt(process.argv[i]) && !(obj[j] === undefined)) {
          //delete the entry at this index
          delete obj[j];
        }
      }
    }
    //sort the array out; push the entries down to become ordered again
    //for the current array length
    const todolistLength2 = Object.keys(obj).length;
    for (let i = 1; i < todolistLength2 + 1; i++) {
      if (obj[i] === undefined) {
        // inner: for (let j = i + 1; j < todolistLength2 + i; j++) {
        //   if (!(obj[j] === undefined)) {
        //     obj[i] = obj[j];
        //     delete obj[j];
        //     break inner;
        //   }
        // }
        let smallestNumber = 1000;
        for (const key in obj) {
          if (key < smallestNumber && key > i) {
            smallestNumber = key;
          }
        }
        obj[i] = obj[smallestNumber];
        delete obj[smallestNumber];
      }
    }

    //print the resultant list of entries
    let done = "not reading done";
    for (let i = 1; i < todolistLength2 + 1; i++) {
      if (obj[i] === undefined) {
      } else {
        // console.log(obj[i].done);

        if (obj[i].done === true) {
          done = "x";
        } else {
          done = " ";
        }
        const entryDate = new Date(obj[i].updated_at);

        console.log(
          i +
            ". [" +
            done +
            "] - " +
            obj[i].value +
            " | Updated at: " +
            entryDate
        );
      }
    }

    jsonfile.writeFile(file, obj, err => {
      console.log(err);
    });
  });
}
if (process.argv[2] === "done") {
  jsonfile.readFile(file, (err, obj) => {
    if (err) {
      console.log(err);
    }
    const todolistLength = Object.keys(obj).length;
    for (let i = 1; i < todolistLength + 1; i++) {
      if (i === parseInt(process.argv[3])) {
        obj[i].done = true;
        const dateObj = new Date(obj[i].updated_at);
        let x;
        if (obj[i].done === true) {
          x = "x"
        } else {
          x = " "
        }
        console.log(i + ". [" + x + "] - " + obj[i].value + " | Updated at: " + dateObj);
      }
    }

    jsonfile.writeFile(file, obj, err => {
      console.log(err);
    });
  });
}

if (process.argv[2] === "undo") {
  jsonfile.readFile(file, (err, obj) => {
    if (err) {
      console.log(err);
    }
    const todolistLength = Object.keys(obj).length;
    for (let i = 1; i < todolistLength + 1; i++) {
      if (i === parseInt(process.argv[3])) {
        obj[i].done = false;
        const dateObj = new Date(obj[i].updated_at);
        let x;
        if (obj[i].done === true) {
          x = "x"
        } else {
          x = " "
        }
        console.log(i + ". [" + x + "] - " + obj[i].value + " | Updated at: " + dateObj);
      }
    }

    jsonfile.writeFile(file, obj, err => {
      console.log(err);
    });
  });
}

if (process.argv[2] === "show") {
  jsonfile.readFile(file, (err, obj) => {
    if (err) {
      console.log(err);
    }
    const todolistLength = Object.keys(obj).length;
    let done = "not reading done";
    for (let i = 1; i < todolistLength + 1; i++) {
      if (obj[i] === undefined) {
      } else {
        console.log(obj[i].done);
        if (obj[i].done === true) {
          done = "x";
        } else {
          done = " ";
        }
        const entryDate = new Date(obj[i].updated_at);

        console.log(
          i +
            ". [" +
            done +
            "] - " +
            obj[i].value +
            " | Updated at: " +
            entryDate
        );
      }
    }
  });
}
