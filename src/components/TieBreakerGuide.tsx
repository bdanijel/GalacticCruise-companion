import React, { useState } from 'react';
import { Trophy, Scale, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, Sparkles, HelpCircle } from 'lucide-react';
import { TIE_BREAKER_RULES } from '../data/galacticCruiseData';

export const TieBreakerGuide: React.FC = () => {
  // Mini interactive tie tester
  const [p1Name, setP1Name] = useState('Danijel (Žuti)');
  const [p2Name, setP2Name] = useState('Ceca (Crvena)');
  const [p1Score, setP1Score] = useState(140);
  const [p2Score, setP2Score] = useState(140);
  const [p1Cubes, setP1Cubes] = useState(7);
  const [p2Cubes, setP2Cubes] = useState(7);
  const [p1Rep, setP1Rep] = useState(15);
  const [p2Rep, setP2Rep] = useState(16);
  const [p1Cockpit, setP1Cockpit] = useState(14);
  const [p2Cockpit, setP2Cockpit] = useState(14);
  const [p1Order, setP1Order] = useState(1);
  const [p2Order, setP2Order] = useState(2);

  // Evaluate tie
  let outcome = '';
  let winningPlayer = '';
  let stepUsed = 0;

  if (p1Score > p2Score) {
    winningPlayer = p1Name;
    outcome = `${p1Name} pobeđuje sa više bodova (${p1Score} vs ${p2Score} VP)!`;
  } else if (p2Score > p1Score) {
    winningPlayer = p2Name;
    outcome = `${p2Name} pobeđuje sa više bodova (${p2Score} vs ${p1Score} VP)!`;
  } else {
    // Exact tie! Run rules
    if (p1Cubes > p2Cubes) {
      winningPlayer = p1Name;
      stepUsed = 1;
      outcome = `Kriterijum #1 (Progress Kocke): ${p1Name} pobeđuje jer ima ${p1Cubes} kockica na traci naspram ${p2Cubes}!`;
    } else if (p2Cubes > p1Cubes) {
      winningPlayer = p2Name;
      stepUsed = 1;
      outcome = `Kriterijum #1 (Progress Kocke): ${p2Name} pobeđuje jer ima ${p2Cubes} kockica na traci naspram ${p1Cubes}!`;
    } else if (p1Rep > p2Rep) {
      winningPlayer = p1Name;
      stepUsed = 2;
      outcome = `Kriterijum #2 (Reputacija): Kocke su jednake (${p1Cubes}). ${p1Name} pobeđuje jer ima Reputaciju ${p1Rep} naspram ${p2Rep}!`;
    } else if (p2Rep > p1Rep) {
      winningPlayer = p2Name;
      stepUsed = 2;
      outcome = `Kriterijum #2 (Reputacija): Kocke su jednake (${p1Cubes}). ${p2Name} pobeđuje jer ima Reputaciju ${p2Rep} naspram ${p1Rep}!`;
    } else if (p1Cockpit > p2Cockpit) {
      winningPlayer = p1Name;
      stepUsed = 3;
      outcome = `Kriterijum #3 (Cockpit Bodovi): Kocke i reputacija su jednaki. ${p1Name} pobeđuje jer ima ${p1Cockpit} VP sa Cockpita naspram ${p2Cockpit}!`;
    } else if (p2Cockpit > p1Cockpit) {
      winningPlayer = p2Name;
      stepUsed = 3;
      outcome = `Kriterijum #3 (Cockpit Bodovi): Kocke i reputacija su jednaki. ${p2Name} pobeđuje jer ima ${p2Cockpit} VP sa Cockpita naspram ${p1Cockpit}!`;
    } else {
      stepUsed = 4;
      if (p2Order > p1Order) {
        winningPlayer = p2Name;
        outcome = `Kriterijum #4 (Redosled Poteza): Sve prethodno je potpuno identično! ${p2Name} pobeđuje jer je bio KASNIJI u redosledu poteza na početku (Pozicija #${p2Order})!`;
      } else {
        winningPlayer = p1Name;
        outcome = `Kriterijum #4 (Redosled Poteza): Sve prethodno je potpuno identično! ${p1Name} pobeđuje jer je bio KASNIJI u redosledu poteza na početku (Pozicija #${p1Order})!`;
      }
    }
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950/30 to-slate-900 border border-rose-500/30 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/30 text-xs font-mono mb-2">
          <Scale className="w-3.5 h-3.5" />
          <span>PRAVILA KRAJA IGRE & NEREŠENOG REZULTATA</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-['Space_Grotesk'] text-slate-100">
          Kraj Partije, Završna Runda & Ko Pobeđuje u Slučaju Nerešenog?
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
          Pravilnik igre Galactic Cruise (str. 31-32) definiše preciznu proceduru završne runde i strogu hijerarhiju od 4 koraka za rešavanje nerešenog rezultata u borbi za mesto novog CEO-a kompanije!
        </p>
      </div>

      {/* End Game Trigger & Final Round Sequence */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold font-['Space_Grotesk'] text-slate-100">
              1. Okidanje Kraja Partije (Sekcija 3)
            </h2>
          </div>
          <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
            <p>
              Kraj igre se pokreće na kraju poteza u kojem je <strong>poslednja kockica postavljena u Sekciju 3</strong> Progress trake.
            </p>
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-amber-300 font-semibold font-mono">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                Dovršetak tekuće runde
              </div>
              <p className="text-slate-400">
                Prvo se završava tekuća runda kako bi svi igrači odigrali potpuno jednak broj poteza tokom partije (npr. ako je Danijel kao 1. igrač postavio zadnju kocku, Ceca odigrava svoj potez).
              </p>
              <div className="flex items-center gap-2 text-amber-300 font-semibold font-mono pt-1">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                Overflow zona
              </div>
              <p className="text-slate-400">
                Ako se u preostalim potezima postave nove kocke, one se stavljaju u posebnu overflow zonu desno od Sekcije 3 i normalno se boduju!
              </p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold font-['Space_Grotesk'] text-slate-100">
              2. Procedura Poslednje Runde (Final Round)
            </h2>
          </div>
          <ol className="space-y-3 text-sm text-slate-300">
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5 border border-amber-500/40">
                A
              </span>
              <div>
                <strong className="text-slate-100">Simultani opoziv radnika:</strong> Svi igrači istovremeno povlače sve svoje radnike iz Mreže nazad u Break Room i uzimaju Funding Bonus za svakog! <em>(Ovo nije Call a Meeting akcija, pa se ne izvodi besplatna akcija).</em>
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5 border border-amber-500/40">
                B
              </span>
              <div>
                <strong className="text-slate-100">Jedan finalni regularan potez:</strong> Počevši od prvog igrača u smeru kazaljke, svaki igrač odigrava tačno jedan završni puni potez.
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5 border border-amber-500/40">
                C
              </span>
              <div>
                <strong className="text-slate-100">Završni skok brodova (Final Advance):</strong> Po redosledu poteza, svaki igrač pomera SVE svoje brodove u svemiru još jednom unapred – i to na <strong>BILO KOJU preostalu stanicu na tom krstarenju</strong> po sopstvenom izboru i normalno je izvršava!
              </div>
            </li>
          </ol>
        </div>
      </div>

      {/* The 4-Step Tie Breaker Hierarchy */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-bold font-['Space_Grotesk'] text-slate-100">
              {TIE_BREAKER_RULES.title}
            </h2>
          </div>
          <p className="text-sm text-slate-300 mt-1">
            {TIE_BREAKER_RULES.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {TIE_BREAKER_RULES.steps.map((step) => (
            <div
              key={step.level}
              className="bg-slate-950 p-5 rounded-xl border border-slate-800 hover:border-amber-500/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Kriterijum #{step.level}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Prioritet</span>
                </div>
                <h3 className="text-base font-bold text-slate-100 mb-2 font-['Space_Grotesk']">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                  {step.desc}
                </p>
              </div>
              <div className="text-[11px] font-mono text-slate-400 bg-slate-900/80 p-2.5 rounded border border-slate-850">
                💡 <em>{step.why}</em>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Tie Resolution Simulator */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold font-['Space_Grotesk'] text-slate-100">
              Interaktivni Tie-Breaker Ispitivač (Danijel vs Ceca)
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400 hidden sm:inline">
            Unesite vrednosti i vidite tačno koji kriterijum presuđuje
          </span>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-5 rounded-xl border border-slate-850">
          {/* Player 1 */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-yellow-400 text-sm">{p1Name}</span>
              <span className="text-xs font-mono text-slate-400">1. Igrač na početku (Order #{p1Order})</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-slate-400 block font-mono mb-1">Ukupno VP:</label>
                <input
                  type="number"
                  value={p1Score}
                  onChange={(e) => setP1Score(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 font-mono text-slate-100 text-sm"
                />
              </div>
              <div>
                <label className="text-slate-400 block font-mono mb-1">Kocke na Traci:</label>
                <input
                  type="number"
                  value={p1Cubes}
                  onChange={(e) => setP1Cubes(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 font-mono text-slate-100 text-sm"
                />
              </div>
              <div>
                <label className="text-slate-400 block font-mono mb-1">Reputacija (0-18):</label>
                <input
                  type="number"
                  value={p1Rep}
                  onChange={(e) => setP1Rep(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 font-mono text-slate-100 text-sm"
                />
              </div>
              <div>
                <label className="text-slate-400 block font-mono mb-1">Cockpit VP:</label>
                <input
                  type="number"
                  value={p1Cockpit}
                  onChange={(e) => setP1Cockpit(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 font-mono text-slate-100 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Player 2 */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-rose-400 text-sm">{p2Name}</span>
              <span className="text-xs font-mono text-slate-400">2. Igrač na početku (Order #{p2Order})</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-slate-400 block font-mono mb-1">Ukupno VP:</label>
                <input
                  type="number"
                  value={p2Score}
                  onChange={(e) => setP2Score(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 font-mono text-slate-100 text-sm"
                />
              </div>
              <div>
                <label className="text-slate-400 block font-mono mb-1">Kocke na Traci:</label>
                <input
                  type="number"
                  value={p2Cubes}
                  onChange={(e) => setP2Cubes(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 font-mono text-slate-100 text-sm"
                />
              </div>
              <div>
                <label className="text-slate-400 block font-mono mb-1">Reputacija (0-18):</label>
                <input
                  type="number"
                  value={p2Rep}
                  onChange={(e) => setP2Rep(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 font-mono text-slate-100 text-sm"
                />
              </div>
              <div>
                <label className="text-slate-400 block font-mono mb-1">Cockpit VP:</label>
                <input
                  type="number"
                  value={p2Cockpit}
                  onChange={(e) => setP2Cockpit(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 font-mono text-slate-100 text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Live Tie Result Output Box */}
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/40 text-amber-200">
          <div className="flex items-start gap-3">
            <Trophy className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs uppercase tracking-wider font-mono text-amber-400 font-bold mb-0.5">
                Ishod Presude Upravnog Odbora
              </div>
              <div className="font-semibold text-slate-100 text-base">{outcome}</div>
              {stepUsed > 0 && (
                <div className="text-xs text-amber-300/80 mt-1 font-mono">
                  Presuđeno po Zvaničnom Pravilniku Galactic Cruise (strana 32) • Kriterijum #{stepUsed}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
