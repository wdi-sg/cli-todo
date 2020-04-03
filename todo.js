///////-------------------------------------------------------------------//////////
///////-------------------------------------------------------------------//////////
///////-----------------------------Global Variable----------------------//////////
const jsonfile = require('jsonfile');







const file = 'data.json'
///////-------------------------------------------------------------------//////////
///////-------------------------------------------------------------------//////////
///////-------------------------------------------------------------------//////////
///////-------------------------------------------------------------------//////////
///////-------------------------------------------------------------------//////////
///////-------------------------------------------------------------------//////////
///////--------------------To check if the object is null-----------------//////////
function isEmpty(obj) {
    for(let key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

///////-------------------------------------------------------------------//////////
///////-------------------------------------------------------------------//////////
///////-------------------------------------------------------------------//////////
///////-------------------------------------------------------------------//////////
///////-------------------------------------------------------------------//////////
///////-------------------------------------------------------------------//////////
///////--------------------To create from an empty file-----------------//////////
function createNewObject(obj, input){

      return obj["toDoItems"]=[
                                {   "id":1,
                                    "task":input,
                                    "status":"[ ]",
                                    "created at":Date(),
                                    "completed at": "Not Yet"
                                }
                            ]
}

///////-------------------------------------------------------------------//////////
///////-------------------------------------------------------------------//////////
///////-------------------------------------------------------------------//////////
///////-------------------------------------------------------------------//////////
///////-------------------------------------------------------------------//////////
///////-------------------------------------------------------------------//////////
///////--------------------To add if file is not empty--------------------//////////
function addNewObject(obj, input){
    //console.log(obj["toDoItems"][1]);
    obj["toDoItems"].push(
                                    {
                                    "id":obj["toDoItems"].length+1,
                                    "task":input,
                                    "status":"[ ]",
                                    "created at":Date(),
                                    "completed at": "Not Yet"
                                    }
                                )
}

///////-------------------------------------------------------------------//////////
///////-------------------------------------------------------------------//////////
///////-------------------------------------------------------------------//////////
///////-------------------------------------------------------------------//////////
///////-------------------------------------------------------------------//////////
///////-------------------------------------------------------------------//////////
///////--------------------To show data-----------------------------------//////////
function showData(obj){

    console.log(`#   ▄▀▀█▄▄   ▄▀▀█▄   ▄▀▀█▀▄   ▄▀▀▀▀▄  ▄▀▀▄ ▀▀▄      ▄▀▀▀█▀▀▄  ▄▀▀█▄   ▄▀▀▀▀▄  ▄▀▀▄ █
#  █ ▄▀   █ ▐ ▄▀ ▀▄ █   █  █ █    █  █   ▀▄ ▄▀     █    █  ▐ ▐ ▄▀ ▀▄ █ █   ▐ █  █ ▄▀
#  ▐ █    █   █▄▄▄█ ▐   █  ▐ ▐    █  ▐     █       ▐   █       █▄▄▄█    ▀▄   ▐  █▀▄
#    █    █  ▄▀   █     █        █         █          █       ▄▀   █ ▀▄   █    █   █
#   ▄▀▄▄▄▄▀ █   ▄▀   ▄▀▀▀▀▀▄   ▄▀▄▄▄▄▄▄▀ ▄▀         ▄▀       █   ▄▀   █▀▀▀   ▄▀   █
#  █     ▐  ▐   ▐   █       █  █         █         █         ▐   ▐    ▐      █    ▐
#  ▐                ▐       ▐  ▐         ▐         ▐                         ▐       `);

    for (let countObject = 0 ; countObject < obj["toDoItems"].length; countObject++)
    {
        console.log(`${obj["toDoItems"][countObject]["id"]}: ${obj["toDoItems"][countObject]["status"]} - ${obj["toDoItems"][countObject]["task"]}. Created at ${obj["toDoItems"][countObject]["created at"]}. Completed status/date: ${obj["toDoItems"][countObject]["completed at"]}`);
    }
}

///////-------------------------------------------------------------------//////////
///////-------------------------------------------------------------------//////////
///////-------------------------------------------------------------------//////////
///////-------------------------------------------------------------------//////////
///////-------------------------------------------------------------------//////////
///////-------------------------------------------------------------------//////////
///////--------------------To change  status to done----------------------//////////
function changeStatus(obj, idStatus){
    for (let countObject = 0 ; countObject < obj["toDoItems"].length; countObject++)
    {
        if(idStatus===obj["toDoItems"][countObject]["id"])
        {
            obj["toDoItems"][countObject]["status"]="[X]";
            obj["toDoItems"][countObject]["completed at"]=Date();
        }
    }
}

///////-------------------------------------------------------------------//////////
///////-------------------------------------------------------------------//////////
///////-------------------------------------------------------------------//////////
///////-------------------------------------------------------------------//////////
///////-------------------------------------------------------------------//////////
///////-------------------------------------------------------------------//////////
///////--------------------To update ID----------------------//////////
function updateId(obj){
    for (let countId = 0 ; countId < obj["toDoItems"].length; countId++)
    {
       obj["toDoItems"][countId]["id"]=countId+1;
    }
    return obj;
}

///////-------------------------------------------------------------------//////////
///////-------------------------------------------------------------------//////////
///////-------------------------------------------------------------------//////////
///////-------------------------------------------------------------------//////////
///////-------------------------------------------------------------------//////////
///////-------------------------------------------------------------------//////////
///////--------------------To delete object----------------------//////////
function deleteObject(obj, idStatus){
    for (let countObject = 0 ; countObject < obj["toDoItems"].length; countObject++)
    {
        if(idStatus===obj["toDoItems"][countObject]["id"])
        {
            obj["toDoItems"].splice(countObject,1);
            break;
        }
    }
    return updateId(obj);
}

function activateReadWrite(word, input)
{
jsonfile.readFile(file, (err, obj) => {

//console.log("we are in here");
  //console.log( process.argv[3]);

  if(word === "add")
  {

    if(isEmpty( obj ))
        {
            console.log("test");
            createNewObject(obj, input);
            //console.log( "It is null" );
        }
    else
        {
            addNewObject(obj, input);
        }

    }
    else if(word === "show")
    {

        showData(obj);
    }

    else if(word=== "done" && !isNaN(parseInt(input)))
    {
        console.log(" we are here");
        let idCheck=parseInt(input);
        changeStatus(obj,idCheck);

    }
    else if(word=== "delete" && !isNaN(parseInt(input)))
    {
        //console.log(obj);
        console.log(" we are here");
        let idDelete=parseInt(input);
        obj=deleteObject(obj,idDelete);
        //console.log(obj);

    }


  if(err){
    console.log("The error from reading is is "+err);
  }
//  obj["helloworld"] = "monkey";

jsonfile.writeFile(file, obj, (err) => {
    if(err)
    {   console.log(err);
        console.log("The writing error is " + err)
    }
  });
});
}

function show(letter,value){
    console.log(letter+"test"+value);
}

const { program } = require('commander');

    program

        .description("Select an option. '-a value' to add value. -s to show. '-d value' to update what is done. '-de value' to delete task.")
        .option("-a, --value <type>")
        .option("-s,--show")
        .option("-d, --done <type>")
        .option("-de, --del <type>");
    program.parse(process.argv);
    if(program.value) activateReadWrite ("add",program.value);
    if (program.show) activateReadWrite ("show","");
    if (program.done) activateReadWrite ("done",program.done);
    if (program.del) activateReadWrite   ("delete", program.del);