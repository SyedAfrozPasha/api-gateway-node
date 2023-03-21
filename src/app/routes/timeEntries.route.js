const express = require("express");
const router = express.Router();
const passport = require("passport");

// Validation Schema's
const {
  postSchema,
  getSchema,
  putQueryParamsSchema,
  putBodySchema,
  deleteSchema,
} = require("../validationSchema/timeEntriesRoute.schema");

// Service
const {
  getTimeEntriesByEmployeeId,
  createTimeEntry,
  updateTimeEntryById,
  deleteTimeEntry,
} = require("../services/timeEntries.service");

// Route to get all the time entry details for employeeId
router.get(
  "/entries/:employeeId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      // Validate the params with joi schema
      await getSchema.validateAsync(req.params);

      // Get the employee id from the params
      const { employeeId } = req.params;

      // Get all the time entry details for a employeeId
      const timeEntryData = await getTimeEntriesByEmployeeId(employeeId);

      const result = {
        data: timeEntryData,
        totalRecords: timeEntryData.length,
        isError: false,
        message: "Success",
      };

      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        isError: true,
        message: "Failed",
      });
    }
  }
);

// Route to create new time entries
router.post(
  "/entries",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      // Validate the body with joi schema
      await postSchema.validateAsync(req.body);

      // Create the time entry record in DB
      await createTimeEntry(req.body);

      const result = {
        isError: false,
        message: "Success",
      };

      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        isError: true,
        message: "Failed",
      });
    }
  }
);

// Route to update the time entry details
router.put(
  "/entries/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      // Validate the params with joi schema
      await putQueryParamsSchema.validateAsync(req.params);

      // Get the time entry id
      const { id } = req.params;

      // Validate the body with joi schema
      await putBodySchema.validateAsync(req.body);

      // Update the time entry details
      await updateTimeEntryById(id, req.body);

      const result = {
        isError: false,
        message: "Success",
      };

      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        isError: true,
        message: "Failed",
      });
    }
  }
);

// Route to delete the time entry records from the DB
router.delete(
  "/entries/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      // Validate the params with joi schema
      await deleteSchema.validateAsync(req.params);

      // Get the time entry id
      const { id } = req.params;

      // Delete the time entry records from the DB
      await deleteTimeEntry(id);

      const result = {
        isError: false,
        message: "Success",
      };

      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        isError: true,
        message: "Failed",
      });
    }
  }
);

module.exports = router;
