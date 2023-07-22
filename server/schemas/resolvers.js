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
        const projects = await Project.find({ user: context.user._id });
        return projects;
      }
      throw new AuthenticationError('You need to be logged in!');
    },


    project: async (parent, { projectId }, context) => {
      if (context.user) {

        try {
          if (!projectId) {
            throw new Error('Project ID is required.');
          }
          const project = await Project.findById(projectId);
          if (!project) {
            throw new Error('Project not found!');
          }
          return project;
        } catch (err) {
          console.log(err);
          throw new Error('Error: Project not found!');
        }
      } throw new AuthenticationError('You need to be logged in!');
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

      return { token, user};
    },

    addProject: async (parent, { name, description, status, userId }, context) => {
      if (context.user) {
          const project = await Project.create({ name, description, status, user: context.user._id });
        return project;
      } 
        // const project = await Project.create({ name, description, status, user: userId });
        // return project;
        throw new Error('Something went wrong!');
    },

    addTask: async (parent, { projectId, name, description, dueDate, priority, status }, context) => {
      if (context.user) {
        const project = await Project.findOneAndUpdate(
          { _id: projectId },
          {
            $addToSet: { tasks: { name, description, dueDate, priority, status } },
          },
          {
            new: true,
            runValidators: true,
          }
          );
        return project;
      }
      throw new Error('Something went wrong!');
    },

    removeProject: async (parent, { projectId }, context) => {
      if (context.user) {
        const project = await Project.findOneAndDelete({
          _id: projectId,
        });
        return project;
      }
      throw new AuthenticationError('You need to be logged in!');
    }, 

    removeTask: async (parent, { projectId, taskId }, context) => {
      if (context.user) {
        const project = await Project.findOneAndUpdate(
          { _id: projectId },
          { $pull: { tasks: { _id: taskId } } },
          { new: true }
        );
        return project;
      }
    },
  },
};

module.exports = resolvers;
