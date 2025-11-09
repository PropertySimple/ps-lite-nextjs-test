import { chromium } from '@playwright/test';
import { mkdir } from 'fs/promises';

const baseUrl = 'http://localhost:3000';

async function testApp() {
  await mkdir('screenshots', { recursive: true });
  
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const routes = [
    { name: 'home', path: '/' },
    { name: 'campaigns', path: '/campaigns' },
    { name: 'contacts', path: '/contacts' },
    { name: 'inbox', path: '/inbox' },
    { name: 'listing-manager', path: '/listing-manager' },
    { name: 'campaign-detail', path: '/campaign-detail/1' },
    { name: 'campaign-welcome', path: '/campaign-welcome/1' },
    { name: 'contact-detail', path: '/contact/1' },
    { name: 'ai-automation', path: '/ai-automation' },
  ];
  
  console.log('Testing app routes and taking screenshots...\n');
  
  for (const route of routes) {
    try {
      console.log(`Testing ${route.name} (${route.path})...`);
      const response = await page.goto(`${baseUrl}${route.path}`, { 
        waitUntil: 'networkidle',
        timeout: 10000 
      });
      
      const status = response.status();
      console.log(`  Status: ${status}`);
      
      if (status === 200) {
        await page.screenshot({ 
          path: `screenshots/${route.name}.png`,
          fullPage: true 
        });
        console.log(`  ✓ Screenshot saved to screenshots/${route.name}.png`);
      } else {
        console.log(`  ✗ Failed with status ${status}`);
      }
    } catch (error) {
      console.log(`  ✗ Error: ${error.message}`);
    }
    console.log('');
  }
  
  await browser.close();
  console.log('\nDone! Check the screenshots/ directory for results.');
}

testApp().catch(console.error);
