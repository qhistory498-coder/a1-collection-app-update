"use client"

import { useDeferredValue, useMemo, useState } from "react"
import Image from "next/image"
import { ArrowUpDown, Search, SlidersHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { CATEGORIES, PRODUCTS, productImage } from "@/lib/catalog"
import {
  type Filters,
  type SortKey,
  EMPTY_FILTERS,
  SORT_OPTIONS,
  applyFilters,
  countFilters,
  sortProducts,
} from "@/lib/filters"
import { ProductCard } from "@/components/product-card"
import { FilterDrawer } from "@/components/filter-drawer"
import { SortDrawer } from "@/components/sort-drawer"

export function CatalogView() {
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS)
  const [sort, setSort] = useState<SortKey>("relevance")
  const [query, setQuery] = useState("")
  const [filterOpen, setFilterOpen] = useState(false)
  const [sortOpen, setSortOpen] = useState(false)
  const deferredQuery = useDeferredValue(query)

  const results = useMemo(
    () => sortProducts(applyFilters(PRODUCTS, filters, deferredQuery), sort),
    [filters, deferredQuery, sort],
  )
  const activeCount = countFilters(filters)
  const sortLabel = SORT_OPTIONS.find((o) => o.key === sort)?.label
  const singleCategory = filters.categories.length === 1 ? filters.categories[0] : null

  const selectCategory = (key: (typeof CATEGORIES)[number]["key"] | null) =>
    setFilters((f) => ({ ...f, categories: key ? [key] : [] }))

  return (
    <section id="catalog" aria-labelledby="catalog-title" className="mx-auto w-full max-w-6xl scroll-mt-14 pb-24 md:pb-12">
      <nav aria-label="Shop by category" className="bg-primary px-3 py-4 text-primary-foreground md:px-4">
        <ul className="mx-auto flex max-w-md items-start justify-between gap-2">
          {CATEGORIES.map((category, index) => {
            const active = singleCategory === category.key
            return (
              <li key={category.key} className="flex min-w-0 flex-1 justify-center">
                <button
                  type="button"
                  onClick={() => selectCategory(category.key)}
                  aria-label={`Browse ${category.label}`}
                  aria-pressed={active}
                  className="flex min-h-20 min-w-0 flex-col items-center gap-1.5 rounded-xl px-1 py-1 text-[11px] font-semibold text-primary-foreground transition-transform active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent [touch-action:manipulation]"
                >
                  <span
                    className={cn(
                      "relative block size-[68px] rounded-full bg-gradient-to-br from-[#f1dc84] via-[#d4af37] to-[#9b7416] p-[3px] shadow-[0_0_14px_rgba(212,175,55,0.32)]",
                      active && "shadow-[0_0_20px_rgba(212,175,55,0.75)]",
                    )}
                  >
                    <span className="relative block size-full overflow-hidden rounded-full border-2 border-primary bg-card">
                      <Image
                        src={productImage(category.key, "emerald")}
                        alt=""
                        fill
                        priority={index < 2}
                        quality={65}
                        sizes="68px"
                        className="object-cover"
                      />
                    </span>
                    {active && <span className="absolute inset-0 rounded-full ring-2 ring-white/80" aria-hidden="true" />}
                  </span>
                  <span className="truncate">{category.label}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
      <div className="sticky top-14 z-30 flex flex-col gap-2 border-b border-border bg-background/95 px-3 py-2 backdrop-blur md:px-4">
        <label className="relative flex items-center">
          <span className="sr-only">Search products</span>
          <Search className="pointer-events-none absolute left-3 size-4 text-muted-foreground" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search kurtas, lehengas, sherwanis..."
            className="h-12 w-full rounded-md bg-muted pl-9 pr-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring md:text-sm"
          />
        </label>
        <div className="no-scrollbar -mx-3 flex gap-2 overflow-x-auto px-3 md:mx-0 md:px-0">
          <CategoryChip active={filters.categories.length === 0} onClick={() => selectCategory(null)}>
            All
          </CategoryChip>
          {CATEGORIES.map((c) => (
            <CategoryChip key={c.key} active={singleCategory === c.key} onClick={() => selectCategory(c.key)}>
              {c.label}
            </CategoryChip>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 px-3 pb-2 pt-4 md:px-4">
        <h2 id="catalog-title" className="font-serif text-xl text-foreground">
          The Collection{" "}
          <span className="font-sans text-xs text-muted-foreground">({results.length} items)</span>
        </h2>
        <div className="hidden items-center gap-2 md:flex">
          <ToolbarButton onClick={() => setSortOpen(true)} icon={ArrowUpDown} label="Sort By" sub={sortLabel} />
          <ToolbarButton onClick={() => setFilterOpen(true)} icon={SlidersHorizontal} label="Filters" count={activeCount} />
        </div>
      </div>

      {results.length > 0 ? (
        <ul className="grid grid-cols-2 gap-2 px-2 sm:grid-cols-3 sm:gap-3 md:px-4 lg:grid-cols-4">
          {results.map((p, i) => (
            <li key={p.id} className="min-w-0">
              <ProductCard
                product={p}
                priority={i < 4}
                preferredColor={filters.colors.find((c) => p.colors.includes(c))}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center gap-3 px-4 py-16 text-center">
          <p className="font-serif text-lg text-foreground">No styles match your filters</p>
          <button
            type="button"
            onClick={() => {
              setFilters(EMPTY_FILTERS)
              setQuery("")
            }}
            className="h-10 rounded-full border border-foreground px-5 text-sm font-semibold text-foreground"
          >
            Clear all filters
          </button>
        </div>
      )}

      <nav
        aria-label="Sort and filter"
        className="fixed inset-x-0 bottom-0 z-40 flex border-t border-border bg-background pb-[env(safe-area-inset-bottom)] md:hidden"
      >
        <button
          type="button"
          onClick={() => setSortOpen(true)}
          className="flex h-14 flex-1 items-center justify-center gap-2 text-sm font-semibold text-foreground active:bg-muted [touch-action:manipulation]"
        >
          <ArrowUpDown className="size-4" aria-hidden="true" />
          <span className="flex flex-col items-start leading-tight">
            Sort By
            {sort !== "relevance" && <span className="text-[10px] font-normal text-muted-foreground">{sortLabel}</span>}
          </span>
        </button>
        <span className="my-3 w-px bg-border" aria-hidden="true" />
        <button
          type="button"
          onClick={() => setFilterOpen(true)}
          className="flex h-14 flex-1 items-center justify-center gap-2 text-sm font-semibold text-foreground active:bg-muted [touch-action:manipulation]"
        >
          <SlidersHorizontal className="size-4" aria-hidden="true" />
          Filters
          {activeCount > 0 && (
            <span className="flex size-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
              {activeCount}
            </span>
          )}
        </button>
      </nav>

      <SortDrawer open={sortOpen} onOpenChange={setSortOpen} value={sort} onChange={setSort} />
      <FilterDrawer
        open={filterOpen}
        onOpenChange={setFilterOpen}
        value={filters}
        query={deferredQuery}
        onApply={setFilters}
      />
    </section>
  )
}

function CategoryChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "h-12 shrink-0 rounded-full border border-border px-4 text-sm font-medium text-foreground transition-colors [touch-action:manipulation]",
        active && "border-primary bg-primary text-primary-foreground",
      )}
    >
      {children}
    </button>
  )
}

function ToolbarButton({
  onClick,
  icon: Icon,
  label,
  sub,
  count,
}: {
  onClick: () => void
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
  label: string
  sub?: string
  count?: number
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-10 items-center gap-2 rounded-md border border-border px-3 text-sm font-medium text-foreground hover:bg-muted"
    >
      <Icon className="size-4" aria-hidden={true} />
      {label}
      {sub && <span className="text-xs text-muted-foreground">{sub}</span>}
      {count ? (
        <span className="flex size-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
          {count}
        </span>
      ) : null}
    </button>
  )
}
