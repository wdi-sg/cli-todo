const fs = require("fs");

const add = function (){
    // console.log("hello")

    var dataList = [];

    try {
        dataList = JSON.parse(fs.readFileSync("data.json"));
        let listNum = dataList.length + 1;
        let listItem = process.argv[3];
        dataList.push({ listNum, listItem});
        // console.log (dataList);
    } catch (e) {
        console.log("this is the error ==> " + e)
    }

    fs.writeFileSync("data.json",JSON.stringify(dataList));

}

const show = function (){
    var dataList = [];
    try {
        dataList = JSON.parse(fs.readFileSync("data.json"));
    } catch (e) {
        console.log("this is the error ==> " + e)
    }
    console.log(dataList)
}


module.exports = {
    add,
    show
}