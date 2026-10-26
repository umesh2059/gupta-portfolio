import { useMemo } from "react";
import GitHubCalendar from "react-github-calendar";
import Section from "@/components/Section";
import { profile, socials } from "@/data/resume";
import { useGitHubRepos, useGitHubUser } from "@/hooks/useGitHub";
import { useIsDark } from "@/hooks/useTheme";

const calendarTheme = {
  light: ["#ececea", "#fde68a", "#fbbf24", "#f59e0b", "#b45309"],
  dark: ["#1a1a1d", "#4a3510", "#8a5a12", "#d18a1c", "#fbb03b"],
};

const langColors = ["bg-accent", "bg-accent2", "bg-sky-400", "bg-rose-400", "bg-violet-400"];

const Stat = ({ label, value }: { label: string; value: string | number }) => (
  <div className="card spot px-4 py-3">
    <div className="text-xl font-semibold text-fg tabular-nums">{value}</div>
    <div className="font-mono text-[10px] uppercase tracking-wider text-fg3 mt-0.5">{label}</div>
  </div>
);

const GitHubStats = () => {
  const isDark = useIsDark();
  const { data: user, isError } = useGitHubUser(profile.githubUsername);
  const { data: repos } = useGitHubRepos(profile.githubUsername);

  const { stars, languages } = useMemo(() => {
    const own = (repos ?? []).filter((r) => !r.fork);
    const counts = new Map<string, number>();
    own.forEach((r) => r.language && counts.set(r.language, (counts.get(r.language) ?? 0) + 1));
    const total = [...counts.values()].reduce((a, b) => a + b, 0);
    return {
      stars: own.reduce((sum, r) => sum + r.stargazers_count, 0),
      languages: [...counts.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([name, n]) => ({ name, pct: Math.round((n / total) * 100) })),
    };
  }, [repos]);

  const dash = isError ? "—" : "…";

  return (
    <Section id="github" title="GitHub Activity">
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Stat label="Repos" value={user?.public_repos ?? dash} />
          <Stat label="Stars" value={repos ? stars : dash} />
          <Stat label="Followers" value={user?.followers ?? dash} />
          <Stat label="Since" value={user ? new Date(user.created_at).getFullYear() : dash} />
        </div>

        {languages.length > 0 && (
          <div className="card p-5">
            <p className="font-mono text-[11px] text-accent mb-3">Most used languages</p>
            <div className="flex h-1.5 w-full gap-0.5 overflow-hidden rounded-full">
              {languages.map((l, i) => (
                <div key={l.name} style={{ width: `${l.pct}%` }} className={langColors[i]} />
              ))}
            </div>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-fg2">
              {languages.map((l, i) => (
                <li key={l.name} className="inline-flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${langColors[i]}`} />
                  {l.name}
                  <span className="font-mono text-[11px] text-fg4">{l.pct}%</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="card p-5 overflow-x-auto text-fg3">
          <GitHubCalendar
            username={profile.githubUsername}
            colorScheme={isDark ? "dark" : "light"}
            theme={calendarTheme}
            blockSize={10}
            blockMargin={3}
            fontSize={11}
            errorMessage="Couldn't load the contribution graph right now."
          />
        </div>

        <div className="text-center pt-2">
          <a
            href={`${socials.github}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[13px] text-fg4 hover:text-accent transition-colors"
          >
            View all repositories ↗
          </a>
        </div>
      </div>
    </Section>
  );
};

export default GitHubStats;
