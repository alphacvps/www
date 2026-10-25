import { SiteConfig, SocialItem } from "@/types/config";
import packageJson from "../package.json";
import { HeaderItems } from "../types/header";
import { FooterItems } from "../types/footer";

export const siteConfig: SiteConfig = {
  version: packageJson.version,
  title: "Alphacvps",
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
  { label: "PRODUCTS", href: "/products" },
  { label: "ABOUT US", href: "/about-us" },
  { label: "BLOG", href: "/blog" },
  { label: "CONTACT", href: "mailto:alphacops@gmail.com" },
];

export const SOCIAL_URLS = {
  GitHub: "https://github.com/alphacvps",
  Instagram: "https://instagram.com/alphacvps",
  Telegram: "https://t.me/alphacvps",
  YouTube: "https://youtube.com/@alphacvps",
} as const;

export const socialLinks: SocialItem[] = [
  {
    title: "GitHub",
    href: SOCIAL_URLS.GitHub,
  },
  {
    title: "Instagram",
    href: SOCIAL_URLS.Instagram,
  },
  {
    title: "Telegram",
    href: SOCIAL_URLS.Telegram,
  },
  {
    title: "YouTube",
    href: SOCIAL_URLS.YouTube,
  },
];
