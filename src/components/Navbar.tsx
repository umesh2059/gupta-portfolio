import { useEffect, useState } from "react";
import { Moon, Search, Sun } from "lucide-react";
import { profile } from "@/data/resume";
import { openCommandMenu } from "@/lib/actions";
import { toggleTheme, useIsDark } from "@/hooks/useTheme";

const links = [
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#github", label: "GitHub" },
];

const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.userAgent);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const isDark = useIsDark();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? "bg-bg/80 backdrop-blur-md border-line" : "bg-transparent border-transparent"
      }`}
    >
      <div className="mx-auto max-w-[720px] px-6 h-14 flex items-center justify-between gap-4">
        <a href="#top" className="font-mono text-[13px] font-bold">
          <span className="text-fg4">~/</span>
          <span className="text-gradient">{profile.initials.toLowerCase()}</span>
        </a>
        <div className="flex items-center gap-5">
          <div className="hidden sm:flex gap-5">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-xs font-medium text-fg3 hover:text-fg transition-colors">
                {l.label}
              </a>
            ))}
          </div>
          <button
            onClick={openCommandMenu}
            aria-label="Open command menu"
            className="inline-flex items-center gap-2 rounded-md border border-line bg-surface/60 px-2.5 py-1 text-xs text-fg3 hover:text-fg hover:border-accent/40 transition-colors"
          >
            <Search className="h-3.5 w-3.5" />
            <kbd className="font-mono text-[10px]">{isMac ? "⌘" : "Ctrl"} K</kbd>
          </button>
          <button
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
            className="text-fg3 hover:text-accent transition-colors"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
