const { User, Project, Task } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
 
const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    projects: async (parent, {username}) => {
      const params = username ? { username } : {};
      return Project.find(params).sort({ createdAt: -1 });
    },

    project: async (parent, { _id }) => {
      return Project.findOne({ _id }).populate('tasks');
    },

    tasks: async (parent, {username}) => {
      const params = username ? { username } : {};
      return Task.find(params).sort({ createdAt: -1 });
    }
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

      return { token, user};
    },

    addProject: async (parent, { name, description, createdBy, status }) => {
      const project = await Project.create({ name, description, createdBy, status });
      return project;
    },

    addTask: async (parent, { title, description, dueDate, priority, project, assignee }) => {
      const task = await Task.create({ title, description, dueDate, priority, project, assignee });
      return task;
    }
  }  
};

module.exports = resolvers;
