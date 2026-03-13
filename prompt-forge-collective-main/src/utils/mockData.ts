export interface User {
  _id: string;
  username: string;
  email: string;
  avatar: string;
  bio: string;
  createdAt: string;
}

export interface Version {
  promptText: string;
  outputImage: string;
  createdAt: string;
}

export interface Prompt {
  _id: string;
  title: string;
  category: 'Vibe Coding' | 'Image Gen' | 'UI Design' | 'Writing' | 'Terminal' | 'Data';
  versions: Version[];
  currentVersion: number;
  tags: string[];
  author: User;
  forkedFrom: string | null;
  forks: string[];
  upvotes: string[];
  comments: Comment[];
  createdAt: string;
}

export interface Comment {
  _id: string;
  body: string;
  author: User;
  prompt: string;
  createdAt: string;
}

export const users: User[] = [
  {
    _id: 'u1',
    username: 'alice',
    email: 'alice@example.com',
    avatar: '',
    bio: 'Prompt engineer & creative coder. Building the future one prompt at a time.',
    createdAt: '2024-08-15T10:00:00Z',
  },
  {
    _id: 'u2',
    username: 'bob',
    email: 'bob@example.com',
    avatar: '',
    bio: 'Full-stack dev who loves AI-assisted workflows.',
    createdAt: '2024-09-01T14:30:00Z',
  },
  {
    _id: 'u3',
    username: 'carol',
    email: 'carol@example.com',
    avatar: '',
    bio: 'Designer turned prompt whisperer. Making AI art daily.',
    createdAt: '2024-09-20T09:15:00Z',
  },
];

