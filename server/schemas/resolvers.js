const { User, Project, Task } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
 
const resolvers = {
  Query: {
    users: async () => {
      const users = await User.find().sort({ createdAt: -1 });
      return users || []; // Return an empty array if users is null or undefined
    },

    user: async (parent, { userid }) => {
      return User.findOne({ _id: userid });
    },
  },
  
  Mutation: {
    addUser: async (parent, { username, email, password }) => {

      const user = await User.create({ username, email, password });
      const token = signToken(user); // Retrieve the token
      user.token = token; // Assign the token to the user object
      return { token, user };
    },

    login: async (parent, { email, password }) => {

      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }
 
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },

    addProject: async (parent, { name, description, createdBy, tasks }) => {
      const project = await Project.create({ name, description, createdBy, tasks });
      return project;
    },

    addTask: async (parent, { title, description, dueDate, priority, project, assignee }) => {
      const task = await Task.create({ title, description, dueDate, priority, project, assignee });
      return task;
    }
  }  
};

module.exports = resolvers;
