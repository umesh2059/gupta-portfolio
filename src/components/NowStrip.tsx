import { useEffect, useState } from "react";
import { BookOpen, Clock, GitCommitHorizontal, Hammer } from "lucide-react";
import { now, profile } from "@/data/resume";
import { useGitHubRepos } from "@/hooks/useGitHub";
import { timeAgo } from "@/lib/utils";

const useClock = (timeZone: string) => {
  const format = () =>
    new Intl.DateTimeFormat("en-US", { timeZone, hour: "numeric", minute: "2-digit" }).format(new Date());
  const [time, setTime] = useState(format);
  useEffect(() => {
    const id = setInterval(() => setTime(format()), 15_000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeZone]);
  return time;
};

const Item = ({ icon: Icon, label, children }: { icon: typeof Clock; label: string; children: React.ReactNode }) => (
  <div className="flex items-center gap-2.5 min-w-0">
    <Icon className="h-3.5 w-3.5 shrink-0 text-accent" />
    <span className="font-mono text-[10px] uppercase tracking-wider text-fg4 shrink-0">{label}</span>
    <span className="text-xs text-fg2 truncate">{children}</span>
  </div>
);

const NowStrip = () => {
  const time = useClock(profile.timeZone);
  const { data: repos } = useGitHubRepos(profile.githubUsername);
  const latest = repos?.[0]; // the API returns repos sorted by most recent push
  const city = profile.location.split(",")[0];

  return (
    <div className="card grid sm:grid-cols-2 gap-x-6 gap-y-2.5 px-4 py-3.5">
      <Item icon={Clock} label="Local">
        {time} in {city}
      </Item>
      <Item icon={GitCommitHorizontal} label="Pushed">
        {latest ? (
          <a
            href={latest.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            {timeAgo(latest.pushed_at)} → {latest.name}
          </a>
        ) : (
          "…"
        )}
      </Item>
      <Item icon={Hammer} label="Building">
        {now.building}
      </Item>
      <Item icon={BookOpen} label="Learning">
        {now.learning}
      </Item>
    </div>
  );
};

export default NowStrip;
