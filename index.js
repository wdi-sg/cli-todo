var formPhrase = require("font-ascii").default;
let argv = process.argv.splice(2);
const jsonfile = require("jsonfile")
const filename = "data.json";
jsonfile.readFile(filename, (err, obj) => {
    switch(argv[0].toLowerCase()){
    case "add": {
        let toDoArr = obj.toDoList;
        let toDoIndex = obj.toDoIndex;
        obj.toDoList.push("[ ] - " + argv[1] + " Added on " + ( new Date() ).toLocaleDateString().split("/"));
        jsonfile.writeFile(filename, obj, (err) => {})
        formPhrase("Added", { typeface: "StarWars", color: "yellow" });; break;
    }
    case "show": {
        let i = 1;
        formPhrase("To do List", { typeface: "StarWars", color: "white" });
        obj.toDoList.forEach(element => {
            console.log(`${i}. ${element}`);
            i++;}); break; }
    case "done": {
        formPhrase("Done", { typeface: "StarWars", color: "green" });
        let index = parseInt(argv[1]) - 1;
        if((/["updated"]/gi).test(obj.toDoList[index])){break;}
        let updateIndex = obj.toDoList[index];
        let array = updateIndex.split("");
        array[1] = "X";
        obj.toDoList[index] = array.join("") + " Updated on " + ( new Date() ).toLocaleDateString().split("/");
        jsonfile.writeFile(filename, obj, (err) => {}); break;
    }; break;
    case "remove": {
        formPhrase("Removed", { typeface: "StarWars", color: "red" });
        let index = parseInt(argv[1] - 1);
        obj.toDoList.splice(index, 1);
        jsonfile.writeFile(filename, obj, (err) => {}); } break;
    }
})