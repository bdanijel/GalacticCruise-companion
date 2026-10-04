/**
 * Galactic Cruise - Data Model & Rules Content
 * Based on Official Training Manual v1.2.5 & Company Records
 */

export interface SetupStep {
  id: string;
  stepNumber: number;
  title: string;
  category: 'main' | 'marketing' | 'player' | 'twoPlayer';
  description: string;
  twoPlayerNote?: string;
  pageRef: number;
  highlight?: string;
}

export interface RuleSection {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  summary: string;
  details: string[];
  rulesPage: number;
  keyConcepts?: { title: string; text: string }[];
  twoPlayerNote?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'turn' | 'launch' | 'reputation' | 'npc' | 'scoring' | 'cards' | 'edge';
  rulePage: number;
  keywords: string[];
  expansion?: string;
}

export interface IconItem {
  id: string;
  name: string;
  category: 'resources' | 'actions' | 'funding' | 'guests' | 'scoring' | 'board';
  symbol: string;
  color: string;
  description: string;
  rulePage: number;
  whereUsed: string;
}

export interface ComponentItem {
  id: string;
  name: string;
  serbianName: string;
  quantity: string;
  description: string;
  anatomyNotes?: string[];
  pageRef: number;
}

// Full FAQ items directly translated and clarified for Serbian players
export const FAQ_DATA: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Šta se dešava ako pozovem sastanak (Call a Meeting), a svi moji radnici su u svemiru?',
    answer: 'Ne dobijate nikakve Funding bonuse i ne povlačite radnike (oni ostaju u svemiru kao piloti). Ipak, i dalje imate pravo da odigrate jednu akciju sa lokacije koja je povezana sa barem jednim vašim Development-om. Ako nemate ni radnike ni Development u Mreži (Network), ne dobijate akciju, već samo "vrednu lekciju".',
    category: 'turn',
    rulePage: 33,
    keywords: ['meeting', 'sastanak', 'radnici', 'svemir', 'piloti', 'call a meeting']
  },
  {
    id: 'faq-2',
    question: 'Šta se dešava kada dobijem Reputaciju preko 18, ili je izgubim kada sam na 0?',
    answer: 'Kao što ikone na traci Reputacije pokazuju: ako ste na 18 i dobijete Reputaciju, dobijate 1 VP za svaki poen reputacije preko 18. Ako ste na 0 i izgubite Reputaciju, gubite 1 VP za svaki poen. Napomena: Ako ste na 0 VP i 0 Reputacije, ne smete izvesti akciju koja bi vas koštala gubitka Reputacije (zato igrači počinju sa 5 VP).',
    category: 'reputation',
    rulePage: 33,
    keywords: ['reputacija', 'reputation', 'maksimum 18', 'nula 0', 'vp', 'bodovi']
  },
  {
    id: 'faq-3',
    question: 'Kada tačno mogu potrošiti Reputaciju da pokupim bonuse ispod trake?',
    answer: 'Reputaciju možete spustiti u BILO KOM trenutku tokom vašeg poteza (ograničeno na najviše jednom po potezu). Ovo možete uraditi čak i u sredini akcije! Na primer: tokom Advertise akcije dodate gosta, skočite na traci preko ikone reklame, i odmah možete spustiti reputaciju da uzmete tu reklamu i njome platite drugog gosta.',
    category: 'reputation',
    rulePage: 33,
    keywords: ['trošenje reputacije', 'spend reputation', 'bonusi', 'tajming', 'oglašavanje']
  },
  {
    id: 'faq-4',
    question: 'Kada i kako plaćam korišćenje tuđih zgrada (Developments)?',
    answer: 'Možete platiti u BILO KOM trenutku vašeg poteza. Cena zavisi od vašeg trenutnog nivoa Reputacije: 0-6 Reputacije košta 2 novca po igraču/neutralnom razvoju; 7-14 košta 1 novac; 15+ košta 0 novca (besplatno!). Plaćate svakom igraču (ili banci za neutralne/NPC) koji tu ima zgradu. Kada jednom platite, imate pristup tim zgradama za čitav ostatak vašeg poteza!',
    category: 'turn',
    rulePage: 14,
    keywords: ['development', 'tuđi razvoj', 'plaćanje', 'cena', 'novac', 'reputation threshold']
  },
  {
    id: 'faq-5',
    question: 'Da li pri lansiranju mogu uzeti goste iz Reda (Queue) u Last-Minute rasprodaji umesto onih sa kupljenom kartom?',
    answer: 'Da, možete! Međutim, morate primeniti pravilo "Not Enough Room": gubite 2 Reputacije za svakog gosta koji je imao kupljenu kartu a niste ga poveli, i tog gosta premeštate na sam vrh reda (sekcija od 3 reklame).',
    category: 'launch',
    rulePage: 28,
    keywords: ['last-minute', 'karte', 'gosti', 'kazna', 'reputacija', 'not enough room', 'queue']
  },
  {
    id: 'faq-6',
    question: 'Mogu li ispuniti Company Goal na samom kraju partije?',
    answer: 'Da! Možete ispuniti Company Goal koji ste zadovoljili nakon posete Destinaciji tokom finalnog koraka pre AGM C.',
    category: 'scoring',
    rulePage: 33,
    keywords: ['company goal', 'cilj kompanije', 'kraj igre', 'agm c', 'destinacija']
  },
  {
    id: 'faq-7',
    question: 'Kako tačno funkcioniše bumping u dvoje (2-Player NPC Bumping)?',
    answer: 'Kada stavite radnika na lokaciju gde je NPC radnik, NPC se gura u smeru kazaljke na satu na sledeću lokaciju: 1) Ako je lokacija prazna, NPC ostaje tu. 2) Ako je na njoj protivnikov radnik, NPC ga izbacuje nazad u protivnikov Break Room (protivnik dobija Funding Bonus!). 3) Ako je na njoj drugi NPC ili vaš radnik, NPC preskače tu lokaciju i nastavlja u smeru kazaljke.',
    category: 'npc',
    rulePage: 34,
    keywords: ['2 igrača', 'npc', 'bumping', 'izguravanje', 'danijel', 'ceca', 'kazaljka na satu']
  },
  {
    id: 'faq-8',
    question: 'Kako se ponaša NPC Expert Worker u igri za dvoje?',
    answer: 'NPC Expert radnik (koji ulazi nakon AGM A i AGM B) ima specijalno pravilo: kada je izguran, on PRESKAČE prazna polja osim ako nema nijednog drugog mogućeg izbora! Cilj mu je da aktivno traži i izgura igrača!',
    category: 'npc',
    rulePage: 34,
    keywords: ['npc expert', 'ekspert radnik', 'preskakanje', '2p', 'izguravanje']
  },
  {
    id: 'faq-9',
    question: 'Šta se dešava ako ponestane pločica kokpita, motora ili nacrta (Blueprints)?',
    answer: 'Pločice Cockpit i Engine su ograničene: ako ponestane, polja ostaju prazna. Blueprints su takođe ograničeni: ako ponestane, popunite koliko ima, ostavljajući gornja polja prazna. Novac i Reklame (Money & Ads) NISU ograničeni – koristite bilo kakvu zamenu.',
    category: 'edge',
    rulePage: 33,
    keywords: ['nestanak komponenti', 'supply', 'cockpits', 'engines', 'blueprints', 'reklame']
  },
  {
    id: 'faq-10',
    question: 'Mogu li lansirati brod ako sam već potrošio sve Upgrade tokene sa Launch Tower-a?',
    answer: 'Da! U retkom slučaju da ste uklonili svih 8 Upgrade tokena, i dalje možete zakazati krstarenje i lansirati brod, samo se u tim koracima ne okreće i ne uklanja token.',
    category: 'launch',
    rulePage: 33,
    keywords: ['launch tower', 'upgrade tokeni', 'potrošeni', 'nema više tokena']
  },
  {
    id: 'faq-11',
    question: 'Kako se tačno rešava NEREŠEN REZULTAT na kraju igre?',
    answer: 'Ako dva ili više igrača imaju isti broj VP na kraju AGM C, pobednik se određuje po sledećem striktnom redosledu: 1) Igrač sa najviše Progress kockica na Progress Track-u (računajući i one u overflow-u). 2) Ako je i dalje nerešeno, igrač sa najvišom Reputacijom. 3) Ako je i dalje nerešeno, igrač sa najviše poena sakupljenih sa Cockpit pločica. 4) Ako je i dalje nerešeno, pobeđuje igrač koji je bio KASNIJI u redosledu poteza na početku igre!',
    category: 'scoring',
    rulePage: 32,
    keywords: ['nerešeno', 'tie', 'tiebreaker', 'pobednik', 'ceo', 'ravnopravnost', 'kraj']
  },
  {
    id: 'faq-12',
    question: 'Da li se neaktivirani ili nelansirani brod kažnjava?',
    answer: 'DA! Svaki Cockpit ima na početnoj strani -5 VP. Kada prvi put uspešno lansirate taj brod, pločica Cockpita se okreće i taj penal se uklanja. Ako dočekate kraj igre sa brodom koji nikada niste lansirali, gubite 5 VP od njegovog bodovanja!',
    category: 'scoring',
    rulePage: 22,
    keywords: ['penal', '-5 vp', 'nelansirani brod', 'cockpit', 'kazna']
  },
  {
    id: 'faq-13',
    question: 'Koliko brodova i segmenata mogu da imam?',
    answer: 'Standardni limit je maksimalno 3 broda, i svaki brod može imati do najviše 3 segmenta (kabine nastaju spajanjem segmenata). Ovaj limit se može povećati na 4 broda i 4 segmenta otključavanjem odgovarajućeg Upgrade-a na Adventurous destinaciji.',
    category: 'turn',
    rulePage: 21,
    keywords: ['maksimalno brodova', 'broj segmenata', 'upgrade', 'ograničenje', 'kabine']
  },
  {
    id: 'faq-14',
    question: 'Kako se igra Agenda kartica: za tekst ili za resurs?',
    answer: 'Svaku Agenda karticu možete odigrati na jedan od 2 načina: 1) Za njenu tekstualnu sposobnost (samo u trenutku koji odgovara ikoni restrikcije u gornjem desnom uglu). 2) Za naznačeni resurs (u bilo kom trenutku tokom vašeg poteza, ne troši akciju! Ako se resurs odmah potroši, ne morate imati slobodno mesto u skladištu). Limit u ruci na kraju poteza je 5 karata.',
    category: 'cards',
    rulePage: 26,
    keywords: ['agenda', 'kartica', 'tekst', 'resurs', 'hand limit', 'restrikcija']
  }
];

