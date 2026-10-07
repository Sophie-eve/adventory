/** Mock API handlers — simulate backend calls with realistic latency */

interface DemoFormData {
  firstName: string;
  lastName: string;
  email: string;
  website: string;
  accountType: string;
  spend: string;
  source: string;
}

interface NewsletterData {
  email: string;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function submitDemoForm(data: DemoFormData): Promise<{ success: boolean; message: string }> {
  console.log('[Adventory] Demo form submitted:', data);
  await delay(1200 + Math.random() * 800);
  return { success: true, message: "Thanks! We'll be in touch shortly." };
}

export async function submitNewsletter(data: NewsletterData): Promise<{ success: boolean; message: string }> {
  console.log('[Adventory] Newsletter signup:', data);
  await delay(800 + Math.random() * 600);
  return { success: true, message: 'Subscribed! Check your inbox.' };
}

export async function mockLogin(provider: 'google' | 'apple'): Promise<{ success: boolean }> {
  console.log('[Adventory] Login with:', provider);
  await delay(1000);
  return { success: true };
}

/** Simulates an ad API call for the Decision Scenario execute step */
export async function executeAdApiCall(action: {
  platform: string;
  campaignId: string;
  change: string;
  amount: number;
}): Promise<string[]> {
  const lines: string[] = [];
  const log = (line: string) => lines.push(line);

  log(`> POST /api/v1/${action.platform.toLowerCase()}/campaigns/${action.campaignId}/budget`);
  log(`  Authorization: Bearer ****-****-adventory-token`);
  log(`  Content-Type: application/json`);
  log(`  { "action": "${action.change}", "amount": ${action.amount} }`);
  log('');
  log(`< 200 OK`);
  log(`  { "status": "applied", "effective_at": "${new Date().toISOString()}" }`);
  log('');
  log(`✓ Budget ${action.change} of $${action.amount} applied to ${action.platform} / ${action.campaignId}`);

  return lines;
}
