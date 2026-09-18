import { useEffect, useState, type ReactNode, type ElementType } from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Armchair,
  ArrowRight,
  Award,
  Baby,
  BatteryLow,
  BrainCircuit,
  Briefcase,
  CalendarCheck,
  CheckCircle2,
  Clock,
  CloudRain,
  Facebook,
  Flower2,
  GraduationCap,
  Heart,
  HeartHandshake,
  Instagram,
  Languages,
  Lock,
  MapPin,
  Menu,
  MessageCircle,
  Moon,
  Navigation,
  Phone,
  Play,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Video,
  X,
  Youtube,
} from "lucide-react";
import logo from "@/assets/logo.svg";

/* ------------------------------------------------------------------ */
/* Contact + data                                                      */
/* ------------------------------------------------------------------ */

const PHONE_DISPLAY = "+91 96561 91761";
const PHONE_TEL = "+919656191761";
const WHATSAPP_URL =
  "https://wa.me/919656191761?text=" +
  encodeURIComponent("Hi Kappiness, I'd like to book a counselling session.");
const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(
    "Kappiness Mental Health and Therapeutic Centre, Vazhuthacaud, Thiruvananthapuram, Kerala 695014",
  );
const ADDRESS =
  "Tc 16/233, Evra 325 A, Eswaravilasam Road, Jagathy, near Carmel HSS, Cotton Hill, Vazhuthacaud, Thiruvananthapuram, Kerala 695014";

const NAV_LINKS = [
  { label: "Concerns", href: "#concerns" },
  { label: "Therapists", href: "#therapists" },
  { label: "Our Space", href: "#space" },
  { label: "How It Works", href: "#how" },
  { label: "FAQs", href: "#faqs" },
];

const CONCERNS: { icon: ElementType; title: string; sub: string }[] = [
  { icon: Heart, title: "Anxiety & Panic Attacks", sub: "Find calm and take back control" },
  { icon: CloudRain, title: "Depression", sub: "Feel better, one step at a time" },
  { icon: BatteryLow, title: "Stress & Burnout", sub: "Reclaim your peace of mind" },
  { icon: HeartHandshake, title: "Relationship Counselling", sub: "Build healthier, happier bonds" },
  { icon: Flower2, title: "Marriage Counselling", sub: "Strengthen your journey together" },
  { icon: Baby, title: "Child & Adolescent Therapy", sub: "Support for a brighter future" },
  { icon: GraduationCap, title: "Teen Counselling", sub: "A safe space for growing minds" },
  { icon: Users, title: "Family Counselling", sub: "Heal and grow together" },
  { icon: Briefcase, title: "Workplace Stress", sub: "Find balance in work and life" },
  { icon: Moon, title: "Sleep Issues", sub: "Rest better, live better" },
  { icon: BrainCircuit, title: "OCD & Phobias", sub: "Break free from unwanted thoughts" },
  { icon: ShieldCheck, title: "Grief & Trauma", sub: "Healing with the right support" },
];

