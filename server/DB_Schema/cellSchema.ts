import * as mongoose from "mongoose";

export interface ICell {
  index?: number;
  emoji: String;
  timeStamp: Date;
  user: String;
}

const Cell = new mongoose.Schema({
  index: { type: Number, required: true },
  emoji: { type: String, required: true, default: " " },
  timeStamp: { type: Date, required: true, default: Date.now() },
  user: { type: String, default: null },
});

export default mongoose.model<ICell>("Cells", Cell, "cells");