export const SETUP_STEPS: SetupStep[] = [
  {
    id: 's-1',
    stepNumber: 1,
    title: 'Glavna Tabla & Marketing Tabla',
    category: 'main',
    description: 'Postavite Glavnu tablu (Intro strana sa odštampanim pločicama ili Standard strana) u centar stola. Marketing tablu stavite desno od nje.',
    twoPlayerNote: 'Za 2 igrača koristite OBA Marketing Overlay kartona koji pokrivaju donja 2 polja za krstarenja!',
    pageRef: 8,
    highlight: '2-Player: Oba overlay-a'
  },
  {
    id: 's-2',
    stepNumber: 2,
    title: 'Agenda Kartice',
    category: 'main',
    description: 'Promešajte špil Agenda karata i stavite ga licem nadole pored table. Otkrijte 4 karte licem nagore na označena polja odozdo prema gore.',
    pageRef: 8
  },
  {
    id: 's-3',
    stepNumber: 3,
    title: 'Progress Track Pločice & Neutralne Kocke',
    category: 'main',
    description: 'Postavite pločice Progress Track-a označene tačnim brojem igrača (1, 2, 3 sekcije).',
    twoPlayerNote: 'VAŽNO: Za 2 igrača stavite SAMO JEDNU neutralnu kocku u donji levi ugao sekcije 2 (nemojte stavljati u sekciju 1 niti 3)!',
    pageRef: 8,
    highlight: '2P: Samo 1 neutralna kocka u sekciju 2'
  },
  {
    id: 's-4',
    stepNumber: 4,
    title: 'Company Goal Trekeri',
    category: 'main',
    description: 'Postavite trekere za ciljeve kompanije na odgovarajuća polja.',
    twoPlayerNote: 'U igri za 2 igrača: postavite Company Goal trekere na SREDNJA polja svakog cilja umesto na dno!',
    pageRef: 8,
    highlight: '2P: Srednja polja, a ne dno!'
  },
  {
    id: 's-5',
    stepNumber: 5,
    title: 'Tehnologije & Neutralni Razvoj',
    category: 'main',
    description: 'Uzmite nasumičnu pločicu Tehnologije licem nadole i pogledajte grafiku za postavljanje neutralnih Development zgrada. Postavite neutralne zgrade pokrivajući ikone Reputacije. Preostale Tehnologije:',
    twoPlayerNote: 'U igri za 2 igrača NE VRAĆAJTE neiskorišćene Tehnologije u kutiju! Ostavite ih po strani licem nadole jer se koriste za gradnju NPC zgrada tokom AGM A i B!',
    pageRef: 8,
    highlight: '2P: Sačuvajte neiskorišćene Tech pločice za NPC'
  },
  {
    id: 's-6',
    stepNumber: 6,
    title: 'Zalihe Resursa, Novca i Reklama',
    category: 'main',
    description: 'Postavite poslužavnik sa Novcem i Reklamama u domet igrača. U Storage Silo postavite male markere za Hranu, Kiseonik i Gorivo na polje "2". Popunite Blueprints (5 komada), Cockpits (4 komada sa -5 VP stranom gore) i Engine pločice (4 komada sa bonus stranom gore).',
    pageRef: 8
  },
  {
    id: 's-7',
    stepNumber: 7,
    title: 'Marketing Tabla & Red Gostiju (Queue)',
    category: 'marketing',
    description: 'Postavite Guest Bonus tokene na 3 predviđena mesta. Stavite 4 krstarenja (za 2 igrača) licem nagore: prvo 3 označena zvezdicom na vrh, pa još jedno. Izvucite goste za svaku destinaciju na otvorenim kartama.',
    twoPlayerNote: 'Za 2 igrača minimalni broj gostiju u redu je 7! Ako otvorene destinacije daju manje od 7, dodajte po 1 gosta svake boje dok ne pređe prag. Rasporedite ih u red (Queue) u 3 sekcije odozdo nagore.',
    pageRef: 9,
    highlight: '2P: Min 7 gostiju u redu'
  },
  {
    id: 's-8',
    stepNumber: 8,
    title: 'Priprema Tabli Igrača (Danijel & Ceca)',
    category: 'player',
    description: 'Svaki igrač bira boju (npr. Danijel Žuti, Ceca Crvena). Uzima početni Cockpit i Engine (sa zvezdicom), 2 radnika u Break Room, 2 Expert radnika na svoja mesta, 9 Developments, 3 velika treker resursa na "1", 4 braon Upgrade tokena gore u Launch Tower i 4 siva dole, 10 Novca, 2 Reklame.',
    twoPlayerNote: 'Kocke napretka: 3 kocke stavite IZNAD Company Goal pločice (ne u najlevlju kolonu!). VP treker na 5, Reputacija na 0. 100/200 VP žeton pored table.',
    pageRef: 12
  },
  {
    id: 's-9',
    stepNumber: 9,
    title: 'Određivanje Prvog Igrača & Početna Reputacija',
    category: 'player',
    description: 'Igrač koji je nedavno bio na krstarenju ili odmoru je prvi igrač. Počevši od prvog igrača u smeru kazaljke, svako vuče 1 Agenda kartu i postavlja početnu Reputaciju:',
    twoPlayerNote: '1. igrač = 0 Reputacije. 2. igrač = 1 Reputacija!',
    pageRef: 12,
    highlight: '1. igrač: 0 Rep | 2. igrač: 1 Rep'
  },
  {
    id: 's-10',
    stepNumber: 10,
    title: 'Pre-Game Potez (Reverse Turn Order)',
    category: 'player',
    description: 'U obrnutom redosledu poteza (drugi igrač, pa prvi): 13a) Postavite 1 besplatan Development iz leve kolone u Mrežu (gde nema zgrade, pokriva ikonu i daje +1 Reputaciju). 13b) Uzmite 1 Blueprint sa table besplatno. Zatim pomerite nacrte nadole i dopunite tablu.',
    pageRef: 13
  },
  {
    id: 's-11',
    stepNumber: 11,
    title: 'Specifična 2-Player Postavka za NPC Radnike',
    category: 'twoPlayer',
    description: 'Uzmite 6 zgrada, 2 regularna radnika i 2 Expert radnika neutralne boje (NPC). Postavite 2 regularna NPC radnika na Glavnu tablu: po jednog u svaku lokaciju u smeru kazaljke na satu od početnih neutralnih Developmenta. Preostale 6 zgrada i 2 NPC Experta stavite sa strane.',
    twoPlayerNote: 'Ova 2 NPC radnika prave gužvu u mreži od samog starta i aktiviraju bumping pravila!',
    pageRef: 34,
    highlight: '2 NPC radnika na tabli'
  }
];

