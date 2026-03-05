import { useState, useMemo } from 'react';
import { SEO } from '@/components/SEO';
import { InArticleAd } from '@/components/AdUnit';
import { orwellStories, orwellCategories } from '@/data/orwellAiStoriesData';
import { Search, ChevronUp, Clock, BookOpen, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const OrwellAiAutomation25 = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedStory, setExpandedStory] = useState<string | null>(null);

  const filteredStories = useMemo(() => {
    return orwellStories.filter(story => {
      const matchesCategory = selectedCategory === 'All' || story.category === selectedCategory;
      const matchesSearch = searchQuery === '' ||
        story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.keyword.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const allKeywords = orwellStories.map(s => s.keyword).join(', ');

  const faqData = [
    { question: 'What is The Orwell Files about?', answer: 'The Orwell Files is a collection of 25 critical essays examining AI automation across industries including finance, healthcare, energy, lending, and technology, written in the analytical tradition of George Orwell.' },
    { question: 'How does AI automation affect lending decisions?', answer: 'AI lending automation provides 24/7 credit decisioning with instant approvals, but raises concerns about algorithmic opacity, lack of human judgment, and the inability to consider personal circumstances that traditional lenders would evaluate.' },
    { question: 'What are the limitations of AI workflow automation?', answer: 'AI workflow automation can reduce time-to-resolution metrics but may incentivize gaming the system, closing tickets prematurely, and optimizing for speed over quality of service.' },
    { question: 'Can AI replace human judgment in governance?', answer: 'Automated AI governance platforms can monitor and flag issues, but cannot provide the judgment, context, and wisdom required for genuine governance. They often serve as symbolic shields rather than actual oversight mechanisms.' },
    { question: 'How does AI affect customer support processes?', answer: 'AI automation of repetitive support processes shifts rather than eliminates work. Support agents often become "janitors for machines," handling ambiguous cases the AI cannot resolve, which can be more frustrating than the original repetitive work.' },
    { question: 'What is the impact of AI on sales automation?', answer: 'AI sales automation tools increase volume of leads and outreach but often reduce quality. They optimize for measurable metrics like contact rates while ignoring unmeasurable qualities like trust, rapport, and genuine understanding of customer needs.' },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8F9FA' }}>
      <SEO
        title="The Orwell Files: 25 Stories of AI Automation | CodeHubMaster"
        description="25 critical examinations of AI automation in finance, healthcare, energy, lending, and more. How technology changes work, power, and human judgment."
        keywords={allKeywords}
        canonical="https://codehubmaster.lovable.app/the-orwell-ai-automation-25"
        articleData={{
          publishedTime: '2025-06-01T00:00:00Z',
          modifiedTime: new Date().toISOString(),
          author: 'CodeHubMaster',
          section: 'AI Automation Essays',
        }}
        faqData={faqData}
        breadcrumbs={[
          { name: 'Home', url: 'https://codehubmaster.lovable.app/' },
          { name: 'The Orwell Files', url: 'https://codehubmaster.lovable.app/the-orwell-ai-automation-25' },
        ]}
      />

      {/* Hero Section */}
      <header className="relative py-16 md:py-24 px-4" style={{ backgroundColor: '#1a1a2e', color: '#FFFFFF' }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm tracking-[0.3em] uppercase mb-4" style={{ color: '#8B0000' }}>A CodeHubMaster Collection</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
            THE ORWELL FILES
          </h1>
          <p className="text-xl md:text-2xl mb-4" style={{ fontFamily: 'Georgia, serif', color: '#ccc' }}>
            AI Automation
          </p>
          <p className="text-base md:text-lg max-w-2xl mx-auto mb-8" style={{ color: '#999', lineHeight: 1.8 }}>
            25 critical examinations of how artificial intelligence is changing work, power, and human judgment. In the tradition of George Orwell — clear language, honest observation, no jargon.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm" style={{ color: '#777' }}>
            <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> 25 Essays</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> ~30,000 Words</span>
            <span>12 Industries</span>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Search & Filter */}
        <div className="mb-10">
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#999' }} />
            <input
              type="text"
              placeholder="Search essays by title or keyword..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border text-base"
              style={{ borderColor: '#ddd', backgroundColor: '#fff', color: '#2D3436' }}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {orwellCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all"
                style={{
                  backgroundColor: selectedCategory === cat ? '#8B0000' : '#fff',
                  color: selectedCategory === cat ? '#fff' : '#2D3436',
                  border: `1px solid ${selectedCategory === cat ? '#8B0000' : '#ddd'}`,
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Table of Contents */}
        <nav className="mb-12 p-6 rounded-lg border" style={{ backgroundColor: '#fff', borderColor: '#e0e0e0' }}>
          <h2 className="text-xl font-bold mb-4" style={{ fontFamily: 'Georgia, serif', color: '#2D3436' }}>
            Table of Contents — {filteredStories.length} Essays
          </h2>
          <ol className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
            {filteredStories.map(story => (
              <li key={story.id}>
                <a
                  href={`#${story.id}`}
                  className="text-sm hover:underline flex items-start gap-2"
                  style={{ color: '#8B0000' }}
                >
                  <span className="font-bold min-w-[24px]">{story.number}.</span>
                  <span>{story.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Articles */}
        {filteredStories.map((story, idx) => (
          <article key={story.id} id={story.id} className="mb-12 scroll-mt-20">
            {/* Ad after every 5th article */}
            {idx > 0 && idx % 5 === 0 && <InArticleAd />}

            <div className="p-6 md:p-10 rounded-lg border" style={{ backgroundColor: '#fff', borderColor: '#e0e0e0' }}>
              {/* Header */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: '#8B0000', color: '#fff' }}>
                  {story.category}
                </span>
                <span className="flex items-center gap-1 text-xs" style={{ color: '#999' }}>
                  <Clock className="w-3 h-3" /> {story.readTime} min read
                </span>
                <span className="text-xs" style={{ color: '#999' }}>Essay #{story.number}</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: 'Georgia, serif', color: '#2D3436' }}>
                {story.title}
              </h2>
              <p className="text-xs mb-6 italic" style={{ color: '#999' }}>
                Keyword: {story.keyword}
              </p>

              {/* Content - show first section always, rest on expand */}
              <div style={{ fontFamily: 'Georgia, serif', color: '#2D3436', lineHeight: 1.9 }}>
                {story.sections.slice(0, expandedStory === story.id ? undefined : 2).map((section, sIdx) => (
                  <div key={sIdx} className="mb-6">
                    <h3 className="text-lg font-bold mb-3" style={{ color: '#8B0000' }}>{section.heading}.</h3>
                    {section.paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className="mb-4 text-base">{p}</p>
                    ))}
                  </div>
                ))}
              </div>

              {expandedStory !== story.id && story.sections.length > 2 && (
                <button
                  onClick={() => setExpandedStory(story.id)}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all hover:opacity-80"
                  style={{ backgroundColor: '#8B0000', color: '#fff' }}
                >
                  Read Full Essay <ArrowRight className="w-4 h-4" />
                </button>
              )}

              {expandedStory === story.id && (
                <div className="mt-6 pt-4 border-t flex justify-between items-center" style={{ borderColor: '#eee' }}>
                  <button
                    onClick={() => setExpandedStory(null)}
                    className="text-sm flex items-center gap-1"
                    style={{ color: '#8B0000' }}
                  >
                    Collapse Essay
                  </button>
                  <a href="#" className="text-sm flex items-center gap-1" style={{ color: '#999' }}>
                    <ChevronUp className="w-4 h-4" /> Back to top
                  </a>
                </div>
              )}
            </div>
          </article>
        ))}

        {/* Internal Links */}
        <section className="mt-16 p-8 rounded-lg border" style={{ backgroundColor: '#fff', borderColor: '#e0e0e0' }}>
          <h2 className="text-xl font-bold mb-6" style={{ fontFamily: 'Georgia, serif', color: '#2D3436' }}>
            Continue Reading
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link to="/" className="p-4 rounded-lg border hover:shadow-md transition-shadow" style={{ borderColor: '#e0e0e0' }}>
              <h3 className="font-bold text-sm" style={{ color: '#8B0000' }}>Home</h3>
              <p className="text-xs mt-1" style={{ color: '#999' }}>Explore CodeHubMaster</p>
            </Link>
            <Link to="/ai-tools-mega-guide-2025" className="p-4 rounded-lg border hover:shadow-md transition-shadow" style={{ borderColor: '#e0e0e0' }}>
              <h3 className="font-bold text-sm" style={{ color: '#8B0000' }}>AI Tools Mega Guide</h3>
              <p className="text-xs mt-1" style={{ color: '#999' }}>Complete 2025 tool directory</p>
            </Link>
            <Link to="/the-ai-age-25-stories" className="p-4 rounded-lg border hover:shadow-md transition-shadow" style={{ borderColor: '#e0e0e0' }}>
              <h3 className="font-bold text-sm" style={{ color: '#8B0000' }}>The AI Age: 25 Stories</h3>
              <p className="text-xs mt-1" style={{ color: '#999' }}>Hemingway-style AI stories</p>
            </Link>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-12 p-8 rounded-lg border" style={{ backgroundColor: '#fff', borderColor: '#e0e0e0' }}>
          <h2 className="text-xl font-bold mb-6" style={{ fontFamily: 'Georgia, serif', color: '#2D3436' }}>
            Frequently Asked Questions
          </h2>
          {faqData.map((faq, i) => (
            <div key={i} className="mb-6 pb-6 border-b last:border-0" style={{ borderColor: '#eee' }}>
              <h3 className="font-bold text-base mb-2" style={{ color: '#2D3436' }}>{faq.question}</h3>
              <p className="text-sm" style={{ color: '#666', lineHeight: 1.7 }}>{faq.answer}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default OrwellAiAutomation25;
