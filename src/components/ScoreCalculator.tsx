import React, { useState } from 'react';
import { Calculator, Trophy, Medal, Sparkles, AlertCircle, RefreshCw, Plus, Trash2, CheckCircle2, ChevronRight } from 'lucide-react';

interface PlayerScoreData {
  id: string;
  name: string;
  color: string;
  colorName: string;
  turnOrder: number; // 1 = first player, 2 = second player
  // In-game VP
  inGameVp: number;
  // Supplies
  money: number;
  food: number;
  oxygen: number;
  fuel: number;
  ads: number;
  agendaCards: number;
  blueprints: number;
  // Progress & Wings
  progressCubesSec3: number;
  wingsCount: number; // 1 to 4
  hasHighestReputation: boolean;
  totalProgressCubesOnTrack: number; // For tie breaking
  // Reputation
  reputationValue: number; // 0 to 18
  // Developments
  clearedColumns: number; // 0, 1 (5 VP), 2 (15 VP), 3 (30 VP)
  // Ship Segments
  segmentsVp: number;
  // Cockpits
  cockpit1Vp: number;
  cockpit1Launched: boolean;
  cockpit2Vp: number;
  cockpit2Launched: boolean;
  cockpit3Vp: number;
  cockpit3Launched: boolean;
  cockpit4Vp: number;
  cockpit4Launched: boolean;
  hasCockpit2: boolean;
  hasCockpit3: boolean;
  hasCockpit4: boolean;
}

const DEFAULT_PLAYERS: PlayerScoreData[] = [
  {
    id: 'danijel',
    name: 'Danijel',
    color: 'yellow',
    colorName: 'Žuta (Yellow)',
    turnOrder: 1,
    inGameVp: 45,
    money: 6,
    food: 2,
    oxygen: 2,
    fuel: 1,
    ads: 2,
    agendaCards: 1,
    blueprints: 1,
    progressCubesSec3: 3,
    wingsCount: 3,
    hasHighestReputation: true,
    totalProgressCubesOnTrack: 7,
    reputationValue: 16,
    clearedColumns: 1,
    segmentsVp: 14,
    cockpit1Vp: 6,
    cockpit1Launched: true,
    cockpit2Vp: 8,
    cockpit2Launched: true,
    cockpit3Vp: 5,
    cockpit3Launched: false,
    cockpit4Vp: 0,
    cockpit4Launched: false,
    hasCockpit2: true,
    hasCockpit3: true,
    hasCockpit4: false,
  },
  {
    id: 'ceca',
    name: 'Ceca',
    color: 'rose',
    colorName: 'Crvena (Red / Pink)',
    turnOrder: 2,
    inGameVp: 48,
    money: 4,
    food: 3,
    oxygen: 1,
    fuel: 2,
    ads: 3,
    agendaCards: 0,
    blueprints: 0,
    progressCubesSec3: 3,
    wingsCount: 2,
    hasHighestReputation: false,
    totalProgressCubesOnTrack: 6,
    reputationValue: 14,
    clearedColumns: 2,
    segmentsVp: 16,
    cockpit1Vp: 7,
    cockpit1Launched: true,
    cockpit2Vp: 9,
    cockpit2Launched: true,
    cockpit3Vp: 0,
    cockpit3Launched: false,
    cockpit4Vp: 0,
    cockpit4Launched: false,
    hasCockpit2: true,
    hasCockpit3: false,
    hasCockpit4: false,
  },
];

// Reputation track to VP mapping (Page 32 rulebook)
export const getReputationVp = (rep: number): number => {
  if (rep >= 15) return 15;
  if (rep >= 13) return 12;
  if (rep >= 11) return 9;
  if (rep >= 9) return 7;
  if (rep >= 7) return 5;
  if (rep >= 5) return 3;
  if (rep >= 3) return 2;
  if (rep >= 1) return 1;
  return 0;
};

