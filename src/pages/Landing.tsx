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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Clock,
  Facebook,
  FileHeart,
  Flame,
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
  Instagram,
  Youtube,
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
const WA_REPORTS = wa(
  "Hello, I'd like to share my medical reports for review.",
);
const WA_MEDICINES = wa(
  "Hello, I have a question about medicines and treatment duration.",
);

const NAV_LINKS = [
  { label: "Understanding psoriasis", href: "#about" },
  { label: "How care works", href: "#care" },
  { label: "Dr. Anusree Leela", href: "#doctor" },
  { label: "Questions", href: "#faq" },
  { label: "Visit", href: "#visit" },
];

const WHAT_FLARES = [
  {
    title: "Stress and poor sleep",
    body: "Many patients notice patches get worse during difficult periods — exams, work pressure, family stress. Skin and mind are closely linked.",
    icon: Moon,
  },
  {
    title: "Digestion",
    body: "In Ayurveda, skin is often a mirror of the gut. Irregular meals, heavy or incompatible food, and low digestive fire are looked at carefully.",
    icon: Flame,
  },
  {
    title: "Season and weather",
    body: "Flares are common in winter and during sudden weather changes. Plans are adjusted seasonally, not fixed once and forgotten.",
    icon: Sun,
  },
  {
    title: "Skin care habits",
    body: "Hot water baths, harsh soaps and scratching feel relieving but usually make things worse. Small corrections here go a long way.",
    icon: Leaf,
  },
];

const FIRST_VISIT = [
  {
    n: "1",
    title: "A detailed history",
    body: "When it started, what it looked like, what has helped and what hasn't — creams, tablets, home remedies, everything.",
  },
  {
    n: "2",
    title: "Your daily routine",
    body: "Food, sleep, work, stress, exercise. Not a checklist — a conversation about how a normal day actually goes.",
  },
  {
    n: "3",
    title: "Digestion and diet",
    body: "Appetite, bowel habit, and what you eat. In Ayurveda this sits at the centre of skin health.",
  },
  {
    n: "4",
    title: "The plan itself",
    body: "Written down for you: herbal formulations, diet do's and don'ts, skin care, and what follow-up will look like.",
  },
];

const FAQS = [
  {
    q: "Can Ayurveda cure psoriasis?",
    a: "Honest answer: no system of medicine can promise that today. Psoriasis is a long-term condition and it can come back, especially under stress or in winter. What Ayurvedic treatment does aim for is longer quiet stretches between flares, milder patches, and less dependence on creams just to get through the day. How much improvement is possible varies from person to person — that's what the consultation is for.",
  },
  {
    q: "How long before I see a difference?",
    a: "Skin responds slowly. Some patients feel less itching within a few weeks; visible change in the patches usually takes longer — often a few months. Treatment is typically planned in phases with review points, not as an open-ended 'take this forever'.",
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

/** Page-load stagger, used in the hero only. */
const loadParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.08 } },
};
const loadChild: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
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
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Faint botanical sprig — decoration only, sits behind content. */
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
/* Shared pieces                                                       */
/* ------------------------------------------------------------------ */

/** Left-aligned section opener — deliberately varied from centered ones. */
function SectionIntro({
  eyebrow,
  title,
  sub,
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={className}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="font-display mt-2.5 max-w-2xl text-3xl leading-tight font-semibold text-balance sm:text-4xl">
        {title}
      </h2>
      {sub ? (
        <p className="mt-3.5 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
          {sub}
        </p>
      ) : null}
    </Reveal>
  );
}

function WhatsAppCTA({ href = WA_MAIN }: { href?: string }) {
  return (
    <Button asChild size="lg" className="h-12 rounded-full px-8 text-[15px] shadow-lg shadow-primary/25 active:scale-[0.98]">
      <a href={href} target="_blank" rel="noopener noreferrer">
        <MessageCircle className="size-4" /> Chat on WhatsApp
      </a>
    </Button>
  );
}

function CallButton() {
  return (
    <Button
      asChild
      size="lg"
      variant="outline"
      className="h-12 rounded-full border-primary/30 bg-card/70 px-8 text-[15px] hover:bg-primary/5 hover:text-primary active:scale-[0.98]"
    >
      <a href={`tel:${PHONE_TEL}`}>
        <Phone className="size-4" /> Call the clinic
      </a>
    </Button>
  );
}

/* ------------------------------------------------------------------ */
/* Sections                                                            */
/* ------------------------------------------------------------------ */