export const TWO_PLAYER_DETAILS = {
  overview: 'Igra u dvoje u Galactic Cruise koristi fiksiranog NPC konkurenta (Non-Player Character) koji stvara dinamičan pritisak u Mreži (Network), popunjava prostor i omogućava lančano izguravanje (bumping), dok tokom AGM sastanaka gradi zgrade i pretvara se u opasnog Experta!',
  danijelColor: 'Žuta (Yellow)',
  cecaColor: 'Crvena / Pink (Red)',
  rules: [
    {
      title: 'Postavka za 2 igrača',
      points: [
        'Korišćenje oba Marketing overlay pokrivača (samo 4 aktivna slota za krstarenja).',
        'Company Goal trekeri počinju na SREDNJIM poljima (teži start nego u 3-4 igrača).',
        'U Progress Track pločicu sekcije 2 ide 1 neutralna kocka (u sekcije 1 i 3 ne ide ništa).',
        'Minimalno 7 gostiju u redu (Queue) na početku.',
        'Uzimaju se 6 Developments, 2 Workers i 2 Expert Workers treće boje (NPC).',
        'Dva regularna NPC radnika postavljaju se na lokacije odmah u smeru kazaljke od neutralnih zgrada.'
      ]
    },
    {
      title: 'NPC Bumping (Izguravanje regularnog NPC-a)',
      points: [
        'Kada postavite svog radnika na polje gde se već nalazi NPC radnik, NPC se gura u SMERU KAZALJKE NA SATU na sledeću lokaciju.',
        'Ako je sledeća lokacija PRAZNA: NPC tu staje i čeka dok ne bude ponovo izguran.',
        'Ako je na sledećoj lokaciji PROTIVNIKOV radnik: NPC izgurava protivnikovog radnika nazad u njegov Break Room! Protivnik odmah dobija Funding Bonus kao da ste ga vi direktno izgurali!',
        'Ako je na sledećoj lokaciji DRUGI NPC: Radnik koji se kreće preskače to polje i ide dalje u smeru kazaljke.',
        'Ako je na sledećoj lokaciji VAŠ SOPSTVENI radnik: NPC ga NEĆE izgurati (osim ako imate specijalnu moć da izgurate sebe). Umesto toga, NPC preskače vaše polje i nastavlja dalje u smeru kazaljke!'
      ]
    },
    {
      title: 'NPC Expert Bumping (Specijalno pravilo za Experte)',
      points: [
        'Nakon AGM A i AGM B, NPC radnici bivaju unapređeni u NPC Experte.',
        'NPC Expert radnici kada su izgurani PRESKAČU PRAZNA POLJA sve dok ne naiđu na lokaciju gde mogu da izguraju nekoga!',
        'Tek ako nema nijednog mogućeg polja za izguravanje, NPC Expert će stati na prazno polje.'
      ]
    },
    {
      title: 'AGM A & AGM B: Dodatni NPC koraci',
      points: [
        'Nakon što se popuni poslednja kocka u sekciji 1 (AGM A) ili sekciji 2 (AGM B), odradi se standardno Progress bodovanje.',
        'KORAK 1: Build NPC Developments -> Promešajte sačuvane Tehnologije, otkrijte jednu. Pogledajte polja označena za 2P. Postavite 1 NPC zgradu u svako prikazano područje (pokrivajući ikonu Reputacije ako je slobodna). Ako NPC tu već ima zgradu, preskače se i zgrada se odbacuje.',
        'KORAK 2: Hire NPC Expert -> Nakon AGM A, zamenite jednog regularnog NPC radnika sa NPC Expert radnikom (onog koji je najbliži gornjoj srednjoj lokaciji u smeru kazaljke). Nakon AGM B, zamenite i drugog NPC radnika.'
      ]
    }
  ]
};

