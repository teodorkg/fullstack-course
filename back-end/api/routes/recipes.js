const express = require("express");
const router = express.Router();
const checkToken = require("../middleware/check-token");
const checkSelfOrAdmin = require("../middleware/check-self-admin");

const RecipesController = require("../controllers/recipes");

router.get("/", RecipesController.recipes_get_all);

router.get("/:recipeId", RecipesController.recipes_get_one);

router.post(
  "/:userId",
  checkToken,
  checkSelfOrAdmin,
  RecipesController.recipes_post
);

router.patch(
  "/:userId/:recipeId",
  checkToken,
  checkSelfOrAdmin,
  RecipesController.recipes_patch
);

router.delete(
  "/:userId/:recipeId",
  checkToken,
  checkSelfOrAdmin,
  RecipesController.recipes_delete
);

module.exports = router;
