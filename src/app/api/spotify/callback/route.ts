import { NextRequest, NextResponse } from "next/server";
import { getTokenFromCode } from "@/lib/spotify";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  const redirectUri = `${request.nextUrl.origin}/api/spotify/callback`;

  try {
    const data = await getTokenFromCode(code, redirectUri);

    if (data.error) {
      return NextResponse.json({ error: data.error }, { status: 400 });
    }

    // Display the refresh token for the user to copy
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Spotify Auth Success</title>
          <style>
            body {
              font-family: system-ui, -apple-system, sans-serif;
              max-width: 600px;
              margin: 100px auto;
              padding: 20px;
              background: #121212;
              color: #fff;
            }
            h1 { color: #1db954; }
            code {
              background: #282828;
              padding: 15px;
              border-radius: 8px;
              display: block;
              word-break: break-all;
              margin: 20px 0;
            }
            .warning {
              background: #ff6b6b20;
              border-left: 4px solid #ff6b6b;
              padding: 10px 15px;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <h1>Spotify Authorization Successful</h1>
          <p>Copy this refresh token to your <code>.env.local</code> file:</p>
          <code>SPOTIFY_REFRESH_TOKEN=${data.refresh_token}</code>
          <div class="warning">
            <strong>Important:</strong> This token will not be shown again.
            Copy it now and add it to your environment variables.
          </div>
        </body>
      </html>
    `;

    return new NextResponse(html, {
      headers: { "Content-Type": "text/html" },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to exchange code for token" },
      { status: 500 }
    );
  }
}
