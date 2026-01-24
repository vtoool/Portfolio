import { Project, Service, Testimonial, TrustMetric } from "@/types";

export const projects: Project[] = [
  // Row 1: PFCRM (2x2) + Chef (1x2) + FareSnap (1x1) = 4 Cols
  // Row 2: PFCRM(spans) + Chef(spans) + Meta (1x1) = 3 Cols
  // Row 3: Cabin (2 cols) + GDS (2 cols) = 4 Cols (25% taller)
  {
    id: "pfcrm",
    title: "PFCRM",
    tag: "Enterprise Tool",
    shortDescription: "A custom CRM handling high-volume sales with scraping, telephony, and e-signature integrations.",
    description: "A comprehensive CRM built for a high-volume sales operation. Replaced fragmented spreadsheets and manual processes with an intelligent, automated system.",
    techStack: ["React", "Node.js", "Puppeteer", "DocuSign API", "RingCentral API", "PostgreSQL"],
    visual: "https://picsum.photos/seed/pfcrm/1200/800",
    status: "In Production",
    gridSize: "large",
    featured: true,
    liveUrl: "https://pfcrm.example.com",
    situation: "The client was drowning in manual data entry. Their sales team was spending 4+ hours daily on data entry across spreadsheets, CRM systems, and notepad files. Lost leads, duplicate entries, and missed follow-ups were costing them estimated $15K/month in lost revenue.",
    task: "Build a unified CRM that automatically captures leads from multiple sources, integrates with their telephony system for call logging, and automates document workflows.",
    action: "Built a custom React/Node.js application with Puppeteer for real-time lead scraping from multiple channels. Integrated RingCentral API for automatic call logging and recording. Created DocuSign integration for seamless contract signing. All data syncs to PostgreSQL with intelligent deduplication.",
    result: "Reduced manual data entry by 95%. Sales team now focuses on selling instead of admin work. Call logging is automatic, and contract turnaround dropped from 48 hours to under 2 hours. Client reports 20% increase in closed deals within the first month."
  },
  {
    id: "chef",
    title: "Chef De Chef",
    tag: "Reservation System",
    shortDescription: "End-to-end reservation and client management system for a dance instruction business.",
    description: "Complete booking and client management platform for a dance instruction company. Simplified the entire reservation workflow.",
    techStack: ["Next.js", "Resend", "Stripe", "Prisma", "PostgreSQL"],
    visual: "https://picsum.photos/seed/chef/800/1000",
    status: "Live",
    gridSize: "medium",
    liveUrl: "https://chefdechef.example.com",
    situation: "A dance instruction company was managing bookings through Google Forms and manual WhatsApp messages. Double-bookings were common, payment tracking was a nightmare, and clients frequently missed their sessions.",
    task: "Create a self-service booking portal with automated reminders, integrated payments, and an admin dashboard for staff management.",
    action: "Built a Next.js application with a beautiful booking calendar interface. Integrated Stripe for secure payments with automatic invoice generation. Used Resend for email confirmations and SMS-style reminders. Created comprehensive admin dashboard with analytics.",
    result: "Eliminated double-bookings completely. Payment collection rate improved from 70% to 98%. No-shows dropped 80% thanks to automated reminders. Staff now spends minutes instead of hours on administration."
  },
  {
    id: "faresnap",
    title: "FareSnap",
    tag: "Browser Extension",
    shortDescription: "Chrome extension for travel agents to quickly capture and compare airfare options.",
    description: "A productivity tool helping travel agents capture, organize, and compare airfare options from multiple sources.",
    techStack: ["React", "Chrome Extension API", "Manifest V3", "Local Storage"],
    visual: "https://picsum.photos/seed/faresnap/600/400",
    status: "Live",
    gridSize: "small",
    liveUrl: "https://chrome.google.com/webstore/detail/faresnap",
    situation: "Travel agents constantly switch between airline websites, fare comparison tools, and their own notes. Capturing fares for client proposals is repetitive and error-prone.",
    task: "Create a Chrome extension that lets agents capture fares with one click, organize them in folders, and export for proposals.",
    action: "Built a Manifest V3 extension with a sleek popup interface. Implemented one-click fare capture from any website. Created folder organization with search and filter. Added export to PDF and email integration.",
    result: "Over 100 active weekly users. Agents report saving 1+ hour daily on fare research. 4.8-star rating with testimonials about time savings."
  },
  {
    id: "meta",
    title: "Meta Graph Automator",
    tag: "Automation Tool",
    shortDescription: "Inbox organization using Meta Graph API to sort and categorize messages automatically.",
    description: "Intelligent inbox automation that uses Meta's Graph API to categorize, sort, and prioritize incoming messages.",
    techStack: ["Python", "FastAPI", "Meta Graph API", "PostgreSQL"],
    visual: "https://picsum.photos/seed/meta/800/600",
    status: "Live",
    gridSize: "small",
    liveUrl: "https://meta-automator.example.com",
    situation: "A marketing agency receives 500+ Meta inbox messages daily across multiple accounts. Manually categorizing urgent vs. non-urgent messages was overwhelming and led to response delays on important leads.",
    task: "Build an automation that sorts incoming messages by urgency and category, flagging high-priority leads for immediate attention.",
    action: "Developed a Python service using Meta's Graph API for real-time message streaming. Created ML-inspired classification rules based on message content and sender behavior. Built a priority queue system with webhooks for instant notifications.",
    result: "Critical lead response time dropped from 4 hours to under 15 minutes. Team productivity increased by eliminating manual triage. Agency reports $20K/month increase in captured leads."
  },
  {
    id: "cabin",
    title: "CabinStory",
    tag: "Travel Tech SaaS",
    shortDescription: "Presentation tool helping travel agents build stunning, professional itineraries in minutes.",
    description: "A SaaS platform empowering travel agents to create beautiful, professional travel itineraries. The \"Canva for travel agents.\"",
    techStack: ["React", "PostgreSQL", "AWS S3", "PDF Generation", "Stripe"],
    visual: "https://picsum.photos/seed/cabin/1200/600",
    status: "Live Beta",
    gridSize: "medium",
    featured: true,
    liveUrl: "https://cabinstory.com",
    situation: "Travel agents spend 2-3 hours per itinerary using tools they're not familiar with (Canva, PowerPoint). The result is inconsistent, unprofessional presentations that don't close deals.",
    task: "Build a specialized tool that lets agents create stunning itineraries in under 10 minutes, with drag-and-drop simplicity and beautiful templates.",
    action: "Designed a component-based editor with drag-and-drop itinerary blocks. Created 50+ professional templates for different trip types. Integrated PDF export for client delivery. Added collaboration features for team workflows.",
    result: "Agents now create itineraries in 5-10 minutes instead of 2-3 hours. Client presentation quality improved dramatically. Early beta shows 40% faster booking conversions."
  },
  {
    id: "gds",
    title: "GDS Micro-Tools",
    tag: "Internal Utilities",
    shortDescription: "Collection of productivity tools for travel industry professionals.",
    description: "A suite of specialized micro-tools solving specific problems for travel industry professionals.",
    techStack: ["TypeScript", "SVG", "React"],
    visual: "https://picsum.photos/seed/gds/800/400",
    status: "Live",
    gridSize: "small",
    liveUrl: "https://gds-tools.example.com",
    situation: "Travel agents constantly need simple tools that don't exist elsewhere - random name generators for training, seat map visualizers, timezone converters, and more. They resort to Google searches and mediocre online tools.",
    task: "Build a collection of focused, beautiful micro-tools specifically designed for travel industry workflows.",
    action: "Created 10+ specialized tools including Name Generator, SeatMap Visualizer, Timezone Master, and more. Each tool is designed with travel industry specific use cases in mind. Fast, focused, no sign-up required.",
    result: "Used by hundreds of agents daily. Tools rank on first page of Google for industry-specific searches. Became a lead generation channel for the broader business."
  }
];

