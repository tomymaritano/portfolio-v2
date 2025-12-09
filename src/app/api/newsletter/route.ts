import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    // Option 1: Buttondown
    if (process.env.BUTTONDOWN_API_KEY) {
      const response = await fetch(
        "https://api.buttondown.email/v1/subscribers",
        {
          method: "POST",
          headers: {
            Authorization: `Token ${process.env.BUTTONDOWN_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        if (response.status === 409) {
          return NextResponse.json(
            { error: "You're already subscribed!" },
            { status: 409 }
          );
        }
        return NextResponse.json(
          { error: data.detail || "Failed to subscribe" },
          { status: response.status }
        );
      }

      return NextResponse.json({ success: true });
    }

    // Option 2: ConvertKit
    if (process.env.CONVERTKIT_API_KEY && process.env.CONVERTKIT_FORM_ID) {
      const response = await fetch(
        `https://api.convertkit.com/v3/forms/${process.env.CONVERTKIT_FORM_ID}/subscribe`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            api_key: process.env.CONVERTKIT_API_KEY,
            email,
          }),
        }
      );

      if (!response.ok) {
        return NextResponse.json(
          { error: "Failed to subscribe" },
          { status: response.status }
        );
      }

      return NextResponse.json({ success: true });
    }

    // Fallback: Just log the email (for testing)
    console.log(`Newsletter subscription: ${email}`);
    return NextResponse.json({
      success: true,
      message: "Subscription recorded (configure newsletter provider for full functionality)"
    });

  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
