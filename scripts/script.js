class Stitch{
    /**
     * Constructor for Stitch object
     * @param {string} type the kind of stitch this is ex. knit, slip1
     * @param {integer} stitchSpan the amount of stitches you need to pick up to perform the stitch
     * @param {integer} stitchResult the amount of stitches this stitch results in
     * @param {string} description description of the stitch
     */
    constructor(type, stitchSpan, stitchResult, description){
        this.type = type;
        this.stitchSpan = stitchSpan;
        this.stitchResult = stitchResult;
        this.description = description;
    }

    /**
     * Representation of the stitch using a string
     * @returns the type of the stitch, ex "knit"
     */
    toString(){
        return this.type;
    }

    /**
     * Every attribute of the object 
     * @returns a CSV representation of the stitch
     */
    toStitchUp(){
        return "stitch:" + this.type + "," + this.stitchSpan + "," + this.stitchResult + "," + this.description;
    }

    /**
     * Compares stitch to another stitch
     * @param {Stitch} obj the object to compare
     * @returns true if the two stitches are equal
     */
    equals(obj) {
        if(obj instanceof Stitch) {
            return (obj.stitchSpan == this.stitchSpan && obj.stitchResult == this.stitchResult && obj.type == this.type);
        }
        else return false;
    }
}

class Instruction{
    /**
     * Constructor for instruction object
     * @param {Stitch} stitch The stitch being performed in this instruction
     * @param {integer} stitchCount Number of times the stitch is performed
     * @param {string} color The color of the stitches worked 
     */
    constructor(stitch, stitchCount, color){
        this.stitch = stitch;
        this.stitchCount = stitchCount;
        this.color = color;
    }

    /**
     * Representation of the instruction using a string
     * @returns a string in a format akin to "knit 5 in black" or "purl 7"
     */
    toString() {
        if(this.color == "none"){
            return this.stitch.toString() + " " + this.stitchCount;
        }
        else{
            return this.stitch.toString() + " " + this.stitchCount + " in " + this.color;
        }
    }

    /**
     * Every attribute of the object 
     * @returns a CSV representation of the instruction
     */
    toStitchUp() {
        return this.stitch.type + "," + this.stitchCount + "," + this.color;
    }

    /**
     * Compares instruction to another instruction
     * @param {Instruction} obj the object to compare
     * @returns true if the two instructions are equal
     */
    equals(obj) {
        if(obj instanceof Instruction) {
            return obj.stitch.equals(this.stitch) && obj.stitchCount == this.stitchCount && obj.color == this.color;
        }
        else return false;
    }

    get stitchSpan(){
        return this.stitchCount * this.stitch.stitchSpan;
    }

    get stitchResult(){
        return this.stitchCount * this.stitch.stitchResult;
    }
}

class SpecialInstruction{
    /**
     * Constructor for the special instruction object
     * @param {string} description Description of the instruction, eg. "knit 2 then purl 2 for 28 stitches"
     * @param {integer} stitchSpan How many stitches need to be picked up to perform this instruction
     * @param {integer} stitchResult The amount of stitches this instruction results in
     */
    constructor(description, stitchSpan, stitchResult){
        this.description = description;
        this.stitchSpan = stitchSpan;
        this.stitchResult = stitchResult;
    }

    /**
     * Representation of the special instruction using a string
     * @returns instruction's description
     */
    toString() {
        return this.description;
    }

    /**
     * Compares special instruction to another special instruction
     * @param {SpecialInstruction} obj the object to compare
     * @returns true if the two special instructions are equal
     */
    equals(obj) {
        if(obj instanceof SpecialInstruction) {
            return obj.stitchSpan == this.stitchSpan && obj.stitchResult == this.stitchResult && obj.description == this.description;
        }
        else return false;
    }

    /**
     * Every attribute of the object 
     * @returns a CSV representation of the special instruction
     */
    toStitchUp() {
        return "@sp@" + this.description + "," + this.stitchSpan + "," + this.stitchResult;
    }
}

