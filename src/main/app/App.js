import ClimbTypeUtils from "../../util/ClimbTypeParser";
import FilteredClimbsManager from "../../util/FilteredClimbsManager";
import MongoManager from "../../util/MongoManager";
import GymMap from "./visuals/GymMap";
import * as d3 from 'd3'
import Climb from './route/Climb'

let instance = null

export default class App                                               
{
    constructor()
    {
        if(instance)
        {
            return instance
        }

        instance = this

        this.mongoManger = new MongoManager()

        this.climbTypeUtils = new ClimbTypeUtils();

        //Load all of the routes in the database
        this.mongoManger.getAllRoutes().then(routes => {
            this.routes = routes
            this.populateGradeFilter()
            this.filteredClimbManager = new FilteredClimbsManager()
            this.gymMap = new GymMap()
            //List of filtered climbs
            
            
        });

        window.addEventListener('load', () => {
            const applyButton = document.getElementById("apply")
            applyButton.onclick = () => {this.applyFilters()}
        })

    }

    applyFilters() {
        let gradesSelect = document.querySelector("#grades"),
            climbTypeSelect = document.querySelector("#climbType")

        let gradeValue = gradesSelect[gradesSelect.selectedIndex].value,
            climbTypeValue = climbTypeSelect[climbTypeSelect.selectedIndex].value

        this.onFilterUpdate(gradeValue, climbTypeValue)
    }

    /**
     * Called when filters are applied
     */
    onFilterUpdate(gradeChoice, typeChoice) {

        //Updates the filtered list of climbs
        this.filteredClimbManager.updateFilters(gradeChoice, typeChoice)

        //Sets the interactive map section highlights
        this.gymMap.updateHighlightedSections(this.filteredClimbManager.getSectionsOfClimbs())

        this.populateClimbsList(this.filteredClimbManager.filteredRoutes)
    }

     /**
      * Adds every available route grade to the filter grade option
      */
    populateGradeFilter() {
        //filers list of routes to list of grades and sorts them
        let routeGrades = [...new Set(this.routes.sort((climb1, climb2) => climb1.gradeVal > climb2.gradeVal).map(climb => climb.grade))]
        
        //Adds every unique grade to the option panel
        const gradesFilter = document.getElementById('grades');
        routeGrades.forEach(grade => {
            gradesFilter.options[gradesFilter.options.length] = new Option(grade, grade)
        })
    }

    populateClimbsList(climbs) {
        const table = document.getElementById("climbsTable");

        const rowCount = table.rows.length;
        for (let i = rowCount - 1; i > 0; i--) {
            table.deleteRow(i);
        }

        climbs.forEach(function(x) {
            // Create an empty <tr> element and add it to the 1st position of the table:
            const row = table.insertRow(-1);

// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
            const newGradeCell = row.insertCell(0);
            const newColorCell = row.insertCell(1);
            const newSectionCell = row.insertCell(2);

// Add some text to the new cells:
            newGradeCell.innerHTML = x.grade;
            newColorCell.innerHTML = x.color;
            newColorCell.style.background = x.color;
            if (x.color === "Black") {
                newColorCell.style.color = "White";
            }
            newSectionCell.innerHTML = x.section;
        })
    }

    _readClimbsCSV() {
        d3.csv('./climbsAtMainGymCRG.csv', function (data) {
            const gradeValue = data.Grade.toUpperCase(),
                colorValue = data.Color,
                sectionValue = data.Section,
                typeValue = this.getType(data.Type)
                
            const newClimb = new Climb(null, gradeValue, colorValue, sectionValue, typeValue, this.isLead(data.Type), this.isTR(data.Type));
            this.mongoManger.addRoute(newClimb)

        }.bind(this))
    }

    isTR(type) {
        if (type === "ltr" || type === "tr") {
            return true;
        }else if (type === "b") {
            return false;
        } else {
            return false;
        }
    }

    isLead(type) {
        if (type === "ltr" || type === "l") {
            return true;
        }else if (type === "b") {
            return false;
        } else {
            return false;
        }
    }

    getType(type) {
        if (type === "ltr" || type === "tr" || type === "l") {
            return "rope";
        } else if (type === "b") {
            return "boulder"
        }
    }
    /*
    //Add the option to the select
    addOption(climb, gradesFilter) {
        if (!this.optionExists(climb.grade, gradesFilter)){
            gradesFilter.options[gradesFilter.options.length] = new Option(climb.grade, climb.grade)
        }
    }
    
    optionExists ( needle, haystack )
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
    */
   /*
    sortSelect(selElem) {
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
    }*/
    
}
