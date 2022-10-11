import * as mongoose from "mongoose";
const Cell = new mongoose.Schema({
    emoji: { type: String, required: true },
    timeStamp: { type: Date, required: true },
    user: { type: mongoose.Types.ObjectId, default: undefined }
});
export default mongoose.model('Cells', Cell, 'cells');
