const mongoose = require('mongoose');

const ventureSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Venture name is required'],
      trim: true,
      unique: true,
    },
    tagline: {
      type: String,
      trim: true,
      maxlength: [150, 'Tagline cannot exceed 150 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
    },
    logo: {
      type: String,
      default: null,
    },
    websiteUrl: {
      type: String,
      default: null,
    },
    services: [
      {
        type: String,
        trim: true,
      },
    ],
    status: {
      type: String,
      enum: ['active', 'coming_soon', 'inactive'],
      default: 'coming_soon',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
    accentColor: {
      type: String,
      default: '#2563EB',
    },
  },
  {
    timestamps: true,
  }
);

ventureSchema.index({ status: 1, order: 1 });

module.exports = mongoose.model('Venture', ventureSchema);
