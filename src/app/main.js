const express = require("express");
require("./utils/passport");
const app = express();

const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");

app.use(cors());
app.use(morgan("combined"));

const timeEntriesRouter = require("./routes/timeEntries.route");
const usersRouter = require("./routes/users.route");

app.use(bodyParser.json());

app.use("/api/exp/time-management/v1", timeEntriesRouter);
app.use("/api/exp/time-management/v1", usersRouter);

module.exports = app;
