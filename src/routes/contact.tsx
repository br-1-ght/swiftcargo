import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/site/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import warehouseImg from "@/assets/warehouse.jpg";

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  subject: z.string().trim().min(2).max(150),
  message: z.string().trim().min(10).max(2000),
});

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — SwiftCargo" },
      { name: "description", content: "Get in touch with the SwiftCargo team. Sales, support, partnerships and customs." },
      { property: "og:title", content: "Contact SwiftCargo" },
      { property: "og:description", content: "Talk to logistics experts." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Check your form");
      return;
    }
    toast.success("Message sent! We'll reply within one business day.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's move something together"
        description="Reach our 24/7 logistics specialists for quotes, support or partnership."
        image={warehouseImg}
      />
      <section className="container mx-auto grid gap-10 px-4 py-16 lg:grid-cols-[1fr_360px]">
        <Card>
          <CardContent className="p-6 md:p-8">
            <h2 className="text-xl font-bold">Send us a message</h2>
            <form onSubmit={submit} className="mt-6 grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label className="mb-1.5 block text-sm font-medium">Name</Label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={100} required />
                </div>
                <div>
                  <Label className="mb-1.5 block text-sm font-medium">Email</Label>
                  <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={255} required />
                </div>
              </div>
              <div>
                <Label className="mb-1.5 block text-sm font-medium">Subject</Label>
                <Input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} maxLength={150} required />
              </div>
              <div>
                <Label className="mb-1.5 block text-sm font-medium">Message</Label>
                <Textarea rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} maxLength={2000} required />
              </div>
              <Button type="submit" size="lg" className="w-full bg-brand text-brand-foreground hover:bg-brand/90 sm:w-fit">
                Send message
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {[
            { i: Phone, t: "Call us", v: "+1 (800) 555-0142", s: "Mon–Fri, 24/7 support" },
            { i: Mail, t: "Email", v: "hello@swiftcargo.com", s: "We reply within 24h" },
            { i: MapPin, t: "Headquarters", v: "120 Harbor Way, Singapore", s: "Plus 80+ global offices" },
          ].map((c) => (
            <Card key={c.t} className="hover-lift">
              <CardContent className="flex gap-4 p-5">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-brand text-brand-foreground">
                  <c.i className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold">{c.t}</div>
                  <div className="font-medium">{c.v}</div>
                  <div className="text-xs text-muted-foreground">{c.s}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
