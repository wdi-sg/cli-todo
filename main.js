module.exports.add = function(x,y,z) {

    if (y == "done") {
        y = "[x]"
    } else if (y == "undone") {
        y = "[ ]"
    }

    obj["toDoItems"] = { [x]: {[y]:z} };
}

// function add () {

//     number = process.argv[3];
//     doneOrNot = process.argv[4]

//     if (doneOrNot == "done") {
//         doneOrNot = "[x]"
//     } else if (doneOrNot == "undone") {
//         doneOrNot = "[ ]"
//     }

//         obj["toDoItems"] = { [number]:{[doneOrNot]:process.argv[5]}};
// }