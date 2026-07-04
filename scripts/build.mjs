import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const root = process.cwd();
const assetVersion = "20260704-images";
const versionedAsset = (path) => `${path}?v=${assetVersion}`;
const site = {
  name: "Bugman Plus",
  legalName: "Bugman Plus",
  url: "https://www.bugmanplus.com",
  email: "info@bugmanplus.com",
  phone: "905-924-2847",
  phoneHref: "+19059242847",
  addressLocality: "Oshawa",
  addressRegion: "ON",
  addressCountry: "CA",
  slogan: "Winning the war on pests",
  warranty: "3 month warranty on interior treatment programs",
  founded: "Local Oshawa pest control specialists",
};

const assets = {
  logo: versionedAsset("/assets/images/bugman-logo.jpg"),
  icon: versionedAsset("/assets/images/bugman-icon.png"),
  hero: versionedAsset("/assets/images/hero-pest-control.jpg"),
  about: versionedAsset("/assets/images/about-technician.jpg"),
};

const services = [
  {
    slug: "bed-bug-control",
    title: "Bed Bug Control",
    shortTitle: "Bed Bugs",
    image: versionedAsset("/assets/images/bed-bug-control.jpg"),
    alt: "Close-up service photo for bed bug pest control",
    intro:
      "Discreet inspection and treatment programs for active bed bug concerns in homes, apartments, and rental properties.",
    summary:
      "Targeted interior treatments designed around the rooms, furniture, and travel patterns where bed bugs hide.",
    signs: ["Bites after sleep", "Tiny dark spots on bedding", "Shed skins near seams", "Activity around headboards"],
    process: [
      "Inspect bedrooms, upholstered furniture, baseboards, and high-risk transfer points.",
      "Treat cracks, seams, and resting zones with the right product and timing.",
      "Guide preparation and follow-up so the treatment has the best chance to finish the cycle.",
    ],
    faq: [
      {
        q: "How quickly should I call for bed bugs?",
        a: "Call as soon as you suspect activity. Early treatment helps keep the issue localized and easier to control.",
      },
      {
        q: "Do I need to prepare before treatment?",
        a: "Yes. Bugman Plus can walk you through practical preparation steps so treatment areas are accessible.",
      },
    ],
    keywords: ["bed bug control", "bed bug exterminator", "bed bug treatment"],
  },
  {
    slug: "spider-wasp-control",
    title: "Spider & Wasp Control",
    shortTitle: "Spiders & Wasps",
    image: versionedAsset("/assets/images/spider-wasp-control.jpg"),
    alt: "Service photo for spider and wasp control",
    intro:
      "Exterior and entry-point treatments for spiders, wasps, and nesting insects around homes and businesses.",
    summary:
      "Reduce webbing, nesting, and seasonal pressure with careful perimeter service and targeted nest attention.",
    signs: ["Recurring webs", "Nest activity around eaves", "Wasps near decks", "Entry points around soffits"],
    process: [
      "Identify harborage, nesting areas, and exterior pressure points.",
      "Treat problem zones while paying attention to access, safety, and seasonality.",
      "Recommend exclusion and maintenance steps to reduce repeat pressure.",
    ],
    faq: [
      {
        q: "Can wasp nests be handled safely?",
        a: "Yes. Professional treatment limits direct exposure and uses the right approach for the nest location.",
      },
      {
        q: "Will spider service also help with webs?",
        a: "A proper exterior program targets the areas where spiders build and return, helping reduce visible webbing.",
      },
    ],
    keywords: ["spider control", "wasp control", "wasp nest removal"],
  },
  {
    slug: "cockroach-control",
    title: "Cockroach Control",
    shortTitle: "Cockroaches",
    image: versionedAsset("/assets/images/cockroach-control.jpg"),
    alt: "Service photo for cockroach pest control",
    intro:
      "Kitchen, bathroom, and utility-area programs for cockroach activity in residential and commercial spaces.",
    summary:
      "Focused treatment and sanitation guidance for the warm, hidden spaces cockroaches use to spread.",
    signs: ["Night activity", "Droppings in cabinets", "Odor in warm spaces", "Activity near appliances"],
    process: [
      "Inspect moisture, heat, storage, appliance, and plumbing zones.",
      "Use a targeted treatment plan that reaches harborages without unnecessary disruption.",
      "Share housekeeping and access guidance that supports long-term control.",
    ],
    faq: [
      {
        q: "Why do cockroaches keep returning?",
        a: "Cockroaches often rely on hidden moisture, food sources, and tight harborages. Treatment works best when those conditions are addressed too.",
      },
      {
        q: "Is cockroach control suitable for businesses?",
        a: "Yes. Programs can be planned for restaurants, offices, rental units, and other commercial spaces.",
      },
    ],
    keywords: ["cockroach control", "roach exterminator", "commercial cockroach treatment"],
  },
  {
    slug: "ant-control",
    title: "Ant Control",
    shortTitle: "Ants",
    image: versionedAsset("/assets/images/ant-control.jpg"),
    alt: "Service photo for ant pest control",
    intro:
      "Interior and exterior ant treatment programs for trails, entry points, kitchens, patios, and structural gaps.",
    summary:
      "Track ant movement, treat the source, and reduce access points that keep colonies feeding indoors.",
    signs: ["Kitchen trails", "Ants around patios", "Entry near windows", "Activity after rain"],
    process: [
      "Trace movement from interior trails back toward entry and nesting areas.",
      "Treat selected zones with products suited to the ant pressure and property conditions.",
      "Recommend sealing, moisture, and food-source changes to support the treatment.",
    ],
    faq: [
      {
        q: "Why are ants showing up in the kitchen?",
        a: "Kitchens provide food and moisture. Ants also use small structural gaps to establish repeat trails.",
      },
      {
        q: "Can exterior service reduce indoor ants?",
        a: "Yes. Treating exterior pressure and access points often helps reduce the activity that makes its way inside.",
      },
    ],
    keywords: ["ant control", "ant exterminator", "house ant treatment"],
  },
  {
    slug: "other-bug-control",
    title: "All Other Bug Control",
    shortTitle: "Other Bugs",
    image: versionedAsset("/assets/images/other-bug-control.jpg"),
    alt: "Service photo for general insect control",
    intro:
      "Practical inspection and treatment for nuisance insects that do not fit neatly into a standard category.",
    summary:
      "Identify the pest, understand why it is present, and apply the right level of treatment for the situation.",
    signs: ["Unknown insect activity", "Seasonal indoor invaders", "Basement or garage pests", "Recurring sightings"],
    process: [
      "Identify the insect and the conditions attracting it.",
      "Build a targeted plan instead of applying a generic blanket treatment.",
      "Provide prevention guidance for the pest's likely entry and breeding conditions.",
    ],
    faq: [
      {
        q: "What if I do not know what insect I have?",
        a: "That is common. A proper inspection starts by identifying the pest so treatment is matched to the issue.",
      },
      {
        q: "Do you handle seasonal insects?",
        a: "Yes. Bugman Plus can help with many common seasonal pests found in Ontario homes and businesses.",
      },
    ],
    keywords: ["bug control", "insect control", "general pest control"],
  },
  {
    slug: "rodent-control",
    title: "Rodent Control",
    shortTitle: "Rodents",
    image: versionedAsset("/assets/images/rodent-control.jpg"),
    alt: "Service photo for rodent control",
    intro:
      "Rodent inspection, control, and prevention programs for mice and rat activity around buildings.",
    summary:
      "Find access routes, treat active pressure, and help close the conditions that allow rodents to return.",
    signs: ["Droppings", "Scratching sounds", "Chewed materials", "Activity in garages or basements"],
    process: [
      "Inspect foundations, doors, utility penetrations, storage zones, and exterior paths.",
      "Set a control plan around the active pressure and the property layout.",
      "Recommend exclusion and cleanup steps to reduce long-term risk.",
    ],
    faq: [
      {
        q: "How do rodents get inside?",
        a: "Rodents use small gaps around foundations, doors, vents, utility lines, and attached structures.",
      },
      {
        q: "Is rodent control just baiting?",
        a: "No. A stronger plan combines treatment with inspection, entry-point awareness, and prevention guidance.",
      },
    ],
    keywords: ["rodent control", "mouse control", "rat control"],
  },
];

