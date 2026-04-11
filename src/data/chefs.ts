export type ChefBadgeTone = 'green' | 'orange' | 'blue'

export type ChefBadge = { tone: ChefBadgeTone; label: string }

export type PlateSlot = { name: string; image: string }

export type MenuDish = {
  id: string
  name: string
  description?: string
  priceEgp: number
  image: string
}

export type LoveNote = { quote: string; author: string }

export type ChefProfile = {
  id: string
  name: string
  hero: string
  avatar: string
  tagline: string
  rating: string
  onTimePct: string
  topPercentile?: string
  live: boolean
  badges: ChefBadge[]
  ordersLine?: string
  bio: string
  verifiedLabel: string
  repeatCustomersLabel: string
  cfaBanner?: string
  buildAPlate: {
    protein: PlateSlot
    carb: PlateSlot
    side: PlateSlot
  }
  signatureDishes: MenuDish[]
  cooksChoice: MenuDish[]
  wallOfLove: LoveNote[]
}

export const CHEFS: ChefProfile[] = [
  {
    id: 'chef-hassan',
    name: 'Chef Hassan',
    hero: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&h=480&fit=crop',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&facepad=2',
    tagline: 'Charcoal Grills',
    rating: '4.8',
    onTimePct: '98%',
    topPercentile: 'TOP 1%',
    live: false,
    badges: [
      { tone: 'green', label: 'KITCHY Verified' },
      { tone: 'blue', label: 'Feeds the Tribe (10+)' },
    ],
    bio: 'The Grill Master. Making the juiciest Kofta and Kebab in Cairo. KITCHY Inspected and Certified.',
    verifiedLabel: 'KITCHEN VERIFIED FEB 2026',
    repeatCustomersLabel: '2,000 REPEAT CUSTOMERS',
    cfaBanner: 'CFA MICRO-MEALS AVAILABLE',
    buildAPlate: {
      protein: {
        name: 'Grilled Kofta',
        image:
          'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400&h=280&fit=crop',
      },
      carb: {
        name: 'White Rice',
        image:
          'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=280&fit=crop',
      },
      side: {
        name: 'Fattoush',
        image:
          'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=280&fit=crop',
      },
    },
    signatureDishes: [
      {
        id: 'h1',
        name: 'Mixed Grill Platter',
        description: 'Kofta, tawook, and kebab with garlic dip.',
        priceEgp: 195,
        image:
          'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=280&fit=crop',
      },
      {
        id: 'h2',
        name: 'Charcoal Kofta Bowl',
        description: 'Spiced beef kofta over rice and tahini.',
        priceEgp: 145,
        image:
          'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=280&fit=crop',
      },
      {
        id: 'h3',
        name: 'Lamb Kebab Skewers',
        description: 'Two skewers, grilled vegetables, pickles.',
        priceEgp: 175,
        image:
          'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=280&fit=crop',
      },
      {
        id: 'h4',
        name: 'Garlic Tawook Wrap',
        description: 'Toasted saj bread, fries, garlic whip.',
        priceEgp: 95,
        image:
          'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=280&fit=crop',
      },
    ],
    cooksChoice: [
      {
        id: 'hc1',
        name: "Hassan's Fire Combo",
        priceEgp: 165,
        image:
          'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=280&fit=crop',
      },
      {
        id: 'hc2',
        name: 'Friday Grill Box',
        priceEgp: 210,
        image:
          'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=280&fit=crop',
      },
    ],
    wallOfLove: [
      {
        quote: 'Best kofta in Zamalek — juicy every single time.',
        author: 'Omar K.',
      },
      {
        quote: 'On-time for our office lunch. The team was obsessed.',
        author: 'Layla M.',
      },
      {
        quote: 'Tastes like my teta’s grill but fancier packaging.',
        author: 'Youssef A.',
      },
    ],
  },
  {
    id: 'mama-karima',
    name: 'Mama Karima',
    hero: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&h=480&fit=crop',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&facepad=2',
    tagline: "Ghadwet el-Gom'aa",
    rating: '4.9',
    onTimePct: '99%',
    live: true,
    badges: [
      { tone: 'green', label: 'KITCHY Verified' },
      { tone: 'orange', label: "Mother's Touch" },
    ],
    ordersLine: '5,200 orders hit',
    bio: 'Homestyle Egyptian comfort: mahshi, molokhia, and Friday feasts made with love. KITCHY Inspected and Certified.',
    verifiedLabel: 'KITCHEN VERIFIED JAN 2026',
    repeatCustomersLabel: '5,200 REPEAT CUSTOMERS',
    cfaBanner: 'CFA MICRO-MEALS AVAILABLE',
    buildAPlate: {
      protein: {
        name: 'Stuffed Vine Leaves',
        image:
          'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=280&fit=crop',
      },
      carb: {
        name: 'Rice with Vermicelli',
        image:
          'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=280&fit=crop',
      },
      side: {
        name: 'Village Salad',
        image:
          'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=280&fit=crop',
      },
    },
    signatureDishes: [
      {
        id: 'k1',
        name: 'Mahshi Mix Platter',
        description: 'Vine leaves, zucchini, and peppers — her secret tomato broth.',
        priceEgp: 120,
        image:
          'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=280&fit=crop',
      },
      {
        id: 'k2',
        name: 'Molokhia & Rabbit',
        description: 'Classic pairing, garlic-forward, served with rice.',
        priceEgp: 185,
        image:
          'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=280&fit=crop',
      },
      {
        id: 'k3',
        name: 'Koshary Friday Bowl',
        description: 'Lentils, pasta, crispy onions, spiced sauce.',
        priceEgp: 75,
        image:
          'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=280&fit=crop',
      },
      {
        id: 'k4',
        name: 'Bamya Stew',
        description: 'Slow-cooked okra in rich tomato sauce.',
        priceEgp: 95,
        image:
          'https://images.unsplash.com/photo-1455619453084-ceb7b3fcde8d?w=400&h=280&fit=crop',
      },
    ],
    cooksChoice: [
      {
        id: 'kc1',
        name: "Karima's Comfort Box",
        priceEgp: 140,
        image:
          'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=280&fit=crop',
      },
      {
        id: 'kc2',
        name: 'Family Feast (3 ppl)',
        priceEgp: 320,
        image:
          'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=280&fit=crop',
      },
    ],
    wallOfLove: [
      {
        quote: 'The mahshi tastes exactly like my mom’s — I cried a little.',
        author: 'Nour H.',
      },
      {
        quote: 'Our weekly Ghadwet order. Never disappoints.',
        author: 'The El-Masry family',
      },
    ],
  },
]

export function getChefById(id: string): ChefProfile | undefined {
  return CHEFS.find((c) => c.id === id)
}
