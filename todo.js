


// console.log("works!!", process.argv[2]);

// var commandType = process.argv[2];

// console.log("Your command was: "+commandType);

const jsonfile = require('jsonfile');

const file = 'data.json';

// var count = 0;

// read file for testing
// jsonfile.readFile(file, (err, obj) => {
//   //   count++;

//   //   console.log(obj);

//   // obj.name ="eat bak kut teh";
//   // obj.id = count;
//   // obj.done = "[ ]";

//   // console.log(obj.id + ". " + obj.done + " - " + obj.name);

//      let newActivity = {};
//      let id = obj.activitiesArray.length + 1;

//      newActivity.id = id;
//      newActivity.activityName = userInput;
//      newActivity.doneStatus = "[ ]";

//      let today = new Date();
//      console.log(today);
//      let dd = today.getDate();
//      let mm = today.getMonth() + 1;
//      let yyyy = today.getFullYear();
//      let hrs = today.getHours();
//      let mins = today.getMinutes();
//      let secs = today.getSeconds();
//      if(hrs >= 0 && hrs <= 12) {
//         today = `Date: ${dd}-${mm}-${yyyy} Time: ${hrs}:${mins}:${secs} AM`;
//      } else if(hrs > 12 && hrs <= 23) {
//         today = `Date: ${dd}-${mm}-${yyyy} Time: ${hrs}:${mins}:${secs} PM`;
//      }

//      console.log(today);
//      console.log(dd);
//      console.log(mm);
//      console.log(yyyy);
//      console.log(hrs);
//      console.log(mins);
//      console.log(secs);

//      obj.activitiesArray.push(newActivity);


//      obj.activitiesArray.forEach(function(newActivity) {
//         console.log(newActivity.id + ". " + newActivity.doneStatus + " - " + newActivity.activityName + " ");
//     });

//   });



const commandType = process.argv[2];
const userInput = process.argv[3];




if(commandType === "show") {

 jsonfile.readFile(file, (err, obj) => {

    obj.activitiesArray.forEach(function(newActivity) {
        console.log(newActivity.id + ". " + newActivity.doneStatus + " - " + newActivity.activityName + " added on " + newActivity.createdAt + " updated on " + newActivity.updatedAt);
    });


});

}



if(commandType === "done") {

 jsonfile.readFile(file, (err, obj) => {

    for(var i=0; i<obj.activitiesArray.length; i++) {
        if(userInput ==  obj.activitiesArray[i].id) {
            obj.activitiesArray[i].doneStatus = "[x]";

            let today = new Date();
            let dd = today.getDate();
            let mm = today.getMonth() + 1;
            let yyyy = today.getFullYear();
            let hrs = today.getHours();
            let mins = today.getMinutes();
            let secs = today.getSeconds();
            if(hrs >= 0 && hrs <= 12) {
                today = `Date: ${dd}-${mm}-${yyyy} | Time: ${hrs}:${mins}:${secs} AM`;
            } else if(hrs > 12 && hrs <= 23) {
                today = `Date: ${dd}-${mm}-${yyyy} | Time: ${hrs}:${mins}:${secs} PM`;
            }

            obj.activitiesArray[i].updatedAt = today;
        }
    }



    obj.activitiesArray.forEach(function(newActivity) {
        console.log(newActivity.id + ". " + newActivity.doneStatus + " - " + newActivity.activityName + " updated on " + newActivity.updatedAt);
    });

    jsonfile.writeFile(file, obj, (err) => {

        console.log("done status updated!");


    });
});

}

if(commandType === "undone") {

 jsonfile.readFile(file, (err, obj) => {

    for(var i=0; i<obj.activitiesArray.length; i++) {
        if(userInput ==  obj.activitiesArray[i].id) {
            obj.activitiesArray[i].doneStatus = "[ ]";
            obj.activitiesArray[i].updatedAt = "";
        }
    }

    obj.activitiesArray.forEach(function(newActivity) {
        console.log(newActivity.id + ". " + newActivity.doneStatus + " - " + newActivity.activityName);
    });

    jsonfile.writeFile(file, obj, (err) => {

        console.log("done status updated!");

    });
});

}

if(commandType === "delete") {

    jsonfile.readFile(file, (err, obj) => {

        for(var i=0; i<obj.activitiesArray.length; i++) {
            if(userInput ==  obj.activitiesArray[i].id) {
                obj.activitiesArray.splice(i,1);
            }
        }

        obj.activitiesArray.forEach(function(newActivity) {
            console.log(newActivity.id + ". " + newActivity.doneStatus + " - " + newActivity.activityName + " " + newActivity.createdAt);
        });


        jsonfile.writeFile(file, obj, (err) => {
            console.log("activity deleted successfully!");

        });
    });

}

if(commandType === "add") {


    jsonfile.readFile(file, (err, obj) => {
    //declare a new object for each item to be added
    let newActivity = {};
    let id = obj.activitiesArray.length + 1;

     //set each of the object key value pair
     newActivity.id = id;
     newActivity.activityName = userInput;
     newActivity.doneStatus = "[ ]";
     newActivity.createdAt = "";
     newActivity.updatedAt = "";

     let today = new Date();
     let dd = today.getDate();
     let mm = today.getMonth() + 1;
     let yyyy = today.getFullYear();
     let hrs = today.getHours();
     let mins = today.getMinutes();
     let secs = today.getSeconds();
     if(hrs >= 0 && hrs <= 12) {
        today = `Date: ${dd}-${mm}-${yyyy} | Time: ${hrs}:${mins}:${secs} AM`;
    } else if(hrs > 12 && hrs <= 23) {
        today = `Date: ${dd}-${mm}-${yyyy} | Time: ${hrs}:${mins}:${secs} PM`;
    }

    newActivity.createdAt = today;

     //push in a newItem object which contains all the basic details of the activity
     obj.activitiesArray.push(newActivity);


     obj.activitiesArray.forEach(function(newActivity) {
        console.log(newActivity.id + ". " + newActivity.doneStatus + " - " + newActivity.activityName + " added on " + newActivity.createdAt);
    });


     jsonfile.writeFile(file, obj, (err) => {
        console.log("activity added successfully!");

    });
 });

}

if(commandType === "refresh") {

    const obj = {};


    jsonfile.writeFile(file, obj, (err) => {
        console.log("JSON refreshed!");
    });

}

if(commandType === "init") {

 jsonfile.readFile(file, (err, obj) => {

    obj.activitiesArray = [];
    console.log(obj.activitiesArray);

    jsonfile.writeFile(file, obj, (err) => {
        console.log("JSON initialized!")
    });

});

}