import { useState, useMemo, useRef } from 'react';
import { SEO } from '@/components/SEO';
import { InArticleAd } from '@/components/AdUnit';
import { stories, categories } from '@/data/aiAgeStoriesData';
import { ChevronDown, ChevronUp, Clock, ArrowRight, Search, BookOpen, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const categoryColors: Record<string, string> = {
  Tech: '#00F0FF',
  Finance: '#FFD700',
  Healthcare: '#00FF88',
  HR: '#FF6B9D',
  Marketing: '#FF8C00',
  IT: '#8A2BE2',
  Manufacturing: '#00CED1',
  Consulting: '#FF4500',
  Retail: '#32CD32',
  Insurance: '#4169E1',
  Hospitality: '#FF69B4',
  Security: '#DC143C',
  Startup: '#00FA9A',
  Sustainability: '#228B22',
  Operations: '#DAA520',
};

const AIAge25Stories = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedStory, setExpandedStory] = useState<string | null>(null);
  const [showTOC, setShowTOC] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const filteredStories = useMemo(() => {
    return stories.filter(s => {
      const matchCategory = activeCategory === 'All' || s.category === activeCategory;
      const matchSearch = !searchQuery || 
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.keyword.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  const scrollToStory = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setExpandedStory(id);
    }
  };

  const renderContent = (content: string) => {
    const paragraphs = content.split('\n\n');
    return paragraphs.map((p, i) => {
      const trimmed = p.trim();
      if (/^[IVX]+\.$/.test(trimmed)) {
        return (
          <h3 key={i} className="text-[#00F0FF] font-bold text-xl mt-8 mb-4 tracking-wider">
            Part {trimmed}
          </h3>
        );
      }
      return (
        <p key={i} className="text-gray-300 leading-relaxed mb-4 text-base">
          {trimmed}
        </p>
      );
    });
  };

  const faqData = [
    { question: 'What are these 25 AI stories about?', answer: 'These are Hemingway-style narratives exploring how real professionals across finance, healthcare, IT, logistics, HR, and more adapted to AI automation in their daily work.' },
    { question: 'Are these real stories?', answer: 'These are literary fiction inspired by real AI automation trends in 2025-2026, written in the style of Ernest Hemingway to make complex technology topics accessible and emotionally engaging.' },
    { question: 'What industries are covered?', answer: 'The 25 stories cover finance, healthcare, HR, marketing, IT, manufacturing, consulting, retail, insurance, hospitality, security, startups, sustainability, and operations.' },
    { question: 'How long does it take to read all 25 stories?', answer: 'Each story is approximately 4-7 minutes. The complete collection takes about 2 hours to read, though each story stands alone.' },
  ];

  const breadcrumbs = [
    { name: 'Home', url: 'https://codehubmaster.lovable.app/' },
    { name: 'AI Guides', url: 'https://codehubmaster.lovable.app/ai-tools-mega-guide-2025' },
    { name: 'The AI Age: 25 Stories', url: 'https://codehubmaster.lovable.app/the-ai-age-25-stories' },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #0B1026 0%, #0D1530 50%, #0B1026 100%)' }}>
      <SEO
        title="The AI Age: 25 Stories of Humans and Machines | CodeHubMaster"
        description="25 real stories about AI automation in finance, healthcare, IT, logistics & more. How humans and machines work together. Read in 5 minutes each."
        keywords="ai tools for automating python data analysis pipelines, retail ai vision automation, ai automation build llm apps, ai logistics automation news 2025, leading ai tax automation companies, claims automation ai news, marketing automation ai news, best it service management software with ai automation, ai automation consulting, automating healthcare tasks with ai, best voice ai for healthcare front-desk automation, automated financial reporting with ai, voice ai systems for patient call automation, ai automation market trends germany 2025, ai sales automation hotels uk statistics 2025"
        canonical="https://codehubmaster.lovable.app/the-ai-age-25-stories"
        articleData={{
          publishedTime: '2025-06-01T00:00:00Z',
          modifiedTime: '2026-03-04T00:00:00Z',
          author: 'CodeHubMaster',
          section: 'AI Stories',
        }}
        faqData={faqData}
        breadcrumbs={breadcrumbs}
      />

      {/* Hero Section */}
      <header className="relative pt-20 pb-16 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          background: 'radial-gradient(ellipse at center, #00F0FF 0%, transparent 70%)',
        }} />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00F0FF]/30 bg-[#00F0FF]/5 text-[#00F0FF] text-sm mb-6">
            <BookOpen className="w-4 h-4" />
            <span>25 Stories • 25 Keywords • 1 Page</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            THE AI AGE
            <span className="block text-[#00F0FF]">25 STORIES</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-4 font-light">
            How real people adapted to the automation revolution.
            <br />
            <span className="text-gray-500 italic">Stories in the spirit of Hemingway.</span>
          </p>
          <p className="text-gray-500 max-w-2xl mx-auto mb-8 text-sm leading-relaxed">
            From Python engineers and truck drivers to nurses and tax consultants — these 25 literary narratives explore the human side of AI automation across finance, healthcare, IT, logistics, and more. Each story targets a specific AI automation keyword and can be read in under 7 minutes.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-gray-400 text-sm">
            <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-[#00F0FF]" /> ~2 hours total</span>
            <span>📖 25 Articles</span>
            <span>🎯 25 Keywords</span>
            <span>🏭 15 Industries</span>
          </div>
        </div>
      </header>

      {/* Search & Filter Bar */}
      <div className="sticky top-0 z-50 px-4 py-4" style={{ background: 'rgba(11, 16, 38, 0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(0, 240, 255, 0.1)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search stories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#00F0FF]/50 text-sm"
              />
            </div>
            {/* Categories */}
            <div className="flex flex-wrap gap-2 justify-center flex-1">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
                  style={{
                    background: activeCategory === cat ? (categoryColors[cat] || '#00F0FF') + '20' : 'rgba(255,255,255,0.05)',
                    color: activeCategory === cat ? (categoryColors[cat] || '#00F0FF') : '#9CA3AF',
                    border: `1px solid ${activeCategory === cat ? (categoryColors[cat] || '#00F0FF') + '50' : 'rgba(255,255,255,0.1)'}`,
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* TOC Toggle */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <button
          onClick={() => setShowTOC(!showTOC)}
          className="flex items-center gap-2 text-[#00F0FF] hover:text-[#00F0FF]/80 transition-colors text-sm font-medium"
        >
          {showTOC ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          Table of Contents ({filteredStories.length} stories)
        </button>
        {showTOC && (
          <nav className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2" aria-label="Table of Contents">
            {filteredStories.map(s => (
              <button
                key={s.id}
                onClick={() => scrollToStory(s.id)}
                className="flex items-center gap-2 text-left px-3 py-2 rounded-lg hover:bg-white/5 transition-colors group"
              >
                <span className="text-[#00F0FF]/60 text-xs font-mono w-6">{s.num}.</span>
                <span className="text-gray-300 text-sm group-hover:text-white transition-colors truncate">{s.title}</span>
                <ChevronRight className="w-3 h-3 text-gray-600 ml-auto flex-shrink-0" />
              </button>
            ))}
          </nav>
        )}
      </div>

      {/* Story Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map(story => (
            <article
              key={story.id}
              className="group cursor-pointer rounded-2xl border border-white/10 p-6 transition-all duration-300 hover:scale-[1.02] hover:border-[#00F0FF]/30"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 0 0 0 rgba(0, 240, 255, 0)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px 0 ${categoryColors[story.category] || '#00F0FF'}15`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 0 rgba(0, 240, 255, 0)';
              }}
              onClick={() => scrollToStory(story.id)}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                  style={{ background: (categoryColors[story.category] || '#00F0FF') + '15', color: categoryColors[story.category] || '#00F0FF' }}
                >
                  {story.category}
                </span>
                <span className="flex items-center gap-1 text-gray-500 text-xs">
                  <Clock className="w-3 h-3" /> {story.readTime}
                </span>
              </div>
              <span className="text-[#00F0FF]/40 text-xs font-mono">Story #{story.num}</span>
              <h2 className="text-white text-lg font-bold mt-1 mb-3 group-hover:text-[#00F0FF] transition-colors leading-snug">
                {story.title}
              </h2>
              <p className="text-gray-500 text-xs mb-4 line-clamp-2 italic">
                {story.keyword}
              </p>
              <div className="flex items-center gap-1 text-[#00F0FF] text-sm font-medium group-hover:gap-2 transition-all">
                Read Story <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Full Articles */}
      <div ref={contentRef} className="max-w-3xl mx-auto px-4 pb-20">
        <div className="border-t border-white/10 pt-12 mb-12">
          <h2 className="text-3xl font-bold text-white text-center mb-2">Full Stories</h2>
          <p className="text-gray-500 text-center text-sm">Click any card above or scroll to read</p>
        </div>

        {stories.map((story, idx) => (
          <div key={story.id}>
            {/* Ad every 5 articles */}
            {idx > 0 && idx % 5 === 0 && <InArticleAd />}

            <article
              id={story.id}
              className="mb-16 scroll-mt-24"
            >
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                  style={{ background: (categoryColors[story.category] || '#00F0FF') + '15', color: categoryColors[story.category] || '#00F0FF' }}
                >
                  {story.category}
                </span>
                <span className="flex items-center gap-1 text-gray-500 text-xs">
                  <Clock className="w-3 h-3" /> {story.readTime} read
                </span>
                <span className="text-gray-600 text-xs">{story.wordCount} words</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
                Story #{story.num}: {story.title}
              </h2>
              <p className="text-[#00F0FF]/60 text-sm italic mb-8">
                Keyword: {story.keyword}
              </p>

              <div className="prose-lg">
                {renderContent(story.content)}
              </div>

              {/* Internal links */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-3">
                {stories
                  .filter(s => s.category === story.category && s.id !== story.id)
                  .slice(0, 2)
                  .map(related => (
                    <button
                      key={related.id}
                      onClick={() => scrollToStory(related.id)}
                      className="text-xs text-[#00F0FF]/70 hover:text-[#00F0FF] transition-colors flex items-center gap-1"
                    >
                      Related: {related.title} <ArrowRight className="w-3 h-3" />
                    </button>
                  ))}
              </div>
            </article>
          </div>
        ))}

        {/* FAQ Section */}
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

        {/* CTA Section */}
        <section className="mt-16 text-center rounded-2xl p-8 md:p-12 border border-[#00F0FF]/20" style={{ background: 'rgba(0, 240, 255, 0.03)' }}>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Want More AI Insights?</h2>
          <p className="text-gray-400 mb-6 max-w-lg mx-auto">
            Explore our comprehensive guides covering 55+ AI tool categories and 52 niche industry applications.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/ai-tools-mega-guide-2025"
              className="px-6 py-3 rounded-lg font-semibold text-sm transition-all"
              style={{ background: '#00F0FF', color: '#0B1026' }}
            >
              AI Tools Mega Guide 2026
            </Link>
            <Link
              to="/ai-niche-tools-complete-guide"
              className="px-6 py-3 rounded-lg font-semibold text-sm border border-[#00F0FF]/30 text-[#00F0FF] hover:bg-[#00F0FF]/10 transition-all"
            >
              Niche AI Tools Guide
            </Link>
          </div>
        </section>

        {/* Back to Top */}
        <div className="mt-12 text-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-[#00F0FF]/60 hover:text-[#00F0FF] text-sm transition-colors"
          >
            ↑ Back to Top
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAge25Stories;
