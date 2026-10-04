import React, { useState } from 'react';
import { BookOpen, Layers, Sparkles, Filter, Search, ArrowUpRight, ShieldCheck, Compass } from 'lucide-react';
import { ICON_GLOSSARY, COMPONENTS_CATALOG, IconItem } from '../data/galacticCruiseData';

export const ComponentsCatalog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'icons' | 'components' | 'anatomy' | 'expansions'>('icons');

  const filteredIcons = ICON_GLOSSARY.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredComponents = COMPONENTS_CATALOG.filter((comp) => {
    const term = searchTerm.toLowerCase();
    return (
      comp.name.toLowerCase().includes(term) ||
      comp.serbianName.toLowerCase().includes(term) ||
      comp.description.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950/20 to-slate-900 border border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-mono mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          <span>REFERENTNI KATALOG & BAZA IKONA</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-['Space_Grotesk'] text-slate-100">
          Katalog Svih Komponenti, Značenja Ikona i Anatomije Broda
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
          Detaljna enciklopedija simbola, komponenata, kabina, motora i ekspanzija kako tokom partije ne bi bilo nikakvih nedoumica.
        </p>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-slate-800">
          {[
            { id: 'icons', label: 'Baza Ikona & Simbola' },
            { id: 'components', label: 'Komponente Table & Zaliha' },
            { id: 'anatomy', label: 'Anatomija Broda & Kabina' },
            { id: 'expansions', label: 'Ekspanzije (Advancements & Accommodations)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input & Category Filters */}
      {(activeTab === 'icons' || activeTab === 'components') && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
            <input
              type="text"
              placeholder="Pretraži ikone ili komponente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-750 rounded-lg pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-amber-500"
            />
          </div>

          {activeTab === 'icons' && (
            <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
              {[
                { id: 'all', label: 'Sve' },
                { id: 'resources', label: 'Resursi' },
                { id: 'funding', label: 'Novac & Bonusi' },
                { id: 'guests', label: 'Destinacije & Gosti' },
                { id: 'scoring', label: 'Bodovanje & Penali' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-2.5 py-1 text-xs rounded-lg transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ICONS TAB */}
      {activeTab === 'icons' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredIcons.map((icon) => (
            <div
              key={icon.id}
              className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 hover:border-amber-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl p-2 rounded-lg bg-slate-950 border border-slate-800 shrink-0">
                      {icon.symbol}
                    </span>
                    <div>
                      <h4 className="font-bold text-sm text-slate-100 font-['Space_Grotesk']">
                        {icon.name}
                      </h4>
                      <span className="text-[10px] font-mono text-amber-400/80 uppercase">
                        {icon.category}
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">str. {icon.rulePage}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  {icon.description}
                </p>
              </div>
              <div className="text-[10px] font-mono text-slate-400 bg-slate-950 p-2 rounded border border-slate-850">
                Gde se koristi: {icon.whereUsed}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* COMPONENTS CATALOG */}
      {activeTab === 'components' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredComponents.map((comp) => (
            <div
              key={comp.id}
              className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-bold text-base text-slate-100 font-['Space_Grotesk']">
                    {comp.serbianName} <span className="text-xs text-amber-400 font-normal">({comp.name})</span>
                  </h3>
                  <span className="text-xs font-mono text-slate-400">{comp.quantity}</span>
                </div>
                <span className="text-xs font-mono text-slate-500">Pravilnik str. {comp.pageRef}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-2">
                {comp.description}
              </p>
              {comp.anatomyNotes && (
                <ul className="mt-3 space-y-1 text-xs text-amber-300/90 font-mono bg-slate-950 p-2.5 rounded border border-slate-850">
                  {comp.anatomyNotes.map((note, nIdx) => (
                    <li key={nIdx}>• {note}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* SHIP ANATOMY TAB */}
      {activeTab === 'anatomy' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <h2 className="text-xl font-bold font-['Space_Grotesk'] text-slate-100 flex items-center gap-2">
            <Compass className="w-5 h-5 text-amber-400" />
            Anatomija Konstrukcije Svemirskog Broda
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Cockpit */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-amber-400 font-bold font-['Space_Grotesk']">
                <span>1. COCKPIT (Vrh)</span>
                <span className="text-xs font-mono text-rose-400">-5 VP Kazna</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Početna strana prikazuje <strong>-5 VP penal</strong> i specifičan uslov bodovanja tog broda (npr. bodovi po segmentima, po ekspertima ili zgradama).
              </p>
              <div className="p-2.5 rounded bg-emerald-950/30 border border-emerald-500/30 text-emerald-200 text-xs">
                <strong>Prvo lansiranje:</strong> Cockpit se okreće na naličje, trajno briše -5 VP i stvara mesto za Pilota!
              </div>
            </div>

            {/* Segments & Cabins */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-amber-400 font-bold font-['Space_Grotesk']">
                <span>2. SEGMENTI & KABINE</span>
                <span className="text-xs font-mono text-sky-400">Plavi VP</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Nacrti (Blueprints) se pretvaraju u Segmente kada se ugrade. Svaki segment na vrhu i dnu ima <strong>polovinu kabine</strong>.
              </p>
              <div className="p-2.5 rounded bg-sky-950/30 border border-sky-500/30 text-sky-200 text-xs">
                <strong>Spajanje:</strong> 2 segmenta stvaraju 1 kabinu za 1 gosta. Brod od 3 segmenta ima 2 pune kabine za 2 gosta!
              </div>
            </div>

            {/* Engine */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-amber-400 font-bold font-['Space_Grotesk']">
                <span>3. MOTOR (Engine)</span>
                <span className="text-xs font-mono text-amber-400">Bonus & Upgrade</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Kada se uzme u flotu, donosi trenutan bonus sa prednje strane (novac, resursi, reklame). Zatim se okreće na stranu sa ležištem.
              </p>
              <div className="p-2.5 rounded bg-amber-950/30 border border-amber-500/30 text-amber-200 text-xs">
                <strong>Upgrade Token:</strong> Prilikom lansiranja na motor se stavlja Upgrade token koji putuje na destinaciju!
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EXPANSIONS TAB */}
      {activeTab === 'expansions' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
            <h3 className="text-lg font-bold font-['Space_Grotesk'] text-amber-400">
              Ekspanzija 1: Advancements (str. 44-45)
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              <li>• <strong>Cabin-Matching modul:</strong> Polovine kabina su na levoj, srednjoj ili desnoj poziciji. Moraju se savršeno poklopiti pri ugradnji!</li>
              <li>• <strong>Advanced Technologies modul:</strong> Tehnologije dobijaju treker traku. Korišćenjem postaju moćnije, ali i skuplje za plaćanje!</li>
              <li>• <strong>Location Bonus Tokens:</strong> Polja na tabli dobijaju dodatne bonuse kada se na njih nakupi dovoljno zgrada.</li>
            </ul>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
            <h3 className="text-lg font-bold font-['Space_Grotesk'] text-amber-400">
              Ekspanzija 2: Accommodations (str. 46-47)
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              <li>• <strong>Specialized Blueprints:</strong> Segmenti dobijaju jedinstvene akcije koje se aktiviraju tokom Dana u Svemiru (Day in Space).</li>
              <li>• <strong>Starting Upgrade Cards:</strong> Igrači na samom početku partije dobijaju 1 otključan Upgrade sa posebnim prednostima.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
