const express = require("express");
const router = express.Router();
const checkToken = require("../middleware/check-token");
const checkSelfOrAdmin = require("../middleware/check-self-admin");

const UsersController = require("../controllers/users");

router.get("/", UsersController.users_get_all);

router.get("/:userId", UsersController.users_get_one);

router.post("/signup", UsersController.users_signup);

router.post("/login", UsersController.users_login);

router.patch(
  "/change-password/:userId",
  checkToken,
  checkSelfOrAdmin,
  UsersController.users_change_password
);

router.patch(
  "/:userId",
  checkToken,
  checkSelfOrAdmin,
  UsersController.users_patch
);

router.delete(
  "/:userId",
  checkToken,
  checkSelfOrAdmin,
  UsersController.users_delete
);

module.exports = router;
