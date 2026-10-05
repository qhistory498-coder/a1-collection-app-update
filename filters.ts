import { type Category, type ColorKey, type Product, discountOf } from "@/lib/catalog"

export type Filters = {
  categories: Category[]
  prices: string[]
  colors: ColorKey[]
  sizes: string[]
  rating: number | null
  discount: number | null
}

export type SortKey = "relevance" | "price-asc" | "price-desc" | "rating" | "discount"

export const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "relevance", label: "Relevance" },
  { key: "price-asc", label: "Price: Low to High" },
  { key: "price-desc", label: "Price: High to Low" },
  { key: "rating", label: "Customer Rating" },
  { key: "discount", label: "Better Discount" },
]

export const PRICE_BUCKETS: { key: string; label: string; min: number; max: number }[] = [
  { key: "lt1000", label: "Under \u20B91,000", min: 0, max: 999 },
  { key: "1000-1999", label: "\u20B91,000 - \u20B91,999", min: 1000, max: 1999 },
  { key: "2000-2999", label: "\u20B92,000 - \u20B92,999", min: 2000, max: 2999 },
  { key: "gte3000", label: "\u20B93,000 & above", min: 3000, max: Infinity },
]

export const RATING_OPTIONS = [4, 3]
export const DISCOUNT_OPTIONS = [50, 40, 30]

export const EMPTY_FILTERS: Filters = {
  categories: [],
  prices: [],
  colors: [],
  sizes: [],
  rating: null,
  discount: null,
}

export function countFilters(f: Filters) {
  return (
    f.categories.length +
    f.prices.length +
    f.colors.length +
    f.sizes.length +
    (f.rating ? 1 : 0) +
    (f.discount ? 1 : 0)
  )
}

export function applyFilters(products: Product[], f: Filters, query: string) {
  const q = query.trim().toLowerCase()
  const buckets = PRICE_BUCKETS.filter((b) => f.prices.includes(b.key))
  return products.filter((p) => {
    if (q && !p.name.toLowerCase().includes(q) && !p.category.includes(q)) return false
    if (f.categories.length && !f.categories.includes(p.category)) return false
    if (buckets.length && !buckets.some((b) => p.price >= b.min && p.price <= b.max)) return false
    if (f.colors.length && !p.colors.some((c) => f.colors.includes(c))) return false
    if (f.sizes.length && !p.sizes.some((s) => f.sizes.includes(s))) return false
    if (f.rating && p.rating < f.rating) return false
    if (f.discount && discountOf(p) < f.discount) return false
    return true
  })
}

export function sortProducts(products: Product[], sort: SortKey) {
  if (sort === "relevance") return products
  const sorted = [...products]
  if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price)
  else if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price)
  else if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating)
  else if (sort === "discount") sorted.sort((a, b) => discountOf(b) - discountOf(a))
  return sorted
}

export function toggle<T>(list: T[], value: T) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
}
