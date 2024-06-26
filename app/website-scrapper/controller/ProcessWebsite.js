"use server"
const puppeteer = require('puppeteer');

export async function processWebsite(site) {
    let browser;
    try {
        browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto("https://quadmarrakesh.ma");

        const links = await page.evaluate(() => {
            const uniqueLinks = new Set();
            return Array.from(document.querySelectorAll('a'))
                .map(anchor => ({
                    href: anchor.href,
                    text: anchor.textContent.trim()
                }))
                .filter(link => link.href.startsWith('http'))
                .filter(link => {
                    if (uniqueLinks.has(link.href)) {
                        return false;
                    } else {
                        uniqueLinks.add(link.href);
                        return true;
                    }
                })
                .map(link => ({
                    ...link,
                    broken: !link.href
                }));
        });

        console.log(links);
        // Return links as JSON
        return { links };
    } catch (err) {
        console.error('Error processing website:', err);
        return false;
    } finally {
        if (browser) await browser.close();
    }
}
