export type Category = "men" | "women" | "boys" | "girls"
export type ColorKey = "emerald" | "maroon" | "mustard" | "orange" | "navy" | "pink"

export type Product = {
  id: string
  name: string
  category: Category
  price: number
  mrp: number
  rating: number
  reviews: number
  sizes: string[]
  colors: ColorKey[]
}

export const WHATSAPP_NUMBER = "918409468979"

export const CATEGORIES: { key: Category; label: string }[] = [
  { key: "men", label: "Men" },
  { key: "women", label: "Women" },
  { key: "boys", label: "Boys" },
  { key: "girls", label: "Girls" },
]

export const COLORS: { key: ColorKey; label: string; hex: string }[] = [
  { key: "emerald", label: "Emerald", hex: "#0f6b4f" },
  { key: "maroon", label: "Maroon", hex: "#6e1423" },
  { key: "mustard", label: "Mustard", hex: "#d4a017" },
  { key: "orange", label: "Orange", hex: "#d9622b" },
  { key: "navy", label: "Navy", hex: "#1b2a4a" },
  { key: "pink", label: "Pink", hex: "#e48aa6" },
]

export const COLOR_HEX = Object.fromEntries(COLORS.map((c) => [c.key, c.hex])) as Record<ColorKey, string>
export const COLOR_LABEL = Object.fromEntries(COLORS.map((c) => [c.key, c.label])) as Record<ColorKey, string>

export function productImage(category: Category, color: ColorKey) {
  return `/images/${category}-${color}.png`
}

const ADULT_MEN = ["S", "M", "L", "XL", "XXL"]
const ADULT_WOMEN = ["XS", "S", "M", "L", "XL"]
const KIDS = ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y", "12-13Y"]

type Seed = [name: string, price: number, mrp: number]

const SEEDS: Record<Category, Seed[]> = {
  men: [
    ["Royal Silk Blend Kurta", 1899, 3499],
    ["Zari Border Festive Kurta", 2299, 3999],
    ["Classic Cotton Straight Kurta", 999, 1799],
    ["Embroidered Nehru Collar Kurta", 2599, 4299],
    ["Linen Comfort Kurta Set", 1799, 2999],
    ["Jacquard Weave Sherwani Kurta", 3999, 6999],
    ["Chikankari Cotton Kurta", 1499, 2499],
    ["Mandarin Collar Pathani Suit", 2199, 3599],
    ["Banarasi Brocade Kurta", 3299, 5499],
    ["Printed Rayon Short Kurta", 799, 1299],
    ["Velvet Bandhgala Kurta", 4499, 7499],
    ["Handloom Khadi Kurta", 1299, 1999],
    ["Mirror Work Festive Kurta", 2799, 4499],
    ["Asymmetric Hem Designer Kurta", 2499, 3999],
    ["Dupion Silk Kurta Pajama", 2999, 4999],
    ["Thread Work Angrakha Kurta", 3499, 5799],
    ["Solid Viscose Daily Kurta", 899, 1499],
    ["Gold Buttoned Celebration Kurta", 2399, 3799],
    ["Self Design Jacquard Kurta", 1699, 2799],
    ["Wedding Edit Raw Silk Kurta", 4999, 8499],
  ],
  women: [
    ["Gota Patti Anarkali Kurta", 2499, 4499],
    ["Flared Georgette Anarkali", 2199, 3999],
    ["Chanderi Silk Straight Kurta", 1699, 2799],
    ["Zari Woven Kurta Dupatta Set", 2999, 4999],
    ["Mirror Work Festive Anarkali", 3299, 5499],
    ["Printed Cotton A-Line Kurta", 899, 1499],
    ["Banarasi Silk Kurta Set", 3999, 6499],
    ["Chikankari Lucknowi Kurta", 1899, 2999],
    ["Tiered Maxi Ethnic Gown", 2799, 4599],
    ["Bandhani Print Kurta", 1299, 2199],
    ["Velvet Embroidered Anarkali", 4499, 7499],
    ["Organza Overlay Kurta Set", 3499, 5799],
    ["Handblock Print Kurti", 799, 1299],
    ["Sequin Party Anarkali", 3799, 6299],
    ["Angrakha Style Kurta", 1999, 3299],
    ["Kalidar Floor Length Kurta", 2699, 4299],
    ["Tissue Silk Festive Kurta", 3199, 5199],
    ["Pleated Yoke Rayon Kurta", 999, 1699],
    ["Thread Embroidered Sharara Set", 4299, 6999],
    ["Bridal Edit Zardozi Anarkali", 5999, 9999],
  ],
  boys: [
    ["Mini Royal Kurta Pajama", 1199, 1999],
    ["Festive Silk Kurta Set", 1499, 2499],
    ["Cotton Comfort Kurta Pajama", 799, 1299],
    ["Nehru Jacket Kurta Combo", 1899, 2999],
    ["Embroidered Yoke Kurta Set", 1399, 2299],
    ["Little Prince Sherwani", 2499, 3999],
    ["Printed Cotton Kurta Set", 699, 1199],
    ["Jacquard Festive Kurta", 1299, 2099],
    ["Dhoti Kurta Celebration Set", 1599, 2599],
    ["Linen Blend Kurta Pajama", 999, 1599],
    ["Brocade Bandhgala Set", 2199, 3499],
    ["Mirror Work Kids Kurta", 1199, 1899],
    ["Gold Button Silk Kurta", 1399, 2199],
    ["Pathani Kids Suit", 1099, 1799],
    ["Velvet Festive Kurta Set", 1799, 2899],
    ["Short Kurta Churidar Set", 899, 1499],
    ["Thread Work Kurta Pajama", 1299, 1999],
    ["Raw Silk Wedding Kurta", 1999, 3199],
    ["Classic Solid Kids Kurta", 599, 999],
    ["Angrakha Kids Kurta Set", 1499, 2399],
  ],
  girls: [
    ["Mini Lehenga Choli Set", 1799, 2999],
    ["Festive Frock Lehenga", 1499, 2499],
    ["Gota Work Kids Anarkali", 1399, 2299],
    ["Silk Pattu Pavadai Set", 1999, 3299],
    ["Tulle Layered Party Lehenga", 2299, 3799],
    ["Cotton Printed Kurti Set", 699, 1199],
    ["Mirror Work Ghagra Set", 1699, 2799],
    ["Little Princess Gown", 2499, 3999],
    ["Sharara Kurti Kids Set", 1299, 2099],
    ["Brocade Festive Lehenga", 2099, 3399],
    ["Bandhani Kids Lehenga", 1199, 1999],
    ["Velvet Embroidered Frock", 1899, 2999],
    ["Organza Ruffle Anarkali", 1599, 2599],
    ["Zari Border Kids Gown", 1799, 2899],
    ["Floral Print Ethnic Frock", 799, 1299],
    ["Sequin Celebration Lehenga", 2699, 4299],
    ["Palazzo Kurti Combo", 999, 1599],
    ["Thread Embroidered Ghagra", 1499, 2399],
    ["Banarasi Kids Lehenga", 2399, 3799],
    ["Wedding Edit Kids Lehenga", 2999, 4799],
  ],
}

