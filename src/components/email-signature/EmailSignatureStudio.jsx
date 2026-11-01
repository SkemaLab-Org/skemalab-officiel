"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  Check,
  Copy,
  Code2,
  User,
  Mail,
  HelpCircle,
  Laptop,
  Eye,
  Settings2,
  ChevronRight,
  ShieldCheck,
  Layers,
  Building2,
} from "lucide-react";
import {
  TEAM_MEMBERS,
  TEMPLATES,
} from "./signatureTemplates";

export default function EmailSignatureStudio() {
  const [activeTemplateId, setActiveTemplateId] = useState("executive");
  const [formData, setFormData] = useState({ ...TEAM_MEMBERS[0] });
  const [showDisclaimer] = useState(false);
  const [copiedRich, setCopiedRich] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [previewMode, setPreviewMode] = useState("gmail"); // "gmail" | "clean"
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const signaturePreviewRef = useRef(null);

  // When member changes, update formData
  const handleSelectMember = (member) => {
    setFormData({ ...member });
    flashStatus(`Profil exécutif de ${member.name} chargé.`);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === "whatsapp") {
        updated.whatsappClean = value.replace(/[^0-9]/g, "");
      }
      if (field === "githubUrl") {
        updated.github = value
          .trim()
          .replace(/^https?:\/\//i, "")
          .replace(/\/+$/, "");
      }
      return updated;
    });
  };

  const flashStatus = (msg) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(""), 4000);
  };

  // Find active template generator
  const activeTemplate =
    TEMPLATES.find((t) => t.id === activeTemplateId) || TEMPLATES[0];

  // Export HTML always uses absolute production URLs so pasted signatures keep
  // working outside the site.
  const signatureHtml = activeTemplate.generator(formData, {
    showAddress: true,
    showDisclaimer,
  });

  // The on-page preview resolves assets from this site, so a member whose photo
  // is not deployed yet still renders instead of showing alt text.
  const previewHtml = activeTemplate.generator(
    { ...formData, avatar: formData.localAvatar || formData.avatar },
    { showAddress: true, showDisclaimer },
  );

  // 1-Click Copy for Gmail (Rich HTML clipboard)
  const handleCopyForGmail = async () => {
    let copied = false;

    try {
      if (typeof window !== "undefined" && window.navigator?.clipboard) {
        const blobHtml = new Blob([signatureHtml], { type: "text/html" });
        const plainText = `${formData.name}\n${formData.role} - SkemaLab\nEmail: ${formData.email}\nTél: ${formData.phone}\nWeb: ${formData.websiteUrl}\n${formData.tagline}`;
        const blobText = new Blob([plainText], { type: "text/plain" });

        if (typeof ClipboardItem !== "undefined") {
          const item = new ClipboardItem({
            "text/html": blobHtml,
            "text/plain": blobText,
          });
          await navigator.clipboard.write([item]);
          copied = true;
        } else {
          copied = copyViaDomSelection();
        }
      } else {
        copied = copyViaDomSelection();
      }
    } catch (err) {
      console.warn("ClipboardItem write failed, using fallback selection copy", err);
      copied = copyViaDomSelection();
    }

    if (!copied) {
      flashStatus("La copie a échoué. Vérifiez les autorisations du presse-papiers de votre navigateur.");
      return;
    }

    setCopiedRich(true);
    flashStatus("Signature copiée avec succès ! Collez (Ctrl+V) dans Gmail.");
    setTimeout(() => setCopiedRich(false), 4000);
  };

  // Fallback copy by selecting a temporary node built from the export HTML.
  const copyViaDomSelection = () => {
    if (typeof document === "undefined") return false;
    const host = document.createElement("div");
    host.setAttribute("aria-hidden", "true");
    host.style.cssText = "position:fixed;left:-9999px;top:0;opacity:0;";
    host.innerHTML = signatureHtml;
    document.body.appendChild(host);
    const range = document.createRange();
    range.selectNodeContents(host);
    const selection = window.getSelection();

    if (!selection) {
      host.remove();
      return false;
    }

    try {
      selection.removeAllRanges();
      selection.addRange(range);
      return document.execCommand("copy");
    } catch (error) {
      console.error("Fallback signature copy failed", error);
      return false;
    } finally {
      selection.removeAllRanges();
      host.remove();
    }
  };

  // Copy Raw HTML Code
  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(signatureHtml);
      setCopiedCode(true);
      flashStatus("Code HTML brut copié dans le presse-papiers !");
      setTimeout(() => setCopiedCode(false), 3000);
    } catch (e) {
      console.error(e);
      flashStatus("Impossible de copier le code HTML. Vérifiez les autorisations du presse-papiers.");
    }
  };

  return (
    <div className="w-full">
      {/* HEADER SECTION */}
      <section className="relative overflow-hidden border-b border-line bg-surface/50 py-12 sm:py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(8,149,135,0.18),transparent)]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center pt-20">

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-fg sm:text-4xl lg:text-5xl">
              Signature Email <span className="text-brand">Executive &amp; Corporate</span>
            </h1>

            <p className="mt-3 max-w-2xl text-sm sm:text-base text-muted">
              Design de signature ultra-professionnel aux standards des grands cabinets tech et agences internationales. Prêt à copier-coller dans Gmail.
            </p>

            {/* Quick Status Notification */}
            <AnimatePresence>
              {statusMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 flex items-center gap-2 rounded-sm border border-brand/40 bg-brand/15 px-4 py-2 text-xs font-semibold text-brand shadow-sm"
                >
                  <Check className="h-4 w-4 text-brand" />
                  <span>{statusMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* MAIN STUDIO WORKSPACE */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">

          {/* LEFT COLUMN: CUSTOMIZER & SETTINGS (5 COLS) */}
          <div className="space-y-6 lg:col-span-5">

            {/* 1. MEMBER SELECTOR */}
            <div className="rounded-sm border border-line bg-surface p-5 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-line">
                <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted">
                  <User className="h-4 w-4 text-brand" />
                  1. Sélectionner un membre
                </span>
                <span className="text-[11px] font-medium text-brand">Direction SkemaLab Agency</span>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                {TEAM_MEMBERS.map((member) => {
                  const isActive = formData.name === member.name;
                  return (
                    <button
                      key={member.id}
                      type="button"
                      onClick={() => handleSelectMember(member)}
                      aria-pressed={isActive}
                      title={`${member.name} — ${member.shortRole}`}
                      className={`flex items-center gap-2.5 rounded-sm border p-2.5 text-left transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:flex-col sm:gap-2 sm:px-2 sm:py-3 sm:text-center ${isActive
                        ? "border-brand bg-brand/10 shadow-sm"
                        : "border-line bg-page hover:border-brand/40 hover:bg-surface"
                        }`}
                    >
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-brand/40 sm:h-11 sm:w-11">
                        <Image
                          src={member.localAvatar}
                          alt={member.name}
                          fill
                          unoptimized
                          className="object-cover"
                          sizes="(min-width: 640px) 44px, 40px"
                        />
                      </div>
                      <div className="min-w-0 flex-1 sm:w-full sm:flex-none">
                        <div className="text-balance text-xs font-bold leading-tight text-fg">
                          {member.name}
                        </div>
                        <div className="mt-0.5 text-balance text-[10px] leading-tight text-muted">
                          {member.shortRole}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-3">
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      name: "Nouveau Membre",
                      role: "Senior Consultant & Business Strategy",
                      department: "Direction Conseil & Croissance",
                      email: "contact@skemalab.com",
                      phone: "+212 6 99 99 57 54",
                      whatsapp: "+212 6 99 99 57 54",
                      whatsappClean: "212699995754",
                      website: "www.skemalab.com",
                      websiteUrl: "https://www.skemalab.com",
                      linkedin: "skemalab agency",
                      linkedinUrl: "https://www.linkedin.com/company/skemalab",
                      tagline: "Build · Grow · Automate",
                      avatar: "https://i.imgur.com/t5DqN7J.jpeg",
                      localAvatar: "https://i.imgur.com/t5DqN7J.jpeg",
                      address: "Essaouira, Maroc • International",
                    })
                  }
                  className="w-full rounded-sm border border-dashed border-line py-2 text-center text-xs font-semibold text-muted hover:border-brand hover:text-brand"
                >
                  + Créer pour un autre membre
                </button>
              </div>
            </div>

            {/* 2. TEMPLATE SELECTOR */}
            <div className="rounded-sm border border-line bg-surface p-5 shadow-sm">
              <span className="flex items-center gap-2 pb-3 border-b border-line text-xs font-bold uppercase tracking-wider text-muted">
                <Layers className="h-4 w-4 text-brand" />
                2. Style de Signature (Standards Grands Groupes)
              </span>

              <div className="mt-4 space-y-2">
                {TEMPLATES.map((tmpl) => {
                  const isSelected = activeTemplateId === tmpl.id;
                  return (
                    <button
                      key={tmpl.id}
                      type="button"
                      onClick={() => setActiveTemplateId(tmpl.id)}
                      className={`flex w-full items-center justify-between rounded-sm border p-3 text-left transition-all ${isSelected
                        ? "border-brand bg-brand/10 shadow-sm"
                        : "border-line bg-page hover:border-brand/40"
                        }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-fg">{tmpl.name}</span>
                          <span className="rounded bg-brand/20 px-1.5 py-0.5 text-[9px] font-bold text-brand uppercase">
                            {tmpl.badge}
                          </span>
                        </div>
                        <p className="mt-0.5 text-[11px] text-muted">{tmpl.description}</p>
                      </div>
                      <ChevronRight
                        className={`h-4 w-4 shrink-0 transition-transform ${isSelected ? "text-brand translate-x-1" : "text-muted"
                          }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. EDITABLE DETAILS FORM */}
            <div className="rounded-sm border border-line bg-surface p-5 shadow-sm">
              <span className="flex items-center gap-2 pb-3 border-b border-line text-xs font-bold uppercase tracking-wider text-muted">
                <Settings2 className="h-4 w-4 text-brand" />
                3. Informations &amp; Coordonnées
              </span>

              <div className="mt-4 space-y-3.5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-fg">Nom complet</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="mt-1 w-full rounded-sm border border-line bg-page px-3 py-2 text-xs font-medium text-fg focus:border-brand focus:outline-none"
                    placeholder="Feissal Tarkaoui"
                  />
                </div>

                {/* Job Title / Role */}
                <div>
                  <label className="block text-xs font-semibold text-fg">Poste &amp; Titre Exécutif</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => handleInputChange("role", e.target.value)}
                    className="mt-1 w-full rounded-sm border border-line bg-page px-3 py-2 text-xs font-medium text-fg focus:border-brand focus:outline-none"
                    placeholder="Chief Executive Officer & Stratégie Business"
                  />
                </div>

                {/* Department */}
                <div>
                  <label className="block text-xs font-semibold text-fg">Département / Direction</label>
                  <input
                    type="text"
                    value={formData.department || ""}
                    onChange={(e) => handleInputChange("department", e.target.value)}
                    className="mt-1 w-full rounded-sm border border-line bg-page px-3 py-2 text-xs font-medium text-fg focus:border-brand focus:outline-none"
                    placeholder="Executive Board & Growth Strategy"
                  />
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-fg">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="mt-1 w-full rounded-sm border border-line bg-page px-3 py-2 text-xs font-medium text-fg focus:border-brand focus:outline-none"
                      placeholder="contact@skemalab.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-fg">Téléphone Direct</label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="mt-1 w-full rounded-sm border border-line bg-page px-3 py-2 text-xs font-medium text-fg focus:border-brand focus:outline-none"
                      placeholder="+212 6 99 99 57 54"
                    />
                  </div>
                </div>

                {/* WhatsApp & Website */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-fg">WhatsApp</label>
                    <input
                      type="text"
                      value={formData.whatsapp}
                      onChange={(e) => handleInputChange("whatsapp", e.target.value)}
                      className="mt-1 w-full rounded-sm border border-line bg-page px-3 py-2 text-xs font-medium text-fg focus:border-brand focus:outline-none"
                      placeholder="+212 6 99 99 57 54"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-fg">Site Web</label>
                    <input
                      type="text"
                      value={formData.website}
                      onChange={(e) => handleInputChange("website", e.target.value)}
                      className="mt-1 w-full rounded-sm border border-line bg-page px-3 py-2 text-xs font-medium text-fg focus:border-brand focus:outline-none"
                      placeholder="www.skemalab.com"
                    />
                  </div>
                </div>

                {/* LinkedIn */}
                <div>
                  <label className="block text-xs font-semibold text-fg">Lien LinkedIn</label>
                  <input
                    type="text"
                    value={formData.linkedin}
                    onChange={(e) => handleInputChange("linkedin", e.target.value)}
                    className="mt-1 w-full rounded-sm border border-line bg-page px-3 py-2 text-xs font-medium text-fg focus:border-brand focus:outline-none"
                    placeholder="feissal-tarkaoui"
                  />
                </div>

                {/* GitHub (optional) */}
                <div>
                  <label className="block text-xs font-semibold text-fg">
                    Profil GitHub <span className="font-normal text-muted">(optionnel)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.githubUrl || ""}
                    onChange={(e) => handleInputChange("githubUrl", e.target.value)}
                    className="mt-1 w-full rounded-sm border border-line bg-page px-3 py-2 text-xs font-medium text-fg focus:border-brand focus:outline-none"
                    placeholder="https://github.com/votre-profil"
                  />
                  <p className="mt-1 text-[10.5px] leading-snug text-muted">
                    Laissez vide pour masquer la ligne GitHub dans la signature.
                  </p>
                </div>

                {/* Tagline / Slogan */}
                <div>
                  <label className="block text-xs font-semibold text-fg">Devise / Slogan SkemaLab</label>
                  <input
                    type="text"
                    value={formData.tagline}
                    onChange={(e) => handleInputChange("tagline", e.target.value)}
                    className="mt-1 w-full rounded-sm border border-line bg-page px-3 py-2 text-xs font-medium text-fg focus:border-brand focus:outline-none"
                    placeholder="Build · Grow · Automate"
                  />
                </div>

                {/* Photo URL */}
                <div>
                  <label className="block text-xs font-semibold text-fg">URL Photo de profil (Haute Définition)</label>
                  <input
                    type="text"
                    value={formData.avatar}
                    onChange={(e) => handleInputChange("avatar", e.target.value)}
                    className="mt-1 w-full rounded-sm border border-line bg-page px-3 py-2 text-xs font-medium text-fg focus:border-brand focus:outline-none"
                    placeholder="https://i.imgur.com/t5DqN7J.jpeg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: LIVE PREVIEW & EXPORT ACTIONS (7 COLS) */}
          <div className="space-y-6 lg:col-span-7">

            {/* ACTION CARD (TOP BAR) */}
            <div className="rounded-sm border border-brand/30 bg-brand/5 p-5 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-sm font-bold text-fg">Prêt pour intégration Gmail</h3>
                  <p className="text-xs text-muted">
                    Format HTML inline strict respectant le rendu de tous les logiciels de messagerie.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={handleCopyForGmail}
                    className="inline-flex items-center gap-2 rounded-sm bg-brand px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-brand/20 transition-all hover:bg-accent active:scale-95 cursor-pointer"
                  >
                    {copiedRich ? (
                      <>
                        <Check className="h-4 w-4" />
                        <span>Copié pour Gmail !</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        <span>Copier la Signature (Gmail)</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowGuideModal(true)}
                    className="inline-flex items-center gap-1.5 rounded-sm border border-line bg-surface px-3 py-2 text-xs font-semibold text-fg hover:border-brand hover:text-brand cursor-pointer"
                  >
                    <HelpCircle className="h-3.5 w-3.5" />
                    <span>Guide Gmail</span>
                  </button>
                </div>
              </div>
            </div>

            {/* PREVIEW CONTAINER */}
            <div className="rounded-sm border border-line bg-surface shadow-sm overflow-hidden">

              {/* PREVIEW HEADER */}
              <div className="flex flex-wrap items-center justify-between border-b border-line bg-page/70 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-brand" />
                  <span className="text-xs font-bold text-fg">Rendu en Boîte de Réception</span>
                  <span className="text-xs text-muted">({activeTemplate.name})</span>
                </div>

                {/* PREVIEW SIMULATOR TABS */}
                <div className="flex items-center gap-1 rounded-sm border border-line bg-surface p-1">
                  <button
                    type="button"
                    onClick={() => setPreviewMode("gmail")}
                    className={`flex items-center gap-1 rounded px-2.5 py-1 text-[11px] font-semibold transition-all cursor-pointer ${previewMode === "gmail"
                      ? "bg-brand text-white shadow-xs"
                      : "text-muted hover:text-fg"
                      }`}
                  >
                    <Laptop className="h-3 w-3" />
                    <span>Gmail Web</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPreviewMode("clean")}
                    className={`flex items-center gap-1 rounded px-2.5 py-1 text-[11px] font-semibold transition-all cursor-pointer ${previewMode === "clean"
                      ? "bg-brand text-white shadow-xs"
                      : "text-muted hover:text-fg"
                      }`}
                  >
                    <Eye className="h-3 w-3" />
                    <span>Aperçu Pur</span>
                  </button>
                </div>
              </div>

              {/* SIMULATED GMAIL COMPOSE WINDOW */}
              {previewMode === "gmail" ? (
                <div className="p-4 sm:p-6 bg-[#f4f7f6] dark:bg-[#070b0a]">
                  {/* Gmail Compose Window Frame */}
                  <div className="overflow-hidden rounded-sm border border-[#d3dedb] bg-white shadow-md">
                    {/* Header bar */}
                    <div className="flex items-center justify-between border-b border-[#e5eeec] bg-[#eef5f3] px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-3.5 w-3.5 text-brand" />
                        <span className="text-xs font-bold text-[#1B2B28]">Nouveau message — Gmail Enterprise</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#cbd5e1]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#cbd5e1]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#cbd5e1]" />
                      </div>
                    </div>

                    {/* Meta fields */}
                    <div className="border-b border-[#eef5f3] px-4 py-2 text-xs text-[#5B6B66]">
                      <span className="font-semibold text-[#1B2B28]">À :</span> direction@groupe-partenaire.com
                    </div>
                    <div className="border-b border-[#eef5f3] px-4 py-2 text-xs text-[#5B6B66]">
                      <span className="font-semibold text-[#1B2B28]">Objet :</span>{" "}Partenariat Stratégique &amp; Architecture Digitale — SkemaLab
                    </div>

                    {/* Email Body & Signature Container */}
                    <div className="p-5 sm:p-6 space-y-4">
                      <p className="text-xs leading-relaxed text-[#1B2B28]">
                        Bonjour,<br /><br />
                        Nous avons le plaisir de vous transmettre la proposition d&apos;accompagnement stratégique et technique élaborée pour votre organisation.<br />
                        Restant à votre entière disposition pour convenir d&apos;un point d&apos;étape.
                      </p>

                      <p className="text-xs text-[#1B2B28]">
                        Excellente journée,<br />
                        <span className="font-bold">{formData.name}</span>
                      </p>

                      {/* THE RENDERED SIGNATURE IN EMAIL */}
                      <div className="pt-4 border-t border-dashed border-[#d3dedb]">
                        <div
                          ref={signaturePreviewRef}
                          dangerouslySetInnerHTML={{ __html: previewHtml }}
                          className="select-all overflow-x-auto py-2"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* CLEAN WHITE CANVAS PREVIEW */
                <div className="flex items-center justify-center p-6 sm:p-10 bg-white">
                  <div
                    ref={signaturePreviewRef}
                    dangerouslySetInnerHTML={{ __html: previewHtml }}
                    className="select-all overflow-x-auto"
                  />
                </div>
              )}

              {/* BOTTOM QUICK ACTIONS & HTML CODE EXPORT */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-surface p-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyForGmail}
                    className="inline-flex items-center gap-1.5 rounded-sm bg-brand px-3.5 py-2 text-xs font-bold text-white transition-all hover:bg-accent cursor-pointer"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    <span>{copiedRich ? "Copié !" : "Copier la Signature"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="inline-flex items-center gap-1.5 rounded-sm border border-line bg-page px-3 py-2 text-xs font-semibold text-fg hover:border-brand hover:text-brand cursor-pointer"
                  >
                    <Code2 className="h-3.5 w-3.5" />
                    <span>{copiedCode ? "Code Copié !" : "Code HTML"}</span>
                  </button>
                </div>

                <div className="text-[11px] text-muted flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-brand" />
                  <span>Conforme Gmail, Apple Mail, Outlook 365</span>
                </div>
              </div>
            </div>

            {/* HOW IT WORKS / GMAIL STEP BY STEP CARD */}
            <div className="rounded-sm border border-line bg-surface p-6 shadow-sm">
              <h3 className="flex items-center gap-2 text-sm font-bold text-fg">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[10px] font-extrabold text-white">
                  i
                </span>
                Guide d’intégration rapide dans Gmail (en 30 secondes)
              </h3>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-sm border border-line bg-page p-3.5">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-brand/10 text-xs font-bold text-brand">
                    1
                  </div>
                  <h4 className="mt-2 text-xs font-bold text-fg">Copier la signature</h4>
                  <p className="mt-1 text-[11px] text-muted leading-snug">
                    Cliquez sur le bouton vert <strong>« Copier la Signature »</strong> ci-dessus.
                  </p>
                </div>

                <div className="rounded-sm border border-line bg-page p-3.5">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-brand/10 text-xs font-bold text-brand">
                    2
                  </div>
                  <h4 className="mt-2 text-xs font-bold text-fg">Ouvrir Gmail</h4>
                  <p className="mt-1 text-[11px] text-muted leading-snug">
                    Allez dans ⚙️ <strong>Paramètres</strong> &gt; <strong>Général</strong> &gt; rubrique <strong>Signature</strong>.
                  </p>
                </div>

                <div className="rounded-sm border border-line bg-page p-3.5">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-brand/10 text-xs font-bold text-brand">
                    3
                  </div>
                  <h4 className="mt-2 text-xs font-bold text-fg">Coller &amp; Enregistrer</h4>
                  <p className="mt-1 text-[11px] text-muted leading-snug">
                    Faites <strong>Ctrl + V</strong> (ou <strong>Cmd + V</strong>) dans la boîte, puis cliquez sur <em>Enregistrer</em> en bas.
                  </p>
                </div>
              </div>
            </div>

            {/* RAW HTML ACCORDION / CODE DRAWER */}
            <details className="group rounded-sm border border-line bg-surface p-4 shadow-sm">
              <summary className="flex cursor-pointer items-center justify-between text-xs font-bold text-fg">
                <span className="flex items-center gap-2">
                  <Code2 className="h-4 w-4 text-brand" />
                  Afficher le code HTML brut de la signature
                </span>
                <span className="rounded bg-page px-2 py-0.5 text-[10px] font-semibold text-muted group-open:rotate-90 transition-transform">
                  &gt;
                </span>
              </summary>
              <div className="mt-3">
                <pre className="max-h-60 overflow-auto rounded-sm bg-[#0b0f0e] p-3 text-[11px] text-[#a0aec0] font-mono select-all">
                  {signatureHtml}
                </pre>
                <div className="mt-2 text-right">
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand hover:underline cursor-pointer"
                  >
                    <Copy className="h-3 w-3" />
                    <span>Copier tout le code HTML</span>
                  </button>
                </div>
              </div>
            </details>
          </div>
        </div>
      </div>

      {/* POPUP MODAL: STEP BY STEP GUIDE */}
      <AnimatePresence>
        {showGuideModal && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg rounded-sm border border-line bg-surface p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-4 border-b border-line">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-brand/10 text-brand">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-fg">Installation dans Gmail</h3>
                    <p className="text-xs text-muted">Procédure officielle pas-à-pas</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowGuideModal(false)}
                  className="rounded-sm p-1.5 text-muted hover:bg-page hover:text-fg cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="mt-4 space-y-3.5 text-xs text-fg">
                <div className="flex gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-white">
                    1
                  </span>
                  <p>
                    Sur cette page, cliquez sur <strong>« Copier la Signature »</strong>. Le contenu avec photos, liens et mise en page est copié dans votre presse-papier.
                  </p>
                </div>

                <div className="flex gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-white">
                    2
                  </span>
                  <p>
                    Ouvrez votre boîte <strong>Gmail</strong> (web), cliquez sur la roue crantée ⚙️ en haut à droite, puis sur <strong>« Voir tous les paramètres »</strong>.
                  </p>
                </div>

                <div className="flex gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-white">
                    3
                  </span>
                  <p>
                    Dans l&apos;onglet <strong>« Général »</strong>, faites défiler vers le bas jusqu&apos;à la section <strong>Signature</strong>.
                  </p>
                </div>

                <div className="flex gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-white">
                    4
                  </span>
                  <p>
                    Cliquez sur <strong>« Créer »</strong> (nommez-la par exemple <em>SkemaLab Officielle</em>) puis dans le grand cadre blanc à droite, faites simplement <strong>Coller (Ctrl + V ou Cmd + V)</strong>.
                  </p>
                </div>

                <div className="flex gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-white">
                    5
                  </span>
                  <p>
                    Configurez <em>« Pour les nouveaux e-mails »</em> sur votre nouvelle signature, descendez tout en bas de la page Gmail et cliquez sur <strong>« Enregistrer les modifications »</strong>.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    handleCopyForGmail();
                    setShowGuideModal(false);
                  }}
                  className="rounded-sm bg-brand px-4 py-2 text-xs font-bold text-white hover:bg-accent cursor-pointer"
                >
                  Copier et Fermer
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
