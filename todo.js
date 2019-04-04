const jsonfile = require('jsonfile');

const file = 'data.json';

let commandType = process.argv[2];

const add = (toDo) => {
    jsonfile.readFile(file,(err, obj) => {
        obj.todoItems.push = toDo;
        jsonfile.writeFile(file, obj, (err) => {
            console.log(err)
        });
    });
}

const show = () => {

}



// } else if (commandType === "show") {
//     jsonfile.readFile(file, (err, obj) => {
//         console.log(obj);
//     })
// } else if (commandType === "done") {

// }

// (json["todoItems"].length+1) + ". [ ] - " +

if (commandType === "add") {
    add(process.argv[3]);
} else if (commandType === "show") {
    show()
}