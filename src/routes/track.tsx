import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHero } from "@/components/site/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Clock, MapPin, Package, Search, Truck } from "lucide-react";
import { STATUS_FLOW, getShipment, progressPercent, type Shipment } from "@/lib/shipments";
import portImg from "@/assets/port.jpg";
import { z } from "zod";

const search = z.object({ id: z.string().optional() });

export const Route = createFileRoute("/track")({
  validateSearch: search,
  head: () => ({
    meta: [
      { title: "Track Shipment — SwiftCargo" },
      { name: "description", content: "Track your SwiftCargo shipment in real time. Enter your tracking number for live milestones and ETA." },
      { property: "og:title", content: "Track Shipment — SwiftCargo" },
      { property: "og:description", content: "Live shipment tracking across the SwiftCargo network." },
    ],
  }),
  component: Track,
});

function Track() {
  const { id } = Route.useSearch();
  const [value, setValue] = useState(id ?? "");
  const [shipment, setShipment] = useState<Shipment | undefined>();
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (id) {
      setValue(id);
      setShipment(getShipment(id));
      setSearched(true);
    }
  }, [id]);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setShipment(getShipment(value));
    setSearched(true);
  };

  return (
    <>
      <PageHero
        eyebrow="Tracking"
        title="Where is your shipment?"
        description="Enter your SwiftCargo tracking number to see live milestones, location and ETA."
        image={portImg}
      />
      <section className="container mx-auto px-4 py-16">
        <Card className="mx-auto max-w-3xl">
          <CardContent className="p-6">
            <form onSubmit={onSearch} className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="e.g. SC-784512903"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button type="submit" className="bg-brand text-brand-foreground hover:bg-brand/90">
                Track
              </Button>
            </form>
            <p className="mt-3 text-xs text-muted-foreground">
              Sample tracking IDs: <span className="font-mono">SC-784512903</span>, <span className="font-mono">SC-220088471</span>
            </p>
          </CardContent>
        </Card>

        {searched && !shipment && (
          <Card className="mx-auto mt-6 max-w-3xl border-destructive/30">
            <CardContent className="p-6 text-center">
              <p className="font-semibold">No shipment found</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Double-check the tracking number or contact support.
              </p>
            </CardContent>
          </Card>
        )}

        {shipment && (
          <div className="mx-auto mt-8 max-w-3xl space-y-6 animate-fade-up">
            {/* Summary */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tracking ID</div>
                    <div className="font-mono text-lg font-bold">{shipment.trackingId}</div>
                  </div>
                  <span className="rounded-full bg-brand px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-foreground">
                    {shipment.status}
                  </span>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <Field icon={MapPin} label="Origin" value={shipment.origin} />
                  <Field icon={Truck} label="Destination" value={shipment.destination} />
                  <Field icon={Clock} label="ETA" value={new Date(shipment.estimatedDelivery).toLocaleDateString()} />
                  <Field icon={Package} label="Type" value={shipment.type} />
                  <Field icon={Package} label="Weight" value={`${shipment.weightKg} kg`} />
                  <Field icon={Package} label="Customer" value={shipment.customerName} />
                </div>
                <div className="mt-6">
                  <div className="mb-2 flex justify-between text-xs font-medium text-muted-foreground">
                    <span>Progress</span>
                    <span>{progressPercent(shipment.status)}%</span>
                  </div>
                  <Progress value={progressPercent(shipment.status)} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold">Shipment timeline</h3>
                <ol className="mt-6 space-y-5">
                  {STATUS_FLOW.map((step, i) => {
                    const reachedIdx = STATUS_FLOW.indexOf(shipment.status);
                    const reached = i <= reachedIdx;
                    const current = i === reachedIdx;
                    const ev = shipment.history.find((h) => h.status === step);
                    return (
                      <li key={step} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div
                            className={`grid h-9 w-9 place-items-center rounded-full border-2 transition ${
                              reached
                                ? "border-brand bg-brand text-brand-foreground"
                                : "border-border bg-card text-muted-foreground"
                            } ${current ? "ring-4 ring-brand/30" : ""}`}
                          >
                            {reached ? <CheckCircle2 className="h-4 w-4" /> : <span className="text-xs font-bold">{i + 1}</span>}
                          </div>
                          {i < STATUS_FLOW.length - 1 && (
                            <div className={`mt-1 h-12 w-0.5 ${i < reachedIdx ? "bg-brand" : "bg-border"}`} />
                          )}
                        </div>
                        <div className="pb-6">
                          <div className={`font-semibold ${reached ? "text-foreground" : "text-muted-foreground"}`}>{step}</div>
                          {ev ? (
                            <div className="mt-1 text-sm text-muted-foreground">
                              {new Date(ev.at).toLocaleString()} · {ev.location}
                            </div>
                          ) : (
                            <div className="mt-1 text-sm text-muted-foreground">Pending</div>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </CardContent>
            </Card>
          </div>
        )}
      </section>
    </>
  );
}

function Field({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border bg-muted/30 p-3">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-accent text-brand-accent">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="font-medium">{value}</div>
      </div>
    </div>
  );
}
