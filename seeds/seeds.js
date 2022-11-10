const sequelize = require("../config/connection");
const { User, Blog, Comment } = require("../models");

const userData = [
  {
    name: "John Cusack",
    email: "john@cusack.com",
    password: "Iamjohn",
  },
  {
    name: "Lernantino",
    email: "lernantino@gmail.com",
    password: "password12345",
  },
  {
    name: "Amiko",
    email: "amiko2k20@aol.com",
    password: "password12345",
  },
];

const blogData = [
  {
    title: "Thoughts on earth",
    blog_content:
      "I think the earth is flatI think the earth is flatI think the earth is flatI think the earth is flatI think the earth is flatI think the earth is flatI think the earth is flatI think the earth is flat",
      user_id: 3
  },
  {
    title: "Thoughts on birds",
    blog_content:
      "I think that birds are not realI think that birds are not realI think that birds are not realI think that birds are not realI think that birds are not realI think that birds are not realI think that birds are not real",
      user_id: 2
  },
  {
    title: "Thoughts on cars",
    blog_content:
      "I think that cars and submarines are the same thingI think that cars and submarines are the same thingI think that cars and submarines are the same thing",
      user_id: 1
  },
];

const commentData = [
  {
    comment_content: "You are insane, how could you possibly think that?",
    user_id: 1,
    blog_id:3
  },
  {
    comment_content:
      "That is true, my cousin found a bird and realized it was actually a fake!",
      user_id:2,
      blog_id:2
  },
  {
    comment_content:
      "If they are the same, then why dont you see submarines driving around?",
      user_id:3,
      blog_id:1
  },
];

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const blogs = await Blog.bulkCreate(blogData);

  const comments = await Comment.bulkCreate(commentData);
};

seedDatabase();

