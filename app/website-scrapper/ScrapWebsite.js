const puppeteer = require("puppeteer");
const fs = require("fs")
export default async function ScrapWebsite ()   {

 
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://krishjotaniya.netlify.app/projects/');
    const allProjects = await page.$$(".mb-4.cursor-pointer.group");
    const data = await Promise.all(allProjects.map(async (project) => {
        const titleElement = await project.$(".font-semibold.text-xl");
        const title = await page.evaluate(titleElement => titleElement.textContent, titleElement);
        return { title };
    }));
    fs.writeFileSync("project.json", JSON.stringify(data))
    await browser.close();

};

 