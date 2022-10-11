import ClimbTypeUtils from "../../util/ClimbTypeParser";
import FilteredClimbsManager from "../../util/FilteredClimbsManager";
import MongoManager from "../../util/MongoManager";
import GymMap from "./visuals/GymMap";

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

        this.gymMap = new GymMap()
        this.climbTypeUtils = new ClimbTypeUtils();

        //Load all of the routes in the database
        this.mongoManger.getAllRoutes().then(routes => {
            this.routes = routes
            this.populateGradeFilter()
            this.filteredClimbManager = new FilteredClimbsManager()
            //List of filtered climbs
            
            
        });

        window.addEventListener('load', () => {
            console.log("Window loaded")
            const applyButton = document.getElementById("apply")
            applyButton.onclick = () => {this.applyFilters()}
        })

    }

    applyFilters() {
        let gradesSelect = document.querySelector("#grades"),
            climbTypeSelect = document.querySelector("#climbType")

        let gradeValue = gradesSelect[gradesSelect.selectedIndex].value,
            climbTypeValue = climbTypeSelect[climbTypeSelect.selectedIndex].value

        console.log("called apply with: " + gradeValue + ", " + climbTypeValue)

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
    }

     /**
      * Adds every available route grade to the filter grade option
      */
    populateGradeFilter() {
        //filers list of routes to list of grades and sorts them
        let routeGrades = [...new Set(this.routes.map(climb => climb.grade))].sort()
        
        //Adds every unique grade to the option panel
        const gradesFilter = document.getElementById('grades');
        routeGrades.forEach(grade => {
            gradesFilter.options[gradesFilter.options.length] = new Option(grade, grade)
        })
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
