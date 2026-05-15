"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { BsTelegram, BsTwitterX } from "react-icons/bs";
import {
  HiArrowLongRight,
  HiBars3,
  HiEnvelope,
  HiXMark,
} from "react-icons/hi2";
import "./Home.css";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Tokenomics", href: "#tokenomics" },
  { label: "Road Map", href: "#roadmap" },
  { label: "Use Cases", href: "#use-cases" },
];

const aboutCards = [
  {
    title: "Our Vision",
    image: "/images/rocket.png",
    accent: "orange",
    lead: "“From Learning to Earning — For Everyone, Everywhere.”",
    bullets: [
      "Learning is directly connected to earning",
      "Skills are verifiable and globally trusted",
      "Opportunities are accessible to everyone",
    ],
    closing:
      "LANDE enables free and subsidized education for underserved communities through token incentives, scholarships, and ecosystem funding—ensuring that anyone, anywhere, can build a sustainable future.",
  },
  {
    title: "The Problem",
    image: "/images/error.png",
    accent: "orange",
    lead: "Millions of learners gain skills—but struggle to:",
    bullets: [
      "Prove their abilities",
      "Earn from their knowledge",
      "Access real job opportunities",
    ],
  },
  {
    title: "The Solution",
    image: "/images/light.png",
    accent: "green",
    lead: "LANDE combines:",
    bullets: [
      "AI-powered personalized learning",
      "Blockchain-based skill certification",
      "Tokenized rewards (Learn-to-Earn)",
      "Global talent marketplace",
    ],
    closing: "Creating a direct path from learning → earning → employment",
  },
];

const useCases = [
  {
    title: "Learn Skills. Earn Tokens. Build Your Future.",
    image: "/images/skill.png",
    accent: "orange",
    copy: "LANDE is a Learn-and-Earn education ecosystem powered by AI and blockchain, designed to help you gain real skills, earn rewards, and connect with global career opportunities.",
    bullets: [
      "Start Learning",
      "Explore Courses",
      "Learn-to-Earn Rewards System",
      "Verified Blockchain Certificates",
      "Global Job Matching Platform",
      "Skill Marketplace",
    ],
  },
  {
    title: "Utility of LANDE Token",
    image: "/images/energetic.png",
    accent: "orange",
    copy: "LANDE token powers the ecosystem through:",
    bullets: [
      "Course purchases",
      "Premium AI subscriptions",
      "Reward distribution",
      "Governance voting",
      "Scholarship funding",
      "Staking and passive rewards",
      "Mentor and tutor payments",
      "Hiring platform fees",
    ],
  },
  {
    title: "Revenue Model",
    image: "/images/salary.png",
    accent: "green",
    copy: "Revenue streams include:",
    bullets: [
      "Premium subscriptions",
      "Marketplace commissions",
      "AI tutoring fees",
      "Certification fees",
      "Employer recruitment services",
      "Sponsored courses and partnerships",
    ],
  },
];

const tokenomicsData = [
  { label: "Pre-sale round - 1", value: 7, color: "#FF9D11" },
  { label: "Pre-sale round - 2", value: 7, color: "#F2472C" },
  { label: "Pre-sale round - 3", value: 6, color: "#FEE97D" },
  { label: "Rewards L2E", value: 15, color: "#7A5AF8" },
  { label: "scholarship & Community", value: 25, color: "#23C16B" },
  { label: "Ecosystem incentives", value: 15, color: "#00C2FF" },
  { label: "Team", value: 12, color: "#2D6BFF" },
  { label: "Treasury", value: 8, color: "#C45BFF" },
  { label: "Liquidity & listings", value: 5, color: "#FF4FA3" },
];

