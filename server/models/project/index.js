const mongoose = require('mongoose');

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
      type: Date //change to string, so i can save date in a readable way
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
    default: Date.now 
  },
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
