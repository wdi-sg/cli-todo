
const jsonfile = require('jsonfile');

const file = 'data.json'

jsonfile.readFile(file, (err, obj) => {
    let itemDetails = {
        item : "",
        created_at : "",
        updated_at : ""
    }

    if (process.argv[2] === "read") {
        console.log(
        `
 ____  _____  ____    __    ____  ___  ____
(  _ \\(  _  )(  _ \\  (  )  (_  _)/ __)(_  _)
 ) _ < )(_)(  ) _ <   )(__  _)(_ \\__ \\  )(
(____/(_____)(____/  (____)(____)(___/ (__)

        `
        );
        let i =0;
        obj["toDoItems"].forEach(el => {
            console.log(`
${i}. ${el.item}
created_at: ${el.created_at}
updated_at: ${el.updated_at}
            `);
            i++
        })
        console.log(err);
    }

    else if (process.argv[2] === "add") {
        itemDetails.item = '[ ] - ' + process.argv[3];
        itemDetails.created_at = Date();

        obj["toDoItems"].push(itemDetails);
    }

    else if (process.argv[2] === "done") {
        // Mark X in the bracket of item that is done
        let targetItem = obj["toDoItems"][process.argv[3]];
        let itemSplit = targetItem.item.split(' ')
        itemSplit.splice(1, 0, 'X');

        // Join back array into full string
        targetItem.item = itemSplit.join(' ');

        // Add date into update_at property
        targetItem.updated_at = Date();

        // Change obj to reflect new object
        obj["toDoItems"][process.argv[3]] = targetItem;
    }

    else if (process.argv[2] === 'del') {
        obj['toDoItems'].splice(process.argv[3], 1);
    }

    jsonfile.writeFile(file, obj, (error) => {
        console.log(error);
    })
})