const roadmap = [
  {
    phase: "PHASE 01",
    status: "COMPLETED",
    title: "Foundation (Q2 2026)",
    image: "/images/phase1.png",
    side: "left",
    items: [
      "Whitepaper release",
      "Website launch",
      "Smart contract development",
      "Road Map",
    ],
  },
  {
    phase: "PHASE 02",
    status: "IN PROGRESS",
    title: "Platform Beta (Q3 2026)",
    image: "/images/layers.png",
    side: "right",
    items: [
      "Community building",
      "Wallet integration",
      "AI learning course onboarding",
      "Private/Pre sale",
    ],
  },
  {
    phase: "PHASE 03",
    status: "IN PROGRESS",
    title: "Ecosystem Launch (Q4 2026)",
    image: "/images/rocket.png",
    side: "left",
    items: [
      "Token listing Exchanges",
      "NFT certifications",
      "Mobile app",
      "Public marketplace",
    ],
  },
  {
    phase: "PHASE 04",
    status: "IN PROGRESS",
    title: "Career Expansion (Q2 2027)",
    image: "/images/bag.png",
    side: "right",
    items: [
      "Job portal launch",
      "Employer partnerships",
      "Scholarship DAO",
      "Ambassador program",
    ],
  },
  {
    phase: "PHASE 05",
    status: "IN PROGRESS",
    title: "Global Expansion (Q3 2027)",
    image: "/images/world.png",
    side: "left",
    items: [
      "University collaborations",
      "Enterprise solutions",
      "Multi-language support",
      "Regional hubs",
    ],
  },
];

type FooterLink = {
  label: string;
  href: string;
  icon?: boolean;
};

type FooterColumn = {
  heading: string;
  links: FooterLink[];
};

const footerColumns: FooterColumn[] = [
  {
    heading: "PAGES",
    links: [
      { label: "HOME", href: "#home" },
      { label: "TOKENOMICS", href: "#tokenomics" },
      { label: "ROAD MAP", href: "#roadmap" },
      { label: "USE CASES", href: "#use-cases" },
    ],
  },
  {
    heading: "CONTACT",
    links: [
      {
        label: "info@learnandearnlande.com",
        href: "mailto:info@learnandearnlande.com",
        icon: true,
      },
    ],
  },
];

const donationMethods = [
  { label: "USDT (TRC20)", hint: "Wallet ending 4X7P" },
  { label: "Solana", hint: "Wallet ending 2C9v" },
  { label: "Ethereum", hint: "Wallet ending 3D1Q" },
];

const SOLANA_ADDRESS = "Fyt7uy5TxCcwzULiyR3uqm1TwPrCDB8XSmkKhYj72C9v";
const donationOptions = [
  { amount: "$50.00" },
  { amount: "$100.00" },
  { amount: "$200.00" },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" as const },
  },
};

function SectionDivider() {
  return (
    <div className="lande-divider" aria-hidden="true">
      <span />
    </div>
  );
}

type CardProps = (typeof aboutCards)[number];

