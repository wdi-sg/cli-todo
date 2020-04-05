const jsonfile = require('jsonfile');

const file = 'data.json';

jsonfile.readFile(file, (err, obj) => {

let todo = obj["todoItems"];
let input = process.argv;
let info = {"list" : input[3],"completed" : false, "date": new Date()};

const results = () => {
    for (let i = 0; i < todo.length; i++){
        console.log([i + 1] + "." + completed(i) + " - " + todo[i].list + " || " + "created at: " + todo[i].date);
    }
}

const completed = x =>{
    if (todo[x].completed === false){
        return "[ ]"
    } else {
        return "[x]"
    }
}

    if(input[2] === "add"){
        todo.push(info);
    }
    else if(input[2] === "show"){
        results();
    }
    else if(input[2] === "done"){
        todo[(input[3] - 1)].completed = true;
        results();
    } else if (input[2] === "remove"){
        for (let i = 0; i < todo.length; i++){
            if ((i + 1) === parseInt(input[3])){
                todo.splice(i, 1);
            }
        }
        results();
    }

    jsonfile.writeFile(file, obj, (err) => {
        if (err === true){
            console.log(err);
        }
    });
});