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

// Mobile-friendly Touch Stepper Component
interface TouchStepperProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (val: number) => void;
  icon?: string;
  badge?: string;
  className?: string;
}

const TouchStepper: React.FC<TouchStepperProps> = ({
  label,
  value,
  min = 0,
  max = 999,
  step = 1,
  onChange,
  icon,
  badge,
  className = '',
}) => {
  return (
    <div
      className={`bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 flex items-center justify-between gap-2 ${className}`}
    >
      <div className="flex items-center gap-2 min-w-0">
        {icon && <span className="text-base shrink-0">{icon}</span>}
        <div className="min-w-0">
          <div className="text-xs font-mono font-bold text-slate-200 truncate">{label}</div>
          {badge && <div className="text-[10px] text-slate-400 font-mono leading-tight">{badge}</div>}
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - step))}
          className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 active:bg-amber-500 active:text-slate-950 text-slate-200 font-bold font-mono text-base flex items-center justify-center transition-colors touch-manipulation select-none"
        >
          -
        </button>
        <input
          type="number"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Math.max(min, Math.min(max, Number(e.target.value) || 0)))}
          className="w-12 text-center bg-slate-950 border border-slate-750 rounded-lg py-1 text-slate-100 font-mono font-bold text-sm focus:outline-none focus:border-amber-500"
        />
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + step))}
          className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 active:bg-amber-500 active:text-slate-950 text-slate-200 font-bold font-mono text-base flex items-center justify-center transition-colors touch-manipulation select-none"
        >
          +
        </button>
      </div>
    </div>
  );
};

