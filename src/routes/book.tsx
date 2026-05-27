import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/site/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { CheckCircle2, CreditCard, Lock, Package, ShieldCheck, Sparkles } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { createShipment, type Shipment } from "@/lib/shipments";
import truckImg from "@/assets/truck.jpg";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book a Shipment — SwiftCargo" },
      { name: "description", content: "Book your shipment online in minutes. Get instant tracking and door-to-door delivery." },
      { property: "og:title", content: "Book a Shipment" },
      { property: "og:description", content: "Online booking with secure checkout." },
    ],
  }),
  component: Book,
});

const detailsSchema = z.object({
  customerName: z.string().trim().min(2, "Required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(6, "Required").max(30),
  origin: z.string().trim().min(3, "Required").max(200),
  destination: z.string().trim().min(3, "Required").max(200),
  weightKg: z.coerce.number().min(0.1).max(50000),
  type: z.string().min(2),
});

type DetailsInput = z.infer<typeof detailsSchema>;

const paymentSchema = z.object({
  holder: z.string().trim().min(2, "Required").max(100),
  number: z.string().regex(/^\d{4} \d{4} \d{4} \d{4}$/, "16-digit card number"),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "MM/YY"),
  cvv: z.string().regex(/^\d{3,4}$/, "3-4 digits"),
});

const DEMO_OTP = "123456";

