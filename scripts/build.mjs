import { cpSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const root = process.cwd();
const outputRoot = join(root, "public");
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

const serviceImages = {
  bedBug: versionedAsset("/assets/images/bed-bug-control.jpg"),
  rodent: versionedAsset("/assets/images/rodent-control.jpg"),
  stinging: versionedAsset("/assets/images/spider-wasp-control.jpg"),
  ant: versionedAsset("/assets/images/ant-control.jpg"),
  cockroach: versionedAsset("/assets/images/cockroach-control.jpg"),
  insect: versionedAsset("/assets/images/other-bug-control.jpg"),
};

const services = [
  {
    slug: "bed-bug-control",
    title: "Bed Bug Control",
    shortTitle: "Bed Bugs",
    image: serviceImages.bedBug,
    alt: "Detailed service photo for bed bug control",
    label: "Interior service",
    season: "All year",
    covers: ["Bed bugs", "Bat bugs", "Biting pest inspection"],
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
  },
  {
    slug: "mouse-control",
    title: "Mouse Control",
    shortTitle: "Mice",
    image: serviceImages.rodent,
    alt: "Service photo for mouse control",
    label: "Rodent service",
    season: "All year, highest in fall and winter",
    intro:
      "Mouse inspection, control, and prevention programs for homes, restaurants, offices, warehouses, and rental properties.",
    summary:
      "Find entry routes, reduce active mouse pressure, and protect the structure from repeat movement.",
    covers: ["House mice", "Deer mice", "Interior rodent pressure", "Garage and basement activity"],
    signs: ["Small droppings", "Scratching at night", "Chewed packaging", "Activity near kitchens or utility rooms"],
    process: [
      "Inspect foundations, doors, vents, utility penetrations, storage zones, and interior travel paths.",
      "Build a control plan around activity level, sanitation needs, and the layout of the building.",
      "Recommend exclusion and cleanup steps to reduce the chance of mice returning.",
    ],
    faq: [
      {
        q: "How do mice get into a home?",
        a: "Mice can use small gaps around doors, foundations, vents, siding, garages, and utility penetrations.",
      },
      {
        q: "Is mouse control just traps?",
        a: "No. Traps may be part of the plan, but inspection, entry-point awareness, sanitation, and follow-up make the program stronger.",
      },
    ],
  },
  {
    slug: "rat-control",
    title: "Rat Control",
    shortTitle: "Rats",
    image: serviceImages.rodent,
    alt: "Service photo for rat control",
    label: "Rodent service",
    season: "All year",
    intro:
      "Rat control programs for exterior burrows, garbage pressure, commercial sites, laneways, sheds, garages, and building edges.",
    summary:
      "Identify food, shelter, and travel routes so the rat control plan addresses the property conditions that keep activity active.",
    covers: ["Norway rats", "Roof rats", "Burrow activity", "Commercial rodent pressure"],
    signs: ["Burrows", "Large droppings", "Gnaw marks", "Pathways along walls or fences"],
    process: [
      "Inspect exterior routes, waste areas, foundation gaps, burrows, and high-pressure edges.",
      "Set a control strategy matched to the site, safety needs, and surrounding activity.",
      "Recommend sanitation, storage, and exclusion improvements that make the property less attractive.",
    ],
    faq: [
      {
        q: "Why are rats active around buildings?",
        a: "Rats look for food, water, shelter, and quiet travel routes. Dense urban areas can provide all of those conditions.",
      },
      {
        q: "Do rats need a different plan than mice?",
        a: "Yes. Rats are larger, use different travel routes, and often require more exterior investigation and sanitation planning.",
      },
    ],
  },
  {
    slug: "cockroach-control",
    title: "Cockroach Control",
    shortTitle: "Cockroaches",
    image: serviceImages.cockroach,
    alt: "Service photo for cockroach pest control",
    label: "Interior service",
    season: "All year",
    intro:
      "Kitchen, bathroom, and utility-area programs for cockroach activity in residential and commercial spaces.",
    summary:
      "Focused treatment and sanitation guidance for the warm, hidden spaces cockroaches use to spread.",
    covers: [
      "German cockroaches",
      "American cockroaches",
      "Oriental cockroaches",
      "Brown-banded cockroaches",
      "Smokybrown cockroaches",
      "Water bugs",
    ],
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
  },
  {
    slug: "ant-control",
    title: "Ant Control",
    shortTitle: "Ants",
    image: serviceImages.ant,
    alt: "Service photo for ant pest control",
    label: "Interior/exterior service",
    season: "Spring to summer",
    intro:
      "Interior and exterior ant treatment programs for trails, entry points, kitchens, patios, and structural gaps.",
    summary:
      "Track ant movement, treat the source, and reduce access points that keep colonies feeding indoors.",
    covers: [
      "Pavement ants",
      "Pharaoh ants",
      "Odorous house ants",
      "Argentine ants",
      "Acrobat ants",
      "Field ants",
      "Thief ants",
      "Moisture ants",
    ],
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
  },
  {
    slug: "wasp-nest-removal",
    title: "Wasp Nest Removal",
    shortTitle: "Wasps",
    image: serviceImages.stinging,
    alt: "Service photo for wasp nest removal",
    label: "Nest service",
    season: "Spring to fall",
    intro:
      "Professional wasp and yellowjacket nest service for eaves, decks, sheds, soffits, wall voids, and ground nests.",
    summary:
      "Treat active nests with the right timing and safety plan so outdoor spaces can be used with confidence again.",
    covers: ["Paper wasps", "Yellowjackets", "Bald-faced hornets", "Mud daubers", "Ground wasps"],
    signs: ["Repeated wasp traffic", "Visible paper nests", "Ground nest entry holes", "Stinging insects near doors or decks"],
    process: [
      "Identify the species, nest location, traffic pattern, and nearby safety concerns.",
      "Treat the nest area using an approach matched to the location and activity level.",
      "Review prevention steps for entry points, food sources, and future nesting pressure.",
    ],
    faq: [
      {
        q: "Should I remove a wasp nest myself?",
        a: "A visible nest near people, pets, doors, decks, or work areas is safer to handle professionally, especially when traffic is heavy.",
      },
      {
        q: "When is wasp activity highest?",
        a: "In Ontario, nest calls usually build from spring through fall, with mature nests becoming more noticeable later in the season.",
      },
    ],
  },
  {
    slug: "spider-control",
    title: "Spider Control",
    shortTitle: "Spiders",
    image: serviceImages.stinging,
    alt: "Service photo for spider control",
    label: "Perimeter service",
    season: "All year",
    intro:
      "Interior and exterior spider control for recurring webs, basement activity, garages, sheds, and perimeter pressure.",
    summary:
      "Reduce webbing and spider activity by targeting shelter zones, entry points, and the insects that help sustain spider pressure.",
    covers: ["House spiders", "Cellar spiders", "Exterior webbing", "Garage and basement activity"],
    signs: ["Recurring webs", "Spiders near windows", "Basement sightings", "Activity around lights or insects"],
    process: [
      "Inspect exterior lights, siding, windows, garages, basements, and sheltered corners.",
      "Treat selected activity zones and reduce web-heavy return points.",
      "Recommend sealing, lighting, clutter, and moisture adjustments that lower insect pressure.",
    ],
    faq: [
      {
        q: "Will spider service remove every spider?",
        a: "No service can guarantee that every spider will disappear, but targeted treatment can greatly reduce recurring activity and webbing.",
      },
      {
        q: "Why do spiders keep coming back?",
        a: "Spiders return where shelter and prey insects are available, especially around lights, cracks, clutter, and protected edges.",
      },
    ],
  },
  {
    slug: "flea-control",
    title: "Flea Control",
    shortTitle: "Fleas",
    image: serviceImages.insect,
    alt: "Service photo for flea control",
    label: "Biting pest service",
    season: "Spring to fall",
    intro:
      "Flea treatment support for homes with pet activity, wildlife pressure, recurring bites, and carpet or upholstered areas.",
    summary:
      "Treat active flea zones while coordinating preparation, vacuuming, pet care, and follow-up timing.",
    covers: ["Fleas", "Biting pest inspection", "Pet-associated activity"],
    signs: ["Bites around ankles", "Pets scratching", "Fleas in carpets", "Activity after wildlife or pet exposure"],
    process: [
      "Inspect sleeping areas, carpets, furniture, pet routes, and likely transfer zones.",
      "Treat active areas with attention to preparation and product timing.",
      "Provide follow-up guidance for vacuuming, pet treatment, and reinfestation prevention.",
    ],
    faq: [
      {
        q: "Do pets need to be treated too?",
        a: "Yes. Flea control works best when veterinary pet treatment, cleaning, and structural treatment are coordinated.",
      },
      {
        q: "Why do fleas appear after treatment?",
        a: "Flea life stages can emerge after the first service, which is why preparation and follow-up timing matter.",
      },
    ],
  },
  {
    slug: "mosquito-control",
    title: "Mosquito Control",
    shortTitle: "Mosquitoes",
    image: serviceImages.insect,
    alt: "Service photo for mosquito control",
    label: "Outdoor service",
    season: "Spring to fall",
    intro:
      "Outdoor mosquito control and breeding-site guidance for backyards, patios, event areas, and shaded wet zones.",
    summary:
      "Reduce mosquito pressure by treating resting areas and removing the standing water conditions where mosquitoes breed.",
    covers: ["Mosquitoes", "Biting fly pressure", "Outdoor nuisance biting pests"],
    signs: ["Bites outdoors", "Standing water", "Heavy activity at dusk", "Shaded damp resting areas"],
    process: [
      "Inspect standing water, shaded vegetation, drains, containers, and outdoor seating areas.",
      "Treat selected resting zones and recommend breeding-site reduction.",
      "Plan repeat service around warm-season activity and property use.",
    ],
    faq: [
      {
        q: "What creates mosquito pressure?",
        a: "Standing water, shade, humidity, and nearby breeding sites can create persistent mosquito pressure.",
      },
      {
        q: "When is mosquito service most useful?",
        a: "Mosquito programs are most useful during the warm season, especially before outdoor gatherings or recurring backyard use.",
      },
    ],
  },
  {
    slug: "carpenter-ant-control",
    title: "Carpenter Ant Control",
    shortTitle: "Carpenter Ants",
    image: serviceImages.ant,
    alt: "Service photo for carpenter ant control",
    label: "Wood & ant service",
    season: "Spring to summer",
    intro:
      "Carpenter ant inspection and treatment for structural wood, moisture-damaged areas, exterior wood, decks, and satellite nests.",
    summary:
      "Locate the activity source and correct the moisture or wood conditions that let carpenter ants establish pressure.",
    covers: ["Carpenter ants", "Moisture-related ant activity", "Wood-associated ants"],
    signs: ["Large black ants", "Frass or sawdust", "Winged ants indoors", "Activity near damp wood"],
    process: [
      "Inspect moisture zones, wood contact, trees, decks, wall voids, and interior sightings.",
      "Treat the colony pressure and likely satellite nest routes.",
      "Recommend wood repair, moisture correction, and vegetation changes that reduce future risk.",
    ],
    faq: [
      {
        q: "Do carpenter ants eat wood?",
        a: "Carpenter ants excavate wood for nesting instead of eating it, and moisture-damaged wood is a common attraction.",
      },
      {
        q: "Why are winged ants a concern?",
        a: "Winged ants indoors can suggest an established colony or nearby nesting pressure that deserves inspection.",
      },
    ],
  },
  {
    slug: "carpenter-bee-control",
    title: "Carpenter Bee Control",
    shortTitle: "Carpenter Bees",
    image: serviceImages.stinging,
    alt: "Service photo for carpenter bee control",
    label: "Wood pest service",
    season: "Spring to summer",
    intro:
      "Carpenter bee control for decks, fascia, trim, railings, pergolas, sheds, and exposed wood where round entry holes appear.",
    summary:
      "Treat active galleries and protect vulnerable wood surfaces from repeat boring activity.",
    covers: ["Carpenter bees", "Wood-boring bee activity", "Deck and fascia pressure"],
    signs: ["Round holes in wood", "Sawdust below openings", "Large hovering bees", "Staining under galleries"],
    process: [
      "Inspect exposed wood, entry holes, staining, sawdust, and recurring hover zones.",
      "Treat active galleries and recommend timing for sealing after activity is controlled.",
      "Provide prevention guidance for painting, sealing, and protecting exposed wood.",
    ],
    faq: [
      {
        q: "Are carpenter bees the same as bumblebees?",
        a: "They can look similar, but carpenter bees bore into wood and usually require a different control and prevention plan.",
      },
      {
        q: "Can I seal carpenter bee holes right away?",
        a: "Sealing too early can trap activity inside. Treatment and timing should come before permanent sealing.",
      },
    ],
  },
  {
    slug: "fruit-fly-control",
    title: "Fruit Fly Control",
    shortTitle: "Fruit Flies",
    image: serviceImages.insect,
    alt: "Service photo for fruit fly control",
    label: "Fly service",
    season: "Spring to fall",
    intro:
      "Fruit fly control for kitchens, restaurants, bars, break rooms, garbage areas, produce storage, and drains.",
    summary:
      "Locate breeding sources and sanitation gaps so treatment is matched to where fruit flies are actually developing.",
    covers: ["Fruit flies", "Small fly pressure", "Bar and kitchen fly activity"],
    signs: ["Small flies near produce", "Activity around bins", "Flies near drains", "Recurring kitchen sightings"],
    process: [
      "Inspect produce, waste, recycling, floor drains, beverage lines, and wet organic buildup.",
      "Treat breeding zones and recommend cleaning steps that remove the source.",
      "Set monitoring and prevention habits for recurring food-service or residential areas.",
    ],
    faq: [
      {
        q: "Why do fruit flies keep returning?",
        a: "They return when organic buildup, damp residues, produce, or waste areas continue to support breeding.",
      },
      {
        q: "Is fruit fly control different from drain fly control?",
        a: "Yes. Identification matters because the breeding source and treatment path can be different.",
      },
    ],
  },
  {
    slug: "drain-fly-control",
    title: "Drain Fly Control",
    shortTitle: "Drain Flies",
    image: serviceImages.insect,
    alt: "Service photo for drain fly control",
    label: "Drain & fly service",
    season: "All year",
    intro:
      "Drain fly inspection and treatment for floor drains, sink drains, mechanical rooms, restaurants, basements, and damp utility spaces.",
    summary:
      "Trace drain fly breeding to organic buildup, slow drains, moisture, and hard-to-clean wet zones.",
    covers: ["Drain flies", "Moth flies", "Small fly pressure", "Moisture-related fly activity"],
    signs: ["Tiny moth-like flies", "Activity near drains", "Flies in bathrooms", "Recurring damp-area sightings"],
    process: [
      "Inspect drains, traps, sump areas, cracked pipes, and wet organic buildup.",
      "Treat breeding material and support the cleaning work needed to break the cycle.",
      "Recommend moisture and maintenance steps to keep drains from rebuilding pressure.",
    ],
    faq: [
      {
        q: "Do drain flies always come from drains?",
        a: "Often, but they can also come from other damp organic buildup, cracked plumbing, or wet utility spaces.",
      },
      {
        q: "Will spraying the air solve drain flies?",
        a: "No. The breeding source needs to be found and treated or the activity usually returns.",
      },
    ],
  },
  {
    slug: "cluster-fly-control",
    title: "Cluster Fly Control",
    shortTitle: "Cluster Flies",
    image: serviceImages.insect,
    alt: "Service photo for cluster fly control",
    label: "Seasonal fly service",
    season: "Fall and spring",
    intro:
      "Cluster fly service for attics, upper floors, windows, wall voids, and overwintering pressure in homes and cottages.",
    summary:
      "Treat and prevent seasonal fly pressure where cluster flies enter structures to overwinter and reappear when temperatures shift.",
    covers: ["Cluster flies", "Blow flies", "Overwintering fly pressure"],
    signs: ["Flies at sunny windows", "Activity in upper rooms", "Attic sightings", "Spring re-emergence"],
    process: [
      "Inspect upper walls, attic access, windows, siding gaps, and seasonal entry points.",
      "Treat active or likely pressure zones with attention to timing.",
      "Recommend sealing and exterior prevention before fall entry pressure builds.",
    ],
    faq: [
      {
        q: "Why do cluster flies appear in winter or spring?",
        a: "They often overwinter in protected spaces and become visible indoors when warmth changes their activity.",
      },
      {
        q: "When should cluster fly prevention happen?",
        a: "Prevention is strongest before fall entry pressure, but active indoor issues can still be assessed.",
      },
    ],
  },
  {
    slug: "silverfish-control",
    title: "Silverfish Control",
    shortTitle: "Silverfish",
    image: serviceImages.insect,
    alt: "Service photo for silverfish control",
    label: "Crawling insect service",
    season: "All year",
    intro:
      "Silverfish control for bathrooms, basements, closets, storage rooms, bookshelves, and damp hidden spaces.",
    summary:
      "Treat silverfish hiding areas while improving moisture, storage, and crack conditions that support activity.",
    covers: ["Silverfish", "Firebrats", "Booklice inspection"],
    signs: ["Fast silver insects", "Activity in bathrooms", "Paper or fabric damage", "Sightings near damp storage"],
    process: [
      "Inspect moisture, storage, baseboards, closets, bathrooms, and paper-heavy areas.",
      "Treat cracks, voids, and travel zones where silverfish hide.",
      "Recommend humidity reduction, storage changes, and sealing steps.",
    ],
    faq: [
      {
        q: "Why are silverfish in bathrooms?",
        a: "Silverfish like moisture, shelter, and access to starchy materials, so bathrooms and storage areas are common.",
      },
      {
        q: "Can silverfish damage belongings?",
        a: "They can damage paper, books, wallpaper, fabrics, and stored materials when activity is left unchecked.",
      },
    ],
  },
  {
    slug: "carpet-beetle-control",
    title: "Carpet Beetle Control",
    shortTitle: "Carpet Beetles",
    image: serviceImages.insect,
    alt: "Service photo for carpet beetle control",
    label: "Fabric pest service",
    season: "All year",
    intro:
      "Carpet beetle inspection and treatment for closets, carpets, rugs, upholstery, stored fabrics, and hidden lint buildup.",
    summary:
      "Find larval feeding areas and treat the cracks, textile zones, and storage conditions where carpet beetles persist.",
    covers: ["Carpet beetles", "Dermestid beetles", "Fabric pest inspection"],
    signs: ["Larvae or shed skins", "Damage to wool or fabrics", "Small beetles at windows", "Activity in closets"],
    process: [
      "Inspect textile storage, rugs, closets, baseboards, vents, pet hair, and lint-heavy areas.",
      "Treat selected harborages and feeding zones.",
      "Recommend cleaning, laundering, storage, and monitoring steps to prevent recurrence.",
    ],
    faq: [
      {
        q: "Do carpet beetles only live in carpets?",
        a: "No. They can feed on natural fibers, lint, hair, feathers, stored textiles, and hidden debris.",
      },
      {
        q: "Why am I seeing beetles at windows?",
        a: "Adults are attracted to light and may appear at windows even when larvae are feeding elsewhere.",
      },
    ],
  },
  {
    slug: "pantry-pest-control",
    title: "Pantry Pest Control",
    shortTitle: "Pantry Pests",
    image: serviceImages.insect,
    alt: "Service photo for pantry pest control",
    label: "Pantry pest service",
    season: "All year",
    intro:
      "Pantry pest control for moths, beetles, weevils, flour products, grain products, pet food, and dry-food storage.",
    summary:
      "Identify the infested product source, remove contaminated food, and treat storage areas so pantry pests do not keep spreading.",
    covers: ["Indian meal moths", "Grain beetles", "Flour beetles", "Weevils", "Pantry moths"],
    signs: ["Moths in cupboards", "Webbing in food", "Small beetles in flour", "Larvae in stored products"],
    process: [
      "Inspect dry goods, pet food, spices, grains, cupboards, shelves, and packaging seams.",
      "Identify and remove the source while treating cracks and storage zones.",
      "Recommend airtight storage, rotation, and monitoring practices.",
    ],
    faq: [
      {
        q: "Do I need to throw everything away?",
        a: "Not always. The goal is to identify infested items, dispose of contaminated product, and protect clean food in sealed containers.",
      },
      {
        q: "Can pantry moths spread between cupboards?",
        a: "Yes. Larvae and adults can move through nearby storage areas, which is why a full inspection matters.",
      },
    ],
  },
  {
    slug: "earwig-control",
    title: "Earwig Control",
    shortTitle: "Earwigs",
    image: serviceImages.insect,
    alt: "Service photo for earwig control",
    label: "Moisture pest service",
    season: "Spring to fall",
    intro:
      "Earwig control for damp exterior edges, basements, garages, patios, gardens, door thresholds, and lower-level rooms.",
    summary:
      "Reduce earwig entry by treating moisture-heavy exterior zones and the cracks that let them move indoors.",
    covers: ["Earwigs", "Moisture pests", "Seasonal crawling insects"],
    signs: ["Earwigs indoors", "Activity after rain", "Basement sightings", "Harborage under mulch or debris"],
    process: [
      "Inspect moisture, mulch, foundation edges, door thresholds, garages, and basement access points.",
      "Treat active harborage and entry zones.",
      "Recommend moisture, debris, and sealing changes that reduce repeat entry.",
    ],
    faq: [
      {
        q: "Why are earwigs coming inside?",
        a: "Earwigs often move indoors from damp exterior areas, especially after wet weather or when shelter is available near entry points.",
      },
      {
        q: "Are earwigs a structural pest?",
        a: "No. They are usually a nuisance pest, but recurring indoor activity still needs source and entry-point control.",
      },
    ],
  },
  {
    slug: "stink-bug-control",
    title: "Stink Bug Control",
    shortTitle: "Stink Bugs",
    image: serviceImages.insect,
    alt: "Service photo for stink bug control",
    label: "Seasonal service",
    season: "Fall and spring",
    intro:
      "Stink bug and seasonal invader control for exterior walls, sunny windows, attics, siding gaps, and overwintering entry points.",
    summary:
      "Reduce seasonal entry pressure before stink bugs and related invaders settle into protected spaces.",
    covers: ["Brown marmorated stink bugs", "Boxelder bugs", "Asian lady beetles", "Elm seed bugs", "Pine seed bugs"],
    signs: ["Bugs at sunny windows", "Fall wall activity", "Odor when crushed", "Spring indoor re-emergence"],
    process: [
      "Inspect exterior walls, window frames, siding gaps, attic edges, and sun-facing entry points.",
      "Treat selected exterior or entry zones at the right seasonal timing.",
      "Recommend sealing and exclusion steps before fall pressure returns.",
    ],
    faq: [
      {
        q: "Why do stink bugs show up indoors in spring?",
        a: "They may overwinter in wall voids or protected spaces and become visible again when temperatures change.",
      },
      {
        q: "When should seasonal invader prevention happen?",
        a: "Late summer to fall prevention is usually best because many invaders are trying to enter before winter.",
      },
    ],
  },
  {
    slug: "house-fly-control",
    title: "House Fly Control",
    shortTitle: "House Flies",
    image: serviceImages.insect,
    alt: "Service photo for house fly control",
    label: "Fly service",
    season: "Spring to fall",
    intro:
      "House fly control for restaurants, garbage rooms, kitchens, commercial sites, food-handling spaces, and homes.",
    summary:
      "Identify breeding sources and sanitation gaps so fly treatment supports food safety, comfort, and prevention.",
    covers: ["House flies", "Blow flies", "Fungus gnats", "Flies from dead animal sources"],
    signs: ["Flies around waste", "Activity near food areas", "Flies at windows", "Recurring indoor fly pressure"],
    process: [
      "Inspect waste handling, drains, doors, loading areas, food storage, and possible breeding sources.",
      "Treat active fly pressure and support sanitation or exclusion improvements.",
      "Recommend monitoring and maintenance steps for high-traffic commercial or residential spaces.",
    ],
    faq: [
      {
        q: "Why do house flies keep coming back?",
        a: "They often return when waste, organic residue, door gaps, or breeding sources remain active.",
      },
      {
        q: "Can fly control help food businesses?",
        a: "Yes. Professional fly control can support sanitation, monitoring, and prevention programs for food premises.",
      },
    ],
  },
];

const locations = [
  {
    slug: "oshawa",
    name: "Oshawa",
    region: "ON",
    descriptor: "the home base for Bugman Plus, with homes, rentals, restaurants, and commercial properties that need dependable pest control",
  },
  {
    slug: "whitby",
    name: "Whitby",
    region: "ON",
    descriptor: "a central Durham Region market with family homes, rentals, restaurants, and commercial pest control needs",
  },
  {
    slug: "ajax",
    name: "Ajax",
    region: "ON",
    descriptor: "a fast-growing Durham Region lakeside community where seasonal pest pressure can move quickly",
  },
  {
    slug: "pickering",
    name: "Pickering",
    region: "ON",
    descriptor: "a Durham Region market with homes, townhomes, businesses, and waterfront properties",
  },
  {
    slug: "clarington",
    name: "Clarington",
    region: "ON",
    descriptor: "an eastern Durham Region municipality with residential, rural, commercial, and seasonal pest control needs",
  },
  {
    slug: "bowmanville",
    name: "Bowmanville",
    region: "ON",
    descriptor: "a Clarington community with homeowners, rental properties, and businesses that need local pest control support",
  },
  {
    slug: "courtice",
    name: "Courtice",
    region: "ON",
    descriptor: "a Clarington community with suburban homes, schools, and commercial properties that need local pest control support",
  },
  {
    slug: "newcastle",
    name: "Newcastle",
    region: "ON",
    descriptor: "an east Durham community with residential, rural-edge, and seasonal pest control pressure",
  },
  {
    slug: "brooklin",
    name: "Brooklin",
    region: "ON",
    descriptor: "a north Whitby community where new homes, older properties, and seasonal pest pressure can affect families and businesses",
  },
  {
    slug: "port-perry",
    name: "Port Perry",
    region: "ON",
    descriptor: "a Scugog community with lakeside, rural, residential, and commercial pest control needs",
  },
  {
    slug: "scugog",
    name: "Scugog",
    region: "ON",
    descriptor: "a north Durham municipality with lakefront, rural, and residential pest control needs",
  },
  {
    slug: "uxbridge",
    name: "Uxbridge",
    region: "ON",
    descriptor: "a north Durham municipality where rural edges, older structures, and seasonal pressure can create pest issues",
  },
  {
    slug: "brock",
    name: "Brock",
    region: "ON",
    descriptor: "a north Durham municipality with rural, cottage, farm-adjacent, and residential pest control needs",
  },
  {
    slug: "durham-region",
    name: "Durham Region",
    region: "ON",
    schemaType: "AdministrativeArea",
    descriptor: "the core service area for Bugman Plus, including homes, rentals, restaurants, offices, and commercial properties",
  },
  {
    slug: "scarborough",
    name: "Scarborough",
    region: "ON",
    descriptor: "an east Toronto and GTA service area with dense residential, apartment, restaurant, and commercial pest control needs",
  },
  {
    slug: "north-york",
    name: "North York",
    region: "ON",
    descriptor: "a major Toronto and GTA service area with condos, rental buildings, family homes, offices, and food-service pest control needs",
  },
  {
    slug: "mississauga",
    name: "Mississauga",
    region: "ON",
    descriptor: "a large GTA service area with residential towers, family homes, restaurants, warehouses, and commercial pest control needs",
  },
  {
    slug: "vaughan",
    name: "Vaughan",
    region: "ON",
    descriptor: "a York Region and GTA service area with homes, commercial plazas, restaurants, warehouses, and industrial pest control needs",
  },
  {
    slug: "gta",
    name: "Greater Toronto Area",
    region: "ON",
    schemaType: "AdministrativeArea",
    descriptor: "the broader GTA service area for homes, rentals, restaurants, offices, warehouses, and commercial properties",
  },
];

const serviceAreaSummary =
  "Oshawa, Whitby, Ajax, Pickering, Clarington, Bowmanville, Courtice, Newcastle, Brooklin, Port Perry, Scugog, Uxbridge, Brock, Durham Region, Scarborough, North York, Mississauga, Vaughan, and the GTA";

const durhamLocationSlugs = new Set([
  "oshawa",
  "whitby",
  "ajax",
  "pickering",
  "clarington",
  "bowmanville",
  "courtice",
  "newcastle",
  "brooklin",
  "port-perry",
  "scugog",
  "uxbridge",
  "brock",
  "durham-region",
]);

const locationMarketLabel = (location) =>
  durhamLocationSlugs.has(location.slug) ? "Durham Region Exterminator" : "GTA Pest Control";

const locationRegionLabel = (location) =>
  durhamLocationSlugs.has(location.slug) ? "Durham Region" : "GTA";

const locationServiceDescription = (location, service) =>
  durhamLocationSlugs.has(location.slug)
    ? `Need ${service.title.toLowerCase()} in ${location.name}, ${location.region}? Bugman Plus provides focused Durham Region pest inspection and treatment programs for homes, rentals, restaurants, offices, and commercial properties.`
    : `Need ${service.title.toLowerCase()} in ${location.name}, ${location.region}? Bugman Plus provides focused GTA pest inspection and treatment programs for homes, rentals, restaurants, offices, warehouses, and commercial properties.`;

const serviceAreaGroups = [
  {
    title: "Durham Region",
    note: "Oshawa-based service for nearby homes, rental properties, restaurants, offices, rural-edge properties, and commercial spaces.",
    slugs: [
      "oshawa",
      "whitby",
      "ajax",
      "pickering",
      "clarington",
      "bowmanville",
      "courtice",
      "newcastle",
      "brooklin",
      "port-perry",
      "scugog",
      "uxbridge",
      "brock",
      "durham-region",
    ],
  },
  {
    title: "Toronto & GTA",
    note: "Support for apartments, condos, restaurants, offices, warehouses, family homes, and commercial properties across key GTA areas.",
    slugs: ["scarborough", "north-york", "mississauga", "vaughan", "gta"],
  },
];

const pestConcernGroups = [
  {
    title: "Indoor Pest Problems",
    items: ["Bed bugs", "Cockroaches", "Ants", "Silverfish", "Carpet beetles", "Pantry pests", "Drain flies"],
  },
  {
    title: "Rodent Activity",
    items: ["House mice", "Deer mice", "Norway rats", "Roof rats", "Garage activity", "Basement activity", "Commercial rodent pressure"],
  },
  {
    title: "Outdoor & Stinging Pests",
    items: ["Wasps", "Yellowjackets", "Spiders", "Mosquitoes", "Fleas", "Earwigs", "Carpenter bees"],
  },
  {
    title: "Seasonal & Specialty Pests",
    items: ["Cluster flies", "Stink bugs", "Boxelder bugs", "Asian lady beetles", "Bird mites", "Bat bugs", "Wood-boring beetles"],
  },
];

const pestGroups = [
  { title: "Rodents", items: ["House mice", "Deer mice", "Norway rats", "Roof rats"] },
  {
    title: "Ants",
    items: ["Carpenter ants", "Pavement ants", "Pharaoh ants", "Odorous house ants", "Argentine ants", "Acrobat ants", "Field ants", "Thief ants", "Moisture ants"],
  },
  {
    title: "Cockroaches",
    items: ["German cockroaches", "American cockroaches", "Oriental cockroaches", "Brown-banded cockroaches", "Smokybrown cockroaches", "Water bugs"],
  },
  { title: "Bed Bugs & Biting Pests", items: ["Bed bugs", "Bat bugs", "Bird mites", "Rodent mites", "Fleas", "Ticks", "Chiggers", "Mosquitoes"] },
  {
    title: "Wasps, Bees & Stinging Insects",
    items: ["Paper wasps", "Yellowjackets", "Bald-faced hornets", "Mud daubers", "Ground wasps", "Carpenter bees", "Cicada killers"],
  },
  { title: "Flies", items: ["House flies", "Cluster flies", "Blow flies", "Fruit flies", "Drain flies", "Fungus gnats", "Carcass-related fly infestations"] },
  {
    title: "Beetles",
    items: ["Carpet beetles", "Ground beetles", "Darkling beetles", "June beetles", "May beetles", "Wood-boring beetles", "Fungus beetles", "Dermestid beetles"],
  },
  { title: "Pantry & Fabric Pests", items: ["Indian meal moths", "Grain beetles", "Flour beetles", "Weevils", "Pantry moths", "Clothes moths", "Carpet beetles"] },
  { title: "Crawling Insects", items: ["Silverfish", "Firebrats", "Earwigs", "Crickets", "Centipedes", "Millipedes", "Sowbugs", "Pillbugs", "Spiders"] },
  { title: "Seasonal Invaders", items: ["Boxelder bugs", "Brown marmorated stink bugs", "Asian lady beetles", "Elm seed bugs", "Pine seed bugs", "Clover mites"] },
  { title: "Moisture & Wood Pests", items: ["Psocids", "Booklice", "Mold mites", "Grain mites", "Termites", "Carpenter ants", "Carpenter bees", "Wood-boring beetles"] },
];

const serviceBySlug = Object.fromEntries(services.map((service) => [service.slug, service]));
const locationBySlug = Object.fromEntries(locations.map((location) => [location.slug, location]));

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about/" },
  { label: "Services", href: "/services/" },
  { label: "Areas", href: "/locations/" },
  { label: "Contact", href: "/contact/" },
];

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const write = (path, content) => {
  const outputPath = join(outputRoot, path);
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
    "@type": location.schemaType || "City",
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
        "@type": location.schemaType || "City",
        name: `${location.name}, ${location.region}`,
      }
    : locations.map((item) => ({ "@type": item.schemaType || "City", name: `${item.name}, ${item.region}` })),
  description: service.intro,
});

