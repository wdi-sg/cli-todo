const jsonfile = require('jsonfile');
const file = 'data.json'

todoFunction()
function todoFunction(){
    switch(process.argv[2]){
        case("add"):
            jsonfile.readFile(file, (err, obj) => {
                obj["todoPlaceholder"].push({
                    toDo: process.argv[3],
                });
                console.log(obj);
                jsonfile.writeFile(file, obj, (err) => {
                });
            });
            break;

        case("show"):
            jsonfile.readFile(file, (err, obj) => {
                for(let i = 0; i < obj.todoPlaceholder.length; i++){
                    var currItem = obj.todoPlaceholder[i];
                    if(currItem.doneYet == "yes"){
                        console.log((i + 1)+". [x] -"+currItem.toDo+" Created at: "+currItem.dateCreated+" Updated at: "+currItem.dateUpdated)
                    } else {
                        console.log((i + 1)+". [ ] -"+currItem.toDo)
                    }
                }
            })
            break;
    }
}