class Row{
    /**
     * Constuctor for Row object. Initializes the array used to save instructions
     */
    constructor(){
        this.instructions = [];
    }

    /**
     * Every instruction in the row is converted into CSV
     * @returns a CSV representation of the row
     */
    toStitchUp(){
        let str = "";
        for(let i = 0; i < this.instructions.length - 1; i++){
            str += this.instructions[i].toStitchUp() + ",,";
        }
        if(this.instructions.length > 0){
            str += this.instructions[this.instructions.length - 1].toStitchUp();
        }
        return str;
    }

    /**
     * Displays the row in a human readable format
     * @returns a string representing all of the instructions in the row
     */
    toString() {
        let str = "";
        if (this.instructions.length == 0) {
            return "Row is currently empty.";
        }
        for(let i = 0; i < this.instructions.length - 1; i++){
            str += this.instructions[i].toString() + ", ";
        }
        str += this.instructions[this.instructions.length - 1].toString();
        str += " (" + this.stitchResult + " st)";
        return str;
    }

    get stitchSpan(){
        let count = 0;
        for(let i = 0; i < this.instructions.length; i++){
            count += this.instructions[i].stitchSpan;
        }
        return count;
    }

    get stitchResult(){
        let count = 0;
        for(let i = 0; i < this.instructions.length; i++){
            count += this.instructions[i].stitchResult;
        }
        return count;
    }

    /**
     * Adds an instruction to the end of the row
     * @param {Instruction} instruction instruction to be added
     */
    addInstruction(instruction){
        this.instructions.push(instruction);
    }

    /**
     * Add an instruction to a specific place in the row
     * @param {Instruction} instruction instruction to be added
     * @param {integer} index index of the new instruction
     */
    addInstructionAt(instruction, index){
        this.instructions.splice(index, 0, instruction);
    }

    /**
     * 
     * @param {integer} index 
     */
    removeInstruction(index){
        this.instructions.splice(index, 1);
    }
}

class Pattern{
    /**
     * Constructor for pattern object
     * @param {string} patternName 
     */
    constructor(patternName){
        this.patternName = patternName;
        this.rows = [];
        this.stitchList = [];
        //This will keep the display from hiding edit menus that are currently open
        this.rowsEditing = [];
    }

    /**
     * 
     * @param {Row} row 
     */
    addRow(row){
        this.rows.push(row);
        this.rowsEditing.push(false);
    }

    /**
     * 
     * @param {Row} row 
     * @param {integer} index 
     */
    addRowAt(row, index){
        this.rows.splice(index, 0, row);
        this.rowsEditing.splice(index, 0, false);
    }

    toString() {
        let str = "Pattern: " + this.patternName + "\n";
        if(this.rows.length > 0){
            for (let i = 0; i < this.rows.length; i++) {
                str += "\nRow " + (i + 1) + ": " + this.rows[i].toString();
            }
        }
        else str = "Pattern " + this.patternName + " is currently empty!";
        return str;
    }

    toStitchUp(){
        let str = this.patternName + "\n";
        for(let i = 0; i < this.stitchList.length; i++){
            str += this.stitchList[i].toStitchUp() + "\n";
        }
        for(let i = 0; i < this.rows.length; i++){
            str += this.rows[i].toStitchUp() + "\n";
        }
        return str;
    }

    /**
     * 
     * @param {integer} index 
     */
    removeRow(index){
        this.rows.splice(index, 1);
        this.rowsEditing.splice(index, 1);
    }
}



let p = new Pattern("Unnamed Pattern");
p.stitchList = [new Stitch("knit", 1, 1, "none"), new Stitch("purl", 1, 1, "none"), new Stitch("inc", 1, 2, "none"), new Stitch("dec", 2, 1, "none")];

