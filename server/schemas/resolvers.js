const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

 
const resolvers = {
  Query: {
    users: async () => {
      const users = await User.find().sort({ createdAt: -1 });
      return users || []; // Return an empty array if users is null or undefined
    },

    user: async (parent, { username }) => {
      return User.findOne({ username: username });
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      // return { token, user };
    }
  }
};

module.exports = resolvers;