function TopBar() {
  return (
    <div className="band-forest text-primary-foreground">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-1 px-4 py-2 text-xs font-medium sm:justify-between">
        <span className="inline-flex items-center gap-1.5">
          <Leaf className="size-3.5" /> Ayurvedic care for psoriasis — led by a BAMS physician
        </span>
        <div className="flex items-center gap-5">
          <a href={`mailto:${EMAIL}`} className="hidden items-center gap-1.5 underline-offset-2 hover:underline md:inline-flex">
            <Mail className="size-3.5" /> {EMAIL}
          </a>
          <a
            href={`tel:${PHONE_TEL}`}
            className="inline-flex items-center gap-1.5 font-semibold underline-offset-2 hover:underline"
          >
            <Phone className="size-3.5" /> {PHONE_DISPLAY}
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
        scrolled ? "bg-background/85 shadow-sm backdrop-blur-lg" : "bg-background/60 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2.5">
          <img src={LOGO} alt="Leelajani Ayur Care" className="size-10 rounded-full ring-1 ring-primary/15" />
          <span className="font-display text-xl font-semibold tracking-tight">
            Leelajani Ayur Care
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-foreground/75 transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm" className="hidden rounded-full sm:inline-flex">
            <a href={`tel:${PHONE_TEL}`}>
              <Phone className="size-4" /> Call
            </a>
          </Button>
          <Button asChild size="sm" className="rounded-full active:scale-[0.97]">
            <a href={WA_BOOK} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="size-4" /> Book a consult
            </a>
          </Button>
          <button
            className="inline-flex size-9 items-center justify-center rounded-full border lg:hidden"
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
              className="block rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-accent"
            >
              {l.label}
            </a>
          ))}
        </div>
      ) : null}
    </header>
  );
}

