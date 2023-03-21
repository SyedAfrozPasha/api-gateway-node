const dbLocal = require("db-local");
const { Schema } = new dbLocal({ path: "./database" });

const { TimeEntriesModel } = require("../models/TimeEntries");
const { UsersModel } = require("../models/Users");

const TimeEntries = Schema("TimeEntries", TimeEntriesModel);
const Users = Schema("Users", UsersModel);

module.exports = { TimeEntries, Users };
