const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../model/user");
const Recipe = require("../model/recipe");

exports.users_get_all = (req, res, next) => {
  User.find()
    .select("username nickname sex avatarSrc isAdmin _id")
    //.populate("groups.group", "name")
    .exec()
    .then((docs) => {
      res.status(200).json({
        count: docs.length,
        users: docs.map((doc) => {
          return {
            username: doc.username,
            nickname: doc.nickname,
            sex: doc.sex,
            avatarSrc: doc.avatarSrc,
            id: doc._id,
            isAdmin: doc.isAdmin,
            request: {
              type: "GET DELETE",
              url: "http://localhost:3001/users/" + doc._id,
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

exports.users_get_one = (req, res, next) => {
  const id = req.params.userId;
  User.findById(id)
    .select(
      "username isAdmin nickname timeCreated timeLastMod password status aboutme sex avatarSrc _id"
    )
    //.populate("groups.group", "name")
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json({
          username: doc.username,
          nickname: doc.nickname,
          timeCreated: doc.timeCreated,
          timeLastMod: doc.timeLastMod,
          password: doc.password,
          status: doc.status,
          aboutme: doc.aboutme,
          sex: doc.sex,
          avatarSrc: doc.avatarSrc,
          id: doc._id,
          isAdmin: doc.isAdmin,
          requestAll: {
            type: "GET",
            url: "http://localhost:3001/users",
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

exports.users_signup = (req, res, next) => {
  User.find({ username: req.body.username })
    .exec()
    .then((users) => {
      if (users.length >= 1) {
        return res
          .status(422)
          .json({ message: "username is in use by other user" });
      } else {
        if (
          !req.body.password.match(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
          )
        ) {
          return res.status(500).json({
            error: {
              message:
                "Password should be at least 8 chars and have 1 letter 1 number and 1 special char",
            },
          });
        }
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            res.status(500).json({ error: err });
          } else {
            const status = req.body.status || "active";
            const avatarSrc = req.body.avatarSrc ? req.body.avatarSrc : "";
            const nickname = req.body.nickname ? req.body.nickname : "";
            const sex = req.body.sex ? req.body.sex : "";
            const aboutme = req.body.aboutme ? req.body.aboutme : "";
            const isAdmin = req.body.isAdmin ? true : false;
            const id = mongoose.Types.ObjectId();
            const timeCreated = Date(Date.now()).toString();
            const user = new User({
              _id: id,
              username: req.body.username,
              password: hash,
              nickname,
              sex,
              isAdmin,
              aboutme,
              status,
              avatarSrc,
              timeCreated,
              timeLastMod: timeCreated,
            });
            user
              .save()
              .then((result) =>
                res.status(201).json({
                  message: "User created",
                  id,
                  timeCreated,
                })
              )
              .catch((err) => {
                console.log(err);
                return res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
};

exports.users_login = (req, res, next) => {
  User.findOne({ username: req.body.username })
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      bcrypt.compare(req.body.password, user.password, (err, response) => {
        if (err || !response) {
          return res.status(401).json({
            message: "Auth failed",
          });
        }
        const token = jwt.sign(
          {
            username: user.username,
            isAdmin: user.isAdmin,
            nickname: user.nickname,
            id: user._id,
          },
          process.env.JWT_KEY,
          {
            expiresIn: "1h",
          }
        );
        return res.status(200).json({
          message: "Auth successful",
          token: token,
        });
      });
    })
    .catch((err) => {
      return res.status(401).json({
        message: "Auth failed",
      });
    });
};

exports.users_patch = (req, res, next) => {
  const id = req.params.userId;
  const updateOps = {};
  for (const ops in req.body) {
    if (
      ["nickname", "isAdmin", "sex", "avatarSrc", "aboutme", "status"].includes(
        ops
      )
    ) {
      updateOps[ops] = req.body[ops];
    }
  }
  const timeLastMod = Date(Date.now()).toString();
  updateOps["timeLastMod"] = timeLastMod;
  User.updateOne({ _id: id }, { $set: updateOps }, { runValidators: true })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "User updated",
        request: {
          type: "GET PATCH DELETE",
          url: "http://localhost:3001/users/" + id,
        },
        timeLastMod,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        timeLastMod,
      });
    });
};

exports.users_change_password = (req, res, next) => {
  if (
    !req.body.password.match(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    )
  ) {
    return res.status(500).json({
      error: {
        message:
          "Password should be at least 8 chars and have 1 letter 1 number and 1 special char",
      },
    });
  }
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      const id = req.params.userId;
      User.updateOne(
        { _id: id },
        { $set: { password: hash, timeLastMod: Date(Date.now()).toString() } },
        { runValidators: true }
      )
        .exec()
        .then((result) => {
          res.status(200).json({
            message: "User password updated",
            request: {
              type: "GET PATCH DELETE",
              url: "http://localhost:3001/users/" + id,
            },
          });
        })
        .catch((err) => {
          res.status(500).json({
            error: err,
          });
        });
    }
  });
};

exports.users_delete = (req, res, next) => {
  User.deleteOne({ _id: req.params.userId })
    .exec()
    .then((response) => {
      Recipe.deleteMany({ creatorId: req.params.userId })
        .exec()
        .then((response) => {
          return res
            .status(200)
            .json({ message: "User and his recipes deleted" });
        })
        .catch((err) => {
          return res.status(500).json({ error: err });
        });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