export const ScoreCalculator: React.FC = () => {
  const [players, setPlayers] = useState<PlayerScoreData[]>(DEFAULT_PLAYERS);
  const [activeTab, setActiveTab] = useState<'final' | 'agmA' | 'agmB'>('final');
  // Mobile player switch
  const [mobilePlayerTab, setMobilePlayerTab] = useState<'danijel' | 'ceca' | 'both'>('danijel');

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
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Header Banner - Compact for Mobile */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950/30 to-slate-900 border border-amber-500/30 rounded-2xl p-4 sm:p-7 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-[11px] font-mono mb-1.5">
              <Calculator className="w-3.5 h-3.5" />
              <span>KALKULATOR BODISANJA</span>
            </div>
            <h1 className="text-xl sm:text-3xl font-bold font-['Space_Grotesk'] text-slate-100">
              Galactic Cruise Bodovanje
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-xl">
              Automatsko sabiranje svih 7 kategorija bodova sa ugrađenom proverom nelansiranih brodova (-5 VP) i tie-breaker rangiranjem.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 self-stretch sm:self-auto">
            <button
              onClick={() => setActiveTab('final')}
              className={`flex-1 sm:flex-initial px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeTab === 'final'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🏆 Finalni AGM C
            </button>
            <button
              onClick={() => setActiveTab('agmA')}
              className={`flex-1 sm:flex-initial px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeTab === 'agmA'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              AGM A
            </button>
            <button
              onClick={() => setActiveTab('agmB')}
              className={`flex-1 sm:flex-initial px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeTab === 'agmB'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              AGM B
            </button>
          </div>
        </div>
      </div>

      {/* AGM A/B Quick Mode */}
      {(activeTab === 'agmA' || activeTab === 'agmB') && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg sm:text-xl font-bold font-['Space_Grotesk'] text-slate-100">
              {activeTab === 'agmA' ? 'AGM A: Bodovanje 1. Sekcije' : 'AGM B: Bodovanje 2. Sekcije'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mb-5">
            Pravilo: Kocke u trenutnoj sekciji $\times$ Wings multiplikator (1 do 4). Igrač sa najvećom Reputacijom računa se kao da ima +1 dodatnu kocku!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {players.map((p) => {
              const state = activeTab === 'agmA' ? agmACubes[p.id] : agmBCubes[p.id];
              const effective = (state?.cubes || 0) + (state?.highRep ? 1 : 0);
              const scoredVp = effective * (state?.wings || 1);

              return (
                <div
                  key={p.id}
                  className={`p-4 sm:p-5 rounded-xl border ${
                    p.id === 'danijel'
                      ? 'bg-yellow-950/20 border-yellow-500/30'
                      : 'bg-rose-950/20 border-rose-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-bold text-base sm:text-lg text-slate-100">{p.name} ({p.colorName})</span>
                    <span className="px-3 py-1 bg-amber-500/20 text-amber-300 font-mono font-bold text-base rounded-lg border border-amber-500/40">
                      +{scoredVp} VP
                    </span>
                  </div>

                  <div className="space-y-3">
                    <TouchStepper
                      label={`Kocke u Sekciji ${activeTab === 'agmA' ? '1' : '2'}`}
                      value={state?.cubes || 0}
                      onChange={(val) => {
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
                    />

                    <TouchStepper
                      label="Otkrivena Krila (Wings)"
                      min={1}
                      max={4}
                      value={state?.wings || 1}
                      badge="1 početno + 1 po cilju kompanije"
                      onChange={(val) => {
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
                    />

                    <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer pt-1 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
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
                      <span>Najveća Reputacija (+1 virtuelna kocka)</span>
                    </label>

                    <div className="text-xs font-mono text-slate-400 bg-slate-950/70 p-2.5 rounded border border-slate-800">
                      Računica: ({state?.cubes || 0} + {state?.highRep ? 1 : 0} rep) × {state?.wings || 1} krila = <strong>{scoredVp} VP</strong>
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
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 p-0.5 sm:p-1 shadow-2xl">
            <div className="bg-slate-950 rounded-[14px] p-4 sm:p-7 text-center relative z-10">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-amber-500/20 text-amber-400 mb-2 shadow-inner">
                <Trophy className="w-6 h-6 sm:w-8 sm:h-8 animate-bounce" />
              </div>

              <div className="text-[10px] sm:text-xs uppercase tracking-widest font-mono text-amber-400 mb-0.5">
                NOVI CEO KOMPANIJE GALACTIC CRUISE
              </div>

              <h2 className="text-2xl sm:text-5xl font-black font-['Space_Grotesk'] text-slate-100">
                🎉 {winnerData.player.name} ({winnerData.scores.finalTotal} VP)
              </h2>

              <p className="mt-1.5 text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
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
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-4">
                {sorted.map((item, index) => (
                  <div
                    key={item.player.id}
                    className={`flex items-center gap-2 sm:gap-3 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl border text-xs sm:text-sm font-mono ${
                      index === 0
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-md'
                        : 'bg-slate-900 text-slate-400 border-slate-800'
                    }`}
                  >
                    <span className="font-bold text-slate-100 font-sans">{item.player.name}:</span>
                    <span className="text-base sm:text-lg font-bold text-amber-400">{item.scores.finalTotal} VP</span>
                    <span className="text-[10px] opacity-75 hidden sm:inline">
                      (In-Game: {item.player.inGameVp} + AGM C: {item.scores.agmCTotal})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* MOBILE PLAYER SELECTOR TABS (for comfortable one-handed mobile input) */}
          <div className="lg:hidden flex bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setMobilePlayerTab('danijel')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                mobilePlayerTab === 'danijel'
                  ? 'bg-yellow-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 border border-slate-900" />
              <span>Danijel ({calculatePlayerFinalScore(players[0]).finalTotal} VP)</span>
            </button>
            <button
              onClick={() => setMobilePlayerTab('ceca')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                mobilePlayerTab === 'ceca'
                  ? 'bg-rose-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400 border border-slate-900" />
              <span>Ceca ({calculatePlayerFinalScore(players[1]).finalTotal} VP)</span>
            </button>
            <button
              onClick={() => setMobilePlayerTab('both')}
              className={`py-2 px-3 text-xs font-bold rounded-lg transition-all flex items-center justify-center ${
                mobilePlayerTab === 'both' ? 'bg-slate-800 text-amber-300' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>Oba</span>
            </button>
          </div>

          {/* Player Input Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {players.map((p) => {
              const scores = calculatePlayerFinalScore(p);
              const isDanijel = p.id === 'danijel';
              const isHiddenOnMobile = mobilePlayerTab !== 'both' && mobilePlayerTab !== p.id;

              return (
                <div
                  key={p.id}
                  className={`rounded-2xl border bg-slate-900/90 shadow-xl overflow-hidden transition-all ${
                    isDanijel ? 'border-yellow-500/40' : 'border-rose-500/40'
                  } ${isHiddenOnMobile ? 'hidden lg:block' : 'block'}`}
                >
                  {/* Card Title */}
                  <div
                    className={`p-4 sm:p-5 border-b flex items-center justify-between ${
                      isDanijel
                        ? 'bg-yellow-500/10 border-yellow-500/30'
                        : 'bg-rose-500/10 border-rose-500/30'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <div
                        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full ${
                          isDanijel ? 'bg-yellow-400 shadow-yellow-500/50' : 'bg-rose-400 shadow-rose-500/50'
                        } shadow-lg`}
                      />
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold font-['Space_Grotesk'] text-slate-100">
                          {p.name}
                        </h3>
                        <span className="text-[11px] sm:text-xs text-slate-400 font-mono">
                          {p.colorName} • Redosled #{p.turnOrder}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xl sm:text-2xl font-black font-['Space_Grotesk'] text-amber-400">
                        {scores.finalTotal} <span className="text-xs text-slate-400 font-normal">VP</span>
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-slate-400 font-mono">
                        AGM C: +{scores.agmCTotal} VP
                      </div>
                    </div>
                  </div>

                  {/* Form Body */}
                  <div className="p-4 sm:p-6 space-y-5">
                    {/* 0. In Game VP */}
                    <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
                      <TouchStepper
                        label="0. Bodovi na Traci (In-Game VP)"
                        value={p.inGameVp}
                        min={0}
                        max={300}
                        step={1}
                        onChange={(val) => updatePlayer(p.id, 'inGameVp', val)}
                        badge="Sakupljeni bodovi tokom leta i poseta"
                      />
                    </div>

                    {/* 1. Supplies */}
                    <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                          1. Zalihe (Supplies): 1 VP na svaka 3
                        </label>
                        <span className="text-xs font-mono text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                          +{scores.suppliesVp} VP
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <TouchStepper
                          label="Novac ($)"
                          icon="💵"
                          value={p.money}
                          onChange={(val) => updatePlayer(p.id, 'money', val)}
                        />
                        <TouchStepper
                          label="Hrana (Food)"
                          icon="🥖"
                          value={p.food}
                          onChange={(val) => updatePlayer(p.id, 'food', val)}
                        />
                        <TouchStepper
                          label="Kiseonik (O2)"
                          icon="💧"
                          value={p.oxygen}
                          onChange={(val) => updatePlayer(p.id, 'oxygen', val)}
                        />
                        <TouchStepper
                          label="Gorivo (Fuel)"
                          icon="🩸"
                          value={p.fuel}
                          onChange={(val) => updatePlayer(p.id, 'fuel', val)}
                        />
                        <TouchStepper
                          label="Reklame (Ads)"
                          icon="📢"
                          value={p.ads}
                          onChange={(val) => updatePlayer(p.id, 'ads', val)}
                        />
                        <TouchStepper
                          label="Agenda Karte"
                          icon="📇"
                          value={p.agendaCards}
                          onChange={(val) => updatePlayer(p.id, 'agendaCards', val)}
                        />
                        <div className="sm:col-span-2">
                          <TouchStepper
                            label="Nacrti (Blueprints u ruci)"
                            icon="📐"
                            value={p.blueprints}
                            onChange={(val) => updatePlayer(p.id, 'blueprints', val)}
                          />
                        </div>
                      </div>

                      <div className="text-[11px] text-slate-400 font-mono text-right pt-1">
                        Ukupno predmeta: <strong>{scores.totalSupplies}</strong> ➔ ({scores.totalSupplies} ÷ 3 = <strong>{scores.suppliesVp} VP</strong>)
                      </div>
                    </div>

                    {/* 2. Progress Scoring (Section 3 + Overflow) */}
                    <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                          2. Progress Sekcija 3 (Kocke × Krila)
                        </label>
                        <span className="text-xs font-mono text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                          +{scores.progressVp} VP
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <TouchStepper
                          label="Kocke u Sekciji 3"
                          value={p.progressCubesSec3}
                          max={15}
                          badge="+ kocke u overflow zoni"
                          onChange={(val) => updatePlayer(p.id, 'progressCubesSec3', val)}
                        />
                        <TouchStepper
                          label="Otkrivena Krila (Wings)"
                          value={p.wingsCount}
                          min={1}
                          max={4}
                          badge="1 početno + po 1 po cilju"
                          onChange={(val) => updatePlayer(p.id, 'wingsCount', val)}
                        />
                      </div>

                      <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer pt-1 bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                        <input
                          type="checkbox"
                          checked={p.hasHighestReputation}
                          onChange={(e) => updatePlayer(p.id, 'hasHighestReputation', e.target.checked)}
                          className="rounded border-slate-700 text-amber-500 focus:ring-0 w-4 h-4"
                        />
                        <span>Najveća Reputacija (+1 virtuelna kocka)</span>
                      </label>

                      <TouchStepper
                        label="Ukupno kockica na celoj traci"
                        value={p.totalProgressCubesOnTrack}
                        max={20}
                        badge="Koristi se za 1. tie-break kriterijum"
                        onChange={(val) => updatePlayer(p.id, 'totalProgressCubesOnTrack', val)}
                      />
                    </div>

                    {/* 3. Reputation */}
                    <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                          3. Reputacija na kraju (0 do 18+)
                        </label>
                        <span className="text-xs font-mono text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                          +{scores.repVp} VP
                        </span>
                      </div>

                      <div className="flex items-center gap-3 pt-1">
                        <input
                          type="range"
                          min="0"
                          max="18"
                          value={p.reputationValue}
                          onChange={(e) => updatePlayer(p.id, 'reputationValue', Number(e.target.value))}
                          className="flex-1 accent-amber-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                        />
                        <span className="font-mono text-sm px-3 py-1 bg-slate-900 border border-slate-700 rounded-lg text-amber-300 w-12 text-center font-bold">
                          {p.reputationValue}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        1-2=1VP | 3-4=2VP | 5-6=3VP | 7-8=5VP | 9-10=7VP | 11-12=9VP | 13-14=12VP | 15+=15VP
                      </div>
                    </div>

                    {/* 4. Developments Columns Cleared */}
                    <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                          4. Zgrade: Najdesnija prazna kolona
                        </label>
                        <span className="text-xs font-mono text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                          +{scores.developmentsVp} VP
                        </span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          { val: 0, label: 'Nijedna (0 VP)' },
                          { val: 1, label: '1. Kol (5 VP)' },
                          { val: 2, label: '2. Kol (15 VP)' },
                          { val: 3, label: '3. Kol (30 VP)' },
                        ].map((col) => (
                          <button
                            key={col.val}
                            type="button"
                            onClick={() => updatePlayer(p.id, 'clearedColumns', col.val)}
                            className={`py-2 px-1 text-xs rounded-xl border transition-all text-center ${
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
                    <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
                      <TouchStepper
                        label="5. Segmenti Brodova (Plavi VP)"
                        value={p.segmentsVp}
                        max={100}
                        onChange={(val) => updatePlayer(p.id, 'segmentsVp', val)}
                        badge="Zbir svih plavih brojeva na ugrađenim segmentima"
                      />
                    </div>

                    {/* 6. Cockpits & Unlaunched Ships */}
                    <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                          6. Kokpiti (sa -5 VP penalom)
                        </label>
                        <span className="text-xs font-mono text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                          +{scores.cockpitsVp} VP
                        </span>
                      </div>

                      {/* Cockpit 1 */}
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
                        <span className="font-mono text-slate-300 font-bold">Brod 1 (Početni):</span>
                        <div className="flex items-center justify-between sm:justify-end gap-3">
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={p.cockpit1Launched}
                              onChange={(e) => updatePlayer(p.id, 'cockpit1Launched', e.target.checked)}
                              className="rounded border-slate-700 text-emerald-500 w-4 h-4"
                            />
                            <span className={p.cockpit1Launched ? 'text-emerald-300' : 'text-rose-400 font-bold'}>
                              {p.cockpit1Launched ? 'Lansiran ✔' : 'Nelansiran (-5 VP!)'}
                            </span>
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="30"
                            value={p.cockpit1Vp}
                            onChange={(e) => updatePlayer(p.id, 'cockpit1Vp', Number(e.target.value))}
                            className="w-16 bg-slate-950 border border-slate-700 rounded-lg py-1 text-center font-mono text-amber-300 font-bold"
                            placeholder="VP"
                          />
                        </div>
                      </div>

                      {/* Cockpit 2 */}
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <label className="flex items-center gap-2 cursor-pointer font-mono text-slate-300">
                            <input
                              type="checkbox"
                              checked={p.hasCockpit2}
                              onChange={(e) => updatePlayer(p.id, 'hasCockpit2', e.target.checked)}
                              className="rounded border-slate-700 text-amber-500 w-4 h-4"
                            />
                            <span>Brod 2 (Kupljen u toku igre)</span>
                          </label>
                        </div>
                        {p.hasCockpit2 && (
                          <div className="flex items-center justify-between pt-1 border-t border-slate-800">
                            <label className="flex items-center gap-1.5 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={p.cockpit2Launched}
                                onChange={(e) => updatePlayer(p.id, 'cockpit2Launched', e.target.checked)}
                                className="rounded border-slate-700 text-emerald-500 w-4 h-4"
                              />
                              <span className={p.cockpit2Launched ? 'text-emerald-300' : 'text-rose-400 font-bold'}>
                                {p.cockpit2Launched ? 'Lansiran ✔' : 'Nelansiran (-5 VP!)'}
                              </span>
                            </label>
                            <input
                              type="number"
                              min="0"
                              max="30"
                              value={p.cockpit2Vp}
                              onChange={(e) => updatePlayer(p.id, 'cockpit2Vp', Number(e.target.value))}
                              className="w-16 bg-slate-950 border border-slate-700 rounded-lg py-1 text-center font-mono text-amber-300 font-bold"
                              placeholder="VP"
                            />
                          </div>
                        )}
                      </div>

                      {/* Cockpit 3 */}
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <label className="flex items-center gap-2 cursor-pointer font-mono text-slate-300">
                            <input
                              type="checkbox"
                              checked={p.hasCockpit3}
                              onChange={(e) => updatePlayer(p.id, 'hasCockpit3', e.target.checked)}
                              className="rounded border-slate-700 text-amber-500 w-4 h-4"
                            />
                            <span>Brod 3 (Kupljen u toku igre)</span>
                          </label>
                        </div>
                        {p.hasCockpit3 && (
                          <div className="flex items-center justify-between pt-1 border-t border-slate-800">
                            <label className="flex items-center gap-1.5 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={p.cockpit3Launched}
                                onChange={(e) => updatePlayer(p.id, 'cockpit3Launched', e.target.checked)}
                                className="rounded border-slate-700 text-emerald-500 w-4 h-4"
                              />
                              <span className={p.cockpit3Launched ? 'text-emerald-300' : 'text-rose-400 font-bold'}>
                                {p.cockpit3Launched ? 'Lansiran ✔' : 'Nelansiran (-5 VP!)'}
                              </span>
                            </label>
                            <input
                              type="number"
                              min="0"
                              max="30"
                              value={p.cockpit3Vp}
                              onChange={(e) => updatePlayer(p.id, 'cockpit3Vp', Number(e.target.value))}
                              className="w-16 bg-slate-950 border border-slate-700 rounded-lg py-1 text-center font-mono text-amber-300 font-bold"
                              placeholder="VP"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Summary Card for this player */}
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-1.5">
                      <div className="flex justify-between text-slate-400">
                        <span>In-Game bodovi:</span>
                        <span>{p.inGameVp} VP</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Zalihe:</span>
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
                        <span>Zgrade:</span>
                        <span>+{scores.developmentsVp} VP</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Segmenti:</span>
                        <span>+{scores.shipSegmentsVp} VP</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Kokpiti:</span>
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
