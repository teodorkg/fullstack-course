const mongoose = require("mongoose");

const Recipe = require("../model/recipe");
const User = require("../model/user");

exports.recipes_get_all = (req, res, next) => {
  Recipe.find()
    .select(
      "_id creatorId title shortDescription description minutesNeeded pictureSrc tags timeCreated"
    )
    .exec()
    .then((docs) => {
      res.status(200).json({
        count: docs.length,
        recipes: docs.map((doc) => {
          return {
            id: doc._id,
            creatorId: doc.creatorId,
            title: doc.title,
            shortDescription: doc.shortDescription,
            minutesNeeded: doc.minutesNeeded,
            pictureSrc: doc.pictureSrc,
            tags: doc.tags,
            timeCreated: doc.timeCreated,
            description: doc.description,
            request: {
              type: "GET PATCH DELETE",
              url:
                "http://localhost:3001/recipes/" +
                doc.creatorId +
                "/" +
                doc._id,
            },
          };
        }),
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.recipes_get_one = (req, res, next) => {
  const id = req.params.recipeId;
  Recipe.findById(id)
    .select(
      "_id creatorId title shortDescription minutesNeeded pictureSrc tags timeCreated timeLastMod description ingredients"
    )
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json({
          id: doc._id,
          creatorId: doc.creatorId,
          title: doc.title,
          shortDescription: doc.shortDescription,
          minutesNeeded: doc.minutesNeeded,
          pictureSrc: doc.pictureSrc,
          tags: doc.tags,
          timeCreated: doc.timeCreated,
          timeLastMod: doc.timeLastMod,
          description: doc.description,
          ingredients: doc.ingredients,
          requestAll: {
            type: "GET",
            url: "http://localhost:3001/recipes",
          },
        });
      } else {
        res.status(404).json({
          message: "No valid entry for provided ID",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.recipes_post = (req, res, next) => {
  Recipe.find({ title: req.body.title })
    .exec()
    .then((recipes) => {
      if (recipes.length >= 1) {
        return res
          .status(422)
          .json({ message: "recipe title is in use by other recipe" });
      } else {
        const id = mongoose.Types.ObjectId();
        const creatorId = req.params.userId;
        const title = req.body.title;
        const shortDescription = req.body.shortDescription || "";
        const description = req.body.description || "";
        const minutesNeeded = parseInt(req.body.minutesNeeded) || 0;
        const ingredients = req.body.ingredients || [];
        const pictureSrc = req.body.pictureSrc;
        const tags = req.body.tags || "";
        const timeCreated = Date(Date.now()).toString();

        const recipe = new Recipe({
          _id: id,
          creatorId,
          title,
          shortDescription,
          description,
          minutesNeeded,
          ingredients,
          pictureSrc,
          tags,
          timeCreated,
          timeLastMod: timeCreated,
        });
        recipe
          .save()
          .then((result) => {
            User.updateOne(
              { _id: creatorId },
              { $push: { recipes: id } },
              (error) => {
                error
                  ? res.status(500).json({ error })
                  : res
                      .status(201)
                      .json({ message: "Recipe created", timeCreated, id: id });
              }
            );
          })
          .catch((err) => res.status(500).json({ error: err }));
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
};

exports.recipes_patch = (req, res, next) => {
  const id = req.params.recipeId;
  const updateOps = {};
  for (const ops in req.body) {
    if (
      [
        "shortDescription",
        "description",
        "minutesNeeded",
        "ingredients",
        "pictureSrc",
        "tags",
      ].includes(ops)
    ) {
      updateOps[ops] = req.body[ops];
    }
  }
  const timeLastMod = Date(Date.now()).toString();
  updateOps["timeLastMod"] = timeLastMod;
  Recipe.updateOne({ _id: id }, { $set: updateOps }, { runValidators: true })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Recipe updated",
        request: {
          type: "GET PATCH DELETE",
          url: "http://localhost:3001/recipes/" + id,
        },
        timeLastMod,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.recipes_delete = (req, res, next) => {
  const creatorId = req.params.userId;
  const recipeId = req.params.recipeId;
  Recipe.deleteOne({ _id: recipeId })
    .exec()
    .then((response) => {
      User.updateOne(
        { _id: creatorId },
        { $pull: { recipes: recipeId } },
        (error) => {
          error
            ? res.status(500).json({ error })
            : res.status(200).json({ message: "Recipe deleted" });
        }
      );
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
