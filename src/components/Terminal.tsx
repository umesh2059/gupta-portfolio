import { KeyboardEvent, ReactNode, useEffect, useRef, useState } from "react";
import Section from "@/components/Section";
import { education, experience, now, profile, projects, skills, socials } from "@/data/resume";
import { copyEmail, downloadResume, scrollToSection } from "@/lib/actions";
import { toggleTheme } from "@/hooks/useTheme";

type Line = { id: number; content: ReactNode };

const Accent = ({ children }: { children: ReactNode }) => <span className="text-accent">{children}</span>;
const Green = ({ children }: { children: ReactNode }) => <span className="text-accent2">{children}</span>;
const Dim = ({ children }: { children: ReactNode }) => <span className="text-fg4">{children}</span>;
const Link = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-accent2 underline-offset-2 hover:underline">
    {children}
  </a>
);

const COMMANDS: Record<string, { help: string; run: () => ReactNode }> = {
  help: {
    help: "list available commands",
    run: () => (
      <div className="grid grid-cols-[110px_1fr] gap-x-3">
        {Object.entries(COMMANDS)
          .filter(([name]) => !HIDDEN.includes(name))
          .map(([name, c]) => (
            <div key={name} className="contents">
              <Accent>{name}</Accent>
              <Dim>{c.help}</Dim>
            </div>
          ))}
      </div>
    ),
  },
  whoami: {
    help: "who is Umesh?",
    run: () => (
      <div>
        <Accent>{profile.name}</Accent> — {profile.title}, {profile.location}
        <div className="text-fg3 mt-1">{profile.summary}</div>
      </div>
    ),
  },
  now: {
    help: "what I'm up to right now",
    run: () => (
      <div>
        <div>
          <Dim>building:</Dim> {now.building}
        </div>
        <div>
          <Dim>learning:</Dim> {now.learning}
        </div>
        <div>
          <Dim>status:</Dim> {profile.openToWork ? <Green>open to work ●</Green> : "busy"}
        </div>
      </div>
    ),
  },
  projects: {
    help: "things I've built",
    run: () => (
      <div className="space-y-0.5">
        {projects.map((p, i) => (
          <div key={p.repo}>
            <Dim>{String(i + 1).padStart(2, "0")}</Dim> <Accent>{p.title}</Accent> <Dim>—</Dim> {p.subtitle}
            {p.live && (
              <>
                {" "}
                <Link href={p.live}>[live]</Link>
              </>
            )}
          </div>
        ))}
      </div>
    ),
  },
  skills: {
    help: "my tech stack",
    run: () => (
      <div>
        {skills.map((s) => (
          <div key={s.group}>
            <Accent>{s.group.padEnd(9, " ")}</Accent> {s.items.join(", ")}
          </div>
        ))}
      </div>
    ),
  },
  experience: {
    help: "where I've worked",
    run: () => (
      <div>
        {experience.map((e) => (
          <div key={e.company}>
            <Accent>{e.role}</Accent> @ {e.company} <Dim>({e.period})</Dim>
          </div>
        ))}
      </div>
    ),
  },
  education: {
    help: "where I studied",
    run: () => (
      <div>
        {education.map((e) => (
          <div key={e.degree}>
            {e.degree} <Dim>({e.period})</Dim>
          </div>
        ))}
      </div>
    ),
  },
  contact: {
    help: "how to reach me",
    run: () => (
      <div>
        <div>
          <Dim>email </Dim> <Link href={`mailto:${profile.email}`}>{profile.email}</Link>
        </div>
        {socials.linkedin && (
          <div>
            <Dim>linkedin</Dim> <Link href={socials.linkedin}>{socials.linkedin.replace("https://www.", "")}</Link>
          </div>
        )}
        {socials.github && (
          <div>
            <Dim>github </Dim> <Link href={socials.github}>{socials.github.replace("https://", "")}</Link>
          </div>
        )}
        {socials.x && (
          <div>
            <Dim>x     </Dim> <Link href={socials.x}>{socials.x.replace("https://", "")}</Link>
          </div>
        )}
      </div>
    ),
  },
  email: {
    help: "copy my email to your clipboard",
    run: () => {
      copyEmail();
      return <Green>✓ copied {profile.email}</Green>;
    },
  },
  resume: {
    help: "download my resume (PDF)",
    run: () => {
      downloadResume();
      return <Green>↓ downloading resume…</Green>;
    },
  },
  github: {
    help: "open my GitHub profile",
    run: () => {
      window.open(socials.github, "_blank", "noopener,noreferrer");
      return <Dim>opening {socials.github}…</Dim>;
    },
  },
  theme: {
    help: "toggle light / dark",
    run: () => {
      toggleTheme();
      return <Dim>theme switched.</Dim>;
    },
  },
  clear: { help: "clear the terminal", run: () => null },
  // Easter eggs — not listed in `help`.
  sudo: { help: "", run: () => <span className="text-red-400">nice try. this incident will be reported. 🚨</span> },
  hire: {
    help: "",
    run: () => {
      setTimeout(() => scrollToSection("top"), 600);
      return <Green>great choice 😄 — email me at {profile.email}</Green>;
    },
  },
  coffee: { help: "", run: () => <span>☕ brewing… powered by chai, actually.</span> },
  ls: { help: "", run: () => <span>about.txt  projects/  skills.json  resume.pdf  secrets/</span> },
  "cd secrets": { help: "", run: () => <span className="text-red-400">permission denied: secrets/</span> },
};
const HIDDEN = ["sudo", "hire", "coffee", "ls", "cd secrets"];

