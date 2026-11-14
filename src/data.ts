
import {
  Activity,
  Instagram,
  Layers,
  Palette,
  type LucideIcon,
} from "lucide-react";

// ==========================================
// PROFILE
// ==========================================

export const PROFILE = {
  initials: "NK",
  portrait: "",
  portraitAlt: "",
};

export const DEFAULT_PORTRAITS = [
  "/portraits/profil.jpg",
  "/portraits/profil2.jpg",
];

// ==========================================
// NAVIGATION
// ==========================================

export const NAV_LINKS = [
  { label: "Profile", href: "#profile" },
  { label: "Works", href: "#works" },
  { label: "Pulse", href: "#pulse" },
  { label: "Arsenal", href: "#arsenal" },
  { label: "Contact", href: "#contact" },
];

// ==========================================
// TECHNOLOGY STACK
// ==========================================

export const STACK = [
  "React 19",
  "TypeScript",
  "GSAP Motion",
  "Supabase",
  "UI/UX Design Systems",
  "Figma",
  "Tailwind CSS v4",
  "Vite",
];

export const STACK_B = [
  "ScrollTrigger",
  "Flip Animations",
  "InertiaPlugin",
  "Design Tokens",
  "WCAG AA Access",
  "Kinetic Type",
  "Realtime Data",
  "Edge Computing",
];

// ==========================================
// BADGES
// ==========================================

export const BADGES = [
  "REACT 19.1",
  "TS STRICT",
  "VITE 6",
  "TAILWIND v4",
  "GSAP 3.13",
  "SUPABASE",
  "FIGMA TOKENS",
  "60 FPS UI",
  "WCAG AA",
  "TANJUNGPINANG / WIB",
];

// ==========================================
// PROJECT TYPES
// ==========================================

export type Metric = {
  value: string;
  label: string;
};

export type Project = {
  id: string;
  code: string;
  kind: "Development" | "Design";
  hue: string;
  title: string;
  category: string;
  year: string;
  role: string;
  summary: string;
  image: string;
  href?: string;
  stack: string[];
  metrics: Metric[];
  architecture: {
    title: string;
    body: string;
  }[];
};

// ==========================================
// PROJECTS
// ==========================================

// Metrics are illustrative.
// Replace them with verified figures before publishing.

