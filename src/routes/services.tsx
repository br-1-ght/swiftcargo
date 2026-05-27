import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plane, Ship, Truck, Warehouse, Train, Package2, ArrowRight } from "lucide-react";
import airImg from "@/assets/air-freight.jpg";
import shipImg from "@/assets/ship.jpg";
import truckImg from "@/assets/truck.jpg";
import warehouseImg from "@/assets/warehouse.jpg";
import portImg from "@/assets/port.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Sea, Air, Road & Warehousing | SwiftCargo" },
      { name: "description", content: "Explore SwiftCargo's full range of logistics services: ocean freight, air cargo, road transport, rail, warehousing and parcel delivery." },
      { property: "og:title", content: "SwiftCargo Services" },
      { property: "og:description", content: "End-to-end logistics across every mode of transport." },
      { property: "og:image", content: airImg },
    ],
  }),
  component: Services,
});

const SERVICES = [
  { i: Ship, t: "Ocean Freight", d: "FCL and LCL services across all major trade lanes with weekly sailings.", img: shipImg },
  { i: Plane, t: "Air Cargo", d: "Express, priority and economy air freight via 350+ gateways.", img: airImg },
  { i: Truck, t: "Road Transport", d: "FTL, LTL and cross-border trucking across the Americas, EU and Asia.", img: truckImg },
  { i: Warehouse, t: "Warehousing & Fulfilment", d: "Bonded storage, pick-and-pack, returns and e-commerce fulfilment.", img: warehouseImg },
  { i: Train, t: "Rail Freight", d: "Trans-Eurasia rail services balancing cost and transit time.", img: portImg },
  { i: Package2, t: "Parcel & Express", d: "Door-to-door delivery with live tracking for time-critical parcels.", img: truckImg },
];

function Services() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Every mode. Every market. One partner."
        description="Whether you're shipping a pallet or a fleet, our services scale with your business — and stay just as reliable."
        image={airImg}
      />
      <section className="container mx-auto px-4 py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <Card key={s.t} className="group overflow-hidden hover-lift">
              <div className="relative h-48 overflow-hidden">
                <img src={s.img} alt={s.t} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
                <div className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-md bg-brand text-brand-foreground">
                  <s.i className="h-5 w-5" />
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold">{s.t}</h3>
                </div>
              </div>
              <CardContent className="p-5">
                <p className="text-sm text-muted-foreground">{s.d}</p>
                <Link to="/contact" className="mt-4 inline-flex items-center text-sm font-semibold text-brand-accent hover:underline">
                  Request a quote <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 pb-20">
        <div className="rounded-3xl bg-ink p-10 text-white md:p-14">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold md:text-4xl">Need a custom solution?</h2>
              <p className="mt-3 text-white/80">Our specialists design end-to-end logistics programs for industries from fashion to pharma.</p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link to="/book"><Button size="lg" className="bg-brand text-brand-foreground hover:bg-brand/90">Book a shipment</Button></Link>
              <Link to="/contact"><Button size="lg" variant="outline" className="border-white/40 bg-white/10 text-white hover:bg-white/20">Talk to an expert</Button></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
