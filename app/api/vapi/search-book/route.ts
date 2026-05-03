import { NextResponse } from "next/server";
import { connectToDatabase } from "@/database/mongoose";
import BookSegment from "@/database/models/bookSegment.model";
import { searchBookSegment } from "@/lib/actions/book.actions";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json();

    // support several possible shapes from VAPI tool calls
    const toolName = (
      body?.name || body?.tool?.name || body?.toolName || body?.action || ""
    ).toString();

    if (toolName.toLowerCase() !== "search book") {
      return NextResponse.json({ error: "unsupported tool call" }, { status: 400 });
    }

    // gather arguments from common locations
    const args = body?.arguments || body?.args || body?.tool?.arguments || body || {};

    const bookId = args?.bookId || args?.book_id || args?.book || args?.bookId;
    const query = args?.query || args?.q || args?.queary || args?.text || args?.question;
    const numSegments = Number(args?.numSegments ?? args?.num ?? 3) || 3;

    if (!bookId || !query) {
      return NextResponse.json({ error: "missing bookId or query" }, { status: 400 });
    }

    await connectToDatabase();

    const result = searchBookSegment(bookId, query ,numSegments)
    // Use MongoDB text search (text index exists on BookSegment.content)
    return NextResponse.json(result);
  }}
