import HeroSection from "@/components/hero-section";
import RepoShowcase from "@/components/repo-showcase";
import SiteFooter from "@/components/site-footer";
import { BRAND_BACKGROUND_COLOR, BRAND_FONT_FAMILY } from "@/lib/theme";

export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col text-zinc-900 antialiased"
      style={{
        backgroundColor: BRAND_BACKGROUND_COLOR,
        fontFamily: BRAND_FONT_FAMILY,
      }}
    >
      <main className="flex-1">
        <HeroSection />
        <div className="mt-4 sm:mt-8">
          <RepoShowcase />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
