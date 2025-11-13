/**
 * Données détaillées des cuvées avec gestion multi-millésimes
 * 
 * Structure :
 * - Informations générales de la cuvée (constantes)
 * - Données spécifiques par millésime (dégustation, technique, accords)
 */

export interface WineMillesime {
  year: number
  tasting: {
    appearance: string
    nose: string
    palate: string
    finish: string
  }
  technical: {
    alcohol: string
    grapes: string
    aging: string
    production?: string
  }
  pairing: {
    appetizers: string[]
    mainCourses: string[]
    cheeses: string[]
    desserts?: string[]
  }
  composition: {
    terroir: string
    harvest: string
    vinification: string
  }
}

export interface WineDetails {
  slug: string
  name: string
  gamme: string
  color: string
  description: string
  longDescription: string
  image: string
  pdfTechSheet: string
  millesimes: WineMillesime[]
  servingAdvice: {
    temperature: string
    decanting?: string
    glassware: string
  }
  conservation: {
    temperature: string
    duration: string
    conditions: string
  }
}

export const winesDetails: Record<string, WineDetails> = {
  "domeni-blanc": {
    slug: "domeni-blanc",
    name: "Doméni Blanc",
    gamme: "Doméni",
    color: "Blanc",
    description: "L'expression pure de nos cépages blancs autochtones, révélant la minéralité et la fraîcheur de notre terroir gaillacois.",
    longDescription: "Le Doméni Blanc incarne la quintessence de notre terroir. Assemblage minutieux de Mauzac et Len de l'El, il révèle la typicité des cépages gaillacois avec une élégance remarquable. Sa vinification soignée préserve toute la fraîcheur aromatique et la minéralité caractéristique de nos sols argilo-calcaires.",
    image: "/images/vins/blanc-domeni-sf.png",
    pdfTechSheet: "/fiche-technique/ft-blanc-domeni-2024.pdf",
    millesimes: [
      {
        year: 2024,
        tasting: {
          appearance: "Robe jaune pâle aux reflets dorés, brillante et limpide",
          nose: "Bouquet frais d'agrumes, fleurs blanches, notes de poire et de miel d'acacia",
          palate: "Attaque vive, belle minéralité, arômes de fruits blancs et nuances florales",
          finish: "Finale longue et élégante sur des notes citronnées"
        },
        technical: {
          alcohol: "12.5%",
          grapes: "Mauzac 70%, Len de l'El 30%",
          aging: "Cuve inox sur lies fines, 6 mois",
          production: "15 000 bouteilles"
        },
        pairing: {
          appetizers: ["Huîtres", "Fruits de mer", "Ceviche de poisson"],
          mainCourses: ["Poisson grillé", "Volaille en sauce blanche", "Risotto aux asperges"],
          cheeses: ["Chèvre frais", "Rocamadour", "Comté jeune"]
        },
        composition: {
          terroir: "Coteaux argilo-calcaires exposés sud-est",
          harvest: "Vendanges manuelles, maturité optimale mi-septembre",
          vinification: "Pressurage pneumatique doux, fermentation contrôlée à 16°C"
        }
      },
      {
        year: 2023,
        tasting: {
          appearance: "Robe jaune doré, limpide aux reflets verts",
          nose: "Arômes d'agrumes confits, fleurs d'acacia, pointe de fruits exotiques",
          palate: "Bouche ronde, belle fraîcheur, notes de pêche blanche et amande",
          finish: "Finale persistante aux nuances miellées"
        },
        technical: {
          alcohol: "12.5%",
          grapes: "Mauzac 70%, Len de l'El 30%",
          aging: "Cuve inox sur lies fines, 6 mois"
        },
        pairing: {
          appetizers: ["Saumon fumé", "Terrine de poisson", "Salade de crabe"],
          mainCourses: ["Bar au fenouil", "Blanquette de veau", "Pâtes aux fruits de mer"],
          cheeses: ["Fromages de chèvre", "Brillat-Savarin", "Brie"]
        },
        composition: {
          terroir: "Coteaux argilo-calcaires exposés sud-est",
          harvest: "Vendanges manuelles fin septembre",
          vinification: "Pressurage pneumatique, fermentation lente à basse température"
        }
      }
    ],
    servingAdvice: {
      temperature: "10-12°C",
      glassware: "Verre à vin blanc tulipe"
    },
    conservation: {
      temperature: "12-14°C",
      duration: "2-4 ans",
      conditions: "Cave fraîche, bouteilles couchées à l'abri de la lumière"
    }
  },
  
  "domeni-rose": {
    slug: "domeni-rose",
    name: "Doméni Rosé",
    gamme: "Doméni",
    color: "Rosé",
    description: "Un rosé délicat et élégant, aux arômes de fruits rouges frais et à la robe cristalline caractéristique de notre terroir.",
    longDescription: "Le Doméni Rosé exprime toute la finesse de nos cépages rouges vinifiés en rosé. Syrah et Duras se marient harmonieusement pour créer un vin d'une grande fraîcheur, aux arômes délicats de fruits rouges et à la robe rose pâle si élégante.",
    image: "/images/vins/rose-domeni-sf.png",
    pdfTechSheet: "/fiche-technique/ft-rose-domeni-2024-1.pdf",
    millesimes: [
      {
        year: 2024,
        tasting: {
          appearance: "Robe rose pâle aux reflets saumonés, limpide et brillante",
          nose: "Arômes délicats de fraise, framboise, notes florales de rose et pivoine",
          palate: "Attaque fraîche, belle rondeur, saveurs de fruits rouges croquants",
          finish: "Finale désaltérante sur des notes d'agrumes"
        },
        technical: {
          alcohol: "12%",
          grapes: "Syrah 60%, Duras 40%",
          aging: "Cuve inox, 4 mois",
          production: "12 000 bouteilles"
        },
        pairing: {
          appetizers: ["Carpaccio de saumon", "Taboulé", "Gaspacho"],
          mainCourses: ["Grillades d'été", "Poisson grillé", "Cuisine méditerranéenne"],
          cheeses: ["Fromages frais", "Mozzarella", "Féta"]
        },
        composition: {
          terroir: "Sols argilo-calcaires sur coteaux ensoleillés",
          harvest: "Vendanges nocturnes pour préserver la fraîcheur",
          vinification: "Saignée après 4h de macération, fermentation à basse température"
        }
      }
    ],
    servingAdvice: {
      temperature: "8-10°C",
      glassware: "Verre à vin blanc ou rosé tulipe"
    },
    conservation: {
      temperature: "12-14°C",
      duration: "1-2 ans",
      conditions: "À consommer jeune pour profiter de sa fraîcheur"
    }
  },

  "domeni-rouge": {
    slug: "domeni-rouge",
    name: "Doméni Rouge",
    gamme: "Doméni",
    color: "Rouge",
    description: "Un rouge charpenté et généreux, exprimant toute la puissance de nos cépages locaux avec une belle structure tannique.",
    longDescription: "Le Doméni Rouge révèle la richesse de notre terroir à travers un assemblage harmonieux de Duras, Syrah et Braucol. Vinifié avec soin et élevé en cuve, il développe des arômes complexes de fruits noirs, d'épices et une structure tannique élégante.",
    image: "/images/vins/rouge-domeni-sf.png",
    pdfTechSheet: "/fiche-technique/ft-rouge-domeni-2022.pdf",
    millesimes: [
      {
        year: 2022,
        tasting: {
          appearance: "Robe rubis profond aux reflets violets",
          nose: "Bouquet intense de fruits noirs (mûre, cassis), épices douces, notes de garrigue",
          palate: "Bouche ample, tanins soyeux, arômes de fruits mûrs et touches épicées",
          finish: "Finale longue et harmonieuse sur le fruit"
        },
        technical: {
          alcohol: "13.5%",
          grapes: "Duras 50%, Syrah 30%, Braucol 20%",
          aging: "Cuve béton, 12 mois",
          production: "18 000 bouteilles"
        },
        pairing: {
          appetizers: ["Charcuterie artisanale", "Terrine de campagne", "Pâté en croûte"],
          mainCourses: ["Magret de canard", "Entrecôte grillée", "Cassoulet", "Agneau rôti"],
          cheeses: ["Roquefort", "Cantal", "Saint-Nectaire"]
        },
        composition: {
          terroir: "Coteaux argilo-calcaires, exposition sud-ouest optimale",
          harvest: "Vendanges manuelles en octobre, tris sélectifs",
          vinification: "Macération de 3 semaines, pigeages quotidiens, fermentation naturelle"
        }
      }
    ],
    servingAdvice: {
      temperature: "16-18°C",
      decanting: "Carafer 1 heure avant service recommandé",
      glassware: "Verre à vin rouge type Bordeaux"
    },
    conservation: {
      temperature: "14-16°C",
      duration: "5-8 ans",
      conditions: "Cave fraîche et sombre, bouteilles couchées"
    }
  },

  // Ajoutez les autres cuvées ici selon le même pattern...
  // Pour le moment, je vais créer une version simplifiée pour les autres cuvées
  
  "petrichor-rouge": {
    slug: "petrichor-rouge",
    name: "Pétrichor Rouge",
    gamme: "Pétrichor",
    color: "Rouge",
    description: "Notre cuvée signature, évoquant l'odeur de la terre après la pluie. Un vin d'exception, puissant et élégant.",
    longDescription: "Pétrichor Rouge est notre cuvée la plus emblématique. Son nom évoque cette odeur si particulière de la terre après la pluie, symbole de notre connexion profonde avec le terroir. Issue de nos plus belles parcelles, cette cuvée exprime toute la complexité et la noblesse de nos terroirs gaillacois.",
    image: "/images/vins/petrichor-st.png",
    pdfTechSheet: "/fiche-technique/ft-rouge-petrichor-2020.pdf",
    millesimes: [
      {
        year: 2020,
        tasting: {
          appearance: "Robe pourpre intense, presque noire",
          nose: "Bouquet complexe de fruits noirs, cacao, épices, notes de cuir et sous-bois",
          palate: "Puissance et élégance, tanins nobles, grande profondeur aromatique",
          finish: "Finale exceptionnellement longue et raffinée"
        },
        technical: {
          alcohol: "14.5%",
          grapes: "Syrah 60%, Duras 30%, Braucol 10%",
          aging: "Fûts de chêne français, 18 mois",
          production: "5 000 bouteilles"
        },
        pairing: {
          appetizers: ["Foie gras poêlé", "Carpaccio de bœuf aux truffes"],
          mainCourses: ["Gibier en sauce", "Côte de bœuf maturée", "Pigeon rôti"],
          cheeses: ["Roquefort affiné", "Comté 24 mois", "Fromages à pâte persillée"]
        },
        composition: {
          terroir: "Parcelles d'exception en altitude, sols argilo-calcaires profonds",
          harvest: "Vendanges manuelles, tri sévère grain par grain",
          vinification: "Macération longue 4 semaines, levures indigènes, élevage en fûts"
        }
      }
    ],
    servingAdvice: {
      temperature: "17-19°C",
      decanting: "Carafer 2 heures avant service",
      glassware: "Grand verre type Bordeaux"
    },
    conservation: {
      temperature: "14-16°C",
      duration: "10-15 ans",
      conditions: "Cave de garde, bouteilles couchées à l'abri de la lumière et des vibrations"
    }
  },

  "opus-blanc": {
    slug: "opus-blanc",
    name: "Opus Blanc",
    gamme: "Opus",
    color: "Blanc",
    description: "L'excellence absolue en blanc. Une cuvée d'exception révélant toute la noblesse de nos cépages blancs.",
    longDescription: "Opus Blanc représente l'apogée de notre savoir-faire. Issu de nos parcelles les plus prestigieuses, cette cuvée exprime toute la complexité et la finesse de nos terroirs gaillacois à travers un élevage méticuleux.",
    image: "/images/vins/blanc-opus-sf.png",
    pdfTechSheet: "/fiche-technique/ft-blanc-opus-2023.pdf",
    millesimes: [
      {
        year: 2023,
        tasting: {
          appearance: "Robe dorée intense aux reflets verts",
          nose: "Bouquet complexe de fruits blancs mûrs, miel, notes minérales et épices douces",
          palate: "Bouche ample et élégante, grande longueur, arômes de fruits exotiques",
          finish: "Finale exceptionnellement persistante et raffinée"
        },
        technical: {
          alcohol: "13%",
          grapes: "Mauzac 60%, Len de l'El 40%",
          aging: "Fûts de chêne français, 12 mois",
          production: "8 000 bouteilles"
        },
        pairing: {
          appetizers: ["Foie gras", "Langoustines", "Truite fumée"],
          mainCourses: ["Homard", "Turbot", "Poulet de Bresse"],
          cheeses: ["Comté affiné", "Beaufort", "Fromages à pâte pressée"]
        },
        composition: {
          terroir: "Parcelles d'exception, sols argilo-calcaires profonds",
          harvest: "Vendanges manuelles avec tri sélectif",
          vinification: "Pressurage délicat, fermentation en fûts, élevage sur lies"
        }
      }
    ],
    servingAdvice: {
      temperature: "12-14°C",
      glassware: "Grand verre à vin blanc type Bourgogne"
    },
    conservation: {
      temperature: "12-14°C",
      duration: "5-8 ans",
      conditions: "Cave fraîche, bouteilles couchées"
    }
  },

  "opus-rouge": {
    slug: "opus-rouge",
    name: "Opus Rouge",
    gamme: "Opus",
    color: "Rouge",
    description: "L'excellence absolue en rouge. Une cuvée prestigieuse aux tanins nobles et à la structure exceptionnelle.",
    longDescription: "Opus Rouge incarne la quintessence de notre terroir. Issue de nos plus belles parcelles et élevée avec un soin méticuleux, cette cuvée révèle toute la noblesse et la complexité de nos cépages gaillacois.",
    image: "/images/vins/rouge-opus-sf.png",
    pdfTechSheet: "/fiche-technique/ft-rouge-opus-2021.pdf",
    millesimes: [
      {
        year: 2021,
        tasting: {
          appearance: "Robe grenat profond aux reflets pourpres",
          nose: "Bouquet intense de fruits noirs mûrs, épices, cacao et notes de sous-bois",
          palate: "Bouche puissante et élégante, tanins soyeux, grande profondeur aromatique",
          finish: "Finale exceptionnellement longue et complexe"
        },
        technical: {
          alcohol: "14%",
          grapes: "Duras 50%, Syrah 40%, Braucol 10%",
          aging: "Fûts de chêne français, 18 mois",
          production: "6 000 bouteilles"
        },
        pairing: {
          appetizers: ["Foie gras", "Magret de canard séché", "Carpaccio de bœuf"],
          mainCourses: ["Côte de bœuf", "Gibier", "Agneau de pré-salé"],
          cheeses: ["Roquefort", "Comté 24 mois", "Fromages à pâte persillée"]
        },
        composition: {
          terroir: "Parcelles d'exception, sols argilo-calcaires profonds",
          harvest: "Vendanges manuelles avec tri sélectif grain par grain",
          vinification: "Macération longue, fermentation en fûts, élevage 18 mois"
        }
      }
    ],
    servingAdvice: {
      temperature: "17-19°C",
      decanting: "Carafer 2 heures avant service",
      glassware: "Grand verre type Bordeaux"
    },
    conservation: {
      temperature: "14-16°C",
      duration: "10-15 ans",
      conditions: "Cave de garde, bouteilles couchées"
    }
  },

  "methode-blanc": {
    slug: "methode-blanc",
    name: "Méthode Blanc",
    gamme: "Méthode Traditionnelle",
    color: "Effervescent",
    description: "L'art de l'effervescence selon nos traditions gaillacoises. Une bulle fine et élégante.",
    longDescription: "Méthode Blanc révèle la finesse de nos bulles élaborées selon la méthode ancestrale gaillacoise. Cette effervescence naturelle exprime toute la fraîcheur et la complexité de nos terroirs.",
    image: "/images/vins/la-methode-blanc-st.png",
    pdfTechSheet: "/fiche-technique/ft-la-methode-blanc.pdf",
    millesimes: [
      {
        year: 2023,
        tasting: {
          appearance: "Robe jaune pâle aux reflets verts, bulles fines et persistantes",
          nose: "Bouquet frais et délicat, notes d'agrumes, fleurs blanches et brioche",
          palate: "Attaque vive et pétillante, belle fraîcheur, arômes de fruits blancs",
          finish: "Finale désaltérante et élégante"
        },
        technical: {
          alcohol: "12%",
          grapes: "Mauzac 100%",
          aging: "Méthode traditionnelle, prise de mousse en bouteille, 12 mois sur lies",
          production: "10 000 bouteilles"
        },
        pairing: {
          appetizers: ["Huîtres", "Fruits de mer", "Amuse-bouches"],
          mainCourses: ["Poisson grillé", "Volaille", "Cuisine légère"],
          cheeses: ["Chèvre frais", "Fromages à pâte molle"]
        },
        composition: {
          terroir: "Coteaux argilo-calcaires exposés sud-est",
          harvest: "Vendanges manuelles, maturité optimale",
          vinification: "Première fermentation en cuve, prise de mousse en bouteille selon méthode traditionnelle"
        }
      }
    ],
    servingAdvice: {
      temperature: "6-8°C",
      glassware: "Flûte ou verre à champagne"
    },
    conservation: {
      temperature: "12-14°C",
      duration: "2-4 ans",
      conditions: "Cave fraîche, bouteilles debout"
    }
  },

  "methode-rose": {
    slug: "methode-rose",
    name: "Méthode Rosé",
    gamme: "Méthode Traditionnelle",
    color: "Effervescent",
    description: "Une effervescence rosée délicate et fruitée, élaborée selon nos traditions.",
    longDescription: "Méthode Rosé allie la finesse de l'effervescence à la fraîcheur des fruits rouges. Élaborée selon la méthode traditionnelle gaillacoise, cette cuvée révèle toute l'élégance de nos bulles rosées.",
    image: "/images/vins/la-methode-rose-sf.png",
    pdfTechSheet: "/fiche-technique/ft-la-methode-rosee-23.pdf",
    millesimes: [
      {
        year: 2023,
        tasting: {
          appearance: "Robe rose pâle aux reflets saumonés, bulles fines et élégantes",
          nose: "Bouquet frais de fruits rouges, framboise, notes florales",
          palate: "Attaque pétillante et fruitée, belle fraîcheur, arômes de fruits rouges",
          finish: "Finale désaltérante et gourmande"
        },
        technical: {
          alcohol: "12%",
          grapes: "Mauzac 70%, Syrah 30%",
          aging: "Méthode traditionnelle, prise de mousse en bouteille, 12 mois sur lies",
          production: "8 000 bouteilles"
        },
        pairing: {
          appetizers: ["Amuse-bouches", "Tartares", "Cuisine asiatique"],
          mainCourses: ["Poisson grillé", "Volaille", "Cuisine méditerranéenne"],
          cheeses: ["Fromages frais", "Chèvre"]
        },
        composition: {
          terroir: "Coteaux argilo-calcaires exposés sud-est",
          harvest: "Vendanges manuelles, maturité optimale",
          vinification: "Première fermentation en cuve, prise de mousse en bouteille selon méthode traditionnelle"
        }
      }
    ],
    servingAdvice: {
      temperature: "6-8°C",
      glassware: "Flûte ou verre à champagne"
    },
    conservation: {
      temperature: "12-14°C",
      duration: "2-4 ans",
      conditions: "Cave fraîche, bouteilles debout"
    }
  },

  "perle": {
    slug: "perle",
    name: "Perlé",
    gamme: "Méthode Traditionnelle",
    color: "Effervescent",
    description: "Une effervescence délicate et perlée, révélant la finesse de nos bulles.",
    longDescription: "Perlé incarne la subtilité de l'effervescence gaillacoise. Cette cuvée révèle une bulle fine et perlée, élégante et désaltérante, parfaite pour les moments de convivialité.",
    image: "/images/vins/blanc-perle-sf.png",
    pdfTechSheet: "/fiche-technique/ft-perle-2023.pdf",
    millesimes: [
      {
        year: 2023,
        tasting: {
          appearance: "Robe jaune pâle brillante, bulles fines et perlées",
          nose: "Bouquet frais et délicat, notes d'agrumes et de fleurs blanches",
          palate: "Attaque vive et perlée, belle fraîcheur, arômes de fruits blancs",
          finish: "Finale désaltérante et élégante"
        },
        technical: {
          alcohol: "11.5%",
          grapes: "Mauzac 100%",
          aging: "Méthode traditionnelle, prise de mousse en bouteille, 9 mois sur lies",
          production: "12 000 bouteilles"
        },
        pairing: {
          appetizers: ["Amuse-bouches", "Fruits de mer", "Tartares"],
          mainCourses: ["Poisson", "Cuisine légère", "Salades composées"],
          cheeses: ["Fromages frais", "Chèvre"]
        },
        composition: {
          terroir: "Coteaux argilo-calcaires exposés sud-est",
          harvest: "Vendanges manuelles, maturité optimale",
          vinification: "Première fermentation en cuve, prise de mousse en bouteille selon méthode traditionnelle"
        }
      }
    ],
    servingAdvice: {
      temperature: "6-8°C",
      glassware: "Flûte ou verre à champagne"
    },
    conservation: {
      temperature: "12-14°C",
      duration: "2-3 ans",
      conditions: "Cave fraîche, bouteilles debout"
    }
  },

  "poussin-blanc": {
    slug: "poussin-blanc",
    name: "Poussin Blanc",
    gamme: "Poussin",
    color: "Blanc",
    description: "Fraîcheur et gourmandise. Un blanc accessible et convivial, parfait pour la découverte.",
    longDescription: "Poussin Blanc invite à la découverte de nos vins dans un esprit de convivialité. Cette cuvée accessible révèle la fraîcheur et la gourmandise de nos cépages blancs gaillacois.",
    image: "/images/vins/poussin-blanc-sf.png",
    pdfTechSheet: "/fiche-technique/ft-poussin-moelleux-2024.pdf",
    millesimes: [
      {
        year: 2024,
        tasting: {
          appearance: "Robe jaune pâle brillante et limpide",
          nose: "Bouquet frais et fruité, notes d'agrumes et de fruits blancs",
          palate: "Bouche ronde et gourmande, belle fraîcheur, arômes de fruits mûrs",
          finish: "Finale désaltérante et fruitée"
        },
        technical: {
          alcohol: "12%",
          grapes: "Mauzac 80%, Len de l'El 20%",
          aging: "Cuve inox, 4 mois",
          production: "20 000 bouteilles"
        },
        pairing: {
          appetizers: ["Apéritif", "Fruits de mer", "Salades"],
          mainCourses: ["Poisson", "Volaille", "Cuisine légère"],
          cheeses: ["Fromages frais", "Chèvre"]
        },
        composition: {
          terroir: "Coteaux argilo-calcaires",
          harvest: "Vendanges manuelles",
          vinification: "Pressurage doux, fermentation contrôlée"
        }
      }
    ],
    servingAdvice: {
      temperature: "8-10°C",
      glassware: "Verre à vin blanc"
    },
    conservation: {
      temperature: "12-14°C",
      duration: "1-2 ans",
      conditions: "À consommer jeune pour profiter de sa fraîcheur"
    }
  },

  "poussin-rose": {
    slug: "poussin-rose",
    name: "Poussin Rosé",
    gamme: "Poussin",
    color: "Rosé",
    description: "Fraîcheur et gourmandise. Un rosé accessible et convivial, parfait pour l'apéritif.",
    longDescription: "Poussin Rosé invite à la découverte de nos vins dans un esprit de convivialité. Cette cuvée accessible révèle la fraîcheur et la gourmandise de nos cépages rosés gaillacois.",
    image: "/images/vins/poussin-rose-sf.png",
    pdfTechSheet: "/fiche-technique/ft-poussin-rose-moelleux-2024.pdf",
    millesimes: [
      {
        year: 2024,
        tasting: {
          appearance: "Robe rose pâle brillante et limpide",
          nose: "Bouquet frais et fruité, notes de fruits rouges",
          palate: "Bouche ronde et gourmande, belle fraîcheur, arômes de fruits rouges",
          finish: "Finale désaltérante et fruitée"
        },
        technical: {
          alcohol: "12%",
          grapes: "Syrah 60%, Duras 40%",
          aging: "Cuve inox, 4 mois",
          production: "18 000 bouteilles"
        },
        pairing: {
          appetizers: ["Apéritif", "Salades", "Amuse-bouches"],
          mainCourses: ["Grillades", "Poisson", "Cuisine méditerranéenne"],
          cheeses: ["Fromages frais", "Mozzarella"]
        },
        composition: {
          terroir: "Coteaux argilo-calcaires",
          harvest: "Vendanges manuelles",
          vinification: "Saignée, fermentation contrôlée"
        }
      }
    ],
    servingAdvice: {
      temperature: "8-10°C",
      glassware: "Verre à vin rosé"
    },
    conservation: {
      temperature: "12-14°C",
      duration: "1-2 ans",
      conditions: "À consommer jeune pour profiter de sa fraîcheur"
    }
  },

  "petrichor-rose": {
    slug: "petrichor-rose",
    name: "Pétrichor Rosé",
    gamme: "Pétrichor",
    color: "Rosé",
    description: "Signature de notre savoir-faire en rosé. Une cuvée d'exception aux arômes complexes.",
    longDescription: "Pétrichor Rosé évoque cette odeur si particulière de la terre après la pluie. Cette cuvée d'exception révèle toute la complexité et la finesse de nos terroirs gaillacois à travers un rosé de grande élégance.",
    image: "/images/vins/petrichor-ros-sf.png",
    pdfTechSheet: "/fiche-technique/ft-rose-petrichor-2024.pdf",
    millesimes: [
      {
        year: 2024,
        tasting: {
          appearance: "Robe rose saumoné aux reflets cuivrés",
          nose: "Bouquet complexe de fruits rouges mûrs, épices douces, notes minérales",
          palate: "Bouche ample et élégante, belle structure, arômes de fruits rouges et épices",
          finish: "Finale longue et raffinée"
        },
        technical: {
          alcohol: "13%",
          grapes: "Syrah 70%, Duras 30%",
          aging: "Cuve inox et fûts, 8 mois",
          production: "6 000 bouteilles"
        },
        pairing: {
          appetizers: ["Foie gras", "Langoustines", "Carpaccio"],
          mainCourses: ["Poisson noble", "Volaille", "Cuisine raffinée"],
          cheeses: ["Fromages affinés", "Chèvre sec"]
        },
        composition: {
          terroir: "Parcelles d'exception, sols argilo-calcaires",
          harvest: "Vendanges manuelles avec tri sélectif",
          vinification: "Saignée longue, fermentation contrôlée, élevage partiel en fûts"
        }
      }
    ],
    servingAdvice: {
      temperature: "10-12°C",
      glassware: "Verre à vin rosé tulipe"
    },
    conservation: {
      temperature: "12-14°C",
      duration: "3-5 ans",
      conditions: "Cave fraîche, bouteilles couchées"
    }
  },

  "claire-de-lune": {
    slug: "claire-de-lune",
    name: "Claire de Lune",
    gamme: "Signatures",
    color: "Blanc",
    description: "Cuvée rare et mystérieuse. Un blanc d'exception révélant toute la poésie de notre terroir.",
    longDescription: "Claire de Lune raconte une histoire unique. Issue de parcelles sélectionnées et de vinifications d'exception, cette cuvée rare révèle toute la poésie et la complexité de notre terroir gaillacois à travers un blanc d'une grande élégance.",
    image: "/images/vins/claire-de-lune-sf.png",
    pdfTechSheet: "/fiche-technique/ft-blanc-claire-de-lune-2023.pdf",
    millesimes: [
      {
        year: 2023,
        tasting: {
          appearance: "Robe dorée intense aux reflets verts",
          nose: "Bouquet complexe et poétique, notes de fruits blancs mûrs, miel, minéralité",
          palate: "Bouche ample et élégante, grande longueur, arômes de fruits exotiques et épices",
          finish: "Finale exceptionnellement persistante et raffinée"
        },
        technical: {
          alcohol: "13.5%",
          grapes: "Mauzac 50%, Len de l'El 50%",
          aging: "Fûts de chêne français, 15 mois",
          production: "3 000 bouteilles"
        },
        pairing: {
          appetizers: ["Foie gras", "Langoustines", "Truffe"],
          mainCourses: ["Homard", "Turbot", "Poulet de Bresse"],
          cheeses: ["Comté affiné", "Beaufort", "Fromages à pâte pressée"]
        },
        composition: {
          terroir: "Parcelles d'exception, sols argilo-calcaires profonds",
          harvest: "Vendanges manuelles avec tri sélectif",
          vinification: "Pressurage délicat, fermentation en fûts, élevage sur lies fines"
        }
      }
    ],
    servingAdvice: {
      temperature: "12-14°C",
      glassware: "Grand verre à vin blanc type Bourgogne"
    },
    conservation: {
      temperature: "12-14°C",
      duration: "8-12 ans",
      conditions: "Cave fraîche, bouteilles couchées"
    }
  },

  "pigeonnier": {
    slug: "pigeonnier",
    name: "Pigeonnier",
    gamme: "Signatures",
    color: "Rouge",
    description: "Cuvée rare et mystérieuse. Un rouge d'exception aux tanins nobles et à la structure exceptionnelle.",
    longDescription: "Pigeonnier raconte une histoire unique. Issue de parcelles sélectionnées et de vinifications d'exception, cette cuvée rare révèle toute la complexité et la noblesse de notre terroir gaillacois à travers un rouge d'une grande élégance.",
    image: "/images/vins/pigeonnier-sf.png",
    pdfTechSheet: "/fiche-technique/ft-rouge-cuvee-du-pigeonnier-2022.pdf",
    millesimes: [
      {
        year: 2022,
        tasting: {
          appearance: "Robe grenat profond aux reflets pourpres",
          nose: "Bouquet complexe et intense, fruits noirs mûrs, épices, cacao, notes de sous-bois",
          palate: "Bouche puissante et élégante, tanins nobles, grande profondeur aromatique",
          finish: "Finale exceptionnellement longue et complexe"
        },
        technical: {
          alcohol: "14.5%",
          grapes: "Duras 60%, Syrah 30%, Braucol 10%",
          aging: "Fûts de chêne français, 20 mois",
          production: "2 500 bouteilles"
        },
        pairing: {
          appetizers: ["Foie gras", "Magret séché", "Carpaccio de bœuf"],
          mainCourses: ["Côte de bœuf", "Gibier", "Agneau de pré-salé"],
          cheeses: ["Roquefort affiné", "Comté 24 mois", "Fromages à pâte persillée"]
        },
        composition: {
          terroir: "Parcelles d'exception, sols argilo-calcaires profonds",
          harvest: "Vendanges manuelles avec tri sévère grain par grain",
          vinification: "Macération longue, fermentation en fûts, élevage 20 mois"
        }
      }
    ],
    servingAdvice: {
      temperature: "17-19°C",
      decanting: "Carafer 3 heures avant service",
      glassware: "Grand verre type Bordeaux"
    },
    conservation: {
      temperature: "14-16°C",
      duration: "15-20 ans",
      conditions: "Cave de garde, bouteilles couchées à l'abri de la lumière"
    }
  }
}

// Helper pour obtenir les années disponibles pour une cuvée
export function getAvailableYears(slug: string): number[] {
  const wine = winesDetails[slug]
  if (!wine) return []
  return wine.millesimes.map(m => m.year).sort((a, b) => b - a)
}

// Helper pour obtenir les données d'un millésime spécifique
export function getMillesimeData(slug: string, year: number): WineMillesime | undefined {
  const wine = winesDetails[slug]
  if (!wine) return undefined
  return wine.millesimes.find(m => m.year === year)
}

