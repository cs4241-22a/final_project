
import * as mongoose from "mongoose"


export interface ICell{
    emoji:String,
    timeStamp:Date,
    user: mongoose.Types.ObjectId
}



const Cell = new mongoose.Schema({
    emoji: {type:String, required: true},
    timeStamp: {type:Date, required: true},
    user: {type: mongoose.Types.ObjectId, default: undefined}
})

export default mongoose.model<ICell>('Cells', Cell, 'cells')