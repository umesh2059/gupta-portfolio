import Section from "@/components/Section";
import { skills } from "@/data/resume";

const Skills = () => (
  <Section id="skills" title="Skills">
    <div className="flex flex-col gap-3">
      {skills.map(({ group, items }) => (
        <div key={group} className="flex gap-5 items-start">
          <span className="min-w-[72px] shrink-0 pt-1 font-mono text-[11px] tracking-[0.03em] text-fg4">
            {group}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {items.map((s) => (
              <span key={s} className="text-xs text-fg2 px-2.5 py-0.5 border border-line rounded">
                {s}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </Section>
);

export default Skills;
