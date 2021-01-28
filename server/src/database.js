import { connect } from "mongoose";
import { Config } from "./config";

export const startConnection = async () => {
  try {
    const URI = Config.MONGODB_URI;
    const DBOptions = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    };

    await connect(URI, DBOptions);
    console.log("DB is connected!");
  } catch (err) {
    console.error(err);
  }
};
