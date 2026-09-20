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
  ArrowUpRight,
  Clock,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Navigation,
  Phone,
  Video,
  X,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Brand assets (uploaded clinic files, do not replace)                */
/* ------------------------------------------------------------------ */

const LOGO = "/assets/Leelajani-Logo.png";
const DOC_PHOTO = "/assets/Le.webp";

/* ------------------------------------------------------------------ */
/* Contact and facts (from leelajani.in)                               */
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
  "Hello, I found your website. I would like to ask about psoriasis treatment.",
);
const WA_BOOK = wa(
  "Hello, I would like to book a consultation with Dr. Anusree Leela.",
);

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Psoriasis", href: "#psoriasis" },
  { label: "Consultation", href: "#consultation" },
  { label: "Contact", href: "#contact" },
];

const FAQS = [
  {
    q: "Can Ayurveda cure psoriasis?",
    a: "No system of medicine can promise that today, and it would be wrong of us to pretend otherwise. Psoriasis is long term and it can come back, especially under stress or in winter. What treatment aims for is longer quiet stretches between flares, milder patches, and less dependence on creams just to get through the day. How much improvement is possible varies from person to person, and that is exactly what the consultation is for.",
  },
  {
    q: "How long before I see a difference?",
    a: "Skin responds slowly. Some patients feel less itching within a few weeks; visible change in the patches usually takes longer, often a few months. Treatment is planned in phases with review points, never as an open invitation to take medicines forever.",
  },
  {
    q: "Do I need to come to Kowdiar, or can I consult online?",
    a: "Both. Many patients complete their first consultation on video call and only visit the clinic when a physical examination or Panchakarma therapy is needed. Reviews also work well online, with medicines dispatched to your address.",
  },
  {
    q: "Will I have to follow a very strict diet?",
    a: "The diet advice is built around your body type and your flare pattern, so it changes from patient to patient. It is usually more about regularity and a few specific avoidances than a punishing list. If a recommendation will not fit your life, say so. The plan is adjusted.",
  },
  {
    q: "Are the herbal medicines safe alongside my current treatment?",
    a: "This is exactly why the consultation asks about everything you take, including creams and any allopathic medicines. If you are under treatment elsewhere, mention it in the first call. Interactions and timing are planned around it, and you should not stop prescribed medicines on your own.",
  },
  {
    q: "How do I start?",
    a: "Send a WhatsApp message describing your symptoms. The clinic coordinator will gather a few initial details and schedule your consultation, online or at the Kowdiar clinic.",
  },
];

/* ------------------------------------------------------------------ */
/* Motion language: slow, natural, quiet                               */
/* ------------------------------------------------------------------ */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const loadParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const loadChild: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: EASE } },
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
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.85, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** One faint botanical line drawing, used once, in the hero. */
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
/* Shared button styling: quiet, rectangular, small caps               */
/* ------------------------------------------------------------------ */

const BTN_PRIMARY =
  "h-13 rounded-none bg-primary px-9 text-xs font-semibold uppercase tracking-[0.14em] shadow-none transition-all hover:bg-primary/90 active:scale-[0.98]";
const BTN_CREAM =
  "h-13 rounded-none bg-primary-foreground px-8 text-xs font-semibold uppercase tracking-[0.14em] text-primary hover:bg-primary-foreground/90 active:scale-[0.98]";
const BTN_GHOST_DARK =
  "h-13 rounded-none border border-primary-foreground/35 bg-transparent px-8 text-xs font-semibold uppercase tracking-[0.14em] text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground active:scale-[0.98]";

/* ------------------------------------------------------------------ */
/* Top bar and navigation                                              */
/* ------------------------------------------------------------------ */

