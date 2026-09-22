import { useEffect, useState, type FormEvent } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

/* ------------------------------------------------------------------ */
/* Brand assets (uploaded clinic files, do not replace)                */
/* ------------------------------------------------------------------ */

const LOGO = "/assets/Leelajani-Logo.png";
/* Trimmed mark-only variant of the official logo (no redesign, no effects).
   The original 500px canvas carries the mark in a narrow band, which made
   the rendered logo look small; the trimmed file renders the same artwork
   much larger inside a compact bar. */
const LOGO_MARK = "/assets/Leelajani-Logo-trim.png";
const DOC_PHOTO = "/assets/Le.webp";
/* Hero photograph, from the clinic's own uploaded assets */
const HERO_IMG = "/assets/24ccabb69f77080c09aa4c72e8176445.jpg";
/* Traditional Ayurvedic therapy table (droni), © Gabi, CC BY 2.0 via Wikimedia Commons */
const THERAPY = "/assets/ayurveda-therapy.jpg";

/* ------------------------------------------------------------------ */
/* Contact and facts (from leelajani.in)                               */
/* ------------------------------------------------------------------ */

const PHONE_DISPLAY = "+91 79071 12699";
const PHONE_TEL = "+917907112699";
const EMAIL = "leelajanicare@gmail.com";
const ADDRESS = "Near Narmada Shopping Complex, Kowdiar, Thiruvananthapuram, Kerala 695003";
const GOOGLE_REVIEWS_URL = "https://share.google/ISC0aES55WlZx5pMV";
const BRAND_SITE = "https://leelajani.in/";
const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(
    "Leelajani Ayur Care, Near Narmada Shopping Complex, Kowdiar, Thiruvananthapuram, Kerala 695003",
  );

const wa = (msg: string) =>
  "https://wa.me/917907112699?text=" + encodeURIComponent(msg);

const WA_MAIN = wa(
  "Hello, I have a question about psoriasis care at Leelajani Ayur Care.",
);
const WA_CONSULT = wa(
  "Hello, I would like to consult Dr. Anusree Leela about a skin concern.",
);

const track = (name: string) => {
  const w = window as unknown as { gtag?: (...a: unknown[]) => void };
  if (typeof w.gtag === "function") w.gtag("event", name);
};

/* ------------------------------------------------------------------ */
/* Motion: slow, natural, purposeful. Nothing bounces.                 */
/* ------------------------------------------------------------------ */

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const loadChild: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: easeOut, delay: 0.08 * i },
  }),
};

const reveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-70px" }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Buttons: small caps, rectangular, quiet press feedback              */
/* ------------------------------------------------------------------ */

const btnBase =
  "inline-flex items-center justify-center gap-2.5 rounded-[3px] px-7 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.18em] transition-all duration-300 active:scale-[0.98]";

const btnPrimary = `${btnBase} bg-primary text-primary-foreground hover:bg-primary/90`;
const btnOutline = `${btnBase} border border-foreground/25 text-foreground hover:border-foreground/60`;
const btnOnDark = `${btnBase} border border-cream/40 text-cream hover:bg-cream hover:text-foreground`;

/* ------------------------------------------------------------------ */
/* Official WhatsApp glyph (the real brand mark, not an illustration)  */
/* Rendered from the standard WhatsApp path data, single color.        */
/* ------------------------------------------------------------------ */

export function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.36 11.36 0 003.57.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.57 1 1 0 01-.25 1.01l-2.2 2.21z" />
    </svg>
  );
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}


/* ================================================================== */
/* NAV                                                                */
/* ================================================================== */