export const services: Service[] = [
  {
    title: "Custom CRMs & Internal Tools",
    description: "Stop using spreadsheets. I build internal tools that fit your specific sales process, reducing manual entry and data fragmentation.",
    iconType: "database",
    features: [
      "Lead capture & qualification workflows",
      "Automated task assignments & reminders",
      "Custom reporting & dashboards",
      "Integration with existing tools",
      "Role-based access control",
      "Audit logs & compliance"
    ]
  },
  {
    title: "API Integrations & Automation",
    description: "Connect your isolated tools so data flows automatically. Real-time sync for better insights and fewer manual handoffs.",
    iconType: "zap",
    features: [
      "Two-way sync between platforms",
      "Webhook-based real-time updates",
      "Custom API development",
      "Legacy system integration",
      "Data transformation & normalization",
      "Error handling & retry logic"
    ]
  },
  {
    title: "SaaS MVPs & Web Apps",
    description: "From idea to deployed product. I build fast, scalable Minimum Viable Products using modern tech stacks.",
    iconType: "rocket",
    features: [
      "User authentication & payments",
      "Database design & optimization",
      "Admin dashboards & analytics",
      "Email/SMS notifications",
      "Performance optimization",
      "CI/CD & deployment"
    ]
  }
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Michael Chen",
    role: "Founder",
    company: "Growth Marketing Agency",
    content: "Victor didn't just build us a tool - he understood our business and built exactly what we needed. The CRM he created has transformed our sales process. We're closing 30% more deals now.",
    rating: 5
  },
  {
    id: "2",
    name: "Sarah Williams",
    role: "Director of Operations",
    company: "Travel Luxury Group",
    content: "Finally, a developer who speaks business, not just code. Victor understood our pain points immediately and delivered a solution that our team actually wants to use. The automation he built saves us 20+ hours per week.",
    rating: 5
  },
  {
    id: "3",
    name: "David Park",
    role: "CEO",
    company: "B2B SaaS Startup",
    content: "Working with Victor was different from other developers. He asked the right questions, challenged our assumptions, and delivered a product that exceeded our specs. The Meta Graph automation alone was worth 10x his fee.",
    rating: 5
  }
];

export const trustMetrics: TrustMetric[] = [
  {
    label: "Projects Delivered",
    value: "50+",
    description: "Successful project completions"
  },
  {
    label: "Hours Saved",
    value: "10K+",
    description: "Client operational hours saved"
  },
  {
    label: "Client ROI",
    value: "500%",
    description: "Average return on project investment"
  },
  {
    label: "Response Time",
    value: "<2hrs",
    description: "Average reply time during projects"
  }
];

export const partnerLogos = [
  { name: "RingCentral", color: "text-red-400" },
  { name: "DocuSign", color: "text-blue-400" },
  { name: "Meta", color: "text-blue-500" },
  { name: "Stripe", color: "text-indigo-400" },
  { name: "Airtable", color: "text-teal-400" },
  { name: "AWS", color: "text-orange-400" },
  { name: "PostgreSQL", color: "text-cyan-400" },
  { name: "OpenAI", color: "text-emerald-400" }
];

// Icon type mapping for Services
export const serviceIconTypes = {
  database: { color: "text-indigo-400" },
  zap: { color: "text-amber-400" },
  rocket: { color: "text-emerald-400" }
} as const;
