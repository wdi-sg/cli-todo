


const jsonfile = require('jsonfile');

const file = 'data.json'
let operator = process.argv[2];
if (operator === "add"){
    jsonfile.readFile(file, (err, obj) => {


      let newItem = process.argv[3];
      let newArray = obj["todoItems"];
      let date = new Date();
      let stringDate=date.toString();
      // let nextIndex = parseInt(newArray.length) + 1 + ".";
      newArray.push( " ["+" ] " + "- " + newItem + " created at" + stringDate);

      jsonfile.writeFile(file, obj, (err) => {
        console.log(err)
      });
    });
}

if (operator === "show"){
    jsonfile.readFile(file, (err,obj)=>{

        let newArray = obj["todoItems"];


        newArray.forEach((addIndex, index)=>{
            updated = index + 1 +"." + addIndex;
            console.log(updated)
        })

        })
    }

if (operator === "done"){
    jsonfile.readFile(file, (err,obj)=>{

        let indexToMark = process.argv[3]-1
        let newArray = obj["todoItems"];
        let marking = newArray[indexToMark].replace("[ ]","[X]");

        let date = new Date();
        let stringDate=date.toString();
        dateUpdated = marking + " updated at " + stringDate;
        newArray[indexToMark] = dateUpdated

              jsonfile.writeFile(file, obj, (err) => {
        console.log(err)
      });
    })
}

if (operator ==="delete"){
    jsonfile.readFile(file, (err,obj)=>{

        let indexToMark = process.argv[3]-1
        let newArray = obj["todoItems"];
        newArray.splice(indexToMark,1);

              jsonfile.writeFile(file, obj, (err) => {
        console.log(err)
      });
    })


}

