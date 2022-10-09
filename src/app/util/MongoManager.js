export default class MongoManager
{
    constructor()
    {
        
    }

    /**
     * Adds a route to the database
     * @param {route to add} route 
     */
    addRoute(route)
    {
        let body = route.toJSON();

        fetch( '/addRoute', {
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
    removeRoute(route)
    {
        let body = route.getIdJSON();

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
          .then(json => {
            //TO-DO Store Routes in Table
          })
    }

}