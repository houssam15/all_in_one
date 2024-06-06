import puppeteer from "puppeteer";
import axios from "axios";
import {createBackLink ,deleteBySite} from "@/app/competitor_analysis_scraper/database/data";
interface getTotalPagesParams {
    url : Required<string>;
}

export default async function getWebsiteBacklinks({url} : getTotalPagesParams){
    try{
        const b = await puppeteer.launch();
        const p = await b.newPage();
        await p.goto(url, { waitUntil: 'networkidle0' });
        const bl = await Promise.all(
            Array.from(await p.$$eval('a', links => links.map(link => ({
              href: link.href,
              rel: link.hasAttribute('rel') ? link.getAttribute('rel') : null,
              textContent: link.textContent?.trim()
            })))).map(async (link) => {
              try {
                 const { data } = await axios.get(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${link.href}&strategy=mobile`);
                return {
                  url: link.href,
                  type: link.rel?.includes('nofollow') ? 'nofollow' : 'dofollow',
                  anchorText: link.textContent,
                  sourceDomain : (new URL(link.href)).hostname,
                  sourcePage : link.href,
                  pageSpeed: data.lighthouseResult.categories.performance.score,
                  pageAvailability: data.loadingExperience.overall_category
                };
              } catch (error) {
                console.error(`Error fetching metrics for ${link.href}: `, error);
                return {
                  url: link.href,
                  type: link.rel?.includes('nofollow') ? 'nofollow' : 'dofollow',
                  anchorText: link.textContent,
                  sourceDomain : (new URL(link.href)).hostname,
                  sourcePage : link.href,
                };
              }
            })
          );
        await b.close();
        //save in db
        for(let elm in bl){
            await createBackLink(url,elm);
        }
        return bl;
    }catch(err){
        console.error(err);
        return -1;
    }
}
