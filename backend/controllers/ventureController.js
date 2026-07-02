const Venture = require('../models/Venture');

// @desc    Get all active ventures (public)
// @route   GET /api/ventures
exports.getVentures = async (req, res, next) => {
  try {
    const ventures = await Venture.find({ status: { $ne: 'inactive' } })
      .sort({ order: 1, createdAt: 1 });
    res.json({ success: true, data: ventures });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single venture (public)
// @route   GET /api/ventures/:id
exports.getVenture = async (req, res, next) => {
  try {
    const venture = await Venture.findById(req.params.id);
    if (!venture) {
      return res.status(404).json({ success: false, message: 'Venture not found' });
    }
    res.json({ success: true, data: venture });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all ventures (admin)
// @route   GET /api/admin/ventures
exports.adminGetVentures = async (req, res, next) => {
  try {
    const ventures = await Venture.find().sort({ order: 1, createdAt: 1 });
    res.json({ success: true, data: ventures });
  } catch (error) {
    next(error);
  }
};

// @desc    Create venture (admin)
// @route   POST /api/admin/ventures
exports.createVenture = async (req, res, next) => {
  try {
    const ventureData = { ...req.body };
    if (req.file) {
      ventureData.logo = `/uploads/${req.file.filename}`;
    }
    if (ventureData.services && typeof ventureData.services === 'string') {
      ventureData.services = ventureData.services.split(',').map((s) => s.trim());
    }
    const venture = await Venture.create(ventureData);
    res.status(201).json({ success: true, data: venture });
  } catch (error) {
    next(error);
  }
};

// @desc    Update venture (admin)
// @route   PUT /api/admin/ventures/:id
exports.updateVenture = async (req, res, next) => {
  try {
    const ventureData = { ...req.body };
    if (req.file) {
      ventureData.logo = `/uploads/${req.file.filename}`;
    }
    if (ventureData.services && typeof ventureData.services === 'string') {
      ventureData.services = ventureData.services.split(',').map((s) => s.trim());
    }
    const venture = await Venture.findByIdAndUpdate(req.params.id, ventureData, {
      new: true,
      runValidators: true,
    });
    if (!venture) {
      return res.status(404).json({ success: false, message: 'Venture not found' });
    }
    res.json({ success: true, data: venture });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete venture (admin)
// @route   DELETE /api/admin/ventures/:id
exports.deleteVenture = async (req, res, next) => {
  try {
    const venture = await Venture.findByIdAndDelete(req.params.id);
    if (!venture) {
      return res.status(404).json({ success: false, message: 'Venture not found' });
    }
    res.json({ success: true, message: 'Venture deleted successfully' });
  } catch (error) {
    next(error);
  }
};
