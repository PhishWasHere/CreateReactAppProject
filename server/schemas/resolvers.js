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


    project: async (parent, { projectId }) => {
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

    addProject: async (parent, { name, description, status, userId }) => {
      try {
        const project = await Project.create({ name, description, status, user: userId });
        return project;
      } catch (err) {
        throw new Error('Something went wrong!');
      }
    },

    addTask: async (parent, { projectId, name, description, dueDate, priority, status }) => {
      try{

        return Project.findOneAndUpdate(
          { _id: projectId },
          {
            $addToSet: { tasks: { name, description, dueDate, priority, status } },
          },
          {
            new: true,
            runValidators: true,
          }
          );
        }catch (err) {
          console.log(err);
          throw new Error('Something went wrong!');
        }
    },
  }
};

module.exports = resolvers;
