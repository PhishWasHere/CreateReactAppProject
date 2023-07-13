const { User } = require('../models');

const resolvers = {
  Query: {
    users: async () => {
      const users = await User.find().sort({ createdAt: -1 });
      return users || []; // Return an empty array if users is null or undefined
    },

    user: async (parent, { userid }) => {
      return User.findOne({ _id: userid });
    },
  }
};

module.exports = resolvers;
