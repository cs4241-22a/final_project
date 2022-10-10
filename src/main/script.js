const { default: App } = require("./app/App");
const { default: Climb } = require("./app/route/Climb");


let app = new App();
window.app = app
/*
const climb1 = new Climb("1", "VB", "Brown", 1, "boulder");
const climb2 = new Climb("2", "V1", "Brown", 1, "boulder");
const climb3 = new Climb("3", "5.4", "Yellow", 1, "rope", true, true);
const climb4 = new Climb("4", "V12", "Green", 1, "boulder");

const climbsArray = [climb1, climb2, climb3, climb4];

//Get the grades and types select
const gradesFilter = document.getElementById('grades');
const climbTypeFilter = document.getElementById('climbType');
//Iterate over each element in grades to add each grade as an option in the select
window.addEventListener('load', () => {
    console.log(123)
    populateFilters()
    sortSelect(gradesFilter)
    const applyButton = document.getElementById("apply")
    applyButton.onclick = apply
})
function populateFilters() {
    climbsArray.forEach(climb => addOption(climb))
}

//Add the option to the select
function addOption(climb) {
    if (!optionExists(climb.grade, gradesFilter)){
        gradesFilter.options[gradesFilter.options.length] = new Option(climb.grade, climb.grade)
    }
}

function optionExists ( needle, haystack )
{
    let optionExists = false,
        optionsLength = haystack.length;

    while ( optionsLength-- )
    {
        if ( haystack.options[ optionsLength ].value === needle )
        {
            optionExists = true;
            break;
        }
    }
    return optionExists;
}

function sortSelect(selElem) {
    let tmpAry = [];
    for (let i=0;i<selElem.options.length;i++) {
        tmpAry[i] = [];
        tmpAry[i][0] = selElem.options[i].text;
        tmpAry[i][1] = selElem.options[i].value;
    }
    tmpAry.sort();
    while (selElem.options.length > 0) {
        selElem.options[0] = null;
    }
    for (let i=0;i<tmpAry.length;i++) {
        selElem.options[i] = new Option(tmpAry[i][0], tmpAry[i][1]);
    }
}

function apply() {

}*/