function TopBar() {
  return (
    <div className="bg-forest text-primary-foreground/75">
      <div className="mx-auto flex h-9 max-w-[88rem] items-center justify-between px-4 text-xs sm:px-6 lg:px-10">
        <p className="hidden sm:block">
          Kowdiar, Thiruvananthapuram · Ayurvedic care for psoriasis and
          chronic skin conditions
        </p>
        <p className="sm:hidden">Leelajani Ayur Care</p>
        <div className="flex items-center gap-5">
          <span className="hidden items-center gap-1.5 md:flex">
            <Clock className="size-3" /> Mon to Sat, 7 AM to 7 PM
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
      <div className="mx-auto flex h-20 max-w-[88rem] items-center justify-between px-4 sm:h-24 sm:px-6 lg:px-10">
        <a href="#top" aria-label="Leelajani Ayur Care, home" className="shrink-0">
          <img
            src={LOGO}
            alt="Leelajani Ayur Care"
            className="h-12 w-auto object-contain sm:h-[4.25rem]"
          />
        </a>

        <nav className="hidden items-center gap-9 lg:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative text-[13px] font-medium tracking-[0.02em] text-foreground/70 transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:text-foreground hover:after:w-full"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button asChild className={BTN_PRIMARY + " px-6 sm:px-7"}>
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
/* Hero: editorial masthead, display serif, photograph on a forest mat  */
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
    <section id="top" className="hero-veil relative">
      <BotanicalSprig className="absolute bottom-24 left-[2%] hidden h-64 w-44 -scale-x-100 text-primary opacity-[0.1] xl:block" />
      <motion.div
        variants={loadParent}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-10"
      >
        {/* Masthead row */}
        <motion.div
          variants={loadChild}
          className="flex items-baseline justify-between gap-6 border-b border-foreground/10 pt-7 pb-4 text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase"
        >
          <span>Ayurvedic medicine</span>
          <span className="hidden sm:inline">Kowdiar, Kerala</span>
          <span className="text-primary">Psoriasis · Skin</span>
        </motion.div>

        <div className="grid gap-12 pt-10 pb-16 sm:pt-14 lg:grid-cols-12 lg:gap-0 lg:pt-12 lg:pb-0">
          {/* Display copy */}
          <div className="lg:col-span-7 lg:pr-20 lg:pt-8 lg:pb-28">
            <motion.h1
              variants={loadChild}
              className="font-display text-[clamp(2.9rem,6.5vw,5.4rem)] leading-[1.03] font-[380] tracking-[-0.02em] text-balance"
            >
              Psoriasis care,
              <br />
              <span className="text-primary italic">the Ayurvedic way.</span>
            </motion.h1>

            <motion.p
              variants={loadChild}
              className="mt-8 max-w-md text-[17px] leading-relaxed text-muted-foreground"
            >
              Dr. Anusree Leela reads the whole picture: digestion, routine,
              stress, not just the patches. Consultations run long, plans are
              written down, and questions get straight answers.
            </motion.p>

            <motion.div
              variants={loadChild}
              className="mt-10 flex flex-wrap items-center gap-6"
            >
              <Button asChild size="lg" className={BTN_PRIMARY}>
                <a href={WA_BOOK} target="_blank" rel="noopener noreferrer">
                  Book a consultation
                </a>
              </Button>
              <a
                href={`tel:${PHONE_TEL}`}
                className="link-quiet text-[15px] font-medium text-foreground"
              >
                {PHONE_DISPLAY}
              </a>
            </motion.div>

            <motion.div
              variants={loadChild}
              className="mt-16 hidden max-w-md items-center justify-between border-t border-foreground/10 pt-4 text-xs text-muted-foreground lg:flex"
            >
              <span>Mon to Sat, 7 AM to 7 PM</span>
              <span>In person & video</span>
              <span>Kerala 695003</span>
            </motion.div>
          </div>

          {/* Photograph on a deep green mat, bleeding off the right edge */}
          <motion.div
            variants={loadChild}
            className="relative lg:col-span-5 lg:mb-[-6rem] lg:mr-[min(-2.5rem,calc((88rem-100vw)/2))]"
          >
            <div ref={ref} className="group relative">
              <div className="bg-forest p-4 sm:p-5 lg:p-7">
                <div className="overflow-hidden">
                  <motion.div
                    style={reduce ? undefined : { y }}
                    className="will-change-transform"
                  >
                    <img
                      src={DOC_PHOTO}
                      alt="Dr. Anusree Leela, BAMS, Chief Physician of Leelajani Ayur Care"
                      className="h-[26rem] w-full scale-[1.06] object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.1] sm:h-[32rem] lg:h-[41rem]"
                      loading="eager"
                      decoding="async"
                    />
                  </motion.div>
                </div>
              </div>

              {/* Caption plate, desktop */}
              <div className="absolute bottom-7 left-7 hidden bg-background px-6 py-5 lg:block">
                <p className="font-display text-lg font-[420]">
                  Dr. Anusree Leela
                </p>
                <p className="mt-0.5 text-xs tracking-wide text-muted-foreground">
                  BAMS · Chief Physician, Leelajani Ayur Care
                </p>
              </div>
            </div>

            {/* Caption, mobile */}
            <p className="mt-3 text-[13px] lg:hidden">
              <span className="font-semibold">Dr. Anusree Leela</span>
              <span className="text-muted-foreground">
                {" "}
                · BAMS, Chief Physician
              </span>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Areas of care: an index, not cards                                  */
/* ------------------------------------------------------------------ */

const CARE_AREAS = [
  {
    t: "Psoriasis & chronic skin conditions",
    d: "The primary focus of the clinic: flares, scaling and itching, and the long quiet stretches in between.",
  },
  {
    t: "Lifestyle & metabolic disorders",
    d: "Conditions such as diabetes, thyroid imbalance and obesity, addressed through diet, routine and herbal support.",
  },
  {
    t: "General Ayurvedic medicine",
    d: "Digestion, sleep, joint pain, fatigue. Everyday complaints that deserve to be looked at properly.",
  },
  {
    t: "Panchakarma therapy",
    d: "Used selectively, where the clinical picture calls for it. Never a default package.",
  },
  {
    t: "Online consultation & follow up",
    d: "First consults and reviews by video, with medicines dispatched across Kerala.",
  },
];

function CareAreas() {
  return (
    <section className="pt-24 pb-20 lg:pt-44 lg:pb-28">
      <div className="mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">Areas of care</p>
            <h2 className="font-display mt-3 max-w-xs text-[clamp(1.9rem,3vw,2.6rem)] leading-[1.1] font-[400] tracking-[-0.01em]">
              What patients come in for
            </h2>
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-muted-foreground">
              Treatment is decided after a doctor's assessment, never from a
              menu. These are the consultations the clinic most often sees.
            </p>
          </Reveal>

          <div className="lg:col-span-8">
            <div className="border-t border-foreground/10">
              {CARE_AREAS.map((c, i) => (
                <Reveal key={c.t} delay={i * 0.04}>
                  <a
                    href={WA_MAIN}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group grid items-baseline gap-1 border-b border-foreground/10 py-6 transition-colors hover:bg-accent/25 sm:grid-cols-12 sm:gap-6 sm:py-7"
                  >
                    <span className="font-display text-sm font-[420] text-primary/60 sm:col-span-1">
                      0{i + 1}
                    </span>
                    <h3 className="font-display text-[1.35rem] leading-snug font-[420] tracking-[-0.01em] transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-primary sm:col-span-5">
                      {c.t}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground sm:col-span-5">
                      {c.d}
                    </p>
                    <span className="hidden justify-end sm:col-span-1 sm:flex">
                      <ArrowUpRight className="size-5 -translate-x-1 text-primary opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.1}>
              <p className="mt-5 text-[13px] text-muted-foreground">
                Not sure where your concern fits?{" "}
                <a
                  href={WA_MAIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-quiet font-medium text-primary"
                >
                  Describe it to the clinic
                </a>{" "}
                and you will be pointed to the right consultation.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Psoriasis: sticky editorial column                                  */
/* ------------------------------------------------------------------ */

function Psoriasis() {
  return (
    <section
      id="psoriasis"
      className="scroll-mt-28 border-t border-foreground/10 py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
            <Reveal>
              <p className="eyebrow">Understanding psoriasis</p>
              <h2 className="font-display mt-3 max-w-md text-[clamp(1.9rem,3vw,2.6rem)] leading-[1.1] font-[400] tracking-[-0.01em] text-balance">
                A chronic condition that runs in cycles
              </h2>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted-foreground">
                Raised, scaly patches, commonly on the scalp, elbows, knees
                and lower back, often with itching and dryness. Quiet
                periods, then a flare.
              </p>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground">
                Psoriasis is not contagious and not caused by poor hygiene.
                It is stubborn, though, which is why a plan built for one
                person rarely works when copied for another.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:col-start-7">
            <Reveal>
              <p className="text-[11px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                What commonly sets flares off
              </p>
            </Reveal>
            <div className="mt-1 divide-y divide-foreground/10 border-y border-foreground/10">
              {[
                {
                  t: "Stress and poor sleep",
                  d: "Patches often worsen during difficult periods: exams, work pressure, family stress. Skin and mind are closely linked.",
                },
                {
                  t: "Digestion",
                  d: "In Ayurveda, skin is a mirror of the gut. Irregular meals, heavy food and low digestive fire are looked at carefully.",
                },
                {
                  t: "Season and weather",
                  d: "Flares are common in winter and with sudden weather changes. Plans are adjusted with the season, not fixed once and forgotten.",
                },
                {
                  t: "Skin care habits",
                  d: "Hot water, harsh soaps and scratching feel relieving but usually make things worse. Small corrections go a long way.",
                },
              ].map((f, i) => (
                <Reveal key={f.t} delay={i * 0.05}>
                  <div className="py-6">
                    <h3 className="font-display text-lg font-[420] tracking-[-0.01em]">
                      {f.t}
                    </h3>
                    <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted-foreground">
                      {f.d}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.08}>
              <p className="mt-6 text-[13px] leading-relaxed text-muted-foreground">
                In Ayurvedic terms the imbalance involves the doshas and the
                skin tissue. The practical question is the same either way:{" "}
                <em className="text-foreground">
                  what is setting this particular patient's flares off?
                </em>
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Doctor: quiet typographic section with a note in her own words      */
/* ------------------------------------------------------------------ */

function Doctor() {
  return (
    <section
      id="about"
      className="scroll-mt-28 border-t border-foreground/10 bg-accent/20 py-20 lg:py-28"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Reveal>
          <p className="eyebrow">The physician</p>
          <h2 className="font-display mt-3 text-[clamp(2.4rem,4.5vw,3.6rem)] leading-[1.05] font-[380] tracking-[-0.015em]">
            Dr. Anusree Leela
          </h2>
          <p className="mt-3 text-sm tracking-wide text-muted-foreground">
            BAMS · Chief Physician, Leelajani Ayur Care, Kowdiar
          </p>
        </Reveal>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <Reveal>
            <p className="text-[15px] leading-relaxed text-foreground/85">
              Each treatment is built from the patient's own history: flare
              pattern, digestion, body constitution, and the realities of
              daily life. Panchakarma is used, but only where the clinical
              picture calls for it.
            </p>
          </Reveal>
          <Reveal delay={0.07}>
            <p className="text-[15px] leading-relaxed text-foreground/85">
              Her practice covers chronic skin conditions, lifestyle disorders
              and general Ayurvedic medicine, with consultations at the
              Kowdiar clinic and online for patients across Kerala and
              beyond.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <figure className="mt-14 border-l-2 border-primary/50 pl-6 sm:pl-9">
            <blockquote className="font-display text-[1.35rem] leading-[1.45] font-[380] italic text-foreground/90 sm:text-[1.6rem]">
              "Skin conditions don't reveal their triggers in ten minutes. My
              first consultation runs long on purpose: your routine, your
              digestion, your stress, what you have already tried. Treatment
              is built from all of it, then adjusted as your skin responds."
            </blockquote>
            <figcaption className="mt-5 text-sm text-muted-foreground">
              · Dr. Anusree Leela
            </figcaption>
          </figure>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="mt-16 text-[11px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
            The first consultation covers
          </p>
          <div className="mt-3 grid gap-x-14 border-t border-foreground/10 sm:grid-cols-2">
            {[
              [
                "A detailed history",
                "When it started, what has helped, what has not. Creams, tablets, home remedies, everything.",
              ],
              [
                "Your daily routine",
                "Food, sleep, work, stress. Not a checklist, a conversation about how a normal day actually goes.",
              ],
              [
                "Digestion and diet",
                "Appetite, bowel habit, what you eat. In Ayurveda this sits at the centre of skin health.",
              ],
              [
                "The plan, written down",
                "Formulations, diet guidance, skin care, and what follow up will look like.",
              ],
            ].map(([t, d]) => (
              <div key={t} className="border-b border-foreground/10 py-5">
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
/* Statement: one big line of type before the CTA                      */
/* ------------------------------------------------------------------ */

function Statement() {
  return (
    <section className="border-t border-foreground/10 py-24 lg:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Reveal>
          <div className="h-px w-14 bg-primary/50" />
          <p className="font-display mt-8 text-[clamp(1.8rem,3.4vw,2.9rem)] leading-[1.25] font-[380] text-balance text-foreground/90">
            The plan follows the person, never a template. It is written
            around your history and your routine, then adjusted as your skin
            responds.
          </p>
          <p className="mt-7 text-[11px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
            How care works at Leelajani Ayur Care
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Consultation CTA band                                               */
/* ------------------------------------------------------------------ */

function CtaBand() {
  return (
    <section className="band-forest text-primary-foreground">
      <div className="mx-auto grid max-w-[88rem] gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-12 lg:items-end lg:px-10 lg:py-24">
        <Reveal className="lg:col-span-7">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-primary-foreground/50 uppercase">
            New patients
          </p>
          <h2 className="font-display mt-4 max-w-xl text-[clamp(2.1rem,4vw,3.4rem)] leading-[1.08] font-[380] tracking-[-0.015em] text-balance">
            Book a consultation with Dr. Anusree Leela
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-primary-foreground/70">
            Tell the clinic what has been happening with your skin. Old
            reports are welcome, but not required. You will be guided to the
            right kind of appointment, online or at Kowdiar.
          </p>
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-5">
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <Button asChild size="lg" className={BTN_CREAM}>
              <a href={WA_BOOK} target="_blank" rel="noopener noreferrer">
                Start on WhatsApp
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className={BTN_GHOST_DARK}>
              <a href={`tel:${PHONE_TEL}`}>Call the clinic</a>
            </Button>
          </div>
          <p className="mt-5 flex items-center gap-2 text-xs text-primary-foreground/55 lg:justify-end">
            <Clock className="size-3.5" /> Mon to Sat, 7 AM to 7 PM · Sundays
            closed
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Process: the one numbered section                                   */
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
      t: "Follow ups keep it on track",
      d: "Progress is reviewed and the plan adjusted. Psoriasis care rarely gets it right on the first try.",
    },
  ];

  return (
    <section id="consultation" className="scroll-mt-28 py-20 lg:py-28">
      <div className="mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
            <h2 className="font-display max-w-xs text-[clamp(1.9rem,3vw,2.6rem)] leading-[1.1] font-[400] tracking-[-0.01em] text-balance">
              What happens after you write in
            </h2>
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-muted-foreground">
              Care does not end when medicines are handed over. Reviews are
              part of the plan, and that is how it gets adjusted as your skin
              responds.
            </p>
          </Reveal>

          <ol className="lg:col-span-8">
            {steps.map((s, i) => (
              <Reveal key={s.t} delay={i * 0.04}>
                <li className="group flex items-baseline gap-7 border-b border-foreground/10 py-7 first:pt-0 sm:gap-10">
                  <span className="font-display shrink-0 text-[1.7rem] leading-none font-[380] text-foreground/20 transition-colors duration-300 group-hover:text-primary/60 sm:text-[2.1rem]">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-[1.25rem] font-[420] tracking-[-0.01em]">
                      {s.t}
                    </h3>
                    <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted-foreground">
                      {s.d}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

function Faqs() {
  return (
    <section className="border-y border-foreground/10 bg-accent/20 py-20 lg:py-28">
      <div className="mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">Questions patients ask</p>
            <h2 className="font-display mt-3 max-w-xs text-[clamp(1.9rem,3vw,2.6rem)] leading-[1.1] font-[400] tracking-[-0.01em]">
              Before you decide
            </h2>
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-muted-foreground">
              Straight answers to the things people usually want to know
              before starting treatment.
            </p>
            <p className="mt-6 max-w-xs text-[13px] text-muted-foreground">
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

          <Reveal delay={0.06} className="lg:col-span-8">
            <Accordion
              type="single"
              collapsible
              className="border-t border-foreground/10 [&_[data-slot=accordion-item]]:border-b [&_[data-slot=accordion-item]]:border-foreground/10"
            >
              {FAQS.map((f, i) => (
                <AccordionItem key={f.q} value={`item-${i}`} className="bg-transparent">
                  <AccordionTrigger className="py-5 text-left font-display text-[1.1rem] font-[420] tracking-[-0.01em] hover:no-underline hover:text-primary">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
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
      <div className="mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Enquiry form, opens in WhatsApp */}
          <div className="lg:col-span-7">
            <Reveal className="max-w-xl">
              <h2 className="font-display text-[clamp(1.9rem,3vw,2.6rem)] leading-[1.1] font-[400] tracking-[-0.01em] text-balance">
                Tell us about your skin
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
                Fill this in and it opens in WhatsApp, addressed to the clinic
                team. Nothing is stored on this website. The conversation
                stays between you and the clinic.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <form
                className="mt-10 space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  const parts = [
                    "Hello, I would like to enquire about psoriasis care.",
                    fd.get("name") ? `Name: ${fd.get("name")}` : null,
                    fd.get("duration") ? `Symptoms present for: ${fd.get("duration")}` : null,
                    fd.get("areas") ? `Affected areas: ${fd.get("areas")}` : null,
                    fd.get("treatments") ? `Treatments tried: ${fd.get("treatments")}` : null,
                    fd.get("notes") ? `Notes: ${fd.get("notes")}` : null,
                  ].filter(Boolean);
                  window.open(wa(parts.join("\n")), "_blank", "noopener,noreferrer");
                }}
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <label className="block text-sm">
                    <span className="font-medium">Name</span>
                    <input
                      name="name"
                      required
                      autoComplete="name"
                      placeholder="Your name"
                      className="mt-2 w-full rounded-none border-0 border-b border-foreground/20 bg-transparent px-0 py-2.5 text-[15px] outline-none transition-colors placeholder:text-muted-foreground/50 hover:border-foreground/40 focus:border-primary"
                    />
                  </label>
                  <label className="block text-sm">
                    <span className="font-medium">Symptoms present for</span>
                    <select
                      name="duration"
                      defaultValue=""
                      required
                      className="mt-2 w-full cursor-pointer appearance-none rounded-none border-0 border-b border-foreground/20 bg-transparent py-2.5 text-[15px] outline-none transition-colors hover:border-foreground/40 focus:border-primary"
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
                      <option>6 months to 2 years</option>
                      <option>2 to 5 years</option>
                      <option>Over 5 years</option>
                    </select>
                  </label>
                  <label className="block text-sm sm:col-span-2">
                    <span className="font-medium">Areas affected</span>
                    <input
                      name="areas"
                      placeholder="Scalp, elbows, lower back, for example"
                      className="mt-2 w-full rounded-none border-0 border-b border-foreground/20 bg-transparent px-0 py-2.5 text-[15px] outline-none transition-colors placeholder:text-muted-foreground/50 hover:border-foreground/40 focus:border-primary"
                    />
                  </label>
                  <label className="block text-sm sm:col-span-2">
                    <span className="font-medium">Treatments already tried</span>
                    <input
                      name="treatments"
                      placeholder="Creams, tablets, home remedies, anything"
                      className="mt-2 w-full rounded-none border-0 border-b border-foreground/20 bg-transparent px-0 py-2.5 text-[15px] outline-none transition-colors placeholder:text-muted-foreground/50 hover:border-foreground/40 focus:border-primary"
                    />
                  </label>
                  <label className="block text-sm sm:col-span-2">
                    <span className="font-medium">Anything else worth sharing?</span>
                    <textarea
                      name="notes"
                      rows={2}
                      placeholder="Current medication, other conditions, preferred timing"
                      className="mt-2 w-full resize-none rounded-none border-0 border-b border-foreground/20 bg-transparent px-0 py-2.5 text-[15px] outline-none transition-colors placeholder:text-muted-foreground/50 hover:border-foreground/40 focus:border-primary"
                    />
                  </label>
                </div>
                <Button asChild type="submit" size="lg" className={BTN_PRIMARY}>
                  <span className="flex items-center gap-2">
                    <MessageCircle className="size-4" /> Send enquiry on
                    WhatsApp
                  </span>
                </Button>
              </form>
            </Reveal>
          </div>

          {/* Clinic details */}
          <div className="lg:col-span-5 lg:pl-6">
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
                          Near Narmada Shopping Complex, Kowdiar ·
                          Thiruvananthapuram, Kerala 695003
                        </span>
                      </>
                    ),
                  },
                  {
                    icon: Clock,
                    label: "Hours",
                    body: (
                      <>
                        Monday to Saturday, 7:00 AM to 7:00 PM
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
                    body: "Available for first consults and later reviews, with medicines dispatched to your address.",
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
                className="group mt-10 flex items-center justify-between border border-foreground/15 bg-accent/20 px-6 py-5 transition-colors hover:border-primary/40"
              >
                <span>
                  <span className="font-display block text-lg font-[420] tracking-[-0.01em]">
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
      <div className="mx-auto max-w-[88rem] px-4 py-16 sm:px-6 lg:px-10">
        <div className="flex flex-wrap items-center justify-between gap-6 border-b border-primary-foreground/15 pb-10">
          <a href="#top" aria-label="Leelajani Ayur Care, back to top" className="inline-block bg-card p-3">
            <img
              src={LOGO}
              alt="Leelajani Ayur Care"
              className="h-11 w-auto object-contain"
            />
          </a>
          <p className="font-display max-w-md text-[clamp(1.4rem,2.5vw,2rem)] leading-snug font-[380] tracking-[-0.01em]">
            Ayurvedic care for psoriasis and chronic skin conditions
          </p>
        </div>

        <div className="grid gap-10 pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div className="text-sm leading-relaxed text-primary-foreground/70">
            <p>Dr. Anusree Leela, BAMS</p>
            <p className="mt-1">Chief Physician</p>
            <p className="mt-4">{ADDRESS}</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-primary-foreground/55 uppercase">
              On this page
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href="#top" className="text-primary-foreground/80 transition-colors hover:text-primary-foreground">
                  Home
                </a>
              </li>
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
              <li>Mon to Sat, 7 AM to 7 PM</li>
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-primary-foreground/55 uppercase">
              Consultations
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/80">
              <li>In person, Kowdiar</li>
              <li>Video call, across Kerala</li>
              <li>
                <a
                  href={WA_BOOK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-quiet text-primary-foreground"
                >
                  Book on WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-primary-foreground/15 pt-6">
          <p className="max-w-3xl text-xs leading-relaxed text-primary-foreground/60">
            The information on this page is for general awareness only and is
            not a substitute for a consultation. Treatment is decided case by
            case after a doctor's assessment.
          </p>
          <p className="mt-3 text-xs text-primary-foreground/60">
            © {new Date().getFullYear()} Leelajani Ayur Care · Kowdiar,
            Thiruvananthapuram, Kerala
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
        <CareAreas />
        <Psoriasis />
        <Doctor />
        <Statement />
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
