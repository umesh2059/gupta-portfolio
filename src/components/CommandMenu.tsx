import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { ArrowRight, Copy, FileDown, Github, Linkedin, Moon, Sun, Terminal as TerminalIcon } from "lucide-react";
import XLogo from "@/components/XLogo";
import { socials } from "@/data/resume";
import { OPEN_COMMAND_MENU, copyEmail, downloadResume, focusTerminal, scrollToSection } from "@/lib/actions";
import { toggleTheme, useIsDark } from "@/hooks/useTheme";

const sections = [
  { id: "terminal", label: "Terminal" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "github", label: "GitHub Activity" },
];

const links = [
  { href: socials.github, label: "GitHub", icon: Github },
  { href: socials.linkedin, label: "LinkedIn", icon: Linkedin },
  { href: socials.x, label: "X / Twitter", icon: XLogo },
].filter((l) => l.href);

const itemClass =
  "flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm text-fg2 data-[selected=true]:bg-accent/10 data-[selected=true]:text-fg";

const CommandMenu = () => {
  const [open, setOpen] = useState(false);
  const isDark = useIsDark();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_COMMAND_MENU, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_COMMAND_MENU, onOpen);
    };
  }, []);

  const run = (fn: () => void) => {
    setOpen(false);
    // Let the dialog close before scrolling or opening a tab.
    setTimeout(fn, 50);
  };

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Command menu"
      overlayClassName="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm"
      contentClassName="fixed left-1/2 top-[18vh] z-[71] w-[calc(100%-32px)] max-w-[520px] -translate-x-1/2 overflow-hidden rounded-xl border border-line bg-surface shadow-2xl"
    >
      <Command.Input
        placeholder="Type a command or search…"
        className="w-full border-b border-line bg-transparent px-4 py-3.5 text-sm text-fg placeholder:text-fg4 outline-none"
      />
      <Command.List className="max-h-[340px] overflow-y-auto p-2">
        <Command.Empty className="py-6 text-center text-sm text-fg3">No results.</Command.Empty>

        <Command.Group heading="Actions" className="cmdk-group">
          <Command.Item className={itemClass} onSelect={() => run(copyEmail)}>
            <Copy className="h-4 w-4" /> Copy email
          </Command.Item>
          <Command.Item className={itemClass} onSelect={() => run(downloadResume)}>
            <FileDown className="h-4 w-4" /> Download resume
          </Command.Item>
          <Command.Item className={itemClass} onSelect={() => run(toggleTheme)}>
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            Switch to {isDark ? "light" : "dark"} theme
          </Command.Item>
          <Command.Item className={itemClass} onSelect={() => run(focusTerminal)}>
            <TerminalIcon className="h-4 w-4" /> Open terminal
          </Command.Item>
        </Command.Group>

        <Command.Group heading="Go to" className="cmdk-group">
          {sections.map((s) => (
            <Command.Item key={s.id} className={itemClass} onSelect={() => run(() => scrollToSection(s.id))}>
              <ArrowRight className="h-4 w-4" /> {s.label}
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group heading="Links" className="cmdk-group">
          {links.map(({ href, label, icon: Icon }) => (
            <Command.Item
              key={label}
              className={itemClass}
              onSelect={() => run(() => window.open(href, "_blank", "noopener,noreferrer"))}
            >
              <Icon className="h-4 w-4" /> {label}
            </Command.Item>
          ))}
        </Command.Group>
      </Command.List>
      <div className="flex justify-between border-t border-line px-4 py-2 font-mono text-[10px] text-fg4">
        <span>↑↓ navigate · ↵ select</span>
        <span>esc close</span>
      </div>
    </Command.Dialog>
  );
};

export default CommandMenu;