let main = document.getElementById("main");
let mainContainer = document.getElementById("main-container");
let addRowButton = document.getElementById("add-row-btn");
let patternTitle = document.getElementById("pattern-title");

//stitch editing menu vars
let stitchEditor = document.getElementById("stitch-edit");
let stitchEditForm = document.getElementById("stitch-edit-form");
let stitchSelection = document.getElementById("stitch-selection");
let stitchCount = document.getElementById("stitch-count");
let stitchColor = document.getElementById("stitch-color");

let specialInstructionEditor = document.getElementById("special-instruction-edit");
let specialInstructionEditForm = document.getElementById("special-instruction-edit-form");
let specialInstructionDescription = document.getElementById("special-instruction-description");
let specialInstructionStitchSpan = document.getElementById("special-instruction-stitch-span");
let specialInstructionStitchResult = document.getElementById("special-instruction-stitch-result");

let displayButton = document.getElementById("display-btn");
let patternToStringDisplay = document.getElementById("pattern-display");
let stitchUpButton = document.getElementById("stitchup-btn");
let patternStitchUpDisplay = document.getElementById("stitchup-display");

let importPatternForm = document.getElementById("import-pattern");
let importInput = document.getElementById("import-input");

let copyRow = document.getElementById("copy-row");
let copyRowFrom = document.getElementById("copy-row-from");
let copyRowTo = document.getElementById("copy-row-to");



//editing pattern name
let titleEditForm = document.getElementById("title-edit-form");
let newTitle = document.getElementById("new-title");
let titleEditCancelButton = document.getElementById("title-edit-cancel-btn");
titleEditForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if(newTitle.value){
        p.patternName = newTitle.value;   
    }
    titleEditForm.style.display = "none";
    updatePatternDisplay(p);
});

titleEditCancelButton.addEventListener("click", () => {
    newTitle.value = "";
    titleEditForm.style.display = "none";
});

patternTitle.addEventListener("click", () => {
    titleEditForm.style.display = "inherit";
});



addRowButton.addEventListener("click", () =>{
    p.addRow(new Row());

    updatePatternDisplay(p);
});

let sillyDebugCounterHaha = 0;

// Can we actually not update the entire display? can we just have add row and delete row functions? maybe a build pattern func? and thats all?? please? thanks guys real ones fr
// nvm it refuses to work ><'

/**
 * updates the pattern display
 * @param {Pattern} pattern 
 */
