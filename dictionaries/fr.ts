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
      "Le kit en deux étapes qui comble la fibre au lieu de la couvrir. Huiles de copaïba et de pracaxi, complexe d'acides aminés — et aucun temps de pause.",
    cta: (price: string) => `Je commande — ${price}`,
    badge1: "0% Formol",
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
    "Kit salon 2 × 1 L",
  ],
  problem: {
    title: "Un cheveu terne n'est pas sale. Il est creux.",
    subtitle:
      "Colorations, chaleur, eau calcaire : la fibre se vide et se creuse. La lumière n'a plus rien à accrocher, et les soins de surface glissent sur un cheveu poreux au lieu de le remplir.",
    points: [
      "Cheveux poreux qui boivent tout et ne retiennent rien",
      "Longueurs plates, sans densité ni relief",
      "Éclat éteint : la lumière ne se reflète plus",
      "Pointes qui fourchent et cassent au brossage",
    ],
    promiseTitle: "La promesse Filler Glow",
    promise:
      "Combler, puis sceller. L'étape 1 purifie et ouvre la fibre, l'étape 2 la remplit d'acides aminés et de protéine brésilienne, puis les huiles de copaïba et de pracaxi referment l'écaille. Le cheveu retrouve sa densité — et la lumière retrouve une surface où accrocher.",
  },
  safety: {
    title: "Sans formol. Sans acide glyoxylique.",
    subtitle:
      "Un soin protéiné professionnel que vous pouvez répéter sereinement, saison après saison.",
    items: [
      {
        title: "Sans formol",
        desc: "Pas de vapeurs irritantes pour les yeux ni pour les voies respiratoires.",
      },
      {
        title: "Sans acide glyoxylique",
        desc: "Aucune des substances mises en cause dans les lissages agressifs.",
      },
      {
        title: "Tous types de cheveux",
        desc: "Colorés, méchés, bouclés ou naturels — le complexe s'adapte à la porosité.",
      },
    ],
  },
  protocol: {
    eyebrow: "Le protocole",
    title: "Deux étapes. Aucun temps de pause.",
    subtitle:
      "Un flacon prépare, l'autre comble. C'est cette séquence qui fait la différence : un soin appliqué sur une fibre non préparée reste en surface et part au premier lavage.",
    noPause: "Sans temps de pause",
    noPauseNote:
      "Vous enchaînez les deux étapes sans attendre. Comptez environ 45 minutes en tout, pas les 2 heures d'un lissage classique.",
    steps: [
      {
        eyebrow: "Étape 1",
        title: "Shampooing Pré-Traitement",
        desc: "Il élimine le calcaire, les silicones et les résidus qui bouchent la fibre, puis ouvre l'écaille. Sans lui, l'étape 2 ne pénètre pas — elle reste posée dessus.",
        volume: "1 L",
      },
      {
        eyebrow: "Étape 2",
        title: "Protéine Brésilienne",
        desc: "Le complexe d'acides aminés comble les zones creusées, la protéine reconstruit, et les huiles de copaïba et de pracaxi scellent l'ensemble avec de la brillance.",
        volume: "1 L",
      },
    ],
  },
  ingredients: {
    eyebrow: "La formule",
    title: "Copaïba, pracaxi et acides aminés",
    subtitle: "Six actifs venus d'Amazonie pour remplir la fibre au lieu de la maquiller.",
    items: [
      {
        name: "Huile de copaïba",
        desc: "La résine amazonienne : elle apaise le cuir chevelu et calme les irritations.",
      },
      {
        name: "Huile de pracaxi",
        desc: "La plus riche en acide béhénique au monde — c'est ce qui la fait pénétrer si profond.",
      },
      {
        name: "Complexe d'acides aminés",
        desc: "Les briques du cheveu, assez petites pour entrer là où la fibre s'est creusée.",
      },
      {
        name: "Protéine brésilienne",
        desc: "Hydrolysée pour pénétrer la fibre et en combler les brèches durablement.",
      },
      {
        name: "Kératine",
        desc: "La protéine dont le cheveu est fait : elle lisse et redonne du corps.",
      },
      {
        name: "Panthénol",
        desc: "Pro-vitamine B5 : retient l'hydratation au cœur du cheveu.",
      },
    ],
  },
  benefits: {
    title: "Pourquoi il fait la différence",
    subtitle: "Une formule professionnelle pensée pour des résultats visibles et durables",
    // order matches ICONS[] in components/Benefits.tsx
    items: [
      {
        title: "Cheveux lisses et disciplinés",
        desc: "Les frisottis se calment, l'écaille se referme, le brushing tient plus longtemps.",
      },
      {
        title: "L'effet glow",
        desc: "Une fibre comblée est une fibre lisse : la lumière se reflète au lieu de se disperser.",
      },
      {
        title: "Comblement en profondeur",
        desc: "Les acides aminés remplissent les zones creuses là où les masques restent en surface.",
      },
      {
        title: "Kit Salon 2 × 1 L",
        desc: "Deux litres, les deux étapes : des dizaines d'applications, des mois d'utilisation.",
      },
    ],
  },
  brandStory: {
    eyebrow: "Origine Amazonie",
    title: "Deux huiles, une seule forêt",
    subtitle:
      "Le copaïba et le pracaxi poussent côte à côte en Amazonie, et les coiffeurs brésiliens les associent depuis toujours : l'un apaise, l'autre répare en profondeur. Vitasilk les réunit dans un protocole professionnel.",
  },
  beforeAfter: {
    title: "Avant / Après",
    subtitle: "Faites glisser pour voir la transformation",
    before: "Avant",
    after: "Après",
  },
  howto: {
    title: "3 gestes, résultat salon",
    steps: [
      {
        title: "Lavez — Étape 1",
        desc: "Lavez avec le shampooing pré-traitement, deux fois si les cheveux sont chargés. Essorez sans sécher complètement.",
      },
      {
        title: "Appliquez — Étape 2",
        desc: "Appliquez la protéine mèche par mèche sur cheveux essorés. Aucun temps de pause : enchaînez dès que tout est couvert.",
      },
      {
        title: "Rincez & coiffez",
        desc: "Rincez, séchez, puis passez le fer pour sceller le complexe. Admirez la brillance.",
      },
    ],
  },
  testimonials: {
    title: "Elles l'ont adopté",
    subtitle: "+12 000 clientes satisfaites au Maroc",
    items: [
      {
        name: "Salma — Casablanca",
        text: "Mes cheveux étaient poreux à force de mèches, ils ne gardaient plus rien. Là ils ont retrouvé de la densité — on le sent au toucher, pas seulement à l'œil.",
      },
      {
        name: "Imane — Rabat",
        text: "Ce qui m'a convaincue c'est l'absence de temps de pause. J'ai fait les deux étapes à la suite, en moins d'une heure tout était fini.",
      },
      {
        name: "Khadija — Marrakech",
        text: "Je suis coiffeuse et je l'utilise en cabine. Le shampooing de l'étape 1 change vraiment tout : la protéine accroche différemment après.",
      },
      {
        name: "Sara — Tanger",
        text: "Six semaines après, mes pointes ne fourchent plus. Et avec deux litres j'en ai pour la saison entière au salon.",
      },
    ],
  },
  offer: {
    title: "Offre spéciale",
    subtitle: "Stock limité — profitez du prix spécial",
    unit: "Filler Glow Complex — Kit 2 × 1 L",
    save: (pct: number) => `Économisez ${pct}%`,
    perLitre: (price: string) => `soit ${price} le litre`,
    twoBottles: "2 flacons — 2 litres au total",
    freeDelivery: "Livraison gratuite",
    cod: "Paiement à la livraison",
    guarantee: "Satisfaite ou remboursée",
    countdown: { title: "L'offre expire dans", h: "Heures", m: "Minutes", s: "Secondes" },
    cta: "Commander maintenant",
  },
  form: {
    title: "Commandez maintenant",
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
    whatsapp: "Commander sur WhatsApp",
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
        a: "Non, ni l'un ni l'autre. Le Filler Glow est un soin comblant : il remplit et discipline la fibre sans ces substances et sans vapeurs irritantes.",
      },
      {
        q: "Il n'y a vraiment aucun temps de pause ?",
        a: "Aucun. Vous appliquez l'étape 2 sur cheveux essorés et vous enchaînez directement sur le rinçage et le brushing. Comptez environ 45 minutes en tout, contre 2 heures pour un lissage classique.",
      },
      {
        q: "Puis-je sauter l'étape 1 et n'utiliser que la protéine ?",
        a: "Ce n'est pas conseillé. Le shampooing pré-traitement retire le calcaire et les silicones qui bouchent la fibre : sans lui la protéine reste en surface et l'effet part au premier lavage. C'est précisément pour cela que le kit est vendu en deux flacons.",
      },
      {
        q: "Convient-il aux cheveux colorés ou bouclés ?",
        a: "Oui. La coloration rend la fibre poreuse, exactement ce que ce complexe vient combler — et il ravive les reflets. Sur cheveux bouclés il discipline et allège la boucle sans la supprimer : c'est un soin comblant, pas un défrisage.",
      },
      {
        q: "Comment se passe la livraison ?",
        a: "Livraison gratuite partout au Maroc en 24 à 48h. Vous payez uniquement à la réception de votre commande.",
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
