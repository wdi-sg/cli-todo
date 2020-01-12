var commandType = process.argv[2];
var entry = "";
if (process.argv[3]) {
	entry=process.argv[3];
};
var jsonfile = require('jsonfile');
var file = 'data.json';
var content = {"todoItems":[]};

var displayList = function(obj) {
	for (i=0; i<obj["todoItems"].length; i++) {
			console.log(parseInt(i+1)+". ["+obj["completion"][i]+"] - "+obj["todoItems"][i] + " created_at @ "+obj["created_at"][i]+obj["updated_at"][i]);	};
};

if (commandType=="add") {
	jsonfile.readFile(file, (err, obj) => {
		if (Object.keys(obj).length == 0) {
			obj.todoItems=[];
			obj.completion=[];
			obj.created_at=[];
			obj.updated_at=[];
		};
		obj["todoItems"].push(entry);
		obj["completion"].push(" ");
		obj["created_at"].push(Date());
		obj["updated_at"].push(" ");
		jsonfile.writeFile(file, obj, (err) => {
		});
		displayList(obj);
	});
};

if (commandType=="show") {
	jsonfile.readFile(file, (err, obj) => {
		displayList(obj);
	});
};

if (commandType=="done") {
	jsonfile.readFile(file, (err, obj) => {
		obj["completion"][parseInt(entry)-1]="x";
		obj["updated_at"][parseInt(entry)-1]=" & completed at "+Date();
		jsonfile.writeFile(file, obj, (err) => {
		});
		displayList(obj);
	});
};

if (commandType=="delete") {
	jsonfile.readFile(file, (err, obj) => {
		obj["todoItems"].splice(parseInt(entry)-1,1);
		obj["completion"].splice(parseInt(entry)-1,1);
		obj["created_at"].splice(parseInt(entry)-1,1);
		jsonfile.writeFile(file, obj, (err) => {
		});
		displayList(obj);
	});
};