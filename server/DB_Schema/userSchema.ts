import * as mongoose from "mongoose";

export interface IUser {
  github_id: string;
  timeOfLastEdit: Date;
  picture: string;
}

const User = new mongoose.Schema({
  github_id: { type: String, required: true, default: "null" },
  timeOfLastEdit: { type: Date, required: true, default: Date.now() },
  picture: { type: String, default: null },
});

export default mongoose.model<IUser>("Users", User, "users");
