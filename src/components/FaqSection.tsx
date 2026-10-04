import React, { useState } from 'react';
import { HelpCircle, Search, Sparkles, ExternalLink, Bookmark, MessageSquare, ChevronDown } from 'lucide-react';
import { FAQ_DATA, FaqItem } from '../data/galacticCruiseData';

export const FaqSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedFaq, setExpandedFaq] = useState<Record<string, boolean>>({
    'faq-1': true,
    'faq-7': true,
    'faq-11': true,
  });

  const toggleFaq = (id: string) => {
    setExpandedFaq((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredFaqs = FAQ_DATA.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      item.question.toLowerCase().includes(q) ||
      item.answer.toLowerCase().includes(q) ||
      item.keywords.some((k) => k.toLowerCase().includes(q));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950/20 to-slate-900 border border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-mono mb-2">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>ČESTO POSTAVLJANA PITANJA & NEDOUMICE OKO PRAVILA</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-['Space_Grotesk'] text-slate-100">
              Pravilnik: Razjašnjenja & Granični Slučajevi (Edge Cases)
            </h1>
            <p className="mt-1 text-sm text-slate-300 max-w-xl">
              Brzi odgovori na sve sporne situacije tokom igre, od ponašanja NPC radnika u dvoje do specifičnih karata i prekoračenja resursa.
            </p>
          </div>

          {/* Quick external links */}
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            <a
              href="https://boardgamegeek.com/boardgame/384705/galactic-cruise/forums/67"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-950 hover:bg-slate-800 text-amber-400 border border-amber-500/30 rounded-lg transition-colors"
            >
              <span>BGG Forum Pravila</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-950 hover:bg-slate-800 text-sky-400 border border-sky-500/30 rounded-lg transition-colors"
            >
              <span>Discord Zajednica</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Search bar & Category filters */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
            <input
              type="text"
              placeholder="Pretraži pitanja, reči kao 'sastanak', 'bumping', 'reputacija', 'last-minute'..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-750 rounded-lg pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'all', label: 'Sve' },
              { id: 'npc', label: '2P & NPC' },
              { id: 'turn', label: 'Potez & Akcije' },
              { id: 'launch', label: 'Lansiranje' },
              { id: 'scoring', label: 'Bodovanje & Kraj' },
              { id: 'reputation', label: 'Reputacija' },
              { id: 'cards', label: 'Agenda Karte' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="p-8 text-center bg-slate-900 border border-slate-800 rounded-xl text-slate-400">
            Nema rezultata za pretragu "{searchQuery}". Pokušajte sa drugim pojmom ili otvorite kategoriju "Sve".
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = expandedFaq[faq.id] ?? false;

            return (
              <div
                key={faq.id}
                className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden transition-colors hover:border-slate-700"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-4 focus:outline-none"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-amber-400 font-mono font-bold text-sm shrink-0 mt-0.5">
                      Q:
                    </span>
                    <div>
                      <h3 className="font-bold text-sm sm:text-base text-slate-100 font-['Space_Grotesk'] leading-snug">
                        {faq.question}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1.5">
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                          {faq.category}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">
                          Pravilnik str. {faq.rulePage}
                        </span>
                      </div>
                    </div>
                  </div>

                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 mt-1 ${
                      isOpen ? 'rotate-180 text-amber-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 bg-slate-950/40">
                    <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-850 space-y-2">
                      <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase">
                        <span>Zvanično Pravilo & Rešenje:</span>
                      </div>
                      <p className="text-slate-200">{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
