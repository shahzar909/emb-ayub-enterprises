const path = require('path');

require('dotenv').config({
  path: path.join(__dirname, '../.env'),
});
const mongoose = require('mongoose');
const Blog = require('../models/Blog');

const MONGODB_URI = process.env.MONGODB_URI;

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB Connected');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

const images = {
  business: [
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=80',
    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&q=80',
    'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1600&q=80',
  ],

  marketing: [
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80',
    'https://images.unsplash.com/photo-1557838923-2985c318be48?w=1600&q=80',
    'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=1600&q=80',
  ],

  finance: [
    'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1600&q=80',
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&q=80',
    'https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=1600&q=80',
  ],

  technology: [
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&q=80',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600&q=80',
  ],

  strategy: [
    'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1600&q=80',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80',
    'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1600&q=80',
  ],

  distribution: [
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&q=80',
    'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=1600&q=80',
    'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=1600&q=80',
  ],
};

const lorem = `
Modern businesses are evolving rapidly as technology, innovation, and changing consumer expectations reshape industries across the globe.

Organizations that embrace digital transformation, data-driven decision making, and sustainable growth strategies consistently outperform competitors.

Strong leadership, operational excellence, and customer-centric thinking remain the foundation of long-term business success. Companies investing in automation, artificial intelligence, and strategic partnerships are better positioned to adapt to future market challenges.

Business growth is no longer driven by scale alone. Agility, innovation, and continuous improvement are becoming equally important for maintaining competitive advantage in an increasingly connected global economy.
`;