const THERAPISTS = [
  {
    name: "Shahena Sharafudheen",
    role: "Consultant Psychologist",
    hours: "5000+",
    spec: ["Mental Health Disorders", "Relationship & Marriage", "Child & Adolescent", "Emotional Regulation"],
    langs: "English, Malayalam, Hindi, Marathi",
  },
  {
    name: "Anna Maria Mathew",
    role: "Consultant Psychologist",
    hours: "4000+",
    spec: ["Child Psychology", "Relationship & Marriage", "Emotional Development", "Postpartum Support"],
    langs: "English, Malayalam",
  },
  {
    name: "Wincy Bibi SV",
    role: "Consultant Psychologist",
    hours: "7000+",
    spec: ["Child & Adolescent", "Relationship & Marriage", "Emotional Regulation", "Neurodevelopmental"],
    langs: "Malayalam, English, Tamil",
  },
  {
    name: "Amal Sujith",
    role: "Consultant Psychologist",
    hours: "5000+",
    spec: ["Anxiety & Stress", "Depression & Low Mood", "LGBTQIA+ Affirmative", "Identity & Self-Esteem"],
    langs: "English, Malayalam",
  },
  {
    name: "Renjini T.R.",
    role: "Consultant Psychologist",
    hours: "6500+",
    spec: ["Adolescent Psychology", "Women's Mental Health", "Premarital Counselling", "Parenting Guidance"],
    langs: "Malayalam, English, Tamil",
  },
  {
    name: "Anagha Ajith",
    role: "Consultant Psychologist",
    hours: "6500+",
    spec: ["Stress & Anxiety", "Depression", "Relationship & Marital", "Emotional Regulation"],
    langs: "Malayalam, English, Hindi",
  },
  {
    name: "Rakhi Krishnan",
    role: "Clinical Psychologist",
    hours: "5000+",
    spec: ["Marriage & Couples", "De-addiction", "Psychological Assessments", "Anxiety Disorders"],
    langs: "English, Hindi, Malayalam, Tamil",
  },
  {
    name: "Sree Lakshmi",
    role: "Consultant Psychologist",
    hours: "5500+",
    spec: ["Neurodevelopmental", "Adolescent & Adult", "Depression & Mood", "OCD"],
    langs: "English, Hindi, Malayalam, Tamil",
  },
  {
    name: "Akhil GL",
    role: "Family Therapist",
    hours: "5000+",
    spec: ["Marriage & Couples", "De-addiction", "Family Therapy", "Relationship Counselling"],
    langs: "English, Hindi, Malayalam, Tamil",
  },
  {
    name: "Dr. V.S. Ananthakrishnan",
    role: "Consultant Psychiatrist · MBBS, MD (Psychiatry)",
    hours: "8000+",
    spec: ["Psychiatry", "Sexology", "Couples Therapy", "Marriage Counselling"],
    langs: "English, Hindi, Malayalam, Tamil",
  },
];

const WHY = [
  {
    icon: Armchair,
    title: "A Space That Feels Different",
    body: "Therapy in a café-style setting — not a clinical room. Our spaces are designed to feel comfortable, calm, and private.",
  },
  {
    icon: Languages,
    title: "Sessions in Malayalam",
    body: "Every therapist speaks Malayalam fluently. You never have to explain yourself in a language that isn't yours.",
  },
  {
    icon: Award,
    title: "Licensed & Experienced",
    body: "Every Kappiness therapist holds a post-graduate clinical qualification. Sessions with professionals, not trainees.",
  },
  {
    icon: Lock,
    title: "Complete Confidentiality",
    body: "What you share stays with your therapist. We follow strict professional ethics and confidentiality standards.",
  },
];

const SPACES = [
  {
    title: "The Mud House Room",
    body: "Sustainable, traditional materials create a grounding, natural, and safe environment.",
    tint: "from-[oklch(0.72_0.08_75)] to-[oklch(0.55_0.07_60)]",
    emoji: "🏡",
  },
  {
    title: "The Garden Retreat",
    body: "An open-air private retreat surrounded by calming greenery for peaceful reflection.",
    tint: "from-[oklch(0.78_0.09_140)] to-[oklch(0.55_0.09_155)]",
    emoji: "🌿",
  },
  {
    title: "Mental Health Café",
    body: "A warm, café-style reception that feels comfortable, cozy, and pressure-free.",
    tint: "from-[oklch(0.82_0.07_60)] to-[oklch(0.6_0.08_50)]",
    emoji: "☕",
  },
  {
    title: "Private Therapy Rooms",
    body: "Soundproofed, cozy spaces with soft lighting and relaxed seating for total comfort.",
    tint: "from-[oklch(0.8_0.04_120)] to-[oklch(0.5_0.05_130)]",
    emoji: "🛋️",
  },
];

