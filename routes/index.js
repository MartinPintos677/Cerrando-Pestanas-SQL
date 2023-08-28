const userRoutes = require("./userRoutes");
const articleRoutes = require("./articleRoutes");
const commentRoutes = require("./commentsRoutes");

module.exports = (app) => {
  app.use("/", userRoutes);
  app.use("/", articleRoutes);
  app.use("/", commentRoutes);
};
