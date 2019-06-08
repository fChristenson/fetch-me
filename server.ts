import { app } from "./src/app";

const port = process.env.PORT || 3000;

app.listen(port, () => {
  // tslint:disable
  console.log("Started on port", port);
  console.log("--------------------------");
});

process.on("uncaughtException", (e) => {
  console.log("uncaughtException", e.message);
  console.log('--------------------------');
  process.exit(1);
});

process.on("unhandledRejection", () => {
  console.log("Process ended unexpectedly");
  console.log('--------------------------');
  process.exit(1);
});
