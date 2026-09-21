import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "../../../../keystatic.config";

/**
 * Built on first request rather than at import.
 *
 * In GitHub mode, Keystatic throws while constructing the handler if its GitHub
 * App secrets are missing, and Next imports every route module during
 * `next build`. Constructed eagerly, a missing secret fails the whole build —
 * Vercel's, and the résumé-PDF workflow's, which never has the admin's
 * secrets. Constructed lazily, a missing secret affects only the admin.
 */
let handler: ReturnType<typeof makeRouteHandler> | undefined;

function getHandler() {
  if (!handler) {
    try {
      handler = makeRouteHandler({ config });
    } catch (error) {
      // Not cached: once the env vars are set, the next request picks them up.
      console.error("[keystatic] admin is not configured:", error);
      return undefined;
    }
  }
  return handler;
}

const notConfigured = () =>
  Response.json(
    {
      error:
        "The admin isn't set up on this deployment yet. Add the Keystatic GitHub App environment variables — see docs/ADMIN.md.",
    },
    { status: 503 },
  );

export async function GET(request: Request) {
  return getHandler()?.GET(request) ?? notConfigured();
}

export async function POST(request: Request) {
  return getHandler()?.POST(request) ?? notConfigured();
}
