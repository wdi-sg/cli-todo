var jsonfile = require('jsonfile')

var inputs = process.argv
var filename = 'data.json'

var command = inputs[2]

if(command=="add"){
    jsonfile.readFile(filename, (err, obj)=>{
        let newToDoItem = {
            "done": "[ ]",
            "item": inputs[3],
            "createdAt": generateDate(),
            "updatedAt": ""
        }
        obj.todoItems.push(newToDoItem)
        jsonfile.writeFile(filename, obj, (err)=>{console.log(err)})
    })
} else if(command=="show"){
    jsonfile.readFile(filename, (err, obj)=>{
        //find length of longest string
        let longestString = 0
        for(let i=1;i<obj.todoItems.length;i++){
            longestString = Math.max(longestString, obj.todoItems[i].item.length)
        }

        var columnheaders = obj.todoItems[0]
        console.log(" ".repeat(12+longestString), columnheaders.createdAt, " ".repeat(10), columnheaders.updatedAt)

        for(i=1;i<obj.todoItems.length;i++){
            let thingToDo=obj.todoItems[i]
            let columnSpace = " ".repeat(longestString - obj.todoItems[i].item.length)
            console.log(i,".", thingToDo.done, "-", thingToDo.item, columnSpace, thingToDo.createdAt, "   ", thingToDo.updatedAt)
        }
    })
} else if(command=="done"){
    let index = parseInt(inputs[3])

    jsonfile.readFile(filename,(err,obj)=>{
        obj.todoItems[index].done = "[X]"
        obj.todoItems[index].updatedAt = generateDate()
        jsonfile.writeFile(filename, obj, (err)=>console.log(err))
    })
} else if(command=="delete"){
    let index = parseInt(inputs[3])
    jsonfile.readFile(filename,(err,obj)=>{
        obj.todoItems.splice(index, 1)
        jsonfile.writeFile(filename, obj, (err)=>console.log(err))
    })
}

function generateDate(){
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date+' '+time;

}