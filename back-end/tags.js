const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

// Create a scheme for journal tags
const tagSchema = new mongoose.Schema({
  id: Number,
  title: String,
  color: String,
  entries: Array,
});

// Create a model for journal tags
const Tag = mongoose.model('Tag', tagSchema);

// Create a new journal tag
// router.post('/api/tags', async (req, res) => {
router.post('/', validUser, async (req, res) => {
  const tag = new Tag({
    id: req.body.id,
    title: req.body.title,
    color: req.body.color,
    entries: req.body.entries,
  });
  try {
    await tag.save();
    res.send(tag);
  } catch (error) {
    //console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the journal tags
// router.get('/api/tags', async (req, res) => {
router.get('/', validUser, async (req, res) => {

  try {
    let tags = await Tag.find();
    res.send(tags);
  } catch (error) {
    //console.log(error);
    res.sendStatus(500);
  }
});

// Delete an tag.
// router.delete('/api/tags/:id', async (req, res) => {
router.delete('/:id', async (req, res) => {
  try {
    await Tag.deleteOne({
      id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    //console.log(error);
    res.sendStatus(500);
  }
});

// Edit a tag.
// router.put('/api/tags/:id', async (req, res) => {
router.put('/:id', async (req, res) => {
  try {
    let tag = await Tag.findOne({
      id: req.params.id
    });
    tag.title = req.body.title;
    tag.color = req.body.color;
    tag.entries = req.body.entries;
    tag.save();
    // res.send(entry);
    res.sendStatus(200);
  } catch (error) {
    //console.log(error);
    res.sendStatus(500);
  }
});

module.exports = {
  model: Tag,
  routes: router,
}
