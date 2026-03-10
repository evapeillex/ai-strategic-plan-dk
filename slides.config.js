// Slide indices for anchor bubbles 1, 2, 3, 4, 5 (0-based: bubble 1→slide 2, bubble 2→slide 6, bubble 3→slide 10, bubble 4→slide 11, bubble 5→concern slide)
const ANCHOR_SLIDES = [1, 5, 9, 10, 14];

const SLIDES = [
  {
    subheadline: "AI Strategic Plan",
    title: "Market Perspectives",
    content: "Danish market - Gerard & Eva",
    animation: "fade",
  },
  {
    title: "What are the top 3 things that will change for Framna as a business in the next 2-3 years?",
    titleHighlight: { text: "top 3 things", color: "#1BC866" },
    ideas: [
      "AI Will Create B2B Micro-Wins at Scale",
      "Shift Toward Niche, Complex Products",
      "Commercial Models and Client Relationships Will Change",
    ],
    animation: "slide-left",
  },
  {
    title: "AI Will Create B2B Micro-Wins at Scale",
    columns: [
      {
        title: "What will change",
        content:
          "AI adoption will primarily happen through small, targeted improvements inside large organizations, rather than big disruptive consumer products.\n\nFor companies with massive scale, even small efficiency gains create large business impact.",
      },
      {
        title: "What this means for Framna",
        items: [
          "More B2B-focused digital products",
          "AI integrated into existing workflows and enterprise tools",
          "Projects focused on optimization rather than full product reinvention",
        ],
      },
      {
        title: "What is driving this",
        items: [
          "Large companies have huge operational complexity",
          "AI tools enable incremental improvements across many processes",
          "Even 1–2% productivity gains scale massively in enterprise environments",
        ],
      },
    ],
    animation: "slide-left",
  },
  {
    title: "Shift Toward Niche, Complex Products",
    columns: [
      {
        title: "What will change",
        content:
          "Framna will increasingly focus on complex, specialized products where deep expertise matters, rather than more generic app development.\n\nComplex digital ecosystems will become more valuable than simple apps.",
        example: {
          title: "Example contrast:",
          items: [
            "Avida → complex financial systems and integrations",
            "Huligennem → simpler consumer experience",
          ],
        },
      },
      {
        title: "What this means for Framna",
        items: [
          "More work on domain-heavy products",
          "Greater emphasis on systems thinking and integrations",
          "Teams will need deeper industry and product expertise",
        ],
      },
      {
        title: "What is driving this",
        items: [
          "Simple apps are becoming easier and cheaper to build",
          "Complex enterprise products remain hard to replicate",
          "Clients need partners capable of solving high-complexity product challenges",
        ],
      },
    ],
    animation: "slide-left",
  },
  {
    title: "Commercial Models and Client Relationships Will Change",
    columns: [
      {
        title: "What will change",
        content:
          "Framna's commercial agreements and client relationships will evolve, affecting how projects are sold and delivered.\n\nFramna will also need to prove its value more consistently, instead of relying on reputation.",
        example: {
          title: "Key shifts:",
          items: [
            "Pricing models will change",
            "Projects will be planned and executed differently",
            "Long-term partnerships may become less frequent",
          ],
        },
      },
      {
        title: "What this means for Framna",
        items: [
          "More performance-based or outcome-driven contracts",
          "Shorter engagements and more competitive pitches",
          "Stronger need to demonstrate measurable impact",
        ],
      },
      {
        title: "What is driving this",
        items: [
          "Increased competition in digital product development",
          "Clients demanding clear ROI and faster results",
          "AI and new tools lowering barriers for competitors",
        ],
      },
    ],
    animation: "slide-left",
  },
  {
    title: "What do you think will change most in our ways of working in the future, including teams, how crafts (competence areas) work together, etc.?",
    titleHighlight: { text: "ways of working", color: "#1BC866" },
    ideas: [
      "Smaller, autonomous product teams",
      "Startup-like development with continuous experimentation",
      "New team profiles with broader, product-oriented skills",
    ],
    animation: "slide-left",
  },
  {
    title: "Smaller, More Autonomous Teams",
    columns: [
      {
        title: "What will change",
        content:
          "Teams will likely become smaller and more autonomous, with fewer people covering broader responsibilities. Instead of large multi-layered project teams, we will see lean product squads focused on solving specific problems.",
        example: {
          title: "These teams will be expected to:",
          items: [
            "move faster",
            "make decisions independently",
            "iterate continuously with clients",
          ],
        },
      },
      {
        title: "Why this will happen",
        content: "Several forces are pushing in this direction:",
        items: [
          "AI tools increase individual productivity, meaning fewer people are needed to deliver the same output.",
          "Clients increasingly expect faster delivery and quicker iteration cycles.",
          "Smaller teams reduce coordination overhead and improve speed.",
        ],
      },
      {
        title: "What it means for crafts",
        content:
          "Crafts will still exist, but people will likely operate more as cross-functional contributors inside small teams rather than within large craft clusters on projects.",
        example: {
          title: "Example team structure:",
          items: [
            "Product Lead",
            "Designer",
            "2–3 Engineers",
            "Data/AI specialist (when needed)",
          ],
        },
      },
    ],
    animation: "slide-left",
  },
  {
    title: "Less Waterfall, More Startup-Like Product Development",
    columns: [
      {
        title: "What will change",
        content:
          "Projects will move away from traditional phased delivery models (strategy → design → build) toward continuous product development, similar to how startups operate.\n\nThe workflow will look more like: hypothesis → prototype → test → iterate → scale",
        example: {
          title: "Instead of delivering large planned projects, teams will focus on:",
          items: [
            "rapid experimentation",
            "incremental releases",
            "continuous learning from users",
          ],
        },
      },
      {
        title: "Why this will happen",
        items: [
          "AI and modern tooling enable faster experimentation",
          "Clients want to reduce risk before investing heavily",
          "Digital products increasingly evolve continuously rather than being \"delivered\"",
        ],
      },
      {
        title: "What it means for collaboration between crafts",
        content:
          "Crafts will need to work more simultaneously instead of sequentially.\n\nInstead of: strategy → design → engineering\nIt becomes: product, design, and engineering working together from day one\n\nThis creates tighter collaboration and faster feedback loops.",
      },
    ],
    animation: "slide-left",
  },
  {
    title: "Team Profiles and Hiring Will Change",
    columns: [
      {
        title: "What will change",
        content:
          "The type of people hired and the skills needed inside teams will evolve.\n\nTeams will likely prioritize hybrid profiles and product thinkers, rather than purely specialized roles.\n\nExamples: engineers with strong product intuition, designers who understand business and technology, product managers comfortable with AI and data",
        example: {
          title: "Future team members will need to:",
          items: [
            "understand multiple disciplines",
            "work comfortably in ambiguity",
            "contribute to product thinking, not just execution",
          ],
        },
      },
      {
        title: "Why this will happen",
        content: "Three main drivers:",
        items: [
          "Smaller teams require broader skill sets",
          "AI will automate parts of traditional roles",
          "Clients expect partners who think about outcomes, not just deliverables",
        ],
      },
      {
        title: "Implication for Framna",
        example: {
          title: "Hiring will likely prioritize people who:",
          items: [
            "are T-shaped (deep expertise + broad understanding)",
            "thrive in fast-moving product environments",
            "can collaborate across crafts.",
          ],
        },
      },
    ],
    animation: "slide-left",
  },
  {
    title: "What do you think will be our most important competitive parameters in the years to come - that partners will choose Framna over others?",
    titleHighlight: { text: "competitive parameters", color: "#1BC866" },
    ideas: [
      "Intuition, Taste, and Craft",
      "App business could support the AI business",
      "AI thrives on solid foundations: Design Systems and Scalable Codebases",
    ],
    animation: "slide-left",
  },
  {
    title: "2-3 example of impressive work",
    theme: "light",
    animation: "fade",
  },
  {
    title: "",
    theme: "light",
    media: {
      video: "https://youtube.com/shorts/BzReomuDIQw?feature=share",
      image: "assets/screenshot.png",
    },
    animation: "fade",
  },
  {
    title: "HorseAlytics",
    theme: "light",
    media: {
      embedUrl: "https://customer-ldidz2g91gd7rdrl.cloudflarestream.com/4bf697c10fb090731769c1301f72978b/iframe?poster=https%3A%2F%2Fcustomer-ldidz2g91gd7rdrl.cloudflarestream.com%2F4bf697c10fb090731769c1301f72978b%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600&title=HorseAlytics",
    },
    animation: "fade",
  },
  {
    title: "",
    theme: "light",
    images: ["assets/horse-phones.png", "assets/horse-profile.png"],
    animation: "fade",
  },
  {
    title: "What gives you the most concern that you think we should tackle as Framna when it comes to AI? (Think about our sphere of influence).",
    titleHighlight: { text: "concern", color: "#1BC866" },
    ideas: [
      "We don't have the expertise and technical knowledge.",
      "We are not as \"cool\" anymore.",
      "How to upskill our whole workforce without slowing down the ones driving innovation.",
    ],
    animation: "slide-left",
  },
  {
    title: "Thank you",
    animation: "scale",
  },
];
