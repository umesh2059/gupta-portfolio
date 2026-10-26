import { ReactNode } from "react";

type SectionProps = {
  id: string;
  title: string;
  children: ReactNode;
};

const Section = ({ id, title, children }: SectionProps) => (
  <section id={id} className="scroll-mt-20">
    <div className="flex items-center gap-3 mb-6">
      <h2 className="font-mono text-xs font-medium text-fg2 whitespace-nowrap">
        <span className="text-accent">#</span> {title.toLowerCase()}
      </h2>
      <div className="h-px flex-1 bg-line" />
    </div>
    {children}
  </section>
);

export const Chip = ({ children }: { children: ReactNode }) => (
  <span className="font-mono text-[11px] text-fg3 px-2 py-0.5 rounded bg-fg/[0.04] border border-line">
    {children}
  </span>
);

export default Section;
