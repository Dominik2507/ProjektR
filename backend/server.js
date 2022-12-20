const express = require("express");
const cors = require("cors");

let app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());

const registrationRoute = require("./routes/signup.routes");
const loginRoute = require("./routes/login.routes");
const processRoute = require("./routes/process.routes")

app.use("/registration", registrationRoute);
app.use("/login", loginRoute);
app.use("/process", processRoute)

const PORT = 3001;

app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});
