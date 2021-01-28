import app from "./app";
import { startConnection } from "./database";

const main = async () => {
  try {
    await startConnection();

    app.listen(app.get("port"));
    console.log(`Server on port ${app.get("port")}`);
  } catch (err) {
    console.error(err);
  }
};

main();

export default app;
