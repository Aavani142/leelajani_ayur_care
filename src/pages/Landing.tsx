import { useState, type FormEvent } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/* ------------------------------------------------------------------ */
/* Brand assets (uploaded clinic files, do not replace)                */
/* ------------------------------------------------------------------ */

const LOGO = "/assets/Leelajani-Logo.png";
const DOC_PHOTO = "/assets/Le.webp";
/* Kerala Ayurveda setting, © Srijinfrancis, CC BY-SA 4.0 via Wikimedia Commons */
const AMBIENCE = "/assets/ambience.jpg";

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
  "inline-flex items-center justify-center rounded-[3px] px-7 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.18em] transition-all duration-300 active:scale-[0.98]";

const btnPrimary = `${btnBase} bg-primary text-primary-foreground hover:bg-primary/90`;
const btnOutline = `${btnBase} border border-foreground/25 text-foreground hover:border-foreground/60`;
const btnOnDark = `${btnBase} border border-cream/40 text-cream hover:bg-cream hover:text-foreground`;

/* ------------------------------------------------------------------ */
/* Botanical line mark, drawn once, reused quietly                     */
/* ------------------------------------------------------------------ */

function Sprig({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 160"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M60 156 C58 110 60 70 60 6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      {[30, 52, 74, 96, 118].map((y, i) => (
        <g key={y}>
          <path
            d={`M60 ${y + 14} C${44 - i * 2} ${y + 6} ${34 - i} ${y + 16} ${30 - i * 2} ${y + 28}`}
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d={`M60 ${y + 14} C${76 + i * 2} ${y + 6} ${86 + i} ${y + 16} ${90 + i * 2} ${y + 28}`}
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </g>
      ))}
    </svg>
  );
}

/* ================================================================== */
/* NAV                                                                */
/* ================================================================== */

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-cream/95 backdrop-blur-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:h-24">
        <a href="#" aria-label="Leelajani Ayur Care, back to top" className="shrink-0">
          <img
            src={LOGO}
            alt="Leelajani Ayur Care"
            className="h-14 w-auto object-contain sm:h-[4.5rem]"
            width={180}
            height={72}
          />
        </a>

        <nav className="hidden items-center gap-8 text-[0.8rem] font-medium text-muted-foreground lg:flex">
          <a href="#doctor" className="link-quiet hover:text-foreground">The doctor</a>
          <a href="#process" className="link-quiet hover:text-foreground">How it works</a>
          <a href="#reviews" className="link-quiet hover:text-foreground">Reviews</a>
          <a href="#faq" className="link-quiet hover:text-foreground">FAQ</a>
        </nav>

        <div className="flex items-center gap-6">
          <a
            href={"tel:" + PHONE_TEL}
            className="link-quiet hidden text-[0.85rem] text-muted-foreground hover:text-foreground xl:block"
          >
            {PHONE_DISPLAY}
          </a>
          <a href="#enquire" onClick={() => track("begin_book_click")} className={`${btnPrimary} px-5 py-3`}>
            Book a consultation
          </a>
        </div>
      </div>
    </header>
  );
}

/* ================================================================== */
/* 01 HERO  (editorial still life, no doctor portrait here)           */
/* ================================================================== */