function Book() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [details, setDetails] = useState<DetailsInput>({
    customerName: "",
    email: "",
    phone: "",
    origin: "",
    destination: "",
    weightKg: 1,
    type: "Express Air",
  });
  const [payment, setPayment] = useState({ holder: "", number: "", expiry: "", cvv: "" });
  const [otpOpen, setOtpOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [shipment, setShipment] = useState<Shipment | null>(null);

  const submitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = detailsSchema.safeParse(details);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Check your form");
      return;
    }
    setStep(2);
  };

  const submitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = paymentSchema.safeParse(payment);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Check card details");
      return;
    }
    setOtp("");
    setOtpError("");
    setOtpOpen(true);
  };

  const verifyOtp = () => {
    if (otp !== DEMO_OTP) {
      setOtpError("Invalid code. Hint: 123456");
      return;
    }
    setOtpOpen(false);
    const created = createShipment(details);
    setShipment(created);
    setStep(3);
    toast.success("Payment verified — shipment booked!");
  };

  const formatCard = (v: string) =>
    v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
  const formatExpiry = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    if (d.length <= 2) return d;
    return `${d.slice(0, 2)}/${d.slice(2)}`;
  };

  return (
    <>
      <PageHero
        eyebrow="Book"
        title="Ship in minutes"
        description="Tell us about your shipment, pay securely, and get a tracking number instantly."
        image={truckImg}
      />

      <section className="container mx-auto px-4 py-16">
        {/* Stepper */}
        <div className="mx-auto mb-10 flex max-w-3xl items-center justify-between">
          {[
            { n: 1, t: "Shipment" },
            { n: 2, t: "Payment" },
            { n: 3, t: "Confirmation" },
          ].map((s, i) => (
            <div key={s.n} className="flex flex-1 items-center">
              <div className="flex items-center gap-3">
                <div
                  className={`grid h-10 w-10 place-items-center rounded-full text-sm font-bold transition ${
                    step >= (s.n as 1 | 2 | 3)
                      ? "bg-brand text-brand-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step > s.n ? <CheckCircle2 className="h-5 w-5" /> : s.n}
                </div>
                <span className={`hidden text-sm font-semibold sm:inline ${step >= s.n ? "" : "text-muted-foreground"}`}>{s.t}</span>
              </div>
              {i < 2 && <div className={`mx-3 h-0.5 flex-1 ${step > s.n ? "bg-brand" : "bg-border"}`} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <Card className="mx-auto max-w-3xl animate-fade-up">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-xl font-bold">Shipment details</h2>
              <p className="text-sm text-muted-foreground">Tell us what you're shipping and where.</p>
              <form onSubmit={submitDetails} className="mt-6 grid gap-4 sm:grid-cols-2">
                <Field label="Full name">
                  <Input value={details.customerName} onChange={(e) => setDetails({ ...details, customerName: e.target.value })} maxLength={100} required />
                </Field>
                <Field label="Email">
                  <Input type="email" value={details.email} onChange={(e) => setDetails({ ...details, email: e.target.value })} maxLength={255} required />
                </Field>
                <Field label="Phone">
                  <Input value={details.phone} onChange={(e) => setDetails({ ...details, phone: e.target.value })} maxLength={30} required />
                </Field>
                <Field label="Shipment type">
                  <Select value={details.type} onValueChange={(v) => setDetails({ ...details, type: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["Express Air", "Air Freight", "Sea Freight", "Road Transport", "Rail Freight"].map((t) => (
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Pickup address" full>
                  <Textarea rows={2} value={details.origin} onChange={(e) => setDetails({ ...details, origin: e.target.value })} maxLength={200} required />
                </Field>
                <Field label="Destination address" full>
                  <Textarea rows={2} value={details.destination} onChange={(e) => setDetails({ ...details, destination: e.target.value })} maxLength={200} required />
                </Field>
                <Field label="Package weight (kg)">
                  <Input type="number" step="0.1" min="0.1" max="50000" value={details.weightKg} onChange={(e) => setDetails({ ...details, weightKg: Number(e.target.value) })} required />
                </Field>
                <div className="sm:col-span-2 mt-2 flex justify-end">
                  <Button type="submit" size="lg" className="bg-brand text-brand-foreground hover:bg-brand/90">Continue to payment</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <div className="mx-auto grid max-w-4xl gap-6 lg:grid-cols-[1fr_320px]">
            <Card className="animate-fade-up">
              <CardContent className="p-6 md:p-8">
                <h2 className="flex items-center gap-2 text-xl font-bold"><Lock className="h-5 w-5" /> Payment</h2>
                <p className="text-sm text-muted-foreground">
                  Secure checkout — your card details are encrypted and never stored.
                </p>
                <form onSubmit={submitPayment} className="mt-6 grid gap-4">
                  <Field label="Card holder name">
                    <Input value={payment.holder} onChange={(e) => setPayment({ ...payment, holder: e.target.value })} maxLength={100} required />
                  </Field>
                  <Field label="Card number">
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        className="pl-10 font-mono tracking-wider"
                        placeholder="4242 4242 4242 4242"
                        value={payment.number}
                        onChange={(e) => setPayment({ ...payment, number: formatCard(e.target.value) })}
                        required
                      />
                    </div>
                  </Field>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Expiry (MM/YY)">
                      <Input placeholder="12/29" value={payment.expiry} onChange={(e) => setPayment({ ...payment, expiry: formatExpiry(e.target.value) })} maxLength={5} required />
                    </Field>
                    <Field label="CVV">
                      <Input placeholder="123" value={payment.cvv} onChange={(e) => setPayment({ ...payment, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) })} required />
                    </Field>
                  </div>
                  <div className="mt-2 flex flex-col-reverse justify-between gap-3 sm:flex-row">
                    <Button type="button" variant="outline" onClick={() => setStep(1)}>Back</Button>
                    <Button type="submit" size="lg" className="bg-brand text-brand-foreground hover:bg-brand/90">Proceed</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
            <Card className="h-fit">
              <CardContent className="p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Order summary</h3>
                <div className="mt-4 space-y-3 text-sm">
                  <SummaryRow l="Service" v={details.type} />
                  <SummaryRow l="Weight" v={`${details.weightKg} kg`} />
                  <SummaryRow l="From" v={details.origin.slice(0, 24) + (details.origin.length > 24 ? "…" : "")} />
                  <SummaryRow l="To" v={details.destination.slice(0, 24) + (details.destination.length > 24 ? "…" : "")} />
                </div>
                <div className="my-4 border-t" />
                <SummaryRow l="Subtotal" v="$84.00" />
                <SummaryRow l="Fuel surcharge" v="$6.40" />
                <SummaryRow l="Insurance" v="$3.50" />
                <div className="mt-4 flex justify-between text-base font-bold">
                  <span>Total</span>
                  <span>$93.90</span>
                </div>
                <div className="mt-5 flex items-center gap-2 rounded-lg bg-accent p-3 text-xs text-accent-foreground">
                  <ShieldCheck className="h-4 w-4 text-brand-accent" />
                  Secured checkout
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 3 && shipment && (
          <Card className="mx-auto max-w-2xl overflow-hidden animate-fade-up">
            <div className="relative bg-gradient-to-br from-brand to-yellow-300 p-10 text-center text-brand-foreground">
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, white 0%, transparent 40%), radial-gradient(circle at 80% 80%, white 0%, transparent 40%)" }} />
              <div className="relative">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand-foreground text-brand">
                  <CheckCircle2 className="h-9 w-9" />
                </div>
                <h2 className="mt-4 text-3xl font-bold">Booking confirmed!</h2>
                <p className="mt-2 opacity-90">Your shipment is being prepared for pickup.</p>
              </div>
            </div>
            <CardContent className="p-6 md:p-8">
              <div className="rounded-xl border bg-muted/30 p-5 text-center">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tracking Number</div>
                <div className="mt-1 font-mono text-2xl font-bold">{shipment.trackingId}</div>
              </div>
              <div className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
                <SummaryRow l="Customer" v={shipment.customerName} />
                <SummaryRow l="Service" v={shipment.type} />
                <SummaryRow l="From" v={shipment.origin} />
                <SummaryRow l="To" v={shipment.destination} />
                <SummaryRow l="Weight" v={`${shipment.weightKg} kg`} />
                <SummaryRow l="ETA" v={new Date(shipment.estimatedDelivery).toLocaleDateString()} />
              </div>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link to="/track" search={{ id: shipment.trackingId } as never}>
                  <Button className="bg-brand text-brand-foreground hover:bg-brand/90"><Package className="mr-2 h-4 w-4" />Track shipment</Button>
                </Link>
                <Button variant="outline" onClick={() => { setStep(1); setShipment(null); setPayment({ holder: "", number: "", expiry: "", cvv: "" }); }}>
                  Book another
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </section>

      {/* OTP Dialog */}
      <Dialog open={otpOpen} onOpenChange={setOtpOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><Sparkles className="h-5 w-5 text-brand-accent" /> Verify payment</DialogTitle>
            <DialogDescription>
              We sent a 6-digit code to your phone. Use <span className="font-mono font-bold">123456</span> to verify.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-4">
            <InputOTP maxLength={6} value={otp} onChange={(v) => { setOtp(v); setOtpError(""); }}>
              <InputOTPGroup>
                {Array.from({ length: 6 }).map((_, i) => (
                  <InputOTPSlot key={i} index={i} />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>
          {otpError && <p className="text-center text-sm text-destructive">{otpError}</p>}
          <Button onClick={verifyOtp} disabled={otp.length < 6} className="bg-brand text-brand-foreground hover:bg-brand/90">
            Verify & confirm
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <Label className="mb-1.5 block text-sm font-medium">{label}</Label>
      {children}
    </div>
  );
}

function SummaryRow({ l, v }: { l: string; v: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground">{l}</span>
      <span className="font-medium">{v}</span>
    </div>
  );
}
