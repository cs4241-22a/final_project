import * as mongoose from "mongoose";
const User = new mongoose.Schema({
    username: { type: String, required: true },
    timeOfLastEdit: { type: Date, required: true, default: Date.now() }
});
export default mongoose.model('Users', User, 'users');
