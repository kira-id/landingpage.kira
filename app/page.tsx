import HeroSection from "@/components/hero-section";
import RepoShowcase from "@/components/repo-showcase";
import SiteFooter from "@/components/site-footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 antialiased">
      <HeroSection />
      <div className="mt-4 sm:mt-8">
        <RepoShowcase />
      </div>
      <SiteFooter />
    </div>
  );
}
