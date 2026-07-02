const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const multer = require('multer');
const path = require('path');
const { protect, authorize } = require('../middleware/auth');

// Controllers
const authController = require('../controllers/authController');
const contactController = require('../controllers/contactController');
const blogController = require('../controllers/blogController');
const ventureController = require('../controllers/ventureController');

// Rate limiters
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: { success: false, message: 'Too many requests. Please try again later.' },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Too many login attempts. Please try again later.' },
});

// File upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    if (ext && mime) return cb(null, true);
    cb(new Error('Only image files are allowed'));
  },
});

// ─── PUBLIC ROUTES ───────────────────────────────────────────────────────────

// Contact form submission
router.post('/contacts', contactLimiter, contactController.submitContact);

// Public blogs
router.get('/blogs', blogController.getBlogs);
router.get('/blogs/:slug', blogController.getBlog);

// Public ventures
router.get('/ventures', ventureController.getVentures);
router.get('/ventures/:id', ventureController.getVenture);

// ─── ADMIN AUTH ───────────────────────────────────────────────────────────────

router.post('/admin/auth/login', authLimiter, authController.login);
router.get('/admin/auth/me', protect, authController.getMe);
router.patch('/admin/auth/change-password', protect, authController.changePassword);

// ─── ADMIN CONTACT ROUTES ─────────────────────────────────────────────────────

router.get('/admin/contacts/analytics', protect, contactController.getAnalytics);
router.get('/admin/contacts', protect, contactController.getContacts);
router.get('/admin/contacts/:id', protect, contactController.getContact);
router.patch('/admin/contacts/:id', protect, contactController.updateContact);
router.delete('/admin/contacts/:id', protect, contactController.deleteContact);

// ─── ADMIN BLOG ROUTES ────────────────────────────────────────────────────────

router.get('/admin/blogs', protect, blogController.adminGetBlogs);
router.post('/admin/blogs', protect, upload.single('featuredImage'), blogController.createBlog);
router.put('/admin/blogs/:id', protect, upload.single('featuredImage'), blogController.updateBlog);
router.delete('/admin/blogs/:id', protect, blogController.deleteBlog);

// ─── ADMIN VENTURE ROUTES ─────────────────────────────────────────────────────

router.get('/admin/ventures', protect, ventureController.adminGetVentures);
router.post('/admin/ventures', protect, upload.single('logo'), ventureController.createVenture);
router.put('/admin/ventures/:id', protect, upload.single('logo'), ventureController.updateVenture);
router.delete('/admin/ventures/:id', protect, ventureController.deleteVenture);

module.exports = router;
