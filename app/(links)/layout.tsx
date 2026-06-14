import { CookieBanner } from "@/components/cookieBanner";

export default function LinksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CookieBanner />
      {children}
    </>
  );
}