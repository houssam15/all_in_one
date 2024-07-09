import { NextRequest, NextResponse } from 'next/server';
import { createNewWebsite } from "../../controller";

//http://localhost:3000/competitor-analysis-scraper/api/site/create
export async function GET(req) {
    const response = { module: "website-scrapper", api: "/create_site", action: "new website" };
    const { searchParams } = new URL(req.url);
    const site = searchParams.get('site');
    const description = searchParams.get('description');

    if (!site || !description)
        return NextResponse.json({ ...response, data: { message: "site and description required!" } }, { status: 400 });

    const res = await createNewWebsite(site, description);
    if (res)
        return NextResponse.json({ ...response, data: { message: "created successfully!" } }, { status: 200 });

    return NextResponse.json({ ...response, data: { message: "failed!" } }, { status: 400 });
}
