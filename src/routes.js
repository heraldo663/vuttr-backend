const express = require("express");
const validate = require("express-validation");
const handle = require("express-async-handler");

const authMiddelware = require("./app/middlewares/auth");

const UserController = require("./app/controller/UserController");
const SessionController = require("./app/controller/SessionController");
const ToolController = require("./app/controller/ToolController");

const UserValidator = require("./app/validators/User");
const SessionValidator = require("./app/validators/Session");
const ToolValidator = require("./app/validators/Tool");

const routes = express.Router();

/**
 * Root route
 */
routes.get("/", (req, res) => {
  res.send("Server online");
});
/**
 * Register, Login Routes
 */
routes.post("/users", validate(UserValidator), handle(UserController.store));
routes.post(
  "/sessions",
  validate(SessionValidator),
  handle(SessionController.store)
);

/**
 *  Tools CRD
 */
routes.post("/tools", validate(ToolValidator), handle(ToolController.store));
routes.get("/tools", handle(ToolController.index));
routes.delete("/tools/:id", handle(ToolController.destroy));

/**
 * Authenticated Routes
 */

module.exports = routes;