const blogs = [  {
    title: 'Building Resilient Businesses in a Digital Economy',
    slug: 'building-resilient-businesses',
    category: 'Business',
    author: 'EMB Editorial',
    excerpt:
      'Discover how resilient organizations adapt to uncertainty through innovation, digital transformation, and strategic leadership.',
    featuredImage: images.business[0],
    content: lorem,
    status: 'published',
    readTime: 6,
    views: 152,
    tags: ['Business', 'Growth', 'Leadership'],
    publishDate: new Date('2026-06-15'),
  },

  {
    title: 'Why AI is Reshaping Enterprise Operations',
    slug: 'ai-enterprise-operations',
    category: 'Technology',
    author: 'EMB Technology',
    excerpt:
      'Artificial Intelligence is becoming the backbone of modern enterprise efficiency and decision-making.',
    featuredImage: images.technology[0],
    content: lorem,
    status: 'published',
    readTime: 5,
    views: 211,
    tags: ['AI', 'Technology'],
    publishDate: new Date('2026-06-12'),
  },

  {
    title: 'Performance Marketing Strategies That Drive Results',
    slug: 'performance-marketing-strategies',
    category: 'Marketing',
    author: 'AdzSquare',
    excerpt:
      'A practical look at modern marketing strategies that consistently generate measurable business growth.',
    featuredImage: images.marketing[0],
    content: lorem,
    status: 'published',
    readTime: 4,
    views: 118,
    tags: ['Marketing', 'Digital'],
    publishDate: new Date('2026-06-10'),
  },

  {
    title: 'Financial Planning for Sustainable Business Growth',
    slug: 'financial-planning-growth',
    category: 'Finance',
    author: 'Finance Desk',
    excerpt:
      'Learn why financial planning and disciplined capital allocation are critical for long-term success.',
    featuredImage: images.finance[0],
    content: lorem,
    status: 'published',
    readTime: 7,
    views: 181,
    tags: ['Finance', 'Investment'],
    publishDate: new Date('2026-06-08'),
  },

  {
    title: 'Supply Chain Innovation in Modern Distribution',
    slug: 'supply-chain-innovation',
    category: 'Distribution',
    author: 'Distribution Team',
    excerpt:
      'Digital logistics and automation are redefining how products move across global markets.',
    featuredImage: images.distribution[0],
    content: lorem,
    status: 'published',
    readTime: 5,
    views: 95,
    tags: ['Supply Chain', 'Distribution'],
    publishDate: new Date('2026-06-05'),
  },

  {
    title: 'Corporate Strategy for Long-Term Success',
    slug: 'corporate-strategy-success',
    category: 'Strategy',
    author: 'Strategy Office',
    excerpt:
      'Strong strategy aligns people, processes, and technology to create lasting competitive advantage.',
    featuredImage: images.strategy[0],
    content: lorem,
    status: 'published',
    readTime: 6,
    views: 166,
    tags: ['Strategy'],
    publishDate: new Date('2026-06-03'),
  },

  {
    title: 'Scaling Startups into Global Enterprises',
    slug: 'scaling-startups-global',
    category: 'Business',
    author: 'EMB Editorial',
    excerpt:
      'The journey from startup to enterprise requires disciplined execution, funding, and innovation.',
    featuredImage: images.business[1],
    content: lorem,
    status: 'published',
    readTime: 5,
    views: 144,
    tags: ['Startup', 'Business'],
    publishDate: new Date('2026-06-01'),
  },

  {
    title: 'Cybersecurity in the Age of AI',
    slug: 'cybersecurity-age-ai',
    category: 'Technology',
    author: 'Technology Desk',
    excerpt:
      'As AI adoption grows, organizations must rethink cybersecurity strategies to protect digital assets.',
    featuredImage: images.technology[1],
    content: lorem,
    status: 'published',
    readTime: 6,
    views: 210,
    tags: ['Cybersecurity', 'AI'],
    publishDate: new Date('2026-05-29'),
  },

  {
    title: 'Brand Positioning That Builds Customer Trust',
    slug: 'brand-positioning-trust',
    category: 'Marketing',
    author: 'Marketing Team',
    excerpt:
      'Strong brands are built on consistency, authenticity, and long-term customer relationships.',
    featuredImage: images.marketing[1],
    content: lorem,
    status: 'published',
    readTime: 5,
    views: 132,
    tags: ['Branding'],
    publishDate: new Date('2026-05-26'),
  },

  {
    title: 'Managing Cash Flow During Expansion',
    slug: 'cash-flow-expansion',
    category: 'Finance',
    author: 'Finance Desk',
    excerpt:
      'Healthy cash flow management enables businesses to scale confidently while reducing financial risk.',
    featuredImage: images.finance[1],
    content: lorem,
    status: 'published',
    readTime: 6,
    views: 101,
    tags: ['Cash Flow'],
    publishDate: new Date('2026-05-22'),
  },
    {
    title: 'Warehouse Automation and the Future of Logistics',
    slug: 'warehouse-automation-future',
    category: 'Distribution',
    author: 'Distribution Team',
    excerpt:
      'Automation is improving warehouse efficiency, reducing operational costs, and accelerating deliveries.',
    featuredImage: images.distribution[1],
    content: lorem,
    status: 'published',
    readTime: 5,
    views: 124,
    tags: ['Warehouse', 'Automation'],
    publishDate: new Date('2026-05-18'),
  },

  {
    title: 'Leading Through Business Transformation',
    slug: 'leading-business-transformation',
    category: 'Strategy',
    author: 'Strategy Office',
    excerpt:
      'Transformation succeeds when leadership combines vision, execution, and continuous innovation.',
    featuredImage: images.strategy[1],
    content: lorem,
    status: 'published',
    readTime: 6,
    views: 174,
    tags: ['Leadership', 'Transformation'],
    publishDate: new Date('2026-05-15'),
  },

  {
    title: 'The Rise of Data-Driven Decision Making',
    slug: 'data-driven-decision-making',
    category: 'Technology',
    author: 'EMB Technology',
    excerpt:
      'Organizations using analytics effectively gain faster insights and stronger competitive advantages.',
    featuredImage: images.technology[2],
    content: lorem,
    status: 'published',
    readTime: 5,
    views: 196,
    tags: ['Analytics', 'Data'],
    publishDate: new Date('2026-05-12'),
  },

  {
    title: 'Creating High-Performance Marketing Campaigns',
    slug: 'high-performance-marketing',
    category: 'Marketing',
    author: 'AdzSquare',
    excerpt:
      'Combining creativity with analytics helps brands maximize campaign performance and customer engagement.',
    featuredImage: images.marketing[2],
    content: lorem,
    status: 'published',
    readTime: 4,
    views: 109,
    tags: ['Marketing'],
    publishDate: new Date('2026-05-10'),
  },

  {
    title: 'Investment Trends Every Business Leader Should Watch',
    slug: 'investment-trends-business',
    category: 'Finance',
    author: 'Finance Desk',
    excerpt:
      'Emerging investment patterns are reshaping industries and creating new growth opportunities.',
    featuredImage: images.finance[2],
    content: lorem,
    status: 'published',
    readTime: 7,
    views: 221,
    tags: ['Investment', 'Finance'],
    publishDate: new Date('2026-05-08'),
  }

];
async function seedBlogs() {
  try {
    await connectDB();

    console.log('🗑 Removing existing blogs...');
    await Blog.deleteMany({});

    console.log('📚 Inserting blogs...');
    await Blog.insertMany(blogs);

    console.log(`✅ ${blogs.length} blogs inserted successfully!`);

    await mongoose.connection.close();

    console.log('👋 MongoDB connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeder failed');
    console.error(error);
    await mongoose.connection.close();
    process.exit(1);
  }
}

seedBlogs();