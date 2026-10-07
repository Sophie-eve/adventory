/**
 * brand.ts — Single source of truth for brand name, tagline, and navigation data.
 */

export const BRAND = {
  name: 'Adventory AI',
  tagline: 'Stop reading dashboards. Start making profitable decisions.',
  lede: 'Unified cross-platform intelligence meets autonomous, closed-loop decisioning — so every ad dollar drives margin, not vanity.',
  version: 'v1.0',
  email: 'hello@adventory.ai',
  url: 'https://adventory.ai',
} as const;


export interface NavItem {
  title: string;
  description: string;
  href: string;
  icon: string;
}

export interface NavColumn {
  heading: string;
  items: NavItem[];
}

export interface MegaMenuData {
  label: string;
  columns: NavColumn[];
}

export const MEGA_MENUS: MegaMenuData[] = [
  {
    label: 'Product',
    columns: [
      {
        heading: 'Platform',
        items: [
          { title: 'Overview', description: 'The full decision engine at a glance', href: '/product/overview', icon: 'LayoutDashboard' },
          { title: 'Unified Data Layer', description: 'Reconcile spend, sales, inventory and margin into one schema', href: '/product/data-layer', icon: 'Database' },
          { title: 'Diagnosis Engine', description: 'Detect anomalies, isolate root causes', href: '/product/diagnosis', icon: 'Search' },
          { title: 'Decision Engine', description: 'Prioritized, margin- and inventory-aware budget moves', href: '/product/decision', icon: 'Brain' },
          { title: 'Execution & Learning', description: 'Push approved changes via ad APIs, learn from outcomes', href: '/product/execution', icon: 'Zap' },
          { title: 'Integrations', description: 'Meta, Google, Amazon, TikTok, programmatic, GA4, ERP', href: '/product/integrations', icon: 'Plug' },
        ],
      },
      {
        heading: 'Value',
        items: [
          { title: 'Know why performance moved', description: 'Replace manual cross-channel correlation', href: '/value/why-performance-moved', icon: 'TrendingUp' },
          { title: "Stop promoting what you can't ship", description: 'Steer spend away from low-stock, low-margin SKUs', href: '/value/stop-promoting-oos', icon: 'PackageX' },
          { title: 'Grow profitably on autopilot', description: 'Closed-loop decisions that improve with every outcome', href: '/value/grow-profitably', icon: 'Rocket' },
        ],
      },
    ],
  },
  {
    label: 'Solutions',
    columns: [
      {
        heading: 'By role',
        items: [
          { title: 'Marketing', description: 'Know which campaign to change and why', href: '/solutions/marketing', icon: 'Megaphone' },
          { title: 'Finance', description: 'Tie every ad dollar to margin and profit', href: '/solutions/finance', icon: 'DollarSign' },
          { title: 'Operations', description: 'Keep ad spend in sync with inventory', href: '/solutions/operations', icon: 'Settings' },
        ],
      },
      {
        heading: 'By type',
        items: [
          { title: 'Scaling D2C brand', description: 'Predictable profitable growth from day one', href: '/solutions/scaling-d2c', icon: 'Flame' },
          { title: 'Multichannel seller', description: 'Unify every platform into one decision layer', href: '/solutions/multichannel', icon: 'Globe' },
          { title: 'Multi-brand portfolio', description: 'Portfolio-wide intelligence and cross-brand learnings', href: '/solutions/portfolio', icon: 'Layers' },
          { title: 'Agency', description: 'Manage client budgets with autonomous precision', href: '/solutions/agency', icon: 'Building2' },
        ],
      },
    ],
  },
  {
    label: 'Customers',
    columns: [
      {
        heading: '',
        items: [
          { title: 'Customer Stories', description: 'Deep dives into how brands transformed their ad ops', href: '/customers/stories', icon: 'BookOpen' },
          { title: 'Reviews & Testimonials', description: 'What our customers say about the engine', href: '/customers/reviews', icon: 'MessageSquare' },
        ],
      },
    ],
  },
];

export const FOOTER_LINKS = {
  product: [
    { label: 'Overview', href: '/product/overview' },
    { label: 'Data Layer', href: '/product/data-layer' },
    { label: 'Diagnosis', href: '/product/diagnosis' },
    { label: 'Decision Engine', href: '/product/decision' },
    { label: 'Execution', href: '/product/execution' },
    { label: 'Integrations', href: '/product/integrations' },
  ],
  solutions: [
    { label: 'Marketing', href: '/solutions/marketing' },
    { label: 'Finance', href: '/solutions/finance' },
    { label: 'Operations', href: '/solutions/operations' },
    { label: 'Scaling D2C', href: '/solutions/scaling-d2c' },
    { label: 'Agency', href: '/solutions/agency' },
  ],
  company: [
    { label: 'Customer Stories', href: '/customers/stories' },
    { label: 'Reviews', href: '/customers/reviews' },
    { label: 'FAQ', href: '/faq' },
  ],
} as const;

export function getAllSearchableItems() {
  const items: { title: string; description: string; href: string; category: string }[] = [
    { title: 'Home', description: 'Back to the homepage', href: '/', category: 'Pages' },
    { title: 'FAQ', description: 'Frequently asked questions', href: '/faq', category: 'Pages' },
  ];
  MEGA_MENUS.forEach((menu) => {
    menu.columns.forEach((col) => {
      col.items.forEach((item) => {
        items.push({ title: item.title, description: item.description, href: item.href, category: menu.label });
      });
    });
  });
  return items;
}
