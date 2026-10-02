export type Tag = "Bestseller" | "Premium" | "Limited Edition" | "Chocolate" | "Stuffed" | "Exotic";

export interface Cookie {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  rating: number;
  tags: Tag[];
  image: string;
  imageAttribution?: {
    title: string;
    creator: string;
    sourceUrl: string;
    license: string;
    licenseUrl: string;
  };
  ingredients: string[];
  story: string;
}

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=85`;

export const cookies: Cookie[] = [
  {
    id: "belgian-lava",
    name: "Belgian Chocolate Lava",
    tagline: "Molten 70% cacao core",
    description: "A crackling crust giving way to a slow river of warm Belgian chocolate.",
    price: 699,
    rating: 4.9,
    tags: ["Bestseller", "Premium", "Chocolate"],
    image: "https://live.staticflickr.com/5303/5616289211_433f35fa25_b.jpg",
    imageAttribution: {
      title: "Chocolate Chocolate Chip Cookies",
      creator: "slgckgc",
      sourceUrl: "https://www.flickr.com/photos/14771153@N04/5616289211",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    },
    ingredients: ["Belgian 70% cacao", "Cultured butter", "Madagascar vanilla", "French sea salt"],
    story: "Hand-piped molten ganache, sealed inside a brown-butter dough and baked à la minute.",
  },
  {
    id: "lotus-biscoff",
    name: "Lotus Biscoff Stuffed",
    tagline: "Caramelised speculoos heart",
    description: "Buttery shortbread crumb folded around a warm Lotus Biscoff core.",
    price: 499,
    rating: 4.8,
    tags: ["Bestseller", "Stuffed"],
    image: img("1499636136210-6f4ee915583e"),
    ingredients: ["Lotus Biscoff", "European butter", "Brown sugar", "Vanilla bean"],
    story: "We bake them just under, so the speculoos centre stays liquid gold.",
  },
  {
    id: "pistachio-kunafa",
    name: "Pistachio Kunafa",
    tagline: "Saffron · rosewater · pistachio",
    description: "Crisp shredded kunafa, Iranian pistachio cream, a whisper of rose.",
    price: 999,
    rating: 5.0,
    tags: ["Premium", "Limited Edition", "Exotic"],
    image: "https://live.staticflickr.com/5208/5249239555_e840c5885d.jpg",
    imageAttribution: {
      title: "Cranberry Pistachio Cookie",
      creator: "SodexoUSA",
      sourceUrl: "https://www.flickr.com/photos/43321797@N06/5249239555",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    },
    ingredients: ["Iranian pistachio", "Kunafa pastry", "Saffron", "Rosewater"],
    story: "An ode to Levantine confectionery, reimagined as a single, jewel-like cookie.",
  },
  {
    id: "triple-choco",
    name: "Triple Choco Overload",
    tagline: "Dark · milk · white",
    description: "Three chocolates layered for an obsessive cocoa crescendo.",
    price: 699,
    rating: 4.8,
    tags: ["Bestseller", "Chocolate", "Premium"],
    image: "https://live.staticflickr.com/3593/4555899449_cac0d088b1_b.jpg",
    imageAttribution: {
      title: "Mrs J's triple chocolate cookies",
      creator: "jeffreyw",
      sourceUrl: "https://www.flickr.com/photos/7927684@N03/4555899449",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    },
    ingredients: ["72% dark", "Single-origin milk", "Tahitian white", "Cocoa nibs"],
    story: "Built in three passes — dough, chunk, drizzle — for textural drama in every bite.",
  },
  {
    id: "matcha-white",
    name: "Matcha White Chocolate",
    tagline: "Uji matcha · ivory chocolate",
    description: "Ceremonial-grade matcha tempered with creamy white chocolate buttons.",
    price: 699,
    rating: 4.7,
    tags: ["Premium", "Exotic"],
    image: "https://live.staticflickr.com/5050/5262651315_abaff55292_b.jpg",
    imageAttribution: {
      title: "matcha cookies",
      creator: "seelensturm",
      sourceUrl: "https://www.flickr.com/photos/61404197@N00/5262651315",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    },
    ingredients: ["Uji matcha", "Valrhona Ivoire", "Hokkaido milk powder"],
    story: "Vivid jade dough flecked with melting pearls of white chocolate.",
  },
  {
    id: "hazelnut-sea-salt",
    name: "Hazelnut Sea Salt",
    tagline: "Piedmont hazelnut praline",
    description: "Toasted hazelnut crumb finished with hand-flaked Maldon salt.",
    price: 499,
    rating: 4.8,
    tags: ["Bestseller", "Premium"],
    image: "https://live.staticflickr.com/7481/15410331344_ccb702958b_b.jpg",
    imageAttribution: {
      title: "Milk Chocolate-Dipped Hazelnut Sandies Sarah T.",
      creator: "thebittenword.com",
      sourceUrl: "https://www.flickr.com/photos/22198928@N00/15410331344",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    },
    ingredients: ["Piedmont hazelnut", "Brown butter", "Maldon salt", "Demerara"],
    story: "The cookie our pastry chef bakes for herself, off-menu, every Sunday.",
  },
  {
    id: "red-velvet",
    name: "Red Velvet Cream",
    tagline: "Cocoa · cream cheese core",
    description: "Crimson cocoa dough wrapped around a tangy cream cheese centre.",
    price: 499,
    rating: 4.7,
    tags: ["Stuffed"],
    image: "https://live.staticflickr.com/8497/8301583602_e3b3498bd1_b.jpg",
    imageAttribution: {
      title: "Black and White Red Velvet Cookies",
      creator: "wizardofozgurl",
      sourceUrl: "https://www.flickr.com/photos/18663463@N03/8301583602",
      license: "CC BY-SA 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
    },
    ingredients: ["Dutched cocoa", "Cultured cream cheese", "Buttermilk"],
    story: "Velvet on the outside, cheesecake on the inside.",
  },
  {
    id: "caramel-almond",
    name: "Caramel Almond Crunch",
    tagline: "Salted caramel · Marcona almond",
    description: "Brittle shards of caramel and toasted Marcona almond in every bite.",
    price: 499,
    rating: 4.8,
    tags: ["Bestseller", "Premium"],
    image: "https://live.staticflickr.com/7001/13456002714_40b0d741cb.jpg",
    imageAttribution: {
      title: "Amazing Almond Cookies",
      creator: "Andrea_Nguyen",
      sourceUrl: "https://www.flickr.com/photos/41993463@N08/13456002714",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    },
    ingredients: ["Marcona almond", "Salted caramel", "Brown butter"],
    story: "A study in contrast — pillowy centre, glass-like caramel crunch.",
  },
  {
    id: "nutella-core",
    name: "Nutella Core Explosion",
    tagline: "Hazelnut chocolate eruption",
    description: "A generous frozen Nutella core that erupts on first bite.",
    price: 499,
    rating: 4.9,
    tags: ["Bestseller", "Stuffed", "Chocolate"],
    image: img("1490567674331-72de84996b8e"),
    ingredients: ["Nutella", "Cocoa", "Roasted hazelnut", "Vanilla"],
    story: "Best served warm, fifteen seconds in the oven, eaten with both hands.",
  },
  {
    id: "tiramisu",
    name: "Tiramisu Cream",
    tagline: "Espresso · mascarpone · cocoa",
    description: "Italian espresso dough cradling a mascarpone cream centre.",
    price: 699,
    rating: 4.8,
    tags: ["Premium", "Stuffed", "Exotic"],
    image: img("1571877227200-a0d98ea607e9"),
    ingredients: ["Italian espresso", "Mascarpone", "Cocoa", "Marsala"],
    story: "A Sicilian afternoon, condensed into a single cookie.",
  },
  {
    id: "dark-cocoa-royale",
    name: "Dark Cocoa Royale",
    tagline: "85% single-origin Ecuador",
    description: "Intense, low-sugar, almost-bitter — for the cocoa purists.",
    price: 699,
    rating: 4.9,
    tags: ["Premium", "Chocolate"],
    image: img("1542838132-92c53300491e"),
    ingredients: ["85% Ecuador cacao", "Muscovado", "Brown butter"],
    story: "Three days of slow-fermented dough for a richer, deeper crumb.",
  },
  {
    id: "white-truffle",
    name: "White Truffle Vanilla",
    tagline: "Tahitian vanilla · white truffle salt",
    description: "Pale, perfumed, finished with a delicate dusting of truffle salt.",
    price: 999,
    rating: 4.9,
    tags: ["Premium", "Limited Edition", "Exotic"],
    image: img("1511690656952-34342bb7c2f2"),
    ingredients: ["Tahitian vanilla", "Italian white truffle salt", "Cultured butter"],
    story: "Our most polarising cookie — savoury, floral, unmistakably ours.",
  },
  {
    id: "saffron-rose",
    name: "Saffron Rose Pearl",
    tagline: "Kashmiri saffron · rose petal",
    description: "Golden saffron-infused dough studded with crystallised rose petals.",
    price: 999,
    rating: 5.0,
    tags: ["Premium", "Limited Edition", "Exotic"],
    image: img("1568901346375-23c9450c58cd"),
    ingredients: ["Kashmiri saffron", "Damask rose", "Cardamom", "Pistachio"],
    story: "A two-week limited drop, hand-finished with edible 24-karat gold.",
  },
  {
    id: "miso-caramel",
    name: "Miso Caramel",
    tagline: "White miso · burnt caramel",
    description: "Umami-deep miso meets bittersweet burnt-sugar caramel.",
    price: 699,
    rating: 4.7,
    tags: ["Premium", "Exotic"],
    image: img("1540189549336-e6e99e2d3114"),
    ingredients: ["Shiro miso", "Burnt caramel", "Brown butter", "Buckwheat"],
    story: "Inspired by a late-night Tokyo bakery our chef wandered into in 2019.",
  },
  {
    id: "espresso-noir",
    name: "Espresso Noir",
    tagline: "Triple-shot · 80% dark",
    description: "A cookie that drinks like a ristretto. Bold, short, intense.",
    price: 299,
    rating: 4.6,
    tags: ["Chocolate"],
    image: img("1519864600265-abb23847ef2c"),
    ingredients: ["Triple espresso", "80% dark", "Cocoa nibs"],
    story: "Our entry-level cookie, designed as a perfect 4pm pick-me-up.",
  },
];

export const tagOptions: Tag[] = ["Bestseller", "Premium", "Limited Edition", "Chocolate", "Stuffed", "Exotic"];