function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const drift = useTransform(scrollY, [0, 600], [0, reduce ? 0 : -26]);

  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="hero-veil pointer-events-none absolute inset-0" aria-hidden="true" />
      <Sprig className="pointer-events-none absolute -left-6 bottom-10 h-56 w-auto text-primary/15" />

      <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
        {/* Copy */}
        <motion.div
          className="flex flex-col justify-center px-6 pb-16 pt-12 sm:pt-16 lg:py-32 lg:pl-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))] lg:pr-20"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.p variants={loadChild} custom={0} className="eyebrow">
            Psoriasis &amp; chronic skin care
          </motion.p>

          <motion.h1
            variants={loadChild}
            custom={1}
            className="font-display mt-5 text-[clamp(2.6rem,6vw,4.6rem)] leading-[1.04] text-foreground"
          >
            Psoriasis is personal.
            <br />
            <em className="text-primary">Your care should be too.</em>
          </motion.h1>

          <motion.p
            variants={loadChild}
            custom={2}
            className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-muted-foreground"
          >
            Personalized Ayurvedic consultation with Dr. Anusree Leela, BAMS,
            at Leelajani Ayur Care in Kowdiar or online.
          </motion.p>

          <motion.div variants={loadChild} custom={3} className="mt-9 flex flex-wrap items-center gap-4">
            <a href="#enquire" onClick={() => track("hero_book_click")} className={btnPrimary}>
              Book a consultation
            </a>
            <a href={WA_MAIN} target="_blank" rel="noreferrer" onClick={() => track("hero_whatsapp_click")} className={btnOutline}>
              WhatsApp us
            </a>
          </motion.div>

          <motion.div
            variants={loadChild}
            custom={4}
            className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.8rem] text-muted-foreground"
          >
            <span>Kowdiar, Trivandrum</span>
            <span aria-hidden="true" className="h-3 w-px bg-border" />
            <span>Online consultations available</span>
          </motion.div>
        </motion.div>

        {/* Real Kerala Ayurveda setting (© Srijinfrancis, CC BY-SA 4.0), with the booking card */}
        <div className="relative px-6 pb-16 sm:pb-20 lg:py-20 lg:pl-0">
          <motion.div
            style={{ y: drift }}
            className="relative mx-auto max-w-md lg:mr-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:ml-0"
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: easeOut, delay: 0.2 }}
          >
            <div
              aria-hidden="true"
              className="absolute -left-4 -top-4 h-full w-full border border-primary/30"
            />
            <div className="group relative aspect-[4/5] overflow-hidden bg-accent">
              <img
                src={AMBIENCE}
                alt="A calm Ayurvedic treatment space in Kerala with natural light and wooden interiors"
                className="h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.04]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,oklch(0.36_0.048_125/0.55)_100%)]"
              />

              {/* the appointment card, with real clinic facts */}
              <div className="absolute inset-x-5 bottom-5 border border-border bg-cream p-5">
                <p className="eyebrow">Consultation</p>
                <p className="font-display mt-2 text-xl leading-snug text-foreground">
                  Dr. Anusree Leela, BAMS
                </p>
                <div className="mt-3 space-y-1.5 border-t border-border pt-3 text-[0.8rem] text-muted-foreground">
                  <p>Leelajani Ayur Care, Kowdiar</p>
                  <p>Online consultation available</p>
                  <p>Monday to Saturday, 7 AM to 7 PM</p>
                </div>
              </div>
            </div>

            <p className="mt-4 text-center text-[0.78rem] text-muted-foreground/80">
              A calm room, an unhurried conversation. That is where care begins.
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
                  className={field + " mt-2 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%228%22%3E%3Cpath%20d%3D%22M1%201l5%205%205-5%22%20stroke%3D%22%23647052%22%20stroke-width%3D%221.5%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px_8px] bg-[position:right_1rem_center] bg-no-repeat pr-10"}
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
                  className={field + " mt-2 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%228%22%3E%3Cpath%20d%3D%22M1%201l5%205%205-5%22%20stroke%3D%22%23647052%22%20stroke-width%3D%221.5%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px_8px] bg-[position:right_1rem_center] bg-no-repeat pr-10"}
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
                Chat to book via WhatsApp
              </a>
            </div>

            <p className="mt-6 text-center text-[0.8rem] leading-relaxed text-muted-foreground">
              Our team will call you to confirm your slot. Your information is
              completely confidential and is not stored on this website.
            </p>
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
              <p className="mt-3 text-[0.78rem] text-muted-foreground">
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
                    <li key={p} className="py-3 text-[0.9rem] text-foreground">
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
          <div className="relative border border-border bg-cream p-8 sm:p-10">
            <Sprig className="absolute -right-4 -top-4 h-28 w-auto text-primary/20" />
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
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================== */
/* 05 EARLY ENQUIRY (sage background)                                 */
/* ================================================================== */
/* The detailed booking form now lives in section 02b.                */

function EnquiryForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [mode, setMode] = useState<"Clinic" | "Online">("Clinic");
  const [concern, setConcern] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    track("enquiry_submit");
    const lines = [
      "Psoriasis consultation enquiry",
      "Name: " + name,
      "Phone: " + phone,
    ];
    if (email.trim()) lines.push("Email: " + email);
    lines.push("Preferred consultation: " + mode);
    if (concern.trim()) lines.push("Concern: " + concern);
    window.open(wa(lines.join("\n")), "_blank");
    setSent(true);
  };

  const field =
    "w-full rounded-[3px] border border-input bg-cream px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors duration-300 hover:border-foreground/30 focus:border-primary";

  if (sent) {
    return (
      <div className="border border-border bg-cream p-8 sm:p-10">
        <p className="eyebrow">Thank you</p>
        <p className="font-display mt-3 text-2xl text-foreground">
          Thank you. Your enquiry has been received.
        </p>
        <p className="mt-3 text-[0.9rem] text-muted-foreground">
          Our team will reach out to you shortly. If WhatsApp did not open,
          you can continue the conversation there or call {PHONE_DISPLAY}.
        </p>
        <div className="mt-7 flex flex-wrap gap-4">
          <a
            href={WA_MAIN}
            target="_blank"
            rel="noreferrer"
            onClick={() => track("success_whatsapp_click")}
            className={btnPrimary}
          >
            Continue on WhatsApp
          </a>
          <a href={"tel:" + PHONE_TEL} onClick={() => track("success_call_click")} className={btnOutline}>
            Call {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="border border-border bg-cream p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block">
          <span className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Full name
          </span>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={field + " mt-2"}
            placeholder="Your name"
          />
        </label>
        <label className="block">
          <span className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Phone or WhatsApp
          </span>
          <input
            required
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={field + " mt-2"}
            placeholder="+91"
          />
        </label>
        <label className="block">
          <span className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Email
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={field + " mt-2"}
            placeholder="you@example.com"
          />
        </label>
      </div>

      <div className="mt-6">
        <span className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Preferred consultation
        </span>
        <div className="mt-2 grid max-w-xs grid-cols-2 border border-input">
          {(["Clinic", "Online"] as const).map((m) => (
            <button
              type="button"
              key={m}
              onClick={() => setMode(m)}
              aria-pressed={mode === m}
              className={
                "py-2.5 text-[0.78rem] font-medium uppercase tracking-[0.12em] transition-colors duration-300 " +
                (mode === m
                  ? "bg-foreground text-cream"
                  : "text-muted-foreground hover:text-foreground")
              }
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <label className="mt-6 block">
        <span className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Your concern (optional)
        </span>
        <textarea
          rows={3}
          value={concern}
          onChange={(e) => setConcern(e.target.value)}
          className={field + " mt-2 resize-none"}
          placeholder="Tell us briefly about what you have been experiencing."
        />
      </label>

      <button type="submit" className={btnPrimary + " mt-7 w-full sm:w-auto"}>
        Request a consultation
      </button>

      <p className="mt-4 text-[0.78rem] leading-relaxed text-muted-foreground">
        Your details are used only to contact you about this enquiry. Nothing
        is stored on this website.
      </p>
    </form>
  );
}

function EarlyEnquiry() {
  return (
    <section id="enquire" className="scroll-mt-24 bg-accent py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow">Early enquiry</p>
          <h2 className="font-display mt-4 text-[clamp(1.9rem,3.6vw,2.9rem)] leading-tight text-foreground">
            Let&rsquo;s start with a conversation.
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">
            Tell us a little about what you are experiencing and our team will
            help you with the next step.
          </p>
          <p className="mt-10 text-[0.85rem] text-muted-foreground">
            Not sure where to begin?{" "}
            <a
              href={WA_MAIN}
              target="_blank"
              rel="noreferrer"
              onClick={() => track("enquiry_whatsapp_click")}
              className="link-quiet font-medium text-foreground"
            >
              Chat with our team →
            </a>
          </p>
        </Reveal>
        <Reveal>
          <EnquiryForm />
        </Reveal>
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
          <h2 className="font-display max-w-md text-[clamp(1.9rem,3.6vw,2.9rem)] leading-tight text-foreground">
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
              <span aria-hidden="true" className="font-display text-4xl leading-none text-[#647052]/45 sm:text-5xl">
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
/* 07 HOW IT WORKS (offset editorial rows)                            */
/* ================================================================== */

const PROCESS = [
  { n: "01", title: "Share your concern", body: "Tell us briefly what you are experiencing." },
  { n: "02", title: "Speak with our team", body: "Our team helps arrange your consultation." },
  { n: "03", title: "Consult Dr. Anusree", body: "Have your consultation online or at the Kowdiar clinic." },
  { n: "04", title: "Receive your guidance", body: "Continue with personalized guidance and appropriate follow up." },
];

function HowItWorks() {
  return (
    <section id="process" className="scroll-mt-24 border-y border-border bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="max-w-xl">
          <h2 className="font-display text-[clamp(1.9rem,3.6vw,2.9rem)] leading-tight text-foreground">
            What happens after I enquire?
          </h2>
        </Reveal>

        <motion.ol
          className="mt-14 grid gap-x-16 gap-y-12 sm:grid-cols-2"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-70px" }}
        >
          {PROCESS.map((s, i) => (
            <motion.li
              key={s.n}
              variants={reveal}
              className={"relative border-t border-foreground/15 pt-6 " + (i % 2 === 1 ? "sm:mt-14" : "")}
            >
              <span aria-hidden="true" className="font-display absolute -top-7 right-0 text-7xl leading-none text-foreground/10">
                {s.n}
              </span>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-primary">
                Step {s.n}
              </p>
              <h3 className="font-display mt-3 text-2xl text-foreground">{s.title}</h3>
              <p className="mt-2 max-w-xs text-[0.92rem] leading-relaxed text-muted-foreground">
                {s.body}
              </p>
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
    detail: "Public listing reviews, linked below",
  },
  {
    quote:
      "Healing begins the moment you choose to care for yourself.",
    name: "Devananda",
    detail: "Video review, verified on leelajani.in",
  },
];

function Reviews() {
  return (
    <section id="reviews" className="scroll-mt-24 bg-cream py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Patient words</p>
            <h2 className="font-display mt-4 text-[clamp(1.9rem,3.6vw,2.9rem)] leading-tight text-foreground">
              What patients have shared
            </h2>
          </div>
          <div className="text-[0.85rem] text-muted-foreground">
            <span className="font-display text-2xl text-foreground">4.8</span>
            <span aria-hidden="true" className="mx-2 text-primary">★</span>
            on Google, from hundreds of patients.{" "}
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => track("reviews_google_click")}
              className="link-quiet font-medium text-foreground"
            >
              Read all reviews on Google →
            </a>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <figure className="flex h-full flex-col justify-between border border-border bg-card p-8 sm:p-10">
              <span aria-hidden="true" className="font-display text-6xl leading-none text-primary/30">
                &ldquo;
              </span>
              <blockquote className="mt-4 max-w-lg font-display text-[1.35rem] leading-snug text-foreground sm:text-2xl">
                {TESTIMONIALS[0].quote}
              </blockquote>
              <figcaption className="mt-8 border-t border-border pt-4 text-[0.82rem] text-muted-foreground">
                <span className="font-semibold text-foreground">{TESTIMONIALS[0].name}</span>
                <span className="mx-2" aria-hidden="true">·</span>
                {TESTIMONIALS[0].detail}
              </figcaption>
            </figure>
          </Reveal>

          <div className="grid gap-6">
            {TESTIMONIALS.slice(1).map((t) => (
              <Reveal key={t.name}>
                <figure className="flex h-full flex-col justify-between border border-border bg-card p-7">
                  <blockquote className="text-[0.95rem] leading-relaxed text-foreground">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-5 text-[0.78rem] text-muted-foreground">
                    <span className="font-semibold text-foreground">{t.name}</span>
                    <span className="mx-1.5" aria-hidden="true">·</span>
                    {t.detail}
                  </figcaption>
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
    q: "Will my care be personalized?",
    a: "Yes. Every plan is built around your consultation and adjusted as your skin responds.",
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
/* 10 FINAL CTA (terracotta moment)                                   */
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
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#enquire"
              onClick={() => track("final_book_click")}
              className={`${btnBase} bg-primary text-primary-foreground hover:bg-primary/90`}
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
              WhatsApp us
            </a>
          </div>
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
                className="h-16 w-auto object-contain"
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
          Ambience photograph by Srijinfrancis, via Wikimedia Commons, CC BY SA
          4.0.
        </p>
      </div>
    </footer>
  );
}

/* ================================================================== */
/* MOBILE STICKY CTA                                                  */
/* ================================================================== */

function MobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 border-t border-border bg-cream lg:hidden">
      <a
        href="#enquire"
        onClick={() => track("sticky_book_click")}
        className="flex h-14 items-center justify-center text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-foreground"
      >
        Book consultation
      </a>
      <a
        href={WA_MAIN}
        target="_blank"
        rel="noreferrer"
        onClick={() => track("sticky_whatsapp_click")}
        className="flex h-14 items-center justify-center bg-[#647052] text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-cream"
      >
        WhatsApp
      </a>
    </div>
  );
}

/* ================================================================== */
/* PAGE                                                               */
/* ================================================================== */

export default function Landing() {
  return (
    <div className="min-h-screen bg-background pb-14 lg:pb-0">
      <Nav />
      <main>
        <Hero />
        <TrustStrip />
        <BookingForm />
        <Doctor />
        <Understanding />
        <EarlyEnquiry />
        <PersonalizedCare />
        <HowItWorks />
        <Reviews />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <MobileCta />
    </div>
  );
}