const header = (active = "") => `
<header class="site-header" data-site-header>
  <a class="brand" href="/" aria-label="${site.name} home">
    <img src="${assets.logo}" alt="${site.name} logo" width="174" height="81">
  </a>
  <nav class="primary-nav" aria-label="Primary navigation" data-primary-nav>
    ${navItems
      .map((item) => {
        const isActive = active === item.label.toLowerCase();
        return `<a class="${isActive ? "is-active" : ""}" href="${item.href}"${isActive ? ' aria-current="page"' : ""}>${item.label}</a>`;
      })
      .join("")}
  </nav>
  <div class="header-actions">
    <a class="call-link" href="tel:${site.phoneHref}">${site.phone}</a>
    <a class="button button-small${active === "quote" ? " is-active" : ""}" href="/quote/"${active === "quote" ? ' aria-current="page"' : ""}>Get a Quote</a>
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
      <form class="newsletter-form" action="/api/contact" method="post" data-lead-form data-success-message="Thanks. Bugman Plus received your newsletter signup.">
        <input type="hidden" name="formType" value="newsletter">
        <input type="hidden" name="context" value="Newsletter signup">
        <label class="form-hp">Website<input name="website" type="text" autocomplete="off" tabindex="-1"></label>
        <label class="sr-only" for="newsletter-email">Email</label>
        <input id="newsletter-email" name="email" type="email" placeholder="Your email" required>
        <button type="submit" aria-label="Subscribe">+</button>
        <p class="newsletter-note" data-form-note></p>
      </form>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© 2026 ${site.name}. All rights reserved.</span>
    <a href="#top" class="back-to-top" aria-label="Back to top">Up</a>
    <span>Oshawa, ON, Canada</span>
  </div>
</footer>`;

