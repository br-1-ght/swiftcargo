import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Ship,
  Plane,
  Truck,
  Warehouse,
  Search,
  ShieldCheck,
  Globe2,
  Clock,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import heroImg from "@/assets/hero-cargo.jpg";
import truckImg from "@/assets/truck.jpg";
import airImg from "@/assets/air-freight.jpg";
import warehouseImg from "@/assets/warehouse.jpg";
import portImg from "@/assets/port.jpg";
import shipImg from "@/assets/ship.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SwiftCargo — Reliable Global Shipping & Cargo Solutions" },
      { name: "description", content: "Sea, air, road and rail freight, warehousing and last-mile delivery in 220+ countries. Track and book online." },
      { property: "og:title", content: "SwiftCargo — Global Shipping" },
      { property: "og:description", content: "Reliable cargo and parcel delivery worldwide." },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: Home,
});

const SERVICES = [
  { icon: Ship, title: "Sea Freight", desc: "FCL & LCL ocean shipping across 600+ ports.", img: shipImg },
  { icon: Plane, title: "Air Freight", desc: "Express & deferred air cargo with global reach.", img: airImg },
  { icon: Truck, title: "Road Transport", desc: "Reliable cross-border trucking and last-mile.", img: truckImg },
  { icon: Warehouse, title: "Warehousing", desc: "Smart storage, fulfilment and inventory ops.", img: warehouseImg },
];

const STATS = [
  { v: "220+", l: "Countries served" },
  { v: "1.8B", l: "Parcels yearly" },
  { v: "600+", l: "Sea ports" },
  { v: "99.4%", l: "On-time delivery" },
];

const TESTIMONIALS = [
  { name: "Marcus T.", role: "COO, NorthSupply Co.", text: "SwiftCargo cut our average transit time by 22%. Visibility is night and day." },
  { name: "Hana K.", role: "Logistics Lead, Aurora Goods", text: "From booking to delivery, every step is transparent. Our team finally sleeps." },
  { name: "Diego R.", role: "Founder, Vela Imports", text: "Customs clearance used to be a nightmare. Now it's just… handled." },
];

const PARTNERS = ["MAERSK", "DB Schenker", "Lufthansa Cargo", "CMA CGM", "FedEx", "UPS", "Hapag-Lloyd", "Kuehne+Nagel"];

