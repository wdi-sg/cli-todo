const jsonfile = require('jsonfile');

const list = 'data.json'


// functions for generating border
function borderSide(string) {
    const rowSpace = "     ++                                                                                                ++";
    const borderPadding = "     ";
    const border = "++";
    const textInside = string;
    const spaceInsideRow = (rowSpace.length)-(borderPadding.length)-(border.length)-(border.length)-(textInside.length);

    let x = spaceInsideRow/2;

    let emptySpace = " ";
    const spaceBetween = emptySpace.repeat(x)

    const row = borderPadding+border+spaceBetween+textInside+spaceBetween+border;
    return row;
};
function borderTopBottom() {
    const row = "     ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++";
    return row;
};
function borderEmptyRow() {
    const row = "     ++                                                                                                ++";
    return row;
};
function tableBorderLeft(size, string) {
    const border = "|";
    const textInside = string;
    const row = border+textInside;
    return row;
};
function tableBorderRight(size, string) {
    const border = "|";
    const textInside = string;
    const row = textInside+border;
    return row;
};
function tableBorderBoth(size, string) {
    let tableColumnSize = size;
    const border = "|";
    const textPaddingLeft = "  ";
    const textInside = string;
    const remainingSpace = size-(border.length)-(textPaddingLeft.length)-(textInside.length);
    let space = " "
    const textPaddingRight = space.repeat(remainingSpace)
    const row = border+textPaddingLeft+textInside+textPaddingRight+border;
    return row;
};
function tableDivider() {
    const divider ="========================================================================";
    return divider;
};

// functions for generating Menu And Navigation
function mainMenu() {
    const row = borderTopBottom();
    const rowSpace = borderEmptyRow();
    const rowA = borderSide("██╗    ██╗███████╗██╗      ██████╗ ██████╗ ███╗   ███╗███████╗      ████████╗ ██████╗ ");
    const rowB = borderSide("██║    ██║██╔════╝██║     ██╔════╝██╔═══██╗████╗ ████║██╔════╝      ╚══██╔══╝██╔═══██╗");
    const rowC = borderSide("██║ █╗ ██║█████╗  ██║     ██║     ██║   ██║██╔████╔██║█████╗           ██║   ██║   ██║");
    const rowD = borderSide("██║███╗██║██╔══╝  ██║     ██║     ██║   ██║██║╚██╔╝██║██╔══╝           ██║   ██║   ██║");
    const rowE = borderSide("╚███╔███╔╝███████╗███████╗╚██████╗╚██████╔╝██║ ╚═╝ ██║███████╗         ██║   ╚██████╔╝");
    const rowF = borderSide(" ╚══╝╚══╝ ╚══════╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝         ╚═╝    ╚═════╝ ");

    const rowATwo = borderSide(" ▄████▄   ██▓     ██▓    ▄▄▄█████▓▒█████    ▓█████▄ ▒█████      ██▓    ██▓ ██████▄▄▄█████▓");
    const rowBTwo = borderSide("▒██▀ ▀█  ▓██▒    ▓██▒    ▓  ██▒ ▓▒██▒  ██▒  ▒██▀ ██▒██▒  ██▒   ▓██▒   ▓██▒██    ▒▓  ██▒ ▓▒");
    const rowCTwo = borderSide("▒▓█    ▄ ▒██░    ▒██▒    ▒ ▓██░ ▒▒██░  ██▒  ░██   █▒██░  ██▒   ▒██░   ▒██░ ▓██▄  ▒ ▓██░ ▒░");
    const rowDTwo = borderSide("▒▓▓▄ ▄██▒▒██░    ░██░    ░ ▓██▓ ░▒██   ██░  ░▓█▄   ▒██   ██░   ▒██░   ░██░ ▒   ██░ ▓██▓ ░ ");
    const rowETwo = borderSide("▒ ▓███▀ ░░██████▒░██░      ▒██▒ ░░ ████▓▒░  ░▒████▓░ ████▓▒░   ░██████░██▒██████▒▒ ▒██▒ ░ ");
    const rowFTwo = borderSide("░ ░▒ ▒  ░░ ▒░▓  ░░▓        ▒ ░░  ░ ▒░▒░▒░    ▒▒▓  ▒░ ▒░▒░▒░    ░ ▒░▓  ░▓ ▒ ▒▓▒ ▒ ░ ▒ ░░   ");
    const rowGTwo = borderSide("  ░  ▒   ░ ░ ▒  ░ ▒ ░        ░     ░ ▒ ▒░    ░ ▒  ▒  ░ ▒ ▒░    ░ ░ ▒  ░▒ ░ ░▒  ░ ░   ░    ");
    const rowHTwo = borderSide("░          ░ ░    ▒ ░      ░     ░ ░ ░ ▒     ░ ░  ░░ ░ ░ ▒       ░ ░   ▒ ░  ░  ░   ░      ");
    const rowITwo = borderSide("░ ░          ░  ░ ░                  ░ ░       ░       ░ ░         ░  ░░       ░          ");

    const wecomeBanner =row+"\n"+rowSpace+"\n"+rowA+"\n"+rowB+"\n"+rowC+"\n"+rowD+"\n"+rowE+"\n"+rowF+"\n"+rowSpace;
    const title =rowATwo+"\n"+rowBTwo+"\n"+rowCTwo+"\n"+rowDTwo+"\n"+rowETwo+"\n"+rowFTwo+"\n"+rowGTwo+"\n"+rowHTwo+"\n"+rowITwo+"\n"+row;

    console.log(wecomeBanner);
    console.log(title);
};
function navigationMenu() {
    const rowA = borderSide("1. MAIN        :     node index.js                ");
    const rowB = borderSide("2. VIEW list   :     node index.js show           ");
    const rowC = borderSide("3. ADD task    :     node index.js add 'your-task'");
    const rowD = borderSide("4. CHECK task  :     node index.js done 'task-id' ");
    const rowE = borderSide("5. DELETE task :     node index.js delete 'task-id");

    const rowSpace = borderEmptyRow();
    const row = borderTopBottom();
    const nav = row+"\n"+rowSpace+"\n"+rowA+"\n"+rowB+"\n"+rowC+"\n"+rowD+"\n"+rowE+"\n"+rowSpace+"\n"+row;
    console.log(nav)
};

