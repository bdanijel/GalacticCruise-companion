import React, { useState } from 'react';
import { Users2, Calculator, Rocket, HelpCircle, MoreHorizontal, Layers, Trophy, BookOpen, Search, GitBranch, X } from 'lucide-react';
import { ActiveTab } from './Navbar';

interface MobileBottomNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  openSearch: () => void;
  openDeployModal: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  openSearch,
  openDeployModal,
}) => {
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const mainTabs = [
    { id: 'twoplayer', label: '2P Vodič', icon: Users2 },
    { id: 'calculator', label: 'Kalkulator', icon: Calculator },
    { id: 'turnflow', label: 'Potez', icon: Rocket },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
  ] as const;

  const moreTabs = [
    { id: 'setup', label: 'Postavka Igre', icon: Layers, desc: 'Intro vs Standard i 2P specifičnosti' },
    { id: 'ties', label: 'Kraj & Nerešeno', icon: Trophy, desc: 'Pravila poslednje runde i 4 nivoa tie-breakera' },
    { id: 'components', label: 'Komponente & Ikone', icon: BookOpen, desc: 'Baza svih simbola, kabina i ekspanzija' },
  ] as const;

  const handleSelectTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    setIsMoreOpen(false);
  };

  return (
    <>
      {/* "More" Sheet Drawer on Mobile */}
      {isMoreOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex flex-col justify-end animate-fadeIn"
          onClick={() => setIsMoreOpen(false)}
        >
          <div
            className="bg-slate-900 border-t border-slate-800 rounded-t-3xl p-5 pb-8 space-y-4 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sheet Handle */}
            <div className="w-12 h-1.5 bg-slate-700 rounded-full mx-auto -mt-1 mb-2" />

            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="font-['Space_Grotesk'] font-bold text-base text-slate-100">
                Dodatni Vodiči & Alati
              </h3>
              <button
                onClick={() => setIsMoreOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {moreTabs.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectTab(item.id as ActiveTab)}
                    className={`flex items-center gap-3.5 p-3 rounded-xl border text-left transition-colors ${
                      isActive
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-slate-950/80 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center shrink-0 border border-slate-700/60">
                      <Icon className={`w-5 h-5 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-slate-100">{item.label}</div>
                      <div className="text-[11px] text-slate-400">{item.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick Actions in More drawer */}
            <div className="pt-2 border-t border-slate-800 flex gap-2">
              <button
                onClick={() => {
                  setIsMoreOpen(false);
                  openSearch();
                }}
                className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 border border-slate-700"
              >
                <Search className="w-4 h-4 text-amber-400" />
                <span>Pretraži (Ctrl+K)</span>
              </button>
              <button
                onClick={() => {
                  setIsMoreOpen(false);
                  openDeployModal();
                }}
                className="flex-1 py-2.5 px-3 rounded-xl bg-amber-500/10 text-amber-300 text-xs font-semibold flex items-center justify-center gap-2 border border-amber-500/30"
              >
                <GitBranch className="w-4 h-4 text-amber-400" />
                <span>GitHub Publish</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Persistent Bottom Bar on Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800/80 px-2 py-1.5 shadow-2xl safe-area-bottom">
        <div className="flex items-center justify-around">
          {mainTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleSelectTab(tab.id as ActiveTab)}
                className={`flex flex-col items-center justify-center py-1 px-2.5 min-w-[58px] rounded-xl transition-all ${
                  isActive
                    ? 'text-amber-400 bg-amber-500/10 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                <span className="text-[10px] tracking-tight mt-0.5 font-medium">{tab.label}</span>
              </button>
            );
          })}

          {/* More button */}
          <button
            onClick={() => setIsMoreOpen(true)}
            className={`flex flex-col items-center justify-center py-1 px-2.5 min-w-[58px] rounded-xl transition-all ${
              ['setup', 'ties', 'components'].includes(activeTab)
                ? 'text-amber-400 bg-amber-500/10 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <MoreHorizontal className="w-5 h-5" />
            <span className="text-[10px] tracking-tight mt-0.5 font-medium">Više</span>
          </button>
        </div>
      </div>
    </>
  );
};
