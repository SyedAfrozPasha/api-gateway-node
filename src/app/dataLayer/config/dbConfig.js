const dbLocal = require("db-local");

// Define the folder path to store the data
const { Schema } = new dbLocal({ path: "./database" });

// Models
const { TimeEntriesModel } = require("../models/TimeEntries");
const { AuthModel } = require("../models/Auth");

// Define Schema
const TimeEntries = Schema("TimeEntries", TimeEntriesModel);
const Users = Schema("Users", AuthModel);

module.exports = { TimeEntries, Users };