const discountPopup = () => `
<div class="discount-modal" data-discount-modal hidden>
  <div class="discount-backdrop" data-discount-close></div>
  <section class="discount-dialog" role="dialog" aria-modal="true" aria-labelledby="discount-title">
    <button class="discount-close" type="button" aria-label="Close discount offer" data-discount-close>&times;</button>
    <p class="section-kicker">New Customer Offer</p>
    <h2 id="discount-title">Save 5% on your first service.</h2>
    <p>Register with your email and phone number, then mention this offer when Bugman Plus confirms your appointment.</p>
    <form class="discount-form" action="/api/contact" method="post" data-discount-form data-lead-form data-success-message="Thanks. Bugman Plus received your discount registration.">
      <input type="hidden" name="formType" value="discount">
      <input type="hidden" name="context" value="5% discount registration">
      <label class="form-hp">Website<input name="website" type="text" autocomplete="off" tabindex="-1"></label>
      <label>Email<input name="email" type="email" placeholder="you@example.com" required></label>
      <label>Phone<input name="phone" type="tel" placeholder="905-000-0000" required></label>
      <button class="button button-wide" type="submit">Claim 5% Discount</button>
      <p class="discount-note" data-discount-note></p>
    </form>
    <a class="discount-call" href="tel:${site.phoneHref}">Prefer to call? ${site.phone}</a>
  </section>
</div>`;

