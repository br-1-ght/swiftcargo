import { useEffect, useState } from "react";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const KEY = "swiftcargo.cookies";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(KEY)) {
      const t = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  const decide = (choice: "accepted" | "declined") => {
    localStorage.setItem(KEY, choice);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 animate-fade-up">
      <div className="glass mx-auto flex max-w-5xl flex-col items-start gap-4 rounded-2xl p-5 shadow-elegant sm:flex-row sm:items-center">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand text-brand-foreground">
          <Cookie className="h-5 w-5" />
        </div>
        <div className="flex-1 text-sm">
          <p className="font-semibold">We use cookies</p>
          <p className="text-muted-foreground">
            We use cookies to improve your browsing experience, analyze site traffic, and personalize content. You can accept or decline below.
          </p>
        </div>
        <div className="flex w-full gap-2 sm:w-auto">
          <Button variant="outline" onClick={() => decide("declined")} className="flex-1 sm:flex-none">
            Decline
          </Button>
          <Button onClick={() => decide("accepted")} className="flex-1 bg-brand text-brand-foreground hover:bg-brand/90 sm:flex-none">
            Accept all
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setVisible(false)} aria-label="Close">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