export const LAUNCH_COUNTDOWN_STEPS = [
  {
    step: 'T-Minus 5',
    name: 'ASSIGN & BOARD (Izbor broda i ukrcavanje gostiju)',
    desc: 'Izaberite brod sa najmanje 1 kabinom koji nije na krstarenju. Stavite zakazano krstarenje iznad broda. Vratite Cruise Consultant sa marketing table. Ukrcajte goste: sa pločice krstarenja (besplatno) ili putem Last-Minute prodaje iz reda (plaćate cenu u reklamama 1-3 Ads) ili iz rezerve (4 Ads). Ako niste poveli gosta sa kupljenom kartom: gubite 2 Reputacije i šaljete ga na vrh reda.'
  },
  {
    step: 'T-Minus 4',
    name: 'PLACE PROGRESS CUBE (Kocka napretka)',
    desc: 'Uzmite Progress kocku iz svoje rezerve i stavite je na sledeće prazno polje na Progress Track-u (puni se redom sekcija 1, pa 2, pa 3).'
  },
  {
    step: 'T-Minus 3',
    name: 'PAY RESOURCES (Plaćanje resursa)',
    desc: 'Platite: 1 Food po gostu + 1 Food za Pilota; 1 Oxygen po Segmentu na brodu; Fuel jednak broju ikona goriva na pločici krstarenja. Može se plaćati sa table, Agenda kartama ili trošenjem Reputacije.'
  },
  {
    step: 'T-Minus 2',
    name: 'SCORE COCKPIT (Bodovanje kokpita & okretanje)',
    desc: 'Osvojite VP po kriterijumu na Cockpitu. Ako je ovo prvo lansiranje ovog broda, okrenite Cockpit licem nagore – time trajno brišete kaznu od -5 VP!'
  },
  {
    step: 'T-Minus 1',
    name: 'LOAD UP (Postavljanje Upgrade tokena)',
    desc: 'Uzmite Upgrade token koji ste okrenuli prilikom zakazivanja krstarenja (Schedule) i prebacite ga na Engine pločicu broda koji se lansira.'
  },
  {
    step: 'T-Minus 0',
    name: 'LIFTOFF & REFILL (Poletanje & popunjavanje tržišta)',
    desc: 'Postavite svog radnika (koji postaje Pilot) u Cockpit. Zatim stavite novo krstarenje na Marketing tablu, pomerite goste u redu koji se slažu sa novim destinacijama za 1 sekciju naniže, i dopunite nove goste na vrh reda onoliko koliko ih je poletelo!'
  }
];