// function for generating response message
function reNoTaskMessage() {
    const rowA = borderSide("╦ ╦╔═╗╦ ╦  ╦ ╦╔═╗╦  ╦╔═╗  ╔╗╔╔═╗  ╔╦╗╔═╗╔═╗╦╔═");
    const rowB = borderSide("╚╦╝║ ║║ ║  ╠═╣╠═╣╚╗╔╝║╣   ║║║║ ║   ║ ╠═╣╚═╗╠╩╗");
    const rowC = borderSide(" ╩ ╚═╝╚═╝  ╩ ╩╩ ╩ ╚╝ ╚═╝  ╝╚╝╚═╝   ╩ ╩ ╩╚═╝╩ ╩");
    const rowD = borderSide(" ╔═╗╔═╗╔╦╗  ╔═╗╦ ╦╦═╗╦═╗╔═╗╔╗╔╔╦╗╦  ╦ ╦  ┬┬┬  ");
    const rowE = borderSide(" ╚═╗║╣  ║   ║  ║ ║╠╦╝╠╦╝║╣ ║║║ ║ ║  ╚╦╝  │││  ");
    const rowF = borderSide(" ╚═╝╚═╝ ╩   ╚═╝╚═╝╩╚═╩╚═╚═╝╝╚╝ ╩ ╩═╝ ╩   ooo  ");

    const rowSpace = borderEmptyRow();
    const row = borderTopBottom();
    const msg = row+"\n"+rowSpace+"\n"+rowA+"\n"+rowB+"\n"+rowC+"\n"+rowD+"\n"+rowE+"\n"+rowF+"\n"+rowSpace+"\n"+row;
    console.log(msg)
};
function reAddedTaskMessage() {
    const rowA = borderSide("          ╔═╗╔═╗╔═╗╔╦╗  ╦  ╦ ╦╔═╗╦╔═  ╔═╗╔╗╔          ");
    const rowB = borderSide("          ║ ╦║ ║║ ║ ║║  ║  ║ ║║  ╠╩╗  ║ ║║║║          ");
    const rowC = borderSide("          ╚═╝╚═╝╚═╝═╩╝  ╩═╝╚═╝╚═╝╩ ╩  ╚═╝╝╚╝          ");
    const rowD = borderSide("╔═╗╦╔╗╔╦╔═╗╦ ╦╦╔╗╔╔═╗  ╔╦╗╦ ╦╔═╗╔╦╗  ╔╦╗╔═╗╔═╗╦╔═  ┬┬┬");
    const rowE = borderSide("╠╣ ║║║║║╚═╗╠═╣║║║║║ ╦   ║ ╠═╣╠═╣ ║    ║ ╠═╣╚═╗╠╩╗  │││");
    const rowF = borderSide("╚  ╩╝╚╝╩╚═╝╩ ╩╩╝╚╝╚═╝   ╩ ╩ ╩╩ ╩ ╩    ╩ ╩ ╩╚═╝╩ ╩  ooo");

    const rowSpace = borderEmptyRow();
    const row = borderTopBottom();
    const msg = row+"\n"+rowSpace+"\n"+rowA+"\n"+rowB+"\n"+rowC+"\n"+rowD+"\n"+rowE+"\n"+rowF+"\n"+rowSpace+"\n"+row;
    console.log(msg)
};
function reUnclearedTasksMessage() {
    const rowA = borderSide("    ╦ ╦╔═╗╦ ╦  ╔═╗╔╦╗╦╦  ╦    ╦ ╦╔═╗╦  ╦╔═╗     ");
    const rowB = borderSide("    ╚╦╝║ ║║ ║  ╚═╗ ║ ║║  ║    ╠═╣╠═╣╚╗╔╝║╣      ");
    const rowC = borderSide("     ╩ ╚═╝╚═╝  ╚═╝ ╩ ╩╩═╝╩═╝  ╩ ╩╩ ╩ ╚╝ ╚═╝     ");
    const rowD = borderSide("╔═╗╦  ╔═╗╔╗╔╔╦╗╦ ╦  ╔╦╗╔═╗  ╔═╗╦  ╔═╗╔═╗╦═╗  ┬┬┬");
    const rowE = borderSide("╠═╝║  ║╣ ║║║ ║ ╚╦╝   ║ ║ ║  ║  ║  ║╣ ╠═╣╠╦╝  │││");
    const rowF = borderSide("╩  ╩═╝╚═╝╝╚╝ ╩  ╩    ╩ ╚═╝  ╚═╝╩═╝╚═╝╩ ╩╩╚═  ooo");

    const rowSpace = borderEmptyRow();
    const row = borderTopBottom();
    const msg = row+"\n"+rowSpace+"\n"+rowA+"\n"+rowB+"\n"+rowC+"\n"+rowD+"\n"+rowE+"\n"+rowF+"\n"+rowSpace+"\n"+row;
    console.log(msg)
};
function reIsDoneMessage() {
    const rowA = borderSide("      ╦ ╦╔═╗╦ ╦  ╦ ╦╔═╗╦  ╦╔═╗  ╔═╗╦  ╦═╗╔═╗╔═╗╔╦╗╦ ╦     ");
    const rowB = borderSide("      ╚╦╝║ ║║ ║  ╠═╣╠═╣╚╗╔╝║╣   ╠═╣║  ╠╦╝║╣ ╠═╣ ║║╚╦╝     ");
    const rowC = borderSide("       ╩ ╚═╝╚═╝  ╩ ╩╩ ╩ ╚╝ ╚═╝  ╩ ╩╩═╝╩╚═╚═╝╩ ╩═╩╝ ╩      ");
    const rowD = borderSide("╔═╗╦  ╔═╗╔═╗╔═╗╦═╗╔═╗╔╦╗  ╔╦╗╦ ╦╔═╗╔╦╗  ╔╦╗╔═╗╔═╗╦╔═   ┬┬┬");
    const rowE = borderSide("║  ║  ║╣ ╠═╣║╣ ╠╦╝║╣  ║║   ║ ╠═╣╠═╣ ║    ║ ╠═╣╚═╗╠╩╗   │││");
    const rowF = borderSide("╚═╝╩═╝╚═╝╩ ╩╚═╝╩╚═╚═╝═╩╝   ╩ ╩ ╩╩ ╩ ╩    ╩ ╩ ╩╚═╝╩ ╩   ooo");

    const rowSpace = borderEmptyRow();
    const row = borderTopBottom();
    const msg = row+"\n"+rowSpace+"\n"+rowA+"\n"+rowB+"\n"+rowC+"\n"+rowD+"\n"+rowE+"\n"+rowF+"\n"+rowSpace+"\n"+row;
    console.log(msg)
};
function reJustDoneMessage() {
    const rowA = borderSide("      ╔═╗╔═╗╔╗╔╔═╗╦═╗╔═╗╔╦╗╦ ╦╦  ╔═╗╔╦╗╦╔═╗╔╗╔╔═╗     ");
    const rowB = borderSide("      ║  ║ ║║║║║ ╦╠╦╝╠═╣ ║ ║ ║║  ╠═╣ ║ ║║ ║║║║╚═╗     ");
    const rowC = borderSide("      ╚═╝╚═╝╝╚╝╚═╝╩╚═╩ ╩ ╩ ╚═╝╩═╝╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝     ");
    const rowD = borderSide("╔═╗╔╗╔  ╔═╗╦  ╔═╗╔═╗╦═╗╦╔╗╔╔═╗  ╔═╗  ╔╦╗╔═╗╔═╗╦╔═  ┬┬┬");
    const rowE = borderSide("║ ║║║║  ║  ║  ║╣ ╠═╣╠╦╝║║║║║ ╦  ╠═╣   ║ ╠═╣╚═╗╠╩╗  │││");
    const rowF = borderSide("╚═╝╝╚╝  ╚═╝╩═╝╚═╝╩ ╩╩╚═╩╝╚╝╚═╝  ╩ ╩   ╩ ╩ ╩╚═╝╩ ╩  ooo");

    const rowSpace = borderEmptyRow();
    const row = borderTopBottom();
    const msg = row+"\n"+rowSpace+"\n"+rowA+"\n"+rowB+"\n"+rowC+"\n"+rowD+"\n"+rowE+"\n"+rowF+"\n"+rowSpace+"\n"+row;
    console.log(msg)
};
function reDeleteTaskMessage() {
    const rowA = borderSide("    ╦ ╦╔═╗╦ ╦  ╦ ╦╔═╗╦  ╦╔═╗   ╦╦ ╦╔═╗╔╦╗     ");
    const rowB = borderSide("    ╚╦╝║ ║║ ║  ╠═╣╠═╣╚╗╔╝║╣    ║║ ║╚═╗ ║      ");
    const rowC = borderSide("     ╩ ╚═╝╚═╝  ╩ ╩╩ ╩ ╚╝ ╚═╝  ╚╝╚═╝╚═╝ ╩      ");
    const rowD = borderSide("╔╦╗╔═╗╦  ╔═╗╔╦╗╔═╗╔╦╗  ╔═╗  ╔╦╗╔═╗╔═╗╦╔═  ┬┬┬ ");
    const rowE = borderSide(" ║║║╣ ║  ║╣  ║ ║╣  ║║  ╠═╣   ║ ╠═╣╚═╗╠╩╗  │││ ");
    const rowF = borderSide("═╩╝╚═╝╩═╝╚═╝ ╩ ╚═╝═╩╝  ╩ ╩   ╩ ╩ ╩╚═╝╩ ╩  ooo ");

    const rowSpace = borderEmptyRow();
    const row = borderTopBottom();
    const msg = row+"\n"+rowSpace+"\n"+rowA+"\n"+rowB+"\n"+rowC+"\n"+rowD+"\n"+rowE+"\n"+rowF+"\n"+rowSpace+"\n"+row;
    console.log(msg)
};
function reErrorMessage() {
    const rowA = borderSide("            ▓█████  ███▄    █ ▄▄▄█████▓▓█████  ██▀███         ▄▄▄                   ");
    const rowB = borderSide("            ▓█   ▀  ██ ▀█   █ ▓  ██▒ ▓▒▓█   ▀ ▓██ ▒ ██▒      ▒████▄                 ");
    const rowC = borderSide("            ▒███   ▓██  ▀█ ██▒▒ ▓██░ ▒░▒███   ▓██ ░▄█ ▒      ▒██  ▀█▄               ");
    const rowD = borderSide("            ▒▓█  ▄ ▓██▒  ▐▌██▒░ ▓██▓ ░ ▒▓█  ▄ ▒██▀▀█▄        ░██▄▄▄▄██              ");
    const rowE = borderSide("            ░▒████▒▒██░   ▓██░  ▒██▒ ░ ░▒████▒░██▓ ▒██▒       ▓█   ▓██▒             ");
    const rowF = borderSide("            ░░ ▒░ ░░ ▒░   ▒ ▒   ▒ ░░   ░░ ▒░ ░░ ▒▓ ░▒▓░       ▒▒   ▓▒█░             ");
    const rowG = borderSide("             ░ ░  ░░ ░░   ░ ▒░    ░     ░ ░  ░  ░▒ ░ ▒░        ▒   ▒▒ ░             ");
    const rowH = borderSide("██▒   █▓ ▄▄▄       ██▓     ██▓▓█████▄     ██▓ ███▄    █  ██▓███   █    ██ ▄▄▄█████▓ ");
    const rowI = borderSide("▓██░   █▒▒████▄    ▓██▒    ▓██▒▒██▀ ██▌   ▓██▒ ██ ▀█   █ ▓██░  ██▒ ██  ▓██▒▓  ██▒ ▓▒");
    const rowJ = borderSide(" ▓██  █▒░▒██  ▀█▄  ▒██░    ▒██▒░██   █▌   ▒██▒▓██  ▀█ ██▒▓██░ ██▓▒▓██  ▒██░▒ ▓██░ ▒░");
    const rowK = borderSide("  ▒██ █░░░██▄▄▄▄██ ▒██░    ░██░░▓█▄   ▌   ░██░▓██▒  ▐▌██▒▒██▄█▓▒ ▒▓▓█  ░██░░ ▓██▓ ░ ");
    const rowL = borderSide("   ▒▀█░   ▓█   ▓██▒░██████▒░██░░▒████▓    ░██░▒██░   ▓██░▒██▒ ░  ░▒▒█████▓   ▒██▒ ░ ");
    const rowM = borderSide("   ░ ▐░   ▒▒   ▓▒█░░ ▒░▓  ░░▓   ▒▒▓  ▒    ░▓  ░ ▒░   ▒ ▒ ▒▓▒░ ░  ░░▒▓▒ ▒ ▒   ▒ ░░   ");
    const rowN = borderSide("   ░ ░░    ▒   ▒▒ ░░ ░ ▒  ░ ▒ ░ ░ ▒  ▒     ▒ ░░ ░░   ░ ▒░░▒ ░     ░░▒░ ░ ░     ░    ");
    const rowO = borderSide("     ░░    ░   ▒     ░ ░    ▒ ░ ░ ░  ░     ▒ ░   ░   ░ ░ ░░        ░░░ ░ ░   ░      ");
    const rowP = borderSide("      ░        ░  ░    ░  ░ ░     ░        ░           ░             ░              ");

    const rowSpace = borderEmptyRow();
    const row = borderTopBottom();
    const msg = row+"\n"+rowSpace+"\n"+rowA+"\n"+rowB+"\n"+rowC+"\n"+rowD+"\n"+rowE+"\n"+rowF+"\n"+rowG+"\n"+rowH+"\n"+rowI+"\n"+rowJ+"\n"+rowK+"\n"+rowL+"\n"+rowM+"\n"+rowN+"\n"+rowO+"\n"+rowP+"\n"+rowSpace+"\n"+row;
    console.log(msg)
};


