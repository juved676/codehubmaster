import { useState, useMemo } from 'react';
import { SEO } from '@/components/SEO';
import { InArticleAd } from '@/components/AdUnit';
import { articles } from '@/data/aiAutomationArticlesData';
import { Clock, Search, BookOpen, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AIAutomationGuides = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null);

  const filteredArticles = useMemo(() => {
    if (!searchQuery) return articles;
    const q = searchQuery.toLowerCase();
    return articles.filter(a =>
      a.title.toLowerCase().includes(q) ||
      a.keyword.toLowerCase().includes(q) ||
      a.hook.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const toggleArticle = (id: string) => {
    setExpandedArticle(prev => prev === id ? null : id);
    if (expandedArticle !== id) {
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const faqData = [
    { question: 'What is an AI Automation Engineer?', answer: 'An AI Automation Engineer designs, builds, and maintains systems that use artificial intelligence to automate business processes. They integrate ML models, orchestrate workflows, and ensure AI runs reliably in production.' },
    { question: 'How much do AI automation agencies charge?', answer: 'AI automation agency pricing varies: hourly rates range from ₹2,000–₹10,000 in India ($100–$300 in US). Fixed project fees range from ₹50,000 to ₹20 lakh depending on complexity.' },
    { question: 'How can AI help with data privacy compliance?', answer: 'AI can help with data privacy by anonymizing data before processing, implementing role-based access controls, and conducting automated privacy impact assessments. Use private AI instances for sensitive data.' },
    { question: 'Is the Tai Lopez AI automation program worth it?', answer: 'The AI agency business model is legitimate, but the course is marketed with high expectations. You can learn the same skills from free YouTube tutorials, affordable Udemy courses, and AI community forums.' },
  ];

  const breadcrumbs = [
    { name: 'Home', url: 'https://codehubmaster.site/' },
    { name: 'AI Guides', url: 'https://codehubmaster.site/ai-tools-mega-guide-2025' },
    { name: 'AI Automation Guides', url: 'https://codehubmaster.site/ai-automation-guides' },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #0B1026 0%, #101840 50%, #0B1026 100%)' }}>
      <SEO
        title="AI Automation Guides 2026: Engineer, Agencies, Privacy & More"
        description="Complete AI automation guides covering careers, agency pricing, data privacy, orchestration, and more. 8 in-depth articles for professionals and businesses."
        keywords="ai automation engineer, ai automate repetitive support processes, ai automation with data privacy, top ai automation agencies, ai automation agency pricing, ai orchestration automation, data privacy in ai automation, tai lopez ai automation"
        canonical="https://codehubmaster.site/ai-automation-guides"
        articleData={{
          publishedTime: '2026-03-23T00:00:00Z',
          modifiedTime: '2026-03-23T00:00:00Z',
          author: 'CodeHubMaster',
          section: 'AI Automation',
        }}
        faqData={faqData}
        breadcrumbs={breadcrumbs}
      />

      {/* Hero */}
      <header className="relative pt-20 pb-16 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-15" style={{ background: 'radial-gradient(ellipse at center, #7C3AED 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-400/30 bg-purple-400/5 text-purple-400 text-sm mb-6">
            <BookOpen className="w-4 h-4" />
            <span>8 In‑Depth Guides • AI Automation</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            AI AUTOMATION
            <span className="block text-purple-400">COMPLETE GUIDES</span>
          </h1>
          <p className="text-xl text-gray-400 mb-4 font-light">
            Everything you need to know about AI automation — careers, agencies, privacy, orchestration, and more.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-gray-400 text-sm mt-8">
            <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-purple-400" /> ~60 min total</span>
            <span>📖 8 Articles</span>
            <span>🎯 8 Keywords</span>
          </div>
        </div>
      </header>

      {/* Search */}
      <div className="sticky top-0 z-50 px-4 py-4" style={{ background: 'rgba(11, 16, 38, 0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(124, 58, 237, 0.1)' }}>
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-400/50 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Articles */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {filteredArticles.map((article, idx) => (
          <div key={article.id}>
            {idx > 0 && idx % 3 === 0 && <InArticleAd />}
            <article
              id={article.id}
              className="mb-8 rounded-2xl border border-white/10 overflow-hidden scroll-mt-24 transition-all duration-300"
              style={{ background: 'rgba(255, 255, 255, 0.03)' }}
            >
              {/* Header - always visible */}
              <button
                onClick={() => toggleArticle(article.id)}
                className="w-full text-left p-6 md:p-8 flex flex-col gap-3"
              >
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-500/15 text-purple-400">
                    Article #{article.num}
                  </span>
                  <span className="flex items-center gap-1 text-gray-500 text-xs">
                    <Clock className="w-3 h-3" /> {article.readTime}
                  </span>
                  <span className="text-gray-600 text-xs italic">{article.keyword}</span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-white leading-snug">
                  {article.title}
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed">{article.hook}</p>
                <div className="flex items-center gap-2 text-purple-400 text-sm font-medium mt-1">
                  {expandedArticle === article.id ? (
                    <>Collapse <ChevronUp className="w-4 h-4" /></>
                  ) : (
                    <>Read Full Article <ChevronDown className="w-4 h-4" /></>
                  )}
                </div>
              </button>

              {/* Expanded content */}
              {expandedArticle === article.id && (
                <div className="px-6 md:px-8 pb-8 border-t border-white/5">
                  {article.sections.map((section, si) => (
                    <div key={si} className="mt-8">
                      <h3 className="text-purple-400 font-bold text-lg mb-4">{section.heading}</h3>
                      {section.content.split('\n\n').map((para, pi) => (
                        <p key={pi} className="text-gray-300 leading-relaxed mb-3 text-[15px] whitespace-pre-line">
                          {para}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </article>
          </div>
        ))}

        {/* FAQ */}
        <section className="mt-16 pt-12 border-t border-white/10">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqData.map((faq, i) => (
              <div key={i} className="rounded-xl border border-white/10 p-6" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <h3 className="text-white font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 text-center rounded-2xl p-8 md:p-12 border border-purple-400/20" style={{ background: 'rgba(124, 58, 237, 0.03)' }}>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Explore More AI Guides</h2>
          <p className="text-gray-400 mb-6 max-w-lg mx-auto">
            Dive deeper into AI tools, niche applications, and real-world automation stories.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/ai-tools-mega-guide-2025" className="px-6 py-3 rounded-lg font-semibold text-sm transition-all bg-purple-500 text-white hover:bg-purple-600">
              AI Tools Mega Guide
            </Link>
            <Link to="/the-ai-age-25-stories" className="px-6 py-3 rounded-lg font-semibold text-sm border border-purple-400/30 text-purple-400 hover:bg-purple-400/10 transition-all">
              AI Age: 25 Stories
            </Link>
          </div>
        </section>

        <div className="mt-12 text-center">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-purple-400/60 hover:text-purple-400 text-sm transition-colors">
            ↑ Back to Top
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAutomationGuides;
