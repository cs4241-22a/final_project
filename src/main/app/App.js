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

        //Load all of the routes in the database
        this.mongoManger.getAllRoutes().then(routes => {
            this.routes = routes
            //update grade list
            //update climb types
            //List of filtered climbs

           // this.populateFilters()
        });
    }

    
    populateFilters() {
        climbsArray.forEach(climb => addOption(climb))
        
        const gradesFilter = document.getElementById('grades');
        
        const climbTypeFilter = document.getElementById('climbType');
        let climbs = [...new Set(route.map(climb => climb.type))]
        climbs.forEach(climb => {
            climbTypeFilter.options[climbTypeFilter.options.length] = new Option(climb.type, climb.type)

        })

    }
    
    populateGradeFilters()
    {

    }

    //Add the option to the select
    addOption(climb) {
        if (!optionExists(climb.grade, gradesFilter)){
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
