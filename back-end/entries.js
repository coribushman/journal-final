const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

// Create a scheme for journal entries
const entrySchema = new mongoose.Schema({
  id: Number,
  title: String,
  text: String,
  date: String,
  image: String,
  tagID: Number,
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
});

// Create a model for journal entries
const Entry = mongoose.model('Entry', entrySchema);

// Create a new journal entry
router.post('/', validUser, async (req, res) => {
  const entry = new Entry({
    id: req.body.id,
    title: req.body.title,
    text: req.body.text,
    date: req.body.date,
    image: req.body.image,
    tagID: req.body.tagID,
    user: req.user
  });
  try {
    await entry.save();
    res.send(entry);
  } catch (error) {
    //console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the journal entries
router.get('/', validUser, async (req, res) => {
  try {
    let entries = await Entry.find({
      user: req.user
    });
    res.send(entries);
  } catch (error) {
    //console.log(error);
    res.sendStatus(500);
  }
});

// Delete an entry.
router.delete('/:id', validUser, async (req, res) => {
  try {
    await Entry.deleteOne({
      id: req.params.id,
      user: req.user
    });
    res.sendStatus(200);
  } catch (error) {
    //console.log(error);
    res.sendStatus(500);
  }
});

// Edit an entry.
router.put('/:id', validUser, async (req, res) => {
  try {
    let entry = await Entry.findOne({
      id: req.params.id,
      user: req.user
    });
    entry.title = req.body.title;
    entry.text = req.body.text;
    entry.date = req.body.date;
    entry.image = req.body.image;
    entry.tagID = req.body.tagID;
    entry.save();
    res.sendStatus(200);
  } catch (error) {
    //console.log(error);
    res.sendStatus(500);
  }
});



module.exports = {
  model: Entry,
  routes: router,
}
