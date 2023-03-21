const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");

require("./utils/passport.utils");
const app = express();

app.use(cors());
app.use(morgan("combined"));

// Routes
const timeEntriesRouter = require("./routes/timeEntries.route");
const authRouter = require("./routes/auth.route");

app.use(bodyParser.json());

app.use("/api/exp/time-management/v1", timeEntriesRouter);
app.use("/api/exp/auth/v1", authRouter);

module.exports = app;
