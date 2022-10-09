import App from './app/App'
import Climb from "./app/route/Climb";

let app = new App()
window.app = app

//TODO: get the list of climbs from the database, and iterate over to populate the filter list

const climb1 = new Climb("1", "VB", "Brown", 1);
const climb2 = new Climb("2", "5.4", "Yellow", 1, "rope", true, true);
const climb3 = new Climb("3", "V12", "Green", 1);

const climbsArray = [climb1, climb2, climb3];

//Get the grades and types select
const grades = document.getElementById('grades');
const climbType = document.getElementById('climbType');
//Iterate over each element in grades to add each grade as an option in the select
climbsArray.forEach(climb => addOption(climb))
//Add the option to the select
function addOption(climb) {
    for (let i = 0; i < climbType.length; ++i){
        if (climbType.options[i].value !== climb.type){
            climbType.options[climbType.options.length] = new Option(climb.type().type)
        }
    }
    for (let i = 0; i < grades.length; ++i){
        if (grades.options[i].value !== grades.type){
            grades.options[grades.options.length] = new Option(climb.grade)
        }
    }
}

console.log("t")