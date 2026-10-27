import { ArrowUpRight, Github, Star } from "lucide-react";
import Section, { Chip } from "@/components/Section";
import { profile, projects } from "@/data/resume";
import { useGitHubRepos } from "@/hooks/useGitHub";
import { timeAgo } from "@/lib/utils";

const Projects = () => {
  const { data: repos } = useGitHubRepos(profile.githubUsername);

  return (
    <Section id="projects" title="Projects">
      <div className="flex flex-col gap-4">
        {projects.map((p, i) => {
          const repo = repos?.find((r) => r.name.toLowerCase() === p.repo.toLowerCase());
          const primaryLink = p.live ?? `https://github.com/${profile.githubUsername}/${p.repo}`;
          return (
            <article
              key={p.repo}
              // Free-style row: no box, just a soft cursor glow behind it on hover (.spot without its border).
              className="spot before:hidden group -mx-4 grid grid-cols-[44px_1fr] sm:grid-cols-[64px_1fr] gap-x-2 rounded-2xl px-4 py-5"
            >
              <span
                aria-hidden
                className="font-mono text-2xl sm:text-[34px] font-bold leading-none pt-0.5 text-fg5 transition-colors duration-300 group-hover:text-accent"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="text-[17px] font-semibold text-fg leading-snug">
                      <a
                        href={primaryLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 hover:text-accent transition-colors"
                      >
                        {p.title}
                        <ArrowUpRight className="h-4 w-4 text-fg4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                      </a>
                    </h3>
                    <span className={`font-mono text-[11px] ${p.color}`}>{p.subtitle}</span>
                  </div>
                  <a
                    href={`https://github.com/${profile.githubUsername}/${p.repo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${p.title} source code`}
                    className="mt-1 shrink-0 text-fg4 hover:text-accent transition-colors"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                </div>

                <p className="text-[13.5px] text-fg2 leading-[1.8] mt-2 mb-3 max-w-[560px]">{p.summary}</p>

                <div className="flex flex-wrap items-center gap-[5px]">
                  {p.tech.map((t) => (
                    <Chip key={t}>{t}</Chip>
                  ))}
                  {repo && (
                    <span className="ml-1 inline-flex items-center gap-2.5 font-mono text-[10.5px] text-fg4">
                      <span className="inline-flex items-center gap-1">
                        <Star className="h-3 w-3" /> {repo.stargazers_count}
                      </span>
                      <span>· updated {timeAgo(repo.pushed_at)}</span>
                    </span>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
};

export default Projects;