export const ScoreCalculator: React.FC = () => {
  const [players, setPlayers] = useState<PlayerScoreData[]>(DEFAULT_PLAYERS);
  const [activeTab, setActiveTab] = useState<'final' | 'agmA' | 'agmB'>('final');

  // AGM A & B temporary inputs
  const [agmACubes, setAgmACubes] = useState<Record<string, { cubes: number; wings: number; highRep: boolean }>>({
    danijel: { cubes: 2, wings: 1, highRep: true },
    ceca: { cubes: 2, wings: 2, highRep: false },
  });

  const [agmBCubes, setAgmBCubes] = useState<Record<string, { cubes: number; wings: number; highRep: boolean }>>({
    danijel: { cubes: 3, wings: 2, highRep: true },
    ceca: { cubes: 2, wings: 3, highRep: false },
  });

  const updatePlayer = (id: string, field: keyof PlayerScoreData, value: any) => {
    setPlayers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  // Calculate detailed final scoring breakdown
  const calculatePlayerFinalScore = (p: PlayerScoreData) => {
    // 1. Supplies: 1 VP per 3 leftover items
    const totalSupplies =
      (p.money || 0) +
      (p.food || 0) +
      (p.oxygen || 0) +
      (p.fuel || 0) +
      (p.ads || 0) +
      (p.agendaCards || 0) +
      (p.blueprints || 0);
    const suppliesVp = Math.floor(totalSupplies / 3);

    // 2. Progress Scoring: Section 3 cubes (+ 1 extra virtual cube if highest reputation) * wings
    const effectiveCubes = (p.progressCubesSec3 || 0) + (p.hasHighestReputation ? 1 : 0);
    const progressVp = effectiveCubes * Math.max(1, p.wingsCount || 1);

    // 3. Reputation VP
    const repVp = getReputationVp(p.reputationValue || 0);

    // 4. Developments VP: 0 cols = 0, 1 col = 5, 2 cols = 15, 3 cols = 30
    const devVpMap = [0, 5, 15, 30];
    const developmentsVp = devVpMap[p.clearedColumns] || 0;

    // 5. Ship Segments VP
    const shipSegmentsVp = p.segmentsVp || 0;

    // 6. Cockpits VP (-5 VP penalty if never launched!)
    let cockpitsVp = (p.cockpit1Vp || 0) - (p.cockpit1Launched ? 0 : 5);
    let rawCockpitsVp = p.cockpit1Vp || 0;

    if (p.hasCockpit2) {
      cockpitsVp += (p.cockpit2Vp || 0) - (p.cockpit2Launched ? 0 : 5);
      rawCockpitsVp += p.cockpit2Vp || 0;
    }
    if (p.hasCockpit3) {
      cockpitsVp += (p.cockpit3Vp || 0) - (p.cockpit3Launched ? 0 : 5);
      rawCockpitsVp += p.cockpit3Vp || 0;
    }
    if (p.hasCockpit4) {
      cockpitsVp += (p.cockpit4Vp || 0) - (p.cockpit4Launched ? 0 : 5);
      rawCockpitsVp += p.cockpit4Vp || 0;
    }

    // 7. AGM C addition
    const agmCTotal =
      suppliesVp +
      progressVp +
      repVp +
      developmentsVp +
      shipSegmentsVp +
      cockpitsVp;

    // Final total: In-game VP + AGM C Total
    const finalTotal = (p.inGameVp || 0) + agmCTotal;

    return {
      totalSupplies,
      suppliesVp,
      effectiveCubes,
      progressVp,
      repVp,
      developmentsVp,
      shipSegmentsVp,
      cockpitsVp,
      rawCockpitsVp,
      agmCTotal,
      finalTotal,
    };
  };

  // Determine winner with official tie-breakers
  const scoredPlayers = players.map((p) => ({
    player: p,
    scores: calculatePlayerFinalScore(p),
  }));

  // Sort descending by:
  // 1. finalTotal
  // 2. totalProgressCubesOnTrack
  // 3. reputationValue
  // 4. cockpitsVp
  // 5. turnOrder (later in turn order wins, i.e. 2 > 1)
  const sorted = [...scoredPlayers].sort((a, b) => {
    if (b.scores.finalTotal !== a.scores.finalTotal) {
      return b.scores.finalTotal - a.scores.finalTotal;
    }
    if (b.player.totalProgressCubesOnTrack !== a.player.totalProgressCubesOnTrack) {
      return b.player.totalProgressCubesOnTrack - a.player.totalProgressCubesOnTrack;
    }
    if (b.player.reputationValue !== a.player.reputationValue) {
      return b.player.reputationValue - a.player.reputationValue;
    }
    if (b.scores.cockpitsVp !== a.scores.cockpitsVp) {
      return b.scores.cockpitsVp - a.scores.cockpitsVp;
    }
    return b.player.turnOrder - a.player.turnOrder;
  });

  const winnerData = sorted[0];
  const isTie =
    sorted.length > 1 &&
    sorted[0].scores.finalTotal === sorted[1].scores.finalTotal;

  let tieBreakerReason = '';
  if (isTie) {
    if (sorted[0].player.totalProgressCubesOnTrack !== sorted[1].player.totalProgressCubesOnTrack) {
      tieBreakerReason = `Tie-break Kriterijum 1: Pobeđuje na osnovu više postavljenih Progress kockica (${sorted[0].player.totalProgressCubesOnTrack} naspram ${sorted[1].player.totalProgressCubesOnTrack})!`;
    } else if (sorted[0].player.reputationValue !== sorted[1].player.reputationValue) {
      tieBreakerReason = `Tie-break Kriterijum 2: Kocke su izjednačene! Pobeđuje na osnovu veće Reputacije (${sorted[0].player.reputationValue} naspram ${sorted[1].player.reputationValue})!`;
    } else if (sorted[0].scores.cockpitsVp !== sorted[1].scores.cockpitsVp) {
      tieBreakerReason = `Tie-break Kriterijum 3: Reputacija je izjednačena! Pobeđuje na osnovu više poena sa Cockpita (${sorted[0].scores.cockpitsVp} VP naspram ${sorted[1].scores.cockpitsVp} VP)!`;
    } else {
      tieBreakerReason = `Tie-break Kriterijum 4: Sve prethodno je potpuno izjednačeno! Pobeđuje igrač koji je bio KASNIJI u redosledu poteza na početku (Pozicija #${sorted[0].player.turnOrder})!`;
    }
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950/30 to-slate-900 border border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-mono mb-2">
              <Calculator className="w-3.5 h-3.5" />
              <span>ZVANIČNI KALKULATOR BODISANJA</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-['Space_Grotesk'] text-slate-100">
              Galactic Cruise Bodovanje (AGM A, B i Finalni AGM C)
            </h1>
            <p className="mt-1 text-sm text-slate-300 max-w-xl">
              Automatsko sabiranje svih 7 kategorija bodova sa ugrađenom proverom nelansiranih brodova (-5 VP) i striktnom hijerarhijom nerešenog rezultata.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('final')}
              className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeTab === 'final'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🏆 Finalni AGM C
            </button>
            <button
              onClick={() => setActiveTab('agmA')}
              className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeTab === 'agmA'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              1. Godina (AGM A)
            </button>
            <button
              onClick={() => setActiveTab('agmB')}
              className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeTab === 'agmB'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              2. Godina (AGM B)
            </button>
          </div>
        </div>
      </div>

      {/* AGM A/B Quick Mode */}
      {(activeTab === 'agmA' || activeTab === 'agmB') && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-bold font-['Space_Grotesk'] text-slate-100">
              {activeTab === 'agmA' ? 'AGM A: Bodovanje 1. Sekcije' : 'AGM B: Bodovanje 2. Sekcije'}
            </h2>
          </div>
          <p className="text-sm text-slate-300 mb-6">
            Pravilo: Svaki igrač osvaja poene jednake broju svojih Progress kockica u trenutnoj sekciji pomnoženo sa brojem otkrivenih Wings ikona (počinje sa 1, +1 za svaki ispunjen Company Goal). Igrač sa najvišom Reputacijom računa se kao da ima +1 dodatnu kocku!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {players.map((p) => {
              const state = activeTab === 'agmA' ? agmACubes[p.id] : agmBCubes[p.id];
              const effective = (state?.cubes || 0) + (state?.highRep ? 1 : 0);
              const scoredVp = effective * (state?.wings || 1);

              return (
                <div
                  key={p.id}
                  className={`p-5 rounded-xl border ${
                    p.id === 'danijel'
                      ? 'bg-yellow-950/20 border-yellow-500/30'
                      : 'bg-rose-950/20 border-rose-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-bold text-lg text-slate-100">{p.name} ({p.colorName})</span>
                    <span className="px-3 py-1 bg-amber-500/20 text-amber-300 font-mono font-bold text-base rounded-lg border border-amber-500/40">
                      +{scoredVp} VP
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-mono text-slate-400 block mb-1">
                        Broj kockica u Sekciji {activeTab === 'agmA' ? '1' : '2'}:
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="10"
                        value={state?.cubes || 0}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          if (activeTab === 'agmA') {
                            setAgmACubes((prev) => ({
                              ...prev,
                              [p.id]: { ...prev[p.id], cubes: val },
                            }));
                          } else {
                            setAgmBCubes((prev) => ({
                              ...prev,
                              [p.id]: { ...prev[p.id], cubes: val },
                            }));
                          }
                        }}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 text-sm font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-slate-400 block mb-1">
                        Broj otkrivenih Wings multiplikatora (1 do 4):
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="4"
                        value={state?.wings || 1}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          if (activeTab === 'agmA') {
                            setAgmACubes((prev) => ({
                              ...prev,
                              [p.id]: { ...prev[p.id], wings: val },
                            }));
                          } else {
                            setAgmBCubes((prev) => ({
                              ...prev,
                              [p.id]: { ...prev[p.id], wings: val },
                            }));
                          }
                        }}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 text-sm font-mono"
                      />
                    </div>

                    <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer pt-1">
                      <input
                        type="checkbox"
                        checked={state?.highRep || false}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          if (activeTab === 'agmA') {
                            setAgmACubes((prev) => ({
                              ...prev,
                              [p.id]: { ...prev[p.id], highRep: checked },
                            }));
                          } else {
                            setAgmBCubes((prev) => ({
                              ...prev,
                              [p.id]: { ...prev[p.id], highRep: checked },
                            }));
                          }
                        }}
                        className="rounded border-slate-700 text-amber-500 focus:ring-0 w-4 h-4"
                      />
                      <span>Ima najveću Reputaciju (+1 virtuelna kocka)</span>
                    </label>

                    <div className="text-xs font-mono text-slate-400 bg-slate-950/70 p-2.5 rounded border border-slate-800">
                      Računica: ({state?.cubes || 0} kocke + {state?.highRep ? 1 : 0} rep bonus) × {state?.wings || 1} krila = <strong>{scoredVp} VP</strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* FINAL AGM C MODE */}
      {activeTab === 'final' && (
        <>
          {/* Winner Announcement Banner */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 p-1 shadow-2xl">
            <div className="bg-slate-950 rounded-[14px] p-6 sm:p-7 text-center relative z-10">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 mb-3 shadow-inner">
                <Trophy className="w-8 h-8 animate-bounce" />
              </div>

              <div className="text-xs uppercase tracking-widest font-mono text-amber-400 mb-1">
                NOVI CEO KOMPANIJE GALACTIC CRUISE
              </div>

              <h2 className="text-3xl sm:text-5xl font-black font-['Space_Grotesk'] text-slate-100">
                🎉 {winnerData.player.name} ({winnerData.scores.finalTotal} VP)
              </h2>

              <p className="mt-2 text-sm text-slate-300 max-w-xl mx-auto">
                {isTie ? (
                  <span className="text-amber-300 font-medium">
                    ⚠️ Nerešeno po poenima! {tieBreakerReason}
                  </span>
                ) : (
                  <span>
                    Pobeda sa razlikom od <strong>{winnerData.scores.finalTotal - sorted[1]?.scores.finalTotal} poena</strong> nad {sorted[1]?.player.name}!
                  </span>
                )}
              </p>

              {/* Side-by-side quick score pills */}
              <div className="flex flex-wrap items-center justify-center gap-4 mt-5">
                {sorted.map((item, index) => (
                  <div
                    key={item.player.id}
                    className={`flex items-center gap-3 px-4 py-2 rounded-xl border text-sm font-mono ${
                      index === 0
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-lg shadow-amber-500/10'
                        : 'bg-slate-900 text-slate-400 border-slate-800'
                    }`}
                  >
                    <span className="font-bold text-slate-100 font-sans">{item.player.name}:</span>
                    <span className="text-lg font-bold text-amber-400">{item.scores.finalTotal} VP</span>
                    <span className="text-xs opacity-75">
                      (In-Game: {item.player.inGameVp} + AGM C: {item.scores.agmCTotal})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Player Input Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {players.map((p) => {
              const scores = calculatePlayerFinalScore(p);
              const isDanijel = p.id === 'danijel';

              return (
                <div
                  key={p.id}
                  className={`rounded-2xl border bg-slate-900/90 shadow-xl overflow-hidden transition-all ${
                    isDanijel ? 'border-yellow-500/40' : 'border-rose-500/40'
                  }`}
                >
                  {/* Card Title */}
                  <div
                    className={`p-5 border-b flex items-center justify-between ${
                      isDanijel
                        ? 'bg-yellow-500/10 border-yellow-500/30'
                        : 'bg-rose-500/10 border-rose-500/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded-full ${
                          isDanijel ? 'bg-yellow-400 shadow-yellow-500/50' : 'bg-rose-400 shadow-rose-500/50'
                        } shadow-lg`}
                      />
                      <div>
                        <h3 className="text-xl font-bold font-['Space_Grotesk'] text-slate-100">
                          {p.name}
                        </h3>
                        <span className="text-xs text-slate-400 font-mono">
                          {p.colorName} • Početni redosled #{p.turnOrder}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-black font-['Space_Grotesk'] text-amber-400">
                        {scores.finalTotal} <span className="text-xs text-slate-400 font-normal">VP</span>
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        AGM C: +{scores.agmCTotal} VP
                      </div>
                    </div>
                  </div>

                  {/* Form Body */}
                  <div className="p-5 sm:p-6 space-y-6">
                    {/* 0. In Game VP */}
                    <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                          0. Trenutni Bodovi na Traci (In-Game VP)
                        </label>
                        <span className="text-xs font-mono text-amber-400">{p.inGameVp} VP</span>
                      </div>
                      <input
                        type="number"
                        min="0"
                        max="250"
                        value={p.inGameVp}
                        onChange={(e) => updatePlayer(p.id, 'inGameVp', Number(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 text-sm font-mono focus:border-amber-500 focus:outline-none"
                      />
                      <p className="text-[11px] text-slate-400 mt-1">
                        Bodovi koje je igrač već skupio tokom lansiranja, dana u svemiru i poseta destinacijama.
                      </p>
                    </div>

                    {/* 1. Supplies */}
                    <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                          1. Zalihe (Supplies): 1 VP na svaka 3 predmeta
                        </label>
                        <span className="text-xs font-mono text-amber-400 font-bold">
                          +{scores.suppliesVp} VP
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-2 text-center text-xs">
                        <div>
                          <span className="block text-[10px] text-slate-400 font-mono">Novac</span>
                          <input
                            type="number"
                            min="0"
                            value={p.money}
                            onChange={(e) => updatePlayer(p.id, 'money', Number(e.target.value))}
                            className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-center text-slate-100 font-mono"
                          />
                        </div>
                        <div>
                          <span className="block text-[10px] text-slate-400 font-mono">Hrana</span>
                          <input
                            type="number"
                            min="0"
                            value={p.food}
                            onChange={(e) => updatePlayer(p.id, 'food', Number(e.target.value))}
                            className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-center text-slate-100 font-mono"
                          />
                        </div>
                        <div>
                          <span className="block text-[10px] text-slate-400 font-mono">Kiseonik</span>
                          <input
                            type="number"
                            min="0"
                            value={p.oxygen}
                            onChange={(e) => updatePlayer(p.id, 'oxygen', Number(e.target.value))}
                            className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-center text-slate-100 font-mono"
                          />
                        </div>
                        <div>
                          <span className="block text-[10px] text-slate-400 font-mono">Gorivo</span>
                          <input
                            type="number"
                            min="0"
                            value={p.fuel}
                            onChange={(e) => updatePlayer(p.id, 'fuel', Number(e.target.value))}
                            className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-center text-slate-100 font-mono"
                          />
                        </div>
                        <div>
                          <span className="block text-[10px] text-slate-400 font-mono">Reklame</span>
                          <input
                            type="number"
                            min="0"
                            value={p.ads}
                            onChange={(e) => updatePlayer(p.id, 'ads', Number(e.target.value))}
                            className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-center text-slate-100 font-mono"
                          />
                        </div>
                        <div>
                          <span className="block text-[10px] text-slate-400 font-mono">Agende</span>
                          <input
                            type="number"
                            min="0"
                            value={p.agendaCards}
                            onChange={(e) => updatePlayer(p.id, 'agendaCards', Number(e.target.value))}
                            className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-center text-slate-100 font-mono"
                          />
                        </div>
                        <div className="col-span-2">
                          <span className="block text-[10px] text-slate-400 font-mono">Nacrti (Blueprints)</span>
                          <input
                            type="number"
                            min="0"
                            value={p.blueprints}
                            onChange={(e) => updatePlayer(p.id, 'blueprints', Number(e.target.value))}
                            className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-center text-slate-100 font-mono"
                          />
                        </div>
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono mt-2 text-right">
                        Ukupno zaliha: {scores.totalSupplies} ➔ ({scores.totalSupplies} ÷ 3 = {scores.suppliesVp} VP)
                      </div>
                    </div>

                    {/* 2. Progress Scoring (Section 3 + Overflow) */}
                    <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                          2. Progress Sekcija 3 (Kocke × Krila)
                        </label>
                        <span className="text-xs font-mono text-amber-400 font-bold">
                          +{scores.progressVp} VP
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] text-slate-400 font-mono block mb-1">
                            Kocke u Sekciji 3 (+ overflow):
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="12"
                            value={p.progressCubesSec3}
                            onChange={(e) => updatePlayer(p.id, 'progressCubesSec3', Number(e.target.value))}
                            className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-slate-100 font-mono text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-slate-400 font-mono block mb-1">
                            Otkrivena Krila (Wings 1-4):
                          </label>
                          <input
                            type="number"
                            min="1"
                            max="4"
                            value={p.wingsCount}
                            onChange={(e) => updatePlayer(p.id, 'wingsCount', Number(e.target.value))}
                            className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-slate-100 font-mono text-sm"
                          />
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={p.hasHighestReputation}
                            onChange={(e) => updatePlayer(p.id, 'hasHighestReputation', e.target.checked)}
                            className="rounded border-slate-700 text-amber-500 focus:ring-0 w-4 h-4"
                          />
                          <span>Najveća Reputacija (+1 virtuelna kocka)</span>
                        </label>
                      </div>

                      <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] text-slate-400 font-mono flex items-center justify-between">
                        <span>Ukupno kockica na celoj traci (za tie-breaker):</span>
                        <input
                          type="number"
                          min="0"
                          max="15"
                          value={p.totalProgressCubesOnTrack}
                          onChange={(e) => updatePlayer(p.id, 'totalProgressCubesOnTrack', Number(e.target.value))}
                          className="w-16 bg-slate-900 border border-slate-700 rounded px-1.5 py-0.5 text-center text-slate-100 font-mono"
                        />
                      </div>
                    </div>

                    {/* 3. Reputation */}
                    <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                          3. Reputacija na kraju igre (0 do 18+)
                        </label>
                        <span className="text-xs font-mono text-amber-400 font-bold">
                          +{scores.repVp} VP
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <input
                          type="range"
                          min="0"
                          max="18"
                          value={p.reputationValue}
                          onChange={(e) => updatePlayer(p.id, 'reputationValue', Number(e.target.value))}
                          className="flex-1 accent-amber-500"
                        />
                        <span className="font-mono text-sm px-3 py-1 bg-slate-900 border border-slate-700 rounded text-amber-300 w-12 text-center font-bold">
                          {p.reputationValue}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mt-1">
                        Pragovi: 1-2=1VP | 3-4=2VP | 5-6=3VP | 7-8=5VP | 9-10=7VP | 11-12=9VP | 13-14=12VP | 15+=15VP
                      </div>
                    </div>

                    {/* 4. Developments Columns Cleared */}
                    <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                          4. Zgrade (Developments) - Najdesnija prazna kolona
                        </label>
                        <span className="text-xs font-mono text-amber-400 font-bold">
                          +{scores.developmentsVp} VP
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {[
                          { val: 0, label: 'Nijedna (0 VP)' },
                          { val: 1, label: 'Kolona 1 (5 VP)' },
                          { val: 2, label: 'Kolona 2 (15 VP)' },
                          { val: 3, label: 'Kolona 3 (30 VP)' },
                        ].map((col) => (
                          <button
                            key={col.val}
                            type="button"
                            onClick={() => updatePlayer(p.id, 'clearedColumns', col.val)}
                            className={`py-2 px-1 text-xs rounded border transition-all text-center ${
                              p.clearedColumns === col.val
                                ? 'bg-amber-500/20 text-amber-300 border-amber-500/60 font-bold'
                                : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                            }`}
                          >
                            {col.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 5. Ship Segments */}
                    <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                          5. Segmenti Brodova (Plavi VP simboli)
                        </label>
                        <span className="text-xs font-mono text-amber-400 font-bold">
                          +{scores.shipSegmentsVp} VP
                        </span>
                      </div>
                      <input
                        type="number"
                        min="0"
                        max="50"
                        value={p.segmentsVp}
                        onChange={(e) => updatePlayer(p.id, 'segmentsVp', Number(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 text-sm font-mono focus:border-amber-500 focus:outline-none"
                      />
                      <p className="text-[11px] text-slate-400 mt-1">
                        Zbir svih plavih VP brojeva odštampanih na izgrađenim segmentima u vašim brodovima.
                      </p>
                    </div>

                    {/* 6. Cockpits & Unlaunched Ships */}
                    <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                          6. Kokpiti (Cockpits) sa penalom (-5 VP za nelansirane)
                        </label>
                        <span className="text-xs font-mono text-amber-400 font-bold">
                          +{scores.cockpitsVp} VP
                        </span>
                      </div>

                      {/* Cockpit 1 */}
                      <div className="p-2.5 rounded bg-slate-900 border border-slate-800 flex items-center justify-between gap-3 text-xs">
                        <span className="font-mono text-slate-300">Brod 1 (Početni):</span>
                        <div className="flex items-center gap-3">
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={p.cockpit1Launched}
                              onChange={(e) => updatePlayer(p.id, 'cockpit1Launched', e.target.checked)}
                              className="rounded border-slate-700 text-emerald-500 w-3.5 h-3.5"
                            />
                            <span className={p.cockpit1Launched ? 'text-emerald-300' : 'text-rose-400'}>
                              {p.cockpit1Launched ? 'Lansiran ✔' : 'Nelansiran (-5 VP!)'}
                            </span>
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="25"
                            value={p.cockpit1Vp}
                            onChange={(e) => updatePlayer(p.id, 'cockpit1Vp', Number(e.target.value))}
                            className="w-16 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-center font-mono text-amber-300"
                            placeholder="VP"
                          />
                        </div>
                      </div>

                      {/* Cockpit 2 */}
                      <div className="p-2.5 rounded bg-slate-900 border border-slate-800 space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <label className="flex items-center gap-2 cursor-pointer font-mono text-slate-300">
                            <input
                              type="checkbox"
                              checked={p.hasCockpit2}
                              onChange={(e) => updatePlayer(p.id, 'hasCockpit2', e.target.checked)}
                              className="rounded border-slate-700 text-amber-500 w-3.5 h-3.5"
                            />
                            <span>Brod 2 (Kupljen u toku igre)</span>
                          </label>
                        </div>
                        {p.hasCockpit2 && (
                          <div className="flex items-center justify-between pt-1">
                            <label className="flex items-center gap-1.5 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={p.cockpit2Launched}
                                onChange={(e) => updatePlayer(p.id, 'cockpit2Launched', e.target.checked)}
                                className="rounded border-slate-700 text-emerald-500 w-3.5 h-3.5"
                              />
                              <span className={p.cockpit2Launched ? 'text-emerald-300' : 'text-rose-400'}>
                                {p.cockpit2Launched ? 'Lansiran ✔' : 'Nelansiran (-5 VP!)'}
                              </span>
                            </label>
                            <input
                              type="number"
                              min="0"
                              max="25"
                              value={p.cockpit2Vp}
                              onChange={(e) => updatePlayer(p.id, 'cockpit2Vp', Number(e.target.value))}
                              className="w-16 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-center font-mono text-amber-300"
                              placeholder="VP"
                            />
                          </div>
                        )}
                      </div>

                      {/* Cockpit 3 */}
                      <div className="p-2.5 rounded bg-slate-900 border border-slate-800 space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <label className="flex items-center gap-2 cursor-pointer font-mono text-slate-300">
                            <input
                              type="checkbox"
                              checked={p.hasCockpit3}
                              onChange={(e) => updatePlayer(p.id, 'hasCockpit3', e.target.checked)}
                              className="rounded border-slate-700 text-amber-500 w-3.5 h-3.5"
                            />
                            <span>Brod 3 (Kupljen u toku igre)</span>
                          </label>
                        </div>
                        {p.hasCockpit3 && (
                          <div className="flex items-center justify-between pt-1">
                            <label className="flex items-center gap-1.5 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={p.cockpit3Launched}
                                onChange={(e) => updatePlayer(p.id, 'cockpit3Launched', e.target.checked)}
                                className="rounded border-slate-700 text-emerald-500 w-3.5 h-3.5"
                              />
                              <span className={p.cockpit3Launched ? 'text-emerald-300' : 'text-rose-400'}>
                                {p.cockpit3Launched ? 'Lansiran ✔' : 'Nelansiran (-5 VP!)'}
                              </span>
                            </label>
                            <input
                              type="number"
                              min="0"
                              max="25"
                              value={p.cockpit3Vp}
                              onChange={(e) => updatePlayer(p.id, 'cockpit3Vp', Number(e.target.value))}
                              className="w-16 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-center font-mono text-amber-300"
                              placeholder="VP"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Summary Card for this player */}
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-1.5">
                      <div className="flex justify-between text-slate-400">
                        <span>In-Game bodovi:</span>
                        <span>{p.inGameVp} VP</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Zalihe (Supplies):</span>
                        <span>+{scores.suppliesVp} VP</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Progress Sekcija 3:</span>
                        <span>+{scores.progressVp} VP</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Reputacija:</span>
                        <span>+{scores.repVp} VP</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Zgrade (Developments):</span>
                        <span>+{scores.developmentsVp} VP</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Segmenti:</span>
                        <span>+{scores.shipSegmentsVp} VP</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Kokpiti (nakon penala):</span>
                        <span>+{scores.cockpitsVp} VP</span>
                      </div>
                      <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-bold text-amber-400">
                        <span>UKUPAN KRAJNJI SKOR:</span>
                        <span>{scores.finalTotal} VP</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
