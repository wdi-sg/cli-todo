const jsonfile = require('jsonfile');
var commandType = process.argv[2];
var item = process.argv[3];
// console.log(commandType);
const file = 'data.json';
var getInfo = jsonfile.readFile(file,(err, arr)=>{
					if (err){
					console.log("There's an error.");
					}
					return(arr);
				});
var saveInfo = function(getInfo){
					jsonfile.writeFile(file,arr, (err)=>{
						if(err){console.log("Hmm");}
					});
				};

var storeData= function(item){
	//get the data
					getInfo();
		
	//change the data			
					arr.push({todoItems:item,done:false,});//must have comma after "false" or or console log return undefined.

	//write to data.json
					saveInfo(getInfo);
			
				};		

// storeData(item);
var showData = function(){
	//get the data
				jsonfile.readFile(file,(err, arr)=>{
				if (err){
					console.log("There's an error.");
				} else if( arr.length > 0){

						console.log( " TO DO LIST"   );                                                 
			                                                                                                                                     
						console.log("");
						console.log("Created_at".padStart(50),"Updated_at".padStart(15));
						console.log("");
						arr.forEach(function(todoItems,index){
							let date = new Date();
							let created_at = date.getDate() +"/"+date.getMonth()+"/"+date.getFullYear()
							console.log(index+1+"."," ["+(todoItems.done ? "X" : " ")+"] ",todoItems.todoItems.padEnd(30), created_at, todoItems.done ? created_at.padStart(15) : " ");
						});
					}
	
				});
			};

var done =function(){
			var item = process.argv[3];
			//get the data
			getInfo();
				
			arr[item -1].done = !arr[item].done;//toggle the value : true and false

			saveInfo(getInfo);

		};

var deleteItem =function(){
					var item = process.argv[3];
					//get the data
					getInfo();
						
					arr.splice(item,1);
					saveInfo(getInfo);
				};

switch(commandType){
	case "add":
			storeData(item);
			break;
	case "show":
			showData();
			break;
	case "done":
			done();
			break;
	case "delete":
			deleteItem();
			break;
}