"use server"
import { SavePagesForSite }  from "./../database/data";

const puppeteer = require('puppeteer');

export async function getPages(site) {
    let browser;
    try {
        browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--disable-gpu',
                '--no-first-run',
                '--no-zygote',
                '--single-process',
                '--disable-background-networking',
                '--disable-background-timer-throttling',
                '--disable-backgrounding-occluded-windows',
                '--disable-breakpad',
                '--disable-client-side-phishing-detection',
                '--disable-component-update',
                '--disable-default-apps',
                '--disable-domain-reliability',
                '--disable-features=AudioServiceOutOfProcess',
                '--disable-hang-monitor',
                '--disable-ipc-flooding-protection',
                '--disable-notifications',
                '--disable-offer-store-unmasked-wallet-cards',
                '--disable-popup-blocking',
                '--disable-print-preview',
                '--disable-prompt-on-repost',
                '--disable-renderer-backgrounding',
                '--disable-sync',
                '--disable-translate',
                '--metrics-recording-only',
                '--no-pings',
                '--password-store=basic',
                '--use-mock-keychain',
                '--enable-automation',
                '--disable-blink-features=AutomationControlled'
            ]
        });
        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 800 });
        await page.setRequestInterception(true);
        page.on('request', (req) => {
            if (['image', 'stylesheet', 'font', 'media'].includes(req.resourceType())) {
                req.abort();
            } else {
                req.continue();
            }
        });
        await page.goto(site);

        const links = await page.evaluate(() => {
            return [...new Set(Array.from(document.querySelectorAll('a'))
                .map(link => link.href)
                .filter(href => href.startsWith('http')))];
        });

        // console.log('Extracted links:', links); // Debugging statement

        const res = await SavePagesForSite(site, links);
        if (res) {
            return { links };
        } else {
            return false;
        }

    } catch (err) {
        console.error('Error processing website:', err);
        return false;
    } finally {
        if (browser) await browser.close();
    }
}
