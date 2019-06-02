import { app } from "./src/app";

const port = process.env.PORT || 3000;

app.listen(port, () => {
  // tslint:disable
  console.log("Started on port", port);
  console.log("--------------------------");
});
