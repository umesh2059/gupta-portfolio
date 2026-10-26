import Section, { Chip } from "@/components/Section";
import { experience } from "@/data/resume";

const Experience = () => (
  <Section id="experience" title="Experience">
    <ol className="relative ml-1.5 border-l border-line">
      {experience.map((exp, i) => (
        <li key={exp.company + exp.role} className="relative pl-7 pb-10 last:pb-0">
          <span
            aria-hidden
            className={`absolute -left-[5px] top-1.5 h-[9px] w-[9px] rounded-full ring-4 ring-bg ${
              i === 0 ? "bg-accent shadow-[0_0_10px_rgb(var(--accent)/0.8)]" : "bg-fg5"
            }`}
          />
          <div className="flex justify-between items-start gap-4 mb-2">
            <div>
              <h3 className="text-sm font-semibold text-fg mb-0.5">{exp.role}</h3>
              <p className="text-xs font-medium text-accent">{exp.company}</p>
            </div>
            <span className="font-mono text-[11px] text-fg4 whitespace-nowrap shrink-0 pt-0.5">{exp.period}</span>
          </div>
          <p className="text-[13px] text-fg2 leading-[1.8] mt-2.5 mb-3">{exp.description}</p>
          <div className="flex flex-wrap gap-[5px]">
            {exp.tech.map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </div>
        </li>
      ))}
    </ol>
  </Section>
);

export default Experience;
