# Galactic Cruise Companion 🚀

Digitalni companion i 2-player asistent za društvenu igru **Galactic Cruise** (v1.2.5).
Specijalno prilagođen za **Danijela (Žuta boja)** i **Cecu (Crvena boja)**.

---

## 🌐 Automatski Publish na GitHub Pages (preko GitHub Actions)

U repozitorijumu je već kreiran radni tok: [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

### Koraci za aktivaciju:

1. **Kreirajte novi repozitorijum na GitHub-u** (npr. `galactic-cruise-companion`).
2. **Postavite (push) kod na GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Galactic Cruise Companion"
   git branch -M main
   git remote add origin https://github.com/<TVOJ_USERNAME>/<IME_REPOZITORIJUMA>.git
   git push -u origin main
   ```
3. **Uključite GitHub Actions za Pages:**
   * Otvorite vaš repozitorijum na GitHub-u.
   * Idite na **Settings** ➔ **Pages** (u levom meniju).
   * Pod sekcijom **Build and deployment** ➔ **Source**:
     * Izaberite: **`GitHub Actions`** (umesto "Deploy from a branch").
4. **Gotovo!**
   * Čim uradite push na granu `main` (ili `master`), GitHub Action će automatski pokrenuti build i objaviti aplikaciju.
   * Link ka vašem sajtu biće vidljiv u sekciji **Settings -> Pages** i na desnoj strani repozitorijuma pod **Deployments**:
     `https://<TVOJ_USERNAME>.github.io/<IME_REPOZITORIJUMA>/`

---

## 🛠️ Lokalno Pokretanje i Testiranje

```bash
# Instalacija zavisnosti
npm install

# Pokretanje lokalnog dev servera
npm run dev

# Testiranje produkcionog build-a
npm run build
npm run preview
```

---

## ✨ Ključne Funkcionalnosti

- **2-Player Mod (Danijel & Ceca):**
  - Interaktivni **NPC Bumping Simulator** sa kretanjem u smeru kazaljke na satu.
  - Podrška za regularne NPC radnike i NPC Experte (koji preskaču prazna polja).
  - AGM A i AGM B koraci za 2 igrača (postavljanje zgrada sa Tehnologija i promocija u Experta).
- **Kalkulator Poena (Scoring Engine):**
  - AGM A, AGM B i Završni AGM C.
  - Zalihe $\div 3$, Nelansirani brodovi penal ($-5\text{ VP}$), Reputacija pragovi, Kocke $\times$ Krila sa bonusom za najvišu reputaciju.
  - Automatsko proglašenje novog CEO-a i strogi 4-step tie-breaker.
- **Kraj Igre & Nerešeno:**
  - Procedura završne runde i stroga hijerarhija odlučivanja pobednika.
- **Interaktivna Postavka (Setup):**
  - Checklista sa filterom specifičnih pravila za 2 igrača.
- **Potez & Lansiranje:**
  - $T-5$ do $T-0$ odbrojavanje za poletanje broda.
- **Katalog & Baza Ikona:**
  - Rečnik svih simbola i anatomija kabina i segmenata.
- **Globalna Pretraga (Ctrl+K):**
  - Brza pretraga kroz sva pravila, FAQ i komponente.
