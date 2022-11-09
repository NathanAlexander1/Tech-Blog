// import important parts of sequelize library
const { Model, DataTypes } = require("sequelize");
// import our database connection from config.js
const sequelize = require("../config/connection");

// Initialize Product model (table) by extending off Sequelize's Model class
class Comment extends Model {}

Comment.init(
  {
    comment_content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
 {sequelize}
);

module.exports = Comment;
