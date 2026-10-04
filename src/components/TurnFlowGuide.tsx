import React, { useState } from 'react';
import { Rocket, CheckCircle2, ChevronRight, AlertCircle, ArrowRight, ShieldAlert, Sparkles, DollarSign } from 'lucide-react';
import { LAUNCH_COUNTDOWN_STEPS, NETWORK_ACTIONS } from '../data/galacticCruiseData';

export const TurnFlowGuide: React.FC = () => {
  const [activeStepTab, setActiveStepTab] = useState<'advance' | 'actions' | 'launch' | 'meeting' | 'goal'>('launch');
  const [activeCountdown, setActiveCountdown] = useState<number>(0);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950/20 to-slate-900 border border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-mono mb-2">
          <Rocket className="w-3.5 h-3.5" />
          <span>STRUKTURA POTEZA & LANSIRANJE BRODA</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-['Space_Grotesk'] text-slate-100">
          Kako Teče Potez i Odbrojavanje za Poletanje
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
          Svaki potez sastoji se od tri uzastopne faze: <strong>1. Advance Ships</strong> ➔ <strong>2. Akcija (Radnik / Lansiranje / Sastanak)</strong> ➔ <strong>3. Accomplish Company Goal</strong>.
        </p>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-slate-800">
          {[
            { id: 'launch', label: '🚀 Lansiranje Broda (T-5 do T-0)', badge: 'Ključno' },
            { id: 'advance', label: '1. Advance Ships (Pomeranje Brodova)', badge: 'Početak' },
            { id: 'actions', label: '2A. Assign Worker & 12 Akcija', badge: 'Radnik' },
            { id: 'meeting', label: '2C. Call a Meeting (Sastanak)', badge: '0 Radnika' },
            { id: 'goal', label: '3. Company Goals & Krila', badge: 'Kraj Poteza' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveStepTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeStepTab === tab.id
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2B. LAUNCH A SHIP (T-Minus 5 to 0 Countdown Console) */}
      {activeStepTab === 'launch' && (
        <div className="space-y-6">
          {/* Preflight Checklist Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h2 className="text-lg font-bold font-['Space_Grotesk'] text-amber-400 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-amber-400" />
              Preflight Checklist (Provera Pre Lansiranja)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs sm:text-sm">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-850 flex items-center gap-2.5">
                <span className="text-emerald-400 font-bold">✔</span>
                <span>Zakazano krstarenje (Schedule)</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-850 flex items-center gap-2.5">
                <span className="text-emerald-400 font-bold">✔</span>
                <span>Dostupan brod sa 1+ kabinom</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-850 flex items-center gap-2.5">
                <span className="text-emerald-400 font-bold">✔</span>
                <span>Resursi za lansiranje (Hrana, O2, Gorivo)</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-850 flex items-center gap-2.5">
                <span className="text-emerald-400 font-bold">✔</span>
                <span>Gosti sa kartom ili Last-Minute</span>
              </div>
            </div>
          </div>

          {/* Interactive 6-Step Countdown Console */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold font-['Space_Grotesk'] text-slate-100 flex items-center gap-2">
                  <Rocket className="w-5 h-5 text-amber-400" />
                  Launch Elevator Odbrojavanje: 6 Koraka Lansiranja
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Kada lansirate brod, NE radite regularne akcije na tabli. Vaš radnik ulazi u Launch Elevator na tabli igrača i prolazi sledećih 6 koraka:
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {LAUNCH_COUNTDOWN_STEPS.map((step, idx) => (
                <div
                  key={step.step}
                  onClick={() => setActiveCountdown(idx)}
                  className={`p-4 sm:p-5 rounded-xl border transition-all cursor-pointer ${
                    activeCountdown === idx
                      ? 'bg-gradient-to-r from-slate-950 to-amber-950/30 border-amber-500/60 ring-1 ring-amber-500/30'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex flex-col items-center justify-center shrink-0">
                      <span className="text-[10px] font-mono leading-none">T-MINUS</span>
                      <span className="text-lg font-black font-['Space_Grotesk'] leading-tight">
                        {5 - idx}
                      </span>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-base font-bold text-slate-100 font-['Space_Grotesk']">
                          {step.name}
                        </h4>
                        <span className="text-[10px] font-mono text-slate-500">
                          Pravilnik str. {idx < 2 ? 28 : 29}
                        </span>
                      </div>
                      <p className="mt-1.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 1. ADVANCE SHIPS */}
      {activeStepTab === 'advance' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div>
            <h2 className="text-xl font-bold font-['Space_Grotesk'] text-slate-100">
              Korak 1 Poteza: Pomeranje Brodova u Svemiru (Advance Ships)
            </h2>
            <p className="text-sm text-slate-300 mt-1">
              Ako na početku vašeg poteza imate brodove u svemiru, pomerate Pilota za 1 polje unapred na svakom brodu. Postoje 3 vrste stanica:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
              <div className="text-amber-400 font-bold font-['Space_Grotesk'] text-base mb-2">
                1. Destination (Destinacija)
              </div>
              <ul className="text-xs sm:text-sm text-slate-300 space-y-2">
                <li>• <strong>Upgrade:</strong> Ako imate Upgrade token na motoru, postavite ga na odgovarajući slot te destinacije i otključajte bonus (npr. 4 broda / 4 segmenta).</li>
                <li>• <strong>Score Guests:</strong> Možete bodovati svakog gosta na brodu: 1 Ad ako se boja poklapa, 2 Ads ako se ne poklapa.</li>
                <li>• <strong>Bodovi:</strong> 3 VP + 1 VP po postavljenom Upgrade tokenu na toj destinaciji!</li>
              </ul>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-850">
              <div className="text-purple-400 font-bold font-['Space_Grotesk'] text-base mb-2">
                2. Day in Space (Dan u Svemiru)
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Putnici uživaju u atrakcijama broda! Za svakog gosta dobijate bonus (sa Marketing table) pomnožen sa brojem odgovarajućih ikona na segmentima vašeg broda!
                <br /><br />
                <em>Primer: 2 Family gosta × 2 Family ikone na brodu = 4 Reklame (Ads) iz zalihe!</em>
              </p>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-850">
              <div className="text-emerald-400 font-bold font-['Space_Grotesk'] text-base mb-2">
                3. Returning to Earth (Povratak)
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Kada Pilot stigne na zadnju stanicu: Pilot se vraća u Break Room (odmah dobijate 1 Funding Bonus!), gosti se vraćaju u opštu zalihu, a pločica krstarenja se odbacuje.
                <br /><br />
                Brod je sada ponovo slobodan za dogradnju i novo lansiranje!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2A. ASSIGN WORKER & ACTIONS */}
      {activeStepTab === 'actions' && (
        <div className="space-y-6">
          {/* Paying other players' developments rule card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold font-['Space_Grotesk'] text-amber-300 mb-2 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-amber-400" />
              Cena Korišćenja Tuđih i Neutralnih Razvoja (Reputation Skala)
            </h3>
            <p className="text-sm text-slate-300 mb-4">
              Kada postavite radnika, možete odigrati do 2 akcije sa te lokacije ili susednih lokacija povezanih zgradama. Vaše zgrade koristite besplatno. Tuđe zgrade plaćate po igraču za ceo potez na osnovu vaše Reputacije:
            </p>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-xs font-mono text-slate-400 block">Reputacija 0 - 6</span>
                <span className="text-lg font-bold text-rose-400 font-mono">2 Novca ($)</span>
                <span className="text-[10px] text-slate-500 block">po igraču</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-xs font-mono text-slate-400 block">Reputacija 7 - 14</span>
                <span className="text-lg font-bold text-amber-400 font-mono">1 Novac ($)</span>
                <span className="text-[10px] text-slate-500 block">po igraču</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-xs font-mono text-slate-400 block">Reputacija 15+</span>
                <span className="text-lg font-bold text-emerald-400 font-mono">0 Novca (Besplatno!)</span>
                <span className="text-[10px] text-slate-500 block">Maksimalan status</span>
              </div>
            </div>
          </div>

          {/* 12 Network Actions Catalog */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold font-['Space_Grotesk'] text-slate-100 mb-4">
              12 Akcija Mreže (Network Actions)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {NETWORK_ACTIONS.map((act, index) => (
                <div key={index} className="bg-slate-950 p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{act.icon}</span>
                    <div>
                      <h4 className="font-bold text-sm text-slate-100 font-['Space_Grotesk']">
                        {act.name}
                      </h4>
                      <span className="text-[10px] font-mono text-slate-500">Pravilnik str. {act.pageRef}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {act.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2C. CALL A MEETING */}
      {activeStepTab === 'meeting' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-bold font-['Space_Grotesk'] text-slate-100">
              Opcija 2C: Call a Meeting (Pozivanje Sastanka)
            </h2>
          </div>
          <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
            <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-200">
              <strong>OBAVEZNO PRAVILO:</strong> Ako na početku Koraka 2 nemate nijednog radnika u Break Room-u, <strong>MORATE</strong> pozvati sastanak (Call a Meeting)!
            </div>

            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="font-mono text-amber-400 font-bold">1.</span>
                <span><strong>Povratak radnika:</strong> Vratite sve svoje radnike iz Mreže nazad u Break Room. Za svakog radnika koji pokrije ikonu šake uzmite jedan Funding Bonus po izboru! (Radnici u svemiru koji pilotiraju ostaju u svemiru!).</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-mono text-amber-400 font-bold">2.</span>
                <span><strong>Jedna besplatna akcija:</strong> Odigrajte tačno 1 akciju sa lokacije koja je povezana sa barem jednim vašim Development-om. Za ovu akciju se NE postavlja radnik, i NE MOŽETE plaćati korišćenje tuđih zgrada!</span>
              </li>
            </ol>
          </div>
        </div>
      )}

      {/* 3. ACCOMPLISH COMPANY GOAL */}
      {activeStepTab === 'goal' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-bold font-['Space_Grotesk'] text-slate-100">
              Korak 3 Poteza: Accomplish Company Goal (Ispunjavanje Cilja Kompanije)
            </h2>
          </div>
          <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
            <p>
              Na kraju svakog svog poteza proveravate da li ste dostigli ili premašili uslov na nekom od 3 cilja kompanije:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-amber-400">•</span>
                <span>Prebacite svoju Progress kockicu iznad tog cilja na <strong>sledeće prazno mesto na Progress Track-u</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400">•</span>
                <span>Time trajno otkrivate <strong>ikonicu Krila (Wings Multiplier)</strong> u vašoj boji koja povećava bodovanje na svim budućim AGM sastancima!</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400">•</span>
                <span>Pomerite marker tog cilja za 1 nivo naviše – time otežavate cilj za sve ostale igrače!</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