export const PROJECTS: Project[] = [
  // ----------------------------------------
  // 01. ABADI MOTOR SHOWROOM
  // ----------------------------------------

  {
    id: "abadi-motor",
    code: "",
    kind: "Development",
    hue: "34,211,238",
    title: "Abadi Motor Showroom",
    category: "E-commerce · Automotive",
    year: "2025",
    role: "Front-end development, UI design",

    summary:
      "A showroom site for a motor dealership. Buyers filter the catalog, compare models and reach the dealer in a couple of taps, mostly from a phone.",

    image: "/projects/abadi.jpg",

    stack: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "Figma",
    ],

    metrics: [
      { value: "<2s", label: "Target load on 4G" },
      { value: "100%", label: "Responsive layouts" },
      { value: "3", label: "Core buyer flows" },
    ],

    architecture: [
      {
        title: "Interface",
        body: "Typed catalog and detail components share one token set, so new models need no new layouts.",
      },
      {
        title: "Data",
        body: "Supabase tables hold models, variants and media. Filters run against indexed columns.",
      },
      {
        title: "Delivery",
        body: "Route-level code splitting and lazy images keep first paint light on mobile networks.",
      },
    ],
  },

  // ----------------------------------------
  // 02. NAKULA ANTI-SCAM
  // ----------------------------------------

  {
    id: "nakula",
    code: "",
    kind: "Development",
    hue: "129,140,248",
    title: "Nakula Anti-Scam Protection",
    category: "AI Protection · Fraud Detection",
    year: "2025",
    role: "Front-end architecture, interaction design",

    summary:
      "An AI-powered security platform that detects potential scams, analyzes suspicious links and messages, and provides threat insights to help users stay safe online.",

    image: "/projects/nakulaa.jpg",

    stack: [
      "React",
      "TypeScript",
      "GSAP",
      "Canvas",
      "Supabase",
    ],

    metrics: [
      { value: "AI", label: "Scam detection engine" },
      { value: "24/7", label: "Threat monitoring concept" },
      { value: "3+", label: "Threat analysis categories" },
    ],

    architecture: [
      {
        title: "Interface",
        body: "A responsive dashboard allows users to analyze suspicious links, messages and digital activities through a simple interface.",
      },
      {
        title: "Detection",
        body: "AI-powered analysis examines suspicious patterns, phishing indicators and fraudulent messages to identify potential scams.",
      },
      {
        title: "Security",
        body: "Threat analysis results are presented with risk indicators and clear recommendations to help users avoid online fraud.",
      },
    ],
  },

  // ----------------------------------------
  // 03. FINANCE BOOKSTORE
  // ----------------------------------------

  {
    id: "finance-bookstore",
    code: "",
    kind: "Design",
    hue: "244,114,182",
    title: "Finance Bookstore E-Commerce Design",
    category: "E-Commerce · UI/UX Design",
    year: "2025",
    role: "UX research, Figma design system, UI prototyping",

    summary:
      "A finance-focused online bookstore designed to make discovering, exploring and purchasing financial books easier through a clean interface, intuitive navigation and a seamless shopping experience.",

    image: "/projects/finance.png",

    stack: [
      "Figma",
      "Auto Layout",
      "Components",
      "Prototyping",
    ],

    metrics: [
      { value: "3+", label: "Core shopping journeys" },
      { value: "20+", label: "UI components designed" },
      { value: "100%", label: "Figma-based prototype" },
    ],

    architecture: [
      {
        title: "Research",
        body: "User needs and online bookstore references were explored to understand how readers discover and choose finance books.",
      },
      {
        title: "Design System",
        body: "A consistent visual system with reusable components, typography, colors and spacing was created in Figma.",
      },
      {
        title: "Prototyping",
        body: "Interactive prototypes demonstrate the browsing, book details and purchasing journeys for a smoother shopping experience.",
      },
    ],
  },

  // ----------------------------------------
  // 04. RUANG SEDUH
  // ----------------------------------------

  {
    id: "ruang-seduh",
    code: "",
    kind: "Development",
    hue: "192,132,252",
    title: "Ruang Seduh - Coffe Shop",
    category: "Coffee Shop · Website Development",
    year: "2025",
    role: "Front-end development, UI design",

    summary:
      "A modern coffee shop website for Ruang Seduh, designed to showcase its brand identity, explore coffee selections and provide visitors with an engaging digital experience through a clean and inviting interface.",

    image: "/projects/ruangseduh.png",

    stack: [
      "React",
      "Tailwind CSS",
      "JavaScript",
      "GSAP",
    ],

    metrics: [
      { value: "100%", label: "Responsive design" },
      { value: "3+", label: "Core website sections" },
      { value: "UI/UX", label: "User-focused experience" },
    ],

    architecture: [
      {
        title: "Interface",
        body: "A clean and welcoming visual interface reflects the identity of Ruang Seduh while making website navigation intuitive.",
      },
      {
        title: "Experience",
        body: "Coffee menus, brand information and key content are organized to help visitors explore the coffee shop easily.",
      },
      {
        title: "Performance",
        body: "Responsive layouts and optimized visual assets provide a consistent browsing experience across desktop and mobile devices.",
      },
    ],
  },

  // ----------------------------------------
  // 05. TEMU RASA - FOOD ORDERING APP
  // ----------------------------------------

  {
    id: "temu-rasa-app",
    code: "",
    kind: "Design",
    hue: "251,146,60",
    title: "Temu Rasa – Food Ordering App",
    category: "Food & Beverage · Mobile UI/UX Design",
    year: "2025",
    role: "UI/UX research, Figma design, prototyping",

    summary:
      "A food ordering mobile app designed to simplify the way users discover restaurants, explore food menus and place orders through an intuitive interface and a smooth digital shopping experience.",

    image: "/projects/temu.png",

    stack: [
      "Figma",
      "Auto Layout",
      "Components",
      "Prototyping",
      "Design System",
    ],

    metrics: [
      { value: "3+", label: "Core user journeys" },
      { value: "20+", label: "UI components designed" },
      { value: "100%", label: "Interactive Figma prototype" },
    ],

    architecture: [
      {
        title: "Research",
        body: "User needs and food ordering behaviors were explored to understand how customers discover restaurants and choose their favorite meals.",
      },
      {
        title: "Interface",
        body: "A modern mobile interface with organized food categories, attractive product cards and intuitive navigation was designed in Figma.",
      },
      {
        title: "Prototyping",
        body: "Interactive prototypes demonstrate restaurant discovery, food selection, cart management and the checkout experience.",
      },
    ],
  },

  // ----------------------------------------
  // 06. JAWA BARAT WEBSITE REDESIGN
  // ----------------------------------------

  {
    id: "jawa-barat-redesign",
    code: "",
    kind: "Development",
    hue: "52,211,153",
    title: "Jawa Barat Website Redesign",
    category: "Government · Website Development",
    year: "2024",
    role: "Front-end development, website redesign",

    summary:
      "A redesigned website for Jawa Barat, built with HTML, CSS and JavaScript. The project focuses on creating a modern visual appearance, improving website navigation and delivering a responsive experience across desktop and mobile devices.",

    image: "/projects/redesign.png",

    stack: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Responsive Design",
    ],

    metrics: [
      { value: "3", label: "Core web technologies" },
      { value: "100%", label: "Responsive design approach" },
      { value: "UI/UX", label: "Improved user experience" },
    ],

    architecture: [
      {
        title: "Structure",
        body: "HTML5 provides the website structure and organizes content into clear and accessible sections.",
      },
      {
        title: "Visual Design",
        body: "CSS3 is used to create the visual identity, styling, layout and responsive elements of the redesigned website.",
      },
      {
        title: "Interaction",
        body: "JavaScript adds interactive functionality and dynamic behavior to improve the overall browsing experience.",
      },
    ],
  },
];

