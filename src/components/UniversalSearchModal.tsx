import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, BookOpen, Layers, Users2, HelpCircle, Trophy, Rocket } from 'lucide-react';
import { FAQ_DATA, SETUP_STEPS, NETWORK_ACTIONS, ICON_GLOSSARY, COMPONENTS_CATALOG } from '../data/galacticCruiseData';

interface SearchResult {
  id: string;
  type: 'faq' | 'setup' | 'action' | 'icon' | 'component' | 'tie';
  title: string;
  snippet: string;
  category: string;
  pageRef?: number;
  tabTarget: 'twoplayer' | 'calculator' | 'ties' | 'setup' | 'turnflow' | 'faq' | 'components';
}

interface UniversalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: any) => void;
}

export const UniversalSearchModal: React.FC<UniversalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectTab,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled by parent or custom event
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  // Aggregate search results
  let results: SearchResult[] = [];

  if (q.length > 0) {
    // 1. FAQs
    FAQ_DATA.forEach((faq) => {
      if (
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q) ||
        faq.keywords.some((k) => k.toLowerCase().includes(q))
      ) {
        results.push({
          id: faq.id,
          type: 'faq',
          title: faq.question,
          snippet: faq.answer.slice(0, 140) + '...',
          category: 'FAQ / Pravila',
          pageRef: faq.rulePage,
          tabTarget: 'faq',
        });
      }
    });

    // 2. Network Actions
    NETWORK_ACTIONS.forEach((act, idx) => {
      if (
        act.name.toLowerCase().includes(q) ||
        act.description.toLowerCase().includes(q)
      ) {
        results.push({
          id: `act-${idx}`,
          type: 'action',
          title: act.name,
          snippet: act.description,
          category: 'Akcija Mreže',
          pageRef: act.pageRef,
          tabTarget: 'turnflow',
        });
      }
    });

    // 3. Icons
    ICON_GLOSSARY.forEach((ic) => {
      if (
        ic.name.toLowerCase().includes(q) ||
        ic.description.toLowerCase().includes(q) ||
        ic.whereUsed.toLowerCase().includes(q)
      ) {
        results.push({
          id: ic.id,
          type: 'icon',
          title: `${ic.symbol} ${ic.name}`,
          snippet: ic.description,
          category: 'Baza Ikona',
          pageRef: ic.rulePage,
          tabTarget: 'components',
        });
      }
    });

    // 4. Setup Steps
    SETUP_STEPS.forEach((s) => {
      if (
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        (s.twoPlayerNote && s.twoPlayerNote.toLowerCase().includes(q))
      ) {
        results.push({
          id: s.id,
          type: 'setup',
          title: `Korak #${s.stepNumber}: ${s.title}`,
          snippet: s.description,
          category: 'Postavka Igre',
          pageRef: s.pageRef,
          tabTarget: 'setup',
        });
      }
    });

    // 5. Components
    COMPONENTS_CATALOG.forEach((comp) => {
      if (
        comp.name.toLowerCase().includes(q) ||
        comp.serbianName.toLowerCase().includes(q) ||
        comp.description.toLowerCase().includes(q)
      ) {
        results.push({
          id: comp.id,
          type: 'component',
          title: `${comp.serbianName} (${comp.name})`,
          snippet: comp.description,
          category: 'Komponenta',
          pageRef: comp.pageRef,
          tabTarget: 'components',
        });
      }
    });

    // 6. Tie-breaker match
    if (
      'nerešeno'.includes(q) ||
      'tie'.includes(q) ||
      'kraj'.includes(q) ||
      'ceo'.includes(q) ||
      'pobednik'.includes(q)
    ) {
      results.push({
        id: 'tie-search',
        type: 'tie',
        title: 'Nerešen Rezultat (Tie-Breaker Hierarchy)',
        snippet: '1. Progress Kocke ➔ 2. Veća Reputacija ➔ 3. Cockpit Bodovi ➔ 4. Kasniji igrač u redosledu!',
        category: 'Kraj & Nerešeno',
        pageRef: 32,
        tabTarget: 'ties',
      });
    }
  }

  const handleResultClick = (target: any) => {
    onSelectTab(target);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div
        className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3 bg-slate-950">
          <Search className="w-5 h-5 text-amber-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Pretraži pravila, FAQ, ikone, komponente, akcije, 2P pravila..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-sm sm:text-base focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-slate-400 hover:text-slate-200">
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-mono text-slate-400 hover:text-slate-200 px-2 py-1 bg-slate-800 rounded"
          >
            ESC
          </button>
        </div>

        {/* Results Body */}
        <div className="overflow-y-auto p-4 space-y-2 divide-y divide-slate-800/60">
          {q.length === 0 ? (
            <div className="p-6 text-center text-slate-400 text-xs sm:text-sm space-y-2">
              <p>Unesite ključnu reč za brzu pretragu kroz ceo pravilnik Galactic Cruise.</p>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                {['bumping', 'danijel', 'ceca', 'nerešeno', 'lansiranje', 'sastanak', 'reputacija', 'kabine', 'kazna -5'].map(
                  (tag) => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="px-2.5 py-1 text-xs font-mono rounded bg-slate-950 border border-slate-800 text-amber-300 hover:border-amber-500/40"
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-sm">
              Nema pronađenih rezultata za pojam "{query}".
            </div>
          ) : (
            results.slice(0, 15).map((res) => (
              <div
                key={res.id}
                onClick={() => handleResultClick(res.tabTarget)}
                className="pt-2 pb-2 px-3 rounded-lg hover:bg-slate-800/80 cursor-pointer transition-colors group flex items-start justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                      {res.category}
                    </span>
                    <h4 className="font-bold text-sm text-slate-100 group-hover:text-amber-300 transition-colors">
                      {res.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {res.snippet}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-slate-500 group-hover:text-amber-400 shrink-0 mt-1 text-xs">
                  {res.pageRef && <span className="font-mono text-[11px]">str. {res.pageRef}</span>}
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