export const TIE_BREAKER_RULES = {
  title: 'Strogi Pravilnik za Nerešen Rezultat (Tie-Breaker Hierarchy)',
  intro: 'Na kraju trećeg godišnjeg sastanka akcionara (AGM C), igrač sa najviše Victory Poena (VP) postaje novi CEO kompanije Galactic Cruise. Ukoliko postoji izjednačen rezultat, Travis E. Preston i Upravni Odbor odlučuju pobednika po sledećim striktnim kriterijumima:',
  steps: [
    {
      level: 1,
      title: '1. Broj Progress Kockica (Progress Cubes)',
      desc: 'Pobeđuje igrač koji ima VIŠE svojih Progress kockica postavljenih na Progress Track-u (računajući i kockice u zoni prelivanja / overflow zoni pored sekcije 3).',
      why: 'Ovo nagrađuje direktan doprinos razvoju i lansiranju brodova kompanije.'
    },
    {
      level: 2,
      title: '2. Nivo Reputacije (Reputation Level)',
      desc: 'Ako je i dalje nerešeno, pobeđuje igrač sa VEĆOM trenutnom Reputacijom na skali od 0 do 18+.',
      why: 'Uglađeniji menadžer ima bolju reputaciju kod investitora i kolega.'
    },
    {
      level: 3,
      title: '3. Bodovi sa Kokpita (Cockpit VP)',
      desc: 'Ako je i dalje nerešeno, pobeđuje igrač koji je sakupio VIŠE poena direktno sa kriterijuma na svojim Cockpit pločicama.',
      why: 'Pokazuje tehničku superiornost i bolju konstrukciju flote.'
    },
    {
      level: 4,
      title: '4. Početni Redosled Poteza (Turn Order Position)',
      desc: 'Ako je rezultat i dalje nerešen nakon svih provera, pobeđuje igrač koji je bio KASNIJI u početnom redosledu poteza!',
      why: 'U igri za 2 igrača (Danijel i Ceca), ako su potpuno izjednačeni u VP, kockicama, reputaciji i kokpitima, pobedu nosi igrač koji je igrao kao DRUGI na početku partije!'
    }
  ]
};

