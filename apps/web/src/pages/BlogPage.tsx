import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Tag, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/seo/SEO';
import { PageHeroBanner } from '@/components/layout/PageHeroBanner';
import { fromLeft, fromRight } from '@/components/layout/PageTransition';

const CATEGORIES = ['All', 'Plumbing Tips', 'DIY Guides', 'Home Maintenance', 'Emergency Prep'];

const POSTS = [
  { slug: '10-signs-emergency-plumbing', title: '10 Signs You Need Emergency Plumbing Service', excerpt: 'Learn the warning signs that indicate you need immediate professional plumbing help.', category: 'Emergency Prep', date: 'Nov 28, 2025', readTime: 5, image: '' },
  { slug: 'prevent-frozen-pipes-winter', title: 'How to Prevent Frozen Pipes This Winter', excerpt: 'Protect your home from costly frozen pipe damage with these essential tips.', category: 'Home Maintenance', date: 'Nov 21, 2025', readTime: 4, image: '' },
  { slug: 'tankless-vs-tank-water-heaters', title: 'Tankless vs. Tank Water Heaters: Which is Right?', excerpt: 'Compare pros and cons to make the best choice for your home.', category: 'Plumbing Tips', date: 'Nov 14, 2025', readTime: 6, image: '' },
  { slug: 'diy-unclog-drain', title: '5 DIY Methods to Unclog a Drain', excerpt: 'Try these safe and effective methods before calling a plumber.', category: 'DIY Guides', date: 'Nov 7, 2025', readTime: 4, image: '' },
  { slug: 'water-conservation-tips', title: '10 Water Conservation Tips for Your Home', excerpt: 'Save water and reduce your utility bills with these practical tips.', category: 'Home Maintenance', date: 'Oct 30, 2025', readTime: 5, image: '' },
  { slug: 'when-to-replace-pipes', title: 'When Should You Replace Your Pipes?', excerpt: 'Signs that your home plumbing needs a complete overhaul.', category: 'Plumbing Tips', date: 'Oct 23, 2025', readTime: 7, image: '' },
];

export default function BlogPage() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? POSTS : POSTS.filter(p => p.category === active);

  return (
    <>
      <SEO title="Plumbing Blog" description="Expert plumbing tips, guides, and industry news from ProPlumb USA's certified master plumbers." canonical="/blog" />

      <PageHeroBanner
        title="Plumbing Blog"
        subtitle="Expert tips, guides, and industry insights from our master plumbers. Stay informed and protect your home."
        breadcrumbs={[{ label: 'Blog' }]}
        bgImage="/images/blog_hero.png"
        badge={
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/15 border border-primary/25 text-primary-light text-sm font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            New Articles Weekly
          </span>
        }
        accentColor="from-primary-light to-primary"
      />

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setActive(cat)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${active === cat ? 'bg-blue text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}>{cat}</button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((post, i) => (
              <motion.article
                key={post.slug}
                custom={Math.floor(i / 3)}
                variants={i % 2 === 0 ? fromLeft : fromRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
              >
                <Link to={`/blog/${post.slug}`} className="group block bg-white rounded-2xl overflow-hidden shadow-card border border-gray-100 hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
                  <div className="h-48 bg-gradient-to-br from-navy to-blue-dark flex items-center justify-center">
                    <span className="text-white/20 text-6xl font-heading font-bold">{post.title[0]}</span>
                  </div>
                  <div className="p-6">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue bg-blue/5 px-3 py-1 rounded-full mb-3">
                      <Tag className="w-3 h-3" />{post.category}
                    </span>
                    <h2 className="font-heading font-semibold text-lg text-gray-900 mb-2 group-hover:text-blue transition-colors line-clamp-2">{post.title}</h2>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{post.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime} min read</span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
