import HeroSection from "@/components/hero-section";
import RepoShowcase from "@/components/repo-showcase";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 antialiased">
      <HeroSection />
      <div className="-mt-16 sm:-mt-20">
        <RepoShowcase />
      </div>
    </div>
  );
}
