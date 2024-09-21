import { ilike, or } from "drizzle-orm";
import db from "../../../db";
import { advocates } from "../../../db/schema";
import { NextRequest } from "next/server";

// GET /api/advocates
//   page=PAGE
//   limit=LIMIT
//   sortField=FIELD
//   sortOrder=ASC|DESC - enum
//   search=TEXT - fuzzy
//
// Missing: specialties and yearsOfExperience
export async function GET(req: NextRequest) {
  const query = db.select().from(advocates);

  const search = req.nextUrl.searchParams.get("search");
  const page = parseInt(req.nextUrl.searchParams.get("page") || "0");
  const limit = parseInt(req.nextUrl.searchParams.get("limit") || "50");

  if (search) {
    query.where(
      or(
        // Is this injection-safe? :woozy_face:
        ilike(advocates.firstName, `%${search}%`),
        ilike(advocates.lastName, `%${search}%`),
        ilike(advocates.city, `%${search}%`),
        ilike(advocates.degree, `%${search}%`)
        // TODO: add fuzzy search for specialties -- need to figure out how to do that with JSON array
        // sql`array_to_string(ARRAY(SELECT jsonb_array_elements_text('payload')), ', ')::text`
      )
    );
  }

  // sorting
  // TODO: error handling for invalid sort field + order. Could use something like Zod for this (and other params)
  // TODO: fix type errors

  // pagination
  if (page >= 0 && limit >= 0) {
    const offset = page * limit;
    query.limit(limit).offset(offset);
  } else {
    query.limit(50).offset(0);
  }

  // use $dynamic to build the query separately
  const data = await query.$dynamic();

  // TODO: return total count so frontend can render pagination details
  return Response.json({ data });
}
