/* ============================================================================
   site-config.js  —  EDIT THIS FILE ONLY
   ----------------------------------------------------------------------------
   This is the single source of truth for the entire website.
   A non-technical user can rebrand the whole site here without touching
   index.html, styles.css or app.js.

   HOW TO EDIT
   • Text          : change the strings in quotes.
   • Colors        : change the hex values under `theme` (or use the on-page
                     Theme Customizer button, bottom-right).
   • Icons         : use any Bootstrap Icon name, e.g. "bi-wifi", "bi-shield-lock"
                     Browse icons at https://icons.getbootstrap.com
   • Images        : set a path/URL, e.g. "asset/img/hero.jpg". Leave "" (empty)
                     to fall back to the built-in gradient visual.
   • Logo          : brand.logoImage = a single PNG containing your full logo.
   • Favicon       : brand.favicon  = the small square icon for the browser tab.
   • Add / remove  : copy or delete an item inside any [ ... ] array.
   ============================================================================ */

const siteConfig = {

  /* ---------------------------------------------------------------- BRAND */
  brand: {
    companyName: "HNCTech Infra Solutions",   // used for alt-text / SEO (not shown when logoImage is set)
    legalName:   "HNCTech Infra Solutions Private Limited",
    tagline:     "",                           // only used by the text logo fallback
    logoText:    "",                           // shown only if logoImage is empty
    logoImage:   "asset/img/obj/HNCTECH_1.png",   // full logo image (header + footer)
    favicon:     "asset/img/obj/hnclogo_icon.png" // small square browser-tab icon (.png / .ico / .svg)
  },

  /* ---------------------------------------------------------------- THEME */
  /* These five colors drive the entire palette. The customizer edits them. */
  theme: {
    primaryColor:   "#0B1F3A",   // deep navy — backgrounds, headings
    secondaryColor: "#0057B8",   // royal blue — buttons, accents
    accentColor:    "#00D4FF",   // cyan — highlights, animation
    bgColor:        "#F8FAFC",   // light section background
    textColor:      "#1E293B",   // body text
    fontDisplay:    "Space Grotesk",  // headings  (Google Font name)
    fontBody:       "Inter"           // body text (Google Font name)
  },

  /* ------------------------------------------------------------------ SEO */
  seo: {
    title:       "HNCTech Infra Solutions Pvt. Ltd. | IT Infrastructure & System Integration",
    description: "HNCTech Infra Solutions builds the IT backbone of modern enterprises — structured cabling, networking, Wi-Fi, CCTV, access control, data centre and security infrastructure, delivered documentation-first across Chennai and South India.",
    keywords:    "IT infrastructure Chennai, structured cabling, enterprise networking, CCTV surveillance, access control, data center, system integration, AMC, HNCTech",
    ogImage:     "asset/img/obj/hnclogo_icon.png",                       // social-share image, e.g. "asset/img/og.jpg"
    url:         "https://hnctech.in"
  },

  /* -------------------------------------------------------------- NAVBAR */
  nav: {
    links: [
      { label: "Home",       href: "#home" },
      { label: "About",      href: "#about" },
      { label: "Services",   href: "#services" },
      { label: "Solutions",  href: "#solutions" },
      { label: "Industries", href: "#industries" },
      { label: "Projects",   href: "#projects" },
      { label: "Contact",    href: "#contact" }
    ],
    ctaLabel: "Contact US",
    ctaHref:  "#contact"
  },

  /* ---------------------------------------------------------------- HERO */
  hero: {
    eyebrow:    "IT Infrastructure & System Integration",
    title:      "Building the IT backbone of",
    titleAccent:"modern enterprises",          // rendered in accent color
    subtitle:   "Integrated technology solutions for connectivity, security, collaboration and business growth — engineered, deployed and documented end-to-end from Chennai across South India.",
    image:      "",                            // optional bg image; "" = animated network
    showParticles: true,                       // animated network nodes in hero
    primaryBtn:   { label: "Explore Services", href: "#services" },
    secondaryBtn: { label: "Contact Us",       href: "#contact" },
    badges: [
      { icon: "bi-patch-check-fill",     text: "Documentation-first delivery" },
      { icon: "bi-diagram-3-fill",       text: "Multi-vendor expertise" },
      { icon: "bi-shield-lock-fill",     text: "Enterprise security focus" },
      { icon: "bi-building-fill-check",  text: "GeM & Govt. tender ready" }
    ]
  },

  /* --------------------------------------------------------------- ABOUT */
  about: {
    eyebrow:  "About HNCTech",
    heading:  "An infrastructure partner that hands you the keys — and the blueprints",
    images:  [
      "asset/img/obj/asset1.png",
      "asset/img/obj/asset6.png",
      "asset/img/obj/asset3.png",
      "asset/img/obj/asset4.png",
      "asset/img/obj/asset5.png"
    ],   // 2+ images = fading slideshow; 1 = single image; [] = built-in rack visual
    paragraphs: [
      "HNCTech Infra Solutions Private Limited designs and delivers enterprise-grade IT infrastructure — from structured cabling and networking to surveillance, access control and data centre systems. We work across deep-tech startups, IT parks and manufacturing industries, combining hands-on field expertise with disciplined project execution.",
      "What sets us apart is our documentation-first methodology: every deployment is handed over with complete network diagrams, IP/VLAN plans, rack maps, SOPs and runbooks — so your team can operate independently from day one."
    ],
    floatCard: {
      icon:  "bi-hdd-network-fill",
      title: "Designed. Deployed. Documented.",
      text:  "Every project handed over with full network & SOP documentation."
    },
    stats: [
      { value: 500, suffix: "+",  label: "Projects Delivered" },
      { value: 100, suffix: "+",  label: "Clients Served" },
      { value: 10,  suffix: "+",  label: "Years Experience" },
      { value: 24,  suffix: "/7", label: "Support & SLA" }
    ]
  },

  /* ------------------------------------------------------------ SERVICES */
  services: {
    eyebrow:  "What We Do",
    heading:  "End-to-end infrastructure services",
    subtitle: "A single accountable partner across the full technology stack — design, supply, installation, integration and ongoing support.",
    items: [
      { icon: "bi-ethernet",      title: "Structured Cabling",            description: "Certified Cat6/6A and fibre backbone cabling with labelled, tested and documented terminations built to TIA/EIA standards.", link: "#contact" },
      { icon: "bi-diagram-3",     title: "Enterprise Networking",         description: "Switching, routing, VLAN segmentation and load-balanced multi-ISP setups designed for performance, redundancy and scale.", link: "#contact" },
      { icon: "bi-camera-video",  title: "CCTV Surveillance",             description: "IP and PoE camera systems, NVR/VMS, RTSP streaming and ANPR — engineered for coverage, clarity and reliable retention.", link: "#contact" },
      { icon: "bi-fingerprint",   title: "Access Control & Attendance",   description: "Biometric, RFID and card-based access control, boom barriers and time-attendance integrated with your HR systems.", link: "#contact" },
      { icon: "bi-wifi",          title: "Managed Wi-Fi Solutions",       description: "Controller-managed and cloud-managed wireless with seamless roaming, guest portals and site-wide coverage planning.", link: "#contact" },
      { icon: "bi-hdd-stack",     title: "Servers & Storage",             description: "Server rooms, NAS/SAN storage, virtualization and backup architecture sized to your workloads and growth plans.", link: "#contact" },
      { icon: "bi-camera-reels",  title: "Video Conferencing",            description: "Meeting-room AV and conferencing systems integrated with your collaboration platforms for clear, dependable calls.", link: "#contact" },
      { icon: "bi-bezier2",       title: "Fiber Optic Infrastructure",    description: "Single-mode and multi-mode fibre backbones, splicing, OTDR testing and inter-building connectivity.", link: "#contact" },
      { icon: "bi-shield-lock",   title: "Network Security & Firewalls",  description: "Next-gen firewall deployment, segmentation, VPN and UTM policies to keep your network and data protected.", link: "#contact" },
      { icon: "bi-server",        title: "Data Centre Solutions",         description: "Rack & stack, structured power and cooling, cable management and labelling for clean, audit-ready facilities.", link: "#contact" },
      { icon: "bi-megaphone",     title: "PA & Intercom Systems",         description: "Public address, IP intercom and emergency communication systems for campuses, factories and commercial buildings.", link: "#contact" },
      { icon: "bi-tools",         title: "AMC & Support",                 description: "SLA-based annual maintenance, proactive monitoring and rapid on-site response to keep infrastructure running.", link: "#contact" }
    ]
  },

  /* ----------------------------------------------------------- SOLUTIONS */
  solutions: {
    eyebrow:  "Solutions",
    heading:  "Built for the spaces you operate in",
    subtitle: "Pre-engineered infrastructure blueprints tailored to the demands of each environment.",
    items: [
      { icon: "bi-building",            title: "Smart Office",   description: "Connected, secure and collaboration-ready workplaces." },
      { icon: "bi-mortarboard",         title: "Smart Campus",   description: "Wide-area networking, surveillance and access for institutions." },
      { icon: "bi-gear-wide-connected", title: "Smart Factory",  description: "Rugged industrial networking and IoT-ready connectivity." },
      { icon: "bi-cup-hot",             title: "Hospitality",    description: "Guest Wi-Fi, IPTV and integrated property-wide systems." },
      { icon: "bi-heart-pulse",         title: "Healthcare IT",  description: "Reliable, secure networks for clinical and patient systems." },
      { icon: "bi-book",                title: "Education",      description: "Campus connectivity, smart classrooms and lab infrastructure." },
      { icon: "bi-box-seam",            title: "Warehouse",      description: "High-coverage wireless and barcode/RFID-ready networks." },
      { icon: "bi-buildings",           title: "Corporate IT",   description: "Turnkey infrastructure for multi-floor corporate facilities." }
    ]
  },

  /* ---------------------------------------------------------- WHY CHOOSE */
  why: {
    eyebrow:  "Why HNCTech",
    heading:  "Engineering discipline, from first survey to final handover",
    subtitle: "We treat infrastructure as a long-term asset, not a one-off install. That means standards, documentation and accountability at every stage.",
    features: [
      { icon: "bi-person-badge",            title: "Certified Engineers",     text: "Trained, vendor-certified field and design teams." },
      { icon: "bi-diagram-2",               title: "Multi-Vendor Expertise",  text: "Vendor-neutral design — the right product for the requirement, not the commission." },
      { icon: "bi-box-arrow-in-down-right", title: "Turnkey Execution",       text: "Single point of accountability across supply, install and integration." },
      { icon: "bi-arrows-angle-expand",     title: "Scalable Solutions",      text: "Designed to grow — capacity headroom and clean upgrade paths." },
      { icon: "bi-clock-history",           title: "SLA-Based Support",       text: "Defined response times and proactive AMC monitoring." }
    ],
    signature: {
      tag:   "Our Signature",
      title: "Documentation-first delivery",
      text:  "Most installs end when the cabling is done. Ours end when your team can run it without us. Every project is handed over with a complete operations pack:",
      items: [
        "As-built network & topology diagrams",
        "IP addressing & VLAN plans",
        "Labelled rack maps & port schedules",
        "Standard operating procedures & runbooks",
        "Escalation matrix & warranty register",
        "Test reports & certification records"
      ]
    }
  },

  /* --------------------------------------------------------- INDUSTRIES */
  industries: {
    eyebrow: "Industries We Serve",
    heading: "Trusted across sectors",
    items: [
      { icon: "bi-cpu",        label: "IT & ITES" },
      { icon: "bi-gear-wide",  label: "Manufacturing" },
      { icon: "bi-box-seam",   label: "Warehousing" },
      { icon: "bi-cup-straw",  label: "Hospitality" },
      { icon: "bi-hospital",   label: "Healthcare" },
      { icon: "bi-mortarboard",label: "Education" },
      { icon: "bi-buildings",  label: "Commercial" },
      { icon: "bi-bank",       label: "Government" }
    ]
  },

  /* ----------------------------------------------------------- PROJECTS */
  projects: {
    eyebrow: "Featured Projects",
    heading: "Infrastructure we've delivered",
    /* "key" must match the project's `category` to enable filtering */
    filters: [
      { key: "all",          label: "All" },
      { key: "surveillance", label: "Surveillance" },
      { key: "network",      label: "Networking & Wi-Fi" },
      { key: "av",           label: "Collaboration" },
      { key: "access",       label: "Access Control" }
    ],
    items: [
      { category: "surveillance", categoryLabel: "Surveillance",  icon: "", image: "asset/img/obj/asset9.png",  title: "IP Camera RTSP Surveillance Deployment", location: "Satellite Campus, Chennai",  description: "Multi-camera IP surveillance with RTSP streaming integration and centralized recording.", tech: ["IP Cameras", "RTSP", "NVR"] },
      { category: "network",      categoryLabel: "Networking",    icon: "", image: "asset/img/obj/asset10.png", title: "Managed Wi-Fi & Firewall Rollout",        location: "Commercial Facility, Chennai", description: "Controller-managed wireless with next-gen firewall and segmented guest access.", tech: ["Managed Wi-Fi", "Firewall", "VLAN"] },
      { category: "av",           categoryLabel: "Collaboration", icon: "", image: "asset/img/obj/asset12.png", title: "Video Conferencing Room Integration",     location: "Corporate Office, Chennai",   description: "Meeting-room AV and conferencing integrated with the client's collaboration platform.", tech: ["AV", "Conferencing", "Integration"] },
      { category: "av",           categoryLabel: "Collaboration", icon: "", image: "asset/img/obj/asset15.png", title: "Resort Networking, Telephony & Surveillance — ECR", location: "Beach Resort, ECR, Chennai", description: "Turnkey property infrastructure: managed Wi-Fi across guest and back-of-house areas, IP PBX with room-to-room analog intercom, and full surveillance coverage — engineered and documented as one integrated rollout.", tech: ["Managed Wi-Fi", "IP PBX", "Analog Intercom", "IP Surveillance"] },
      { category: "access",       categoryLabel: "Access Control",icon: "", image: "asset/img/obj/asset14.png", title: "ANPR Boom Barrier System",                location: "Industrial Premises, Chennai",description: "Automatic number-plate recognition controlling boom barriers for managed vehicle entry.", tech: ["ANPR", "Boom Barrier", "Automation"] },
      { category: "network",      categoryLabel: "Networking",    icon: "", image: "asset/img/obj/asset11.png", title: "Structured Cabling & CCTV — Villa Project",location: "Residential, Chennai",        description: "Full structured cabling backbone with integrated PoE CCTV and networking.", tech: ["Cat6", "PoE CCTV", "Networking"] }
    ]
  },

  /* ----------------------------------------------------------- PARTNERS */
  /* NOTE: only list partnerships you can genuinely claim. */
  partners: {
    eyebrow:  "Technology Partners",
    subtitle: "We work with leading platforms to deliver dependable, vendor-neutral solutions.",
    /* Set "logo" to an image path to show a real logo; else the name + icon shows. */
    items: [
      { name: "Fortinet",     icon: "bi-hexagon-fill", logo: "" },
      { name: "TP-Link",      icon: "bi-hexagon-fill", logo: "" },
      { name: "ManageEngine", icon: "bi-hexagon-fill", logo: "" },
      { name: "Cisco",        icon: "bi-hexagon-fill", logo: "" },
      { name: "Aruba",        icon: "bi-hexagon-fill", logo: "" },
      { name: "Logitech",     icon: "bi-hexagon-fill", logo: "" },
      { name: "Grandstream",  icon: "bi-hexagon-fill", logo: "" },
      { name: "CP Plus",      icon: "bi-hexagon-fill", logo: "" },
      { name: "Dell",         icon: "bi-hexagon-fill", logo: "" },
      { name: "HP",           icon: "bi-hexagon-fill", logo: "" },
      { name: "Hikvision",    icon: "bi-hexagon-fill", logo: "" },
      { name: "Ubiquiti",     icon: "bi-hexagon-fill", logo: "" }
    ]
  },

  /* ------------------------------------------------------- TESTIMONIALS */
  testimonials: {
    eyebrow: "Client Feedback",
    heading: "What clients say",
    /* "photo" path optional; else the initials avatar is used. */
    items: [
      { initials: "IT", photo: "", quote: "The handover documentation alone set them apart. Our IT team could manage the entire network from day one without depending on the vendor for every change.", name: "IT Operations Lead", role: "Manufacturing Client, Chennai" },
      { initials: "FM", photo: "", quote: "Clean execution and clear communication throughout. The surveillance and access control integration was delivered on schedule and worked exactly as scoped.", name: "Facilities Manager", role: "Commercial Facility, Chennai" },
      { initials: "PD", photo: "", quote: "A genuinely vendor-neutral partner. They recommended what fit our requirement and budget, not what earned them the most — and the cabling work was immaculate.", name: "Project Director", role: "Startup, IIT Madras Ecosystem" }
    ]
  },

  /* ------------------------------------------------------------ CONTACT */
  contact: {
    eyebrow:  "Get In Touch",
    heading:  "Let's plan your infrastructure",
    subtitle: "Tell us what you're building. We'll respond with a site survey plan and a clear, itemised proposal.",
    address:  "10, Level 3, Akshaya HQ OMR Road, IT Express Highway, Kazhipattur, Chennai,  Tamil Nadu 603103.",
    phone:    "+91 63850 55113",
    email:    "info@hnctech.in",
    website:  "hnctech.in",
    websiteUrl: "https://hnctech.in",
    /* Paste a Google Maps embed URL to show a live map; else a placeholder shows. */
    mapEmbedUrl: "https://maps.google.com/maps?q=12.811265,80.228427&z=16&hl=en&output=embed",
    /* Options shown in the "Service Required" dropdown */
    serviceOptions: [
      "Structured Cabling",
      "Enterprise Networking",
      "Managed Wi-Fi",
      "CCTV Surveillance",
      "Access Control & Attendance",
      "Video Conferencing",
      "Servers & Storage / Data Centre",
      "Network Security & Firewalls",
      "AMC & Support",
      "Turnkey / Multiple"
    ]
  },

  /* ------------------------------------------------------------- FOOTER */
  footer: {
    about: "Building the IT backbone of modern enterprises — designed, deployed and documented end-to-end.",
    social: [
      { icon: "bi-linkedin",   href: "#", label: "LinkedIn" },
      { icon: "bi-twitter-x",  href: "#", label: "Twitter / X" },
      { icon: "bi-facebook",   href: "#", label: "Facebook" },
      { icon: "bi-instagram",  href: "#", label: "Instagram" }
    ],
    columns: [
      { title: "Company",   links: [ { label: "About", href: "#about" }, { label: "Services", href: "#services" }, { label: "Projects", href: "#projects" }, { label: "Careers", href: "#contact" } ] },
      { title: "Solutions", links: [ { label: "Networking", href: "#services" }, { label: "Security", href: "#services" }, { label: "Data Centre", href: "#services" }, { label: "AMC", href: "#services" } ] }
    ],
    copyright: "© 2026 HNCTech Infra Solutions Private Limited. All Rights Reserved.",
    legal:     "CIN / GST details to be added · Chennai, India"
  }
};

/* Make available to app.js (and to Node, if ever bundled).
   NOTE: a top-level `const` is NOT automatically a property of `window`,
   so we attach it explicitly here. */
if (typeof window !== "undefined") { window.siteConfig = siteConfig; }
if (typeof module !== "undefined") { module.exports = siteConfig; }