const updatePatternDisplay = (pattern) => {
    let rowsHtml = ``;
    for(let i = 0; i < pattern.rows.length; i++){
        let stitchesHtml = ``;
        for(let j = 0; j < pattern.rows[i].instructions.length; j++){
            stitchesHtml +=
            `<div class="stitch" id="row-${i+1}-stitch-${j+1}"><p id="p-row-${i+1}-stitch-${j+1}">${pattern.rows[i].instructions[j].toString()}</p><button class="delete-stitch-btn" id="delete-row-${i+1}-stitch-${j+1}">x</button></div>
            <div id="stitch-edit-container-row-${i+1}-stitch-${j+1}"></div>`;
        }

        rowsHtml +=
        `<div class="row" id="row-${i+1}">
            <div class="row-label">
                <p>Row ${i+1}:</p>
            </div>
            <div class="instructions">
                <p>${pattern.rows[i].toString()}</p>
            </div>
            <button class="edit-row-btn row-btn" id="edit-row-btn-${i+1}">+</button>
            <button class="delete-row-btn row-btn" id="delete-row-btn-${i+1}">x</button>
        </div>
        <div class="row-edit-container" id="row-edit-container-${i+1}">
            ${stitchesHtml}
            <button class="add-instruction-btn" id="add-instruction-btn-${i+1}">Add Instruction</button>
            <button class="add-special-instruction-btn" id="add-special-instruction-btn-${i+1}">Add Special Instruction</button>
        </div>`;
    }
    patternTitle.innerText = pattern.patternName;
    mainContainer.innerHTML = rowsHtml;

    //Post creation for loop - does functions that can only be properly carried out once the items are made
    for(let i = 0; i < pattern.rows.length; i++){
        // Continue to show edit menu for rows being edited
        if(pattern.rowsEditing[i] == true){
            document.getElementById(`row-edit-container-${i+1}`).style.display = "flex";
            document.getElementById(`edit-row-btn-${i+1}`).innerText = "-";
        }

        // Delete row
        document.getElementById(`delete-row-btn-${i+1}`).addEventListener("click", () => {
            let rowToDelete = document.getElementById(`delete-row-btn-${i+1}`).parentElement;
            let delIndex = parseInt(rowToDelete.id.replace("row-", "")) - 1;
            pattern.removeRow(delIndex);
            updatePatternDisplay(pattern);
            main.appendChild(stitchEditor);
        });

        // Edit row
        document.getElementById(`edit-row-btn-${i+1}`).addEventListener("click", () => {
            if(!pattern.rowsEditing[i]){
                document.getElementById(`row-edit-container-${i+1}`).style.display = "flex";
                pattern.rowsEditing[i] = true;
                document.getElementById(`edit-row-btn-${i+1}`).innerText = "-";
            }else{
                document.getElementById(`row-edit-container-${i+1}`).style.display = "none";
                pattern.rowsEditing[i] = false;
                document.getElementById(`edit-row-btn-${i+1}`).innerText = "+";
            }
        });

        //Adding instruction
        document.getElementById(`add-instruction-btn-${i+1}`).addEventListener("click", () => {
            pattern.rows[i].addInstruction(new Instruction(pattern.stitchList[0], 1, "none"));
            updatePatternDisplay(pattern);
        });

        //Adding special instruction
        document.getElementById(`add-special-instruction-btn-${i+1}`).addEventListener("click", () => {
            pattern.rows[i].addInstruction(new SpecialInstruction("[Empty description]", 1, 1));
            updatePatternDisplay(pattern);
        });


        // All stitches get these click events
        for(let j = 0; j < pattern.rows[i].instructions.length; j++){
            document.getElementById(`p-row-${i+1}-stitch-${j+1}`).addEventListener("click", () => {
                if (pattern.rows[i].instructions[j] instanceof Instruction){
                    let parentID = stitchEditor.parentElement.id;
                    let prevRowIndex = stitchEditor.parentElement.parentElement.id.replace("row-edit-container-", "");
                    let prevStitchIndex = parentID.replace(`stitch-edit-container-row-${prevRowIndex}-stitch-`, "");

                    if(document.getElementById(`row-${prevRowIndex}-stitch-${prevStitchIndex}`)){
                        document.getElementById(`row-${prevRowIndex}-stitch-${prevStitchIndex}`).style.backgroundColor = "var(--white)";
                    }

                    document.getElementById(`row-${i+1}-stitch-${j+1}`).style.backgroundColor = "var(--dk-white)";
                    document.getElementById(`stitch-edit-container-row-${i+1}-stitch-${j+1}`).appendChild(stitchEditor);
                    stitchSelection.innerHTML = `<option value="choose">Choose</option>`;
                    for(let x = 0; x < pattern.stitchList.length; x++){
                        stitchSelection.innerHTML += `<option value="${pattern.stitchList[x].toString()}">${pattern.stitchList[x].toString()}</option>`;
                    }
                    stitchEditor.style.display = "block";
                    
                    if(specialInstructionEditor.parentElement != main){
                        let spParentID = specialInstructionEditor.parentElement.id;
                        let spPrevRowIndex = specialInstructionEditor.parentElement.parentElement.id.replace("row-edit-container-", "");
                        let spPrevStitchIndex = spParentID.replace(`stitch-edit-container-row-${spPrevRowIndex}-stitch-`, "");
                        if(document.getElementById(`row-${spPrevRowIndex}-stitch-${spPrevStitchIndex}`)){
                            document.getElementById(`row-${spPrevRowIndex}-stitch-${spPrevStitchIndex}`).style.backgroundColor = "var(--white)";
                        }
                        main.appendChild(specialInstructionEditor);
                        specialInstructionEditor.style.display = "none";
                    }
                }
                else if (pattern.rows[i].instructions[j] instanceof SpecialInstruction){
                    let parentID = specialInstructionEditor.parentElement.id;
                    let prevRowIndex = specialInstructionEditor.parentElement.parentElement.id.replace("row-edit-container-", "");
                    let prevStitchIndex = parentID.replace(`stitch-edit-container-row-${prevRowIndex}-stitch-`, "");
                    if(document.getElementById(`row-${prevRowIndex}-stitch-${prevStitchIndex}`)){
                        document.getElementById(`row-${prevRowIndex}-stitch-${prevStitchIndex}`).style.backgroundColor = "var(--white)";
                    }

                    document.getElementById(`row-${i+1}-stitch-${j+1}`).style.backgroundColor = "var(--dk-white)";
                    document.getElementById(`stitch-edit-container-row-${i+1}-stitch-${j+1}`).appendChild(specialInstructionEditor);
                    specialInstructionEditor.style.display = "block";

                    if(stitchEditor.parentElement != main){
                        let stParentID = stitchEditor.parentElement.id;
                        let stPrevRowIndex = stitchEditor.parentElement.parentElement.id.replace("row-edit-container-", "");
                        let stPrevStitchIndex = stParentID.replace(`stitch-edit-container-row-${stPrevRowIndex}-stitch-`, "");

                        if(document.getElementById(`row-${stPrevRowIndex}-stitch-${stPrevStitchIndex}`)){
                            document.getElementById(`row-${stPrevRowIndex}-stitch-${stPrevStitchIndex}`).style.backgroundColor = "var(--white)";
                        }
                        main.appendChild(stitchEditor);
                        stitchEditor.style.display = "none";
                    }
                }
            });

            // Delete instruction
            document.getElementById(`delete-row-${i+1}-stitch-${j+1}`).addEventListener("click", () => {
                let deleteBtn = document.getElementById(`delete-row-${i+1}-stitch-${j+1}`);
                let rowIndex = deleteBtn.parentElement.parentElement.id.replace("row-edit-container-", "") - 1;
                let stitchIndex = deleteBtn.id.replace(`delete-row-${rowIndex+1}-stitch-`, "") - 1;
                console.log(rowIndex + ", " +  stitchIndex)
                pattern.rows[rowIndex].removeInstruction(stitchIndex);
                updatePatternDisplay(pattern);

                main.appendChild(stitchEditor);
                stitchEditor.style.display = "none";
                main.appendChild(specialInstructionEditor);
                specialInstructionEditor.style.display = "none";
            });
        }
        main.appendChild(stitchEditor);
        stitchEditor.style.display = "none";

        main.appendChild(specialInstructionEditor);
        specialInstructionEditor.style.display = "none";
    }
}


stitchEditForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let parentID = stitchEditor.parentElement.id;
    let rowIndex = stitchEditor.parentElement.parentElement.id.replace("row-edit-container-", "");
    let stitchIndex = parentID.replace(`stitch-edit-container-row-${rowIndex}-stitch-`, "");
    if(p.rows[rowIndex-1].instructions[stitchIndex-1] instanceof Instruction){
        if(stitchSelection.value != "choose"){
            for(let i = 0; i < p.stitchList.length; i++){
                if(p.stitchList[i].type == stitchSelection.value){p.rows[rowIndex-1].instructions[stitchIndex-1].stitch = p.stitchList[i]}
            }
        }
        if(stitchCount.value > 0){p.rows[rowIndex-1].instructions[stitchIndex-1].stitchCount = stitchCount.value;}
        if(stitchColor.value){p.rows[rowIndex-1].instructions[stitchIndex-1].color = stitchColor.value;}
        stitchCount.value = 0;
        stitchColor.value = "";
    }
    updatePatternDisplay(p);
    document.getElementById(`row-${rowIndex}-stitch-${stitchIndex}`).style.backgroundColor = "var(--white)";
    main.appendChild(stitchEditor);
    stitchEditor.style.display = "none";
});

stitchEditForm.addEventListener("reset", () => {
    stitchCount.value = 1;
    stitchColor.value = "";
    let parentID = stitchEditor.parentElement.id;
    let rowIndex = stitchEditor.parentElement.parentElement.id.replace("row-edit-container-", "");
    let stitchIndex = parentID.replace(`stitch-edit-container-row-${rowIndex}-stitch-`, "");
    document.getElementById(`row-${rowIndex}-stitch-${stitchIndex}`).style.backgroundColor = "var(--white)";
    main.appendChild(stitchEditor);
    stitchEditor.style.display = "none";
})

specialInstructionEditForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let parentID = specialInstructionEditor.parentElement.id;
    let rowIndex = specialInstructionEditor.parentElement.parentElement.id.replace("row-edit-container-", "");
    let stitchIndex = parentID.replace(`stitch-edit-container-row-${rowIndex}-stitch-`, "");
    if(p.rows[rowIndex-1].instructions[stitchIndex-1] instanceof SpecialInstruction){
        if(specialInstructionDescription.value){p.rows[rowIndex-1].instructions[stitchIndex-1].description = specialInstructionDescription.value;}
        if(specialInstructionStitchSpan.value){p.rows[rowIndex-1].instructions[stitchIndex-1].stitchSpan = parseInt(specialInstructionStitchSpan.value);}
        if(specialInstructionStitchResult.value){p.rows[rowIndex-1].instructions[stitchIndex-1].stitchResult = parseInt(specialInstructionStitchResult.value);}
        specialInstructionDescription.value = "";
        specialInstructionStitchSpan.value = "";
        specialInstructionStitchResult.value = "";

    }
    updatePatternDisplay(p);
    document.getElementById(`row-${rowIndex}-stitch-${stitchIndex}`).style.backgroundColor = "var(--white)";
    main.appendChild(specialInstructionEditor);
    specialInstructionEditor.style.display = "none";
});

specialInstructionEditForm.addEventListener("reset", () => {
    specialInstructionDescription.value = "";
    specialInstructionStitchSpan.value = "";
    specialInstructionStitchResult.value = "";
    let parentID = specialInstructionEditor.parentElement.id;
    let rowIndex = specialInstructionEditor.parentElement.parentElement.id.replace("row-edit-container-", "");
    let stitchIndex = parentID.replace(`stitch-edit-container-row-${rowIndex}-stitch-`, "");
    document.getElementById(`row-${rowIndex}-stitch-${stitchIndex}`).style.backgroundColor = "var(--white)";
    main.appendChild(specialInstructionEditor);
    specialInstructionEditor.style.display = "none";
})



displayButton.addEventListener("click", () => {
    if (patternToStringDisplay.innerText != p.toString()){
        patternToStringDisplay.innerText = p.toString();
        patternToStringDisplay.style.display = "block";
    }else{
        patternToStringDisplay.innerText = "";
        patternToStringDisplay.style.display = "none";
    }
});

stitchUpButton.addEventListener("click", () => {
    if (patternStitchUpDisplay.innerText != p.toStitchUp()){
        patternStitchUpDisplay.innerText = p.toStitchUp();
        patternStitchUpDisplay.style.display = "block";
    }else{
        patternStitchUpDisplay.innerText = "";
        patternStitchUpDisplay.style.display = "none";
    }
});

importPatternForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let newPattern = new Pattern("");
    let input = importInput.value.split("\n");
    newPattern.patternName = input[0];
    let i = 1;
    while(input[i]){
        if(input[i].startsWith("stitch:")){
            input[i] = input[i].replace("stitch:", "");
            let stitchStrings = input[i].split(",");
            newPattern.stitchList.splice(newPattern.stitchList.length, 0, (new Stitch(stitchStrings[0], parseInt(stitchStrings[1]), parseInt(stitchStrings[2]), stitchStrings[3])));
        }else{
            let row = input[i].split(",,");
            let instructions = [];
            for(let x = 0; x < row.length; x++){
                if(row[x].startsWith("@sp@")){
                    row[x] = row[x].replace("@sp@", "");
                    let instructionStrings = row[x].split(",");
                    instructions.push(new SpecialInstruction(instructionStrings[0], parseInt(instructionStrings[1]), parseInt(instructionStrings[2])));
                }
                else{
                    let instructionStrings = row[x].split(",");
                    for(let z = 0; z < newPattern.stitchList.length; z++){
                        if (newPattern.stitchList[z].type == instructionStrings[0]){
                            instructions.push(new Instruction(newPattern.stitchList[z], parseInt(instructionStrings[1]), instructionStrings[2]));
                        }
                    }
                }

            }
            newPattern.addRow(new Row());
            newPattern.rows[newPattern.rows.length - 1].instructions = instructions;
        }
    i++;}
    console.log(newPattern.toString())
    p = newPattern;
    updatePatternDisplay(p);
});


copyRow.addEventListener("submit", (e) => {
    e.preventDefault();
    if(copyRowFrom.value <= p.rows.length && copyRowFrom.value > 0){
        let rowCopy = new Row();
        for(let i = 0; i < p.rows[copyRowFrom.value - 1].instructions.length; i++){
            let currInstruction = p.rows[copyRowFrom.value - 1].instructions[i];
            if(currInstruction instanceof SpecialInstruction){
                rowCopy.instructions.push(new SpecialInstruction(currInstruction.description, currInstruction.stitchSpan, currInstruction.stitchResult));
            }
            else if(currInstruction instanceof Instruction){
                rowCopy.instructions.push(new Instruction(currInstruction.stitch, currInstruction.stitchCount, currInstruction.color));
            }
        }
        if(copyRowTo.value <= p.rows.length && copyRowTo.value > 0){

            p.addRowAt(rowCopy, copyRowTo.value - 1);
        }
        else{
            p.addRow(rowCopy);
        }
        updatePatternDisplay(p);
    }
    copyRowFrom.value = "";
    copyRowTo.value = "";
});


//---COLOR SCHEME STUFF---//
// Change color scheme
let colorSchemes = document.getElementById("color-schemes");
let root = document.querySelector(":root");

