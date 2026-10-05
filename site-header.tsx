import { Heart, MessageCircle } from "lucide-react"
import { WHATSAPP_NUMBER } from "@/lib/catalog"

const DESIGNER_WHATSAPP_MESSAGE =
  "Hello Saddam Hussain, I saw your A1 Collection platform. I want to build a custom website/app for my business."
const DESIGNER_WHATSAPP_URL = `https://wa.me/918409468979?text=${encodeURIComponent(DESIGNER_WHATSAPP_MESSAGE)}`

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <a
        href={DESIGNER_WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Connect with Saddam Hussain for a VIP website or app"
        className="flex min-h-12 w-full items-center gap-2 overflow-hidden bg-[#0B192C] px-3 py-1.5 text-white transition-colors hover:bg-[#132743] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-inset"
      >
        <img
          src="https://i.ibb.co/KpSP30Fz/image.jpg"
          alt="Saddam Hussain"
          className="size-8 shrink-0 rounded-full border-2 border-[#D4AF37] object-cover"
        />
        <span className="min-w-0 flex-1 overflow-hidden whitespace-nowrap text-center text-[11px] font-medium tracking-wide sm:text-xs">
          <span className="inline-block animate-[ticker_18s_linear_infinite] pr-8">
            ✦ Engineered &amp; Designed by Saddam Hussain ✦ Want a VIP Website or App for your business? Tap to Connect ⚡
          </span>
        </span>
      </a>
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-3 md:px-4">
        <a href="#" className="flex min-h-12 items-center gap-1.5" aria-label="A1 Collection home">
          <span className="font-serif text-2xl leading-none text-foreground">A1</span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">Collection</span>
        </a>
        <div className="flex items-center gap-1">
          <a
            href="#catalog"
            aria-label="Wishlist"
            className="flex size-12 items-center justify-center rounded-full text-foreground active:bg-muted"
          >
            <Heart className="size-5" aria-hidden="true" />
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            className="flex size-12 items-center justify-center rounded-full text-foreground active:bg-muted"
          >
            <MessageCircle className="size-5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </header>
  )
}
