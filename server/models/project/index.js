const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'cancelled'],
    default: 'active',
  },
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
  }],
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
