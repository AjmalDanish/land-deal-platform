// routes/land.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const Land = require('../models/Land');

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

// Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'landdeal',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const upload = multer({ storage });

// Serve index page
router.get('/', (req, res) => {
  res.render('index');
});

// Serve the Add Land form
router.get('/add-land', (req, res) => {
  res.render('add-land');
});

// Add land route
router.post('/add-land', upload.single('image'), async (req, res) => {
  try {
    const { address, price, latitude, longitude, contact } = req.body;
    const newLand = new Land({
      address,
      price,
      latitude,
      longitude,
      contact,
      image: req.file.path, // Cloudinary URL
    });
    await newLand.save();
    res.redirect('/listings');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while adding land' });
  }
});

// Get all land listings (HTML View)
router.get('/listings', async (req, res) => {
  try {
    const lands = await Land.find().sort({ createdAt: -1 });
    res.render('listings', { lands });
  } catch (err) {
    res.status(500).send('Error fetching listings');
  }
});

// Get individual land details
router.get('/details/:id', async (req, res) => {
  try {
    const land = await Land.findById(req.params.id);
    if (!land) return res.status(404).send('Land not found');
    res.render('details', { land });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Get all land listings (API)
router.get('/api/listings', async (req, res) => {
  try {
    const lands = await Land.find().sort({ createdAt: -1 });
    res.json(lands);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching listings' });
  }
});

module.exports = router;
