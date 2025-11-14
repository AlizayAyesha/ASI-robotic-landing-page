import Hero from "@/app/home/hero/Hero";
// import Leadership from "@/app/home/leadership/Leadership";
import WhatWeDo from "@/app/home/what-we-do/WhatWeDo";
import FeaturedProjects from "@/app/home/featured-projects/FeaturedProjects";
import Team from "@/app/home/team/Team";
// import News from "@/app/home/news/News";
import Contact from "@/app/home/contact/Contact";

const MatrixOverlay = () => (
  <div className="fixed inset-0 pointer-events-none">
    <div className="absolute inset-0 bg-[linear-gradient(transparent_2px,var(--background)_2px)] bg-[length:100%_4px] animate-scan" />
    <div className="absolute inset-0 [background:repeating-linear-gradient(0deg,var(--matrix-color)_0_1px,transparent_1px_4px)] opacity-10" />
    <div className="absolute inset-0 [background:repeating-linear-gradient(90deg,var(--matrix-color)_0_1px,transparent_1px_4px)] opacity-10" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-100px,var(--matrix-glow-30),transparent)]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_800px,var(--matrix-color-20),transparent)]" />
  </div>
);

export default function Home() {
  return (
    <main className="flex flex-col relative bg-black font-mono">
      <MatrixOverlay />

      {/* Hero Section - Full height */}
      <section className="min-h-screen relative z-10">
        <Hero />
      </section>

      {/* Main Content Sections */}
      <div className="flex flex-col relative z-10">
        <div className="border-t border-[var(--matrix-color-30)]">
          <WhatWeDo />
        </div>
        <div className="border-t border-[var(--matrix-color-30)]">
          <Team />
        </div>
        <div className="border-t border-[var(--matrix-color-30)]">
          <FeaturedProjects />
        </div>
        {/*        <div className="py-32 border-t border-[var(--matrix-color-30)]">
          //<News />
        </div>*/}
        <div className="border-t border-[var(--matrix-color-30)]">
          <Contact />
        </div>
      </div>
    </main>
  );
}
