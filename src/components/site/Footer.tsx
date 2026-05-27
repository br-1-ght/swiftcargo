import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import logoImg from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function Footer() {
  return (
    <footer className="mt-20 border-t bg-ink text-white dark:bg-card">
      <div className="container mx-auto grid gap-10 px-4 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-bold">
            <img src={logoImg} alt="SwiftCargo logo" width={36} height={36} loading="lazy" className="h-9 w-9 rounded-md object-contain" />
            <span className="text-lg">SwiftCargo</span>
          </div>
          <p className="mt-4 text-sm text-white/70">
            Reliable global shipping and cargo solutions across 220+ countries and territories.
          </p>
          <div className="mt-5 flex gap-3">
            {[Twitter, Facebook, Instagram, Linkedin].map((Icon, i) => (
              <a key={i} href="#" aria-label="social" className="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition hover:bg-brand hover:text-brand-foreground">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-brand">Company</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            <li><Link to="/about" className="hover:text-brand">About us</Link></li>
            <li><Link to="/services" className="hover:text-brand">Services</Link></li>
            <li><Link to="/contact" className="hover:text-brand">Contact</Link></li>
            <li><a href="#" className="hover:text-brand">Careers</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-brand">Support</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            <li><Link to="/track" className="hover:text-brand">Track shipment</Link></li>
            <li><Link to="/book" className="hover:text-brand">Book shipment</Link></li>
            <li><a href="#" className="hover:text-brand">Help center</a></li>
            <li><a href="#" className="hover:text-brand">Customs guide</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-brand">Newsletter</h4>
          <p className="mt-4 text-sm text-white/75">Logistics insights, delivered monthly.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Subscribed! Welcome aboard.");
              (e.currentTarget as HTMLFormElement).reset();
            }}
            className="mt-4 flex gap-2"
          >
            <Input
              type="email"
              required
              placeholder="your@email.com"
              className="border-white/20 bg-white/10 text-white placeholder:text-white/50"
            />
            <Button type="submit" className="bg-brand text-brand-foreground hover:bg-brand/90">Join</Button>
          </form>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-white/60 sm:flex-row">
          <p>© {new Date().getFullYear()} SwiftCargo Logistics. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-brand">Privacy</a>
            <a href="#" className="hover:text-brand">Terms</a>
            <a href="#" className="hover:text-brand">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
