import MongoManager from "../../util/MongoManager";
import Climb from "./route/Climb";
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
        this.climb = new Climb()
        this.gymMap = new GymMap()
    }
}