const STEPS = [
  {
    n: "01",
    icon: Heart,
    title: "Choose What You Need Help With",
    body: "Select your concern from our areas of support. We'll help you find the right psychologist for your needs.",
    points: ["Anxiety, depression, relationships & more", "Personalised matching", "100% confidential"],
  },
  {
    n: "02",
    icon: CalendarCheck,
    title: "Pick Your Psychologist & Time",
    body: "Browse profiles, check availability and book a time that works best for you.",
    points: ["Licensed & experienced psychologists", "Flexible timing options", "Same-week appointments"],
  },
  {
    n: "03",
    icon: Video,
    title: "Connect & Start Your Session",
    body: "Meet in person at our Vazhuthacaud centre or join securely from home — and start feeling better, one step at a time.",
    points: ["Secure video sessions", "Private & encrypted platform", "Support every step of the way"],
  },
];

const TESTIMONIALS = [
  { quote: "The sessions helped me manage my anxiety better. I feel calmer and more confident every day.", name: "Anjana P.", place: "Vazhuthacaud, Trivandrum" },
  { quote: "My therapist truly understood me. The online sessions are convenient and very effective.", name: "Vishnu S.", place: "Trivandrum" },
  { quote: "We had struggled in our marriage for years. Counselling helped us rebuild our bond beautifully.", name: "Reshma & Arjun", place: "Kollam" },
  { quote: "Talking to a professional really helped me reduce stress and focus on my goals.", name: "Melvin T.", place: "Pattom, Trivandrum" },
  { quote: "I was skeptical about online therapy, but my counsellor's warmth made me feel instantly comfortable.", name: "Divya K.", place: "Kottarakkara, Kollam" },
  { quote: "Worked through my burnout step-by-step. The late evening slots were perfect for me.", name: "Sanjay R.", place: "Kazhakkoottam, Trivandrum" },
  { quote: "Couple counselling helped us communicate so much better. Highly recommend their professional team.", name: "Priyanka M.", place: "Karunagappally, Kollam" },
  { quote: "They helped me process grief in a safe, non-judgmental environment.", name: "Rahul Krishnan", place: "Peroorkada, Trivandrum" },
  { quote: "Our marriage is in a much healthier space today. Grateful for the patience and guidance.", name: "Neethu & Vivek", place: "Kollam" },
  { quote: "Helped me manage workplace stress and restore a healthy sleep cycle. Truly life-changing.", name: "Anoop George", place: "Neyyattinkara, Trivandrum" },
];

const MEDIA = [
  { outlet: "Mathrubhumi News", mins: "8:45", initial: "M" },
  { outlet: "Asianet News", mins: "6:20", initial: "A" },
  { outlet: "Amrita TV", mins: "12:15", initial: "A" },
  { outlet: "Manorama News", mins: "5:30", initial: "M" },
];

const FAQS = [
  {
    q: "How much does a session cost?",
    a: "Fees depend on the therapy type and the therapist's specialisation. Call or WhatsApp us and our coordinators will share detailed pricing for the exact support you need.",
  },
  {
    q: "Do you offer both in-person and online sessions?",
    a: "Yes. You can meet your psychologist in person at our Vazhuthacaud centre in Trivandrum, or join a secure online session from home — video, audio, or chat.",
  },
  {
    q: "Which languages can I take sessions in?",
    a: "Sessions are available in Malayalam, English, Tamil and Hindi. Every therapist speaks Malayalam fluently, so you never have to explain yourself in a language that isn't yours.",
  },
  {
    q: "Is everything I share confidential?",
    a: "Completely. What you share stays with your therapist. We follow strict professional ethics and confidentiality standards, and our platform is encrypted end to end.",
  },
  {
    q: "How soon can I get an appointment?",
    a: "Same-week — and often same-day — appointments are available. During working hours (9 AM – 9 PM IST, every day) our coordinators respond within 2 hours.",
  },
  {
    q: "Are your psychologists licensed?",
    a: "Every therapist at Kappiness holds a post-graduate clinical qualification and is licensed and verified. You meet professionals, not trainees.",
  },
];

