// Get the Users schema from authentication
const { TimeEntries } = require("../dataLayer/config/dbConfig");

/**
 * Function to fetch the time entries details by employeeId
 * @param {*} employeeId
 * @returns
 */
const getTimeEntriesByEmployeeId = async (employeeId) => {
  try {
    return TimeEntries.find({ employeeId: employeeId });
  } catch (error) {
    console.error("Error in getTimeEntriesByEmployeeId:", error);
    throw new Error(error.message);
  }
};

/**
 * Function to create a new time entry record in DB
 * @param {*} data
 * @returns
 */
const createTimeEntry = async (data) => {
  try {
    return TimeEntries.create(data).save();
  } catch (error) {
    console.error("Error in createTimeEntry:", error);
    throw new Error(error.message);
  }
};

/**
 * Function to update the time entry details by id
 * @param {*} id
 * @param {*} data
 * @returns
 */
const updateTimeEntryById = async (id, data) => {
  try {
    return TimeEntries.update({ _id: id }, data).save();
  } catch (error) {
    console.error("Error in updateTimeEntryById:", error);
    throw new Error(error.message);
  }
};

/**
 * Function to remove the time entry record from the DB
 * @param {*} id
 * @returns
 */
const deleteTimeEntry = async (id) => {
  try {
    return TimeEntries.remove({ _id: id });
  } catch (error) {
    console.error("Error in deleteTimeEntry:", error);
    throw new Error(error.message);
  }
};

module.exports = {
  getTimeEntriesByEmployeeId,
  createTimeEntry,
  updateTimeEntryById,
  deleteTimeEntry,
};
