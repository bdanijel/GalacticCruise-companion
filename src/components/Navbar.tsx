import React from 'react';
import { Rocket, Calculator, Users2, HelpCircle, BookOpen, Layers, Trophy, Search } from 'lucide-react';

export type ActiveTab = 'twoplayer' | 'calculator' | 'ties' | 'setup' | 'turnflow' | 'faq' | 'components' | 'search';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  openSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, openSearch }) => {
  const navItems = [
    { id: 'twoplayer', label: '2P Vodič (Danijel & Ceca)', icon: Users2, highlight: true },
    { id: 'calculator', label: 'Kalkulator Bodova (AGM)', icon: Calculator, badge: 'AGM A/B/C' },
    { id: 'ties', label: 'Kraj & Nerešeno', icon: Trophy },
    { id: 'setup', label: 'Postavka Igre', icon: Layers },
    { id: 'turnflow', label: 'Potez & Lansiranje', icon: Rocket },
    { id: 'faq', label: 'FAQ & Nedoumice', icon: HelpCircle },
    { id: 'components', label: 'Komponente & Ikone', icon: BookOpen },
  ] as const;

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-amber-500/20 shadow-2xl shadow-amber-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Game Title */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('twoplayer')}>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-amber-500 via-orange-600 to-rose-600 p-[2px] shadow-lg shadow-orange-500/30 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Rocket className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 rotate-45 transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-['Space_Grotesk'] text-lg sm:text-xl font-bold tracking-wider text-slate-100 uppercase">
                  Galactic <span className="text-amber-400">Cruise</span>
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono tracking-widest uppercase bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded">
                  v1.2.5 Companion
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Digitalni vodič za Danijela & Cecu • Kalkulator & Pravila
              </p>
            </div>
          </div>

          {/* Quick Search Button */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={openSearch}
              className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-slate-300 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 hover:border-amber-500/50 rounded-lg transition-all shadow-sm"
              title="Brza pretraga svih pravila i komponenti"
            >
              <Search className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Pretraži pravila...</span>
              <kbd className="hidden md:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-800 border border-slate-700 rounded">
                Ctrl+K
              </kbd>
            </button>
          </div>
        </div>

        {/* Tab Navigation Row */}
        <nav className="flex space-x-1 overflow-x-auto pb-2 pt-1 no-scrollbar border-t border-slate-800/80">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as ActiveTab)}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium whitespace-nowrap rounded-lg transition-all duration-150 ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/40 shadow-sm shadow-amber-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                <span>{item.label}</span>
                {'badge' in item && item.badge && (
                  <span className="ml-1 px-1.5 py-0.2 text-[9px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded">
                    {item.badge}
                  </span>
                )}
                {'highlight' in item && item.highlight && (
                  <span className="ml-1 w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
