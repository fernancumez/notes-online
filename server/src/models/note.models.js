import { Schema, model } from "mongoose";

const noteSchema = new Schema(
  {
    title: String,
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    date: Date,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Note", noteSchema);
