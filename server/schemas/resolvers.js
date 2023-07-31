const { User, Project,  } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { encrypt, decrypt }= require ('../utils/cryptoEmail');

 
const resolvers = {
  Query: {
    users: async () => {
      return User.find()
    },

    user: async (parent, args, context) => {
      try {
        if (context.user) {
          return User.findById(context.user._id);
        } console.log(context.user._id);
        throw new AuthenticationError('You need to be logged in!');
      } catch (err) {
         throw new Error('Something went wrong!');
      }
    },

    projects: async (parent, args, context) => {
      try {
        if (context.user) {
          const projects = await Project.find({ user: context.user._id });
          return projects;
        }
        throw new AuthenticationError('You need to be logged in!');
      } catch (err) {
        throw new Error('Something went wrong!');
      }
    },

    project: async (parent, { projectId }, context) => {
      try {
        if (context.user) {
          if (!projectId) {
            throw new Error('Project ID is required.');
          }
          const project = await Project.findById(projectId);
          if (!project) {
            throw new Error('Project not found!');
          }
          return project;
        } 
        throw new AuthenticationError('You need to be logged in!');
      } catch (err) {
        throw new Error('Error: Project not found!');
      }
    },
  },
  
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      try {
        const user = await User.create({ username, email, password });
        const token = signToken(user); // Retrieve the token
        user.token = token; // Assign the token to the user object
        return { token, user };
      } catch (err) {
        throw new AuthenticationError('Something went wrong!');
      }
    },

    login: async (parent, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new AuthenticationError('Incorrect email or password');
        }
        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
          throw new AuthenticationError('Incorrect email or password');
        }
        const token = signToken(user);
        return { token, user };
      } catch (err) {
        throw new AuthenticationError('Something went wrong!');
      }
    },

    addProject: async (parent, { name, description, status, userId }, context) => {
      try {
        if (context.user) {
          if (!name || !description || !status) {
            throw new Error('All fields are required!');
          }
            const project = await Project.create({ name, description, status, user: context.user._id });
          return project;
        } 
        throw new Error('You need to be logged in!');
      } catch (err) {
        throw new Error('Something went wrong!');
      }
    },

    addTask: async (parent, { projectId, name, description, dueDate, priority, status }, context) => {
      try{
        if (context.user) {
          if (!projectId || !name || !description || !dueDate || !priority || !status) {
            throw new Error('All fields are required!');
          }
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
        throw new Error('You need to be logged in!');
      } catch (err){
        throw new Error('Something went wrong!');
      }
    },

    removeProject: async (parent, { projectId }, context) => {
      try {
        if (context.user) {
          const project = await Project.findOneAndDelete({
            _id: projectId,
          });
          return project;
        }
        throw new AuthenticationError('You need to be logged in!');
      } catch (err) {
        throw new Error('Something went wrong!');
      }
    }, 

    removeTask: async (parent, { projectId, taskId }, context) => {
      try {
        if (context.user) {
          const project = await Project.findOneAndUpdate(
            { _id: projectId },
            { $pull: { tasks: { _id: taskId } } },
            { new: true }
          );
          return project;
        }
        throw new AuthenticationError('You need to be logged in!');
      } catch (err) {
        throw new Error('Something went wrong!');
      }
    },

    updateProject: async (parent, { projectId, name, description, status }, context) => {
      try {
        if (context.user) {
          if (!projectId || !name || !description || !status) {
            throw new Error('All fields are required!');
          }
          const project = await Project.findOneAndUpdate(
            { _id: projectId },
            { name, description, status },
            { new: true }
          );
          return project;
        }
        throw new AuthenticationError('You need to be logged in!');
      } catch (err) {
        throw new Error('Something went wrong!');
      }
    },
  
    updateTask: async(parent, { projectId, taskId, name, description, dueDate, priority, status }, context) => {
      try{ 
        if (context.user) {
          if (!projectId || !taskId || !name || !description || !dueDate || !priority || !status) {
            throw new Error('All fields are required!');
          }
          const project = await Project.findOneAndUpdate(
            { _id: projectId, 'tasks._id': taskId },
            {
              $set: {
                'tasks.$.name': name, 
                'tasks.$.description': description,
                'tasks.$.dueDate': dueDate,
                'tasks.$.priority': priority,
                'tasks.$.status': status
              }
            },
            { new: true }
          );
          return project;
        }
        throw new AuthenticationError('You need to be logged in!');
      } catch (err) {
        throw new Error('Something went wrong!');
      }
    },

  }
};

module.exports = resolvers;
