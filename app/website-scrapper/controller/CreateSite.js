import {createWebsiteBase } from "@/app/website_scapper/database/data";

export default async function CreateWebsite(site,description){
    try {
        const res = await createWebsiteBase(site, description); // Call the database function
        return res; // Return the result of the database operation
      } catch (err) {
        console.error("Error creating website:", err);
        return false;
      }
}