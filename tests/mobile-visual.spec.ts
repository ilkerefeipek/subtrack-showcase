import { test, expect } from '@playwright/test';

const SECTIONS = [
  { id: 'hero', name: 'hero' },
  { id: 'problem', name: 'problem' },
  { id: 'floating', name: 'floating' },
  { id: 'solution', name: 'solution' },
  { id: 'money', name: 'money' },
  { id: 'coming-soon', name: 'coming-soon' },
  { id: 'footer', name: 'footer' },
];

test.describe('SubTrack mobile visual', () => {
  test('all sections render without console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    await page.goto('/?nosmooth');
    await page.waitForTimeout(3500); // wait for loader exit

    for (const section of SECTIONS) {
      await page.evaluate((id) => {
        const el = document.getElementById(id);
        if (!el) throw new Error(`section #${id} not found`);
        window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().top, behavior: 'instant' });
      }, section.id);
      await page.waitForTimeout(1500);
      await page.screenshot({
        path: `tests/screenshots/${section.name}.png`,
        fullPage: false,
      });
    }

    expect(errors, errors.join('\n')).toEqual([]);
  });

  test('email form shows toast on empty submit', async ({ page }) => {
    await page.goto('/?nosmooth');
    await page.waitForTimeout(3500);
    await page.evaluate(() => {
      const el = document.getElementById('coming-soon');
      el?.scrollIntoView({ behavior: 'instant', block: 'center' });
    });
    await page.waitForTimeout(800);
    await page.getByRole('button', { name: /bildir/i }).click();
    await expect(page.getByText(/önce bir e-posta/i)).toBeVisible({ timeout: 2000 });
  });

  test('calculator shows correct counts (46 tickets, 62 coffees)', async ({ page }) => {
    await page.goto('/?nosmooth');
    await page.waitForTimeout(3500);
    // Scroll to calculator subscene (inside #money, second half)
    await page.evaluate(() => {
      const money = document.getElementById('money');
      if (!money) return;
      const calcStart = money.getBoundingClientRect().top + window.scrollY + window.innerHeight;
      window.scrollTo({ top: calcStart, behavior: 'instant' });
    });
    await page.waitForTimeout(2500); // wait for stage progression + count-up

    const headline = page.getByText(/bu para neye yeter/i);
    await expect(headline).toBeVisible({ timeout: 4000 });

    // After CountUp settles, the rendered digits should include "46" and "62".
    await page.waitForFunction(
      () => {
        const text = document.querySelector('#money')?.textContent ?? '';
        return text.includes('× 46') && text.includes('× 62');
      },
      { timeout: 5000 },
    );
  });
});