export const prompts: Prompt[] = [
  {
    _id: 'p1',
    title: 'Cyberpunk City Generator',
    category: 'Image Gen',
    versions: [
      { promptText: 'A cyberpunk cityscape at night, neon lights reflecting on wet streets, flying cars in the distance, ultra detailed, 8k', outputImage: '', createdAt: '2024-10-01T12:00:00Z' },
      { promptText: 'A sprawling cyberpunk metropolis at night, neon holographic signs in Japanese and English, rain-slicked streets reflecting pink and blue neon, flying vehicles with light trails, towering megastructures, ultra detailed cinematic shot, 8k, volumetric fog', outputImage: '', createdAt: '2024-10-05T14:00:00Z' },
      { promptText: 'Hyper-detailed cyberpunk city, bird\'s eye view, massive holographic advertisements, rain, neon-lit alleyways below, flying cars leaving light trails, inspired by Blade Runner 2049, volumetric lighting, octane render, 8k resolution', outputImage: '', createdAt: '2024-10-10T09:00:00Z' },
    ],
    currentVersion: 2,
    tags: ['cyberpunk', 'cityscape', 'neon', '8k'],
    author: users[0],
    forkedFrom: null,
    forks: ['p4'],
    upvotes: ['u1', 'u2', 'u3'],
    comments: [],
    createdAt: '2024-10-01T12:00:00Z',
  },
  {
    _id: 'p2',
    title: 'React Dashboard Scaffold',
    category: 'Vibe Coding',
    versions: [
      { promptText: 'Build a modern React dashboard with sidebar navigation, dark theme, charts using recharts, and a responsive grid layout. Use TypeScript and Tailwind CSS.', outputImage: '', createdAt: '2024-10-02T08:00:00Z' },
      { promptText: 'Create a production-ready React dashboard application with:\n- Collapsible sidebar with icon navigation\n- Dark theme with customizable accent colors\n- Dashboard grid with KPI cards, line charts, bar charts using Recharts\n- Data table with sorting, filtering, pagination\n- Responsive layout with mobile hamburger menu\n- TypeScript, Tailwind CSS, shadcn/ui components', outputImage: '', createdAt: '2024-10-08T11:00:00Z' },
    ],
    currentVersion: 1,
    tags: ['react', 'dashboard', 'typescript', 'tailwind'],
    author: users[1],
    forkedFrom: null,
    forks: ['p5'],
    upvotes: ['u1', 'u2'],
    comments: [],
    createdAt: '2024-10-02T08:00:00Z',
  },
  {
    _id: 'p3',
    title: 'Poetic Haiku Writer',
    category: 'Writing',
    versions: [
      { promptText: 'Write a haiku about the changing seasons, focusing on the transition from autumn to winter.', outputImage: '', createdAt: '2024-10-03T16:00:00Z' },
      { promptText: 'You are a master haiku poet in the tradition of Matsuo Bashō. Write a series of 5 haikus that capture the bittersweet transition from autumn to winter. Each haiku should use concrete sensory imagery — sounds, textures, colors. Avoid clichés. Let the final haiku carry a note of quiet acceptance.', outputImage: '', createdAt: '2024-10-07T10:00:00Z' },
    ],
    currentVersion: 1,
    tags: ['haiku', 'poetry', 'creative-writing'],
    author: users[2],
    forkedFrom: null,
    forks: [],
    upvotes: ['u2', 'u3'],
    comments: [],
    createdAt: '2024-10-03T16:00:00Z',
  },
  {
    _id: 'p4',
    title: 'Solarpunk City Remix',
    category: 'Image Gen',
    versions: [
      { promptText: 'A solarpunk city with lush vertical gardens, solar panels integrated into architecture, clean rivers running through the streets, warm golden hour lighting, birds flying overhead, utopian atmosphere, ultra detailed, 8k', outputImage: '', createdAt: '2024-10-12T15:00:00Z' },
    ],
    currentVersion: 0,
    tags: ['solarpunk', 'utopia', 'green-city'],
    author: users[1],
    forkedFrom: 'p1',
    forks: [],
    upvotes: ['u1'],
    comments: [],
    createdAt: '2024-10-12T15:00:00Z',
  },
  {
    _id: 'p5',
    title: 'SaaS Landing Page Builder',
    category: 'Vibe Coding',
    versions: [
      { promptText: 'Build a SaaS landing page with hero section, feature grid, pricing table with toggle, testimonials carousel, and CTA. Use React, Tailwind, and framer-motion animations.', outputImage: '', createdAt: '2024-10-14T13:00:00Z' },
      { promptText: 'Create a conversion-optimized SaaS landing page:\n- Hero: Bold headline, subtext, CTA button with glow effect, floating mockup\n- Social proof bar: logo strip of companies\n- Features: 3-column grid with icons, hover animations\n- Pricing: Monthly/Annual toggle, 3 tiers, highlighted popular plan\n- Testimonials: Carousel with avatars, quotes, ratings\n- FAQ: Accordion section\n- Footer CTA: Final conversion section\nStack: React, Tailwind CSS, Framer Motion, shadcn/ui', outputImage: '', createdAt: '2024-10-18T09:00:00Z' },
    ],
    currentVersion: 1,
    tags: ['saas', 'landing-page', 'conversion'],
    author: users[2],
    forkedFrom: 'p2',
    forks: [],
    upvotes: ['u1', 'u2', 'u3'],
    comments: [],
    createdAt: '2024-10-14T13:00:00Z',
  },
  {
    _id: 'p6',
    title: 'Git Workflow Automator',
    category: 'Terminal',
    versions: [
      { promptText: 'Write a bash script that automates the git workflow: create feature branch from main, make commits with conventional commit messages, push, and create a PR description.', outputImage: '', createdAt: '2024-10-15T11:00:00Z' },
      { promptText: 'Create a comprehensive bash script for automated git workflows:\n1. Interactive branch creation (feature/fix/chore) from updated main\n2. Conventional commit message generator with scope and description prompts\n3. Auto-push with upstream tracking\n4. PR description generator that summarizes commits since branch point\n5. Branch cleanup after merge\n6. Conflict detection and stash management\nInclude error handling, colored output, and --help flag.', outputImage: '', createdAt: '2024-10-20T14:00:00Z' },
    ],
    currentVersion: 1,
    tags: ['git', 'bash', 'automation', 'devtools'],
    author: users[0],
    forkedFrom: null,
    forks: [],
    upvotes: ['u2'],
    comments: [],
    createdAt: '2024-10-15T11:00:00Z',
  },
  {
    _id: 'p7',
    title: 'Glassmorphism UI Kit',
    category: 'UI Design',
    versions: [
      { promptText: 'Design a glassmorphism UI kit with cards, buttons, inputs, and modals. Use frosted glass effects with blur, transparency, and subtle borders. Dark background with colorful gradients behind the glass elements.', outputImage: '', createdAt: '2024-10-16T10:00:00Z' },
    ],
    currentVersion: 0,
    tags: ['glassmorphism', 'ui-kit', 'design-system'],
    author: users[2],
    forkedFrom: null,
    forks: ['p9'],
    upvotes: ['u1', 'u3'],
    comments: [],
    createdAt: '2024-10-16T10:00:00Z',
  },
  {
    _id: 'p8',
    title: 'CSV Data Analyzer',
    category: 'Data',
    versions: [
      { promptText: 'Analyze this CSV dataset. Provide summary statistics, identify outliers, find correlations between columns, and generate visualization recommendations. Output as a structured report with markdown tables.', outputImage: '', createdAt: '2024-10-17T08:00:00Z' },
      { promptText: 'You are a senior data analyst. Given a CSV dataset:\n1. Data Quality Report: missing values, duplicates, data types, anomalies\n2. Descriptive Statistics: mean, median, mode, std dev, quartiles per numeric column\n3. Correlation Matrix: identify strong correlations (>0.7 or <-0.7)\n4. Outlier Detection: using IQR method, flag outlier rows\n5. Distribution Analysis: skewness, kurtosis per column\n6. Visualization Plan: recommend specific chart types for each insight\n7. Key Findings: top 5 actionable insights\nFormat as structured markdown with tables and code blocks.', outputImage: '', createdAt: '2024-10-22T12:00:00Z' },
    ],
    currentVersion: 1,
    tags: ['data-analysis', 'csv', 'statistics'],
    author: users[1],
    forkedFrom: null,
    forks: [],
    upvotes: ['u1', 'u2', 'u3'],
    comments: [],
    createdAt: '2024-10-17T08:00:00Z',
  },
  {
    _id: 'p9',
    title: 'Neobrutalism UI Remix',
    category: 'UI Design',
    versions: [
      { promptText: 'Design a neobrutalism UI kit — thick black borders, bright primary colors, chunky shadows, playful typography. Include cards, buttons, form elements, and navigation. Make it fun and bold.', outputImage: '', createdAt: '2024-10-23T09:00:00Z' },
    ],
    currentVersion: 0,
    tags: ['neobrutalism', 'bold', 'ui-kit'],
    author: users[0],
    forkedFrom: 'p7',
    forks: [],
    upvotes: ['u2', 'u3'],
    comments: [],
    createdAt: '2024-10-23T09:00:00Z',
  },
  {
    _id: 'p10',
    title: 'API Error Handler Template',
    category: 'Vibe Coding',
    versions: [
      { promptText: 'Create a robust error handling middleware for Express.js APIs with custom error classes, proper HTTP status codes, logging, and user-friendly error responses in development vs production modes.', outputImage: '', createdAt: '2024-10-24T16:00:00Z' },
    ],
    currentVersion: 0,
    tags: ['express', 'error-handling', 'api', 'middleware'],
    author: users[0],
    forkedFrom: null,
    forks: [],
    upvotes: ['u1'],
    comments: [],
    createdAt: '2024-10-24T16:00:00Z',
  },
];

