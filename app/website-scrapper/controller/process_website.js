"use server"
const puppeteer = require('puppeteer');
const { getPages } = require('./get_pages');
const { getImages } = require('./get_images');

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
