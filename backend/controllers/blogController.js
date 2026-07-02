const Blog = require('../models/Blog');

// @desc    Get published blogs (public)
// @route   GET /api/blogs
exports.getBlogs = async (req, res, next) => {
  try {
    const { page = 1, limit = 9, category, tag } = req.query;

    const query = { status: 'published' };
    if (category) query.category = category;
    if (tag) query.tags = { $in: [tag] };

    const total = await Blog.countDocuments(query);
    const blogs = await Blog.find(query)
      .sort({ publishDate: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .select('-content');

    res.json({
      success: true,
      data: blogs,
      pagination: { total, page: Number(page), pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single blog by slug (public)
// @route   GET /api/blogs/:slug
exports.getBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findOneAndUpdate(
      { slug: req.params.slug, status: 'published' },
      { $inc: { views: 1 } },
      { new: true }
    );
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }
    res.json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all blogs (admin)
// @route   GET /api/admin/blogs
exports.adminGetBlogs = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status, search } = req.query;

    const query = {};
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
      ];
    }

    const total = await Blog.countDocuments(query);
    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .select('-content');

    res.json({
      success: true,
      data: blogs,
      pagination: { total, page: Number(page), pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create blog post (admin)
// @route   POST /api/admin/blogs
exports.createBlog = async (req, res, next) => {
  try {
    const blogData = { ...req.body };
    if (req.file) {
      blogData.featuredImage = `/uploads/${req.file.filename}`;
    }
    const blog = await Blog.create(blogData);
    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

// @desc    Update blog post (admin)
// @route   PUT /api/admin/blogs/:id
exports.updateBlog = async (req, res, next) => {
  try {
    const blogData = { ...req.body };
    if (req.file) {
      blogData.featuredImage = `/uploads/${req.file.filename}`;
    }
    const blog = await Blog.findByIdAndUpdate(req.params.id, blogData, {
      new: true,
      runValidators: true,
    });
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }
    res.json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete blog post (admin)
// @route   DELETE /api/admin/blogs/:id
exports.deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }
    res.json({ success: true, message: 'Blog post deleted successfully' });
  } catch (error) {
    next(error);
  }
};
