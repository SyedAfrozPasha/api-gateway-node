const app = require("./src/app/main");
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log("Server connected to port " + port);
});
