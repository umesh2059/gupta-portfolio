import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Terminal from "@/components/Terminal";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import GitHubStats from "@/components/GitHubStats";
import CommandMenu from "@/components/CommandMenu";
import CursorSpotlight from "@/components/CursorSpotlight";
import { BackToTop, ScrollProgress } from "@/components/ScrollExtras";
import { profile } from "@/data/resume";
import { openCommandMenu } from "@/lib/actions";

const Index = () => (
  <>
    <ScrollProgress />
    <CursorSpotlight />
    <Navbar />
    <CommandMenu />
    <div className="mx-auto max-w-[720px] px-6 pb-[120px]">
      <Hero />
      <main className="flex flex-col gap-20">
        <Terminal />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <GitHubStats />
      </main>
      <footer className="mt-24 pt-6 border-t border-line flex flex-col sm:flex-row gap-2 justify-between font-mono text-[11px] text-fg4">
        <span>
          © {new Date().getFullYear()} {profile.name} · built with React &amp; ☕
        </span>
        <button onClick={openCommandMenu} className="text-left hover:text-accent transition-colors">
          press <kbd className="text-fg3">Ctrl K</kbd> to navigate
        </button>
      </footer>
    </div>
    <BackToTop />
  </>
);

export default Index;
