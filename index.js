
const jsonfile = require('jsonfile');

const file = 'data.json'

run()


// My working 



function run(){

	switch(process.argv[2]){
		case("add"):
			jsonfile.readFile(file, (err, obj) => {
				//readFile is used to "edit" the obj before it is pushed
				//using writeFile

  				obj["todoItems"].push({
  					toDo: process.argv[3],
  					doneYet: "No",
  					dateCreated: new Date(),
  					dateUpdated: null
  				});

  				// At this line obj would include the elements added 
  				// between line 28 to 31
  				console.log(obj);

  				jsonfile.writeFile(file, obj, (err) => {
    				
  				});
			});
			break;

		case("show"):
			jsonfile.readFile(file, (err, obj) => {
				for(let i = 0; i < obj.todoItems.length; i++){
					var currItem = obj.todoItems[i];

					if(currItem.doneYet == "yes"){
						console.log((i + 1)+". [x] -"+currItem.toDo+" Created at: "+currItem.dateCreated+" Updated at: "+currItem.dateUpdated)
					} else {
						console.log((i + 1)+". [ ] -"+currItem.toDo+" Created at: "+currItem.dateCreated)
					}
				}
			})	
			break;

		case("done"):
			jsonfile.readFile(file, (err, obj) => {

				var itemIndex = process.argv[3] - 1

  				obj["todoItems"][itemIndex].doneYet = "yes";
  				obj["todoItems"][itemIndex].dateUpdated = new Date();

  				console.log(obj);

  				jsonfile.writeFile(file, obj, (err) => {
    				console.log("File written")
  				});
			});
			break;

		case("delete"):
			jsonfile.readFile(file, (err, obj) => {

				let itemIndex = process.argv[3] - 1;

				obj["todoItems"].splice(itemIndex,1);
  				
  				console.log(obj);

  				jsonfile.writeFile(file, obj, (err) => {
    				console.log("File written")
  				});
			});
			break;


	}
}