function DoctorPortrait({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-3.5%", "3.5%"]);

  return (
    <div ref={ref} className={`group relative ${className}`}>
      {/* offset echo of the arch — quiet editorial layering */}
      <div
        aria-hidden
        className="absolute inset-0 translate-x-3 translate-y-3 rounded-t-[10rem] rounded-b-3xl border border-primary/25 sm:translate-x-4 sm:translate-y-4"
      />
      <div className="relative overflow-hidden rounded-t-[10rem] rounded-b-3xl border border-border/70 shadow-xl shadow-primary/10">
        <motion.div style={reduce ? undefined : { y }} className="will-change-transform">
          <img
            src={DOC_PHOTO}
            alt="Dr. Anusree Leela, BAMS — Chief Physician, Leelajani Ayur Care"
            className="aspect-[4/5] w-full scale-[1.09] object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.14]"
            loading="lazy"
            decoding="async"
          />
        </motion.div>
        <div className="pointer-events-none absolute inset-0 rounded-t-[10rem] rounded-b-3xl ring-1 ring-inset ring-foreground/5" />
      </div>
      <div className="absolute -bottom-4 left-5 flex items-center gap-2 rounded-full border border-border/60 bg-card px-4 py-2 text-xs font-semibold shadow-md sm:left-7">
        <Leaf className="size-3.5 text-primary" /> Diet · Lifestyle · Herbal support
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="hero-veil grain relative overflow-hidden">
      <BotanicalSprig className="absolute top-16 right-[6%] hidden h-80 w-60 text-primary opacity-[0.16] lg:block" />
      <motion.div
        variants={loadParent}
        initial="hidden"
        animate="show"
        className="relative mx-auto grid max-w-7xl gap-12 px-4 pt-16 pb-24 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14 lg:pt-24 lg:pb-28"
      >
        <div>
          <motion.div variants={loadChild}>
            <Badge className="mb-6 gap-1.5 rounded-full bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-primary ring-1 ring-primary/20">
              <MapPin className="size-3.5" /> Kowdiar, Thiruvananthapuram · Online consults across Kerala
            </Badge>
          </motion.div>
          <motion.h1
            variants={loadChild}
            className="font-display text-4xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-5xl lg:text-[3.4rem]"
          >
            Psoriasis, treated as more than a{" "}
            <em className="font-medium text-primary italic">skin problem</em>
          </motion.h1>
          <motion.p
            variants={loadChild}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            Dr. Anusree Leela, BAMS, plans Ayurvedic treatment around your
            symptoms, digestion, daily routine and stress — then follows your
            progress and adjusts the plan as your skin responds.
          </motion.p>

          <motion.div variants={loadChild} className="mt-8 flex flex-wrap gap-3">
            <WhatsAppCTA href={WA_MAIN} />
            <CallButton />
          </motion.div>

          <motion.p
            variants={loadChild}
            className="mt-7 max-w-md text-[13px] leading-relaxed text-muted-foreground"
          >
            Mon–Sat, 7 AM – 7 PM. First contact usually starts with a WhatsApp
            message — describe your symptoms and the clinic coordinator will
            take it from there.
          </motion.p>
        </div>

        <motion.div variants={loadChild} className="mx-auto w-full max-w-sm lg:max-w-none">
          <DoctorPortrait />
        </motion.div>
      </motion.div>
    </section>
  );
}

function FactBand() {
  const items = [
    { k: "Chief Physician", v: "Dr. Anusree Leela, BAMS" },
    { k: "Clinic", v: "Kowdiar, Thiruvananthapuram" },
    { k: "Consultations", v: "In-person & online video" },
    { k: "Hours", v: "Mon–Sat, 7 AM – 7 PM" },
  ];
  return (
    <section className="band-forest text-primary-foreground">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-5 px-4 py-7 sm:px-6 lg:grid-cols-4">
        {items.map((s) => (
          <div key={s.k} className="px-1">
            <p className="text-[11px] font-semibold tracking-[0.12em] text-primary-foreground/60 uppercase">{s.k}</p>
            <p className="mt-1 text-sm font-semibold tracking-tight sm:text-[15px]">{s.v}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="scroll-mt-24 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <SectionIntro
              eyebrow="Understanding psoriasis"
              title={
                <>
                  What psoriasis actually is, and what Ayurveda looks at
                </>
              }
              sub="Psoriasis is a chronic inflammatory skin condition — raised, red, scaly patches that commonly appear on the scalp, elbows, knees and lower back. Itching, dryness and flaking usually come along with it."
            />
            <BotanicalSprig className="mt-10 hidden h-44 w-32 text-primary opacity-[0.18] lg:block" />
          </div>
          <div className="space-y-5">
            <Reveal delay={0.05}>
              <p className="text-[15px] leading-relaxed text-foreground/85">
                It tends to run in cycles: quiet periods, then a flare. In
                Ayurvedic practice, psoriasis is understood as an imbalance
                involving the doshas and the skin tissue — but the practical
                question is the same whichever way you describe it:{" "}
                <em>what is setting this particular patient's flares off?</em>
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-primary/15 bg-primary/[0.045] p-6">
                <p className="text-[13px] leading-relaxed text-foreground/80">
                  Psoriasis is not contagious, and it is not caused by poor
                  hygiene. It can, however, be stubborn — which is exactly why a
                  plan built for one person rarely works when copied for another.
                </p>
              </div>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {WHAT_FLARES.map((f, i) => (
                <Reveal key={f.title} delay={0.08 + i * 0.05}>
                  <div className="card-lift h-full rounded-2xl border border-border/70 bg-card p-5 shadow-sm">
                    <div className="flex items-center gap-2.5">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                        <f.icon className="size-5" />
                      </div>
                      <h3 className="text-sm font-semibold tracking-tight">{f.title}</h3>
                    </div>
                    <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">{f.body}</p>
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

function CareJourney() {
  return (
    <section id="care" className="scroll-mt-24 border-y border-border/60 bg-card/50 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionIntro
          eyebrow="How care works"
          title="From first message to steady skin"
          sub="Care doesn't end when medicines are handed over. Regular follow-up reviews are part of the plan — that's how it gets adjusted as your skin responds."
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <div className="space-y-1">
            {[
              {
                t: "You send an enquiry",
                d: "A WhatsApp message with your primary concern — or the brief health form below.",
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
                d: "Progress is reviewed, formulations refined, and the plan adjusted — psoriasis care rarely gets it right on the first try.",
              },
            ].map((s, i) => (
              <Reveal key={s.t} delay={i * 0.06}>
                <div className="flex gap-5 py-5 sm:gap-6">
                  <span
                    className={`font-display mt-0.5 shrink-0 text-lg font-semibold ${
                      i === 4 ? "text-primary" : "text-foreground/25"
                    }`}
                  >
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold tracking-tight">{s.t}</h3>
                    <p className="mt-1 max-w-md text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                  </div>
                </div>
                {i < 4 ? <div className="ml-6 h-px bg-border sm:ml-7" /> : null}
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1} className="lg:pt-4">
            <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-sm sm:p-8">
              <p className="eyebrow">Instant on WhatsApp</p>
              <h3 className="font-display mt-2 text-2xl font-semibold tracking-tight">
                Ask the clinic team directly
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Most enquiries start here. Pick what fits — each opens a chat
                with your question already typed in.
              </p>
              <div className="mt-6 space-y-3">
                {[
                  { label: "Describe your symptoms to the team", msg: WA_MAIN },
                  { label: "Share blood work or reports for review", msg: WA_REPORTS },
                  { label: "Book an online or in-clinic consultation", msg: WA_BOOK },
                  { label: "Ask about medicines and treatment duration", msg: WA_MEDICINES },
                ].map((w) => (
                  <a
                    key={w.label}
                    href={w.msg}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-border/60 bg-background/60 px-5 py-4 transition-colors hover:border-primary/35 hover:bg-accent/50"
                  >
                    <span className="text-sm font-medium">{w.label}</span>
                    <ArrowRight className="size-4 shrink-0 text-primary transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Doctor() {
  return (
    <section id="doctor" className="relative scroll-mt-24 overflow-hidden py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <SectionIntro
              eyebrow="Your doctor"
              title={
                <>
                  Consultations that take the{" "}
                  <em className="font-medium text-primary italic">time they need</em>
                </>
              }
              sub="Dr. Anusree Leela, BAMS — Chief Physician at Leelajani Ayur Care. Skin conditions don't reveal their triggers in ten minutes, and her consultations are known for not pretending otherwise."
            />
            <div className="mt-8 space-y-4 text-[15px] leading-relaxed text-foreground/85">
              <Reveal>
                <p>
                  Psoriasis rarely responds to the same plan for every patient,
                  so each treatment is built from the patient's own history —
                  flare pattern, digestion, body constitution, and the realities
                  of their daily life. Panchakarma is used, but only where the
                  clinical picture calls for it.
                </p>
              </Reveal>
              <Reveal delay={0.06}>
                <p>
                  Her practice covers chronic skin conditions, lifestyle
                  disorders and general Ayurvedic medicine, with consultations
                  both at the Kowdiar clinic and online for patients across
                  Kerala and beyond.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <div className="mt-8 rounded-2xl border border-border/70 bg-card/70 p-5 shadow-sm">
                <p className="eyebrow">What she will ask about</p>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  Where the patches are, when this started, your digestion and
                  sleep, stress at home and work, and everything you've already
                  tried — including steroid creams.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2.5 text-sm">
                <p className="flex items-center gap-2.5 text-muted-foreground">
                  <Video className="size-4 shrink-0 text-primary" />
                  Online consultations available
                </p>
                <p className="flex items-center gap-2.5 text-muted-foreground">
                  <Clock className="size-4 shrink-0 text-primary" />
                  Mon–Sat, 7 AM – 7 PM
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:pt-4">
            <div className="relative overflow-hidden rounded-3xl p-8 text-primary-foreground shadow-lg shadow-forest/25 sm:p-10">
              <div className="band-forest absolute inset-0" aria-hidden />
              <BotanicalSprig className="absolute -right-4 -bottom-6 h-52 w-36 text-primary-foreground opacity-25" />
              <div className="relative">
                <p className="text-[11px] font-semibold tracking-[0.16em] text-primary-foreground/60 uppercase">
                  Book a consultation
                </p>
                <h3 className="font-display mt-3 text-2xl leading-snug font-semibold tracking-tight text-balance sm:text-[1.7rem]">
                  Begin with a conversation, not a prescription
                </h3>
                <p className="mt-3.5 max-w-md text-sm leading-relaxed text-primary-foreground/75">
                  Send a WhatsApp message with your concern, or call during
                  clinic hours. Video and in-person slots are available
                  Mon–Sat, 7 AM – 7 PM.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button
                    asChild
                    size="lg"
                    className="h-11 rounded-full bg-primary-foreground px-6 text-sm font-semibold text-primary hover:bg-primary-foreground/90 active:scale-[0.98]"
                  >
                    <a href={WA_BOOK} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="size-4" /> Book on WhatsApp
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="h-11 rounded-full border-primary-foreground/35 bg-transparent px-6 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground active:scale-[0.98]"
                  >
                    <a href={`tel:${PHONE_TEL}`}>
                      <Phone className="size-4" /> {PHONE_DISPLAY}
                    </a>
                  </Button>
                </div>
                <p className="mt-6 text-xs text-primary-foreground/60">
                  First consults are unhurried — keep any old prescriptions or
                  reports handy.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FirstVisit() {
  return (
    <section className="border-y border-border/60 bg-card/50 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionIntro
          className="mx-auto max-w-2xl text-center"
          eyebrow="Before you book"
          title="What the first consultation covers"
          sub="Roughly what to expect in the first meeting, so nothing surprises you."
        />
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FIRST_VISIT.map((s, i) => (
            <motion.li
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
              className="h-full rounded-2xl border border-border/70 bg-card p-6 shadow-sm"
            >
              <span className="font-display text-3xl font-semibold text-primary/35">
                <span className="text-lg align-top">/</span>
                {s.n}
              </span>
              <h3 className="mt-3 font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Faqs() {
  return (
    <section id="faq" className="scroll-mt-24 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <SectionIntro
              eyebrow="Questions patients ask"
              title="Before you decide"
              sub="Straight answers to the things people usually want to know before starting treatment."
            />
            <Reveal delay={0.1}>
              <p className="mt-6 text-sm text-muted-foreground">
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
          <Reveal delay={0.05}>
            <Accordion type="single" collapsible className="rounded-2xl border border-border/70 bg-card px-6 shadow-sm">
              {FAQS.map((f, i) => (
                <AccordionItem key={f.q} value={`item-${i}`}>
                  <AccordionTrigger className="text-left text-[15px] font-semibold hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
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

function Enquiry() {
  return (
    <section id="enquiry" className="scroll-mt-24 border-y border-border/60 bg-card/50 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div>
            <SectionIntro
              eyebrow="Patient enquiry"
              title="Send your requirement"
              sub="Fill this in and it opens in WhatsApp, addressed to the clinic team. Nothing is stored on this website — the conversation stays where it belongs: between you and the clinic."
            />
            <Reveal delay={0.08}>
              <div className="mt-8 space-y-3 text-sm">
                <p className="flex items-center gap-2.5 text-muted-foreground">
                  <Sprout className="size-4 shrink-0 text-primary" />
                  Confidential — read only by the clinic care team
                </p>
                <p className="flex items-center gap-2.5 text-muted-foreground">
                  <Clock className="size-4 shrink-0 text-primary" />
                  Replies during clinic hours: Mon–Sat, 7 AM – 7 PM
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <form
              className="rounded-3xl border border-border/70 bg-card p-6 shadow-sm sm:p-8"
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
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm sm:col-span-1">
                  <span className="font-medium">Name</span>
                  <input
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus-visible:ring-2 focus-visible:ring-ring/40"
                  />
                </label>
                <label className="text-sm sm:col-span-1">
                  <span className="font-medium">Symptoms present for</span>
                  <select
                    name="duration"
                    defaultValue=""
                    className="mt-1.5 w-full cursor-pointer appearance-none rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23555' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 0.9rem center",
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
                <label className="text-sm sm:col-span-2">
                  <span className="font-medium">Areas affected</span>
                  <input
                    name="areas"
                    placeholder="e.g. scalp, elbows, lower back"
                    className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus-visible:ring-2 focus-visible:ring-ring/40"
                  />
                </label>
                <label className="text-sm sm:col-span-2">
                  <span className="font-medium">Treatments already tried</span>
                  <input
                    name="treatments"
                    placeholder="Creams, tablets, home remedies — anything"
                    className="mt-1.5 w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus-visible:ring-2 focus-visible:ring-ring/40"
                  />
                </label>
                <label className="text-sm sm:col-span-2">
                  <span className="font-medium">Anything else worth sharing?</span>
                  <textarea
                    name="notes"
                    rows={3}
                    placeholder="Current medication, other conditions, preferred timing…"
                    className="mt-1.5 w-full resize-none rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus-visible:ring-2 focus-visible:ring-ring/40"
                  />
                </label>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button type="submit" size="lg" className="h-11 rounded-full px-6 text-sm active:scale-[0.98]">
                  <MessageCircle className="size-4" /> Send enquiry on WhatsApp
                </Button>
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <FileHeart className="size-3.5" /> Reports and photos can be sent in the chat
                </span>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Visit() {
  return (
    <section id="visit" className="scroll-mt-24 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-14">
          <div>
            <SectionIntro
              eyebrow="Visit or consult online"
              title="Leelajani Ayur Care, Kowdiar"
              sub="The clinic sees patients in person and runs video consultations for those who can't travel. Medicines can be dispatched for online patients."
            />
            <div className="mt-8 space-y-4 text-sm">
              <Reveal>
                <div className="flex items-start gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <MapPin className="size-4" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{ADDRESS}</p>
                    <p className="mt-0.5 text-muted-foreground">
                      Near Narmada Shopping Complex · Pin 695003
                    </p>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <div className="flex items-start gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Clock className="size-4" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Mon–Sat, 7:00 AM – 7:00 PM</p>
                    <p className="mt-0.5 text-muted-foreground">Sundays closed · Phone answered during clinic hours</p>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="flex items-start gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Phone className="size-4" />
                  </div>
                  <div>
                    <a href={`tel:${PHONE_TEL}`} className="link-quiet font-medium text-foreground">
                      {PHONE_DISPLAY}
                    </a>
                    <span className="block text-muted-foreground">
                      Email:{" "}
                      <a href={`mailto:${EMAIL}`} className="link-quiet">
                        {EMAIL}
                      </a>
                    </span>
                  </div>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.12}>
              <div className="mt-8 flex flex-wrap gap-3">
                <WhatsAppCTA href={WA_BOOK} />
                <Button asChild variant="outline" className="h-12 rounded-full border-primary/30 bg-card/70 px-8 text-[15px] hover:bg-primary/5 hover:text-primary active:scale-[0.98]">
                  <a href={MAPS_URL} target="_blank" rel="noopener noreferrer">
                    <Navigation className="size-4" /> Get directions
                  </a>
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:pt-6">
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group card-lift relative flex h-full min-h-64 flex-col justify-between overflow-hidden rounded-3xl p-7 text-primary-foreground shadow-lg shadow-forest/20"
            >
              <div className="band-forest absolute inset-0" aria-hidden />
              <BotanicalSprig className="absolute right-4 bottom-0 h-40 w-28 text-primary-foreground opacity-25" />
              <div className="relative">
                <MapPin className="size-6" />
                <p className="font-display mt-4 text-2xl leading-snug font-semibold tracking-tight">
                  Kowdiar, Thiruvananthapuram
                </p>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-primary-foreground/75">
                  Near Narmada Shopping Complex — a short auto ride from most of
                  the city.
                </p>
              </div>
              <span className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-semibold">
                Open in Google Maps
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="band-forest text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:gap-12">
          <div>
            <a href="#top" className="inline-flex items-center gap-3">
              <img src={LOGO} alt="Leelajani Ayur Care" className="size-11 rounded-full ring-1 ring-primary-foreground/20" />
              <span className="font-display text-xl font-semibold tracking-tight">
                Leelajani Ayur Care
              </span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-primary-foreground/70">
              Ayurvedic care for psoriasis and chronic skin conditions, led by
              Dr. Anusree Leela, BAMS. Kowdiar, Thiruvananthapuram — in-person
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
                  <a href={l.href} className="text-primary-foreground/80 transition-colors hover:text-primary-foreground">
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
            <div className="mt-5 flex items-center gap-2">
              {[
                { icon: Instagram, label: "Instagram" },
                { icon: Facebook, label: "Facebook" },
                { icon: Youtube, label: "YouTube" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#top"
                  aria-label={s.label}
                  className="flex size-9 items-center justify-center rounded-full border border-primary-foreground/20 text-primary-foreground/70 transition-colors hover:border-primary-foreground/45 hover:text-primary-foreground"
                >
                  <s.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-primary-foreground/15 pt-6">
          <p className="text-xs leading-relaxed text-primary-foreground/60">
            The information on this page is for general awareness only and is
            not a substitute for a consultation. Treatment is decided case by
            case after a doctor's assessment.
          </p>
          <p className="mt-3 text-xs text-primary-foreground/60">
            © {new Date().getFullYear()} Leelajani Ayur Care Pvt Ltd · Kowdiar, Thiruvananthapuram, Kerala
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
      className="fixed right-5 bottom-5 z-50 flex size-14 items-center justify-center rounded-full bg-[oklch(0.62_0.15_155)] text-white shadow-xl shadow-primary/25 transition-transform hover:scale-105 active:scale-95"
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
        <FactBand />
        <About />
        <CareJourney />
        <Doctor />
        <FirstVisit />
        <Faqs />
        <Enquiry />
        <Visit />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
