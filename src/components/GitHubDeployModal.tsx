import React, { useState } from 'react';
import { X, Check, Copy, ExternalLink, Terminal, Sparkles, GitBranch, ArrowRight, ShieldCheck } from 'lucide-react';

interface GitHubDeployModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubDeployModal: React.FC<GitHubDeployModalProps> = ({ isOpen, onClose }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const gitCommands = `git init
git add .
git commit -m "feat: Galactic Cruise 2P Companion for Danijel and Ceca"
git branch -M main
git remote add origin https://github.com/<TVOJ_USERNAME>/<IME_REPOZITORIJUMA>.git
git push -u origin main`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div
        className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
              <GitBranch className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-['Space_Grotesk'] text-slate-100 flex items-center gap-2">
                Objavi na GitHub Pages preko GitHub Actions
              </h3>
              <p className="text-xs text-slate-400">
                Fajl <code className="text-amber-300 font-mono">.github/workflows/deploy.yml</code> je već spreman u projektu!
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6 text-sm text-slate-300">
          {/* Step 1 */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-amber-300 text-sm font-['Space_Grotesk']">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-mono text-xs flex items-center justify-center border border-amber-500/40">
                  1
                </span>
                <span>Kreirajte novi repozitorijum na GitHub-u</span>
              </div>
              <a
                href="https://github.com/new"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-mono"
              >
                <span>github.com/new</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <p className="text-xs text-slate-400">
              Nazovite ga npr. <code className="text-slate-200">galactic-cruise</code> (može biti Public ili Private). Nemojte inicijalizovati sa README-om jer ga već imamo.
            </p>
          </div>

          {/* Step 2: Git commands */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-amber-300 text-sm font-['Space_Grotesk']">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-mono text-xs flex items-center justify-center border border-amber-500/40">
                  2
                </span>
                <span>Postavite (push) kod na GitHub</span>
              </div>
              <button
                onClick={() => copyToClipboard(gitCommands, 'git')}
                className="text-xs font-mono text-slate-300 hover:text-amber-300 px-2 py-1 rounded bg-slate-900 border border-slate-750 flex items-center gap-1.5 transition-colors"
              >
                {copiedCode === 'git' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Kopirano!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Kopiraj komande</span>
                  </>
                )}
              </button>
            </div>

            <pre className="p-3 bg-slate-900/90 rounded-lg text-xs font-mono text-slate-200 overflow-x-auto border border-slate-800 select-all">
              {gitCommands}
            </pre>
            <p className="text-[11px] text-slate-500">
              * Zameni <code className="text-amber-400">&lt;TVOJ_USERNAME&gt;</code> i <code className="text-amber-400">&lt;IME_REPOZITORIJUMA&gt;</code> svojim podacima.
            </p>
          </div>

          {/* Step 3: Enable GitHub Actions in Pages Settings */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2.5">
            <div className="flex items-center gap-2 font-bold text-amber-300 text-sm font-['Space_Grotesk']">
              <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-mono text-xs flex items-center justify-center border border-amber-500/40">
                3
              </span>
              <span>Uključite "GitHub Actions" izvor u podešavanjima repozitorijuma</span>
            </div>

            <div className="text-xs text-slate-300 space-y-1.5 pl-8">
              <div>
                1. Otvorite vaš repozitorijum na GitHub-u i kliknite na <strong>Settings</strong> tab na vrhu.
              </div>
              <div>
                2. U levom meniju izaberite <strong>Pages</strong>.
              </div>
              <div className="p-2.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-200">
                3. Pod <strong>Build and deployment</strong> ➔ <strong>Source</strong>:
                <br />
                Promenite sa <em>"Deploy from a branch"</em> na: <strong className="text-amber-400 font-mono">GitHub Actions</strong>.
              </div>
            </div>
          </div>

          {/* Step 4: Automated Deployment */}
          <div className="bg-emerald-950/30 p-4 rounded-xl border border-emerald-500/30 text-emerald-200 text-xs flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-emerald-300 block mb-1">Potpuna automatizacija:</strong>
              Čim uradite push na granu <code className="font-mono text-emerald-300">main</code>, GitHub Actions pokreće radni tok koji automatski kompajlira projekat (`npm run build`) i objavljuje ga na vašu besplatnu adresu:
              <br />
              <code className="mt-1.5 inline-block px-2 py-0.5 rounded bg-slate-900 border border-emerald-500/40 text-emerald-300 font-mono text-xs">
                https://&lt;username&gt;.github.io/&lt;repo&gt;/
              </code>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs font-mono transition-colors"
          >
            Razumem, zatvori
          </button>
        </div>
      </div>
    </div>
  );
};
