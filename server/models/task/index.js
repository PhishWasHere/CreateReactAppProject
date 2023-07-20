const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  project: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Project', 
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
  dueDate: { 
    type: Date
  },
  priority: {
     type: String, 
     enum: ['High', 'Medium', 'Low'], 
     default: "Low", 
     required: true 
    },
  status: { 
    type: String,
    enum: ['Not Started', 'In Progress', 'Completed'], 
    default: "Not Started", 
    required: true 
  },
  createdOn: { 
    type: Date, 
    default: Date.now 
  },
});

const Task = mongoose.model('Task', taskSchema);

// module.exports = Task; 
  //need to sunset