const locations = [
  {
    slug: "oshawa",
    name: "Oshawa",
    region: "ON",
    descriptor: "the home base for Bugman Plus and a core service area across Durham Region",
  },
  {
    slug: "whitby",
    name: "Whitby",
    region: "ON",
    descriptor: "a nearby Durham Region community with residential and commercial pest control needs",
  },
  {
    slug: "ajax",
    name: "Ajax",
    region: "ON",
    descriptor: "a fast-growing lakeside community where seasonal pest pressure can move quickly",
  },
  {
    slug: "pickering",
    name: "Pickering",
    region: "ON",
    descriptor: "a Durham Region market with homes, townhomes, businesses, and waterfront properties",
  },
  {
    slug: "scarborough",
    name: "Scarborough",
    region: "ON",
    descriptor: "an east Toronto service area with dense residential and commercial pest control demand",
  },
  {
    slug: "durham-region",
    name: "Durham Region",
    region: "ON",
    descriptor: "the broader service area for homeowners, landlords, and businesses east of Toronto",
  },
];

const serviceBySlug = Object.fromEntries(services.map((service) => [service.slug, service]));
const locationBySlug = Object.fromEntries(locations.map((location) => [location.slug, location]));

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about/" },
  { label: "Services", href: "/services/" },
  { label: "Areas", href: "/locations/oshawa/" },
  { label: "Contact", href: "/contact/" },
];

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const write = (path, content) => {
  const outputPath = join(root, path);
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, content);
};

