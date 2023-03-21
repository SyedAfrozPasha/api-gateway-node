const { TimeEntries } = require("../dataLayer/config/dbConfig");

const getTimeEntriesByEmployeeId = async (employeeId) => {
  try {
    return TimeEntries.find({ employeeId: employeeId });
  } catch (error) {
    console.error("Error in getTimeEntriesByEmployeeId:", error);
    throw new Error(error.message);
  }
};

const createTimeEntry = async (data) => {
  try {
    return TimeEntries.create(data).save();
  } catch (error) {
    console.error("Error in createTimeEntry:", error);
    throw new Error(error.message);
  }
};

const updateTimeEntryById = async (id, data) => {
  try {
    return TimeEntries.update({ _id: id }, data).save();
  } catch (error) {
    console.error("Error in updateTimeEntryById:", error);
    throw new Error(error.message);
  }
};

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
