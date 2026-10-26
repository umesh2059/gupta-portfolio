import { ArrowUpRight, Github, Star } from "lucide-react";
import Section, { Chip } from "@/components/Section";
import { profile, projects } from "@/data/resume";
import { useGitHubRepos } from "@/hooks/useGitHub";
import { timeAgo } from "@/lib/utils";

const Projects = () => {
  const { data: repos } = useGitHubRepos(profile.githubUsername);

  return (
    <Section id="projects" title="Projects">
      <div className="grid sm:grid-cols-2 gap-3">
        {projects.map((p, i) => {
          const repo = repos?.find((r) => r.name.toLowerCase() === p.repo.toLowerCase());
          return (
            <article key={p.repo} className="card spot flex flex-col p-5 transition-transform duration-300 hover:-translate-y-0.5">
              <div className="flex justify-between items-start gap-3">
                <span className="font-mono text-[10px] text-fg5 select-none">{String(i + 1).padStart(2, "0")}</span>
                <div className="flex gap-2.5 shrink-0">
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${p.title} live site`}
                      className="text-fg4 hover:text-accent transition-colors"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                  <a
                    href={`https://github.com/${profile.githubUsername}/${p.repo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${p.title} source code`}
                    className="text-fg4 hover:text-accent transition-colors"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <h3 className="mt-2 text-[15px] font-semibold text-fg">{p.title}</h3>
              <span className={`font-mono text-[11px] ${p.color}`}>{p.subtitle}</span>
              <p className="text-[13px] text-fg2 leading-[1.75] mt-2.5 mb-4 flex-1">{p.summary}</p>
              <div className="flex flex-wrap gap-[5px]">
                {p.tech.map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </div>
              {repo && (
                <div className="mt-4 pt-3 border-t border-line flex items-center gap-3 font-mono text-[10.5px] text-fg4">
                  <span className="inline-flex items-center gap-1">
                    <Star className="h-3 w-3" /> {repo.stargazers_count}
                  </span>
                  <span>updated {timeAgo(repo.pushed_at)}</span>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </Section>
  );
};

export default Projects;
