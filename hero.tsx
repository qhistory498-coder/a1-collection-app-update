"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { Sparkles } from "lucide-react"

export function Hero() {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let frame = 0
    let targetX = 0
    let targetY = 0
    let x = 0
    let y = 0

    const tick = () => {
      x += (targetX - x) * 0.12
      y += (targetY - y) * 0.12
      el.style.setProperty("--rx", `${y.toFixed(2)}deg`)
      el.style.setProperty("--ry", `${x.toFixed(2)}deg`)
      el.style.setProperty("--gx", `${50 + x * 3}%`)
      if (Math.abs(targetX - x) > 0.01 || Math.abs(targetY - y) > 0.01) {
        frame = requestAnimationFrame(tick)
      } else {
        frame = 0
      }
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(tick)
    }
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      targetX = ((e.clientX - r.left) / r.width - 0.5) * 16
      targetY = -((e.clientY - r.top) / r.height - 0.5) * 16
      schedule()
    }
    const onLeave = () => {
      targetX = 0
      targetY = 0
      schedule()
    }

    el.addEventListener("pointermove", onMove, { passive: true })
    el.addEventListener("pointerleave", onLeave, { passive: true })
    el.addEventListener("pointercancel", onLeave, { passive: true })
    return () => {
      el.removeEventListener("pointermove", onMove)
      el.removeEventListener("pointerleave", onLeave)
      el.removeEventListener("pointercancel", onLeave)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section aria-labelledby="hero-title" className="overflow-hidden bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-8 md:flex-row md:gap-12 md:py-14">
        <div className="flex flex-1 flex-col items-center gap-3 text-center md:items-start md:text-left">
          <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-accent">
            <Sparkles className="size-3.5" aria-hidden="true" />
            Festive Edit 2026
          </span>
          <h1 id="hero-title" className="text-balance font-serif text-3xl leading-tight md:text-5xl">
            Heritage craft, tailored for the whole family
          </h1>
          <p className="max-w-md text-pretty text-sm leading-relaxed text-primary-foreground/70">
            80 handpicked ethnic styles for Men, Women, Boys and Girls. Pick your color, choose your size, and order
            instantly on WhatsApp.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start" aria-label="Collection highlights">
            {["Exclusive Collection", "Handcrafted", "Bestseller"].map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-accent/45 bg-background/5 px-3 py-1.5 text-[10px] font-semibold tracking-wide text-accent"
              >
                {badge}
              </span>
            ))}
          </div>
          <a
            href="#catalog"
            className="mt-1 flex h-12 items-center rounded-full bg-accent px-6 text-sm font-semibold text-accent-foreground"
          >
            Shop the collection
          </a>
        </div>

        <div className="[perspective:900px]">
          <div
            ref={cardRef}
            className="hero-tilt relative aspect-[3/4] w-56 touch-pan-y overflow-hidden rounded-2xl ring-1 ring-accent/40 md:w-72"
          >
            <Image
              src="/images/women-maroon.png"
              alt="Maroon gota patti anarkali from the A1 Collection festive edit"
              fill
              priority
              sizes="(min-width: 768px) 288px, 224px"
              className="object-cover"
            />
            <div className="hero-glare pointer-events-none absolute inset-0" aria-hidden="true" />
            <div className="absolute left-3 top-3 flex size-16 flex-col items-center justify-center rounded-full bg-accent text-center text-accent-foreground shadow-lg [transform:translateZ(40px)]">
              <span className="font-serif text-lg leading-none">A1</span>
              <span className="text-[8px] font-semibold uppercase tracking-widest">Luxe</span>
            </div>
            <div className="absolute inset-x-3 bottom-3 rounded-lg bg-background/90 p-2.5 text-foreground [transform:translateZ(30px)]">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Bestseller</p>
              <p className="text-sm font-medium">Gota Patti Anarkali</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
