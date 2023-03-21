const express = require("express");
const router = express.Router();
const passport = require("passport");

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

router.get(
  "/entries/:employeeId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      // Validate the params with joi schema
      await getSchema.validateAsync(req.params);

      const { employeeId } = req.params;
      console.log("employeeId:", employeeId);

      const timeEntryData = await getTimeEntriesByEmployeeId(employeeId);

      const result = {
        data: timeEntryData,
        totalRecords: timeEntryData.length,
        isError: false,
        message: "Success",
      };

      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(400).json({
        isError: true,
        message: "Failed",
      });
    }
  }
);

router.post(
  "/entries",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      // Validate the body with joi schema
      await postSchema.validateAsync(req.body);

      await createTimeEntry(req.body);

      const result = {
        isError: false,
        message: "Success",
      };

      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(400).json({
        isError: true,
        message: "Failed",
      });
    }
  }
);

router.put(
  "/entries/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      // Validate the params with joi schema
      await putQueryParamsSchema.validateAsync(req.params);
      const { id } = req.params;

      // Validate the body with joi schema
      await putBodySchema.validateAsync(req.body);
      await updateTimeEntryById(id, req.body);

      const result = {
        isError: false,
        message: "Success",
      };

      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(400).json({
        isError: true,
        message: "Failed",
      });
    }
  }
);

router.delete(
  "/entries/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      // Validate the params with joi schema
      await deleteSchema.validateAsync(req.params);
      const { id } = req.params;
      await deleteTimeEntry(id);

      const result = {
        isError: false,
        message: "Success",
      };

      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(400).json({
        isError: true,
        message: "Failed",
      });
    }
  }
);

module.exports = router;
