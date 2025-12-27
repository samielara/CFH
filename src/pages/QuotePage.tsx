import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, Building2, CheckCircle2, Mail, MapPin, Phone, Send } from "lucide-react";

import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

import heroImg from "@/assets/services/fire-extinguisher-maintenance.png";

type QuoteBuildingType = "Commercial" | "Industriel" | "Institutionel";
type QuoteOwner = "Oui" | "Non";

type QuoteFormState = {
  companyName: string;
  responsibleName: string;
  buildingAddress: string;
  postalCode: string;
  city: string;
  email: string;
  phone: string;

  buildingType?: QuoteBuildingType;
  isOwner?: QuoteOwner;

  unitsOrSqft: string;
  floors: string;

  categories: string[];
  workTypes: string[];

  notes: string;
};

const encodeMailto = (value: string) => encodeURIComponent(value).replace(/%20/g, "+");

export default function QuotePage() {
  const { language } = useLanguage();
  const isFr = language === "fr";
  const [searchParams] = useSearchParams();

  const contact = useMemo(
    () => ({
      phoneLabel: "(514) 333-3389",
      phoneTel: "5143333389",
      email: "cfhsecurite@cfhsecurite.com",
      hqLines: ["1455, Boul. Pitfield", "Ville St-Laurent (Québec)", "H4S 1G3"],
      branchLines: ["647, rue Roger", "Valleyfield (Québec)", "J6S 0A7"],
    }),
    []
  );

  // Legacy options (mirrored)
  const buildingTypeOptions = useMemo<QuoteBuildingType[]>(
    () => ["Commercial", "Industriel", "Institutionel"],
    []
  );

  const categoryOptions = useMemo(
    () => [
      { key: "Alarme incendie", en: "Fire alarm", fr: "Alarme incendie" },
      { key: "Gicleur", en: "Sprinkler", fr: "Gicleur" },
      { key: "Extincteur portatif", en: "Portable extinguisher", fr: "Extincteur portatif" },
      { key: "Boyau d'incendie", en: "Fire hose", fr: "Boyau d'incendie" },
      { key: "Système d'extinction automatique", en: "Automatic suppression", fr: "Système d'extinction automatique" },
      { key: "Système d'extinction pour cuisine", en: "Kitchen suppression", fr: "Système d'extinction pour cuisine" },
      { key: "Centrale de surveillance", en: "Monitoring station", fr: "Centrale de surveillance" },
      { key: "Éclairage d'urgence", en: "Emergency lighting", fr: "Éclairage d'urgence" },
      { key: "Plan d'évacuation", en: "Evacuation plan", fr: "Plan d'évacuation" },
      { key: "Plan et ingénérie", en: "Plans & engineering", fr: "Plan et ingénérie" },
      { key: "Formation", en: "Training", fr: "Formation" },
      { key: "Autre", en: "Other", fr: "Autre" },
    ],
    []
  );

  const workTypeOptions = useMemo(
    () => [
      { key: "Inspection", en: "Inspection", fr: "Inspection" },
      { key: "Réparation", en: "Repair", fr: "Réparation" },
      { key: "Installation", en: "Installation", fr: "Installation" },
      { key: "Remise aux normes", en: "Code compliance", fr: "Remise aux normes" },
      {
        key: "Inspection multiservice (Alarme, extincteur, gicleur)",
        en: "Multi-service inspection (alarm, extinguisher, sprinkler)",
        fr: "Inspection multiservice (Alarme, extincteur, gicleur)",
      },
    ],
    []
  );

  const allowedCategoryKeys = useMemo(() => new Set(categoryOptions.map((x) => x.key)), [categoryOptions]);
  const allowedWorkTypeKeys = useMemo(() => new Set(workTypeOptions.map((x) => x.key)), [workTypeOptions]);

  const [form, setForm] = useState<QuoteFormState>({
    companyName: "",
    responsibleName: "",
    buildingAddress: "",
    postalCode: "",
    city: "",
    email: "",
    phone: "",
    buildingType: undefined,
    isOwner: undefined,
    unitsOrSqft: "",
    floors: "",
    categories: [],
    workTypes: [],
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Optional prefill: /quote?category=...&workType=...
  useEffect(() => {
    const category = searchParams.get("category") ?? undefined;
    const workType = searchParams.get("workType") ?? undefined;

    setForm((s) => ({
      ...s,
      categories:
        category && allowedCategoryKeys.has(category) && !s.categories.includes(category)
          ? [...s.categories, category]
          : s.categories,
      workTypes:
        workType && allowedWorkTypeKeys.has(workType) && !s.workTypes.includes(workType)
          ? [...s.workTypes, workType]
          : s.workTypes,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = (list: string[], key: string) =>
    list.includes(key) ? list.filter((x) => x !== key) : [...list, key];

  const validate = () => {
    const requiredMissing =
      !form.companyName.trim() ||
      !form.responsibleName.trim() ||
      !form.buildingAddress.trim() ||
      !form.postalCode.trim() ||
      !form.city.trim() ||
      !form.email.trim() ||
      !form.phone.trim();

    return !requiredMissing;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      toast({
        title: isFr ? "Champs requis manquants" : "Missing required fields",
        description: isFr
          ? "Veuillez compléter les champs requis (compagnie, responsable, adresse, code postal, ville, courriel, téléphone)."
          : "Please complete the required fields (company, contact, address, postal code, city, email, phone).",
      });
      return;
    }

    setIsSubmitting(true);

    const subject = isFr ? "Demande de soumission – Site web" : "Quote request – Website";

    const bodyLines: string[] = [
      `${isFr ? "Entreprise" : "Company"}: ${form.companyName}`,
      `${isFr ? "Responsable" : "Responsible"}: ${form.responsibleName}`,
      `${isFr ? "Adresse du bâtiment" : "Building address"}: ${form.buildingAddress}`,
      `${isFr ? "Code postal" : "Postal code"}: ${form.postalCode}`,
      `${isFr ? "Ville" : "City"}: ${form.city}`,
      `${isFr ? "Courriel" : "Email"}: ${form.email}`,
      `${isFr ? "Téléphone" : "Phone"}: ${form.phone}`,
      "",
      `${isFr ? "Type d'immeuble" : "Building type"}: ${form.buildingType ?? "-"}`,
      `${isFr ? "Propriétaire" : "Owner"}: ${form.isOwner ?? "-"}`,
      `${isFr ? "Nombre de logis / pieds carrés" : "Units / Sq ft"}: ${form.unitsOrSqft || "-"}`,
      `${isFr ? "Nombre d'étages" : "Floors"}: ${form.floors || "-"}`,
      "",
      `${isFr ? "Catégories" : "Categories"}: ${form.categories.length ? form.categories.join(", ") : "-"}`,
      `${isFr ? "Types de travaux" : "Work types"}: ${form.workTypes.length ? form.workTypes.join(", ") : "-"}`,
      "",
      `${isFr ? "Notes" : "Notes"}:\n${form.notes || "-"}`,
    ];

    const mailto =
      `mailto:${contact.email}?subject=${encodeMailto(subject)}&body=${encodeMailto(bodyLines.join("\n"))}`;

    // mailto URLs can break if they get too long; guard + fallback.
    if (mailto.length > 1800) {
      try {
        await navigator.clipboard.writeText(bodyLines.join("\n"));
        toast({
          title: isFr ? "Copié" : "Copied",
          description: isFr
            ? "Le détail de la demande a été copié. Envoyez-le par courriel à cfhsecurite@cfhsecurite.com."
            : "Details copied. Email it to cfhsecurite@cfhsecurite.com.",
        });
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    toast({
      title: isFr ? "Prêt à envoyer" : "Ready to send",
      description: isFr
        ? "Votre demande va s’ouvrir dans votre application courriel."
        : "Your request will open in your email app.",
    });

    window.location.href = mailto;

    // Optional: reset after attempting handoff
    setTimeout(() => {
      setIsSubmitting(false);
      setForm({
        companyName: "",
        responsibleName: "",
        buildingAddress: "",
        postalCode: "",
        city: "",
        email: "",
        phone: "",
        buildingType: undefined,
        isOwner: undefined,
        unitsOrSqft: "",
        floors: "",
        categories: [],
        workTypes: [],
        notes: "",
      });
    }, 400);
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
            <img src={heroImg} alt="Quote" className="w-full h-full object-cover" />
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
                {isFr ? "Demande de soumission" : "Request a Quote"}
              </h1>
              <p className="mt-5 text-lg md:text-xl text-muted-foreground leading-relaxed">
                {isFr
                  ? "Partagez votre besoin. Nous vous répondrons avec une proposition claire et conforme."
                  : "Share what you need. We’ll respond with a clear, compliant proposal."}
              </p>
            </div>
          </div>
        </section>

        {/* CONTENT */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* LEFT */}
              <div className="lg:col-span-4 space-y-6">
                <Card className="rounded-[1.75rem] border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_30px_90px_rgba(0,0,0,0.30)]">
                  <CardContent className="p-8 space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="mt-1 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-black/25 border border-white/10">
                        <Phone className="h-5 w-5 text-[hsl(var(--cfh-blue))]" />
                      </div>
                      <div>
                        <div className="font-display text-xl font-semibold">{isFr ? "Téléphone" : "Phone"}</div>
                        <a
                          className="mt-2 block text-sm text-muted-foreground hover:text-foreground transition-colors"
                          href={`tel:${contact.phoneTel}`}
                        >
                          {contact.phoneLabel}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="mt-1 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-black/25 border border-white/10">
                        <Mail className="h-5 w-5 text-[hsl(var(--cfh-red))]" />
                      </div>
                      <div>
                        <div className="font-display text-xl font-semibold">{isFr ? "Courriel" : "Email"}</div>
                        <a
                          className="mt-2 block text-sm text-muted-foreground hover:text-foreground transition-colors"
                          href={`mailto:${contact.email}`}
                        >
                          {contact.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="mt-1 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-black/25 border border-white/10">
                        <MapPin className="h-5 w-5 text-[hsl(var(--cfh-blue))]" />
                      </div>
                      <div>
                        <div className="font-display text-xl font-semibold">{isFr ? "Siège social" : "Head office"}</div>
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                          {contact.hqLines.map((l) => (
                            <span key={l} className="block">
                              {l}
                            </span>
                          ))}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="mt-1 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-black/25 border border-white/10">
                        <Building2 className="h-5 w-5 text-[hsl(var(--cfh-red))]" />
                      </div>
                      <div>
                        <div className="font-display text-xl font-semibold">{isFr ? "Succursale" : "Branch"}</div>
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                          {contact.branchLines.map((l) => (
                            <span key={l} className="block">
                              {l}
                            </span>
                          ))}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="rounded-[1.75rem] border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-[0_30px_90px_rgba(0,0,0,0.30)]">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-black/25 border border-white/10">
                      <CheckCircle2 className="h-5 w-5 text-[hsl(var(--cfh-blue))]" />
                    </div>
                    <div>
                      <div className="font-display text-xl font-semibold">{isFr ? "Conseil" : "Tip"}</div>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                        {isFr
                          ? "Plus vous donnez de détails (type d’immeuble, étages, catégorie, travaux), plus la soumission sera rapide."
                          : "The more detail you provide (building type, floors, category, work type), the faster we can quote."}
                      </p>
                      <div className="mt-5">
                        <Button asChild variant="secondary" className="btn-cfh">
                          <Link to="/services" className="inline-flex items-center gap-2">
                            {isFr ? "Voir les services" : "Browse services"}
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div className="lg:col-span-8">
                <Card className="rounded-[2.25rem] border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_30px_90px_rgba(0,0,0,0.30)]">
                  <CardContent className="p-8 md:p-10">
                    <h2 className="font-display font-bold tracking-tight text-3xl md:text-4xl">
                      {isFr ? "Informations pour la soumission" : "Quote Details"}
                    </h2>
                    <p className="mt-4 text-muted-foreground">
                      {isFr ? "Les champs marqués * sont requis." : "Fields marked * are required."}
                    </p>

                    <form onSubmit={submit} className="mt-8 space-y-7">
                      {/* Required block */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>{isFr ? "Nom de l'entreprise *" : "Company name *"}</Label>
                          <Input
                            value={form.companyName}
                            onChange={(e) => setForm((s) => ({ ...s, companyName: e.target.value }))}
                            required
                            className="h-12 bg-black/20 border-white/10"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>{isFr ? "Nom de la personne responsable *" : "Responsible person *"}</Label>
                          <Input
                            value={form.responsibleName}
                            onChange={(e) => setForm((s) => ({ ...s, responsibleName: e.target.value }))}
                            required
                            className="h-12 bg-black/20 border-white/10"
                          />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                          <Label>{isFr ? "Adresse du bâtiment *" : "Building address *"}</Label>
                          <Input
                            value={form.buildingAddress}
                            onChange={(e) => setForm((s) => ({ ...s, buildingAddress: e.target.value }))}
                            required
                            className="h-12 bg-black/20 border-white/10"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>{isFr ? "Code postal *" : "Postal code *"}</Label>
                          <Input
                            value={form.postalCode}
                            onChange={(e) => setForm((s) => ({ ...s, postalCode: e.target.value }))}
                            required
                            className="h-12 bg-black/20 border-white/10"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>{isFr ? "Ville *" : "City *"}</Label>
                          <Input
                            value={form.city}
                            onChange={(e) => setForm((s) => ({ ...s, city: e.target.value }))}
                            required
                            className="h-12 bg-black/20 border-white/10"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>{isFr ? "Courriel *" : "Email *"}</Label>
                          <Input
                            value={form.email}
                            onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                            type="email"
                            required
                            className="h-12 bg-black/20 border-white/10"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>{isFr ? "Téléphone *" : "Phone *"}</Label>
                          <Input
                            value={form.phone}
                            onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
                            required
                            className="h-12 bg-black/20 border-white/10"
                          />
                        </div>
                      </div>

                      {/* Building context */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-2xl bg-black/25 border border-white/10 p-6">
                        <div className="space-y-2">
                          <Label>{isFr ? "Type d'immeuble" : "Building type"}</Label>
                          <Select
                            value={form.buildingType ?? ""}
                            onValueChange={(v) => setForm((s) => ({ ...s, buildingType: v as QuoteBuildingType }))}
                          >
                            <SelectTrigger className="h-12 bg-black/20 border-white/10">
                              <SelectValue placeholder={isFr ? "Sélectionner..." : "Select..."} />
                            </SelectTrigger>
                            <SelectContent>
                              {buildingTypeOptions.map((opt) => (
                                <SelectItem key={opt} value={opt}>
                                  {opt}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>{isFr ? "Propriétaire" : "Owner"}</Label>
                          <RadioGroup
                            value={form.isOwner ?? ""}
                            onValueChange={(v) => setForm((s) => ({ ...s, isOwner: v as QuoteOwner }))}
                            className="flex gap-6 pt-2"
                          >
                            <div className="flex items-center gap-2">
                              <RadioGroupItem value="Oui" id="owner-yes" />
                              <Label htmlFor="owner-yes">{isFr ? "Oui" : "Yes"}</Label>
                            </div>
                            <div className="flex items-center gap-2">
                              <RadioGroupItem value="Non" id="owner-no" />
                              <Label htmlFor="owner-no">{isFr ? "Non" : "No"}</Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <div className="space-y-2">
                          <Label>{isFr ? "Nombre de logis ou de pieds carrés" : "Units or sq. ft."}</Label>
                          <Input
                            value={form.unitsOrSqft}
                            onChange={(e) => setForm((s) => ({ ...s, unitsOrSqft: e.target.value }))}
                            className="h-12 bg-black/20 border-white/10"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>{isFr ? "Nombre d'étages" : "Floors"}</Label>
                          <Input
                            value={form.floors}
                            onChange={(e) => setForm((s) => ({ ...s, floors: e.target.value }))}
                            className="h-12 bg-black/20 border-white/10"
                          />
                        </div>
                      </div>

                      {/* Categories */}
                      <div className="space-y-3">
                        <div className="font-display text-lg font-semibold">
                          {isFr ? "Catégorie du produit ou service désiré" : "Requested product/service category"}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 rounded-2xl bg-black/25 border border-white/10 p-6">
                          {categoryOptions.map((opt) => {
                            const label = isFr ? opt.fr : opt.en;
                            const checked = form.categories.includes(opt.key);

                            return (
                              <label key={opt.key} className="flex items-start gap-3 cursor-pointer select-none">
                                <Checkbox
                                  checked={checked}
                                  onCheckedChange={() =>
                                    setForm((s) => ({ ...s, categories: toggle(s.categories, opt.key) }))
                                  }
                                  className="mt-0.5"
                                />
                                <span className="text-sm text-foreground/85 leading-relaxed">{label}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>

                      {/* Work types */}
                      <div className="space-y-3">
                        <div className="font-display text-lg font-semibold">
                          {isFr ? "Types de travaux désirés" : "Requested work type"}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 rounded-2xl bg-black/25 border border-white/10 p-6">
                          {workTypeOptions.map((opt) => {
                            const label = isFr ? opt.fr : opt.en;
                            const checked = form.workTypes.includes(opt.key);

                            return (
                              <label key={opt.key} className="flex items-start gap-3 cursor-pointer select-none">
                                <Checkbox
                                  checked={checked}
                                  onCheckedChange={() =>
                                    setForm((s) => ({ ...s, workTypes: toggle(s.workTypes, opt.key) }))
                                  }
                                  className="mt-0.5"
                                />
                                <span className="text-sm text-foreground/85 leading-relaxed">{label}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>

                      {/* Notes */}
                      <div className="space-y-2">
                        <Label>{isFr ? "Notes" : "Notes"}</Label>
                        <Textarea
                          value={form.notes}
                          onChange={(e) => setForm((s) => ({ ...s, notes: e.target.value }))}
                          className="min-h-[160px] bg-black/20 border-white/10"
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 pt-2">
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
                            {isSubmitting ? (isFr ? "Préparation..." : "Preparing...") : isFr ? "Envoyer" : "Send"}
                          </span>
                        </Button>

                        <Button asChild variant="secondary" className="btn-cfh py-6 text-lg">
                          <Link to="/contact">{isFr ? "Nous joindre" : "Contact"}</Link>
                        </Button>
                      </div>
                    </form>

                    <p className="mt-6 text-xs text-muted-foreground">
                      {isFr
                        ? "Ce formulaire ouvre votre application courriel pour envoyer la demande. Quand vous serez prêt, on peut le brancher à un endpoint backend (ex: POST /api/quote)."
                        : "This form opens your email app to send the request. When ready, we can wire it to a backend endpoint (e.g., POST /api/quote)."}
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
