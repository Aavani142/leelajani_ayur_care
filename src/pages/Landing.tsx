import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Leaf,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Moon,
  Navigation,
  Phone,
  Sprout,
  Sun,
  Video,
  X,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Brand assets (uploaded clinic files — do not replace)               */
/* ------------------------------------------------------------------ */

const LOGO = "/assets/Leelajani-Logo.png";
const DOC_PHOTO = "/assets/Le.webp";

/* ------------------------------------------------------------------ */
/* Contact + facts (from leelajani.in)                                 */
/* ------------------------------------------------------------------ */

const PHONE_DISPLAY = "+91 79071 12699";
const PHONE_TEL = "+917907112699";
const EMAIL = "leelajanicare@gmail.com";
const ADDRESS =
  "Near Narmada Shopping Complex, Kowdiar, Thiruvananthapuram, Kerala 695003";
const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(
    "Leelajani Ayur Care, Near Narmada Shopping Complex, Kowdiar, Thiruvananthapuram, Kerala 695003",
  );

const wa = (msg: string) =>
  "https://wa.me/917907112699?text=" + encodeURIComponent(msg);

const WA_MAIN = wa(
  "Hello, I found your website. I'd like to ask about psoriasis treatment.",
);
const WA_BOOK = wa(
  "Hello, I'd like to book a consultation with Dr. Anusree Leela.",
);

const NAV_LINKS = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Psoriasis", href: "#psoriasis" },
  { label: "Consultation", href: "#consultation" },
  { label: "Contact", href: "#contact" },
];

const FAQS = [
  {
    q: "Can Ayurveda cure psoriasis?",
    a: "No system of medicine can promise that today, and it would be wrong of us to pretend otherwise. Psoriasis is long-term and it can come back, especially under stress or in winter. What treatment aims for is longer quiet stretches between flares, milder patches, and less dependence on creams just to get through the day. How much improvement is possible varies from person to person — that is exactly what the consultation is for.",
  },
  {
    q: "How long before I see a difference?",
    a: "Skin responds slowly. Some patients feel less itching within a few weeks; visible change in the patches usually takes longer — often a few months. Treatment is planned in phases with review points, not as an open-ended 'take this forever'.",
  },
  {
    q: "Do I need to come to Kowdiar, or can I consult online?",
    a: "Both. Many patients complete their first consultation on video call and only visit the clinic when a physical examination or Panchakarma therapy is needed. Follow-ups also work well online, with medicines dispatched to your address.",
  },
  {
    q: "Will I have to follow a very strict diet?",
    a: "The diet advice is built around your body type and your flare pattern, so it changes from patient to patient. It is usually more about regularity and a few specific avoidances than a punishing list. If a recommendation won't fit your life, say so — the plan is adjusted.",
  },
  {
    q: "Are the herbal medicines safe alongside my current treatment?",
    a: "This is exactly why the consultation asks about everything you take, including creams and any allopathic medicines. If you are under ongoing treatment elsewhere, mention it in the first call — interactions and timing are planned around it, and you should not stop prescribed medicines on your own.",
  },
  {
    q: "How do I start?",
    a: "Send a WhatsApp message describing your symptoms. The clinic coordinator will gather a few initial details and schedule your consultation — online or at the Kowdiar clinic.",
  },
];

