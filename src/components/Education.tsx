import Section from "@/components/Section";
import { education } from "@/data/resume";

const Education = () => (
  <Section id="education" title="Education">
    <div className="flex flex-col gap-4">
      {education.map((e) => (
        <div key={e.degree} className="flex justify-between items-start gap-4">
          <div>
            <h3 className="text-sm font-semibold text-fg">{e.degree}</h3>
            {e.school && <p className="text-xs text-fg3 mt-0.5">{e.school}</p>}
          </div>
          <span className="font-mono text-[11px] text-fg4 whitespace-nowrap shrink-0 pt-0.5">{e.period}</span>
        </div>
      ))}
    </div>
  </Section>
);

export default Education;
