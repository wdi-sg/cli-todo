const jsonfile = require('jsonfile');
const { DateTime } = require("luxon");
DateTime.local();
var colors = require('colors');


const file = 'data.json'

let newKey = process.argv[2]
let newValue = process.argv[3]
let nDate;
let dt;





jsonfile.readFile(file, (err, obj) => {
    //----------------------------------show
    if( process.argv[2] == "show") {
        console.log(obj)
        console.log("no./items/created_at/updated_at")

        for (let i=0 ; i<obj.todoItems.length ; i++){
            let x = i+1;
            console.log(x+". "+obj.brac[i]+" - "+obj.todoItems[i]+", "+obj.cDate[i].blue+", "+obj.uDate[i].red);
        }
    }
    //------------------------------------clear
    if (process.argv[2] == "clear") {

         obj = {};

        console.log(obj)
    }
    //-------------------------------------add
    if (process.argv[2] == "add") {
        if (obj.todoItems == undefined) {
            obj.brac = [];
            obj.todoItems = [];
            obj.cDate = [];
            obj.uDate = [];
            obj.day = [];

            createDate();

            obj.brac.push("[ ]");
            obj.todoItems.push(process.argv[3]);
            obj.cDate.push(nDay);
            obj.uDate.push(" ");

            console.log(obj);
        }
        else {
            createDate();
            obj.brac.push("[ ]");
            obj.todoItems.push(process.argv[3]);
            obj.cDate.push(nDay);
            obj.uDate.push(" ");

            console.log(obj);
        }
    }
    //---------------------------------------done
    if(process.argv[2] == 'done') {
        let i = process.argv[3] - 1;
        obj.brac[i] = "[x]"; //mark X

        createDate(); //create nMilli and nDate
        obj.uDate[i] = nDay;    //keep with new Date.

        console.log(obj);
    }

    if(process.argv[2] == 'delete') {
        let i = process.argv[3]
        obj[2]={};
    }
    jsonfile.writeFile(file, obj, (err) => {
        console.log(err)
    });
});

let createDate = function () {
    dt = DateTime.local();
    var f = {month: 'long', day: 'numeric'};
    nDate = dt.toLocaleString(DateTime.DATETIME_MED);
    nDay = dt.toFormat('dd LLL');
}