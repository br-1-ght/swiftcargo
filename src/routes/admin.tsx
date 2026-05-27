import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { advanceStatus, createShipment, listShipments, STATUS_FLOW, type Shipment, type ShipmentStatus } from "@/lib/shipments";
import { toast } from "sonner";
import { LayoutDashboard, Package, PackagePlus, Users } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — SwiftCargo" },
      { name: "description", content: "Internal admin dashboard for shipments, customers and tracking statuses." },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: Admin,
});

function Admin() {
  const [items, setItems] = useState<Shipment[]>([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [edit, setEdit] = useState<Shipment | null>(null);

  const refresh = () => setItems(listShipments());
  useEffect(() => { refresh(); }, []);

  const customers = Array.from(
    new Map(items.map((i) => [i.email, { name: i.customerName, email: i.email, phone: i.phone, count: 0 }])).values()
  ).map((c) => ({ ...c, count: items.filter((i) => i.email === c.email).length }));

  const stats = [
    { l: "Total shipments", v: items.length, i: Package },
    { l: "In transit", v: items.filter((i) => i.status === "In Transit").length, i: LayoutDashboard },
    { l: "Delivered", v: items.filter((i) => i.status === "Delivered").length, i: Package },
    { l: "Customers", v: customers.length, i: Users },
  ];

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-accent">Admin</span>
          <h1 className="mt-1 text-3xl font-bold md:text-4xl">Operations dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage shipments, customers and tracking updates.</p>
        </div>
        <Button onClick={() => setOpenCreate(true)} className="bg-brand text-brand-foreground hover:bg-brand/90">
          <PackagePlus className="mr-2 h-4 w-4" /> New shipment
        </Button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.l} className="hover-lift">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="grid h-11 w-11 place-items-center rounded-md bg-brand text-brand-foreground">
                <s.i className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
                <div className="text-2xl font-bold">{s.v}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="shipments" className="mt-8">
        <TabsList>
          <TabsTrigger value="shipments">Shipments</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
        </TabsList>
        <TabsContent value="shipments">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tracking ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Route</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.length === 0 && (
                      <TableRow><TableCell colSpan={6} className="py-8 text-center text-muted-foreground">No shipments yet.</TableCell></TableRow>
                    )}
                    {items.map((s) => (
                      <TableRow key={s.trackingId}>
                        <TableCell className="font-mono text-xs font-semibold">{s.trackingId}</TableCell>
                        <TableCell>{s.customerName}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {s.origin.slice(0, 20)} → {s.destination.slice(0, 20)}
                        </TableCell>
                        <TableCell className="text-sm">{s.type}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-accent-foreground">
                            {s.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" variant="outline" onClick={() => setEdit(s)}>Update status</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="customers">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead className="text-right">Shipments</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customers.length === 0 && (
                      <TableRow><TableCell colSpan={4} className="py-8 text-center text-muted-foreground">No customers yet.</TableCell></TableRow>
                    )}
                    {customers.map((c) => (
                      <TableRow key={c.email}>
                        <TableCell className="font-medium">{c.name}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{c.email}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{c.phone}</TableCell>
                        <TableCell className="text-right font-semibold">{c.count}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <CreateDialog open={openCreate} onOpenChange={setOpenCreate} onCreated={refresh} />
      <UpdateDialog shipment={edit} onClose={() => setEdit(null)} onUpdated={refresh} />
    </section>
  );
}

function CreateDialog({ open, onOpenChange, onCreated }: { open: boolean; onOpenChange: (v: boolean) => void; onCreated: () => void }) {
  const [f, setF] = useState({
    customerName: "", email: "", phone: "", origin: "", destination: "", weightKg: 1, type: "Express Air",
  });
  const submit = () => {
    if (!f.customerName || !f.email || !f.origin || !f.destination) {
      toast.error("Fill in all required fields");
      return;
    }
    const s = createShipment(f);
    toast.success(`Shipment ${s.trackingId} created`);
    onOpenChange(false);
    setF({ customerName: "", email: "", phone: "", origin: "", destination: "", weightKg: 1, type: "Express Air" });
    onCreated();
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>New shipment</DialogTitle>
          <DialogDescription>Generate a tracking ID and add to operations queue.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Customer name"><Input value={f.customerName} onChange={(e) => setF({ ...f, customerName: e.target.value })} /></Field>
          <Field label="Email"><Input type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></Field>
          <Field label="Phone"><Input value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} /></Field>
          <Field label="Type">
            <Select value={f.type} onValueChange={(v) => setF({ ...f, type: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {["Express Air", "Air Freight", "Sea Freight", "Road Transport", "Rail Freight"].map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Origin" full><Input value={f.origin} onChange={(e) => setF({ ...f, origin: e.target.value })} /></Field>
          <Field label="Destination" full><Input value={f.destination} onChange={(e) => setF({ ...f, destination: e.target.value })} /></Field>
          <Field label="Weight (kg)"><Input type="number" value={f.weightKg} onChange={(e) => setF({ ...f, weightKg: Number(e.target.value) })} /></Field>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={submit} className="bg-brand text-brand-foreground hover:bg-brand/90">Create & generate tracking ID</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function UpdateDialog({ shipment, onClose, onUpdated }: { shipment: Shipment | null; onClose: () => void; onUpdated: () => void }) {
  const [status, setStatus] = useState<ShipmentStatus>("Processing");
  const [location, setLocation] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  useEffect(() => {
    if (shipment) {
      setStatus(shipment.status);
      setLocation("");
      setOrigin(shipment.origin);
      setDestination(shipment.destination);
    }
  }, [shipment]);
  if (!shipment) return null;
  const save = () => {
    if (!origin.trim() || !destination.trim()) {
      toast.error("Origin and destination are required");
      return;
    }
    advanceStatus(shipment.trackingId, status, {
      location: location.trim(),
      origin: origin.trim(),
      destination: destination.trim(),
    });
    toast.success(`Updated to ${status}`);
    onUpdated();
    onClose();
  };
  return (
    <Dialog open={!!shipment} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update tracking status</DialogTitle>
          <DialogDescription className="font-mono text-xs">{shipment.trackingId}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-3">
          <Field label="Status">
            <Select value={status} onValueChange={(v) => setStatus(v as ShipmentStatus)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {STATUS_FLOW.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Current location (timeline entry)">
            <Input placeholder="e.g. Frankfurt Hub" value={location} onChange={(e) => setLocation(e.target.value)} />
          </Field>
          <Field label="Origin">
            <Input value={origin} onChange={(e) => setOrigin(e.target.value)} />
          </Field>
          <Field label="Destination">
            <Input value={destination} onChange={(e) => setDestination(e.target.value)} />
          </Field>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={save} className="bg-brand text-brand-foreground hover:bg-brand/90">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <Label className="mb-1.5 block text-sm">{label}</Label>
      {children}
    </div>
  );
}
