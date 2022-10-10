import ClimbTypeUtils from "../../util/ClimbTypeParser";
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
            this.populateFilters()
            //update grade list
            //update climb types
            //List of filtered climbs

           // this.populateFilters()
        });
    }

    
    populateFilters() {
        //climbsArray.forEach(climb => addOption(climb))
        
       // const gradesFilter = document.getElementById('grades');

       const gradesFilter = document.getElementById('grades');
       this.routes.forEach(climb => this.addOption(climb, gradesFilter))
        
 
    }

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
    }
    
}
