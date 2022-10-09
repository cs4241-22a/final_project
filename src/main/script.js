const { default: App } = require("./app/App");
const { default: Climb } = require("./app/route/Climb");


let app = new App();
window.app = app

//TODO: get the list of climbs from the database, and iterate over to populate the filter list

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

function parseClimbType(climb) {
    if (climb.type.includes("rope")) {
        if (climb.canLead) {
            if (climb.canTopRope) {
                return "Lead or Top Rope"
            } else if (!climb.canTopRope) {
                return "Lead Only"
            }
        } else if (climb.canTopRope && !climb.canLead) {
            return "Top Rope Only"
        }
    } else if (climb.type.includes("boulder")) {
        return "Boulder"
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
