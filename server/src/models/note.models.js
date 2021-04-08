import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

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

noteSchema.plugin(mongoosePaginate);

export default model("Note", noteSchema);
