const { User, Project, Task } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
 
const resolvers = {
  Query: {

    users: async () => {
      return User.find()
    },

    projects: async (parent, args, context) => {
      if (context.user) {
        const projects = await Project.find({ createdBy: context.user._id });
        return projects;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    project: async (parent, { _id }) => {
      try {
        const project = await Project.findById(_id).populate('tasks');
        if (!project) {
          throw new Error('Project not found!');
        }
        return project;
      } catch (error) {
        throw new Error('Project not found!');
      }
    },

    tasks: async (parent, { projectId }) => {
      const tasks = await Task.find({ project: projectId });
      return tasks;
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

    addProject: async (parent, { name, description, createdBy }) => {
      const project = await Project.create({ name, description, createdBy });
      return project;
    },

    addTask: async (parent, { title, description, dueDate, priority, project, assignee , status}) => {
      const task = await Task.create({ title, description, dueDate, priority, project, assignee, status });
      return task;
    }
  }  
};

module.exports = resolvers;
