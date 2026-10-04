import React, { useState } from 'react';
import { Layers, CheckCircle2, Circle, AlertCircle, Sparkles, Filter, Bookmark, Info } from 'lucide-react';
import { SETUP_STEPS } from '../data/galacticCruiseData';

export const SetupGuide: React.FC = () => {
  const [filterMode, setFilterMode] = useState<'all' | 'twoPlayer' | 'playerBoard'>('all');
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  const toggleStep = (id: string) => {
    setCompletedSteps((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const markAll = () => {
    const all: Record<string, boolean> = {};
    SETUP_STEPS.forEach((s) => (all[s.id] = true));
    setCompletedSteps(all);
  };

  const resetAll = () => {
    setCompletedSteps({});
  };

  const filteredSteps = SETUP_STEPS.filter((step) => {
    if (filterMode === 'twoPlayer') return !!step.twoPlayerNote;
    if (filterMode === 'playerBoard') return step.category === 'player';
    return true;
  });

  const totalCompleted = Object.values(completedSteps).filter(Boolean).length;
  const progressPct = Math.round((totalCompleted / SETUP_STEPS.length) * 100);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950/20 to-slate-900 border border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-mono mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>INTERAKTIVNA POSTAVKA IGRE</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-['Space_Grotesk'] text-slate-100">
              Vodič za Postavljanje Table & Komponenti
            </h1>
            <p className="mt-1 text-sm text-slate-300 max-w-xl">
              Pratite korak po korak od kutije do prvog poteza, uz istaknute specifične korake za igru u dvoje za Danijela i Cecu.
            </p>
          </div>

          {/* Progress Bar & Actions */}
          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 min-w-[240px]">
            <div className="flex justify-between items-center text-xs font-mono text-slate-300 mb-2">
              <span>Status Postavke:</span>
              <span className="text-amber-400 font-bold">{progressPct}% ({totalCompleted}/{SETUP_STEPS.length})</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <div className="flex gap-2 mt-3">
              <button
                onClick={markAll}
                className="text-[11px] font-mono text-slate-400 hover:text-slate-200 underline"
              >
                Označi sve
              </button>
              <span className="text-slate-600">•</span>
              <button
                onClick={resetAll}
                className="text-[11px] font-mono text-slate-400 hover:text-slate-200 underline"
              >
                Resetuj
              </button>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-slate-800">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filterMode === 'all'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Svi Koraci Postavke ({SETUP_STEPS.length})
          </button>
          <button
            onClick={() => setFilterMode('twoPlayer')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              filterMode === 'twoPlayer'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-slate-800 text-amber-300 hover:bg-slate-700 border border-amber-500/30'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Samo 2-Player Izmene (Danijel & Ceca)
          </button>
          <button
            onClick={() => setFilterMode('playerBoard')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filterMode === 'playerBoard'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Priprema Tabli Igrača
          </button>
        </div>
      </div>

      {/* Intro vs Standard Note Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex gap-3 text-xs sm:text-sm text-slate-300">
          <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-100 block mb-1">Intro vs Standardna Igra:</strong>
            Za prve partije toplo se preporučuje <strong>Intro strana</strong> table gde su lokacije i početne akcije odštampane na samoj tabli. Za Standardnu igru (strana sa praznim poljima) Action pločice i Tehnologije se nasumično raspoređuju.
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex gap-3 text-xs sm:text-sm text-slate-300">
          <Bookmark className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-100 block mb-1">Pre-Game Potez (Korak 13):</strong>
            Pre prvog regularnog poteza, u obrnutom redosledu poteza (drugi igrač, pa prvi): svako stavlja 1 besplatan Development iz leve kolone u Mrežu (+1 Reputaciju) i uzima 1 Blueprint besplatno!
          </div>
        </div>
      </div>

      {/* Setup Step Cards */}
      <div className="space-y-4">
        {filteredSteps.map((step) => {
          const isDone = completedSteps[step.id];

          return (
            <div
              key={step.id}
              onClick={() => toggleStep(step.id)}
              className={`p-5 rounded-xl border transition-all cursor-pointer select-none ${
                isDone
                  ? 'bg-slate-950/40 border-slate-850 opacity-75'
                  : 'bg-slate-900/90 border-slate-800 hover:border-amber-500/50 shadow-md'
              }`}
            >
              <div className="flex items-start gap-4">
                <button
                  type="button"
                  className={`mt-1 w-6 h-6 rounded-lg flex items-center justify-center transition-colors shrink-0 ${
                    isDone ? 'bg-amber-500 text-slate-950' : 'border border-slate-700 text-slate-500 hover:border-slate-500'
                  }`}
                >
                  {isDone ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                </button>

                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700">
                        KORAK #{step.stepNumber}
                      </span>
                      <h3
                        className={`text-base font-bold font-['Space_Grotesk'] ${
                          isDone ? 'line-through text-slate-400' : 'text-slate-100'
                        }`}
                      >
                        {step.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      {step.highlight && (
                        <span className="px-2 py-0.5 text-[10px] font-mono uppercase bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded">
                          {step.highlight}
                        </span>
                      )}
                      <span className="text-[11px] font-mono text-slate-500">
                        Pravilnik str. {step.pageRef}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {step.description}
                  </p>

                  {step.twoPlayerNote && (
                    <div className="mt-2.5 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-yellow-200 text-xs flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                      <div>
                        <strong>PAŽNJA ZA 2 IGRAČA (Danijel & Ceca):</strong> {step.twoPlayerNote}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
