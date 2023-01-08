const express = require("express");
const cors = require("cors");

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const registrationRoute = require("./routes/signup.routes");
const loginRoute = require("./routes/login.routes");
const processRoute = require("./routes/process.routes");
const favProcess = require("./routes/favProcess.routes");
const parameterRoute = require("./routes/parameter.routes");

app.use("/registration", registrationRoute);
app.use("/login", loginRoute);
app.use("/process", processRoute);
app.use("/favprocess", favProcess);
app.use("/parameter", parameterRoute);

const PORT = 3001;

app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});