const AVATAR_TINTS = [
  "bg-[oklch(0.92_0.03_130)] text-[oklch(0.4_0.06_150)]",
  "bg-[oklch(0.93_0.035_95)] text-[oklch(0.42_0.07_60)]",
  "bg-[oklch(0.9_0.04_160)] text-[oklch(0.38_0.07_155)]",
  "bg-[oklch(0.92_0.03_80)] text-[oklch(0.42_0.06_70)]",
];

const initialsOf = (name: string) =>
  name
    .replace("Dr. ", "")
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

/* ------------------------------------------------------------------ */
/* Shared pieces                                                       */
/* ------------------------------------------------------------------ */

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
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: string;
}) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <Badge
        variant="outline"
        className="mb-4 rounded-full border-primary/25 bg-primary/5 px-3 py-1 text-[11px] font-semibold tracking-[0.14em] text-primary uppercase"
      >
        {eyebrow}
      </Badge>
      <h2 className="font-display text-3xl leading-tight font-semibold text-balance sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {sub ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{sub}</p>
      ) : null}
    </Reveal>
  );
}

function StatPill({
  icon: Icon,
  big,
  small,
}: {
  icon: ElementType;
  big: string;
  small: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card/90 px-4 py-3 shadow-sm">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="size-5" />
      </div>
      <div className="leading-tight">
        <p className="text-lg font-bold tracking-tight">{big}</p>
        <p className="text-xs text-muted-foreground">{small}</p>
      </div>
    </div>
  );
}

