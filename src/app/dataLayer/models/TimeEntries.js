const TimeEntriesModel = {
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  employeeId: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String },
};

module.exports = { TimeEntriesModel };
