module.exports = {
  port: Number(process.env.port) || 3001,
  itemsPerPage: process.env.itemsPerPage || 20,
  apiEndPoint: process.env.apiEndPoint || "http://localhost:3001/",
};
