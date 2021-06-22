const config = require("../config/config");
const express = require("express");
const router = express.Router();
const { v4: generateId } = require("uuid");
const Todo = require("../models/todo");
const Utilities = require("../utilities/utilities");
const moment = require("moment");

router.get("/", async function (req, res, next) {
  const page = parseInt(req.query.page) || 1;
  const dueDate = req.query.dueDate || "";
  
  let filters = {};
  if (dueDate !== "") {
    filters = {
      dueDate: {
        $gte: new Date(dueDate),
        $lt: new Date(moment(dueDate).add(1, "days").format("yyyy-MM-DD")),
      },
    };
  }
  
  const todos = await Todo.commonSearch({
    filters,
    sort: { position: 1 },
    page: page,
    limit: config.itemsPerPage,
  });

  res.status(200).json({
    items: todos.docs,
    pagination: {
      pageNumber: todos.page,
      totalPages: todos.totalPages,
    },
  }).end();
});

router.post("/", async function (req, res, next) {
  const { text } = req.body;

  if (typeof text !== "string") {
    res.status(400).json({ message: "invalid `text` expected string" });
    return;
  }

  const totalCount = await Todo.totalCount({});
  const todo = {
    id: generateId(),
    text,
    completed: false,
    position: parseFloat((totalCount + 1.1).toFixed(1)),
  };
  await Todo.createOne(todo);
  res.status(201).json(todo).end();
});

router.put("/:id", async function (req, res, next) {
  const { id } = req.params;
  const { completed, positionBetween, dueDate } = req.body;

  let fieldToUpdate;
  if (typeof completed !== "undefined") {
    if (typeof completed !== "boolean") {
      res.status(400);
      res.json({ message: "invalid `completed` expected boolean" });
      return;
    }
    fieldToUpdate = { completed: completed };
  }

  if (typeof positionBetween !== "undefined") {
    if (typeof positionBetween !== "object") {
      res.status(400);
      res.json({ message: "invalid `positionBetween` expected object" });
      return;
    }

    fieldToUpdate = {
      position:
        positionBetween.length === 1
          ? positionBetween[0]
          : Utilities.calculatePosition(...positionBetween),
    };
  }

  if (typeof dueDate !== "undefined") {
    if (typeof dueDate !== "string") {
      res.status(400);
      res.json({ message: "invalid `dueDate` expected string" });
      return;
    }
    fieldToUpdate = { dueDate: new Date(dueDate) };
  }

  await Todo.customUpdate({ conditions: { id }, fields: fieldToUpdate });

  res.status(200).json(fieldToUpdate).end();
});

router.delete("/:id", async function (req, res, next) {
  const { id } = req.params;
  await Todo.deleteOne({ id });
  res.status(204).end();
});

router.all("/*", function (req, res, next) {
  res.status(403).json("Forbidden").end();
});

module.exports = router;
