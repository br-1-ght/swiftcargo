import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Globe2, HeartHandshake, Leaf } from "lucide-react";
import portImg from "@/assets/port.jpg";
import warehouseImg from "@/assets/warehouse.jpg";
import shipImg from "@/assets/ship.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About SwiftCargo — Our story & mission" },
      { name: "description", content: "Learn about SwiftCargo's global logistics network, our mission, and the team behind the world's most reliable cargo service." },
      { property: "og:title", content: "About SwiftCargo" },
      { property: "og:description", content: "Connecting businesses across 220+ countries with reliable cargo solutions." },
      { property: "og:image", content: portImg },
    ],
  }),
  component: About,
});

const VALUES = [
  { i: Globe2, t: "Global reach, local touch", d: "Boots-on-the-ground teams in every major market." },
  { i: HeartHandshake, t: "Customer-obsessed", d: "We measure success by your on-time delivery rate." },
  { i: Leaf, t: "Sustainable logistics", d: "Carbon-neutral options on every lane by 2030." },
  { i: Award, t: "Award-winning service", d: "Recognized for excellence by industry leaders." },
];

function About() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Connecting the world, one shipment at a time"
        description="For over two decades, SwiftCargo has powered global trade for businesses of every size — from indie sellers to Fortune 500."
        image={portImg}
      />

      <section className="container mx-auto grid gap-12 px-4 py-20 lg:grid-cols-2 lg:items-center">
        <img src={warehouseImg} alt="Modern warehouse" loading="lazy" className="rounded-3xl object-cover shadow-elegant" />
        <div>
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-accent">Our mission</span>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">Make global shipping feel effortless</h2>
          <p className="mt-4 text-muted-foreground">
            We started in 2001 with a single truck and a stubborn idea: logistics should be transparent, predictable, and humane. Today, we operate one of the largest private logistics networks in the world — but the idea hasn't changed.
          </p>
          <p className="mt-4 text-muted-foreground">
            From port to porch, every shipment is handled with the same care, whether it's a single parcel or a 40-foot container.
          </p>
        </div>
      </section>

      <section className="bg-muted/40 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-accent">What we stand for</span>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">Our values</h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <Card key={v.t} className="hover-lift">
                <CardContent className="p-6">
                  <div className="grid h-11 w-11 place-items-center rounded-md bg-brand text-brand-foreground">
                    <v.i className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-semibold">{v.t}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{v.d}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto grid gap-10 px-4 py-20 lg:grid-cols-2">
        <div className="relative overflow-hidden rounded-3xl">
          <img src={shipImg} alt="Container ship" loading="lazy" className="h-full w-full object-cover" />
        </div>
        <div className="grid grid-cols-2 gap-6">
          {[
            { v: "2001", l: "Founded" },
            { v: "12k+", l: "Team members" },
            { v: "220+", l: "Countries" },
            { v: "1.8B", l: "Parcels yearly" },
          ].map((s) => (
            <div key={s.l} className="rounded-2xl border bg-card p-6">
              <div className="text-3xl font-bold text-brand-accent">{s.v}</div>
              <div className="mt-1 text-sm uppercase tracking-wider text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
