import app from "./app";
import { startConnection } from "./database";

(async () => {
  try {
    await startConnection();

    app.listen(app.get("port"), () => {
      console.log(`Server on port ${app.get("port")}`);
    });
  } catch (err) {
    console.error(err);
  }
})();

export default app;