/* ------------------------------------------------------------------ */
/* Motion language — slow, natural, premium                            */
/* ------------------------------------------------------------------ */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const loadParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
};
const loadChild: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE } },
};

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** One faint botanical line drawing — used once, in the hero. */
function BotanicalSprig({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 160"
      fill="none"
      aria-hidden
      className={`pointer-events-none text-current ${className}`}
    >
      <path
        d="M60 158 C 58 120, 58 80, 62 6"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      {[
        { x: 60, y: 34, flip: 1 },
        { x: 61, y: 58, flip: -1 },
        { x: 60, y: 84, flip: 1 },
        { x: 61, y: 110, flip: -1 },
      ].map((l, i) => (
        <path
          key={i}
          d={`M${l.x} ${l.y} C ${l.x + 18 * l.flip} ${l.y - 10}, ${l.x + 30 * l.flip} ${l.y - 2}, ${l.x + 34 * l.flip} ${l.y + 12} C ${l.x + 20 * l.flip} ${l.y + 8}, ${l.x + 8 * l.flip} ${l.y + 5}, ${l.x} ${l.y} Z`}
          stroke="currentColor"
          strokeWidth="1.1"
        />
      ))}
      <circle cx="62" cy="7" r="2.2" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Top bar + navigation                                                */
/* ------------------------------------------------------------------ */

function TopBar() {
  return (
    <div className="bg-forest text-primary-foreground/80">
      <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 text-xs sm:px-6">
        <p className="hidden sm:block">
          Kowdiar, Thiruvananthapuram — Ayurvedic care for psoriasis and
          chronic skin conditions
        </p>
        <p className="sm:hidden">Leelajani Ayur Care</p>
        <div className="flex items-center gap-5">
          <span className="hidden items-center gap-1.5 md:flex">
            <Clock className="size-3" /> Mon–Sat, 7 AM – 7 PM
          </span>
          <a
            href={`tel:${PHONE_TEL}`}
            className="flex items-center gap-1.5 transition-colors hover:text-primary-foreground"
          >
            <Phone className="size-3" /> {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? "bg-background/90 shadow-sm backdrop-blur-lg"
          : "bg-background/70 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:h-24 sm:px-6">
        {/* The full clinic logo, shown large and uncropped — no circle, no ring */}
        <a href="#top" aria-label="Leelajani Ayur Care — home" className="shrink-0">
          <img
            src={LOGO}
            alt="Leelajani Ayur Care"
            className="h-12 w-auto object-contain sm:h-[4.25rem]"
          />
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative text-sm font-medium text-foreground/70 transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:text-foreground hover:after:w-full"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={`tel:${PHONE_TEL}`}
            className="hidden text-sm font-semibold text-primary xl:block"
          >
            {PHONE_DISPLAY}
          </a>
          <Button
            asChild
            className="rounded-none bg-primary px-5 font-medium shadow-none active:scale-[0.98] sm:px-6"
          >
            <a href={WA_BOOK} target="_blank" rel="noopener noreferrer">
              Book consultation
            </a>
          </Button>
          <button
            className="inline-flex size-10 items-center justify-center border border-border lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t bg-background/95 px-4 py-3 backdrop-blur-lg lg:hidden">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block border-b border-border/50 px-2 py-3.5 text-[15px] font-medium last:border-0 hover:bg-accent/40"
            >
              {l.label}
            </a>
          ))}
          <a
            href={`tel:${PHONE_TEL}`}
            className="block px-2 py-3.5 text-[15px] font-semibold text-primary"
          >
            {PHONE_DISPLAY}
          </a>
        </div>
      ) : null}
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  return (
    <section id="top" className="hero-veil relative overflow-hidden">
      <BotanicalSprig className="absolute top-24 right-[5%] hidden h-72 w-52 text-primary opacity-[0.12] lg:block" />
      <motion.div
        variants={loadParent}
        initial="hidden"
        animate="show"
        className="relative mx-auto grid max-w-7xl gap-12 px-4 pt-12 pb-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20 lg:pt-14 lg:pb-24"
      >
        <div>
          <motion.div variants={loadChild}>
            <p className="flex items-center gap-2 text-[13px] font-semibold tracking-[0.08em] text-primary uppercase">
              <MapPin className="size-3.5" /> Kowdiar · Thiruvananthapuram
            </p>
          </motion.div>

          <motion.h1
            variants={loadChild}
            className="font-display mt-6 text-[2.6rem] leading-[1.06] font-semibold tracking-tight text-balance sm:text-6xl"
          >
            Psoriasis care,
            <br />
            <span className="text-primary">the Ayurvedic way.</span>
          </motion.h1>

          <motion.p
            variants={loadChild}
            className="mt-6 max-w-md text-[17px] leading-relaxed text-muted-foreground"
          >
            Dr. Anusree Leela, BAMS, treats chronic skin disease by looking at
            the whole picture — digestion, routine, stress — not just the
            patches.
          </motion.p>

          <motion.div variants={loadChild} className="mt-9 flex flex-wrap items-center gap-5">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-none bg-primary px-8 text-[15px] font-medium shadow-none transition-colors hover:bg-primary/90 active:scale-[0.98]"
            >
              <a href={WA_BOOK} target="_blank" rel="noopener noreferrer">
                Book a consultation
              </a>
            </Button>
            <a
              href="#psoriasis"
              className="link-quiet text-sm font-semibold text-foreground"
            >
              About the condition
            </a>
          </motion.div>

          <motion.div variants={loadChild} className="mt-12 max-w-sm">
            <div className="h-px w-16 bg-primary/40" />
            <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
              In person at the Kowdiar clinic, or by video call — medicines
              can be dispatched to your address.
            </p>
          </motion.div>
        </div>

        {/* The doctor's photograph, presented plainly and professionally */}
        <motion.div variants={loadChild} className="mx-auto w-full max-w-sm lg:max-w-none">
          <div ref={ref} className="group">
            <div className="overflow-hidden border border-border/60 shadow-lg shadow-foreground/5">
              <motion.div style={reduce ? undefined : { y }} className="will-change-transform">
                <img
                  src={DOC_PHOTO}
                  alt="Dr. Anusree Leela, BAMS — Chief Physician, Leelajani Ayur Care"
                  className="aspect-[4/5] w-full scale-[1.08] object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.13]"
                  loading="eager"
                  decoding="async"
                />
              </motion.div>
            </div>
            <p className="mt-4 flex items-baseline justify-between text-[13px]">
              <span className="font-semibold">Dr. Anusree Leela</span>
              <span className="text-muted-foreground">BAMS · Chief Physician</span>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/** Thin, quiet strip under the hero — dots, not icons. */
function TrustStrip() {
  const items = [
    "Care led by a BAMS physician",
    "In-person & online consultations",
    "Plans built diet, routine and history",
    "Regular follow-up reviews",
  ];
  return (
    <section className="border-y border-border/60 bg-accent/25">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-8 gap-y-2.5 px-4 py-5 sm:px-6">
        {items.map((t, i) => (
          <Reveal key={t} delay={i * 0.05}>
            <p className="flex items-center gap-2.5 text-[13px] font-medium text-foreground/80">
              <span className="size-1 rounded-full bg-primary/70" />
              {t}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Psoriasis — the one sticky-column section                           */
/* ------------------------------------------------------------------ */

function Psoriasis() {
  return (
    <section id="psoriasis" className="scroll-mt-28 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <p className="eyebrow">Understanding psoriasis</p>
              <h2 className="font-display mt-2.5 max-w-md text-3xl leading-tight font-semibold text-balance sm:text-4xl">
                A chronic condition that runs in cycles
              </h2>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground">
                Psoriasis is an inflammatory skin condition — raised, scaly
                patches that commonly appear on the scalp, elbows, knees and
                lower back, often with itching and dryness.
              </p>
            </Reveal>
          </div>

          <div>
            <Reveal>
              <div className="space-y-4 text-[15px] leading-relaxed text-foreground/85">
                <p>
                  Quiet periods, then a flare. In Ayurvedic practice,
                  psoriasis is understood as an imbalance involving the doshas
                  and the skin tissue — but the practical question is the same
                  whichever way you describe it:{" "}
                  <em>what is setting this particular patient's flares off?</em>
                </p>
                <p>
                  Psoriasis is not contagious and not caused by poor hygiene.
                  It is, however, stubborn — which is why a plan built for one
                  person rarely works when copied for another.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <p className="mt-12 text-[11px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                What commonly sets flares off
              </p>
            </Reveal>
            <div className="mt-1 divide-y divide-border/70 border-y border-border/70">
              {[
                {
                  icon: Moon,
                  t: "Stress and poor sleep",
                  d: "Patches often worsen during difficult periods — exams, work pressure, family stress. Skin and mind are closely linked.",
                },
                {
                  icon: Sprout,
                  t: "Digestion",
                  d: "In Ayurveda, skin is a mirror of the gut. Irregular meals, heavy food and low digestive fire are looked at carefully.",
                },
                {
                  icon: Sun,
                  t: "Season and weather",
                  d: "Flares are common in winter and with sudden weather changes. Plans are adjusted seasonally, not fixed once and forgotten.",
                },
                {
                  icon: Leaf,
                  t: "Skin care habits",
                  d: "Hot water, harsh soaps and scratching feel relieving but usually make things worse. Small corrections go a long way.",
                },
              ].map((f, i) => (
                <Reveal key={f.t} delay={i * 0.05}>
                  <div className="flex gap-5 py-5">
                    <f.icon className="mt-0.5 size-5 shrink-0 text-primary/70" strokeWidth={1.5} />
                    <div>
                      <h3 className="text-[15px] font-semibold tracking-tight">{f.t}</h3>
                      <p className="mt-1 max-w-lg text-sm leading-relaxed text-muted-foreground">{f.d}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Doctor — quiet text section with a note in her own words            */
/* ------------------------------------------------------------------ */

function Doctor() {
  return (
    <section id="about" className="scroll-mt-28 border-t border-border/60 py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Reveal>
          <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Dr. Anusree Leela
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            BAMS · Chief Physician, Leelajani Ayur Care, Kowdiar
          </p>
        </Reveal>

        <div className="mt-9 grid gap-8 md:grid-cols-2">
          <Reveal>
            <p className="text-[15px] leading-relaxed text-foreground/85">
              Each treatment is built from the patient's own history — flare
              pattern, digestion, body constitution, and the realities of
              daily life. Panchakarma is used, but only where the clinical
              picture calls for it.
            </p>
          </Reveal>
          <Reveal delay={0.07}>
            <p className="text-[15px] leading-relaxed text-foreground/85">
              Her practice covers chronic skin conditions, lifestyle disorders
              and general Ayurvedic medicine, with consultations at the
              Kowdiar clinic and online for patients across Kerala and beyond.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <figure className="mt-14 border-l-2 border-primary/50 pl-6 sm:pl-8">
            <blockquote className="font-display text-xl leading-relaxed text-foreground/90 sm:text-[1.4rem]">
              "Skin conditions don't reveal their triggers in ten minutes. My
              first consultation runs long on purpose — your routine, your
              digestion, your stress, what you've already tried. Treatment is
              built from all of it, and adjusted as your skin responds."
            </blockquote>
            <figcaption className="mt-4 text-sm text-muted-foreground">
              — Dr. Anusree Leela
            </figcaption>
          </figure>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="mt-16 text-[11px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
            The first consultation covers
          </p>
          <div className="mt-3 grid gap-x-14 border-t border-border/70 sm:grid-cols-2">
            {[
              ["A detailed history", "When it started, what has helped, what hasn't — creams, tablets, home remedies, everything."],
              ["Your daily routine", "Food, sleep, work, stress. Not a checklist — a conversation about how a normal day actually goes."],
              ["Digestion and diet", "Appetite, bowel habit, what you eat. In Ayurveda this sits at the centre of skin health."],
              ["The plan, written down", "Formulations, diet guidance, skin care, and what follow-up will look like."],
            ].map(([t, d]) => (
              <div key={t} className="border-b border-border/70 py-4">
                <h3 className="text-[15px] font-semibold tracking-tight">{t}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Full-width CTA band                                                 */
/* ------------------------------------------------------------------ */

function CtaBand() {
  return (
    <section className="band-forest text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-20">
        <Reveal>
          <h2 className="font-display max-w-lg text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl">
            Begin with a conversation, not a prescription
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-primary-foreground/75">
            Send your old reports, or simply describe your symptoms. The
            clinic team will explain what a first consultation involves and
            fit you in — online or at Kowdiar.
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-none bg-primary-foreground px-7 text-sm font-semibold text-primary hover:bg-primary-foreground/90 active:scale-[0.98]"
            >
              <a href={WA_BOOK} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="size-4" /> Book on WhatsApp
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-none border-primary-foreground/35 bg-transparent px-7 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground active:scale-[0.98]"
            >
              <a href={`tel:${PHONE_TEL}`}>
                <Phone className="size-4" /> {PHONE_DISPLAY}
              </a>
            </Button>
          </div>
          <p className="mt-5 flex items-center gap-2 text-xs text-primary-foreground/60 lg:justify-end">
            <Clock className="size-3.5" /> Mon–Sat, 7 AM – 7 PM · Sundays closed
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Process — the one numbered section                                  */
/* ------------------------------------------------------------------ */

function Process() {
  const steps = [
    {
      t: "You send an enquiry",
      d: "A WhatsApp message with your primary concern is enough to start.",
    },
    {
      t: "The coordinator collects initial details",
      d: "Basic health information is gathered before your consultation is scheduled.",
    },
    {
      t: "You consult Dr. Anusree Leela",
      d: "A detailed clinical assessment: history, symptoms, digestion, lifestyle and constitution. Online or at the Kowdiar clinic.",
    },
    {
      t: "You receive a written plan",
      d: "Herbal formulations, diet guidance, skin care, and lifestyle changes specific to you.",
    },
    {
      t: "Follow-ups keep it on track",
      d: "Progress is reviewed and the plan adjusted — psoriasis care rarely gets it right on the first try.",
    },
  ];

  return (
    <section id="consultation" className="scroll-mt-28 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-3xl leading-tight font-semibold text-balance sm:text-4xl">
            What happens after you write in
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
            Care doesn't end when medicines are handed over. Reviews are part
            of the plan — that's how it gets adjusted as your skin responds.
          </p>
        </Reveal>

        <ol className="mt-12 max-w-3xl">
          {steps.map((s, i) => (
            <Reveal key={s.t} delay={i * 0.05}>
              <li className="group flex gap-6 border-b border-border/70 py-6 first:pt-0 sm:gap-8">
                <span
                  className={`font-display shrink-0 text-2xl leading-none font-semibold transition-colors duration-300 sm:text-3xl ${
                    i === steps.length - 1
                      ? "text-primary"
                      : "text-foreground/20 group-hover:text-primary/50"
                  }`}
                >
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold tracking-tight">{s.t}</h3>
                  <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

function Faqs() {
  return (
    <section className="border-y border-border/60 bg-accent/25 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="max-w-xl">
          <p className="eyebrow">Questions patients ask</p>
          <h2 className="font-display mt-2.5 text-3xl leading-tight font-semibold sm:text-4xl">
            Before you decide
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
            Straight answers to the things people usually want to know before
            starting treatment.
          </p>
        </Reveal>

        <Reveal delay={0.06} className="mt-10 max-w-3xl">
          <Accordion
            type="single"
            collapsible
            className="border-t border-border/70 [&_[data-slot=accordion-item]]:border-b [&_[data-slot=accordion-item]]:border-border/70"
          >
            {FAQS.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`} className="bg-transparent">
                <AccordionTrigger className="py-5 text-left text-[15px] font-semibold hover:no-underline hover:text-primary">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <p className="mt-7 text-sm text-muted-foreground">
            Question not covered here?{" "}
            <a
              href={WA_MAIN}
              target="_blank"
              rel="noopener noreferrer"
              className="link-quiet font-medium text-primary"
            >
              Ask the clinic on WhatsApp
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

function Contact() {
  return (
    <section id="contact" className="scroll-mt-28 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-14 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
          {/* Enquiry form → WhatsApp */}
          <div>
            <Reveal className="max-w-xl">
              <h2 className="font-display text-3xl leading-tight font-semibold text-balance sm:text-4xl">
                Tell us about your skin
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                Fill this in and it opens in WhatsApp, addressed to the clinic
                team. Nothing is stored on this website — the conversation
                stays between you and the clinic.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <form
                className="mt-10 space-y-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  const parts = [
                    `Hello, I'd like to enquire about psoriasis care.`,
                    fd.get("name") ? `Name: ${fd.get("name")}` : null,
                    fd.get("duration") ? `Symptoms present for: ${fd.get("duration")}` : null,
                    fd.get("areas") ? `Affected areas: ${fd.get("areas")}` : null,
                    fd.get("treatments") ? `Treatments tried: ${fd.get("treatments")}` : null,
                    fd.get("notes") ? `Notes: ${fd.get("notes")}` : null,
                  ].filter(Boolean);
                  window.open(wa(parts.join("\n")), "_blank", "noopener,noreferrer");
                }}
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block text-sm">
                    <span className="font-medium">Name</span>
                    <input
                      name="name"
                      required
                      autoComplete="name"
                      placeholder="Your name"
                      className="mt-2 w-full rounded-none border-0 border-b border-input bg-transparent px-0 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary"
                    />
                  </label>
                  <label className="block text-sm">
                    <span className="font-medium">Symptoms present for</span>
                    <select
                      name="duration"
                      defaultValue=""
                      required
                      className="mt-2 w-full cursor-pointer appearance-none rounded-none border-0 border-b border-input bg-transparent py-2 text-sm outline-none focus:border-primary"
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23555' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 0.2rem center",
                      }}
                    >
                      <option value="" disabled>
                        Select
                      </option>
                      <option>Under 6 months</option>
                      <option>6 months – 2 years</option>
                      <option>2 – 5 years</option>
                      <option>Over 5 years</option>
                    </select>
                  </label>
                  <label className="block text-sm sm:col-span-2">
                    <span className="font-medium">Areas affected</span>
                    <input
                      name="areas"
                      placeholder="e.g. scalp, elbows, lower back"
                      className="mt-2 w-full rounded-none border-0 border-b border-input bg-transparent px-0 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary"
                    />
                  </label>
                  <label className="block text-sm sm:col-span-2">
                    <span className="font-medium">Treatments already tried</span>
                    <input
                      name="treatments"
                      placeholder="Creams, tablets, home remedies — anything"
                      className="mt-2 w-full rounded-none border-0 border-b border-input bg-transparent px-0 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary"
                    />
                  </label>
                  <label className="block text-sm sm:col-span-2">
                    <span className="font-medium">Anything else worth sharing?</span>
                    <textarea
                      name="notes"
                      rows={2}
                      placeholder="Current medication, other conditions, preferred timing…"
                      className="mt-2 w-full resize-none rounded-none border-0 border-b border-input bg-transparent px-0 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary"
                    />
                  </label>
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="h-12 rounded-none bg-primary px-8 text-[15px] font-medium shadow-none active:scale-[0.98]"
                >
                  <MessageCircle className="size-4" /> Send enquiry on WhatsApp
                </Button>
              </form>
            </Reveal>
          </div>

          {/* Clinic details */}
          <div className="lg:pt-2">
            <Reveal delay={0.1}>
              <div className="space-y-7">
                {[
                  {
                    icon: MapPin,
                    label: "Clinic",
                    body: (
                      <>
                        Leelajani Ayur Care
                        <span className="block text-sm text-muted-foreground">
                          Near Narmada Shopping Complex, Kowdiar · Thiruvananthapuram, Kerala 695003
                        </span>
                      </>
                    ),
                  },
                  {
                    icon: Clock,
                    label: "Hours",
                    body: (
                      <>
                        Mon–Sat, 7:00 AM – 7:00 PM
                        <span className="block text-sm text-muted-foreground">
                          Sundays closed · Phone answered during clinic hours
                        </span>
                      </>
                    ),
                  },
                  {
                    icon: Phone,
                    label: "Phone & WhatsApp",
                    body: (
                      <a href={`tel:${PHONE_TEL}`} className="link-quiet">
                        {PHONE_DISPLAY}
                      </a>
                    ),
                  },
                  {
                    icon: Mail,
                    label: "Email",
                    body: (
                      <a href={`mailto:${EMAIL}`} className="link-quiet">
                        {EMAIL}
                      </a>
                    ),
                  },
                  {
                    icon: Video,
                    label: "Online consultation",
                    body: "Available for first consults and follow-ups; medicines dispatched to your address.",
                  },
                ].map((c) => (
                  <div key={c.label} className="flex gap-4">
                    <c.icon className="mt-1 size-4.5 shrink-0 text-primary/70" strokeWidth={1.5} />
                    <div>
                      <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                        {c.label}
                      </p>
                      <p className="mt-1 text-[15px] font-medium">{c.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.14}>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-10 flex items-center justify-between border border-border/70 bg-accent/25 px-6 py-5 transition-colors hover:border-primary/40"
              >
                <span>
                  <span className="font-display block text-lg font-semibold tracking-tight">
                    Get directions
                  </span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    Opens in Google Maps
                  </span>
                </span>
                <Navigation className="size-5 text-primary transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer className="band-forest text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:gap-12">
          <div>
            <a href="#top" aria-label="Leelajani Ayur Care — back to top" className="inline-block bg-card p-3">
              <img
                src={LOGO}
                alt="Leelajani Ayur Care"
                className="h-11 w-auto object-contain"
              />
            </a>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-primary-foreground/70">
              Ayurvedic care for psoriasis and chronic skin conditions, led by
              Dr. Anusree Leela, BAMS. Kowdiar, Thiruvananthapuram — in person
              and online.
            </p>
          </div>
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-primary-foreground/55 uppercase">
              On this page
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-primary-foreground/80 transition-colors hover:text-primary-foreground"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-primary-foreground/55 uppercase">
              The clinic
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/80">
              <li>{ADDRESS}</li>
              <li>
                <a href={`tel:${PHONE_TEL}`} className="transition-colors hover:text-primary-foreground">
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="transition-colors hover:text-primary-foreground">
                  {EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-primary-foreground/15 pt-6">
          <p className="text-xs leading-relaxed text-primary-foreground/60">
            The information on this page is for general awareness only and is
            not a substitute for a consultation. Treatment is decided case by
            case after a doctor's assessment.
          </p>
          <p className="mt-3 text-xs text-primary-foreground/60">
            © {new Date().getFullYear()} Leelajani Ayur Care · Kowdiar, Thiruvananthapuram, Kerala
          </p>
        </div>
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      href={WA_MAIN}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with the clinic on WhatsApp"
      className="fixed right-5 bottom-5 z-50 flex size-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-xl transition-all hover:scale-105 hover:bg-[#1fb857] active:scale-95"
    >
      <MessageCircle className="size-6" />
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Landing() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <Psoriasis />
        <Doctor />
        <CtaBand />
        <Process />
        <Faqs />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
