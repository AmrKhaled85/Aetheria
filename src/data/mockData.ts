import type { Destination, VillaCharter, CustomExperienceOption, JournalArticle, Testimonial, CurrencyConfig } from '../types';

export const CURRENCIES: Record<string, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', rate: 1, label: 'USD ($)', flag: '🇺🇸' },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92, label: 'EUR (€)', flag: '🇪🇺' },
  GBP: { code: 'GBP', symbol: '£', rate: 0.78, label: 'GBP (£)', flag: '🇬🇧' },
  AED: { code: 'AED', symbol: 'د.إ', rate: 3.67, label: 'AED (د.إ)', flag: '🇦🇪' },
  JPY: { code: 'JPY', symbol: '¥', rate: 154.5, label: 'JPY (¥)', flag: '🇯🇵' },
};

export const DESTINATIONS: Destination[] = [
  {
    id: 'dest-1',
    title: 'The Royal Overwater Sanctuary',
    subtitle: 'Private Coral Atoll & Glass Lagoon Villa',
    country: 'French Polynesia',
    region: 'Bora Bora Atoll',
    tag: 'Private Atoll',
    mainImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80'
    ],
    pricePerNight: 8500,
    rating: 4.99,
    reviewsCount: 142,
    climateTemp: '28°C / 82°F',
    features: ['Helipad Access', '24/7 Polynesian Butler', 'Underwater Dining', 'Private Catamaran Charter'],
    description: 'Surrender to absolute serenity atop crystal-clear turquoise waters. Our master overwater suites feature infinity plunge pools, glass-floor salon viewports, and dedicated sommelier service.',
    bestMonths: 'May – October',
    coordinates: { lat: -16.5004, lng: -151.7415 },
    featured: true,
  },
  {
    id: 'dest-2',
    title: 'Chateau de l’Aigle Impérial',
    subtitle: 'Alpine Chateau & Heliski Sanctuary',
    country: 'Switzerland',
    region: 'St. Moritz Alps',
    tag: 'Alpine Sanctuary',
    mainImage: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'
    ],
    pricePerNight: 12400,
    rating: 4.97,
    reviewsCount: 98,
    climateTemp: '-4°C / 25°F',
    features: ['Private Ski-in/Ski-out', 'Thermal Mineral Spa', 'Private Michelin Chef', 'Heated Outdoor Infinity Pool'],
    description: 'Perched high in the Engadin valley, Chateau de l’Aigle offers unmatched privacy, panoramic glacier views, heated marble terraces, and direct access to pristine powder fields via private chopper.',
    bestMonths: 'December – April',
    coordinates: { lat: 46.4983, lng: 9.8392 },
    featured: true,
  },
  {
    id: 'dest-3',
    title: 'Villa Splendida Amalfi',
    subtitle: 'Cliffside Estate & Private Harbor',
    country: 'Italy',
    region: 'Amalfi Coast',
    tag: 'Cliff Estate',
    mainImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200&q=80'
    ],
    pricePerNight: 9800,
    rating: 4.98,
    reviewsCount: 176,
    climateTemp: '25°C / 77°F',
    features: ['Cliffside Funicular Lift', 'Vintage Riva Boat Included', 'Lemon Grove Gardens', 'Private Wine Vault'],
    description: 'Cascading down the dramatic cliffs of Positano, Villa Splendida combines 18th-century Italian craftsmanship with contemporary luxury. Features private elevator to sea-level sun decks.',
    bestMonths: 'May – September',
    coordinates: { lat: 40.6281, lng: 14.4850 },
    featured: true,
  },
  {
    id: 'dest-4',
    title: 'Kyoto Bamboo & Ryokan Estate',
    subtitle: 'Century-Old Zen Garden & Onsen Retreat',
    country: 'Japan',
    region: 'Kyoto Arashiyama',
    tag: 'Zen Sanctuary',
    mainImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1492571350019-22de08371fd3?auto=format&fit=crop&w=1200&q=80'
    ],
    pricePerNight: 7200,
    rating: 4.99,
    reviewsCount: 110,
    climateTemp: '20°C / 68°F',
    features: ['Private Geisha Tea Ceremony', 'Natural Volcanic Onsen', 'Kaiseki Dining Master', 'Zen Meditation Master'],
    description: 'Tucked within ancient bamboo groves, this ultra-exclusive Ryokan estate offers ultimate mindfulness, private cedar hot springs, and multi-course Kaiseki cuisine curated by a 3-Star Michelin Master.',
    bestMonths: 'March – May & Oct – Nov',
    coordinates: { lat: 35.0116, lng: 135.6777 },
    featured: true,
  },
  {
    id: 'dest-5',
    title: 'Serengeti Imperial Manor',
    subtitle: 'Private Wildlife Reserve & Jet Access',
    country: 'Tanzania',
    region: 'Serengeti Ecosystem',
    tag: 'Private Safari',
    mainImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80'
    ],
    pricePerNight: 14500,
    rating: 5.0,
    reviewsCount: 84,
    climateTemp: '26°C / 79°F',
    features: ['Private Game Ranger & Tracker', 'Hot Air Balloon Expeditions', 'Private Airstrip', 'Infinite Savanna Deck'],
    description: 'Experience Africa’s awe-inspiring wildlife with zero compromise on comfort. 50,000 acres of private concession reserved exclusively for your party with luxury canvas suites and fine dining under stars.',
    bestMonths: 'June – October',
    coordinates: { lat: -2.3333, lng: 34.8333 },
    featured: false,
  },
  {
    id: 'dest-6',
    title: 'The Obsidian Pavilion',
    subtitle: 'Volcanic Fjord Villa & Northern Lights Spa',
    country: 'Iceland',
    region: 'Reykjanes & Grindavík',
    tag: 'Arctic Luxury',
    mainImage: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1529963183134-61a90db47eaf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1200&q=80'
    ],
    pricePerNight: 9100,
    rating: 4.96,
    reviewsCount: 65,
    climateTemp: '2°C / 35°F',
    features: ['Geothermal Lagoon Access', 'Aurora Borealis Glass Observatory', 'Super Jeep Excursions', 'Helicopter Glacier Tour'],
    description: 'Seamlessly carved into black basalt lava fields, the Obsidian Pavilion features custom glass domes designed for effortless Aurora viewing while bathed in private geothermal waters.',
    bestMonths: 'September – March',
    coordinates: { lat: 63.8424, lng: -22.4334 },
    featured: false,
  }
];

