import MongoManager from "./util/MongoManager"

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
        
    }
}