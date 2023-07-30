const mongoose = require('mongoose');
const dateFormat = require ('../../utils/dateFormat');

const projectSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String,
    required: true 
  },
  status: { 
    type: String, 
    enum: ['Active', 'Completed', 'Paused'], 
    default: "Active", 
    required: true 
  },
  tasks: [{ 
    name:{
      type: String,
      required: true
    },
    description:{
      type: String,
      required: true
    },
    dueDate:{
      type: Date,
      get: (timestamp) => dateFormat(timestamp)
    },
    priority:{
      type: String,
      enum: ['High', 'Medium', 'Low'],
      default: "Low",
      required: true
    },
    status:{
      type: String,
      enum: ['Not Started', 'In Progress', 'Completed'],
      default: "Not Started",
      required: true
    },
    
  }],
  createdOn: { 
    type: Date, 
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp)
  },
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
