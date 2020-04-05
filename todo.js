const jsonfile = require('jsonfile');

const file = 'data.json'

let createDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;
    return today
}


if (process.argv[2] === "add"){
    //read the file first
    jsonfile.readFile(file, (err, obj) => {
        //error check
        if (err){
            console.log("error at read file");
        }
        //manipulate object
        obj["todoItems"].push(
            {"item": process.argv[3],
             "done": "[ ]",
             "created at": "created_at: " + createDate()}
            );
        //write changes to file
        jsonfile.writeFile(file, obj, (err) => {
            if (err){
                console.log(err)
            }
        });
    });
} else if (process.argv[2] === "show"){
    //read the file
    jsonfile.readFile(file, (err, obj) =>{
        for (let item of obj["todoItems"]){
            let display = (obj["todoItems"].indexOf(item) + 1) + ". ";
            for (let property in item){
                display += `- ${item[property]} `
            }
            console.log(display)
        }
    });
} else if (process.argv[2] === "done"){
    //Show stuff
    jsonfile.readFile(file, (err, obj) =>{
         if (err){
            console.log("error at read file");
        }
        //manipulate object
        obj["todoItems"][process.argv[3] - 1]["done"] = "[x]";
        obj["todoItems"][process.argv[3] - 1]["updated at"] = "updated_at: " + createDate();
        //write changes to file
        jsonfile.writeFile(file, obj, (err) => {
            if (err){
                console.log(err)
            }
        });

        for (let item of obj["todoItems"]){
            let display = (obj["todoItems"].indexOf(item) + 1) + ". ";
            for (let property in item){
                display += `- ${item[property]} `
            }
            console.log(display)
        }
    });
} else if (process.argv[2] === "delete"){
    jsonfile.readFile(file, (err, obj) =>{
         if (err){
            console.log("error at read file");
        }
        //manipulate object
        obj["todoItems"].splice(process.argv[3] - 1,1);
        //write changes to file
        jsonfile.writeFile(file, obj, (err) => {
            if (err){
                console.log(err)
            }
        });

        for (let item of obj["todoItems"]){
            let display = (obj["todoItems"].indexOf(item) + 1) + ". ";
            for (let property in item){
                display += `- ${item[property]} `
            }
            console.log(display)
        }
    });
}else {
    console.log("input: node todo.js [show/add/done] [item number]")
}



// console.log("works!!", process.argv[2]);

// var commandType = process.argv[2];

// console.log("Your command was: "+commandType);



;