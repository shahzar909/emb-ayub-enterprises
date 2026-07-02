const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

// @desc    Admin login
// @route   POST /api/admin/auth/login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    const admin = await Admin.findOne({ email, isActive: true }).select('+password');

    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Update last login
    await Admin.findByIdAndUpdate(admin._id, { lastLogin: new Date() });

    const token = signToken(admin._id);

    res.json({
      success: true,
      token,
      data: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current admin
// @route   GET /api/admin/auth/me
exports.getMe = async (req, res, next) => {
  try {
    res.json({ success: true, data: req.admin });
  } catch (error) {
    next(error);
  }
};

// @desc    Change password
// @route   PATCH /api/admin/auth/change-password
exports.changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const admin = await Admin.findById(req.admin._id).select('+password');

    if (!(await admin.comparePassword(currentPassword))) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect',
      });
    }

    admin.password = newPassword;
    await admin.save();

    const token = signToken(admin._id);
    res.json({ success: true, token, message: 'Password changed successfully' });
  } catch (error) {
    next(error);
  }
};
