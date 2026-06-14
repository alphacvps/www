import Header from "@/components/header";
import Footer from "@/components/footer";
import { CookieBanner } from "@/components/cookieBanner";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CookieBanner />
      <Header />
      {children}
      <Footer />
    </>
  );
}