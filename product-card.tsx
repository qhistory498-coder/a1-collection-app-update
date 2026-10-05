"use client"

import { memo, useRef, useState } from "react"
import Image from "next/image"
import { Crown, ImageOff, MessageCircle, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  type ColorKey,
  type Product,
  COLOR_HEX,
  COLOR_LABEL,
  discountOf,
  formatINR,
  productImage,
  whatsappOrderUrl,
} from "@/lib/catalog"

type Props = {
  product: Product
  preferredColor?: ColorKey
  priority?: boolean
}

function ProductCardImpl({ product, preferredColor, priority }: Props) {
  const [pickedColor, setPickedColor] = useState<ColorKey | null>(null)
  const [size, setSize] = useState<string | null>(null)
  const [needsSize, setNeedsSize] = useState(false)
  const [failedImage, setFailedImage] = useState<string | null>(null)
  const [rotation, setRotation] = useState(0)
  const [detailOpen, setDetailOpen] = useState(false)
  const dragStart = useRef<number | null>(null)
  const detailDragStart = useRef<number | null>(null)

  const color = pickedColor ?? preferredColor ?? product.colors[0]
  const imageSrc = productImage(product.category, color)
  const modelSrc = `/images/model-${product.category.toLowerCase()}.png`
  const colorOverlay = COLOR_HEX[color]
  const discount = discountOf(product)

  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-lg bg-card ring-1 ring-border">
      <div
        className="relative aspect-[3/4] w-full overflow-hidden bg-muted [touch-action:pan-y]"
        onPointerDown={(event) => {
          dragStart.current = event.clientX
          event.currentTarget.setPointerCapture(event.pointerId)
        }}
        onPointerMove={(event) => {
          if (dragStart.current === null) return
          const delta = event.clientX - dragStart.current
          if (Math.abs(delta) < 8) return
          setRotation((value) => (value + delta * 0.7 + 360) % 360)
          dragStart.current = event.clientX
        }}
        onPointerUp={() => {
          dragStart.current = null
        }}
        onPointerCancel={() => {
          dragStart.current = null
        }}
        aria-label={`Drag to rotate ${product.name}; showing ${Math.round(rotation)} degrees`}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-muted text-muted-foreground"
        >
          <ImageOff className="size-7" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em]">A1 Collection</span>
        </div>
        <div
          className="absolute inset-y-0 left-0 right-[25%] origin-center transition-transform duration-75"
          style={{ transform: `perspective(700px) rotateY(${Math.sin((rotation * Math.PI) / 180) * 14}deg)` }}
        >
          {failedImage !== imageSrc && (
            <Image
              key={imageSrc}
              src={modelSrc}
              alt={`${product.name} ${product.category} model in ${COLOR_LABEL[color]}, ${Math.round(rotation)} degree view`}
              fill
              priority={priority}
              quality={75}
              sizes="(min-width: 1024px) 19vw, (min-width: 640px) 25vw, 38vw"
              className="animate-in fade-in object-cover duration-300"
              onError={() => setFailedImage(modelSrc)}
            />
          )}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-[18%] rounded-full mix-blend-color"
            style={{ backgroundColor: colorOverlay, opacity: 0.18 }}
          />
        </div>
        <div className="absolute inset-y-3 right-2 w-[23%] overflow-hidden rounded-md border border-accent/40 bg-card/80 shadow-sm">
          {failedImage !== imageSrc && (
            <Image
              src={imageSrc}
              alt={`${product.name} flat-lay garment detail in ${COLOR_LABEL[color]}`}
              fill
              loading="lazy"
              quality={55}
              sizes="24vw"
              className="object-cover"
              onError={() => setFailedImage(imageSrc)}
            />
          )}
          <span className="absolute bottom-1 left-1 right-1 rounded bg-primary/80 px-1 py-0.5 text-center text-[8px] font-semibold uppercase tracking-wide text-primary-foreground">
            Detail
          </span>
        </div>
        <span className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-primary/85 px-2 py-1 text-[9px] font-semibold uppercase tracking-wide text-primary-foreground">
          Drag to rotate
        </span>
        <div className="absolute left-2 top-2 flex flex-col items-start gap-1">
          <span className="flex items-center gap-1 rounded-full border border-accent/50 bg-white/95 px-2 py-1 text-[9px] font-bold leading-none text-primary shadow-sm">
            <Star className="size-2.5 fill-accent text-accent" aria-hidden="true" />
            A1 Guaranteed
          </span>
          <span className="flex items-center gap-1 rounded-full border border-accent/50 bg-white/95 px-2 py-1 text-[9px] font-bold leading-none text-primary shadow-sm">
            <Crown className="size-2.5 text-accent-foreground" aria-hidden="true" />
            Royal Choice
          </span>
        </div>
        <span className="absolute bottom-2 left-2 flex items-center gap-1 rounded bg-background/90 px-1.5 py-0.5 text-[11px] font-semibold text-foreground">
          {product.rating}
          <Star className="size-3 fill-accent text-accent" aria-hidden="true" />
          <span className="font-normal text-muted-foreground">| {product.reviews}</span>
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-2.5">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            {product.category} &middot; {product.id}
          </p>
          <h3 className="truncate text-sm font-medium text-foreground">{product.name}</h3>
          <button
            type="button"
            onClick={() => setDetailOpen(true)}
            className="mt-1 min-h-10 text-left text-[11px] font-semibold text-primary underline underline-offset-2 [touch-action:manipulation]"
          >
            View full product details
          </button>
        </div>

        <p className="flex flex-wrap items-baseline gap-x-1.5 rounded-md bg-secondary/70 px-2 py-1 text-sm">
          <span className="text-base font-bold text-primary">{formatINR(product.price)}</span>
          <span className="text-xs text-muted-foreground line-through">{formatINR(product.mrp)}</span>
          <span className="text-xs font-semibold text-accent-foreground">{discount}% off</span>
        </p>

        <fieldset className="flex flex-col gap-1">
          <legend className="sr-only">Color for {product.name}</legend>
          <div className="flex flex-wrap items-center gap-1.5">
            {product.colors.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setPickedColor(c)}
                aria-pressed={c === color}
                aria-label={COLOR_LABEL[c]}
                title={COLOR_LABEL[c]}
                className={cn(
                  "flex size-12 items-center justify-center rounded-full transition-transform active:scale-95 [touch-action:manipulation]",
                )}
              >
                <span
                  className={cn(
                    "size-5 rounded-full ring-1 ring-border",
                    c === color && "ring-2 ring-foreground ring-offset-2 ring-offset-card",
                  )}
                  style={{ backgroundColor: COLOR_HEX[c] }}
                />
              </button>
            ))}
          </div>
          <span className="text-[11px] text-muted-foreground">{COLOR_LABEL[color]}</span>
        </fieldset>

        <fieldset className="flex flex-col gap-1">
          <legend className="sr-only">Size for {product.name}</legend>
          <div className="flex flex-wrap gap-1">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setSize(s)
                  setNeedsSize(false)
                }}
                aria-pressed={s === size}
                className={cn(
                  "h-12 min-w-12 rounded border border-border px-2 text-xs font-medium text-foreground transition-colors [touch-action:manipulation]",
                  s === size && "border-foreground bg-foreground text-background",
                )}
              >
                {s}
              </button>
            ))}
          </div>
          {needsSize && (
            <span role="alert" className="text-[11px] font-medium text-destructive">
              Please select a size
            </span>
          )}
        </fieldset>

        <a
          href={size ? whatsappOrderUrl(product, color, size) : undefined}
          target="_blank"
          rel="noopener noreferrer"
          role="button"
          onClick={(e) => {
            e.preventDefault()
            if (!size) {
              setNeedsSize(true)
              return
            }

            const referenceId = Math.floor(10000 + Math.random() * 90000)
            const message = `🏛️ *A1 COLLECTION — LUXURY ATELIER*
📍 *Dhanwar • Flagship Digital Store*
────────────────────────────
🧾 *OFFICIAL ORDER INVOICE*
🆔 *Ref ID:* #A1-${referenceId}

👤 *CLIENT ORDER MANIFEST*
────────────────────────────
✨ *Article:* ${product.name}
🏷️ *Category:* ${product.category}
🎨 *Selected Shade:* ${COLOR_LABEL[color]}
📏 *Bespoke Size:* ${size}
💎 *Piece Value:* ₹${product.price}

📦 *DISPATCH & LOGISTICS STATUS*
────────────────────────────
🚚 *Courier:* Dhanwar Priority Express
🛡️ *Assurance:* 100% Original & Quality Inspected
💵 *Payment Mode:* Cash on Delivery / UPI Available

💬 *Client Note:* 'Kindly verify instant stock availability and dispatch my parcel.'`
            const checkoutUrl = `https://wa.me/918409468979?text=${encodeURIComponent(message)}`
            window.open(checkoutUrl, "_blank", "noopener,noreferrer")
          }}
          className="mt-auto flex h-12 items-center justify-center gap-1.5 rounded-md bg-primary px-2 text-xs font-semibold text-primary-foreground transition-opacity active:opacity-80 [touch-action:manipulation]"
        >
          <MessageCircle className="size-4 text-[#25D366]" aria-hidden="true" />
          Order on WhatsApp
        </a>
      </div>

      {detailOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-primary/70 p-0 sm:items-center sm:p-4"
          role="presentation"
          onClick={() => setDetailOpen(false)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby={`detail-title-${product.id}`}
            className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-2xl bg-card p-4 shadow-2xl sm:rounded-2xl sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Flipkart-style studio view</p>
                <h2 id={`detail-title-${product.id}`} className="font-serif text-xl text-foreground">{product.name}</h2>
              </div>
              <button type="button" onClick={() => setDetailOpen(false)} className="flex size-12 items-center justify-center rounded-full border border-border text-xl text-foreground" aria-label="Close product details">×</button>
            </div>
            <div
              className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted [touch-action:pan-y]"
              aria-label={`Swipe to rotate ${product.name}; showing ${Math.round(rotation)} degrees`}
              onPointerDown={(event) => {
                detailDragStart.current = event.clientX
                event.currentTarget.setPointerCapture(event.pointerId)
              }}
              onPointerMove={(event) => {
                if (detailDragStart.current === null) return
                const delta = event.clientX - detailDragStart.current
                if (Math.abs(delta) < 6) return
                setRotation((value) => (value + delta * 0.8 + 360) % 360)
                detailDragStart.current = event.clientX
              }}
              onPointerUp={() => { detailDragStart.current = null }}
              onPointerCancel={() => { detailDragStart.current = null }}
            >
              <div className="absolute inset-y-0 left-0 right-[28%] flex items-center justify-center bg-gradient-to-br from-primary/20 to-muted">
                <div className="relative h-full w-full" style={{ transform: `perspective(800px) rotateY(${Math.sin((rotation * Math.PI) / 180) * 16}deg)` }}>
                  <Image src={modelSrc} alt={`${product.name} model in ${COLOR_LABEL[color]}`} fill priority={priority} sizes="70vw" className="object-cover" />
                  <span className="pointer-events-none absolute inset-0 mix-blend-color" style={{ backgroundColor: colorOverlay, opacity: 0.16 }} aria-hidden="true" />
                </div>
              </div>
              <div className="absolute inset-y-4 right-3 w-[26%] overflow-hidden rounded-lg border-2 border-accent/60 bg-card shadow-lg">
                <Image src={imageSrc} alt={`${product.name} hanging garment in ${COLOR_LABEL[color]}`} fill loading="lazy" sizes="28vw" className="object-cover" />
                <span className="absolute bottom-2 left-2 right-2 rounded bg-primary/85 px-2 py-1 text-center text-[10px] font-semibold uppercase tracking-wide text-primary-foreground">Hanger detail</span>
              </div>
              <span className="absolute bottom-3 left-3 rounded-full bg-primary/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-primary-foreground">Swipe to rotate 360°</span>
            </div>
            <div className="mt-4 flex gap-2 overflow-x-auto pb-1" aria-label="Selected color thumbnails">
              {product.colors.map((c) => (
                <button key={c} type="button" onClick={() => setPickedColor(c)} aria-pressed={c === color} className={cn("relative size-16 shrink-0 overflow-hidden rounded-lg border-2 [touch-action:manipulation]", c === color ? "border-accent ring-2 ring-accent/30" : "border-border")}>
                  <Image src={productImage(product.category, c)} alt={`${COLOR_LABEL[c]} thumbnail`} fill loading="lazy" sizes="64px" className="object-cover" />
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Selected color: <span className="font-semibold text-foreground">{COLOR_LABEL[color]}</span></p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button key={s} type="button" onClick={() => { setSize(s); setNeedsSize(false) }} aria-pressed={s === size} className={cn("h-12 min-w-12 rounded border border-border px-3 text-sm font-semibold [touch-action:manipulation]", s === size && "border-primary bg-primary text-primary-foreground")}>{s}</button>
              ))}
            </div>
            <button type="button" onClick={() => { if (!size) { setNeedsSize(true); return } const message = `🏛️ *A1 COLLECTION — LUXURY ATELIER*\n📍 *Dhanwar • Flagship Digital Store*\n────────────────────────────\n🧾 *OFFICIAL ORDER INVOICE*\n🆔 *Ref ID:* #A1-${Math.floor(10000 + Math.random() * 90000)}\n\n👤 *CLIENT ORDER MANIFEST*\n────────────────────────────\n✨ *Article:* ${product.name}\n🏷️ *Category:* ${product.category}\n🎨 *Selected Shade:* ${COLOR_LABEL[color]}\n📏 *Bespoke Size:* ${size}\n💎 *Piece Value:* ₹${product.price}\n\n📦 *DISPATCH & LOGISTICS STATUS*\n────────────────────────────\n🚚 *Courier:* Dhanwar Priority Express\n🛡️ *Assurance:* 100% Original & Quality Inspected\n💵 *Payment Mode:* Cash on Delivery / UPI Available\n\n💬 *Client Note:* 'Kindly verify instant stock availability and dispatch my parcel.'`; window.open(`https://wa.me/918409468979?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer") }} className="mt-4 flex h-12 w-full items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground [touch-action:manipulation]">Order on WhatsApp</button>
            {needsSize && <p role="alert" className="mt-2 text-xs font-medium text-destructive">Please select a size</p>}
          </section>
        </div>
      )}
    </article>
  )
}

export const ProductCard = memo(ProductCardImpl)
