import HeroSection from "@/components/hero-section";
import ParticlesBackground from "@/components/particles-background";
import RepoShowcase from "@/components/repo-showcase";
import SiteFooter from "@/components/site-footer";
import { BRAND_FONT_FAMILY } from "@/lib/theme";

export default function Home() {
  return (
    <div
      className="relative min-h-[100dvh] flex flex-col text-zinc-900 antialiased"
      style={{
        fontFamily: BRAND_FONT_FAMILY,
      }}
    >
      <ParticlesBackground />
      <main className="relative z-10 flex-1">
        <HeroSection />
        <div className="mt-4 sm:mt-8">
          <RepoShowcase />
        </div>
      </main>
      <div className="relative z-10">
        <SiteFooter />
      </div>
    </div>
  );
}