const pageUrl = (path) => `${site.url}${path === "/" ? "" : path}`;

const buildHead = ({ title, description, path, image = assets.hero, schema = [] }) => {
  const canonical = pageUrl(path);
  const jsonLd = schema.map((item) => `<script type="application/ld+json">${JSON.stringify(item)}</script>`).join("\n");
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <link rel="canonical" href="${canonical}">
  <link rel="icon" href="${assets.icon}" type="image/png">
  <meta name="theme-color" content="#050505">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${site.name}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${site.url}${image}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${site.url}${image}">
  <link rel="preload" as="image" href="${assets.hero}">
  <link rel="stylesheet" href="/assets/css/styles.css">
  ${jsonLd}
</head>`;
};

const localBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "PestControl"],
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  image: `${site.url}${assets.logo}`,
  telephone: site.phoneHref,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.addressLocality,
    addressRegion: site.addressRegion,
    addressCountry: site.addressCountry,
  },
  areaServed: locations.map((location) => ({
    "@type": "City",
    name: `${location.name}, ${location.region}`,
  })),
  slogan: site.slogan,
  priceRange: "$$",
});

const webSiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.url,
});

const breadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: pageUrl(item.path),
  })),
});

const faqSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
});

const serviceSchema = (service, location) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: location ? `${service.title} in ${location.name}, ${location.region}` : service.title,
  serviceType: service.title,
  provider: {
    "@type": ["LocalBusiness", "PestControl"],
    name: site.name,
    telephone: site.phoneHref,
    url: site.url,
  },
  areaServed: location
    ? {
        "@type": "City",
        name: `${location.name}, ${location.region}`,
      }
    : locations.map((item) => ({ "@type": "City", name: `${item.name}, ${item.region}` })),
  description: service.intro,
});

const header = (active = "") => `
<header class="site-header" data-site-header>
  <a class="brand" href="/" aria-label="${site.name} home">
    <img src="${assets.logo}" alt="${site.name} logo" width="174" height="81">
  </a>
  <nav class="primary-nav" aria-label="Primary navigation" data-primary-nav>
    ${navItems
      .map(
        (item) =>
          `<a class="${active === item.label.toLowerCase() ? "is-active" : ""}" href="${item.href}">${item.label}</a>`,
      )
      .join("")}
  </nav>
  <div class="header-actions">
    <a class="call-link" href="tel:${site.phoneHref}">${site.phone}</a>
    <a class="button button-small" href="/quote/">Get a Quote</a>
    <button class="menu-button" type="button" aria-label="Open navigation" aria-expanded="false" data-menu-button>
      <span></span><span></span>
    </button>
  </div>
</header>`;

const footer = () => `
<footer class="site-footer">
  <div class="footer-grid">
    <div class="footer-location">
      <p class="section-kicker">Location</p>
      <p>Oshawa, Ontario</p>
      <p>Serving ${locations.map((item) => item.name).join(", ")}</p>
    </div>
    <div>
      <p class="section-kicker">Inquiry</p>
      <p><a href="mailto:${site.email}">${site.email}</a></p>
      <p><a href="tel:${site.phoneHref}">${site.phone}</a></p>
    </div>
    <div>
      <p class="section-kicker">Links</p>
      <ul class="footer-links">
        ${navItems.map((item) => `<li><a href="${item.href}">${item.label}</a></li>`).join("")}
        <li><a href="/quote/">Get a Quote</a></li>
      </ul>
    </div>
    <div class="footer-brand">
      <img src="${assets.logo}" alt="${site.name} logo" width="220" height="102">
      <p>${site.slogan}. Premium pest control for homes, businesses, landlords, and property teams.</p>
      <form class="newsletter-form" action="mailto:${site.email}" method="post" enctype="text/plain">
        <label class="sr-only" for="newsletter-email">Email</label>
        <input id="newsletter-email" name="email" type="email" placeholder="Your email" required>
        <button type="submit" aria-label="Subscribe">+</button>
      </form>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© 2026 ${site.name}. All rights reserved.</span>
    <a href="#top" class="back-to-top" aria-label="Back to top">Up</a>
    <span>Oshawa, ON, Canada</span>
  </div>
</footer>`;

const shell = ({ title, description, path, active, image, schema, children }) => `${buildHead({
  title,
  description,
  path,
  image,
  schema,
})}
<body id="top">
  <div class="site-shell">
    ${header(active)}
    <main>
      ${children}
    </main>
    ${footer()}
  </div>
  <script src="/assets/js/main.js" defer></script>
</body>
</html>`;

const serviceCards = (items = services) => `
<div class="service-grid">
  ${items
    .map(
      (service, index) => `
      <article class="service-card reveal">
        <a href="/services/${service.slug}/" aria-label="Learn about ${service.title}">
          <img src="${service.image}" alt="${service.alt}" loading="lazy" width="720" height="520">
          <span class="card-number">${String(index + 1).padStart(2, "0")}</span>
          <div class="service-card-content">
            <h3>${service.title}</h3>
            <p>${service.summary}</p>
          </div>
        </a>
      </article>`,
    )
    .join("")}
</div>`;

const locationLinks = (service) => `
<div class="location-grid">
  ${locations
    .map((location) => {
      const href = service ? `/locations/${location.slug}/${service.slug}/` : `/locations/${location.slug}/`;
      const label = service ? `${service.shortTitle} in ${location.name}` : `Pest control in ${location.name}`;
      return `<a class="location-chip reveal" href="${href}"><span>${label}</span><small>${location.region}</small></a>`;
    })
    .join("")}
</div>`;

const faqList = (faqs) => `
<div class="accordion" data-accordion>
  ${faqs
    .map(
      (faq, index) => `
      <div class="accordion-item reveal">
        <button type="button" aria-expanded="${index === 0 ? "true" : "false"}">
          <span>${faq.q}</span>
          <span class="accordion-mark">+</span>
        </button>
        <div class="accordion-panel"${index === 0 ? "" : " hidden"}>
          <p>${faq.a}</p>
        </div>
      </div>`,
    )
    .join("")}
</div>`;

const quoteForm = (context = "Website inquiry") => `
<form class="quote-form reveal" action="mailto:${site.email}" method="post" enctype="text/plain" data-quote-form>
  <input type="hidden" name="context" value="${escapeHtml(context)}">
  <div class="form-grid">
    <label>Name<input name="name" type="text" placeholder="Your name" required></label>
    <label>Email<input name="email" type="email" placeholder="you@example.com" required></label>
    <label>Phone<input name="phone" type="tel" placeholder="905-000-0000"></label>
    <label>Service
      <select name="service" required>
        <option value="">Select a service</option>
        ${services.map((service) => `<option value="${service.slug}">${service.title}</option>`).join("")}
      </select>
    </label>
    <label>Location
      <select name="location" required>
        <option value="">Select a location</option>
        ${locations.map((location) => `<option value="${location.slug}">${location.name}, ${location.region}</option>`).join("")}
      </select>
    </label>
    <label class="form-full">Message<textarea name="message" placeholder="Tell us what you are seeing, where it is happening, and when you first noticed it." required></textarea></label>
  </div>
  <button class="button button-wide" type="submit">Submit Request</button>
  <p class="form-note" data-form-note></p>
</form>`;

const homePage = () => {
  const faqs = [
    {
      q: "What areas does Bugman Plus serve?",
      a: "Bugman Plus is based in Oshawa and serves nearby communities including Whitby, Ajax, Pickering, Scarborough, and Durham Region.",
    },
    {
      q: "Is there a warranty?",
      a: "The original Bugman Plus service promise includes a 3 month warranty on all interior treatment programs.",
    },
    {
      q: "How do I get a quote?",
      a: `Call ${site.phone}, email ${site.email}, or send the quote form with the service type, location, and a short description of the pest issue.`,
    },
  ];

  return shell({
    title: "Bugman Plus | Premium Pest Control in Oshawa & Durham Region",
    description:
      "Bugman Plus provides premium pest control in Oshawa, Whitby, Ajax, Pickering, Scarborough, and Durham Region with service for bed bugs, rodents, ants, cockroaches, spiders, wasps, and more.",
    path: "/",
    active: "home",
    schema: [localBusinessSchema(), webSiteSchema(), faqSchema(faqs)],
    children: `
      <section class="hero hero-home">
        <img class="hero-image" src="${assets.hero}" alt="Bugman Plus pest control technician treating an interior space" width="1800" height="1315">
        <div class="hero-overlay"></div>
        <div class="hero-content reveal">
          <p class="eyebrow">Oshawa & Durham Region Pest Control</p>
          <h1>Bugman Plus</h1>
          <p class="hero-lede">${site.slogan} with advanced pest control services, competitive pricing, and interior treatment programs backed by a 3 month warranty.</p>
          <div class="hero-actions">
            <a class="button" href="/quote/">Request Service</a>
            <a class="button button-secondary" href="tel:${site.phoneHref}">Call ${site.phone}</a>
          </div>
        </div>
        <div class="hero-metrics" aria-label="Bugman Plus highlights">
          <div><strong>3 mo</strong><span>Interior warranty</span></div>
          <div><strong>6</strong><span>Core services</span></div>
          <div><strong>5+</strong><span>Service areas</span></div>
        </div>
      </section>

      <section class="ticker" aria-label="Pest control services">
        <div>
          ${services.map((service) => `<span>${service.title}</span>`).join("")}
          ${services.map((service) => `<span>${service.title}</span>`).join("")}
        </div>
      </section>

      <section class="section approach-section">
        <div class="section-heading reveal">
          <p class="section-kicker">Our Approach</p>
          <h2>Luxury-level care for a very practical problem.</h2>
          <p>Bugman Plus pairs careful inspection with the right amount of time, practice, and product for the property in front of us.</p>
        </div>
        <div class="approach-grid">
          <article class="approach-card reveal">
            <span>01</span>
            <h3>Inspect</h3>
            <p>Identify pest activity, entry points, pressure areas, and the conditions that make the issue repeat.</p>
          </article>
          <article class="approach-card reveal">
            <span>02</span>
            <h3>Treat & Protect</h3>
            <p>Use focused treatment methods that are matched to the pest, property layout, and urgency.</p>
          </article>
          <article class="approach-card reveal">
            <span>03</span>
            <h3>Verify</h3>
            <p>Support the program with prevention guidance and warranty-minded follow-through on interior work.</p>
          </article>
        </div>
      </section>

      <section class="section services-section">
        <div class="section-heading split reveal">
          <div>
            <p class="section-kicker">Services</p>
            <h2>Targeted treatments for the pests that interrupt your space.</h2>
          </div>
          <a class="text-link" href="/services/">View all services</a>
        </div>
        ${serviceCards()}
      </section>

      <section class="section about-band">
        <img src="${assets.about}" alt="Bugman Plus technician image from the original website" loading="lazy" width="1500" height="1000">
        <div class="about-copy reveal">
          <p class="section-kicker">About Bugman Plus</p>
          <h2>Built from research, field practice, and the rise of pest pressure in Ontario.</h2>
          <p>Joe Barrett started Bugman Plus after seeing pest problems grow in the Canadian environment. The company is focused on quality, competitive pricing, and service that helps clients feel in control again.</p>
          <a class="button button-secondary" href="/about/">Learn More</a>
        </div>
      </section>

      <section class="section location-section">
        <div class="section-heading reveal">
          <p class="section-kicker">Service Areas</p>
          <h2>Pest control coverage for every priority service area.</h2>
          <p>Find focused pages for Oshawa, Whitby, Ajax, Pickering, Scarborough, and Durham Region.</p>
        </div>
        ${locationLinks()}
      </section>

      <section class="section contact-split">
        <div class="contact-copy reveal">
          <p class="section-kicker">Contact Us</p>
          <h2>Send the details and Bugman Plus will help you choose the right pest control path.</h2>
          <p>Share the pest, room or exterior area, location, and how long you have noticed activity.</p>
          <div class="contact-methods">
            <a href="tel:${site.phoneHref}">${site.phone}</a>
            <a href="mailto:${site.email}">${site.email}</a>
          </div>
        </div>
        ${quoteForm("Home page quote request")}
      </section>

      <section class="section faq-section">
        <div class="section-heading reveal">
          <p class="section-kicker">FAQs</p>
          <h2>Common questions before booking pest control.</h2>
        </div>
        ${faqList(faqs)}
      </section>
    `,
  });
};

const aboutPage = () =>
  shell({
    title: "About Bugman Plus | Pest Control Specialists in Oshawa",
    description:
      "Learn about Bugman Plus, an Oshawa pest control company focused on advanced research, practical treatment methods, quality service, and competitive pricing.",
    path: "/about/",
    active: "about",
    image: assets.about,
    schema: [localBusinessSchema(), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about/" }])],
    children: `
      <section class="subhero">
        <img src="${assets.about}" alt="Bugman Plus pest control service image" width="1500" height="1000">
        <div class="subhero-content reveal">
          <p class="eyebrow">About Bugman Plus</p>
          <h1>Research-led pest control with a local Oshawa backbone.</h1>
          <p>Bugman Plus was started by Joe Barrett in response to the significant rise of pest problems in the Canadian environment.</p>
        </div>
      </section>
      <section class="section narrative-grid">
        <div class="section-heading reveal">
          <p class="section-kicker">Brand Story</p>
          <h2>Focused, efficient, and built around customer satisfaction.</h2>
        </div>
        <div class="narrative-copy reveal">
          <p>Bugman Plus studied pest control industry patterns and built its service around a simple promise: give each customer the right mix of time, practice, product, and guidance.</p>
          <p>The result is a service experience that keeps pricing reasonable, sets clear expectations, and uses advanced methods and tools to help clients win the war against pests.</p>
        </div>
      </section>
      <section class="section values-grid">
        <article class="value-card reveal"><span>01</span><h3>Advanced Methods</h3><p>Treatments informed by research, property conditions, and pest behavior.</p></article>
        <article class="value-card reveal"><span>02</span><h3>Competitive Pricing</h3><p>Service designed to be accessible without making the work feel ordinary.</p></article>
        <article class="value-card reveal"><span>03</span><h3>Warranty Mindset</h3><p>Interior treatment programs carry a 3 month warranty from the original service promise.</p></article>
      </section>
      <section class="section services-section">
        <div class="section-heading split reveal">
          <div>
            <p class="section-kicker">Core Services</p>
            <h2>Explore the full pest control suite.</h2>
          </div>
          <a class="text-link" href="/quote/">Request service</a>
        </div>
        ${serviceCards(services.slice(0, 3))}
      </section>
    `,
  });

const servicesPage = () =>
  shell({
    title: "Pest Control Services | Bugman Plus Oshawa",
    description:
      "Explore Bugman Plus pest control services for bed bugs, spiders, wasps, cockroaches, ants, other insects, and rodents across Oshawa and Durham Region.",
    path: "/services/",
    active: "services",
    schema: [
      localBusinessSchema(),
      breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Services", path: "/services/" }]),
      ...services.map((service) => serviceSchema(service)),
    ],
    children: `
      <section class="subhero subhero-compact">
        <img src="${assets.hero}" alt="Bugman Plus pest control service background" width="1800" height="1315">
        <div class="subhero-content reveal">
          <p class="eyebrow">Services</p>
          <h1>Precision pest control for every pressure point.</h1>
          <p>Choose the service that matches what you are seeing, then send the details for a focused quote.</p>
        </div>
      </section>
      <section class="section services-section">
        ${serviceCards()}
      </section>
      <section class="section location-section">
        <div class="section-heading reveal">
          <p class="section-kicker">Locations</p>
          <h2>Find pest control pages by city.</h2>
        </div>
        ${locationLinks()}
      </section>
    `,
  });

const servicePage = (service) =>
  shell({
    title: `${service.title} | Bugman Plus Pest Control Oshawa`,
    description: `${service.intro} Available in Oshawa, Whitby, Ajax, Pickering, Scarborough, and Durham Region.`,
    path: `/services/${service.slug}/`,
    active: "services",
    image: service.image,
    schema: [
      localBusinessSchema(),
      serviceSchema(service),
      faqSchema(service.faq),
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Services", path: "/services/" },
        { name: service.title, path: `/services/${service.slug}/` },
      ]),
    ],
    children: `
      <section class="subhero service-hero">
        <img src="${service.image}" alt="${service.alt}" width="1800" height="1200">
        <div class="subhero-content reveal">
          <p class="eyebrow">Pest Control Service</p>
          <h1>${service.title} in Oshawa & Durham Region</h1>
          <p>${service.intro}</p>
          <div class="hero-actions">
            <a class="button" href="/quote/?service=${service.slug}">Request ${service.shortTitle} Service</a>
            <a class="button button-secondary" href="tel:${site.phoneHref}">Call ${site.phone}</a>
          </div>
        </div>
      </section>
      <section class="section detail-grid">
        <div class="detail-main reveal">
          <p class="section-kicker">Treatment Plan</p>
          <h2>Focused work from inspection to follow-through.</h2>
          <p>${service.summary}</p>
          <ol class="process-list">
            ${service.process.map((step) => `<li><span></span><p>${step}</p></li>`).join("")}
          </ol>
        </div>
        <aside class="detail-aside reveal">
          <h3>Common signs</h3>
          <ul>${service.signs.map((sign) => `<li>${sign}</li>`).join("")}</ul>
          <a class="button button-wide" href="/quote/?service=${service.slug}">Get a Quote</a>
        </aside>
      </section>
      <section class="section location-section">
        <div class="section-heading reveal">
          <p class="section-kicker">Service Areas</p>
          <h2>${service.title} pages by service area.</h2>
        </div>
        ${locationLinks(service)}
      </section>
      <section class="section faq-section">
        <div class="section-heading reveal">
          <p class="section-kicker">FAQs</p>
          <h2>${service.shortTitle} questions.</h2>
        </div>
        ${faqList(service.faq)}
      </section>
    `,
  });

const locationPage = (location) =>
  shell({
    title: `Pest Control in ${location.name}, ${location.region} | Bugman Plus`,
    description: `Bugman Plus provides pest control in ${location.name}, ${location.region} for bed bugs, rodents, ants, cockroaches, spiders, wasps, and other insects.`,
    path: `/locations/${location.slug}/`,
    active: "areas",
    schema: [
      localBusinessSchema(),
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Locations", path: "/locations/oshawa/" },
        { name: location.name, path: `/locations/${location.slug}/` },
      ]),
    ],
    children: `
      <section class="subhero subhero-compact">
        <img src="${assets.hero}" alt="Bugman Plus pest control technician" width="1800" height="1315">
        <div class="subhero-content reveal">
          <p class="eyebrow">${location.name}, ${location.region}</p>
          <h1>Pest Control in ${location.name}</h1>
          <p>${location.name} is ${location.descriptor}. Bugman Plus supports homes, businesses, landlords, and property teams with focused pest control services.</p>
        </div>
      </section>
      <section class="section services-section">
        <div class="section-heading split reveal">
          <div>
            <p class="section-kicker">Services in ${location.name}</p>
            <h2>Choose a pest control service for this area.</h2>
          </div>
          <a class="text-link" href="/quote/?location=${location.slug}">Request local service</a>
        </div>
        <div class="service-grid service-grid-compact">
          ${services
            .map(
              (service, index) => `
              <article class="service-card reveal">
                <a href="/locations/${location.slug}/${service.slug}/" aria-label="${service.title} in ${location.name}">
                  <img src="${service.image}" alt="${service.alt}" loading="lazy" width="720" height="520">
                  <span class="card-number">${String(index + 1).padStart(2, "0")}</span>
                  <div class="service-card-content">
                    <h3>${service.title}</h3>
                    <p>${service.summary}</p>
                  </div>
                </a>
              </article>`,
            )
            .join("")}
        </div>
      </section>
    `,
  });

const locationServicePage = (location, service) =>
  shell({
    title: `${service.title} in ${location.name}, ${location.region} | Bugman Plus`,
    description: `Need ${service.title.toLowerCase()} in ${location.name}, ${location.region}? Bugman Plus provides focused pest inspection and treatment programs with local service across Oshawa and Durham Region.`,
    path: `/locations/${location.slug}/${service.slug}/`,
    active: "areas",
    image: service.image,
    schema: [
      localBusinessSchema(),
      serviceSchema(service, location),
      faqSchema(service.faq),
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Locations", path: "/locations/oshawa/" },
        { name: location.name, path: `/locations/${location.slug}/` },
        { name: service.title, path: `/locations/${location.slug}/${service.slug}/` },
      ]),
    ],
    children: `
      <section class="subhero service-hero">
        <img src="${service.image}" alt="${service.alt}" width="1800" height="1200">
        <div class="subhero-content reveal">
          <p class="eyebrow">${location.name}, ${location.region}</p>
          <h1>${service.title} in ${location.name}</h1>
          <p>${service.intro} Bugman Plus serves ${location.name} with careful inspection, practical treatment guidance, and a warranty-minded interior service promise.</p>
          <div class="hero-actions">
            <a class="button" href="/quote/?service=${service.slug}&location=${location.slug}">Request Service</a>
            <a class="button button-secondary" href="tel:${site.phoneHref}">Call ${site.phone}</a>
          </div>
        </div>
      </section>
      <section class="section detail-grid">
        <div class="detail-main reveal">
          <p class="section-kicker">Local Treatment</p>
          <h2>${service.shortTitle} service built for ${location.name} properties.</h2>
          <p>${location.name} is ${location.descriptor}. ${service.summary}</p>
          <ol class="process-list">
            ${service.process.map((step) => `<li><span></span><p>${step}</p></li>`).join("")}
          </ol>
        </div>
        <aside class="detail-aside reveal">
          <h3>Common signs in ${location.name}</h3>
          <ul>${service.signs.map((sign) => `<li>${sign}</li>`).join("")}</ul>
          <a class="button button-wide" href="/quote/?service=${service.slug}&location=${location.slug}">Get a Quote</a>
        </aside>
      </section>
      <section class="section faq-section">
        <div class="section-heading reveal">
          <p class="section-kicker">FAQs</p>
          <h2>${service.shortTitle} questions for ${location.name}.</h2>
        </div>
        ${faqList(service.faq)}
      </section>
    `,
  });

const contactPage = () =>
  shell({
    title: "Contact Bugman Plus | Pest Control Oshawa",
    description:
      "Contact Bugman Plus for pest control in Oshawa and Durham Region. Call 905-924-2847 or email info@bugmanplus.com.",
    path: "/contact/",
    active: "contact",
    schema: [
      localBusinessSchema(),
      breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact/" }]),
    ],
    children: `
      <section class="subhero subhero-compact">
        <img src="${assets.hero}" alt="Bugman Plus pest control contact background" width="1800" height="1315">
        <div class="subhero-content reveal">
          <p class="eyebrow">Contact</p>
          <h1>Tell Bugman Plus what you are seeing.</h1>
          <p>Call, email, or send the form with the pest type, service area, and a few details about the activity.</p>
        </div>
      </section>
      <section class="section contact-split">
        <div class="contact-copy reveal">
          <p class="section-kicker">Inquiry</p>
          <h2>Direct contact details.</h2>
          <div class="contact-methods large">
            <a href="tel:${site.phoneHref}">${site.phone}</a>
            <a href="mailto:${site.email}">${site.email}</a>
          </div>
          <p>Based in Oshawa, Ontario. Serving nearby Durham Region and east GTA service areas.</p>
        </div>
        ${quoteForm("Contact page request")}
      </section>
    `,
  });

const quotePage = () =>
  shell({
    title: "Get a Pest Control Quote | Bugman Plus",
    description:
      "Request a Bugman Plus pest control quote for Oshawa, Whitby, Ajax, Pickering, Scarborough, and Durham Region.",
    path: "/quote/",
    active: "contact",
    schema: [
      localBusinessSchema(),
      breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Get a Quote", path: "/quote/" }]),
    ],
    children: `
      <section class="subhero subhero-compact">
        <img src="${assets.hero}" alt="Bugman Plus quote background" width="1800" height="1315">
        <div class="subhero-content reveal">
          <p class="eyebrow">Get a Quote</p>
          <h1>Start with the pest, location, and urgency.</h1>
          <p>The clearer the details, the better Bugman Plus can recommend the right treatment path.</p>
        </div>
      </section>
      <section class="section quote-page-section">
        ${quoteForm("Quote page request")}
      </section>
    `,
  });

const buildSitemap = (paths) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map(
    (path) => `  <url>
    <loc>${pageUrl(path)}</loc>
    <changefreq>${path === "/" ? "weekly" : "monthly"}</changefreq>
    <priority>${path === "/" ? "1.0" : path.includes("/locations/") ? "0.7" : "0.8"}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

const generatedPaths = ["/", "/about/", "/services/", "/contact/", "/quote/"];

write("index.html", homePage());
write("about/index.html", aboutPage());
write("services/index.html", servicesPage());
write("contact/index.html", contactPage());
write("quote/index.html", quotePage());

for (const service of services) {
  const path = `/services/${service.slug}/`;
  generatedPaths.push(path);
  write(`services/${service.slug}/index.html`, servicePage(service));
}

for (const location of locations) {
  const locationPath = `/locations/${location.slug}/`;
  generatedPaths.push(locationPath);
  write(`locations/${location.slug}/index.html`, locationPage(location));

  for (const service of services) {
    const path = `/locations/${location.slug}/${service.slug}/`;
    generatedPaths.push(path);
    write(`locations/${location.slug}/${service.slug}/index.html`, locationServicePage(location, service));
  }
}

write("sitemap.xml", buildSitemap(generatedPaths));
write(
  "robots.txt",
  `User-agent: *
Allow: /

Sitemap: ${site.url}/sitemap.xml
`,
);

write(
  "README.md",
  `# Bugman Plus Premium Website

Generated static, multi-page website for Bugman Plus.

## Commands

- \`npm run build\` regenerates pages from \`scripts/build.mjs\`.
- \`npm run preview\` serves the site at \`http://localhost:4173\`.

The service and location SEO pages are generated from shared service/location data in \`scripts/build.mjs\`.
`,
);

console.log(`Generated ${generatedPaths.length} pages.`);
