import { NextRequest, NextResponse } from "next/server";

interface Entry {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

// In-memory storage for development
// Replace with Vercel KV in production
let entries: Entry[] = [
  {
    id: "1",
    name: "Tomas",
    message: "Welcome to my guestbook! Feel free to leave a message.",
    createdAt: new Date().toISOString(),
  },
];

export async function GET() {
  // If using Vercel KV:
  // import { kv } from "@vercel/kv";
  // const entries = await kv.lrange("guestbook", 0, 100);

  return NextResponse.json(entries);
}

export async function POST(request: NextRequest) {
  try {
    const { name, message } = await request.json();

    if (!name || !message) {
      return NextResponse.json(
        { error: "Name and message are required" },
        { status: 400 }
      );
    }

    if (name.length > 50 || message.length > 500) {
      return NextResponse.json(
        { error: "Name or message too long" },
        { status: 400 }
      );
    }

    const entry: Entry = {
      id: Date.now().toString(),
      name: name.slice(0, 50),
      message: message.slice(0, 500),
      createdAt: new Date().toISOString(),
    };

    // If using Vercel KV:
    // import { kv } from "@vercel/kv";
    // await kv.lpush("guestbook", JSON.stringify(entry));

    entries = [entry, ...entries];

    return NextResponse.json(entry, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
