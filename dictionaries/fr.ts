// French is the source of truth for the dictionary shape — `ar.ts` is typed
// against `Dict`, so the two files stay structurally locked together.
//
// Price-bearing strings are FUNCTIONS taking an already-formatted price. Never
// hardcode a price here: it would silently desync from `lib/config.ts`.

export const fr = {
  announce: "Livraison gratuite partout au Maroc — Paiement à la livraison",
  nav: { brand: "Vitasilk", cta: "Commander" },
  hero: {
    eyebrow: "Vitasilk Professional",
    title1: "Filler",
    title2: "Glow",
    subtitle:
      "Le kit en deux étapes qui agit au cœur de la fibre au lieu de la couvrir. Huiles de copaïba et de pracaxi, complexe d'acides aminés — et aucun temps de pause.",
    cta: (price: string) => `Commander — ${price}`,
    badge1: "0 % de formol",
    badge2: "Kit 2 × 1 L",
    badge3: "Sans temps de pause",
    scroll: "Découvrir",
  },
  marquee: [
    "Protéine brésilienne",
    "Huile de copaïba",
    "Huile de pracaxi",
    "Sans temps de pause",
    "Complexe d'acides aminés",
    "Kit professionnel 2 × 1 L",
  ],
  problem: {
    title: "Un cheveu terne n'est pas sale. Il a perdu de sa matière.",
    subtitle:
      "Les colorations, la chaleur et l'eau calcaire peuvent fragiliser la fibre capillaire. Une surface capillaire irrégulière reflète moins bien la lumière, ce qui peut rendre les cheveux plus ternes, et les soins de surface glissent sur un cheveu poreux.",
    points: [
      "Cheveux poreux qui absorbent rapidement les soins, mais perdent facilement leur hydratation",
      "Longueurs plates, qui manquent de corps",
      "Éclat éteint : la lumière se reflète moins bien",
      "Pointes qui fourchent et cassent au brossage",
    ],
    promiseTitle: "La promesse Filler Glow",
    promise:
      "Apporter, puis lisser. L'étape 1 purifie et prépare la fibre, l'étape 2 lui apporte des acides aminés et de la protéine brésilienne, puis les huiles de copaïba et de pracaxi aident à lisser la surface. Les cheveux paraissent plus souples, plus brillants et plus faciles à coiffer.",
  },
  safety: {
    title: "Sans formol. Sans acide glyoxylique.",
    subtitle:
      "Un soin protéiné professionnel à utiliser en respectant les instructions et les précautions indiquées.",
    items: [
      {
        title: "Sans formol",
        desc: "Une formule conçue pour offrir une application plus confortable.",
      },
      {
        title: "Sans acide glyoxylique",
        desc: "Aucune des substances mises en cause dans les lissages agressifs.",
      },
      {
        title: "Tous types de cheveux",
        desc: "Colorés, méchés, bouclés ou naturels — la formule est conçue pour accompagner les besoins de différents types de cheveux.",
      },
    ],
  },
  protocol: {
    eyebrow: "Le protocole",
    title: "Deux étapes. Aucun temps de pause.",
    subtitle:
      "Un flacon prépare, l'autre apporte les actifs. C'est cette séquence qui fait la différence : un soin appliqué sur une fibre non préparée reste en surface et part au premier lavage.",
    noPause: "Sans temps de pause",
    noPauseNote:
      "Vous enchaînez les deux étapes sans attendre. Comptez environ 45 minutes en tout, pas les 2 heures d'un lissage classique.",
    steps: [
      {
        eyebrow: "Étape 1",
        title: "Shampooing pré-traitement",
        desc: "Il élimine le calcaire, les silicones et les résidus déposés sur la fibre, et la prépare à recevoir l'étape 2. Sans lui, l'étape 2 pénètre beaucoup moins bien — elle reste posée dessus.",
        volume: "1 L",
      },
      {
        eyebrow: "Étape 2",
        title: "Protéine brésilienne",
        desc: "Le complexe d'acides aminés et la protéine contribuent à améliorer l'apparence de la fibre, et les huiles de copaïba et de pracaxi aident à lisser la surface et à apporter de la brillance.",
        volume: "1 L",
      },
    ],
  },
  ingredients: {
    eyebrow: "La formule",
    title: "Copaïba, pracaxi et acides aminés",
    subtitle: "Six actifs venus d'Amazonie pour agir au cœur de la fibre au lieu de la maquiller.",
    items: [
      {
        name: "Huile de copaïba",
        desc: "La résine amazonienne : elle aide à apaiser le cuir chevelu et à limiter les sensations d'inconfort.",
      },
      {
        name: "Huile de pracaxi",
        desc: "L'huile de pracaxi contient naturellement des acides gras et aide à nourrir les longueurs.",
      },
      {
        name: "Complexe d'acides aminés",
        desc: "Les briques du cheveu, assez petites pour pénétrer la fibre et contribuer à améliorer son apparence.",
      },
      {
        name: "Protéine brésilienne",
        desc: "Hydrolysée pour pénétrer la fibre et contribuer durablement à améliorer son apparence.",
      },
      {
        name: "Kératine",
        desc: "La protéine qui compose le cheveu : elle lisse la fibre et lui redonne du corps.",
      },
      {
        name: "Panthénol",
        desc: "Provitamine B5 : elle aide à maintenir l'hydratation au cœur du cheveu.",
      },
    ],
  },
  benefits: {
    title: "Ce qui fait la différence",
    subtitle: "Une formule professionnelle pensée pour des résultats visibles et durables",
    // order matches ICONS[] in components/Benefits.tsx
    items: [
      {
        title: "Cheveux lisses et disciplinés",
        desc: "Les frisottis se calment et le brushing tient plus longtemps, même par temps humide.",
      },
      {
        title: "L'effet glow",
        desc: "Une surface plus lisse reflète mieux la lumière : les cheveux paraissent plus brillants.",
      },
      {
        title: "Action en profondeur",
        desc: "Les acides aminés pénètrent la fibre là où les masques restent en surface.",
      },
      {
        title: "Kit professionnel 2 × 1 L",
        desc: "Deux litres, les deux étapes : des dizaines d'applications, des mois d'utilisation.",
      },
    ],
  },
  brandStory: {
    eyebrow: "Origine Amazonie",
    title: "Deux huiles, une seule forêt",
    subtitle:
      "Le copaïba et le pracaxi poussent côte à côte en Amazonie, et les coiffeurs brésiliens les associent depuis toujours : l'un apaise, l'autre nourrit en profondeur. Vitasilk les réunit dans un protocole professionnel.",
  },
  beforeAfter: {
    title: "Avant / après : découvrez la transformation",
    subtitle: "Faites glisser le curseur",
    before: "Avant",
    after: "Après",
  },
  howto: {
    title: "3 gestes pour un résultat digne d'un salon",
    steps: [
      {
        title: "Lavez — Étape 1",
        desc: "Lavez avec le shampooing pré-traitement, deux fois si les cheveux sont chargés. Essorez délicatement sans sécher complètement.",
      },
      {
        title: "Appliquez — Étape 2",
        desc: "Répartissez la protéine mèche par mèche sur cheveux essorés — environ 60 à 100 ml selon la longueur. Aucun temps de pause : enchaînez dès que tout est couvert.",
      },
      {
        title: "Rincez & coiffez",
        desc: "Rincez selon les instructions, séchez, puis passez le fer à lisser à la température recommandée.",
      },
    ],
  },
  testimonials: {
    title: "Elles l'ont adopté",
    subtitle: "Plus de 12 000 clientes satisfaites au Maroc",
    items: [
      {
        name: "Dounia — Témara",
        text: "Mes cheveux étaient poreux à force de mèches, ils ne gardaient plus rien. En suivant le protocole, je les ai trouvés plus épais au toucher et plus faciles à coiffer.",
      },
      {
        name: "Yasmine — Berrechid",
        text: "Ce qui m'a convaincue, c'est l'absence de temps de pause. J'ai fait les deux étapes à la suite, en moins d'une heure tout était fini.",
      },
      {
        name: "Naima — Khémisset",
        text: "Je suis coiffeuse et je l'utilise en cabine. Le shampooing de l'étape 1 change vraiment tout : la protéine accroche différemment après.",
      },
      {
        name: "Widad — Taza",
        text: "Six semaines après, mes pointes fourchent beaucoup moins. Et avec deux litres j'en ai pour la saison entière au salon.",
      },
    ],
  },
  offer: {
    title: "Offre spéciale",
    subtitle: "Stock limité — profitez du prix spécial",
    unit: "Filler Glow Complex — kit 2 × 1 L",
    save: (pct: number) => `Économisez ${pct} %`,
    perLitre: (price: string) => `soit ${price} le litre`,
    twoBottles: "2 flacons — 2 litres au total",
    freeDelivery: "Livraison gratuite",
    cod: "Paiement à la livraison",
    guarantee: "Satisfaite ou remboursée",
    countdown: { title: "L'offre expire dans :", h: "Heures", m: "Minutes", s: "Secondes" },
    cta: "Commander maintenant",
  },
  form: {
    title: "Commander maintenant",
    subtitle:
      "Remplissez le formulaire — nous vous appelons pour confirmer. Paiement à la livraison.",
    name: "Nom complet",
    namePh: "Votre nom et prénom",
    phone: "Téléphone",
    phonePh: "06 XX XX XX XX",
    city: "Ville",
    cityPh: "Votre ville",
    qty: "Quantité",
    total: "Total",
    submit: "Confirmer ma commande",
    sending: "Envoi en cours…",
    successTitle: "Commande reçue !",
    successText:
      "Merci ! Notre équipe vous appellera très vite pour confirmer la livraison.",
    errorTitle: "L'envoi a échoué",
    errorText:
      "Vérifiez votre connexion et réessayez, ou commandez directement sur WhatsApp — votre commande est conservée.",
    retry: "Réessayer",
    whatsapp: "Commander via WhatsApp",
    errors: {
      name: "Veuillez entrer votre nom",
      phone: "Numéro de téléphone invalide",
      city: "Veuillez entrer votre ville",
    },
  },
  faq: {
    title: "Questions fréquentes",
    items: [
      {
        q: "Contient-il du formol ou de l'acide glyoxylique ?",
        a: "Le Filler Glow ne contient aucune de ces deux substances. C'est un soin protéiné : il aide à discipliner et à améliorer l'apparence de la fibre sans elles et sans vapeurs irritantes. La liste complète des ingrédients figure sur l'étiquette de chaque flacon.",
      },
      {
        q: "Il n'y a vraiment aucun temps de pause ?",
        a: "Aucun. Vous appliquez l'étape 2 sur cheveux essorés et vous enchaînez directement sur le rinçage et le brushing. Comptez environ 45 minutes en tout, contre 2 heures pour un lissage classique.",
      },
      {
        q: "Puis-je sauter l'étape 1 et n'utiliser que la protéine ?",
        a: "Ce n'est pas conseillé. Le shampooing pré-traitement retire le calcaire et les silicones déposés sur la fibre : sans lui la protéine reste en surface et l'effet part au premier lavage. C'est précisément pour cela que le kit est vendu en deux flacons.",
      },
      {
        q: "Convient-il à tous les types de cheveux ?",
        a: "Il convient aux cheveux colorés, méchés, bouclés ou naturels, et il est particulièrement utile sur cheveux poreux. Sur cheveux bouclés, il discipline et allège la boucle sans la supprimer : c'est un soin, pas un défrisage. Sur cheveux décolorés ou très fragilisés, testez d'abord sur une mèche.",
      },
      {
        q: "Faut-il faire un test avant la première utilisation ?",
        a: "Oui. Appliquez une petite quantité derrière l'oreille et sur une mèche discrète 48 h avant, et vérifiez qu'aucune réaction n'apparaît. Ce test est recommandé pour tout soin capillaire professionnel.",
      },
      {
        q: "Quelle quantité utiliser, et à quelle fréquence ?",
        a: "Environ 60 à 100 ml d'étape 2 par application, selon la longueur et l'épaisseur des cheveux. Une application toutes les 4 à 6 semaines suffit. Sur cheveux très poreux, deux applications à quinze jours d'intervalle pour démarrer, puis on espace.",
      },
      {
        q: "Combien d'applications le kit permet-il ?",
        a: "Selon la longueur et l'épaisseur des cheveux, comptez 10 à 16 protocoles complets — plusieurs mois d'utilisation, ou une saison entière en salon.",
      },
      {
        q: "Quelles précautions faut-il prendre ?",
        a: "Réservé à un usage externe. Évitez le contact avec les yeux, aérez la pièce pendant le passage du fer, et n'utilisez pas les produits sur un cuir chevelu irrité ou lésé. Tenir hors de portée des enfants.",
      },
      {
        q: "Comment se passe la livraison ?",
        a: "Livraison gratuite partout au Maroc en 24 à 48 h. Vous payez uniquement à la réception de votre commande.",
      },
    ],
  },
  footer: {
    tagline: "Le protocole brésilien en deux étapes, chez vous.",
    rights: "© 2026 Vitasilk Professional. Tous droits réservés.",
  },
  sticky: { cta: "Commander" },
};

export type Dict = typeof fr;
