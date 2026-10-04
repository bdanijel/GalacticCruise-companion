import React, { useState } from 'react';
import { RotateCw, CheckCircle2, AlertTriangle } from 'lucide-react';

interface OfficeLocation {
  id: number;
  name: string;
  defaultOccupant: 'empty' | 'danijel' | 'ceca' | 'npc-regular' | 'npc-expert';
}

const DEFAULT_NETWORK_OFFICES: OfficeLocation[] = [
  { id: 1, name: '1. Top-Center (Kancelarija 1)', defaultOccupant: 'npc-regular' },
  { id: 2, name: '2. Top-Right (Kancelarija 2)', defaultOccupant: 'empty' },
  { id: 3, name: '3. Bottom-Right (Kancelarija 3)', defaultOccupant: 'ceca' },
  { id: 4, name: '4. Bottom-Center (Kancelarija 4)', defaultOccupant: 'npc-regular' },
  { id: 5, name: '5. Bottom-Left (Kancelarija 5)', defaultOccupant: 'empty' },
  { id: 6, name: '6. Top-Left (Kancelarija 6)', defaultOccupant: 'danijel' },
];

export const NpcBumpingSimulator: React.FC = () => {
  // Simulator State
  const [offices, setOffices] = useState<Record<number, string>>({
    1: 'npc-regular',
    2: 'empty',
    3: 'ceca',
    4: 'npc-regular',
    5: 'empty',
    6: 'danijel',
  });

  const [activePlayer, setActivePlayer] = useState<'danijel' | 'ceca'>('danijel');
  const [selectedOfficeToBump, setSelectedOfficeToBump] = useState<number>(1);
  const [simulationLog, setSimulationLog] = useState<{
    success: boolean;
    text: string;
    path: number[];
    bumpedPlayer?: 'danijel' | 'ceca';
  } | null>(null);

  const setOfficeOccupant = (officeId: number, occupant: string) => {
    setOffices((prev) => ({ ...prev, [officeId]: occupant }));
    setSimulationLog(null);
  };

  const handleSimulateBump = () => {
    const currentOccupant = offices[selectedOfficeToBump];
    if (currentOccupant !== 'npc-regular' && currentOccupant !== 'npc-expert') {
      setSimulationLog({
        success: false,
        text: `Na lokaciji ${selectedOfficeToBump} se ne nalazi NPC radnik (trenutno: ${currentOccupant}). Izaberite lokaciju na kojoj stoji NPC pre izguravanja!`,
        path: [selectedOfficeToBump],
      });
      return;
    }

    const isExpert = currentOccupant === 'npc-expert';
    const placingPlayer = activePlayer;
    const opponent = placingPlayer === 'danijel' ? 'ceca' : 'danijel';

    let current = selectedOfficeToBump;
    const path: number[] = [current];
    let destinationOffice: number | null = null;
    let bumpedOpponent = false;

    // Check next 6 locations in clockwise order
    for (let step = 1; step <= 6; step++) {
      let next = ((current + step - 1) % 6) + 1;
      path.push(next);
      const nextOccupant = offices[next];

      // Regular NPC behaviour:
      if (!isExpert) {
        if (nextOccupant === 'empty') {
          destinationOffice = next;
          break;
        } else if (nextOccupant === opponent) {
          destinationOffice = next;
          bumpedOpponent = true;
          break;
        } else if (nextOccupant === placingPlayer) {
          // Skips placing player's own worker
          continue;
        } else if (nextOccupant === 'npc-regular' || nextOccupant === 'npc-expert') {
          // Skips other NPC
          continue;
        }
      } else {
        // Expert NPC behaviour:
        // Expert skips empty spaces UNLESS no other option exists to bump opponent!
        if (nextOccupant === opponent) {
          destinationOffice = next;
          bumpedOpponent = true;
          break;
        } else if (nextOccupant === placingPlayer) {
          continue;
        } else if (nextOccupant === 'npc-regular' || nextOccupant === 'npc-expert') {
          continue;
        } else if (nextOccupant === 'empty') {
          // An expert only stops at empty if no opponent exists in the rest of the loop
          let opponentExistsAhead = false;
          for (let checkStep = step + 1; checkStep <= 6; checkStep++) {
            let checkNext = ((current + checkStep - 1) % 6) + 1;
            if (offices[checkNext] === opponent) {
              opponentExistsAhead = true;
              break;
            }
          }
          if (!opponentExistsAhead) {
            destinationOffice = next;
            break;
          } else {
            // Skips empty space because opponent is further down the track!
            continue;
          }
        }
      }
    }

    if (!destinationOffice) {
      destinationOffice = ((current % 6) + 1);
    }

    // Apply movement to state
    const newOffices = { ...offices };
    newOffices[selectedOfficeToBump] = placingPlayer; // Placing player takes original spot
    newOffices[destinationOffice] = isExpert ? 'npc-expert' : 'npc-regular';

    setOffices(newOffices);

    const opponentName = opponent === 'danijel' ? 'Danijel (Žuta)' : 'Ceca (Crvena)';
    const playerName = placingPlayer === 'danijel' ? 'Danijel (Žuta)' : 'Ceca (Crvena)';

    if (bumpedOpponent) {
      setSimulationLog({
        success: true,
        text: `🎯 BUMP USPEO! ${playerName} postavlja radnika na lokaciju ${selectedOfficeToBump}. NPC se pomera u smeru kazaljke i na lokaciji ${destinationOffice} IZGURAVA protivnika: ${opponentName}! ${opponentName} vraća radnika u svoj Break Room i ODMAH DOBIJA FUNDING BONUS! 🖐️💵`,
        path,
        bumpedPlayer: opponent,
      });
    } else {
      setSimulationLog({
        success: true,
        text: `⏩ ${playerName} postavlja radnika na lokaciju ${selectedOfficeToBump}. NPC se pomera u smeru kazaljke duž putanje [${path.join(' ➔ ')}] i zaustavlja se na slobodnoj lokaciji ${destinationOffice}.`,
        path,
      });
    }
  };

  const resetOfficeState = () => {
    setOffices({
      1: 'npc-regular',
      2: 'empty',
      3: 'ceca',
      4: 'npc-regular',
      5: 'empty',
      6: 'danijel',
    });
    setSimulationLog(null);
  };

  return (
    <div className="rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl overflow-hidden animate-fadeIn">
      <div className="bg-gradient-to-r from-slate-900 to-slate-850 p-5 sm:p-6 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <RotateCw className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg sm:text-xl font-bold font-['Space_Grotesk'] text-slate-100">
              Interaktivni NPC Bumping Simulator (Smer Kazaljke na Satu)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Postavite trenutno stanje na tabli i proverite putanju kretanja NPC-a i ishod izguravanja.
          </p>
        </div>

        <button
          onClick={resetOfficeState}
          className="self-start sm:self-center px-3 py-1.5 text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-lg transition-colors"
        >
          Resetuj Tabelu
        </button>
      </div>

      <div className="p-5 sm:p-6 space-y-6">
        {/* Controls: Active Player & Target Office */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
              Ko je na potezu? (Aktivni igrač koji postavlja radnika)
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setActivePlayer('danijel')}
                className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                  activePlayer === 'danijel'
                    ? 'bg-yellow-500 text-slate-950 shadow-md shadow-yellow-500/20'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 border border-slate-900" />
                Danijel (Žuta)
              </button>
              <button
                onClick={() => setActivePlayer('ceca')}
                className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                  activePlayer === 'ceca'
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400 border border-slate-900" />
                Ceca (Crvena)
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
              Izaberi lokaciju gde šalješ radnika (mora biti NPC):
            </label>
            <div className="flex gap-2">
              <select
                value={selectedOfficeToBump}
                onChange={(e) => setSelectedOfficeToBump(Number(e.target.value))}
                className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
              >
                {[1, 2, 3, 4, 5, 6].map((id) => (
                  <option key={id} value={id}>
                    Lokacija {id}: {DEFAULT_NETWORK_OFFICES[id - 1].name} ({offices[id]})
                  </option>
                ))}
              </select>
              <button
                onClick={handleSimulateBump}
                className="px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold rounded-lg text-sm shadow-lg shadow-orange-500/20 transition-all flex items-center gap-2"
              >
                <RotateCw className="w-4 h-4" />
                Izguraj!
              </button>
            </div>
          </div>
        </div>

        {/* Simulation Output Message */}
        {simulationLog && (
          <div
            className={`p-4 rounded-xl border text-sm leading-relaxed ${
              simulationLog.success
                ? simulationLog.bumpedPlayer
                  ? 'bg-rose-950/40 border-rose-500/50 text-rose-200'
                  : 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                : 'bg-amber-950/40 border-amber-500/50 text-amber-200'
            }`}
          >
            <div className="flex items-start gap-3">
              {simulationLog.success ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              )}
              <div>
                <div className="font-semibold">{simulationLog.text}</div>
                {simulationLog.path && simulationLog.path.length > 1 && (
                  <div className="mt-2 text-xs font-mono opacity-80">
                    Putanja provere u smeru kazaljke: {simulationLog.path.map((loc) => `Lokacija ${loc}`).join(' ➔ ')}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 6 Network Offices Visual Interactive Layout */}
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
            <span>Mreža od 6 kancelarija (Network) - Klikni da promeniš ko se gde nalazi:</span>
            <span className="text-amber-400 flex items-center gap-1">
              <RotateCw className="w-3.5 h-3.5" /> Smer kretanja 1 ➔ 2 ➔ 3 ➔ 4 ➔ 5 ➔ 6 ➔ 1
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5, 6].map((id) => {
              const occupant = offices[id];
              const isSelected = selectedOfficeToBump === id;

              let badgeColor = 'bg-slate-800 text-slate-400 border-slate-700';
              let label = 'Prazno (Empty)';

              if (occupant === 'danijel') {
                badgeColor = 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40 font-semibold';
                label = 'Danijel (Žuti)';
              } else if (occupant === 'ceca') {
                badgeColor = 'bg-rose-500/20 text-rose-300 border-rose-500/40 font-semibold';
                label = 'Ceca (Crvena)';
              } else if (occupant === 'npc-regular') {
                badgeColor = 'bg-sky-500/20 text-sky-300 border-sky-500/40 font-semibold';
                label = 'NPC Regular';
              } else if (occupant === 'npc-expert') {
                badgeColor = 'bg-purple-500/20 text-purple-300 border-purple-500/40 font-semibold';
                label = 'NPC Expert ⭐';
              }

              return (
                <div
                  key={id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isSelected
                      ? 'border-amber-400 bg-amber-500/10 ring-2 ring-amber-400/20'
                      : 'border-slate-800 bg-slate-950/70 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-slate-300">
                      Lokacija #{id}
                    </span>
                    {isSelected && (
                      <span className="text-[10px] font-mono bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded font-bold">
                        META
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-slate-400 mb-2 truncate">
                    {DEFAULT_NETWORK_OFFICES[id - 1].name.split('(')[1]?.replace(')', '') || 'Kancelarija'}
                  </div>

                  <div className="space-y-1.5">
                    <div className={`px-2.5 py-1 text-xs rounded border text-center ${badgeColor}`}>
                      {label}
                    </div>

                    <select
                      value={occupant}
                      onChange={(e) => setOfficeOccupant(id, e.target.value)}
                      className="w-full text-[11px] bg-slate-900 border border-slate-750 text-slate-300 rounded px-2 py-1 focus:outline-none"
                    >
                      <option value="empty">Prazno (Empty)</option>
                      <option value="danijel">Danijel (Žuti)</option>
                      <option value="ceca">Ceca (Crvena)</option>
                      <option value="npc-regular">NPC Radnik</option>
                      <option value="npc-expert">NPC Expert</option>
                    </select>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
