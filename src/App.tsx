/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { TwoPlayerHub } from './components/TwoPlayerHub';
import { ScoreCalculator } from './components/ScoreCalculator';
import { TieBreakerGuide } from './components/TieBreakerGuide';
import { SetupGuide } from './components/SetupGuide';
import { TurnFlowGuide } from './components/TurnFlowGuide';
import { ComponentsCatalog } from './components/ComponentsCatalog';
import { FaqSection } from './components/FaqSection';
import { UniversalSearchModal } from './components/UniversalSearchModal';
import { Rocket, Github, Heart, Globe, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('twoplayer');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {activeTab === 'twoplayer' && <TwoPlayerHub />}
        {activeTab === 'calculator' && <ScoreCalculator />}
        {activeTab === 'ties' && <TieBreakerGuide />}
        {activeTab === 'setup' && <SetupGuide />}
        {activeTab === 'turnflow' && <TurnFlowGuide />}
        {activeTab === 'faq' && <FaqSection />}
        {activeTab === 'components' && <ComponentsCatalog />}
      </main>

      {/* Universal Search Modal (Ctrl+K) */}
      <UniversalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectTab={(tab) => setActiveTab(tab)}
      />

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 mt-12 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Rocket className="w-4 h-4 text-amber-500" />
            <span className="font-mono text-slate-400">
              Galactic Cruise Companion • Napravljeno za Danijela & Cecu
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-400 font-mono">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Spreman za GitHub Pages
            </span>
            <span>•</span>
            <span>Training Manual v1.2.5</span>
          </div>
        </div>

        {/* GitHub Pages quick tip */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 pt-4 border-t border-slate-900/60 text-[11px] text-slate-600 flex flex-col sm:flex-row justify-between gap-2">
          <p>
            Za objavu na GitHub Pages: pokrenite <code className="bg-slate-900 px-1 py-0.5 rounded text-amber-400">npm run build</code> i postavite sadržaj <code className="bg-slate-900 px-1 py-0.5 rounded text-amber-400">dist/</code> foldera na vaš GitHub repozitorijum.
          </p>
          <p>
            Izdavač originalne igre: Kinson Key Games LLC © 2024.
          </p>
        </div>
      </footer>
    </div>
  );
}
