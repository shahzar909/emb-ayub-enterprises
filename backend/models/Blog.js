const mongoose = require('mongoose');
const slugify = require('slugify');

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    featuredImage: {
      type: String,
      default: null,
    },
    excerpt: {
      type: String,
      required: [true, 'Excerpt is required'],
      maxlength: [500, 'Excerpt cannot exceed 500 characters'],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
      default: 'EMB Ayub Team',
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'Business',
        'Marketing',
        'Distribution',
        'Technology',
        'Finance',
        'Strategy',
        'Insights',
      ],
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
    publishDate: {
      type: Date,
      default: null,
    },
    views: {
      type: Number,
      default: 0,
    },
    readTime: {
      type: Number, // minutes
      default: 5,
    },
  },
  {
    timestamps: true,
  }
);

blogSchema.pre('save', function (next) {
  if (this.isModified('title') || this.isNew) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  if (this.status === 'published' && !this.publishDate) {
    this.publishDate = new Date();
  }
  // Estimate read time (avg 200 words/min)
  if (this.content) {
    const wordCount = this.content.split(/\s+/).length;
    this.readTime = Math.ceil(wordCount / 200);
  }
  next();
});

blogSchema.index({ slug: 1 });
blogSchema.index({ status: 1, publishDate: -1 });
blogSchema.index({ category: 1 });

module.exports = mongoose.model('Blog', blogSchema);
