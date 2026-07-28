import { NextResponse } from "next/server";

/** Generous enough for a real enquiry, tight enough to reject junk payloads. */
const LIMITS = { name: 120, email: 200, subject: 60, message: 4000 } as const;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function asString(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "That request didn't come through correctly." },
        { status: 400 },
      );
    }

    const payload = body as Record<string, unknown>;
    const name = asString(payload.name, LIMITS.name);
    const email = asString(payload.email, LIMITS.email);
    const subject = asString(payload.subject, LIMITS.subject);
    const message = asString(payload.message, LIMITS.message);

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Please fill in every field." },
        { status: 400 },
      );
    }

    if (!EMAIL.test(email)) {
      return NextResponse.json(
        { error: "That email address doesn't look right." },
        { status: 400 },
      );
    }

    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      // Configuration problem on my side — say so without naming the service.
      console.error("Contact form: WEB3FORMS_ACCESS_KEY is not set");
      return NextResponse.json(
        { error: "The form is temporarily unavailable." },
        { status: 503 },
      );
    }

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        name,
        email,
        subject,
        message,
        from_name: "Portfolio contact form",
      }),
    });

    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      console.error(
        "Contact form: unexpected upstream response",
        response.status,
        contentType,
      );
      return NextResponse.json(
        { error: "The message service isn't responding right now." },
        { status: 502 },
      );
    }

    const data = await response.json();

    if (!response.ok || !data?.success) {
      // Upstream detail goes to the logs, not to the visitor.
      console.error("Contact form: upstream rejected submission", data);
      return NextResponse.json(
        { error: "That didn't send. Please try again in a moment." },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Something went wrong on my end." },
      { status: 500 },
    );
  }
}