const mobileCallButton = () => `
<a class="mobile-call-float" href="tel:${site.phoneHref}" aria-label="Call Bugman Plus now at ${site.phone}">
  <span>Call Now</span>
  <strong>${site.phone}</strong>
</a>`;

const bodyClassAttribute = (bodyClass = "") => (bodyClass ? ` class="${bodyClass}"` : "");

const shell = ({ title, description, path, active, image, schema, children, bodyClass }) => `${buildHead({
  title,
  description,
  path,
  image,
  schema,
})}
<body id="top"${bodyClassAttribute(bodyClass)}>
  <div class="site-shell">
    ${header(active)}
    <main>
      ${children}
    </main>
    ${footer()}
  </div>
  ${discountPopup()}
  ${mobileCallButton()}
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
            <div class="service-card-meta"><span>${service.label}</span><span>${service.season}</span></div>
            <h3>${service.title}</h3>
            <p>${service.summary}</p>
          </div>
        </a>
      </article>`,
    )
    .join("")}
</div>`;

const pestConcernOverview = () => `
<div class="concern-grid">
  ${pestConcernGroups
    .map(
      (group, index) => `
      <article class="concern-card reveal">
        <span>${String(index + 1).padStart(2, "0")}</span>
        <h3>${group.title}</h3>
        <p>${group.items.join(" / ")}</p>
      </article>`,
    )
    .join("")}