function InfoCard({ title, image, accent, lead, bullets, closing }: CardProps) {
  return (
    <motion.article
      className={`lande-card lande-card-${accent}`}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      <div className="lande-card-title">
        <Image src={image} alt="" width={34} height={34} />
        <h3>{title}</h3>
      </div>
      <p className="lande-card-lead">{lead}</p>
      <ul>
        {bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
      {closing ? <p className="lande-card-closing">{closing}</p> : null}
    </motion.article>
  );
}

function TokenomicsChart() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const radius = 104;
  const circumference = 2 * Math.PI * radius;
  let cumulative = 0;

  return (
    <motion.div
      className="lande-tokenomics-chart-card"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      <div
        className="lande-tokenomics-chart"
        aria-label="Tokenomics distribution pie chart"
        role="img"
      >
        <svg
          className="lande-tokenomics-chart-svg"
          viewBox="0 0 260 260"
          aria-hidden="true"
        >
          <circle
            cx="130"
            cy="130"
            r={radius}
            className="lande-tokenomics-chart-track"
          />
          {tokenomicsData.map((item, index) => {
            const segmentLength = (item.value / 100) * circumference;
            const rotation = (cumulative / 100) * 360 - 90;
            cumulative += item.value;

            return (
              <circle
                key={item.label}
                cx="130"
                cy="130"
                r={radius}
                className={`lande-tokenomics-chart-segment ${
                  activeIndex === index ? "is-active" : ""
                }`}
                stroke={item.color}
                strokeDasharray={`${segmentLength} ${circumference}`}
                strokeWidth="44"
                transform={`rotate(${rotation} 130 130)`}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              />
            );
          })}
        </svg>
        <div className="lande-tokenomics-chart-core">
          <span>LANDE</span>
          <strong>100%</strong>
        </div>
      </div>

      <div className="lande-tokenomics-legend">
        {tokenomicsData.map((item, index) => (
          <div
            key={item.label}
            className={`lande-tokenomics-legend-item ${
              activeIndex === index ? "is-active" : ""
            }`}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <span
              className="lande-tokenomics-legend-swatch"
              style={{ backgroundColor: item.color }}
              aria-hidden="true"
            />
            <span className="lande-tokenomics-legend-label">{item.label}</span>
            <span
              className="lande-tokenomics-legend-value"
              style={{ color: item.color }}
            >
              {item.value.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function FakeQrCode({ value }: { value: string }) {
  const size = 21;
  const cells = Array.from({ length: size * size }, (_, index) => {
    const x = index % size;
    const y = Math.floor(index / size);
    const charCode = value.charCodeAt(index % value.length) ?? 0;
    const on =
      x < 3 || y < 3 || x > size - 4 || y > size - 4
        ? false
        : (charCode + x * 7 + y * 13) % 3 === 0;

    return { x, y, on };
  });

  return (
    <svg
      className="lande-fake-qr-svg"
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
    >
      <rect width={size} height={size} fill="#ffffff" />
      {cells
        .filter((cell) => cell.on)
        .map((cell) => (
          <rect
            key={`${cell.x}-${cell.y}`}
            x={cell.x}
            y={cell.y}
            width="1"
            height="1"
            fill="#111111"
          />
        ))}
      <rect
        x="1"
        y="1"
        width="5"
        height="5"
        fill="none"
        stroke="#111111"
        strokeWidth="1"
      />
      <rect x="2" y="2" width="3" height="3" fill="#111111" />
      <rect
        x="15"
        y="1"
        width="5"
        height="5"
        fill="none"
        stroke="#111111"
        strokeWidth="1"
      />
      <rect x="16" y="2" width="3" height="3" fill="#111111" />
      <rect
        x="1"
        y="15"
        width="5"
        height="5"
        fill="none"
        stroke="#111111"
        strokeWidth="1"
      />
      <rect x="2" y="16" width="3" height="3" fill="#111111" />
    </svg>
  );
}

export default function Home() {
  const shouldReduceMotion = useReducedMotion();
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const timelineTrackRef = useRef<HTMLDivElement | null>(null);
  const timelineDotRefs = useRef<Array<HTMLDivElement | null>>([]);
  const supportPanelRef = useRef<HTMLDivElement | null>(null);
  const [roadmapProgressValue, setRoadmapProgressValue] = useState(0);
  const [roadmapThresholds, setRoadmapThresholds] = useState<number[]>([]);
  const [supportExpanded, setSupportExpanded] = useState(false);
  const [donationOpen, setDonationOpen] = useState(false);
  const [comingSoonOpen, setComingSoonOpen] = useState(false);
  const [headerMenuOpen, setHeaderMenuOpen] = useState(false);
  const [selectedDonationIndex, setSelectedDonationIndex] = useState(1);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 35%"],
  });
  const roadmapProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    document.body.style.overflow =
      donationOpen || comingSoonOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [comingSoonOpen, donationOpen]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setRoadmapProgressValue(latest);
  });

  useEffect(() => {
    const measureThresholds = () => {
      if (!timelineTrackRef.current) return;

      const trackRect = timelineTrackRef.current.getBoundingClientRect();
      const nextThresholds = timelineDotRefs.current.map((dot) => {
        if (!dot) return 0;
        const dotRect = dot.getBoundingClientRect();
        const threshold =
          (dotRect.top - trackRect.top) / Math.max(trackRect.height, 1);

        return Math.min(1, Math.max(0, threshold));
      });

      setRoadmapThresholds(nextThresholds);
    };

    measureThresholds();
    window.addEventListener("resize", measureThresholds);

    return () => window.removeEventListener("resize", measureThresholds);
  }, []);

  return (
    <main className="lande-page" id="home">
      <div className="lande-support-wrap">
        <button
          type="button"
          className="lande-support-bar"
          onClick={() => setSupportExpanded((open) => !open)}
          aria-expanded={supportExpanded}
          aria-controls="lande-support-panel"
        >
          LANDE Need your support
        </button>
        <AnimatePresence initial={false}>
          {supportExpanded ? (
            <motion.div
              id="lande-support-panel"
              className="lande-support-panel"
              ref={supportPanelRef}
              initial={{ opacity: 0, y: -24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <p>Support the LANDE mission and help us grow the ecosystem.</p>
              <button
                type="button"
                className="lande-support-donate"
                onClick={() => setDonationOpen(true)}
              >
                Make Donation
              </button>
              <button
                type="button"
                className="lande-support-close"
                onClick={() => setSupportExpanded(false)}
                aria-label="Close support panel"
              >
                ×
              </button>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <section className="lande-hero-section">
        <div className="container lande-shell">
          <div className="lande-header-wrap">
            <header className="lande-header navbar navbar-expand-lg p-0">
              <a className="lande-brand" href="#home">
                <Image
                  src="/images/Logo.png"
                  alt="LANDE logo"
                  width={80}
                  height={80}
                />
                <span>LANDE</span>
              </a>
              <nav className="lande-nav lande-nav-desktop">
                {navItems.map((item) => (
                  <a key={item.label} href={item.href}>
                    {item.label}
                  </a>
                ))}
              </nav>
              <div className="lande-header-actions">
                <button
                  type="button"
                  className="lande-buy-btn lande-buy-btn-desktop"
                  onClick={() => setComingSoonOpen(true)}
                >
                  Buy / Sell
                </button>
                <button
                  type="button"
                  className="lande-menu-toggle"
                  onClick={() => setHeaderMenuOpen((open) => !open)}
                  aria-expanded={headerMenuOpen}
                  aria-label="Toggle navigation menu"
                >
                  {headerMenuOpen ? <HiXMark /> : <HiBars3 />}
                </button>
              </div>
            </header>
            <AnimatePresence>
              {headerMenuOpen ? (
                <motion.div
                  className="lande-mobile-menu"
                  initial={{ opacity: 0, y: -18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                >
                  <nav className="lande-mobile-menu-links">
                    {navItems.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={() => setHeaderMenuOpen(false)}
                      >
                        {item.label}
                      </a>
                    ))}
                  </nav>
                  <button
                    type="button"
                    className="lande-buy-btn lande-buy-btn-mobile"
                    onClick={() => {
                      setHeaderMenuOpen(false);
                      setComingSoonOpen(true);
                    }}
                  >
                    Buy / Sell
                  </button>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          <motion.div
            className="lande-hero"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <motion.div
              className="lande-coin lande-coin-solana"
              animate={
                shouldReduceMotion
                  ? undefined
                  : { y: [0, -14, 0], rotate: [0, 4, 0] }
              }
              transition={{
                duration: 5.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src="/images/Solana-logo.png"
                alt="Solana token"
                width={140}
                height={140}
              />
            </motion.div>
            <motion.div
              className="lande-coin lande-coin-ethereum"
              animate={
                shouldReduceMotion
                  ? undefined
                  : { y: [0, 12, 0], rotate: [0, -5, 0] }
              }
              transition={{
                duration: 5.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src="/images/Ethereum.png"
                alt="Ethereum token"
                width={138}
                height={138}
              />
            </motion.div>
            <motion.div
              className="lande-coin lande-coin-ripple"
              animate={
                shouldReduceMotion
                  ? undefined
                  : { y: [0, -10, 0], rotate: [0, 5, 0] }
              }
              transition={{
                duration: 6.1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src="/images/Ripple.png"
                alt="Ripple token"
                width={126}
                height={126}
              />
            </motion.div>
            <motion.div
              className="lande-coin lande-coin-tether"
              animate={
                shouldReduceMotion
                  ? undefined
                  : { y: [0, -12, 0], rotate: [0, 4, 0] }
              }
              transition={{
                duration: 5.9,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src="/images/usd-coin.png"
                alt="Tether token"
                width={132}
                height={132}
              />
            </motion.div>
            <motion.div
              className="lande-coin lande-coin-dash"
              animate={
                shouldReduceMotion
                  ? undefined
                  : { y: [0, 16, 0], rotate: [0, -4, 0] }
              }
              transition={{
                duration: 6.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src="/images/Dash.png"
                alt="Dash token"
                width={128}
                height={128}
              />
            </motion.div>
            <motion.div
              className="lande-coin lande-coin-bitcoin"
              animate={
                shouldReduceMotion
                  ? undefined
                  : { y: [0, -18, 0], rotate: [0, 6, 0] }
              }
              transition={{
                duration: 5.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src="/images/Bitcoin.png"
                alt="Bitcoin token"
                width={144}
                height={144}
              />
            </motion.div>

            <div className="lande-hero-content">
              <span className="lande-pill">Learn &amp; Earn with Lande</span>
              <h1>Learn &amp; Earn with LANDE</h1>
              <p>
                LANDE is a blockchain-powered Learn-to-Earn ecosystem designed
                to transform how people learn, earn, and grow in the global
                economy.
              </p>
              <div className="lande-hero-actions">
                <a className="lande-btn lande-btn-light" href="#tokenomics">
                  Get started with Lande
                </a>
                <a className="lande-btn lande-btn-primary" href="#about">
                  Know more
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="lande-content-section" id="about">
        <div className="container lande-shell">
          <SectionDivider />
          <div className="row g-4 lande-section-heading lande-about-heading align-items-start justify-content-between">
            <div className="col-lg-2">
              <span className="lande-chip lande-about-chip">About Us</span>
            </div>
            <div className="col-lg-8">
              <motion.h2
                className="lande-about-title"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                At LANDE, we believe learning should create real value. Our AI
                and blockchain-powered ecosystem combines education, community
                engagement, and reward-based participation to help users learn
                skills, access opportunities, and grow financially through
                innovation and knowledge.
              </motion.h2>
            </div>
          </div>

          <div className="row g-4 lande-about-grid">
            <div className="col-lg-6">
              <motion.article
                className="lande-card lande-card-orange lande-about-card lande-about-vision"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
              >
                <div className="lande-card-title">
                  <Image
                    src="/images/rocket.png"
                    alt=""
                    width={38}
                    height={38}
                  />
                  <h3>Our Vision</h3>
                </div>
                <p className="lande-card-lead">
                  "From Learning to Earning - For Everyone, Everywhere."
                </p>
                <p className="lande-about-copy">We envision a world where</p>
                <ul>
                  <li>Learning is directly connected to earning</li>
                  <li>Skills are verifiable and globally trusted</li>
                  <li>Opportunities are accessible to everyone</li>
                </ul>
                <p className="lande-card-closing lande-about-emphasis">
                  LANDE enables{" "}
                  <span>
                    free and subsidized education for underserved communities
                  </span>{" "}
                  through token incentives, scholarships, and ecosystem
                  funding-ensuring that anyone, anywhere, can build a
                  sustainable future.
                </p>
              </motion.article>
            </div>
            <div className="col-lg-6 d-flex flex-column gap-4">
              <motion.article
                className="lande-card lande-card-orange lande-about-card lande-about-problem"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
              >
                <div className="lande-card-title">
                  <Image
                    src="/images/error.png"
                    alt=""
                    width={38}
                    height={38}
                  />
                  <h3>The Problem</h3>
                </div>
                <p className="lande-card-lead">
                  Millions of learners gain skills-but struggle to:
                </p>
                <ul>
                  <li>Prove their abilities</li>
                  <li>Earn from their knowledge</li>
                  <li>Access real job opportunities</li>
                </ul>
              </motion.article>
              <motion.article
                className="lande-card lande-card-green lande-about-card lande-about-solution"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
              >
                <div className="lande-card-title">
                  <Image
                    src="/images/light.png"
                    alt=""
                    width={38}
                    height={38}
                  />
                  <h3>The Solution</h3>
                </div>
                <p className="lande-card-lead lande-about-solution-lead">
                  LANDE combines:
                </p>
                <ul>
                  <li>AI-powered personalized learning</li>
                  <li>Blockchain-based skill certification</li>
                  <li>Tokenized rewards (Learn-to-Earn)</li>
                  <li>Global talent marketplace</li>
                </ul>
                <p className="lande-card-closing lande-about-solution-close">
                  Creating a direct path from{" "}
                  <span>
                    learning <HiArrowLongRight /> earning <HiArrowLongRight />{" "}
                    employment
                  </span>
                </p>
              </motion.article>
            </div>
          </div>
        </div>
      </section>

      <section className="lande-content-section" id="tokenomics">
        <div className="container lande-shell">
          <SectionDivider />
          <div className="row g-4 lande-section-heading lande-tokenomics-heading align-items-start justify-content-between">
            <div className="col-lg-8">
              <motion.h2
                className="lande-tokenomics-title"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                Tokenomics
              </motion.h2>
            </div>
          </div>
          <div className="row g-4 align-items-stretch">
            <div className="col-lg-7">
              <motion.div
                className="lande-tokenomics-card lande-about-card"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
              >
                <p className="lande-eyebrow">Total Supply</p>
                <h3>1,000,000,000</h3>
                <p className="lande-tokenomics-copy">
                  LANDE is a blockchain-powered Learn-to-Earn ecosystem designed
                  to transform how people learn, earn, and grow in the global
                  economy.
                </p>
                <div className="lande-stats">
                  <div>
                    <strong>
                      1<span>B</span>
                    </strong>
                    <span>Total Supply</span>
                  </div>
                  <div>
                    <strong>
                      20<span>%</span>
                    </strong>
                    <span>Pre-sale</span>
                  </div>
                </div>
              </motion.div>
            </div>
            <div className="col-lg-5">
              <TokenomicsChart />
            </div>
          </div>
        </div>
      </section>

      <section className="lande-content-section" id="use-cases">
        <div className="container lande-shell">
          <div className="row g-4 lande-section-heading lande-usecases-heading align-items-start justify-content-between">
            <div className="col-lg-2">
              <span className="lande-chip lande-usecases-chip">Use Cases</span>
            </div>
            <div className="col-lg-8">
              <motion.h2
                className="lande-usecases-title"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                Empowering learners with AI education, token rewards,
                certifications, interviews, and global jobs.
              </motion.h2>
            </div>
          </div>

          <div className="row g-4">
            {useCases.map((item) => (
              <div key={item.title} className="col-lg-4">
                <motion.article
                  className={`lande-card lande-card-${item.accent} lande-use-case-card`}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <div className="lande-card-title">
                    <Image src={item.image} alt="" width={34} height={34} />
                    <h3>{item.title}</h3>
                  </div>
                  <p className="lande-card-copy">{item.copy}</p>
                  <ul>
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </motion.article>
              </div>
            ))}
          </div>
          <SectionDivider />
        </div>
      </section>

      <section
        className="lande-content-section lande-roadmap-section"
        id="roadmap"
      >
        <div className="container lande-shell">
          <div className="row g-4 lande-section-heading lande-roadmap-heading align-items-start justify-content-between">
            <div className="col-lg-2">
              <span className="lande-chip lande-roadmap-chip">Road Map</span>
            </div>
            <div className="col-lg-8">
              <motion.h2
                className="lande-roadmap-title"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                A phased journey from platform foundation to global education
                and career expansion.
              </motion.h2>
            </div>
          </div>

          <div className="lande-timeline" ref={timelineRef}>
            <div className="lande-timeline-line" ref={timelineTrackRef} />
            <motion.div
              className="lande-timeline-line lande-timeline-line-active"
              style={{ scaleY: roadmapProgress }}
            />
            {roadmap.map((item, index) => (
              <motion.div
                key={item.phase}
                className={`lande-timeline-row lande-timeline-${item.side}`}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.6 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="lande-timeline-meta">
                  <span>{item.phase}</span>
                  <em
                    className={
                      item.status === "COMPLETED"
                        ? "is-complete"
                        : "is-progress"
                    }
                  >
                    {item.status}
                  </em>
                </div>
                <div
                  ref={(node) => {
                    timelineDotRefs.current[index] = node;
                  }}
                  className={`lande-timeline-dot ${
                    roadmapProgressValue >= (roadmapThresholds[index] ?? 1)
                      ? "is-active"
                      : ""
                  }`}
                />
                <article
                  className={`lande-timeline-card ${
                    roadmapProgressValue >= (roadmapThresholds[index] ?? 1)
                      ? "is-active"
                      : ""
                  }`}
                >
                  <div className="lande-card-title">
                    <Image src={item.image} alt="" width={32} height={32} />
                    <h3>{item.title}</h3>
                  </div>
                  <ul>
                    {item.items.map((entry) => (
                      <li key={entry}>{entry}</li>
                    ))}
                  </ul>
                </article>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="lande-content-section lande-cta-wrap" id="cta">
        <div className="container lande-shell">
          <motion.div
            className="lande-cta"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <h2>
              Start Your Learn-to-Earn Journey Today Join LANDE and turn your
              skills into income.
            </h2>
            <a
              className="lande-btn lande-btn-primary"
              href="https://x.com/LANDETOKEN"
              target="_blank"
              rel="noreferrer"
            >
              Join the community
            </a>
          </motion.div>
        </div>
      </section>

      <footer className="lande-footer">
        <div className="container lande-shell">
          <div className="row g-4 lande-footer-top">
            <div className="col-lg-6 lande-footer-brand-col">
              <div className="lande-footer-brand">
                <Image
                  src="/images/Logo.png"
                  alt="LANDE logo"
                  width={80}
                  height={80}
                />
                <span>LANDE</span>
              </div>
              <p>
                LANDE is a blockchain-powered Learn-to-Earn ecosystem designed
                to transform how people learn, earn, and grow in the global
                economy.
              </p>
              <div className="lande-socials">
                <a
                  href="https://x.com/LANDETOKEN"
                  aria-label="Twitter"
                  target="_blank"
                  rel="noreferrer"
                >
                  <BsTwitterX />
                </a>
                <a
                  href="https://t.me/LearnAndEarn_LANDE"
                  aria-label="Telegram"
                  target="_blank"
                  rel="noreferrer"
                >
                  <BsTelegram />
                </a>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="row g-4 lande-footer-links-group">
                {footerColumns.map((column) => (
                  <div key={column.heading} className="col-sm-4">
                    <h3>{column.heading}</h3>
                    <ul className="lande-footer-links">
                      {column.links.map((link) => (
                        <li key={link.label}>
                          <a href={link.href}>
                            {link.icon && (
                              <HiEnvelope
                                style={{
                                  marginRight: "0.35rem",
                                  verticalAlign: "middle",
                                }}
                              />
                            )}
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lande-disclaimer">
            <h4>Disclaimer</h4>
            <p>
              LANDE is a utility token designed for ecosystem participation and
              access. It is not intended as a guaranteed investment product or
              profit-sharing instrument. Users should review local regulations
              before participation.
            </p>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {comingSoonOpen ? (
          <motion.div
            className="lande-donation-modal-backdrop lande-coming-soon-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setComingSoonOpen(false)}
          >
            <motion.div
              className="lande-coming-soon-modal"
              initial={{ opacity: 0, scale: 0.96, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 18 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="lande-coming-soon-close"
                onClick={() => setComingSoonOpen(false)}
                aria-label="Close coming soon popup"
              >
                ×
              </button>
              <span className="lande-coming-soon-tag">LANDE Trading</span>
              <h3>Buy / Sell is coming soon</h3>
              <p>
                We&apos;re preparing the trading flow to match the rest of the
                LANDE ecosystem. Follow the community for launch updates and
                early access announcements.
              </p>
              <div className="lande-coming-soon-actions">
                <a
                  className="lande-btn lande-btn-primary"
                  href="https://t.me/LearnAndEarn_LANDE"
                  target="_blank"
                  rel="noreferrer"
                >
                  Join Telegram
                </a>
                <button
                  type="button"
                  className="lande-coming-soon-dismiss"
                  onClick={() => setComingSoonOpen(false)}
                >
                  Maybe later
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {donationOpen ? (
          <motion.div
            className="lande-donation-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDonationOpen(false)}
          >
            <motion.div
              className="lande-donation-modal"
              initial={{ opacity: 0, scale: 0.96, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 18 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="lande-donation-modal-head">
                <div>
                  <h3>Donate to LANDE</h3>
                </div>
                <button
                  type="button"
                  className="lande-donation-close"
                  onClick={() => setDonationOpen(false)}
                  aria-label="Close donation popup"
                >
                  ×
                </button>
              </div>
              <p className="lande-donation-copy">
                Use this QR code or address below
              </p>
              <div className="lande-donation-qr-wrap">
                <Image
                  src="/images/code.jpeg"
                  alt="Solana wallet QR code"
                  width={280}
                  height={280}
                />
              </div>
              <span className="lande-donation-address">
                {SOLANA_ADDRESS}
              </span>
              <div className="lande-donation-amounts">
                {donationOptions.map((option, index) => (
                  <button
                    key={option.amount}
                    type="button"
                    className={`lande-donation-amount ${
                      selectedDonationIndex === index ? "is-active" : ""
                    }`}
                    onClick={() => setSelectedDonationIndex(index)}
                  >
                    <strong>{option.amount}</strong>
                  </button>
                ))}
              </div>
              <div className="lande-donation-warning" role="note">
                <span className="lande-donation-warning-icon" aria-hidden="true">
                  i
                </span>
                <p>
                  Only send Solana (SOL) assets to this address. Other assets
                  will be lost forever.
                </p>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}