// ==========================================
// CAPABILITIES
// ==========================================

export type Capability = {
  icon: LucideIcon;
  title: string;
  blurb: string;
  items: string[];
};

export const CAPABILITIES: Capability[] = [
  {
    icon: Layers,
    title: "Front-end engineering",
    blurb: "Typed, tested interfaces that stay fast as they grow.",

    items: [
      "React 19",
      "TypeScript",
      "Vite",
      "Tailwind CSS v4",
      "Supabase",
      "REST APIs",
    ],
  },

  {
    icon: Palette,
    title: "UI/UX design systems",
    blurb: "From research and wireframes to tokens and documented components.",

    items: [
      "Figma",
      "Design tokens",
      "Wireframing",
      "Prototyping",
      "WCAG AA",
      "Component libraries",
    ],
  },

  {
    icon: Activity,
    title: "Motion and data layers",
    blurb: "Animation that explains change, and visuals that make data legible.",

    items: [
      "GSAP",
      "ScrollTrigger",
      "Data visualization",
      "State modeling",
      "Performance budgets",
    ],
  },
];

// ==========================================
// WORK PROCESS
// ==========================================

export const PROCESS = [
  {
    title: "Discover",
    body: "Goals, users and constraints.",
  },

  {
    title: "Design",
    body: "Wireframes, tokens and prototypes in Figma.",
  },

  {
    title: "Build",
    body: "Typed components, real data, responsive from the start.",
  },

  {
    title: "Refine",
    body: "Motion, accessibility and performance passes.",
  },
];

// ==========================================
// SOCIAL LINKS
// ==========================================

export const SOCIALS: {
  label: string;
  href: string;
  icon: LucideIcon;
}[] = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/ncoknz/",
    icon: Instagram,
  },
];