const SIZE_POOL: Record<Category, string[]> = {
  men: ADULT_MEN,
  women: ADULT_WOMEN,
  boys: KIDS,
  girls: KIDS,
}

const ALL_COLOR_KEYS = COLORS.map((c) => c.key)

function pickColors(index: number): ColorKey[] {
  const count = 3 + (index % 4)
  const start = (index * 5) % ALL_COLOR_KEYS.length
  return Array.from({ length: count }, (_, i) => ALL_COLOR_KEYS[(start + i) % ALL_COLOR_KEYS.length])
}

function pickSizes(category: Category, index: number): string[] {
  const pool = SIZE_POOL[category]
  const drop = index % 3 === 0 ? 1 : 0
  return pool.slice(0, pool.length - drop)
}

export const PRODUCTS: Product[] = CATEGORIES.flatMap(({ key }) =>
  SEEDS[key].map(([name, price, mrp], i) => {
    const seed = i + key.length * 7
    return {
      id: `${key.toUpperCase().slice(0, 1)}${String(i + 1).padStart(2, "0")}`,
      name,
      category: key,
      price,
      mrp,
      rating: Math.round((3.6 + ((seed * 37) % 14) / 10) * 10) / 10,
      reviews: 40 + ((seed * 97) % 960),
      sizes: pickSizes(key, i),
      colors: pickColors(seed),
    }
  }),
)

export const ALL_SIZES = [...ADULT_WOMEN.filter((s) => !ADULT_MEN.includes(s)), ...ADULT_MEN, ...KIDS]

export function discountOf(p: Product) {
  return Math.round(((p.mrp - p.price) / p.mrp) * 100)
}

export function formatINR(n: number) {
  return `\u20B9${n.toLocaleString("en-IN")}`
}

export function whatsappOrderUrl(p: Product, color: ColorKey, size: string) {
  const category = p.category[0].toUpperCase() + p.category.slice(1)
  const message = [
    "Hello A1 Collection Dhanwar, I want to order:",
    `• Item: ${p.name}`,
    `• Category: ${category}`,
    `• Selected Color: ${COLOR_LABEL[color]}`,
    `• Selected Size: ${size}`,
    `• Price: ${formatINR(p.price)}`,
    "Please confirm availability and dispatch details.",
  ].join("\n")
  return `https://wa.me/918409468979?text=${encodeURIComponent(message)}`
}
