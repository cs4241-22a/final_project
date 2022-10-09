import Climb from "../main/app/route/Climb";

export default class MongoManager
{
    constructor()
    {
        
    }

    /**
     * Adds a route to the database
     * @param {route to add} route 
     */
    async addRoute(route)
    {
        route = new Climb("3", "5.4", "Yellow", 1, "rope", true, true);

        //let body = route.toJSON();
       // console.log(body)
       let body = JSON.stringify(route);
        
        return fetch( '/addRoute', {
            method:'POST',
            headers: {
                "Content-Type": "application/json"
            },  
            body: body 
          })
          .then( response => response.json())

          //TO-DO: Update route ID
    }

    /**
     * removes a route from the database
     * @param {route to remove} route 
     */
    async removeRoute(route)
    {
        let body = JSON.stringify({"_id": route._id});

        fetch( '/removeRoute', {
            method:'POST',
            headers: {
                "Content-Type": "application/json"
            },  
            body: body 
          })
          .then( response => response.json())

          //TO-DO: Update route list
    }

    /**
     * Gets all the routes in database
     * @return An array of all the routes
     */
    async getAllRoutes()
    {
        return fetch( `/routes`, {
            method:'GET',
            headers: {
              "Content-Type": "application/json"
          }})
          .then( response => response.json())
    }

}