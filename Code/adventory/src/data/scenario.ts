/** Decision Scenario mock data — seeded, deterministic */

export const CHANNELS = ['Meta', 'Google', 'Amazon', 'TikTok'] as const;
export type Channel = typeof CHANNELS[number];

export interface SKU {
  id: string;
  name: string;
  channel: Channel;
  margin: number; // percentage
  stockCover: number; // days
  roas: number;
  spend: number;
  revenue: number;
}

export const SKUS: SKU[] = [
  { id: 'SKU-1001', name: 'Vitamin C Serum 30ml', channel: 'Meta', margin: 68, stockCover: 45, roas: 4.2, spend: 3200, revenue: 13440 },
  { id: 'SKU-1012', name: 'Retinol Night Cream', channel: 'Meta', margin: 72, stockCover: 30, roas: 3.8, spend: 2800, revenue: 10640 },
  { id: 'SKU-1042', name: 'Hyaluronic Moisturiser', channel: 'Meta', margin: 45, stockCover: 5, roas: 1.4, spend: 4100, revenue: 5740 },
  { id: 'SKU-2010', name: 'SPF50 Sunscreen', channel: 'Google', margin: 55, stockCover: 60, roas: 5.1, spend: 1800, revenue: 9180 },
  { id: 'SKU-2044', name: 'Niacinamide Toner', channel: 'Google', margin: 62, stockCover: 22, roas: 3.2, spend: 2100, revenue: 6720 },
  { id: 'SKU-2091', name: 'AHA/BHA Exfoliant', channel: 'Google', margin: 38, stockCover: 3, roas: 1.1, spend: 3400, revenue: 3740 },
  { id: 'SKU-3005', name: 'Cleansing Balm', channel: 'Amazon', margin: 42, stockCover: 35, roas: 3.5, spend: 2500, revenue: 8750 },
  { id: 'SKU-3021', name: 'Eye Cream Peptide', channel: 'Amazon', margin: 70, stockCover: 50, roas: 4.8, spend: 1600, revenue: 7680 },
  { id: 'SKU-3038', name: 'Lip Treatment Oil', channel: 'Amazon', margin: 75, stockCover: 40, roas: 5.5, spend: 900, revenue: 4950 },
  { id: 'SKU-4002', name: 'Glow Mist Spray', channel: 'TikTok', margin: 58, stockCover: 28, roas: 3.9, spend: 3000, revenue: 11700 },
  { id: 'SKU-4015', name: 'Acne Spot Patches', channel: 'TikTok', margin: 80, stockCover: 55, roas: 6.2, spend: 1200, revenue: 7440 },
  { id: 'SKU-4030', name: 'Salicylic Wash', channel: 'TikTok', margin: 35, stockCover: 8, roas: 1.8, spend: 2600, revenue: 4680 },
];

/** 30-day ROAS trend with an anomaly dip at day 18-22 */
export function generateRoasTrend(): { day: number; roas: number }[] {
  const data: { day: number; roas: number }[] = [];
  for (let d = 1; d <= 30; d++) {
    let roas: number;
    if (d <= 17) {
      roas = 3.4 + Math.sin(d * 0.3) * 0.4 + (d * 0.02);
    } else if (d <= 22) {
      // anomaly dip
      const dip = Math.max(0, 1 - Math.abs(d - 20) * 0.3);
      roas = 3.4 - dip * 1.8 + Math.sin(d * 0.3) * 0.2;
    } else {
      // recovery
      roas = 2.8 + (d - 22) * 0.15 + Math.sin(d * 0.3) * 0.3;
    }
    data.push({ day: d, roas: Math.round(roas * 100) / 100 });
  }
  return data;
}

export const ROAS_TREND = generateRoasTrend();

/** Diagnosed root-cause drivers ranked by contribution */
export interface Driver {
  label: string;
  contribution: number; // percentage
  evidence: string;
  type: 'negative' | 'neutral';
}

export const DIAGNOSED_DRIVERS: Driver[] = [
  { label: 'Meta CPM spike (+34%)', contribution: 42, evidence: 'CPM rose from $8.20 to $11.00 on Meta during days 18-22, coinciding with competitor auction surge', type: 'negative' },
  { label: 'SKU-1042 stock depleting', contribution: 28, evidence: 'Hyaluronic Moisturiser dropped to 5 days cover; conversion rate fell 60% as out-of-stock notices appeared', type: 'negative' },
  { label: 'Google broad match decay', contribution: 18, evidence: 'Broad match keywords on Google Shopping saw irrelevant clicks rise 2.3x, diluting ROAS', type: 'negative' },
  { label: 'TikTok creative fatigue', contribution: 12, evidence: 'Top TikTok ad creative hit 3.2 frequency; CTR declined from 2.1% to 0.9%', type: 'negative' },
];

/** Recommended budget reallocations */
export interface Reallocation {
  from: string;
  to: string;
  amount: number;
  confidence: number;
  expectedProfit: number;
  constraints: string[];
}

export const REALLOCATIONS: Reallocation[] = [
  { from: 'Meta / SKU-1042', to: 'Meta / SKU-1001', amount: 2800, confidence: 92, expectedProfit: 4200, constraints: ['Margin > 50%', 'Stock > 30d'] },
  { from: 'Google / SKU-2091', to: 'Google / SKU-2010', amount: 2200, confidence: 88, expectedProfit: 3100, constraints: ['Margin > 50%', 'Stock > 30d'] },
  { from: 'TikTok / SKU-4030', to: 'TikTok / SKU-4015', amount: 1500, confidence: 85, expectedProfit: 2400, constraints: ['Margin > 50%', 'Stock > 30d', 'New creative ready'] },
];

/** Predicted vs actual outcomes for the Learn step */
export const LEARNING_DATA = {
  predicted: [3.2, 3.4, 3.7, 4.0, 4.2, 4.3, 4.4],
  actual: [3.1, 3.3, 3.6, 3.9, 4.1, 4.3, 4.5],
  days: ['D+1', 'D+3', 'D+5', 'D+7', 'D+10', 'D+14', 'D+21'],
  confidenceBefore: 78,
  confidenceAfter: 91,
};

/** Steps for the scenario stepper */
export const SCENARIO_STEPS = ['Detect', 'Diagnose', 'Decide', 'Execute', 'Learn'] as const;
export type ScenarioStep = typeof SCENARIO_STEPS[number];
