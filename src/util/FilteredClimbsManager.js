import App from "../main/app/App";

export default class FilteredClimbsManager
{
    constructor()
    {
        this.app = new App()
        this.filteredRoutes = app.routes;
        this.grade = ""
        this.type = ""
    }

    /**
     * 
     * @param {String} grade - the climb grade to filter by (can be null)
     * @param {String} type  - the climb type to filter by (can be null)
     */
    updateFilters(grade, type)
    {
        this.grade = grade
        this.type = type

        this.filteredRoutes = this.app.routes.filter(route => {return this.isCorrectGrade(route) && this.isCorrectType(route)})
    }

    /**
     * Get's the unique sections of the filtered climbs
     * @returns a sorted list of sections
     */
    getSectionsOfClimbs()
    {
        return [...new Set(this.filteredRoutes.map(route => route.section))].sort()
    }

    /**
     * Checks if the route matches the grade filter
     * @param {String} route - the climb route to check
     * @returns 
     */
    isCorrectGrade(route)
    {
        if(!route)
            return true;

        return route.grade == this.grade
    }

    /**
     * Check if the route matches the type filter
     * @param {String} route - the climb route to check 
     * @returns 
     */
    /**
     * lead
     * toprope
     * leadtoprope
     * boulder
     */
    isCorrectType(route)
    {
        if(!route)
            return true;

        switch(this.type)
        {
            case "lead":
                return route.canLead

            case "toprope":
                return route.canTopRope

            case "leadtoprope":
                return route.canLead && route.canTopRope

            case "boulder":
                return route.type == "boulder"
                
        }

        return false
    }
}