export const ICON_GLOSSARY: IconItem[] = [
  {
    id: 'ic-food',
    name: 'Food (Hrana)',
    category: 'resources',
    symbol: '🥖',
    color: 'amber',
    description: 'Osnovni resurs. Potreban za hranjenje gostiju i pilota pri lansiranju (1 po gostu + 1 za pilota). Čuva se u gornjem redu zaliha.',
    rulePage: 13,
    whereUsed: 'Player Board, Storage Silo, Lansiranje broda'
  },
  {
    id: 'ic-oxygen',
    name: 'Oxygen (Kiseonik)',
    category: 'resources',
    symbol: '💧',
    color: 'sky',
    description: 'Plavi resurs. Potreban za održavanje atmosfere u segmentima broda (1 po segmentu broda koji poleće). Čuva se u srednjem redu zaliha.',
    rulePage: 13,
    whereUsed: 'Player Board, Storage Silo, Lansiranje broda'
  },
  {
    id: 'ic-fuel',
    name: 'Fuel (Gorivo)',
    category: 'resources',
    symbol: '🩸',
    color: 'rose',
    description: 'Crveni resurs. Potreban za pogon broda (1 po ikoni goriva na pločici krstarenja). Čuva se u donjem redu zaliha.',
    rulePage: 13,
    whereUsed: 'Player Board, Storage Silo, Lansiranje broda'
  },
  {
    id: 'ic-money',
    name: 'Money (Novac)',
    category: 'funding',
    symbol: '💵',
    color: 'emerald',
    description: 'Sredstvo plaćanja gradnje zgrada, unajmljivanja eksperata, kupovine zaliha i plaćanja pristupa tuđim razvojima u mreži.',
    rulePage: 14,
    whereUsed: 'Plaćanje akcija, troškovi zgrada, snabdevanje'
  },
  {
    id: 'ic-ads',
    name: 'Ads (Reklame)',
    category: 'funding',
    symbol: '📢',
    color: 'fuchsia',
    description: 'Kupovina karata za goste, oglašavanje i bodovanje putnika na destinacijama (1 Ad za preferiranu, 2 Ads za drugu destinaciju).',
    rulePage: 16,
    whereUsed: 'Advertise akcija, bodovanje gostiju na destinaciji, Last-Minute sale'
  },
  {
    id: 'ic-reputation',
    name: 'Reputation (Reputacija ⭐)',
    category: 'funding',
    symbol: '⭐',
    color: 'yellow',
    description: 'Uglađenost i status. Smanjuje cenu korišćenja tuđih zgrada (2$ -> 1$ -> 0$). Može se jednom u potezu žrtvovati za resurse/reklame/novac ispod treka.',
    rulePage: 14,
    whereUsed: 'Reputation trek, popust na akcije, osvajanje bonus kocke na AGM-u'
  },
  {
    id: 'ic-funding-bonus',
    name: 'Funding Bonus (Bonus Finansiranja 🖐️)',
    category: 'funding',
    symbol: '🖐️',
    color: 'amber',
    description: 'Dobija se kad god se radnik vrati u Break Room (usled izguravanja/bumpinga, poziva na sastanak ili povratka broda). Bira se jedan vidljivi bonus u vrhu Launch Tower-a.',
    rulePage: 14,
    whereUsed: 'Launch Tower, Bumping, Call a Meeting, Povratak na Zemlju'
  },
  {
    id: 'ic-dest-adv',
    name: 'Adventurous Destination (Narandžasta)',
    category: 'guests',
    symbol: '🧗',
    color: 'orange',
    description: 'Destinacija za avanturiste. Gosti donose novac u Danu u Svemiru (Day in Space) ili bodove pri poseti destinaciji. Daje Upgrade za povećanje flote na 4 broda / 4 segmenta.',
    rulePage: 16,
    whereUsed: 'Krstarenja, Gosti, Upgrade slotovi'
  },
  {
    id: 'ic-dest-rel',
    name: 'Relaxing Destination (Ljubičasta)',
    category: 'guests',
    symbol: '🍹',
    color: 'purple',
    description: 'Destinacija za relaksaciju i odmor. Gosti donose resurse u Danu u Svemiru ili bodove na destinaciji.',
    rulePage: 16,
    whereUsed: 'Krstarenja, Gosti, Upgrade slotovi'
  },
  {
    id: 'ic-dest-fam',
    name: 'Family Destination (Tirkizna)',
    category: 'guests',
    symbol: '👨‍👩‍👧',
    color: 'cyan',
    description: 'Porodična destinacija. Gosti donose reklame u Danu u Svemiru ili bodove na destinaciji.',
    rulePage: 16,
    whereUsed: 'Krstarenja, Gosti, Upgrade slotovi'
  },
  {
    id: 'ic-wings',
    name: 'Wings Multiplier (Krila 🪽)',
    category: 'scoring',
    symbol: '🪽',
    color: 'blue',
    description: 'Množilac poena za Progress kocke. Počinjete sa 1 otkrivenim krilom, a svako ispunjenje Company Goal-a otkriva još jedno krilo (do 4 krila ukupno)!',
    rulePage: 30,
    whereUsed: 'AGM A, AGM B i AGM C Progress bodovanje'
  },
  {
    id: 'ic-penalty',
    name: '-5 VP Nelansirani Brod',
    category: 'scoring',
    symbol: '⚠️',
    color: 'red',
    description: 'Kazna od 5 poena ako brod nabavljen u toku partije nikada nije doživeo svoje lansiranje u svemir pre kraja igre.',
    rulePage: 22,
    whereUsed: 'Cockpit pločica početna strana'
  }
];