const NAV_LINKS = [
  { label: "The doctor", href: "#doctor" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
];

function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 h-[78px] border-b border-border bg-cream/95 backdrop-blur-sm">
      <div className="mx-auto flex h-[78px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#" aria-label="Leelajani Ayur Care, back to top" className="flex shrink-0 items-center">
          <img
            src={LOGO_MARK}
            alt="Leelajani Ayur Care"
            className="h-auto w-32 object-contain sm:w-36 lg:w-[9.5rem]"
            width={152}
            height={50}
          />
        </a>

        <nav className="hidden items-center gap-8 text-[0.8rem] font-medium text-muted-foreground lg:flex">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="link-quiet hover:text-foreground">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-4 sm:gap-5">
          <a
            href={"tel:" + PHONE_TEL}
            className="link-quiet hidden text-[0.85rem] text-muted-foreground hover:text-foreground xl:block"
          >
            {PHONE_DISPLAY}
          </a>
          <a
            href={WA_MAIN}
            target="_blank"
            rel="noreferrer"
            onClick={() => track("nav_whatsapp_click")}
            className="hidden items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[#128C7E] transition-colors duration-300 hover:text-[#075E54] md:inline-flex"
          >
            <WhatsAppIcon className="h-[18px] w-[18px]" />
            WhatsApp us
          </a>
          <a href="#book" onClick={() => track("begin_book_click")} className={`${btnPrimary} px-5 py-3`}>
            Book <span className="hidden sm:inline">a consultation</span>
          </a>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
          >
            <span
              aria-hidden="true"
              className={
                "block h-px w-5 bg-foreground transition-transform duration-300 " +
                (open ? "translate-y-[3px] rotate-45" : "")
              }
            />
            <span
              aria-hidden="true"
              className={
                "block h-px w-5 bg-foreground transition-transform duration-300 " +
                (open ? "-translate-y-[3px] -rotate-45" : "")
              }
            />
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-cream px-5 pb-4 pt-1 lg:hidden">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block border-b border-border/60 py-3.5 text-[0.95rem] font-medium text-foreground last:border-0"
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

/* ================================================================== */
/* 01 HERO  (editorial still life, no doctor portrait here)           */
/* ================================================================== */

function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const drift = useTransform(scrollY, [0, 600], [0, reduce ? 0 : -18]);

  return (
    <section className="hero-fit relative overflow-hidden bg-cream lg:h-[calc(100vh-4.875rem)] lg:min-h-[33rem]">
      <div className="hero-veil pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="grid lg:relative lg:block lg:h-full">
        {/* Copy — vertically centred, width controlled, never overflows the fold */}
        <motion.div
          className="flex flex-col justify-center px-5 pb-2 pt-8 sm:px-6 sm:pt-10 lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-1/2 lg:py-0 lg:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] lg:pr-16"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <div className="max-w-[560px] lg:py-6">
            <motion.p variants={loadChild} custom={0} className="eyebrow">
              Psoriasis &amp; chronic skin care
            </motion.p>

            <motion.h1
              variants={loadChild}
              custom={1}
              className="hero-title font-display mt-4 text-[clamp(2.5rem,10vw,4.75rem)] leading-[0.98] text-foreground lg:mt-5 lg:text-[clamp(3rem,4.9vw,4.6rem)] lg:leading-[1.02]"
            >
              Psoriasis is personal.
              <br />
              <em className="text-[#31563D]">Your care should be too.</em>
            </motion.h1>

            <motion.p
              variants={loadChild}
              custom={2}
              className="hero-copy mt-5 max-w-[34rem] text-[1rem] leading-relaxed text-muted-foreground lg:mt-6 lg:text-[1.05rem]"
            >
              Personalized Ayurvedic consultation with Dr. Anusree Leela, BAMS,
              at Leelajani Ayur Care in Kowdiar or online.
            </motion.p>

            <div className="hero-actions mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 lg:mt-7">
              <a href="#book" onClick={() => track("hero_book_click")} className={btnPrimary + " w-full sm:w-auto"}>
                Book a consultation
              </a>
              <a href={WA_MAIN} target="_blank" rel="noreferrer" onClick={() => track("hero_whatsapp_click")} className={btnOutline + " w-full sm:w-auto"}>
                <WhatsAppIcon className="h-[18px] w-[18px] text-[#25D366]" />
                WhatsApp us
              </a>
            </div>

            <motion.div
              variants={loadChild}
              custom={4}
              className="hero-meta mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.85rem] text-muted-foreground sm:text-[0.9rem] lg:mt-6"
            >
              <span>Kowdiar, Trivandrum</span>
              <span aria-hidden="true" className="h-3 w-px bg-border" />
              <span>Online consultations available</span>
            </motion.div>
          </div>
        </motion.div>

        {/* The clinic's own hero photograph — desktop: full-height cover crop inside
            the hero bounds (never pushes the section taller); mobile: fixed 260px
            band below the content so the CTAs stay above the fold. */}
        <div className="relative px-5 pb-8 pt-7 sm:px-6 sm:pb-10 lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-1/2 lg:px-0 lg:py-0">
          <motion.div
            style={{ y: drift }}
            className="relative mx-auto w-full lg:flex lg:h-full lg:max-w-none lg:flex-col lg:justify-center"
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: easeOut, delay: 0.2 }}
          >
            <div className="hero-photo group relative w-full max-w-full overflow-hidden bg-accent lg:ml-auto lg:h-[88%] lg:min-h-0 lg:w-[90%]">
              <img
                src={HERO_IMG}
                alt="Leelajani Ayur Care, Kowdiar, Thiruvananthapuram"
                className="block aspect-[16/10] h-auto w-full max-w-full object-cover object-top transition-transform duration-[1600ms] ease-out group-hover:scale-[1.03] lg:aspect-auto lg:h-full"
              />
            </div>
            <p className="mt-3 text-[0.85rem] leading-relaxed text-muted-foreground/80 sm:text-[0.9rem] lg:hidden">
              Leelajani Ayur Care, Kowdiar, Trivandrum.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* 02 TRUST STRIP                                                     */
/* ================================================================== */

const TRUST = [
  { title: "Doctor led care", sub: "Dr. Anusree Leela, BAMS" },
  { title: "Personalized consultation", sub: "Individual assessment" },
  { title: "Kowdiar clinic", sub: "Thiruvananthapuram" },
  { title: "Online consultation", sub: "Available remotely" },
];

