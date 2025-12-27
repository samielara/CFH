import { useMemo, useState } from "react";
import { Mail, MapPin, Phone, Send, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

import contactHeroImg from "@/assets/services/fire-extinguisher-maintenance.png";

type Localized<T> = { en: T; fr: T };

export default function ContactPage() {
  const { language } = useLanguage();
  const isFr = language === "fr";

  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // From legacy contact page
  const contact = useMemo(
    () => ({
      phone: "(514) 333-3389",
      email: "cfhsecurite@cfhsecurite.com",
      hq: {
        title: { en: "Head Office", fr: "Siège social" } as Localized<string>,
        lines: ["1455, Boul. Pitfield", "Ville St-Laurent (Québec)", "H4S 1G3"],
      },
      branch: {
        title: { en: "Branch Office", fr: "Succursale" } as Localized<string>,
        lines: ["647, rue Roger", "Valleyfield (Québec)", "J6S 0A7"],
      },
      hours: [
        { label: { en: "Monday", fr: "Lundi" }, value: "7h – 16h00" },
        { label: { en: "Tuesday", fr: "Mardi" }, value: "7h – 16h00" },
        { label: { en: "Wednesday", fr: "Mercredi" }, value: "7h – 16h00" },
        { label: { en: "Thursday", fr: "Jeudi" }, value: "7h – 16h00" },
        { label: { en: "Friday", fr: "Vendredi" }, value: "7h – 13h00" },
        { label: { en: "Saturday & Sunday", fr: "Samedi & Dimanche" }, value: isFr ? "Fermé" : "Closed" },
      ],
    }),
    [isFr]
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Hook this into your existing email/CRM endpoint when ready.
    // For now, keep UI consistent and safe.
    await new Promise((r) => setTimeout(r, 600));

    setIsSubmitting(false);
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-[hsl(222_47%_6%)] text-foreground">
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-40">
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full blur-3xl bg-[hsl(var(--cfh-blue))]/25" />
        <div className="absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full blur-3xl bg-[hsl(var(--cfh-red))]/25" />
      </div>

      <main>
        {/* HERO */}
        <section className="relative min-h-[70vh] overflow-hidden">
          <div className="absolute inset-0">
            <img src={contactHeroImg} alt="Contact" className="w-full h-full object-cover" />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, hsl(222 47% 6% / 0.70) 0%, hsl(222 47% 6% / 0.78) 45%, hsl(222 47% 6% / 0.92) 100%)",
              }}
            />
          </div>

          <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-44 md:pt-52">
            <div className="mx-auto max-w-5xl text-center">
              <h1 className="font-display font-bold tracking-tight leading-[1.05] text-[clamp(2.3rem,4.6vw,4.25rem)]">
                {isFr ? "Nous joindre" : "Contact"}
              </h1>
              <p className="mt-5 text-lg md:text-xl text-muted-foreground leading-relaxed">
                {isFr
                  ? "Décrivez votre besoin et nous vous répondrons rapidement avec une solution claire."
                  : "Tell us what you need—we’ll respond quickly with a clear, compliant solution."}
              </p>

              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <Button asChild variant="secondary" className="btn-cfh">
                  <a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`} className="inline-flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    {contact.phone}
                  </a>
                </Button>
                <Button asChild variant="secondary" className="btn-cfh">
                  <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {contact.email}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CONTENT */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left: contact cards */}
              <div className="lg:col-span-5 space-y-6">
                <Card
                  className={cn(
                    "rounded-[1.75rem] border border-white/10 bg-white/5 backdrop-blur-xl",
                    "shadow-[0_30px_90px_rgba(0,0,0,0.30)]"
                  )}
                >
                  <CardContent className="p-8 space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="mt-1 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-black/25 border border-white/10">
                        <MapPin className="h-5 w-5 text-[hsl(var(--cfh-blue))]" />
                      </div>
                      <div>
                        <h3 className="font-display text-xl font-semibold">{isFr ? contact.hq.title.fr : contact.hq.title.en}</h3>
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                          {contact.hq.lines.map((l) => (
                            <span key={l} className="block">
                              {l}
                            </span>
                          ))}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="mt-1 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-black/25 border border-white/10">
                        <MapPin className="h-5 w-5 text-[hsl(var(--cfh-red))]" />
                      </div>
                      <div>
                        <h3 className="font-display text-xl font-semibold">
                          {isFr ? contact.branch.title.fr : contact.branch.title.en}
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                          {contact.branch.lines.map((l) => (
                            <span key={l} className="block">
                              {l}
                            </span>
                          ))}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="mt-1 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-black/25 border border-white/10">
                        <Clock className="h-5 w-5 text-[hsl(var(--cfh-blue))]" />
                      </div>
                      <div className="w-full">
                        <h3 className="font-display text-xl font-semibold">
                          {isFr ? "Heures d’ouverture" : "Business Hours"}
                        </h3>

                        <div className="mt-3 space-y-2">
                          {contact.hours.map((h) => (
                            <div key={isFr ? h.label.fr : h.label.en} className="flex justify-between gap-4 text-sm">
                              <span className="text-foreground/80">{isFr ? h.label.fr : h.label.en}</span>
                              <span className="text-muted-foreground">{h.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="rounded-[1.75rem] border border-white/10 bg-white/5 backdrop-blur-xl p-8 text-center shadow-[0_30px_90px_rgba(0,0,0,0.30)]">
                  <h3 className="font-display font-semibold text-2xl">
                    {isFr ? "Besoin d’un service rapide?" : "Need fast service?"}
                  </h3>
                  <p className="mt-3 text-muted-foreground">
                    {isFr
                      ? "Appelez-nous et nous vous orienterons rapidement vers la bonne équipe."
                      : "Call us and we’ll route you to the right team quickly."}
                  </p>
                  <div className="mt-6 flex justify-center">
                    <Button
                      asChild
                      className={cn(
                        "group bg-transparent text-[hsl(var(--cfh-red))] border border-[hsl(var(--cfh-red))]",
                        "font-semibold px-10 py-6 text-lg transition-colors",
                        "hover:bg-[hsl(var(--cfh-red))] hover:text-primary-foreground hover:border-transparent"
                      )}
                    >
                      <a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`} className="inline-flex items-center gap-2">
                        {isFr ? "Appeler maintenant" : "Call now"}
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Right: form */}
              <div className="lg:col-span-7">
                <Card
                  className={cn(
                    "rounded-[2.25rem] border border-white/10 bg-white/5 backdrop-blur-xl",
                    "shadow-[0_30px_90px_rgba(0,0,0,0.30)]"
                  )}
                >
                  <CardContent className="p-8 md:p-10">
                    <h2 className="font-display font-bold tracking-tight text-3xl md:text-4xl">
                      {isFr ? "Formulaire" : "Message Us"}
                    </h2>
                    <p className="mt-4 text-muted-foreground">
                      {isFr
                        ? "Partagez les détails (type de bâtiment, équipement, délais). Nous reviendrons vers vous rapidement."
                        : "Share details (site type, equipment, timeline). We’ll get back to you quickly."}
                    </p>

                    <form onSubmit={onSubmit} className="mt-8 space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          value={form.name}
                          onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                          placeholder={isFr ? "Nom *" : "Name *"}
                          required
                          className="h-12 bg-black/20 border-white/10"
                        />
                        <Input
                          value={form.email}
                          onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                          placeholder={isFr ? "E-mail *" : "Email *"}
                          type="email"
                          required
                          className="h-12 bg-black/20 border-white/10"
                        />
                      </div>

                      <Input
                        value={form.phone}
                        onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
                        placeholder={isFr ? "Téléphone" : "Phone"}
                        className="h-12 bg-black/20 border-white/10"
                      />

                      <Textarea
                        value={form.message}
                        onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
                        placeholder={isFr ? "Message *" : "Message *"}
                        required
                        className="min-h-[160px] bg-black/20 border-white/10"
                      />

                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className={cn(
                            "group flex-1 bg-transparent text-[hsl(var(--cfh-blue))] border border-[hsl(var(--cfh-blue))]",
                            "font-semibold py-6 text-lg transition-colors",
                            "hover:bg-[hsl(var(--cfh-blue))] hover:text-white hover:border-transparent"
                          )}
                        >
                          <span className="inline-flex items-center justify-center gap-2">
                            <Send className="h-5 w-5" />
                            {isSubmitting ? (isFr ? "Envoi..." : "Sending...") : isFr ? "Envoyer" : "Send"}
                          </span>
                        </Button>

                        <Button asChild variant="secondary" className="btn-cfh py-6 text-lg">
                          <Link to="/products">{isFr ? "Voir les produits" : "Browse Products"}</Link>
                        </Button>
                      </div>
                    </form>

                    <p className="mt-6 text-xs text-muted-foreground">
                      {isFr
                        ? "Note: ce formulaire peut être relié à votre endpoint de courriel/CRM. La UI est prête; branchement backend au besoin."
                        : "Note: this form can be wired to your email/CRM endpoint. UI is ready; backend hookup as needed."}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
