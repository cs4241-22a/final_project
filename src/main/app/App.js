import MongoManager from "../../util/MongoManager";
import Climb from "./route/Climb";

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