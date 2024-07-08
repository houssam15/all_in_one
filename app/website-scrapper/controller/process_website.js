"use server"
const puppeteer = require('puppeteer');
const { getPages } = require('./getPages');
const { getImages } = require('./getImages');

export async function processWebsite(site) {
  
    try {

        const pages = await getPages(site)
        // const images = await getImages(site)

        console.log(pages);

    } catch (err) {
        console.error('Error processing website:', err);
        return false;
    }  
}