const PROMPT = (
  <span className="shrink-0">
    <Green>guest</Green>
    <Dim>@</Dim>
    <Accent>umesh</Accent>
    <Dim>:~$</Dim>
  </span>
);

let nextId = 0;
const intro: Line[] = [
  {
    id: nextId++,
    content: (
      <span>
        Welcome! Type <Accent>help</Accent> to see what I can do, or try <Accent>whoami</Accent>.
      </span>
    ),
  },
];

const Terminal = () => {
  const [lines, setLines] = useState<Line[]>(intro);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const scroller = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight });
  }, [lines]);

  const execute = (raw: string) => {
    const cmd = raw.trim().toLowerCase().replace(/^sudo .*/, "sudo");
    const echo: Line = {
      id: nextId++,
      content: (
        <div className="flex gap-2">
          {PROMPT}
          <span className="text-fg">{raw}</span>
        </div>
      ),
    };
    if (cmd === "clear") {
      setLines([]);
      return;
    }
    const command = COMMANDS[cmd];
    const output = !cmd
      ? null
      : command
        ? command.run()
        : (
            <span>
              command not found: <span className="text-red-400">{cmd}</span>. Type <Accent>help</Accent>.
            </span>
          );
    setLines((prev) => [...prev, echo, ...(output ? [{ id: nextId++, content: output }] : [])]);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      execute(input);
      if (input.trim()) setHistory((h) => [input, ...h]);
      setHistoryIndex(-1);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const i = Math.min(historyIndex + 1, history.length - 1);
      if (history[i] !== undefined) {
        setHistoryIndex(i);
        setInput(history[i]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const i = historyIndex - 1;
      setHistoryIndex(Math.max(i, -1));
      setInput(i >= 0 ? history[i] : "");
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = Object.keys(COMMANDS).find((c) => !HIDDEN.includes(c) && c.startsWith(input.trim().toLowerCase()));
      if (input.trim() && match) setInput(match);
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  const quick = ["help", "whoami", "projects", "skills", "contact", "resume"];

  return (
    <Section id="terminal" title="Terminal">
      <div className="card overflow-hidden shadow-[0_0_0_1px_rgb(var(--line)),0_20px_60px_-20px_rgb(var(--accent)/0.25)]">
        <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          <span className="ml-3 font-mono text-[11px] text-fg4">guest@umesh: ~</span>
        </div>
        <div
          ref={scroller}
          onClick={() => inputRef.current?.focus({ preventScroll: true })}
          className="h-[260px] overflow-y-auto px-4 py-3 font-mono text-[12.5px] leading-relaxed text-fg2 cursor-text"
        >
          {lines.map((l) => (
            <div key={l.id} className="mb-1 break-words">
              {l.content}
            </div>
          ))}
          <div className="flex gap-2">
            {PROMPT}
            <input
              id="terminal-input"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
              aria-label="Terminal input"
              className="flex-1 min-w-0 bg-transparent text-fg caret-accent outline-none focus-visible:ring-0"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 border-t border-line px-4 py-2.5">
          {quick.map((q) => (
            <button
              key={q}
              onClick={() => {
                execute(q);
                inputRef.current?.focus({ preventScroll: true });
              }}
              className="font-mono text-[11px] text-fg3 px-2 py-0.5 rounded border border-line hover:text-accent hover:border-accent/40 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Terminal;
