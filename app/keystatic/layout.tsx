import type { Metadata } from "next";
import KeystaticApp from "./keystatic";

/**
 * The admin, mounted inside the site's root layout rather than as a second root
 * layout. Keystatic's docs give it its own <html>, but that means moving every
 * public page into a route group to make room — a change to the shared root
 * layout in exchange for nothing. Keystatic styles itself, so it renders fine
 * inside the existing <body>.
 */
export const metadata: Metadata = {
  title: { absolute: "Portfolio admin" },
  robots: { index: false, follow: false },
};

export default function KeystaticLayout() {
  return <KeystaticApp />;
}
