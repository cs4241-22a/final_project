import * as mongoose from "mongoose"


export interface IUser{
    username: String,
    timeOfLastEdit: Date
}

const User = new mongoose.Schema({
    username: {type:String, required: true},
    timeOfLastEdit:{type: Date, required: true, default: Date.now()}
})

export default mongoose.model<IUser>('Users', User, 'users')