import { useState } from "react";
import { Check, Copy, FileDown, Github, Linkedin, Mail } from "lucide-react";
import XLogo from "@/components/XLogo";
import NowStrip from "@/components/NowStrip";
import { profile, socials } from "@/data/resume";
import { copyEmail, downloadResume, resumeFileName } from "@/lib/actions";
import { useTypeLoop, useTypeOnce } from "@/hooks/useTypewriter";

const links = [
  { href: socials.github, label: "GitHub", icon: Github },
  { href: socials.linkedin, label: "LinkedIn", icon: Linkedin },
  { href: socials.x, label: "X", icon: XLogo },
].filter((l) => l.href);

const buttonClass =
  "inline-flex items-center gap-[7px] text-xs text-fg3 px-3.5 py-1.5 rounded-md border border-line bg-surface/60 hover:text-fg hover:border-accent/40 transition-colors";

const Hero = () => {
  const { typed, done } = useTypeOnce(profile.name.toLowerCase());
  const role = useTypeLoop(profile.roles);
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    await copyEmail();
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section id="top" className="pt-28 pb-16">
      <div className="fade-up fade-up-1 flex items-center justify-between gap-6 mb-6">
        <div className="min-w-0">
          <h1
            aria-label={profile.name}
            className="font-mono text-[clamp(28px,6vw,44px)] font-semibold text-fg tracking-[-0.03em] leading-[1.1] mb-3.5"
          >
            <span aria-hidden className="text-accent">&gt; </span>
            <span aria-hidden>{typed}</span>
            <span
              aria-hidden
              className={`ml-1 inline-block h-[0.9em] w-[0.5em] translate-y-[0.12em] bg-accent ${done ? "animate-blink" : ""}`}
            />
          </h1>
          <div className="flex items-center gap-3 flex-wrap min-h-[24px]">
            <span className="text-sm text-fg2">
              <span className="font-mono text-accent2">$ </span>
              {role}
              <span className="text-fg5">|</span>
            </span>
            {profile.openToWork && (
              <>
                <span className="text-xs text-fg5">·</span>
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-accent2">
                  <span className="relative flex h-[6px] w-[6px]">
                    <span className="absolute inset-0 rounded-full bg-accent2 animate-ping opacity-60" />
                    <span className="relative h-[6px] w-[6px] rounded-full bg-accent2" />
                  </span>
                  Open to work
                </span>
              </>
            )}
          </div>
        </div>
        <div className="group relative shrink-0">
          <div
            aria-hidden
            className="absolute -inset-1.5 rounded-[22px] bg-gradient-to-br from-accent to-accent2 opacity-40 blur-lg transition-opacity duration-500 group-hover:opacity-70"
          />
          <div className="relative h-24 w-24 sm:h-36 sm:w-36 overflow-hidden rounded-2xl border-2 border-bg ring-1 ring-line transition-transform duration-500 group-hover:scale-[1.03] group-hover:-rotate-1">
            <img
              src={profile.photo}
              alt={profile.name}
              width={144}
              height={144}
              // The photo is a wide shot, so zoom in on the face (adjust photoFocus in resume.ts).
              style={{ transformOrigin: profile.photoFocus, objectPosition: profile.photoFocus }}
              className="h-full w-full object-cover scale-[1.9]"
            />
          </div>
        </div>
      </div>

      <p className="fade-up fade-up-2 text-sm text-fg3 leading-[1.8] max-w-[500px] mb-6">{profile.tagline}</p>

      <div className="fade-up fade-up-3 mb-7">
        <NowStrip />
      </div>

      <div className="fade-up fade-up-4 flex flex-wrap gap-1.5">
        {links.map(({ href, label, icon: Icon }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={buttonClass}>
            <Icon className="h-3.5 w-3.5" />
            {label}
          </a>
        ))}
        <div className="inline-flex">
          <a href={`mailto:${profile.email}`} className={`${buttonClass} rounded-r-none`}>
            <Mail className="h-3.5 w-3.5" />
            Email
          </a>
          <button
            onClick={onCopy}
            aria-label="Copy email address"
            title="Copy email"
            className={`${buttonClass} rounded-l-none border-l-0 px-2.5`}
          >
            {copied ? <Check className="h-3.5 w-3.5 text-accent2" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
        </div>
        <a
          href={profile.resumeUrl}
          download={resumeFileName}
          onClick={(e) => {
            e.preventDefault();
            downloadResume();
          }}
          className="group inline-flex items-center gap-[7px] text-xs font-medium text-black px-3.5 py-1.5 rounded-md bg-gradient-to-r from-accent to-amber-300 hover:brightness-110 transition"
        >
          <FileDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
          Download Resume
        </a>
      </div>
    </section>
  );
};

export default Hero;