function CallButtons({ centered = false }: { centered?: boolean }) {
  return (
    <div className={`flex flex-wrap gap-3 ${centered ? "justify-center" : ""}`}>
      <Button asChild size="lg" className="h-12 rounded-full px-7 text-[15px] shadow-lg shadow-primary/20">
        <a href={`tel:${PHONE_TEL}`}>
          <Phone className="size-4" /> Call Now
        </a>
      </Button>
      <Button
        asChild
        size="lg"
        variant="outline"
        className="h-12 rounded-full border-primary/30 bg-card/70 px-7 text-[15px] hover:bg-primary/5 hover:text-primary"
      >
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
          <MessageCircle className="size-4" /> Chat on WhatsApp
        </a>
      </Button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sections                                                            */
/* ------------------------------------------------------------------ */

function TopBar() {
  return (
    <div className="bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-1 px-4 py-2 text-xs font-medium sm:justify-between">
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="size-3.5" /> Licensed & Qualified Therapists
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Lock className="size-3.5" /> Private & Confidential
          </span>
          <span className="hidden items-center gap-1.5 sm:inline-flex">
            <Languages className="size-3.5" /> Malayalam, English & Tamil
          </span>
        </div>
        <a
          href={`tel:${PHONE_TEL}`}
          className="hidden items-center gap-1.5 font-semibold underline-offset-2 hover:underline sm:inline-flex"
        >
          <Phone className="size-3.5" /> {PHONE_DISPLAY}
        </a>
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
      className={`sticky top-0 z-40 w-full transition-all ${
        scrolled ? "bg-background/85 shadow-sm backdrop-blur-lg" : "bg-background/60 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2.5">
          <img src={logo} alt="Kappiness" className="size-9 rounded-lg" />
          <span className="font-display text-xl font-semibold tracking-tight">Kappiness</span>
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
              <Phone className="size-4" /> Call Now
            </a>
          </Button>
          <Button asChild size="sm" className="rounded-full">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="size-4" /> Book on WhatsApp
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

function Hero() {
  return (
    <section id="top" className="hero-veil grain relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 pt-14 pb-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pt-20 lg:pb-28">
        <Reveal>
          <Badge className="mb-6 gap-1.5 rounded-full bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-primary ring-1 ring-primary/20">
            <MapPin className="size-3.5" /> Vazhuthacaud, Thiruvananthapuram
          </Badge>
          <h1 className="font-display text-4xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Psychologist in{" "}
            <span className="relative whitespace-nowrap text-primary">
              Trivandrum
              <svg
                className="absolute -bottom-2 left-0 w-full text-primary/40"
                viewBox="0 0 200 12"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path d="M3 9C50 3.5 150 3.5 197 8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Licensed psychologists and counsellors at Kappiness. In-person sessions,
            same-week appointments available — in Malayalam, English & Tamil.
          </p>

          <div className="mt-8">
            <CallButtons />
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <span className="flex items-center gap-0.5 text-amber-500">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </span>
              <span className="font-semibold text-foreground">4.9</span> Google rating
            </span>
            <span className="hidden h-4 w-px bg-border sm:block" />
            <span>
              <strong className="font-semibold text-foreground">100,000+</strong> sessions completed
            </span>
            <span className="hidden h-4 w-px bg-border sm:block" />
            <span>
              <strong className="font-semibold text-foreground">20,000+</strong> clients served
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="relative">
          <div className="animate-float-y relative mx-auto max-w-md">
            <div
              className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/15 via-transparent to-chart-2/15 blur-2xl"
              aria-hidden
            />
            <Card className="relative overflow-hidden rounded-[1.75rem] border-border/60 shadow-xl shadow-primary/5">
              <CardContent className="p-0">
                <div className="flex items-center justify-between border-b border-border/60 bg-primary/5 px-5 py-3.5">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <CalendarCheck className="size-4 text-primary" /> Today's Appointment
                  </div>
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                    Confirmed
                  </span>
                </div>
                <div className="space-y-4 p-5">
                  <div className="flex items-center gap-4">
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Clock className="size-5" />
                    </div>
                    <div>
                      <p className="font-display text-2xl font-semibold">2:30 PM</p>
                      <p className="text-xs text-muted-foreground">Private session · Mud House Room</p>
                    </div>
                  </div>
                  <div className="rounded-xl bg-muted/70 p-4">
                    <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                      <ShieldCheck className="size-3.5 text-primary" /> 256-bit Encryption · 100% Confidential
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {["Malayalam", "English", "Tamil"].map((lang) => (
                        <Badge key={lang} variant="secondary" className="rounded-full text-[11px]">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="rounded-xl border border-border/60 p-3">
                      <p className="font-display text-xl font-semibold text-primary">20+</p>
                      <p className="text-[11px] text-muted-foreground">Licensed therapists</p>
                    </div>
                    <div className="rounded-xl border border-border/60 p-3">
                      <p className="font-display text-xl font-semibold text-primary">10+</p>
                      <p className="text-[11px] text-muted-foreground">Years experience</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="absolute -top-5 -right-3 hidden animate-soft-pulse items-center gap-2 rounded-full border border-border/60 bg-card px-4 py-2 text-xs font-semibold shadow-md sm:flex">
              <Sparkles className="size-3.5 text-primary" /> 4.9 · Trusted by Kerala families
            </div>
            <div className="absolute -bottom-5 -left-3 hidden items-center gap-2 rounded-full border border-border/60 bg-card px-4 py-2 text-xs font-semibold shadow-md sm:flex">
              <Video className="size-3.5 text-primary" /> In-person & online sessions
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function StatsStrip() {
  const stats = [
    { icon: CalendarCheck, big: "100,000+", small: "Sessions completed" },
    { icon: Star, big: "4.9", small: "Google rating" },
    { icon: Lock, big: "100%", small: "Private & confidential" },
    { icon: HeartHandshake, big: "20,000+", small: "Clients served" },
  ];
  return (
    <section className="border-y border-border/60 bg-card/60">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 py-6 sm:px-6 lg:grid-cols-4">
        {stats.map((s) => (
          <StatPill key={s.small} icon={s.icon} big={s.big} small={s.small} />
        ))}
      </div>
    </section>
  );
}

function Concerns() {
  return (
    <section id="concerns" className="scroll-mt-24 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Find Support"
          title="What Brings You Here Today?"
          sub="Life can be challenging. You don't have to face it alone. Choose what you're struggling with and take the first step towards feeling better."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CONCERNS.map((c, i) => (
            <Reveal key={c.title} delay={Math.min(i * 0.04, 0.3)}>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="card-lift group block h-full rounded-2xl border border-border/70 bg-card p-5 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <c.icon className="size-5" />
                  </div>
                  <ArrowRight className="size-4 -translate-x-1 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                </div>
                <h3 className="mt-4 font-semibold tracking-tight">{c.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.sub}</p>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-10">
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border bg-accent/40 px-6 py-6 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <p className="font-semibold">Not sure where to start?</p>
              <p className="text-sm text-muted-foreground">Our team is here to help you find the right support.</p>
            </div>
            <div className="flex gap-2">
              <Button asChild variant="outline" className="rounded-full">
                <a href={`tel:${PHONE_TEL}`}>
                  <Phone className="size-4" /> Call Now
                </a>
              </Button>
              <Button asChild className="rounded-full">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="size-4" /> WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function WhyKappiness() {
  return (
    <section className="border-y border-border/60 bg-card/50 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Why Kappiness"
          title="Why People in Trivandrum Choose Kappiness"
          sub="We combine clinical expertise with a unique therapeutic space to provide premium mental health support."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.08}>
              <div className="card-lift h-full rounded-2xl border border-border/70 bg-card p-6 shadow-sm">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <w.icon className="size-6" />
                </div>
                <h3 className="mt-5 font-semibold tracking-tight">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Therapists() {
  return (
    <section id="therapists" className="scroll-mt-24 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Expert Care You Can Trust"
          title="Meet Our Licensed Psychologists"
          sub="Experienced, compassionate and here to help you heal. Choose a psychologist who understands you."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {THERAPISTS.map((t, i) => (
            <Reveal key={t.name} delay={Math.min(i * 0.05, 0.35)}>
              <div className="card-lift flex h-full flex-col rounded-2xl border border-border/70 bg-card p-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <div
                    className={`font-display flex size-14 shrink-0 items-center justify-center rounded-2xl text-lg font-semibold ${
                      AVATAR_TINTS[i % AVATAR_TINTS.length]
                    }`}
                  >
                    {initialsOf(t.name)}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-semibold tracking-tight">{t.name}</p>
                    <p className="text-xs leading-snug text-muted-foreground">{t.role}</p>
                  </div>
                </div>

                <div className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  <Clock className="size-3.5" /> {t.hours} therapy hrs
                </div>

                <div className="mt-4 flex-1">
                  <p className="text-[11px] font-semibold tracking-[0.12em] text-muted-foreground uppercase">
                    Specialisations
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {t.spec.map((s) => (
                      <Badge key={s} variant="secondary" className="rounded-full text-[11px] font-normal">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mt-5 space-y-3 border-t border-border/60 pt-4">
                  <p className="flex items-start gap-1.5 text-xs text-muted-foreground">
                    <Languages className="mt-0.5 size-3.5 shrink-0" /> {t.langs}
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="rounded-full text-[11px] font-normal">
                      <Video className="size-3" /> Video & Audio
                    </Badge>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                    >
                      <MessageCircle className="size-3.5" /> WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Spaces() {
  return (
    <section id="space" className="scroll-mt-24 border-y border-border/60 bg-card/50 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Our Trivandrum Centre"
          title="A Different Kind of Therapy Space"
          sub="We designed Kappiness to feel like somewhere you'd want to be — not somewhere you feel you have to go."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SPACES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className="card-lift group h-full overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm">
                <div
                  className={`relative flex h-36 items-center justify-center bg-gradient-to-br ${s.tint} text-4xl`}
                >
                  <span className="drop-shadow-sm transition-transform duration-500 group-hover:scale-110">
                    {s.emoji}
                  </span>
                  <div className="grain absolute inset-0" aria-hidden />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-24 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Simple. Private. Effective."
          title="How Counselling Works"
          sub="Getting support is easier than you think. Follow these simple steps and start your journey towards a happier, healthier you."
        />
        <div className="relative mt-14 grid gap-6 lg:grid-cols-3">
          <div
            className="absolute top-8 right-[16%] left-[16%] hidden border-t-2 border-dashed border-border lg:block"
            aria-hidden
          />
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.12} className="relative">
              <div className="card-lift h-full rounded-2xl border border-border/70 bg-card p-6 text-center shadow-sm">
                <div className="relative mx-auto flex size-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/25">
                  <s.icon className="size-7" />
                  <span className="absolute -top-2 -right-2 rounded-full bg-foreground px-2 py-0.5 text-[10px] font-bold text-background">
                    {s.n}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                <ul className="mt-4 space-y-2 text-left">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span className="text-muted-foreground">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15} className="mt-12 text-center">
          <p className="font-display text-xl font-medium text-balance">
            You don't have to go through it alone. We're here for you.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Take the first step towards a better tomorrow. We'll walk with you.
          </p>
          <div className="mt-6">
            <CallButtons centered />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Testimonials() {
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];
  return (
    <section className="overflow-hidden border-y border-border/60 bg-card/50 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Real Stories. Real Healing."
          title="Trusted by Thousands Across Kerala"
          sub="Every journey is unique. Here's what our clients have to say about their experience with Kappiness."
        />
      </div>
      <div className="relative mt-12">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-28" />
        <div className="animate-marquee flex w-max gap-5 px-4 hover:[animation-play-state:paused]">
          {doubled.map((t, i) => (
            <div
              key={`${t.name}-${i}`}
              className="w-80 shrink-0 rounded-2xl border border-border/70 bg-card p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <Quote className="size-5 text-primary/50" />
                <div className="flex gap-0.5 text-amber-500">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <Star key={s} className="size-3.5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground/90">"{t.quote}"</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.place}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-muted-foreground">
          To protect the privacy of our clients, all names have been changed.
        </p>
      </div>
    </section>
  );
}

function Media() {
  return (
    <section className="py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Featured Across Trusted Media"
          title="Our Story in the Spotlight"
          sub="See how Kappiness is creating meaningful conversations around mental wellbeing across Kerala's leading media platforms."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {MEDIA.map((m, i) => (
            <Reveal key={`${m.outlet}-${i}`} delay={i * 0.08}>
              <div className="card-lift group h-full overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm">
                <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-muted to-accent">
                  <div className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-transform duration-300 group-hover:scale-110">
                    <Play className="ml-0.5 size-6 fill-current" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                      {m.initial}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{m.outlet}</p>
                      <p className="text-xs text-muted-foreground">{m.mins}</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-primary">Watch</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-14">
          <div className="mx-auto max-w-3xl rounded-2xl border border-border/70 bg-card p-8 text-center shadow-sm">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
              As featured in
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {["Mathrubhumi", "Asianet News", "Amrita TV", "Manorama"].map((b) => (
                <span key={b} className="font-display text-lg font-semibold text-foreground/60">
                  {b}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Faqs() {
  return (
    <section id="faqs" className="scroll-mt-24 border-y border-border/60 bg-card/50 py-20 lg:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Got Questions? We've Got Answers."
          title="Common Questions"
          sub="Everything you need to know about our psychological and counselling services in Thiruvananthapuram."
        />
        <Reveal delay={0.1} className="mt-10">
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
    </section>
  );
}

function Contact() {
  return (
    <section className="py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="hero-veil grain relative overflow-hidden rounded-3xl border border-border/70 p-8 shadow-lg shadow-primary/5 sm:p-12">
          <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <Badge className="mb-5 rounded-full bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-primary ring-1 ring-primary/20">
                <Sparkles className="size-3.5" /> Ready When You Are
              </Badge>
              <h2 className="font-display text-3xl leading-tight font-semibold text-balance sm:text-4xl">
                Ready to Take the First Step?
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
                You don't have to go through it alone. We're here to listen, support and help you heal.
              </p>
              <div className="mt-8">
                <CallButtons />
              </div>
              <div className="mt-8 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {AVATAR_TINTS.map((tint, i) => (
                    <div
                      key={i}
                      className={`flex size-9 items-center justify-center rounded-full border-2 border-background text-[11px] font-bold ${tint}`}
                    >
                      {["A", "W", "R", "S"][i]}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  <strong className="font-semibold text-foreground">20k+</strong> trusted by individuals and
                  families across Kerala.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm">
              <h3 className="font-semibold tracking-tight">Visit Our Centre</h3>
              <p className="mt-1 text-xs text-muted-foreground">Kappiness Mental Health and Therapeutic Centre</p>
              <div className="mt-5 space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <MapPin className="size-4" />
                  </div>
                  <p className="leading-relaxed text-muted-foreground">{ADDRESS}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Clock className="size-4" />
                  </div>
                  <p className="text-muted-foreground">
                    9 AM – 9 PM IST · Every day
                    <span className="block text-xs">Response within 2 hours during working hours</span>
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Phone className="size-4" />
                  </div>
                  <a href={`tel:${PHONE_TEL}`} className="font-semibold text-primary hover:underline">
                    {PHONE_DISPLAY}
                  </a>
                </div>
              </div>
              <Button asChild variant="outline" className="mt-6 w-full rounded-full">
                <a href={MAPS_URL} target="_blank" rel="noopener noreferrer">
                  <Navigation className="size-4" /> Get Directions
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60 bg-card/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="flex flex-col items-center gap-6 text-center">
          <a href="#top" className="flex items-center gap-2.5">
            <img src={logo} alt="Kappiness" className="size-9 rounded-lg" />
            <span className="font-display text-xl font-semibold tracking-tight">Kappiness</span>
          </a>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            Licensed psychologists in Vazhuthacaud, Thiruvananthapuram. In-person and online counselling —
            private, confidential, and in your language.
          </p>
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-muted-foreground transition-colors hover:text-foreground">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            {[
              { icon: Instagram, label: "Instagram" },
              { icon: Facebook, label: "Facebook" },
              { icon: Youtube, label: "YouTube" },
            ].map((s) => (
              <a
                key={s.label}
                href="#top"
                aria-label={s.label}
                className="flex size-9 items-center justify-center rounded-full border border-border/70 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                <s.icon className="size-4" />
              </a>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <Button asChild size="sm" className="rounded-full">
              <a href={`tel:${PHONE_TEL}`}>
                <Phone className="size-3.5" /> {PHONE_DISPLAY}
              </a>
            </Button>
            <Button asChild size="sm" variant="outline" className="rounded-full">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="size-3.5" /> WhatsApp
              </a>
            </Button>
          </div>
          <p className="pt-2 text-xs text-muted-foreground">
            © {new Date().getFullYear()} Kappiness Mental Health and Therapeutic Centre · Vazhuthacaud,
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
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed right-5 bottom-5 z-50 flex size-14 items-center justify-center rounded-full bg-[oklch(0.62_0.15_155)] text-white shadow-xl shadow-primary/25 transition-transform hover:scale-105"
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
        <StatsStrip />
        <Concerns />
        <WhyKappiness />
        <Therapists />
        <Spaces />
        <HowItWorks />
        <Testimonials />
        <Media />
        <Faqs />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