function TrustStrip() {
  return (
    <section className="border-y border-border bg-secondary">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-6 px-6 py-8 lg:grid-cols-4 lg:gap-y-0">
        {TRUST.map((t, i) => (
          <div
            key={t.title}
            className={
              "px-2 lg:px-8" +
              (i > 0 ? " lg:border-l lg:border-border" : "") +
              (i % 2 === 1 ? " border-l border-border pl-6 lg:pl-8" : "")
            }
          >
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-foreground">
              {t.title}
            </p>
            <p className="mt-1 text-[0.85rem] text-muted-foreground">{t.sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ================================================================== */
/* 02b BOOKING FORM (Kappiness style appointment request)             */
/* ================================================================== */

function BookingForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [time, setTime] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    track("booking_form_submit");
    const lines = ["Appointment request", "Name: " + name, "Phone: " + phone];
    if (service) lines.push("Service: " + service);
    if (time) lines.push("Preferred day or time: " + time);
    window.open(wa(lines.join("\n")), "_blank");
    setSent(true);
  };

  const field =
    "w-full rounded-[3px] border border-input bg-cream px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/55 outline-none transition-colors duration-300 hover:border-foreground/30 focus:border-primary";

  if (sent) {
    return (
      <section className="border-y border-border bg-secondary py-20 lg:py-24">
        <div className="mx-auto max-w-2xl px-6">
          <div className="border border-border bg-card p-8 text-center sm:p-12">
            <p className="font-display text-[clamp(1.8rem,3.4vw,2.4rem)] text-foreground">
              Thank you. Your request has been received.
            </p>
            <p className="mx-auto mt-4 max-w-md text-[0.92rem] leading-relaxed text-muted-foreground">
              Our team will call you back to confirm your slot. You can also
              continue the conversation on WhatsApp right away.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href={WA_MAIN}
                target="_blank"
                rel="noreferrer"
                onClick={() => track("booking_success_whatsapp_click")}
                className={btnPrimary}
              >
                Continue on WhatsApp
              </a>
              <a href={"tel:" + PHONE_TEL} onClick={() => track("booking_success_call_click")} className={btnOutline}>
                Call {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="book" className="scroll-mt-24 border-b border-border bg-secondary py-20 lg:py-28">
      <Reveal className="mx-auto max-w-3xl px-6">
        <div className="border border-border bg-card p-7 sm:p-10">
          <h2 className="font-display text-center text-[clamp(1.9rem,3.8vw,2.7rem)] leading-tight text-foreground">
            Book your appointment in Trivandrum
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-center text-[0.95rem] leading-relaxed text-muted-foreground">
            Consultations available Monday to Saturday, 7 AM to 7 PM. We
            respond within working hours, usually much sooner.
          </p>

          <form onSubmit={submit} className="mt-8">
            <label className="block">
              <span className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Your name
              </span>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={field + " mt-2"}
                placeholder="e.g. Rahul Sharma"
              />
            </label>

            <label className="mt-5 block">
              <span className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Phone number
              </span>
              <input
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={field + " mt-2"}
                placeholder="e.g. +91 98470 12345"
              />
            </label>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Service needed (optional)
                </span>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className={field + " mt-2 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%228%22%3E%3Cpath%20d%3D%22M1%201l5%205%205-5%22%20stroke%3D%22%2331553D%22%20stroke-width%3D%221.5%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px_8px] bg-[position:right_1rem_center] bg-no-repeat pr-10"}
                >
                  <option value="">Select a service…</option>
                  <option>Psoriasis consultation</option>
                  <option>Online video consultation</option>
                  <option>Follow up review</option>
                </select>
              </label>
              <label className="block">
                <span className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Preferred day or time (optional)
                </span>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className={field + " mt-2 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%228%22%3E%3Cpath%20d%3D%22M1%201l5%205%205-5%22%20stroke%3D%22%2331553D%22%20stroke-width%3D%221.5%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px_8px] bg-[position:right_1rem_center] bg-no-repeat pr-10"}
                >
                  <option value="">Select preferred time…</option>
                  <option>Morning, 7 AM to 12 PM</option>
                  <option>Afternoon, 12 PM to 4 PM</option>
                  <option>Evening, 4 PM to 7 PM</option>
                  <option>Any time</option>
                </select>
              </label>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button type="submit" className={btnPrimary + " flex-1"}>
                Request my appointment
              </button>
              <a
                href={WA_MAIN}
                target="_blank"
                rel="noreferrer"
                onClick={() => track("booking_whatsapp_click")}
                className={btnOutline + " flex-1"}
              >
                <WhatsAppIcon className="h-[18px] w-[18px] text-[#25D366]" />
                Chat to book via WhatsApp
              </a>
            </div>

            <div className="mt-6 space-y-2 text-center">
              <p className="text-[0.82rem] font-medium text-foreground">
                <span aria-hidden="true" className="mr-1.5 text-primary">★</span>
                Rated 4.8 on Google by hundreds of patients{" "}
                <a
                  href={GOOGLE_REVIEWS_URL}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => track("form_reviews_click")}
                  className="link-quiet text-muted-foreground"
                >
                  (see reviews)
                </a>
              </p>
              <p className="text-[0.8rem] leading-relaxed text-muted-foreground">
                Our team replies during clinic hours, Monday to Saturday, 7 AM
                to 7 PM. Enquiring costs nothing, your information stays
                confidential, and it is not stored on this website.
              </p>
            </div>
          </form>
        </div>
      </Reveal>
    </section>
  );
}

/* ================================================================== */
/* 03 DOCTOR (editorial split on olive block, photo breaks the grid)  */
/* ================================================================== */

const DOCTOR_POINTS = [
  "Doctor led consultation",
  "Psoriasis and chronic skin concerns",
  "Kowdiar, Trivandrum",
  "Online consultations available",
];

function Doctor() {
  return (
    <section id="doctor" className="scroll-mt-24 overflow-hidden bg-cream py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative">
          {/* olive editorial block behind the right column */}
          <div
            aria-hidden="true"
            className="absolute inset-y-10 right-0 hidden w-[58%] bg-accent lg:block"
          />
          <div className="relative grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-0">
            {/* portrait, breaks the grid upward and to the left */}
            <Reveal className="relative z-10 lg:-mt-10 lg:-mr-16">
              <div className="relative">
                {/* offset frame wraps ONLY the photo, never the caption text */}
                <div
                  aria-hidden="true"
                  className="absolute -left-3 -top-3 hidden h-full w-full border border-foreground/20 lg:block"
                />
                <div className="group relative overflow-hidden">
                  <img
                    src={DOC_PHOTO}
                    alt="Dr. Anusree Leela, Chief Physician at Leelajani Ayur Care, Kowdiar"
                    loading="lazy"
                    className="aspect-[3/4] w-full max-w-md object-cover object-top transition-transform duration-[1600ms] ease-out group-hover:scale-[1.04]"
                  />
                </div>
              </div>
              <p className="mt-5 text-[0.9rem] leading-relaxed text-muted-foreground sm:text-[0.95rem] lg:text-base">
                Dr. Anusree Leela, BAMS, at the Kowdiar clinic.
              </p>
            </Reveal>

            <div className="relative lg:py-24 lg:pl-24">
              <Reveal>
                <p className="eyebrow">The doctor behind Leelajani</p>
                <h2 className="font-display mt-4 text-[clamp(2rem,4vw,3.2rem)] leading-tight text-foreground">
                  Meet Dr. Anusree Leela
                </h2>
                <p className="mt-2 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-primary">
                  BAMS
                </p>
              </Reveal>

              <Reveal>
                <p className="font-display mt-8 text-xl italic text-foreground">
                  Good care starts with listening.
                </p>
                <p className="mt-4 max-w-lg leading-relaxed text-muted-foreground">
                  Dr. Anusree Leela approaches each consultation by
                  understanding the person behind the symptoms, their health
                  history, concerns and individual experience.
                </p>
              </Reveal>

              <Reveal>
                <ul className="mt-8 max-w-lg divide-y divide-border border-y border-border">
                  {DOCTOR_POINTS.map((p) => (
                    <li key={p} className="py-4 text-[0.95rem] text-foreground sm:text-base">
                      {p}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal>
                <a
                  href={WA_CONSULT}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => track("doctor_whatsapp_click")}
                  className={btnOutline + " mt-9"}
                >
                  Consult Dr. Anusree Leela
                </a>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* 04 UNDERSTANDING PSORIASIS                                         */
/* ================================================================== */

function Understanding() {
  return (
    <section className="border-y border-border bg-secondary py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24">
        <Reveal>
          <h2 className="font-display max-w-md text-[clamp(1.9rem,3.6vw,2.9rem)] leading-tight text-foreground">
            Every person&rsquo;s experience with psoriasis is different.
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
            Symptoms can change. Flare ups can come and go. Previous treatment
            experiences may differ. That is why the first step is understanding
            what you have actually been experiencing.
          </p>
          <p className="font-display mt-10 border-l-2 border-primary pl-5 text-lg italic text-foreground">
            Your story matters to the consultation.
          </p>
        </Reveal>

        {/* quiet typographic panel instead of a staged photo */}
        <Reveal className="lg:pl-8">
          <div className="relative border border-border bg-cream">
            <div className="group relative overflow-hidden">
              <img
                src={THERAPY}
                alt="A traditional wooden Ayurvedic therapy table in a calm treatment room"
                loading="lazy"
                className="aspect-[3/2] w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.04]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(19,46,33,0.45)_100%)]"
              />
              <p className="absolute bottom-4 left-5 right-5 text-[0.8rem] leading-relaxed text-cream">
                Classical therapies, when advised, are selected by the doctor
                for your condition and never as a fixed package.
              </p>
            </div>
            <div className="relative p-8 sm:p-10">
              <p className="eyebrow">During the first consultation</p>
              <ul className="mt-6 divide-y divide-border">
                {[
                  ["Your symptoms", "Where they appear, how they change, what triggers them."],
                  ["Your history", "How long, what helped, what did not."],
                  ["Your routine", "Food, sleep, stress and the pace of your day."],
                  ["Your questions", "What you have been worrying about, in your own words."],
                ].map(([t, d]) => (
                  <li key={t} className="py-4">
                    <p className="text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-foreground">
                      {t}
                    </p>
                    <p className="mt-1 text-[0.88rem] text-muted-foreground">{d}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================== */
/* 05 TALK TO US (sage background, three contact pathways)            */
/* ================================================================== */
/* The booking form lives early, in section 02b. This section catches  */
/* visitors who prefer a different way in. No second form.             */

const TALK_PATHS = [
  {
    title: "Ask on WhatsApp",
    body: "Questions about psoriasis care, before you decide to book.",
    action: "Start a chat",
    href: WA_MAIN,
    event: "talk_whatsapp_click",
    external: true,
  },
  {
    title: "Call the clinic",
    body: "Speak directly with our team during clinic hours.",
    action: "Call " + PHONE_DISPLAY,
    href: "tel:" + PHONE_TEL,
    event: "talk_call_click",
    external: false,
  },
  {
    title: "Request a callback",
    body: "Leave your number in the form above and we will call you.",
    action: "Go to the form",
    href: "#book",
    event: "talk_callback_click",
    external: false,
  },
];

function TalkToUs() {
  return (
    <section className="bg-accent py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow">Talk to us</p>
          <h2 className="font-display mt-4 text-[clamp(1.9rem,3.6vw,2.9rem)] leading-tight text-foreground">
            Not sure where to begin?
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">
            Most people start with a question, not a booking. Any of these
            three will reach a real person on our team.
          </p>
        </Reveal>

        <motion.ol
          className="divide-y divide-border border-t border-border"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-70px" }}
        >
          {TALK_PATHS.map((p) => (
            <motion.li key={p.title} variants={reveal} className="group">
              <a
                href={p.href}
                target={p.external ? "_blank" : undefined}
                rel={p.external ? "noreferrer" : undefined}
                onClick={() => track(p.event)}
                className="grid grid-cols-[1fr_auto] items-center gap-4 py-7 transition-colors duration-300"
              >
                <div>
                  <h3 className="font-display text-2xl text-foreground transition-colors duration-300 group-hover:text-primary">
                    {p.title}
                  </h3>
                  <p className="mt-1 max-w-md text-[0.9rem] leading-relaxed text-muted-foreground">
                    {p.body}
                  </p>
                </div>
                <span className="text-right text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-foreground/70 transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary">
                  <span className="hidden sm:inline">{p.action} </span>
                  <span aria-hidden="true">→</span>
                </span>
              </a>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}

/* ================================================================== */
/* 06 PERSONALIZED CARE                                               */
/* ================================================================== */

const CARE_STEPS = [
  { n: "01", title: "Understand", body: "Your symptoms, health history and previous treatment experience." },
  { n: "02", title: "Assess", body: "Your concerns are discussed during a doctor led consultation." },
  { n: "03", title: "Personalize", body: "Your care and guidance are shaped around your consultation." },
  { n: "04", title: "Follow up", body: "Continue with appropriate guidance based on your individual needs." },
];

function PersonalizedCare() {
  return (
    <section className="bg-cream py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-24">
        <Reveal>
          <h2 className="font-display mt-4 text-[clamp(1.9rem,3.6vw,2.9rem)] leading-tight text-foreground">
            Care that begins with the person.
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
            Two people rarely have the same psoriasis. The plan follows the
            consultation, not a fixed protocol.
          </p>
        </Reveal>

        <motion.ol
          className="divide-y divide-border border-t border-border"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-70px" }}
        >
          {CARE_STEPS.map((s) => (
            <motion.li
              key={s.n}
              variants={reveal}
              className="grid grid-cols-[4.5rem_1fr] gap-4 py-7 sm:grid-cols-[6rem_1fr]"
            >
              <span aria-hidden="true" className="font-display text-4xl leading-none text-[#879B82]/60 sm:text-5xl">
                {s.n}
              </span>
              <div>
                <h3 className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-foreground">
                  {s.title}
                </h3>
                <p className="mt-2 max-w-md text-[0.92rem] leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}

/* ================================================================== */
/* 08 REVIEWS (verified website testimonials + Google rating)         */
/* ================================================================== */

const TESTIMONIALS = [
  {
    quote:
      "I came with pain, tiredness, and emotional heaviness and I am leaving with peace, strength and happiness.",
    name: "Sneha",
    detail: "Patient, verified on leelajani.in",
  },
  {
    quote:
      "Highly knowledgeable and personalized care provided by Dr. Anusree. Friendly and helpful staff, with a warm atmosphere.",
    name: "Patient feedback",
    detail: "From the clinic's public Google listing",
  },
  {
    quote:
      "Healing begins the moment you choose to care for yourself.",
    name: "Devananda",
    detail: "Video review, verified on leelajani.in",
  },
];

/* Official Google G mark and star glyphs: real brand iconography for
   authentic attribution, kept only in the reviews context.             */

function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function Star({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M10 1.7l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.3l-4.94 2.6.94-5.5-4-3.9 5.53-.8L10 1.7z" />
    </svg>
  );
}

function StarRow({ value, label }: { value: number; label: string }) {
  const stars = (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-5 w-5 shrink-0" />
      ))}
    </div>
  );
  return (
    <div className="relative inline-flex" role="img" aria-label={label}>
      <div className="text-border/70">{stars}</div>
      <div
        className="absolute inset-0 overflow-hidden text-[#FBBC05]"
        style={{ width: (value / 5) * 100 + "%" }}
      >
        {stars}
      </div>
    </div>
  );
}

function Reviews() {
  return (
    <section id="reviews" className="scroll-mt-24 bg-cream py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Patient reviews</p>
          <h2 className="font-display mt-4 text-[clamp(1.9rem,3.6vw,2.9rem)] leading-tight text-foreground">
            What patients have shared
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            The public Google rating, and words shared by patients of the
            clinic. Nothing here is written by us.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.6fr)]">
          {/* Google rating summary */}
          <Reveal>
            <div className="flex h-full flex-col justify-between border border-border bg-forest p-8 text-cream sm:p-10">
              <div>
                <div className="flex items-center gap-3">
                  <GoogleG className="h-7 w-7" />
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-cream/70">
                    Google rating
                  </p>
                </div>
                <div className="mt-9 flex items-end gap-4">
                  <span className="font-display text-[4.5rem] leading-none text-cream">4.8</span>
                  <div className="pb-1.5">
                    <StarRow value={4.8} label="Rated 4.8 out of 5 on Google" />
                    <p className="mt-2 text-[0.78rem] text-cream/70">Out of 5</p>
                  </div>
                </div>
                <p className="mt-6 text-[0.9rem] leading-relaxed text-cream/70">
                  From hundreds of patient reviews on the clinic's public
                  Google listing.
                </p>
              </div>
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() => track("reviews_google_click")}
                className="mt-10 inline-flex items-center gap-2 border border-cream/30 px-5 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-cream transition-colors duration-300 hover:bg-cream hover:text-foreground"
              >
                Read all reviews on Google
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </Reveal>

          {/* Individual patient words */}
          <div className="grid content-start gap-6">
            {TESTIMONIALS.map((t) => (
              <Reveal key={t.name}>
                <figure className="card-lift flex items-start gap-5 border border-border bg-card p-6 sm:p-8">
                  <span
                    aria-hidden="true"
                    className="font-display flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-lg text-foreground"
                  >
                    {t.name.charAt(0)}
                  </span>
                  <div className="min-w-0">
                    <blockquote className="text-[1.02rem] leading-relaxed text-foreground sm:text-[1.08rem]">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-4 text-[0.8rem] text-muted-foreground">
                      <span className="font-semibold text-foreground">{t.name}</span>
                      <span className="mx-1.5" aria-hidden="true">·</span>
                      {t.detail}
                    </figcaption>
                  </div>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* 09 FAQ                                                             */
/* ================================================================== */

const FAQS = [
  {
    q: "Can I consult online?",
    a: "Yes. Consultations are available online by video call as well as in person at the Kowdiar clinic.",
  },
  {
    q: "Where is the clinic?",
    a: "Near Narmada Shopping Complex, Kowdiar, Thiruvananthapuram, Kerala 695003. Directions are shared when you book.",
  },
  {
    q: "What happens during the first consultation?",
    a: "Dr. Anusree Leela takes time to understand your symptoms, health history, daily routine and previous treatments before discussing any care plan.",
  },
  {
    q: "What does a consultation cost?",
    a: "Fees depend on the consultation type and duration. Our team shares the exact fee when you enquire, before anything is booked.",
  },
  {
    q: "Can Ayurveda guarantee a cure for psoriasis?",
    a: "No. No system of medicine can honestly promise a cure for psoriasis. Care here focuses on understanding your condition and supporting your skin over time.",
  },
];

function Faq() {
  return (
    <section id="faq" className="scroll-mt-24 bg-background py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <Reveal>
          <p className="eyebrow">Questions</p>
          <h2 className="font-display mt-4 text-[clamp(1.9rem,3.6vw,2.9rem)] leading-tight text-foreground">
            Asked before booking
          </h2>
          <p className="mt-5 max-w-xs text-[0.9rem] leading-relaxed text-muted-foreground">
            Have questions before booking?{" "}
            <a href={WA_MAIN} target="_blank" rel="noreferrer" className="link-quiet text-foreground">
              Talk to our team
            </a>
            .
          </p>
        </Reveal>

        <Reveal>
          <Accordion type="single" collapsible className="border-t border-border">
            {FAQS.map((f, i) => (
              <AccordionItem key={i} value={"faq-" + i} className="border-b border-border">
                <AccordionTrigger className="py-5 text-left font-display text-lg font-normal text-foreground hover:no-underline hover:text-primary">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="max-w-xl pb-6 text-[0.92rem] leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================== */
/* 10 FINAL CTA                                                       */
/* ================================================================== */

function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-forest">
      <div className="h-0.5 w-full bg-primary" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-6 py-20 text-center lg:py-28">
        <Reveal>
          <h2 className="font-display mx-auto max-w-2xl text-[clamp(2.2rem,5vw,3.6rem)] leading-tight text-cream">
            Start with a conversation.
          </h2>
          <p className="mx-auto mt-6 max-w-lg leading-relaxed text-cream/70">
            Tell us what you have been experiencing and take the first step
            towards a personalized consultation.
          </p>
          <div className="mt-10 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-center">
            <a
              href="#book"
              onClick={() => track("final_book_click")}
              className={`${btnBase} bg-accent text-accent-foreground hover:bg-accent/85`}
            >
              Book a consultation
            </a>
            <a
              href={WA_MAIN}
              target="_blank"
              rel="noreferrer"
              onClick={() => track("final_whatsapp_click")}
              className={btnOnDark}
            >
              <WhatsAppIcon className="h-[18px] w-[18px] text-[#25D366]" />
              Talk to us on WhatsApp
            </a>
          </div>
          <p className="mt-6 text-[0.85rem] text-cream/60">
            Prefer to talk?{" "}
            <a
              href={"tel:" + PHONE_TEL}
              onClick={() => track("final_call_click")}
              className="link-quiet text-cream"
            >
              Call {PHONE_DISPLAY}
            </a>
          </p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[0.8rem] text-cream/60">
            <span>Dr. Anusree Leela, BAMS</span>
            <span aria-hidden="true">·</span>
            <span>Leelajani Ayur Care</span>
            <span aria-hidden="true">·</span>
            <span>Kowdiar, Trivandrum</span>
            <span aria-hidden="true">·</span>
            <span>Online consultations available</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================== */
/* 11 FOOTER                                                          */
/* ================================================================== */

function Footer() {
  return (
    <footer className="border-t border-cream/10 bg-forest">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <div className="inline-block bg-cream p-4">
              <img
                src={LOGO}
                alt="Leelajani Ayur Care"
                className="h-20 w-auto object-contain"
                loading="lazy"
              />
            </div>
            <p className="mt-5 max-w-xs text-[0.85rem] leading-relaxed text-cream/60">
              Doctor led Ayurvedic clinical care.
            </p>
          </div>

          <div className="text-[0.85rem] leading-loose">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-cream/50">
              Clinic
            </p>
            <a href={MAPS_URL} target="_blank" rel="noreferrer" className="mt-3 block max-w-xs text-cream/75 hover:text-cream">
              {ADDRESS}
            </a>
            <a href={BRAND_SITE} target="_blank" rel="noreferrer" className="mt-2 block text-cream/75 hover:text-cream">
              leelajani.in
            </a>
          </div>

          <div className="text-[0.85rem] leading-loose">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-cream/50">
              Contact
            </p>
            <a href={"tel:" + PHONE_TEL} onClick={() => track("footer_call_click")} className="mt-3 block text-cream/75 hover:text-cream">
              {PHONE_DISPLAY}
            </a>
            <a href={WA_MAIN} target="_blank" rel="noreferrer" onClick={() => track("footer_whatsapp_click")} className="mt-1 flex items-center gap-2 text-cream/75 hover:text-cream">
              <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
              Chat on WhatsApp
            </a>
            <a href={"mailto:" + EMAIL} className="block text-cream/75 hover:text-cream">
              {EMAIL}
            </a>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[0.78rem] text-cream/50">
              <a href={BRAND_SITE} target="_blank" rel="noreferrer" className="hover:text-cream">
                Privacy Policy
              </a>
              <a href={BRAND_SITE} target="_blank" rel="noreferrer" className="hover:text-cream">
                Terms
              </a>
              <a href={BRAND_SITE} target="_blank" rel="noreferrer" className="hover:text-cream">
                Disclaimer
              </a>
              <a href={"mailto:" + EMAIL} className="hover:text-cream">
                Contact
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-cream/10 pt-6 text-[0.75rem] text-cream/40">
          © 2026 Leelajani Ayur Care. Information on this page is for general
          awareness and is not a substitute for medical advice.
        </div>
        <p className="mt-2 text-[0.7rem] text-cream/25">
          Therapy table photograph by Gabi, CC BY 2.0, via Wikimedia Commons.
        </p>
      </div>
    </footer>
  );
}

/* ================================================================== */
/* FLOATING CONTACT  (call above WhatsApp, official glyphs, fixed)     */
/* ================================================================== */

function FloatingContact() {
  return (
    <div className="fixed bottom-5 right-5 z-50 hidden flex-col items-center gap-4 lg:flex">
      <a
        href={"tel:" + PHONE_TEL}
        aria-label="Call the clinic"
        onClick={() => track("floating_call_click")}
        className="group flex h-14 w-14 items-center justify-center rounded-full bg-primary text-cream shadow-[0_8px_24px_rgba(19,46,33,0.35)] transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_28px_rgba(19,46,33,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:scale-100"
      >
        <PhoneIcon className="h-6 w-6" />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-[calc(100%+12px)] translate-x-1 whitespace-nowrap rounded-[3px] bg-foreground px-3 py-1.5 text-[0.72rem] font-medium tracking-wide text-cream opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
        >
          Call the clinic
        </span>
      </a>
      <a
        href={WA_MAIN}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with us on WhatsApp"
        onClick={() => track("floating_whatsapp_click")}
        className="group flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.35)] transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_28px_rgba(37,211,102,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#128C7E] active:scale-100"
      >
        <WhatsAppIcon className="h-7 w-7" />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-[calc(100%+12px)] translate-x-1 whitespace-nowrap rounded-[3px] bg-foreground px-3 py-1.5 text-[0.72rem] font-medium tracking-wide text-cream opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
        >
          Chat with us
        </span>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/20"
        />
      </a>
    </div>
  );
}

/* ================================================================== */
/* MOBILE STICKY CTA                                                  */
/* ================================================================== */

function MobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 border-t border-border bg-cream lg:hidden">
      <a
        href={"tel:" + PHONE_TEL}
        onClick={() => track("sticky_call_click")}
        className="flex h-14 items-center justify-center text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-foreground"
      >
        Call
      </a>
      <a
        href={WA_MAIN}
        target="_blank"
        rel="noreferrer"
        onClick={() => track("sticky_whatsapp_click")}
        className="flex h-14 items-center justify-center gap-2 border-x border-border bg-[#25D366]/10 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#31563D]"
      >
        <WhatsAppIcon className="h-5 w-5 shrink-0" />
        <span className="truncate">WhatsApp</span>
      </a>
      <a
        href="#book"
        onClick={() => track("sticky_book_click")}
        className="flex h-14 items-center justify-center bg-primary text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-primary-foreground"
      >
        Book now
      </a>
    </div>
  );
}

/* ================================================================== */
/* WELCOME POPUP  (opens on load, a short while after the hero settles) */
/* A compact, centred enquiry modal. On phones it sits inside the       */
/* viewport with a 12px margin; the close button stays pinned to the    */
/* modal frame, above any scrolling content.                            */
/* ================================================================== */

const POPUP_DELAY_MS = 2500;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/* Accepts 9876543210 and +91 9876543210 style numbers, spaces allowed */
const PHONE_RE = /^(?:\+91[\s-]?|0)?[1-9][0-9\s-]{8,11}[0-9]$/;

function WelcomePopup() {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({ name: "", location: "", phone: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => {
      setOpen(true);
      track("popup_shown");
    }, POPUP_DELAY_MS);
    return () => window.clearTimeout(t);
  }, []);

  const set = (key: keyof typeof values, value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: "" }));
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!values.location.trim()) next.location = "Please enter your location.";
    if (!PHONE_RE.test(values.phone.trim())) next.phone = "Please enter your contact number.";
    if (!values.email.trim()) next.email = "Please enter your email address.";
    else if (!EMAIL_RE.test(values.email.trim())) next.email = "Please enter a valid email address.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    track("popup_form_submit");
    const lines = [
      "Consultation enquiry",
      "Name: " + values.name.trim(),
      "Location: " + values.location.trim(),
      "Contact number: " + values.phone.trim(),
      "Email: " + values.email.trim(),
    ];
    if (values.message.trim()) lines.push("Message: " + values.message.trim());
    window.open(wa(lines.join("\n")), "_blank");
    setSent(true);
  };

  const field =
    "w-full rounded-[3px] border border-input bg-card px-4 text-sm text-foreground placeholder:text-muted-foreground/55 outline-none transition-colors duration-300 hover:border-foreground/30 focus:border-primary";
  const errorText = "mt-1 block text-[0.75rem] text-destructive";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="left-1/2 top-1/2 z-50 w-[calc(100vw-24px)] max-w-[620px] -translate-x-1/2 -translate-y-1/2 gap-0 overflow-hidden rounded-[6px] border-border bg-cream p-0 shadow-[0_24px_70px_-24px_rgba(19,46,33,0.45)]
          data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95"
        showCloseButton
      >
        <DialogTitle className="sr-only">Request a consultation</DialogTitle>
        <DialogDescription className="sr-only">
          Share your name and contact number and the clinic team will call you back.
        </DialogDescription>

        <div className="no-scrollbar max-h-[calc(100dvh-56px)] overflow-y-auto overscroll-contain sm:max-h-[calc(100dvh-80px)]">
          {sent ? (
            <div className="p-6 text-center sm:p-8">
              <p className="font-display text-[1.4rem] text-foreground sm:text-[1.6rem]">
                Thank you. Your request has been received.
              </p>
              <p className="mx-auto mt-2.5 max-w-sm text-[0.88rem] leading-relaxed text-muted-foreground">
                Our team will call you back to confirm your slot. You can also
                continue on WhatsApp right away.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <a
                  href={WA_MAIN}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => track("popup_success_whatsapp_click")}
                  className={btnPrimary}
                >
                  <WhatsAppIcon className="h-[18px] w-[18px] text-[#25D366]" />
                  Continue on WhatsApp
                </a>
                <button type="button" onClick={() => setOpen(false)} className={btnOutline}>
                  Close
                </button>
              </div>
            </div>
          ) : (
            <div className="p-5 sm:p-7">
              <p className="eyebrow">Leelajani Ayur Care</p>
              <p className="font-display mt-1.5 text-[1.3rem] leading-tight text-foreground sm:mt-2 sm:text-[1.6rem]">
                Thinking about a consultation?
              </p>
              <p className="mt-1.5 text-[0.84rem] leading-relaxed text-muted-foreground sm:mt-2 sm:text-[0.88rem]">
                Leave your details and our team will call you back during
                clinic hours. Nothing is stored on this website.
              </p>

              <form onSubmit={submit} className="mt-4 space-y-3 sm:mt-6 sm:space-y-3.5" noValidate>
                <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                  <label className="block">
                    <span className="popup-label">Name *</span>
                    <input
                      type="text"
                      value={values.name}
                      onChange={(e) => set("name", e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      aria-invalid={!!errors.name}
                      className={field + " popup-field mt-1.5"}
                    />
                    {errors.name && <span className={errorText}>{errors.name}</span>}
                  </label>
                  <label className="block">
                    <span className="popup-label">Location *</span>
                    <input
                      type="text"
                      value={values.location}
                      onChange={(e) => set("location", e.target.value)}
                      placeholder="e.g. Trivandrum"
                      aria-invalid={!!errors.location}
                      className={field + " popup-field mt-1.5"}
                    />
                    {errors.location && <span className={errorText}>{errors.location}</span>}
                  </label>
                  <label className="block">
                    <span className="popup-label">Contact number *</span>
                    <input
                      type="tel"
                      value={values.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      placeholder="e.g. +91 98470 12345"
                      aria-invalid={!!errors.phone}
                      className={field + " popup-field mt-1.5"}
                    />
                    {errors.phone && <span className={errorText}>{errors.phone}</span>}
                  </label>
                  <label className="block">
                    <span className="popup-label">Email *</span>
                    <input
                      type="email"
                      value={values.email}
                      onChange={(e) => set("email", e.target.value)}
                      placeholder="e.g. you@example.com"
                      aria-invalid={!!errors.email}
                      className={field + " popup-field mt-1.5"}
                    />
                    {errors.email && <span className={errorText}>{errors.email}</span>}
                  </label>
                </div>

                <label className="block">
                  <span className="popup-label">Message</span>
                  <textarea
                    rows={3}
                    value={values.message}
                    onChange={(e) => set("message", e.target.value)}
                    placeholder="e.g. Psoriasis for the last two years (optional)"
                    className={field + " mt-1.5 min-h-[80px] py-2.5 resize-none"}
                  />
                </label>

                <div className="flex flex-col gap-3 pt-0.5 sm:flex-row">
                  <button type="submit" className={btnPrimary + " flex-1"}>
                    Book a consultation
                  </button>
                  <a
                    href={WA_MAIN}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => track("popup_whatsapp_click")}
                    className={btnOutline + " flex-1"}
                  >
                    <WhatsAppIcon className="h-[18px] w-[18px] text-[#25D366]" />
                    WhatsApp instead
                  </a>
                </div>

                <p className="pt-0.5 text-center text-[0.74rem] leading-relaxed text-muted-foreground">
                  We reply during clinic hours, Monday to Saturday, 7 AM to 7 PM.
                </p>
              </form>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-background pb-16 lg:pb-0">
      <Nav />
      <main>
        <Hero />
        <TrustStrip />
        <BookingForm />
        <Doctor />
        <Understanding />
        <TalkToUs />
        <PersonalizedCare />
        <Reviews />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <MobileCta />
      <FloatingContact />
      <WelcomePopup />
    </div>
  );
}