export const NETWORK_ACTIONS = [
  {
    name: 'Build a Development (Izgradnja Razvoja)',
    icon: '🏗️',
    description: 'Uzmite najlevlju zgradu iz reda Hrane, Kiseonika ili Goriva. Platite cenu na dnu kolone (kombinacija novca i tog resursa). Postavite je u Mrežu na praznu vezu (donosi 1 Reputaciju) ili ispod Tehnologije (prva aktivira Tehnologiju). Povećava kapacitet tog resursa za 1.',
    pageRef: 18
  },
  {
    name: 'Hire an Expert Worker (Zapošljavanje Eksperta)',
    icon: '👔',
    description: 'Unajmite jednog od svoja 2 Ekspert radnika. Desni košta 2 novca po preostalom razvoju u redovima Hrane i Kiseonika. Levi košta 3 novca po preostalom tokenu u dnu Launch Tower-a. Ekspert ide u Break Room (dobija se Funding bonus) i ima specijalnu moć za tu partiju.',
    pageRef: 19
  },
  {
    name: 'Purchase Supplies (Kupovina Zaliha)',
    icon: '🛒',
    description: 'Možete platiti 1 novac za 2 resursa po izboru, i/ili platiti 1 novac za 2 reklame (Ads). Obe opcije možete uraditi jednom po ovoj akciji.',
    pageRef: 19
  },
  {
    name: 'Acquire Blueprints (Nacrti Broda)',
    icon: '📐',
    description: 'Uzmite do 2 Blueprint pločice sa glavne table besplatno u svoju ličnu zalihu (maksimalno 5 u ruci). Popunite tablu odozdo nagore.',
    pageRef: 20
  },
  {
    name: 'Build Ship Segments (Ugradnja Segmenata)',
    icon: '🚀',
    description: 'Ugradite do 2 segmenta u svoje brodove. Sa svoje table plaćate cenu sa leve strane. Direktno sa table možete graditi uz doplatu novca i reputacije. Dva segmenta stvaraju kabinu za smeštaj gosta.',
    pageRef: 21
  },
  {
    name: 'Acquire New Ship (Novi Brod: Kokpit + Motor)',
    icon: '🛸',
    description: 'Uzmite par Cockpit i Engine sa table. Odmah uzmite bonus sa motora i okrenite ga. Cockpit stavite na stranu sa -5 VP penalom. Možete imati najviše 3 broda (ili 4 uz Upgrade).',
    pageRef: 22
  },
  {
    name: 'Gain Resources (Uzimanje Resursa iz Silosa)',
    icon: '🌾',
    description: 'Uzmite do 3 resursa iz Storage Silosa besplatno (spuštate markere u silosu, a dižete na svojoj tabli, u okviru svog kapaciteta).',
    pageRef: 23
  },
  {
    name: 'Refill Storage Silo (Dopuna Silosa)',
    icon: '⛽',
    description: 'Odbacite 1 Agenda kartu iz ruke: podignite jedan resurs u Silosu na maksimalnih 5. Dobijate 1 novac za svaki korak za koji je podignut + 1 Reputaciju!',
    pageRef: 23
  },
  {
    name: 'Schedule a Cruise (Zakazivanje Krstarenja)',
    icon: '📅',
    description: 'Stavite svog Cruise Consultanta na slobodno krstarenje. Okrenite 1 Upgrade token u svom Launch Toweru i uzmite bonus sa njega (gornji daju mali bonus i dupliraju funding, donji daju 4 resursa/reklame/novca i pojeftinjuju eksperta).',
    pageRef: 24
  },
  {
    name: 'Advertise for a Cruise (Oglašavanje za Krstarenje)',
    icon: '📢',
    description: 'Privucite 1 ili 2 gosta na slobodna mesta krstarenja. Plaćate cenu iz reda (1, 2 ili 3 Ads) ili iz zalihe (4 Ads). Dobijate 1 novac po destinaciji na pločici + 1 Reputaciju ako destinacija odgovara boji gosta.',
    pageRef: 25
  },
  {
    name: 'Draw Agenda Cards (Vučenje Agendi)',
    icon: '📇',
    description: 'Uzmite do 2 Agenda karte iz ponude (ili platite 1 Reputaciju po karti da uzmete sa vrha gomile za odbacivanje).',
    pageRef: 26
  },
  {
    name: 'Refill Agenda Cards (Osvežavanje Agendi)',
    icon: '🔄',
    description: 'Uzmite sve bonuse sa praznih polja za karte u ponudi, odbacite preostale karte i stavite 4 nove sa špila.',
    pageRef: 27
  }
];

