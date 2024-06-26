"use server"
import { GetSiteBase } from "./../database/data";

export async function getSite(site) {
    try {
        const res = await GetSiteBase(site);
    ;
        if (res) {
            return res;
        } else {
            return { error: "Site not found" };
        }
    } catch (err) {
        return { error: "An error occurred" };
    }
}