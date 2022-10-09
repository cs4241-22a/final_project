//TODO: get the list of climbs from the database, and iterate over to populate the filter list
const climbsArray = ["VB", "V0", "V1", "V2", "V3", "V4", "V5", "V6", "V7", "V8", "V9", "V10", "V11", "V12"]

const climb1 = new Climb("1", "VB", "Brown", 1, true);


//Get the grades select
grades = document.getElementById('grades');
//Iterate over each element in grades to add each grade as an option in the select
bouldersArray.forEach(grade => addOption(grade))

//Add the option to the select
function addOption(grade) {
    grades.options[grades.options.length] = new Option(grade, grade);
}


