import App from './app/App'
import './style.css'

let app = new App()
window.app = app


/**
 * //TODO: get the list of climbs from the database, and iterate over to populate the filter list
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



 */
/*
import * as d3 from 'd3'
window.d3 = d3
console.log(d3)
let svgContainer = d3.select(document.getElementById("gymMap"))

svgContainer.selectAll("*").remove()

d3.svg("./gym_map.svg")
    .then(data => {
        d3.select("#gymMap").node().append(data.documentElement)
        d3.select("#gymMap").select("#zone2").style("fill", "red")
    })
    */