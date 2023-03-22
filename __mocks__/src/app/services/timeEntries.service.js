const getTimeEntriesByEmployeeId = async (employeeId) => {
  try {
    if (employeeId == 10) {
      return [
        {
          startTime: "03/20/2023",
          endTime: "03/25/2023",
          employeeId: "10",
          type: "Sick-Leave",
          description: "SL",
          _id: "641924d91c413d35903f3374",
        },
      ];
    } else {
      throw new Error("Error");
    }
  } catch (error) {
    console.error("Error in getTimeEntriesByEmployeeId:", error);
    throw new Error(error.message);
  }
};

const createTimeEntry = async (data) => {
  try {
    return true;
  } catch (error) {
    console.error("Error in createTimeEntry:", error);
    throw new Error(error.message);
  }
};

const updateTimeEntryById = async (id, data) => {
  try {
    if (id == "641924d91c413d35903f3374") {
      return true;
    } else if (id == "abc") {
      throw new Error("Error");
    }
  } catch (error) {
    console.error("Error in updateTimeEntryById:", error);
    throw new Error(error.message);
  }
};

const deleteTimeEntry = async (id) => {
  try {
    if (id == "641924d91c413d35903f3374") {
      return true;
    } else if (id == "abc") {
      throw new Error("Error");
    }
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