// program validation
function checkUserInput() {
    let userInput = process.argv.length;

    let inputOne = process.argv[2];
    let inputTwo = process.argv[3];

    if(userInput === 2) {
        mainMenu();
        navigationMenu();
    };
    if(userInput === 3) {
        const cmnd = inputOne.toLowerCase();
        if(cmnd === "show"){
            navigationMenu();
            readList();
            reUnclearedTasksMessage();
        }else{
            reErrorMessage();
        }
    };
    if(userInput > 3){
        const cmnd = inputOne.toLowerCase();
        const taskId = parseInt(inputTwo);
        if (isNaN(taskId)){
            navigationMenu();
            addReadWriteToList();
            reAddedTaskMessage();
        } else{
            switch (cmnd) {
                case "done":
                    navigationMenu();
                    updateReadWriteToList();
                    break;
                case "delete":
                    navigationMenu();
                    deleteReadWriteToList();
                    break;
                default:
            }
        }
    }
};


// updating data
function logDate(){
    var now = new Date();
    var m = now.getMonth();
    m = m + 1;
    var d = now.getDate();
    var y = now.getFullYear();

    var loggedDate = m + "/" + d + "/" + y;
    return loggedDate;
};
function showList(data){
    let hd = data["headers"];

    const hdNum = tableBorderBoth(7, hd[0]);
    const hdCheck = tableBorderBoth(10, hd[1]);
    const hdTask = tableBorderBoth(20, hd[2]);
    const hdCreate = tableBorderBoth(15, hd[3]);
    const hdModified = tableBorderBoth(15, hd[4]);

    const header = hdNum+hdCheck+hdTask+hdCreate+hdModified;

    const totalTask = data["totalTask"];
    // console.log(totalTask)
    const num = data["iD"];
    // console.log(num)
    const check = data["status"];
    // console.log(check)
    const tasks = data["todoItems"];
    // console.log(tasks)
    const created = data["dateCreated"];
    // console.log(date)
    const modified = data["dateModified"];
    console.log(borderEmptyRow());
    console.log(borderSide(tableDivider()));
    console.log(borderSide(header));
    console.log(borderSide(tableDivider()));

    for(let i=0; i<totalTask;i++){
        let row = tableBorderBoth(7, num[i])+tableBorderBoth(10, check[i])
        +tableBorderBoth(20, tasks[i])+tableBorderBoth(15, created[i])+tableBorderBoth(15, modified[i]);
        console.log(borderSide(row));
    }
    console.log(borderSide(tableDivider()));
    console.log(borderEmptyRow());
    console.log(borderTopBottom());
};
function updateId(data) {
    // check how many tasks currently
    let task = data["totalTask"]
    let idNum = 1
    for(let i = 0; i<task;i++){
        data["iD"][i] = idNum+"."
        idNum++
    }
}
function addNewTask(data){
    const newTask = process.argv[3]
        // set New task (not done(O))
    data["todoItems"].push(newTask);
    // Get New task date created
    const newTaskDateCreated = logDate()
    // set New task date created
    data["dateCreated"].push(newTaskDateCreated);
    // set New task date modified
    data["dateModified"].push(newTaskDateCreated);
    // set new status of New task (not done(O))
    data["status"].push("[O]");
    // get current total number of tasks
    const currentTotalTask = data["todoItems"].length;
    // set current total number of tasks
    data["totalTask"] = currentTotalTask;
    // update every ID Num
    updateId(data);
};
function updateStatus(data){
    // update every ID Num
    updateId(data);
    // get Id Num of tasks in an array
    const numArr = data["iD"];
    // get status of tasks (done(X) or not done(O))
    const checkArr = data["status"];

    let userInput = process.argv[3]
    userInput = parseInt(userInput);

    for(let i = 0; i < numArr.length; i++){
        let x = parseInt(numArr[i]);

        if(x === userInput){
            if(checkArr[i] === "[X]"){
                reIsDoneMessage();
            }else{
                checkArr[i] = "[X]"
                // Get New task date created
                const newTaskDateCreated = logDate()
                // set New task date modified
                data["dateModified"].push(newTaskDateCreated);
                reJustDoneMessage();
            }
        }
    };
};
function deleteTask(data) {
    // update every ID Num
    updateId(data);
    // get Id Num of tasks in an array
    const numArr = data["iD"];
    // get current total number of tasks
    const currentTotalTask = data["todoItems"].length;

    let userInput = process.argv[3]
    userInput = parseInt(userInput);
    if(userInput>currentTotalTask){
        reErrorMessage();
    } else {
        for(let i = 0; i < numArr.length; i++){
            let x = parseInt(numArr[i]);
            if(x === userInput){
                data["iD"].splice(i, 1);
                data["status"].splice(i, 1);
                data["todoItems"].splice(i, 1);
                data["dateCreated"].splice(i, 1);
                const currentTotalTask = data["todoItems"].length;
                // set current total number of tasks
                data["totalTask"] = currentTotalTask;
                updateId(data);
            }
        };
    }
};

// jsonfile
function readList() {
    jsonfile.readFile(list, (err, obj) => {
        if (err) console.error(err);
        showList(obj);
    });
};
function addReadWriteToList(){
    jsonfile.readFile(list, (err, obj) => {
        addNewTask(obj);
        jsonfile.writeFile(list, obj, (err) => {
            console.log(err)
        });
    });
};
function updateReadWriteToList(){
    jsonfile.readFile(list, (err, obj) => {
        updateStatus(obj);
        jsonfile.writeFile(list, obj, (err) => {
            console.log(err)
        });
    });
};
function deleteReadWriteToList(){
    jsonfile.readFile(list, (err, obj) => {
        deleteTask(obj);
        jsonfile.writeFile(list, obj, (err) => {
            console.log(err)
        });
    });
};

console.log(borderTopBottom());
var a = "Hello world!";
console.log(borderSide(a));

checkUserInput();