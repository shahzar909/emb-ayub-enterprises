require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const Venture = require('../models/Venture');
const Blog = require('../models/Blog');

const connectDB = require('../config/database');

const seedData = async () => {
  await connectDB();

  console.log('🌱 Seeding database...');

  // Clear existing data
  await Admin.deleteMany({});
  await Venture.deleteMany({});
  await Blog.deleteMany({});

  // Create admin
  await Admin.create({
    name: 'EMB Admin',
    email: process.env.ADMIN_EMAIL || 'admin@embayub.com',
    password: process.env.ADMIN_PASSWORD || 'Admin@123456',
    role: 'superadmin',
  });
  console.log('✅ Admin created');

  // Create ventures
  await Venture.insertMany([
    {
      name: 'AdzSquare',
      tagline: 'Where Brands Meet Growth',
      description:
        'Helping brands grow through digital experiences, performance marketing, and strategic campaigns that drive measurable results.',
      category: 'Digital Marketing',
      websiteUrl: 'https://adzsquare.com',
      services: ['Branding', 'Performance Marketing', 'Social Media Marketing', 'Website Development'],
      status: 'active',
      featured: true,
      order: 1,
      accentColor: '#2563EB',
    },
    {
      name: 'Masala Udyog',
      tagline: 'Quality Distribution, Nationwide Reach',
      description:
        'Delivering quality products through efficient distribution networks and robust supply chain operations across India.',
      category: 'Distribution',
      websiteUrl: 'https://masalaudyog.com',
      services: ['FMCG Distribution', 'Spice Distribution', 'Supply Chain Operations', 'Logistics'],
      status: 'active',
      featured: true,
      order: 2,
      accentColor: '#D97706',
    },
    {
      name: 'Tax & Audit Services',
      tagline: 'Precision in Every Number',
      description:
        'Comprehensive tax planning, audit, and financial compliance services for businesses of all sizes.',
      category: 'Finance',
      services: ['Tax Planning', 'Audit Services', 'Financial Compliance', 'Advisory'],
      status: 'coming_soon',
      order: 3,
      accentColor: '#059669',
    },
    {
      name: 'EMB Consulting',
      tagline: 'Strategy That Scales',
      description:
        'Business strategy and management consulting to help organizations achieve sustainable growth.',
      category: 'Consulting',
      services: ['Business Strategy', 'Management Consulting', 'Market Research', 'Growth Advisory'],
      status: 'coming_soon',
      order: 4,
      accentColor: '#7C3AED',
    },
    {
      name: 'EMB Technology',
      tagline: 'Building the Future',
      description:
        'Technology products and SaaS solutions designed for modern businesses across industries.',
      category: 'Technology',
      services: ['SaaS Products', 'Enterprise Software', 'API Development', 'Tech Infrastructure'],
      status: 'coming_soon',
      order: 5,
      accentColor: '#DC2626',
    },
  ]);
  console.log('✅ Ventures created');

  // Create sample blog posts
  await Blog.create([
    {
      title: 'How EMB Ayub Enterprises is Building the Future of Business in India',
      excerpt:
        'A look at how diversified holding companies are shaping the next generation of Indian enterprises.',
      content: `<p>The landscape of Indian business is changing rapidly. As digital transformation sweeps across industries, holding companies like EMB Ayub Enterprises are uniquely positioned to capitalize on cross-industry opportunities.</p><p>Our philosophy is simple: build businesses that solve real problems, create real value, and scale sustainably. From digital marketing through AdzSquare to distribution through Masala Udyog, we are building an ecosystem of complementary ventures.</p><p>The next decade will see EMB expand into technology products, financial services, and consulting — creating a truly diversified portfolio that can weather any economic cycle.</p>`,
      author: 'EMB Ayub Team',
      category: 'Business',
      tags: ['holding company', 'india', 'business', 'growth'],
      status: 'published',
      publishDate: new Date(),
      readTime: 5,
    },
    {
      title: 'The Power of Performance Marketing in 2024: Insights from AdzSquare',
      excerpt:
        'How data-driven marketing strategies are delivering unprecedented ROI for brands across India.',
      content: `<p>Performance marketing has evolved beyond simple ad clicks. Today, it encompasses a sophisticated ecosystem of data analytics, audience targeting, and conversion optimization.</p><p>At AdzSquare, our approach combines creative excellence with data precision. Every campaign is built on a foundation of audience insights, tested with rigorous A/B methodologies, and optimized in real-time.</p>`,
      author: 'AdzSquare Team',
      category: 'Marketing',
      tags: ['marketing', 'digital', 'performance', 'ROI'],
      status: 'published',
      publishDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      readTime: 4,
    },
    {
      title: 'FMCG Distribution in India: Challenges and Opportunities',
      excerpt:
        'Understanding the complex landscape of fast-moving consumer goods distribution across Indian markets.',
      content: `<p>India's FMCG distribution landscape is one of the most complex in the world. With a population of 1.4 billion spread across diverse geographies, building an efficient distribution network requires deep local knowledge and robust logistics infrastructure.</p><p>Masala Udyog has built its distribution capabilities by focusing on last-mile connectivity and strong retailer relationships. Our spice distribution network now reaches thousands of retailers across multiple states.</p>`,
      author: 'Masala Udyog Team',
      category: 'Distribution',
      tags: ['FMCG', 'distribution', 'supply chain', 'india'],
      status: 'published',
      publishDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      readTime: 6,
    },
  ]);
  console.log('✅ Blog posts created');

  console.log('\n🎉 Database seeded successfully!');
  console.log(`📧 Admin Email: ${process.env.ADMIN_EMAIL || 'admin@embayub.com'}`);
  console.log(`🔑 Admin Password: ${process.env.ADMIN_PASSWORD || 'Admin@123456'}`);

  process.exit(0);
};

seedData().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