// Color schemes are organised in order of 
// --color-scheme-name, --black, --dk-color, --lt-color, --dk-white, --white
let colorSchemeDefault = ["#022327", "#087E8B", "#acecc6", "#d6f6e3", "#eefbf4", "crimson"];
let colorSchemeBlue = ["#001242", "#183b67", "#62c0dc", "#c4ecf1", "#f1fffa", "crimson"];
let colorSchemeCafe = ["#32292f", "#705d56", "#70abaf", "#99e1d9", "#f0f7f4", "crimson"];
let colorSchemeBrown = ["#2c2321", "#5c5552", "#8f857d", "#decbb7", "#f7f0f5", "crimson"];
let colorSchemeSunset = ["#1c0d59", "#9a348e", "#da627d", "#fca17d", "#f9dbbd", "crimson"];
let colorSchemePurple = ["#2f004f", "#5f0a87", "#aa7bc3", "#d6a8cf", "#ffdde2", "crimson"];
let colorSchemeBeach = ["#12262a", "#0c717e", "#06cdd1", "#f4d1ae", "#f4edea", "crimson"];
let colorSchemeFireball = ["#081b53", "#601700", "#f26430", "#96bbbb", "#b6dddd", "crimson"];
let colorSchemeYellow = ["#41412e", "#918a38", "#e1db4b", "#edff71", "#eefcce", "crimson"];
let colorSchemeGingerKitty = ["#3d0c11", "#7e3b09", "#e67e00", "#ffc784", "#ffead0", "crimson"];
let colorSchemeRuby = ["#16151e", "#71081d", "#e0385a", "#f2aebb", "#fbdce2", "crimson"];
let colorSchemeParrot = ["#211a1e", "#c3423f", "#5bc0eb", "#b4d770", "#fde74c", "#8F141B"];
let colorSchemeRose = ["#5d2a42", "#fb6376", "#b4d770", "#fcb1a6", "#ffdccc", "crimson"];
let colorSchemeRaisin = ["#1a1423", "#372549", "#9c637e", "#c884b7", "#eacdc2", "crimson"];
let colorSchemeBoulder = ["#252422", "#403d39", "#868179", "#ccc5b9", "#fffcf2", "crimson"];
let colorSchemeGemstone = ["#29293d", "#6b5276", "#a96da3", "#cf9893", "#cb9ab3", "crimson"];
let colorSchemeMystic = ["#24062d", "#522472", "#9887c5", "#a2c5ed", "#cefaeb", "crimson"];
let colorSchemeHedgehog = ["#240507", "#d61f28", "#1447e1", "#E7D1B1", "#b8c6f4", "#8F141B"];
let colorSchemeHedgehogDark = ["#eee5aa", "#101010", "#404040", "#880000", "#aa0000", "#404040"];


colorSchemes.addEventListener("change", () => {
    switch(colorSchemes.value){
        case "default":{
            setColorScheme(colorSchemeDefault);
        } break;
        case "blue":{
            setColorScheme(colorSchemeBlue);
        } break;
        case "cafe":{
            setColorScheme(colorSchemeCafe);
        } break;
        case "brown":{
            setColorScheme(colorSchemeBrown);
        } break;
        case "sunset":{
            setColorScheme(colorSchemeSunset);
        } break;
        case "purple":{
            setColorScheme(colorSchemePurple);
        } break;
        case "beach":{
            setColorScheme(colorSchemeBeach);
        } break;
        case "fireball":{
            setColorScheme(colorSchemeFireball);
        } break;
        case "yellow":{
            setColorScheme(colorSchemeYellow);
        } break;
        case "ginger-kitty":{
            setColorScheme(colorSchemeGingerKitty);
        } break;
        case "ruby":{
            setColorScheme(colorSchemeRuby);
        } break;
        case "parrot":{
            setColorScheme(colorSchemeParrot);
        } break;
        case "rose":{
            setColorScheme(colorSchemeRose);
        } break;
        case "raisin":{
            setColorScheme(colorSchemeRaisin);
        } break;
        case "boulder":{
            setColorScheme(colorSchemeBoulder);
        } break;
        case "gemstone":{
            setColorScheme(colorSchemeGemstone);
        } break;
        case "mystic":{
            setColorScheme(colorSchemeMystic);
        } break;
        case "hedgehog":{
            setColorScheme(colorSchemeHedgehog);
        } break;
        case "hedgehog-dk":{
            setColorScheme(colorSchemeHedgehogDark);
        } break;
        default:{
            setColorScheme(colorSchemeDefault);
        }
    }
})

let setColorScheme = (colorScheme) => {
    root.style.setProperty("--black", colorScheme[0]);
    root.style.setProperty("--dk-color", colorScheme[1]);
    root.style.setProperty("--lt-color", colorScheme[2]);
    root.style.setProperty("--dk-white", colorScheme[3]);
    root.style.setProperty("--white", colorScheme[4]);
    root.style.setProperty("--red", colorScheme[5]);
}

