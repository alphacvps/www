import { SiteConfig, SocialItem } from "@/types/config";
import packageJson from "../package.json";
import { HeaderItems } from "../types/header";
import { SearchResult } from "../types/search";
import { FooterItems } from "../types/footer";

export const siteConfig: SiteConfig = {
  version: packageJson.version,
  title: "AlphaCops",
  description: "",
  logo: "/logo.svg",
  logoDark: "/logo-white.svg",
  favicon: "/logo-circle.png",
};

export const headerItems: HeaderItems[] = [
  { label: "Products", href: "/products" },
  { label: "Blog", href: "/blog" },
  { label: "About us", href: "/about-us" },
];

export const headerSuggestedItems: SearchResult[] = [
  {
    slug: "protocols-update",
    title: "Security Protocols Update",
    excerpt:
      "Critical update regarding the new AES-256 encryption standards across all regional hubs.",
  },
  {
    slug: "vulnerability-assessment",
    title: "System Vulnerability Assessment",
    excerpt:
      "Weekly scan results and patched exploits in the mainframe network.",
  },
  {
    slug: "operation-shadowfall",
    title: "Operation Shadowfall Intel Log",
    excerpt:
      "Declassified timeline of events during the final phase of Operation Shadowfall.",
  },
];

export const blogSuggestedItems = [
  {
    slug: "protocols-update",
    title: "Security Protocols Update",
    excerpt:
      "Critical update regarding the new AES-256 encryption standards across all regional hubs.",
  },
  {
    slug: "vulnerability-assessment",
    title: "System Vulnerability Assessment",
    excerpt:
      "Weekly scan results and patched exploits in the mainframe network.",
  },
  {
    slug: "operation-shadowfall",
    title: "Operation Shadowfall Intel Log",
    excerpt:
      "Declassified timeline of events during the final phase of Operation Shadowfall.",
  },
];

export const footerItems: FooterItems[] = [
  { label: "OUR VALUES", href: "#" },
  { label: "ABOUT US", href: "/about-us" },
  { label: "OUR MISSION", href: "#" },
  { label: "OPEN SOURCE HUB", href: "#" },
];

export const socialLinks: SocialItem[] = [
  {
    title: "GitHub",
    href: "https://github.com/alphacops",
  },
  {
    title: "Instagram",
    href: "https://instagram.com/alphacvps",
  },
  {
    title: "Telegram",
    href: "https://t.me/alphacvps",
  },
  {
    title: "YouTube",
    href: "https://youtube.com/@alphacops",
  },
];