</div>`;

const pestDirectory = () => `
<div class="pest-directory">
  ${pestGroups
    .map(
      (group) => `
      <article class="pest-group reveal">
        <h3>${group.title}</h3>
        <p>${group.items.join(" / ")}</p>
      </article>`,
    )
    .join("")}
</div>`;

const coveredPests = (service) =>
  service.covers?.length
    ? `<div class="covered-list"><h3>Also handles</h3><ul>${service.covers.map((item) => `<li>${item}</li>`).join("")}</ul></div>`
    : "";

const locationLinks = (service) => `
<div class="location-grid">
  ${locations
    .map((location) => {
      const href = service ? `/locations/${location.slug}/${service.slug}/` : `/locations/${location.slug}/`;
      const label = service ? `${service.shortTitle} - ${location.name}` : location.name;
      const meta = service ? locationRegionLabel(location) : "View services";
      return `<a class="location-chip reveal" href="${href}"><span>${label}</span><small>${meta}</small></a>`;
    })
    .join("")}
</div>`;

const serviceAreaPanel = () => `
<div class="service-area-panel">
  ${serviceAreaGroups
    .map(
      (group) => `
      <article class="area-group reveal">
        <div class="area-group-copy">
          <p>${group.title}</p>
          <h3>${group.title === "Durham Region" ? "Local coverage from Bugman Plus home base." : "GTA support for busy residential and commercial properties."}</h3>
          <span>${group.note}</span>
        </div>
        <div class="area-list">
          ${group.slugs
            .map((slug) => {
              const location = locationBySlug[slug];
              return `<a href="/locations/${location.slug}/" aria-label="View Bugman Plus services in ${location.name}"><span>${location.name}</span></a>`;
            })
            .join("")}
        </div>
      </article>`,
    )
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
<div class="quote-stack reveal">
  <a class="call-now-card" href="tel:${site.phoneHref}" aria-label="Call Bugman Plus now at ${site.phone}">
    <span>Call Now</span>
    <strong>${site.phone}</strong>
  </a>
  <form class="quote-form" action="/api/contact" method="post" data-quote-form data-lead-form data-success-message="Thanks. Bugman Plus received your request and will follow up soon.">
    <input type="hidden" name="formType" value="quote">
    <input type="hidden" name="context" value="${escapeHtml(context)}">
    <label class="form-hp">Website<input name="website" type="text" autocomplete="off" tabindex="-1"></label>
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
  </form>
</div>
`;

const homePage = () => {
  const faqs = [
    {
      q: "What areas does Bugman Plus serve?",
      a: `Bugman Plus is based in Oshawa and serves ${serviceAreaSummary}.`,
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
    title: "Bugman Plus | Premium Pest Control in Durham Region & GTA",
    description:
      `Bugman Plus provides pest control in ${serviceAreaSummary} for bed bugs, rodents, wasps, ants, cockroaches, spiders, flies, pantry pests, and seasonal insects.`,
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
          <div><strong>${services.length}</strong><span>Pest services</span></div>
          <div><strong>${locations.length}</strong><span>Service areas</span></div>
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

      <section class="section market-section">
        <div class="section-heading split reveal">
          <div>
            <p class="section-kicker">Common Pest Problems</p>
            <h2>Prepared for the pest issues people notice at home or work.</h2>
            <p>From bed bugs and rodents to wasps, ants, cockroaches, flies, and seasonal insects, Bugman Plus organizes service around clear inspection, treatment, and prevention.</p>
          </div>
          <a class="text-link" href="/services/">See all services</a>
        </div>
        ${pestConcernOverview()}
      </section>

      <section class="section services-section">
        <div class="section-heading split reveal">
          <div>
            <p class="section-kicker">Services</p>
            <h2>Twenty focused pest control services for Ontario homes and businesses.</h2>
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
          <h2>Pest control coverage across Durham Region and the GTA.</h2>
          <p>Find focused pages for ${serviceAreaSummary}.</p>
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
    title: "Pest Control Services | Bugman Plus Durham Region & GTA",
    description:
      `Explore 20 Bugman Plus pest control services for bed bugs, mice, rats, cockroaches, ants, wasps, spiders, fleas, mosquitoes, flies, pantry pests, and seasonal insects across ${serviceAreaSummary}.`,
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
          <h1>Precision pest control for Ontario homes and businesses.</h1>
          <p>Choose the service that matches what you are seeing, then send the pest, property type, and location details for a focused quote.</p>
        </div>
      </section>
      <section class="section market-section">
        <div class="section-heading reveal">
          <p class="section-kicker">Service Guide</p>
          <h2>Find the right starting point for your pest issue.</h2>
          <p>Use these common pest groups to match the issue you are seeing with the right Bugman Plus service.</p>
        </div>
        ${pestConcernOverview()}
      </section>
      <section class="section services-section">
        ${serviceCards()}
      </section>
      <section class="section pest-directory-section">
        <div class="section-heading reveal">
          <p class="section-kicker">Pests Treated</p>
          <h2>A complete pest directory for common Ontario pest issues.</h2>
          <p>If you do not see the exact pest you are dealing with, Bugman Plus can help identify the activity and recommend the next step.</p>
        </div>
        ${pestDirectory()}
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
    title: `${service.title} | Bugman Plus Durham Region & GTA Pest Control`,
    description: `${service.intro} Available in ${serviceAreaSummary}.`,
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
          <h1>${service.title} in Durham Region & the GTA</h1>
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
          ${coveredPests(service)}
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
    title: `Pest Control in ${location.name}, ${location.region} | ${locationMarketLabel(location)}`,
    description: `Bugman Plus provides pest control in ${location.name}, ${location.region} for bed bugs, mice, rats, cockroaches, ants, wasps, spiders, flies, pantry pests, and seasonal insects.`,
    path: `/locations/${location.slug}/`,
    active: "areas",
    schema: [
      localBusinessSchema(),
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Locations", path: "/locations/" },
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
                    <div class="service-card-meta"><span>${service.label}</span><span>${service.season}</span></div>
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

const locationsPage = () =>
  shell({
    title: "Pest Control Service Areas | Bugman Plus Durham Region & GTA",
    description:
      `Find Bugman Plus pest control service area pages for ${serviceAreaSummary}.`,
    path: "/locations/",
    active: "areas",
    schema: [
      localBusinessSchema(),
      breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Locations", path: "/locations/" }]),
    ],
    children: `
      <section class="subhero subhero-compact locations-hero">
        <img src="${assets.hero}" alt="Bugman Plus pest control service area background" width="1800" height="1315">
        <div class="subhero-content reveal">
          <p class="eyebrow">Service Areas</p>
          <h1>Pest control across Durham Region and the GTA.</h1>
          <p>Bugman Plus is based in Oshawa and supports nearby Durham communities, Toronto, and key GTA areas with practical pest control for homes and businesses.</p>
        </div>
      </section>
      <section class="section location-section locations-overview">
        <div class="section-heading reveal">
          <p class="section-kicker">Areas We Serve</p>
          <h2>Start with the area closest to your property.</h2>
          <p>Not sure which area to choose? Call Bugman Plus and share the address or nearest intersection.</p>
        </div>
        ${serviceAreaPanel()}
      </section>
      <section class="section services-section">
        <div class="section-heading split reveal">
          <div>
            <p class="section-kicker">Services</p>
            <h2>Browse the pest control catalog by problem type.</h2>
          </div>
          <a class="text-link" href="/services/">View all services</a>
        </div>
        ${serviceCards(services.slice(0, 6))}
      </section>
    `,
  });

const locationServicePage = (location, service) =>
  shell({
    title: `${service.title} in ${location.name}, ${location.region} | ${locationMarketLabel(location)}`,
    description: locationServiceDescription(location, service),
    path: `/locations/${location.slug}/${service.slug}/`,
    active: "areas",
    image: service.image,
    schema: [
      localBusinessSchema(),
      serviceSchema(service, location),
      faqSchema(service.faq),
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Locations", path: "/locations/" },
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
          ${coveredPests(service)}
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
    title: "Contact Bugman Plus | Durham Region & GTA Pest Control",
    description:
      `Contact Bugman Plus for pest control in ${serviceAreaSummary}. Call 905-924-2847.`,
    path: "/contact/",
    active: "contact",
    bodyClass: "has-form-call-card",
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
          <p>Based in Oshawa, Ontario. Serving Durham Region and GTA service areas with focused residential and commercial pest control.</p>
        </div>
        ${quoteForm("Contact page request")}
      </section>
    `,
  });

const quotePage = () =>
  shell({
    title: "Get a Pest Control Quote | Bugman Plus",
    description:
      `Request a Bugman Plus pest control quote for ${serviceAreaSummary}.`,
    path: "/quote/",
    active: "quote",
    bodyClass: "has-form-call-card",
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
generatedPaths.push("/locations/");

rmSync(outputRoot, { recursive: true, force: true });
mkdirSync(outputRoot, { recursive: true });
cpSync(join(root, "assets"), join(outputRoot, "assets"), { recursive: true });

write("index.html", homePage());
write("about/index.html", aboutPage());
write("services/index.html", servicesPage());
write("locations/index.html", locationsPage());
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

console.log(`Generated ${generatedPaths.length} pages in public/.`);
