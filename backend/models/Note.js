const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  rdate:{
    type: String,
    required: true
  },
  subject:{
    type: String,
    required: true
  },
  desc:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  contact:{
    type: String
  },
  sms:{
    type: String
  },
  d7:{
    type: Boolean
  },
  d5:{
    type: Boolean
  },
  d3:{
    type: Boolean
  },
  d2:{
    type: Boolean
  },
  status:{
    type: Boolean,
    default: true
  },
  date:{
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('remainder', NotesSchema);