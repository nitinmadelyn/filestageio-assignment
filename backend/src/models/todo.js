const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { Schema } = mongoose;

const todoSchema = new Schema({
  id: String,
  text: String,
  completed: { type: Boolean, default: false },
  position: Number,
  dueDate: Date,
});
todoSchema.plugin(mongoosePaginate);

const Todo = (module.exports = mongoose.model("Todo", todoSchema));

const totalCount = async function (filters) {
  return Todo.countDocuments(filters);
};

const createOne = async function (params) {
  return await Todo.create([params]);
};

const customUpdate = async function (params) {
  return await Todo.updateOne(params.conditions, params.fields);
};

const deleteOne = async function (params) {
  return await Todo.deleteOne(params);
};

const commonSearch = async function (params) {
  let options = {};
  let conditions = {};
  if (params.filters) {
    conditions = params.filters;
  }
  if (params.sort) {
    options.sort = params.sort;
  }
  if (params.page) {
    options.page = params.page;
  }
  if (params.limit) {
    options.limit = params.limit;
  }

  return await Todo.paginate(conditions, options);
};

module.exports = {
  totalCount,
  createOne,
  commonSearch,
  customUpdate,
  deleteOne,
};
