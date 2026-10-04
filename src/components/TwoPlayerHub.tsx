import React, { useState } from 'react';
import { Users2, ShieldAlert, Sparkles, ArrowRight, RotateCw, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { TWO_PLAYER_DETAILS } from '../data/galacticCruiseData';
import { NpcBumpingSimulator } from './NpcBumpingSimulator';

export const TwoPlayerHub: React.FC = () => {
  // Simulator is hidden by default per user request. Can be toggled back easily.
  const [showSimulator, setShowSimulator] = useState(false);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero 2-Player Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/40 border border-amber-500/30 p-6 sm:p-8 shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-mono mb-3">
              <Users2 className="w-3.5 h-3.5" />
              <span>SPECIJALNI 2-PLAYER MODUL ZA DVOJE</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold font-['Space_Grotesk'] text-slate-100 tracking-tight">
              Danijel <span className="text-yellow-400">● Žuti</span> vs Ceca <span className="text-rose-400">● Crvena</span>
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Kompletan vodič za igru u 2 igrača sa NPC konkurentom: rotacija u smeru kazaljke, lančano izguravanje (bumping),
              napredni eksperti i posebna pravila za godišnje sastanke (AGM A & B).
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-3">
            <div className="flex-1 bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-3 text-center min-w-[130px]">
              <span className="text-xs uppercase font-mono text-yellow-300 block">Igrač 1</span>
              <span className="text-base font-bold text-yellow-400 font-['Space_Grotesk']">Danijel</span>
              <span className="text-[11px] text-slate-400 block mt-0.5">Žuti set (Yellow)</span>
            </div>
            <div className="flex-1 bg-rose-500/10 border border-rose-500/30 rounded-xl p-3 text-center min-w-[130px]">
              <span className="text-xs uppercase font-mono text-rose-300 block">Igrač 2</span>
              <span className="text-base font-bold text-rose-400 font-['Space_Grotesk']">Ceca</span>
              <span className="text-[11px] text-slate-400 block mt-0.5">Crveni set (Red)</span>
            </div>
            <div className="flex-1 bg-slate-800/80 border border-slate-700 rounded-xl p-3 text-center min-w-[130px]">
              <span className="text-xs uppercase font-mono text-sky-300 block">Rival (NPC)</span>
              <span className="text-base font-bold text-sky-400 font-['Space_Grotesk']">Plavi / Sivi</span>
              <span className="text-[11px] text-slate-400 block mt-0.5">Auto-Bump Mehanika</span>
            </div>
          </div>
        </div>

        {/* Optional discrete toggle to show simulator if needed */}
        <div className="mt-5 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400">
            Pravila kretanja NPC radnika: smer kazaljke na satu (1 ➔ 2 ➔ 3 ➔ 4 ➔ 5 ➔ 6 ➔ 1).
          </span>
          <button
            onClick={() => setShowSimulator(!showSimulator)}
            className="text-slate-400 hover:text-amber-300 transition-colors flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-950/60 border border-slate-800"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>{showSimulator ? 'Sakrij NPC Simulator' : 'Prikaži NPC Simulator (opciono)'}</span>
            {showSimulator ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Conditionally rendered simulator - hidden by default */}
      {showSimulator && <NpcBumpingSimulator />}

      {/* 2-Player Crucial Setup Checklist */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold font-['Space_Grotesk'] text-slate-100">
              Obavezne Izmene za 2 Igrača (Pravilnik str. 34)
            </h3>
          </div>
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-100">Oba Marketing Overlay-a:</strong> Pokrijte donja dva mesta za krstarenja na Marketing tabli (u igri su uvek samo 4 krstarenja).
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-100">Company Goal počinje na SREDINI:</strong> Markeri za 3 cilja kompanije stavljaju se na SREDNJA polja, umesto na najdonja polja!
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-100">Samo 1 Neutralna Kocka u Sekciju 2:</strong> Ako igrate Intro varijantu, stavlja se samo 1 neutralna kocka u sekciju 2 Progress trake (u 1 i 3 nema ništa).
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-100">Tehnologije se čuvaju:</strong> Neiskorišćene pločice tehnologija se NE vraćaju u kutiju već ostaju licem nadole pored table za AGM A i B!
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-100">Najmanje 7 gostiju u redu:</strong> Ako 4 krstarenja daju manje od 7 gostiju, dodajte po 1 gosta svake boje dok ne dostignete 7.
              </div>
            </li>
          </ul>
        </div>

        {/* AGM A and AGM B Extra 2P Steps */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold font-['Space_Grotesk'] text-slate-100">
              AGM A & AGM B: Dodatni NPC Koraci (str. 35)
            </h3>
          </div>
          <div className="space-y-4 text-sm text-slate-300">
            <p className="text-xs text-slate-400">
              Čim se popuni poslednja kockica u Sekciji 1 (AGM A) ili Sekciji 2 (AGM B), odigrajte regularno bodovanje te sekcije, a zatim izvršite ova dva obavezna koraka:
            </p>

            <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs font-mono uppercase mb-1">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                Korak 1: Build NPC Developments
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Promešajte sačuvane pločice Tehnologija i otkrijte jednu licem nagore. Pogledajte grafiku za <strong>2-player igru</strong> i postavite 1 NPC zgradu (iz rezerve od 6 NPC zgrada) na svaku prikazanu lokaciju, pokrivajući ikonu Reputacije ako je slobodna. (Ako NPC već ima zgradu tu, preskače se i zgrada se odbacuje). Zatim tu Tehnologiju vratite u kutiju.
              </p>
            </div>

            <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2 text-purple-300 font-semibold text-xs font-mono uppercase mb-1">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                Korak 2: Hire NPC Expert (Promocija u Experta)
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>Nakon AGM A:</strong> Zamenite 1 regularnog NPC radnika sa NPC Expert radnikom (onog koji je najbliži lokaciji 1 / gornjoj srednjoj u smeru kazaljke). Regularni se vraća u kutiju.<br />
                <strong>Nakon AGM B:</strong> Zamenite i drugog preostalog regularnog NPC radnika sa drugim NPC Expertom! Od tog trenutka oba NPC-a preskaču prazna polja kada se izguraju!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Rules Breakdown Accordion / Cards */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold font-['Space_Grotesk'] text-slate-100 flex items-center gap-2">
          <Users2 className="w-5 h-5 text-amber-400" />
          Kompletna pravila za 2 igrača (Danijel & Ceca)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TWO_PLAYER_DETAILS.rules.map((rule, idx) => (
            <div key={idx} className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors">
              <h4 className="text-base font-bold text-amber-300 mb-3 flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-amber-400" />
                {rule.title}
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                {rule.points.map((pt, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
