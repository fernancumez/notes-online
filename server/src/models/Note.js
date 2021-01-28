import { Schema, model } from "mongoose";

const noteSchema = new Schema(
  {
    title: String,
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
    },
    date: Date,
  },
  {
    timestamps: true,
  }
);

export default model("Note", noteSchema);
