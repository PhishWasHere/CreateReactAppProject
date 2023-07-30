const db = require('../config/connection');
const { User, Project } = require('../models');
const userSeeds = require('./userSeeds.json');
const projectSeeds = require('./projectSeeds.json');

db.once('open', async () => {
  try {
    await Project.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < projectSeeds.length; i++) {
      const { user, ...projectData } = projectSeeds[i];
      const userName = await User.findOne({ username: user });

      if (!user) {
        console.error(`User with username "${user}" not found. Skipping project creation.`);
        continue;
      }
      
      const project = new Project({ user: userName._id, ...projectData });
      await project.save();
      console.log(project);

    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