function Home() {
  const [trackId, setTrackId] = useState("");
  const navigate = useNavigate();

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={heroImg} alt="Cargo ship at port" className="h-full w-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/70 to-ink/30" />
        </div>
        <div className="container mx-auto grid gap-10 px-4 py-24 text-white md:py-36 lg:grid-cols-2">
          <div className="animate-fade-up">
            <span className="inline-flex items-center rounded-full bg-brand px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-foreground">
              Global Logistics
            </span>
            <h1 className="mt-5 text-5xl font-bold leading-[1.05] md:text-7xl">
              Reliable Global <br />
              <span className="text-gradient-brand">Shipping & Cargo</span> Solutions
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/85">
              Move goods anywhere on the planet — by sea, air, road or rail. Real-time tracking, transparent pricing, and a team that actually picks up the phone.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/track">
                <Button size="lg" className="bg-brand text-brand-foreground hover:bg-brand/90">
                  <Search className="mr-2 h-4 w-4" /> Track Shipment
                </Button>
              </Link>
              <Link to="/book">
                <Button size="lg" variant="outline" className="border-white/40 bg-white/10 text-white backdrop-blur hover:bg-white/20">
                  Book Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="animate-fade-up lg:justify-self-end">
            <Card className="glass w-full max-w-md border-white/20 bg-white/10 text-white">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold">Track your shipment</h3>
                <p className="mt-1 text-sm text-white/70">Enter your SwiftCargo tracking number.</p>
                <form
                  className="mt-4 flex flex-col gap-3 sm:flex-row"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (trackId.trim()) navigate({ to: "/track", search: { id: trackId.trim() } as never });
                  }}
                >
                  <Input
                    placeholder="e.g. SC-784512903"
                    value={trackId}
                    onChange={(e) => setTrackId(e.target.value)}
                    className="border-white/30 bg-white/15 text-white placeholder:text-white/60"
                  />
                  <Button type="submit" className="bg-brand text-brand-foreground hover:bg-brand/90">Track</Button>
                </form>
                <p className="mt-3 text-xs text-white/60">Try SC-784512903 or SC-220088471</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* PARTNERS MARQUEE */}
      <section className="border-y bg-muted/40 py-6">
        <div className="overflow-hidden">
          <div className="flex w-max animate-marquee gap-14 px-4 text-sm font-semibold tracking-widest text-muted-foreground">
            {[...PARTNERS, ...PARTNERS].map((p, i) => (
              <span key={i}>{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-accent">What we move</span>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">End-to-end logistics, one partner</h2>
          </div>
          <Link to="/services" className="text-sm font-semibold text-brand-accent hover:underline">
            All services <ArrowRight className="ml-1 inline h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <Card key={s.title} className="group overflow-hidden hover-lift">
              <div className="relative h-44 overflow-hidden">
                <img src={s.img} alt={s.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                <div className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-md bg-brand text-brand-foreground">
                  <s.icon className="h-5 w-5" />
                </div>
              </div>
              <CardContent className="p-5">
                <h3 className="font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="bg-ink text-white">
        <div className="container mx-auto grid gap-8 px-4 py-16 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.l} className="text-center">
              <div className="text-4xl font-bold text-brand md:text-5xl">{s.v}</div>
              <div className="mt-2 text-sm uppercase tracking-wider text-white/70">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SPLIT FEATURE */}
      <section className="container mx-auto grid gap-10 px-4 py-20 lg:grid-cols-2 lg:items-center">
        <div className="relative overflow-hidden rounded-3xl">
          <img src={portImg} alt="Port terminal aerial" loading="lazy" className="h-full w-full object-cover" />
          <div className="absolute bottom-4 left-4 rounded-xl bg-brand p-4 text-brand-foreground shadow-elegant">
            <div className="text-2xl font-bold">99.4%</div>
            <div className="text-xs font-semibold uppercase">On-time</div>
          </div>
        </div>
        <div>
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-accent">Why SwiftCargo</span>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">Built for businesses that can't afford to wait</h2>
          <p className="mt-4 text-muted-foreground">
            Our network connects 220+ countries with predictable transit times and live milestone updates. We combine human expertise with smart automation, so your supply chain runs on signal — not noise.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              { i: Globe2, t: "Global network", d: "Coverage in 220+ countries." },
              { i: Clock, t: "On-time, every time", d: "99.4% milestone accuracy." },
              { i: ShieldCheck, t: "Cargo insured", d: "Full-value protection options." },
              { i: Truck, t: "Last-mile precision", d: "Door-to-door delivery." },
            ].map((f) => (
              <div key={f.t} className="flex gap-3 rounded-xl border bg-card p-4">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-accent text-brand-accent">
                  <f.i className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold">{f.t}</div>
                  <div className="text-sm text-muted-foreground">{f.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-muted/40 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-accent">Trusted worldwide</span>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">What shippers say</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <Card key={t.name} className="hover-lift">
                <CardContent className="p-6">
                  <div className="flex gap-1 text-brand">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-4 text-sm text-foreground/90">"{t.text}"</p>
                  <div className="mt-5 border-t pt-4">
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto grid gap-10 px-4 py-20 lg:grid-cols-2">
        <div>
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-accent">FAQ</span>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">Questions, answered</h2>
          <p className="mt-4 text-muted-foreground">
            Everything you need to know about shipping with SwiftCargo. Don't see your question? <Link to="/contact" className="text-brand-accent underline">Get in touch</Link>.
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {[
            { q: "How long does international delivery take?", a: "Express air shipments arrive in 1–3 business days. Ocean freight typically takes 18–35 days depending on lane." },
            { q: "Can I track my shipment in real time?", a: "Yes. Every shipment gets a SwiftCargo tracking ID with live milestone updates and ETAs." },
            { q: "Do you handle customs clearance?", a: "We manage end-to-end customs documentation, duties, and clearance in all major markets." },
            { q: "Is my cargo insured?", a: "Basic carrier liability is included. Full-value insurance can be added at booking." },
          ].map((item, i) => (
            <AccordionItem key={i} value={`i-${i}`}>
              <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
              <AccordionContent>{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-ink p-10 text-white md:p-16">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand/30 blur-3xl" />
          <div className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-brand-accent/30 blur-3xl" />
          <div className="relative">
            <h2 className="max-w-2xl text-3xl font-bold md:text-5xl">Ready to ship smarter?</h2>
            <p className="mt-4 max-w-xl text-white/80">Get an instant booking and we'll handle the rest — pickup, paperwork, customs and delivery.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/book"><Button size="lg" className="bg-brand text-brand-foreground hover:bg-brand/90">Book a shipment</Button></Link>
              <Link to="/contact"><Button size="lg" variant="outline" className="border-white/40 bg-white/10 text-white hover:bg-white/20">Talk to sales</Button></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