// Add comments
prompts[0].comments = [
  { _id: 'c1', body: 'The v3 with Blade Runner inspiration is incredible! The volumetric fog really sells it.', author: users[1], prompt: 'p1', createdAt: '2024-10-11T08:00:00Z' },
  { _id: 'c2', body: 'Try adding "cinematic color grading" — it pushes the mood even further.', author: users[2], prompt: 'p1', createdAt: '2024-10-11T12:00:00Z' },
];
prompts[1].comments = [
  { _id: 'c3', body: 'This saved me hours of scaffolding. The data table with pagination is chef\'s kiss.', author: users[0], prompt: 'p2', createdAt: '2024-10-09T15:00:00Z' },
];
prompts[2].comments = [
  { _id: 'c4', body: 'The Bashō-inspired version produces genuinely moving poetry. Bookmarked.', author: users[0], prompt: 'p3', createdAt: '2024-10-08T11:00:00Z' },
  { _id: 'c5', body: 'Would love to see a version for tanka (5-7-5-7-7) form too!', author: users[1], prompt: 'p3', createdAt: '2024-10-08T14:00:00Z' },
];
prompts[4].comments = [
  { _id: 'c6', body: 'The pricing toggle animation is so smooth. Great fork!', author: users[1], prompt: 'p5', createdAt: '2024-10-19T10:00:00Z' },
];
prompts[7].comments = [
  { _id: 'c7', body: 'Used this on a 50k row dataset — the outlier detection was spot on.', author: users[2], prompt: 'p8', createdAt: '2024-10-23T08:00:00Z' },
];

export const categories = ['All', 'Vibe Coding', 'Image Gen', 'UI Design', 'Writing', 'Terminal', 'Data'] as const;

export function getInitials(username: string): string {
  return username.slice(0, 2).toUpperCase();
}

export function timeAgo(dateStr: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  const intervals = [
    { label: 'y', seconds: 31536000 },
    { label: 'mo', seconds: 2592000 },
    { label: 'd', seconds: 86400 },
    { label: 'h', seconds: 3600 },
    { label: 'm', seconds: 60 },
  ];
  for (const i of intervals) {
    const count = Math.floor(seconds / i.seconds);
    if (count >= 1) return `${count}${i.label} ago`;
  }
  return 'just now';
}