export const VILLAS_AND_CHARTERS: VillaCharter[] = [
  {
    id: 'villa-1',
    name: 'Aetheria Private Atoll & Helipad',
    category: 'Islands',
    location: 'Maldives Outer Rim',
    guests: 14,
    bedrooms: 7,
    pricePerNight: 22000,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80'
    ],
    highlights: ['Entire 40-Acre Private Island', '2 Custom Superyachts Included', 'Full Staff of 22 Professionals', 'PADI Master Dive Center'],
    butlerIncluded: true,
    helipad: true,
    privateDock: true,
    rating: 5.0,
  },
  {
    id: 'villa-2',
    name: 'M/Y Sovereign 68m Superyacht',
    category: 'Yacht Charters',
    location: 'Mediterranean / Caribbean Transit',
    guests: 12,
    bedrooms: 6,
    pricePerNight: 35000,
    image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&w=1200&q=80'
    ],
    highlights: ['68-Meter Custom Steel Yacht', 'Submersible 3-Person Submarine', 'Master Deck Jacuzzi & Cinema', 'Stabilizer At-Anchor System'],
    butlerIncluded: true,
    helipad: true,
    privateDock: true,
    rating: 4.99,
  },
  {
    id: 'villa-3',
    name: 'Chateau de Bellevue Historic Estate',
    category: 'Chateaux',
    location: 'Bordeaux, France',
    guests: 18,
    bedrooms: 9,
    pricePerNight: 16500,
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
    gallery: [],
    highlights: ['Grand Premier Cru Vineyard Access', 'Private Sommelier & Cellar Master', 'Equestrian Stables & Polo Field', 'Heated Rose Garden Pool'],
    butlerIncluded: true,
    helipad: true,
    privateDock: false,
    rating: 4.97,
  },
  {
    id: 'villa-4',
    name: 'Kilahari Sky Safari Lodge',
    category: 'Safaris',
    location: 'Okavango Delta, Botswana',
    guests: 8,
    bedrooms: 4,
    pricePerNight: 19800,
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80',
    gallery: [],
    highlights: ['Private Helicopter Safari Craft', 'Night-Vision Game Drives', 'Stargazing Solar Platform', 'Conservation Officer Guided Tours'],
    butlerIncluded: true,
    helipad: true,
    privateDock: true,
    rating: 5.0,
  }
];

