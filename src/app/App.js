import Climb from "./route/Climb"
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
        this.climb = new Climb();
    }
}