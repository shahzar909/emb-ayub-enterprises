const Contact = require('../models/Contact');

// @desc    Submit contact form (public)
// @route   POST /api/contacts
exports.submitContact = async (req, res, next) => {
  try {
    const { name, email, phone, company, message } = req.body;
    const contact = await Contact.create({ name, email, phone, company, message });

    res.status(201).json({
      success: true,
      message: 'Thank you for reaching out! We will get back to you soon.',
      data: { id: contact._id },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contacts (admin)
// @route   GET /api/admin/contacts
exports.getContacts = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status, search } = req.query;

    const query = {};
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
      ];
    }

    const total = await Contact.countDocuments(query);
    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      success: true,
      data: contacts,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit),
        limit: Number(limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single contact (admin)
// @route   GET /api/admin/contacts/:id
exports.getContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: { status: 'read' } },
      { new: true }
    );
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }
    res.json({ success: true, data: contact });
  } catch (error) {
    next(error);
  }
};

// @desc    Update contact status (admin)
// @route   PATCH /api/admin/contacts/:id
exports.updateContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status, notes: req.body.notes },
      { new: true, runValidators: true }
    );
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }
    res.json({ success: true, data: contact });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete contact (admin)
// @route   DELETE /api/admin/contacts/:id
exports.deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }
    res.json({ success: true, message: 'Contact deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get contact analytics (admin)
// @route   GET /api/admin/contacts/analytics
exports.getAnalytics = async (req, res, next) => {
  try {
    const [total, newCount, repliedCount, last7Days] = await Promise.all([
      Contact.countDocuments(),
      Contact.countDocuments({ status: 'new' }),
      Contact.countDocuments({ status: 'replied' }),
      Contact.countDocuments({
        createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
      }),
    ]);

    const recentContacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email company createdAt status');

    res.json({
      success: true,
      data: { total, new: newCount, replied: repliedCount, last7Days, recentContacts },
    });
  } catch (error) {
    next(error);
  }
};