export const CUSTOM_EXPERIENCES: CustomExperienceOption[] = [
  {
    id: 'exp-1',
    name: 'Gulfstream G700 Private Charter Access',
    category: 'aviation',
    price: 18500,
    description: 'Direct point-to-point intercontinental flight with zero airport queue, gourmet caviar service, and double bed master suite onboard.',
    iconName: 'Plane'
  },
  {
    id: 'exp-2',
    name: 'Private Michelin-Star Chef Residence',
    category: 'dining',
    price: 4500,
    description: 'Dedicated 3-Star Michelin chef preparing daily bespoke menus customized around rare vintages and locally sourced artisanal ingredients.',
    iconName: 'UtensilsCrossed'
  },
  {
    id: 'exp-3',
    name: 'VIP Eurocopter EC135 Transfers',
    category: 'aviation',
    price: 3200,
    description: 'Door-to-door helicopter transport from international hub direct to your villa or yacht helipad.',
    iconName: 'Navigation'
  },
  {
    id: 'exp-4',
    name: 'Private Deep Sea Marine Expedition',
    category: 'excursion',
    price: 6800,
    description: 'Guided submarine or deep-sea diving excursion with marine biologists to untouched coral walls and historic shipwrecks.',
    iconName: 'Anchor'
  },
  {
    id: 'exp-5',
    name: 'Imperial Holistic Wellness & Thermal Rituals',
    category: 'wellness',
    price: 2900,
    description: 'Custom Ayurvedic & Swiss anti-aging treatments administered in-residence by master therapists.',
    iconName: 'Sparkles'
  }
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'art-1',
    title: 'The Art of Ultra-Confidential Expeditions: Beyond Public Horizons',
    excerpt: 'How global pioneers and privacy-seeking connoisseurs navigate off-grid paradises without sacrificing Michelin luxury.',
    content: [
      'In an era of relentless hyper-connectivity, true luxury is measured not merely by opulence, but by absolute solitude. The modern high-net-worth traveler seeks sanctuaries removed from radar, where untouched nature meets uncompromised white-glove hospitality.',
      'At Aetheria, our private island charters and hidden Alpine sanctuaries guarantee complete security clearance, private airfields, and bespoke itineraries designed with micro-precision. Every sunrise is yours alone.'
    ],
    category: 'Private Travel',
    author: 'Lady Victoria Sinclair',
    authorTitle: 'Chief Travel Editor, Haute Life',
    readTime: '6 min read',
    date: 'July 24, 2026',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'art-2',
    title: 'Bordeaux to St. Moritz: Pairing Fine Vintages with High Altitude Dining',
    excerpt: 'An insider look into pairing rare Romanée-Conti with snowbound multi-course dinners at 3,000 meters.',
    content: [
      'Altitude alters palate perception in fascinating ways. When dining above the cloud line in the Engadin Alps, sommelier mastery becomes an intricate art of temperature control, aeration, and flavor pairing.',
      'We sit down with Master Sommelier Jean-Luc Vasseur to discuss the logistic miracles behind delivering 1982 Vintage Bordeaux to private alpine heli-huts.'
    ],
    category: 'Gastronomy',
    author: 'Jean-Luc Vasseur',
    authorTitle: 'Master Sommelier & Culinary Director',
    readTime: '4 min read',
    date: 'June 18, 2026',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'art-3',
    title: 'Carbon-Neutral Superyachting: The Next Frontier in Marine Conservation',
    excerpt: 'Exploring hydrogen hybrid propulsion and zero-impact anchoring on coral reefs across Polynesia.',
    content: [
      'Luxury and stewardship are no longer opposing forces. Modern superyachts now incorporate solar-electric propulsion, dynamic glass solar panels, and water-purification systems that leave zero footprint.',
      'Aetheria pledges 2% of every private charter fee toward our global coral reef restoration program in partnership with marine bio-labs.'
    ],
    category: 'Sustainability',
    author: 'Dr. Marcus Vance',
    authorTitle: 'Director of Oceanic Stewardship',
    readTime: '8 min read',
    date: 'May 30, 2026',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    clientName: 'Robb Report International',
    title: 'World’s Best Bespoke Expedition Specialist',
    source: 'Robb Report Luxury Awards 2026',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    quote: 'Aetheria has redefined what private travel means. From seamless private jet handoffs to invisible, flawless butler execution, they operate at a tier far above conventional luxury agencies.',
    rating: 5,
    destinationBooked: 'Bora Bora & St. Moritz Dual Estate',
    isPress: true,
  },
  {
    id: 'test-2',
    clientName: 'Lord Harrison V. Sterling',
    title: 'Private Investor',
    source: 'Verified Traveler',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    quote: 'Our family safari in the Serengeti was utterly transformative. The private airstrip landing, the helicopter transfers, and the dedicated game ranger exceeded every high expectation.',
    rating: 5,
    destinationBooked: 'Serengeti Imperial Manor',
    isPress: false,
  },
  {
    id: 'test-3',
    clientName: 'Architectural Digest',
    title: 'Pinnacle of Estate Design & Hospitality',
    source: 'Architectural Digest Haute Travel',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    quote: 'Every sanctuary in the Aetheria portfolio is an architectural masterpiece. The level of detail in security, acoustics, thermal comfort, and privacy is simply staggering.',
    rating: 5,
    destinationBooked: 'Kyoto Zen Estate',
    isPress: true,
  }
];

export const TRAVEL_STATS = [
  { value: '84+', label: 'Private Islands & Estates' },
  { value: '100%', label: 'VIP Fast-Track Clearance' },
  { value: '$1.4M', label: 'Wilderness Fund Pledged' },
  { value: '4.99/5', label: 'Global Distinction Score' },
];