export const COMPONENTS_CATALOG: ComponentItem[] = [
  {
    id: 'c-mainboard',
    name: 'Main Board',
    serbianName: 'Glavna Tabla',
    quantity: '1 dvostrana',
    description: 'Prikazuje centralnu Mrežu sa 6 kancelarijskih zgrada i vezama, Storage Silo, ponudu za 5 Blueprinta, 4 para Cockpit/Engine, 4 Tehnologije, Progress Track za odgovarajući broj igrača i Reputation trek (0-18+).',
    pageRef: 6
  },
  {
    id: 'c-marketing',
    name: 'Marketing Board',
    serbianName: 'Marketing Tabla',
    quantity: '1 tabla + 2 overlay-a',
    description: 'Sadrži prostore za zakazivanje krstarenja, bonuse gostiju, red čekanja putnika (Queue) podeljen u 3 nivoa cena reklama (1, 2, 3 Ads) i kancelarije Cruise Consultant konsultanata.',
    pageRef: 9
  },
  {
    id: 'c-playerboard',
    name: 'Player Board',
    serbianName: 'Tabla Igrača',
    quantity: '4 table (1 po boji)',
    description: 'Sadrži Launch Tower sa 8 slotova za Upgrade tokene, Break Room za odmor radnika, Launch Elevator za odbrojavanje lansiranja (5 do 0), skladište za 3 resursa (Hrana, Kiseonik, Gorivo) i 9 polja za Developments.',
    pageRef: 12
  },
  {
    id: 'c-blueprints',
    name: 'Blueprint / Ship Segment Tiles',
    serbianName: 'Nacrti i Segmenti Broda',
    quantity: '48 pločica',
    description: 'Dvostrane pločice: prednja strana je plavi Blueprint sa cenom gradnje u novcu i resursima, a poleđina je luksuzni segment broda sa oznakom tipa gostiju i pobedonosnim poenima (VP).',
    anatomyNotes: ['Gornja i donja ivica imaju po pola kabine', 'Dva segmenta daju 1 punu kabinu za 1 gosta', 'Plavi VP simbol donosi poene na kraju igre'],
    pageRef: 20
  },
  {
    id: 'c-cockpits',
    name: 'Cockpit Tiles',
    serbianName: 'Pločice Kokpita',
    quantity: '15 pločica + 4 početne',
    description: 'Prednji deo broda. Početna strana nosi -5 VP kaznu i kriterijum bodovanja. Kada se brod prvi put lansira, okreće se na čistu stranu bez penala i obezbeđuje mesto za Pilota.',
    pageRef: 22
  },
  {
    id: 'c-engines',
    name: 'Engine Tiles',
    serbianName: 'Pločice Motora',
    quantity: '15 pločica + 4 početne',
    description: 'Zadnji deo broda. Kada se uzme iz ponude, daje momentalni jednokratni bonus resursa, novca ili reklama, a zatim se okreće na stranu sa ležištem za Upgrade token.',
    pageRef: 22
  },
  {
    id: 'c-cruises',
    name: 'Cruise Tiles',
    serbianName: 'Pločice Krstarenja',
    quantity: '18 pločica',
    description: 'Prikazuju rutu leta: trošak goriva, stanice kroz svemir (Destinacije: Adventurous, Relaxing, Family, i Day in Space dane zabave u svemiru), i završni povratak na Zemlju.',
    pageRef: 24
  },
  {
    id: 'c-guests',
    name: 'Guest Figures',
    serbianName: 'Figurice Gostiju',
    quantity: '36 gostiju (po 12 narandžastih, ljubičastih, tirkiznih)',
    description: 'Predstavljaju putnike spremne za luksuzna svemirska putovanja koji čekaju u redu ispred kompanije.',
    pageRef: 4
  },
  {
    id: 'c-agenda',
    name: 'Agenda Cards',
    serbianName: 'Agenda Kartice',
    quantity: '36 karata',
    description: 'Dodeljuju se od strane Upravnog odbora. Svaka karta može da se odigra za snažan taktički efekat ili da se instant odbaci za 1 besplatan resurs.',
    pageRef: 26
  }
];
