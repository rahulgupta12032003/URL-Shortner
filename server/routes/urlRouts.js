const express = require('express');
const router = express.Router();
const Url = require('../models/Url');
const shortid = require('shortid');

// POST /api/urls/hash
router.post('/hash', async (req, res) => {
  const { originalUrl } = req.body;
  const hashedUrl = shortid.generate();
  
  try {
    const newUrl = await Url.create({ originalUrl, hashedUrl });
    res.status(201).json(newUrl);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET /:hashedUrl
router.get('/:hashedUrl', async (req, res) => {
  const { hashedUrl } = req.params;
  try {
    const url = await Url.findOne({ hashedUrl });
    if (url) {
      return res.redirect(url.originalUrl);
    } else {
      return res.status(404).json({ message: 'URL not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get all url stored in database
router.get("/", async (req, res) => {
  try {
    const url = await Url.find({});
    res.json(url);
  } catch (error) {
    res.status(400).json({ message: `Get Error ${error}` });
  }
})


module.exports = router;
