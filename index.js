let commandType = process.argv[2];

let [month, date, year] = ( new Date() ).toLocaleDateString().split("/");
let dateNow = [month, date, year];
let dateOutput = `${dateNow[1]}/${dateNow[0]}/${dateNow[2]}`;

console.log("Your command was: "+commandType);

const jsonfile = require("jsonfile");

const file = 'data.json';

if (commandType === "add") {
    let toDoAction = process.argv[3];
    jsonfile.readFile(file, (err, obj) => {
    console.log(obj);
    obj["todoItems"].push(`${obj["todoItems"].length + 1}. [ ] - ${toDoAction}, Created at: ${dateOutput}`);

    jsonfile.writeFile(file, obj, (err) => {
        if (err) throw err;
    })
})
} else if (commandType === "show") {
    jsonfile.readFile(file, (err, obj) => {
        obj["todoItems"].forEach(action => {
            console.log(action)
        })
    })
} else if (commandType === "done") {
    let markDoneNumber = process.argv[3];
    jsonfile.readFile(file, (err, obj) => {
        let toBeReplaced = obj["todoItems"][markDoneNumber - 1].replace("[ ]", "[X]") + ", Updated at:" + dateOutput;;
        obj["todoItems"].splice((markDoneNumber - 1), 1, toBeReplaced);
        obj["todoItems"].forEach(action => {
            console.log(action)
        })
        jsonfile.writeFile(file, obj, (err) => {
            if (err) throw err;
        })
    })
}