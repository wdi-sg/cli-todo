// console.log("works!!", process.argv[2]);

// var commandType = process.argv[2];

// console.log("Your command was: "+commandType);

// const jsonfile = require('jsonfile');

// const file = 'data.json'

// jsonfile.readFile(file, (err, obj) => {

//   console.log(obj);
//   obj["helloworld"] = "monkey";

//   jsonfile.writeFile(file, obj, (err) => {
//     console.log(err)
//   });


console.log(process.argv);

const jsonfile = require('jsonfile');

const file = 'data.json';

const obj = {
    1: '[ ] - eat bak kut teh',
    2: '[ ] - go shopping',
    3: '[ ] - feed dog',
    4: '[ ] - swim practice',
    5: '[ ] - code app',
    6: '[ ] - meet gabriel',
};

if (process.argv[2] === 'write') {
    console.log("THIS IS WORKING!")
}

jsonfile.writeFile(file, obj, (err) => {
  console.log(err)
});