"use server"
import { SaveRessourcesForSite, getAllPagesFromSite } from "../database/data";
const puppeteer = require('puppeteer');

export async function getRessources(site) {
    const pages = await getAllPagesFromSite(site);

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
        let allScripts = [];
        for (const pageUrl of pages) {
            await page.goto(pageUrl);

            const resources = await page.evaluate(() => {
                const scriptElements = Array.from(document.querySelectorAll('script'));
                const linkElements = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
                
                const scripts = scriptElements.map(script => script.src).filter(src => src && src.includes('.js'));
                const stylesheets = linkElements.map(link => link.href).filter(href => href && href.includes('.css'));
                
                return [...scripts, ...stylesheets];
            });
            console.log(resources);

            allScripts = [...allScripts, ...resources];
        }

        // Remove duplicate scripts based on src
        allScripts = [...new Set(allScripts)];

        // Return scripts as JSON
        const res = await SaveRessourcesForSite(site, allScripts);
        if (res) {
            return { allScripts };
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
