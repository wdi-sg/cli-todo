const jsonfile = require('jsonfile');

const file = 'data.json'

if (process.argv[2] === "add"){
    jsonfile.readFile(file, (err, obj) => {
    console.log("error of readfile is: =============");
    console.log(err);
    console.log("current to-do list is: =============");
    console.log(obj);
    obj["todoList"].push ((obj["todoList"].length +1) + ".[ ] - " + process.argv[3]);
    jsonfile.writeFile(file, obj, (err) => {
        console.log("error of writefile is: ==========")
        console.log(err);
        console.log(obj);
  });
});
} else if (process.argv[2] === "show"){
    jsonfile.readFile(file, (err, obj) => {
    console.log("current to-do list is: =============");
    console.log(err);
    console.log(obj);
    });
} else if (process.argv[2] === "done"){
    jsonfile.readFile(file, (err, obj) => {
    console.log("current to-do list is: =============");
    console.log(err);
    console.log(obj);

    });
}