import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const experiences = [
    {
      company: "Sonisoft IT",
      role: "Full-Stack Developer Intern",
      period: "Jun 2024 - Aug 2024",
      description: [
        "Developed responsive web applications using React and Node.js",
        "Collaborated with senior developers on client projects",
        "Implemented RESTful APIs and integrated third-party services",
        "Improved application performance by 30% through optimization",
      ],
    },
    {
      company: "Octanet Services Pvt. Ltd.",
      role: "Web Development Intern",
      period: "Jan 2024 - Mar 2024",
      description: [
        "Built interactive user interfaces using React and TypeScript",
        "Worked on database design and implementation with MongoDB",
        "Participated in code reviews and agile development practices",
        "Created comprehensive documentation for project codebases",
      ],
    },
  ];

  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background"></div>
      
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            My professional journey and internship experiences
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="glass border-primary/20 overflow-hidden group hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div className="flex items-center gap-3 mb-2 md:mb-0">
                      <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Briefcase className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{exp.role}</h3>
                        <p className="text-primary font-medium">{exp.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{exp.period}</span>
                    </div>
                  </div>
                  <ul className="space-y-2 ml-4">
                    {exp.description.map((item, i) => (
                      <li
                        key={i}
                        className="text-muted-foreground flex items-start gap-2"
                      >
                        <span className="text-primary mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="h-1 w-full gradient-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-semibold mb-8">Education Timeline</h3>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-primary/30"></div>
              <div className="space-y-8">
                <TimelineItem
                  year="2023 - 2026"
                  title="Bachelor of Technology"
                  subtitle="Computer Science Engineering"
                  isInView={isInView}
                  delay={0.8}
                />
                <TimelineItem
                  year="2021 - 2023"
                  title="Higher Secondary Education"
                  subtitle="Science Stream"
                  isInView={isInView}
                  delay={0.9}
                />
                <TimelineItem
                  year="2021"
                  title="Secondary Education"
                  subtitle="High School"
                  isInView={isInView}
                  delay={1}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const TimelineItem = ({
  year,
  title,
  subtitle,
  isInView,
  delay,
}: {
  year: string;
  title: string;
  subtitle: string;
  isInView: boolean;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={isInView ? { opacity: 1, scale: 1 } : {}}
    transition={{ duration: 0.5, delay }}
    className="relative"
  >
    <div className="flex items-center justify-center">
      <div className="glass p-4 rounded-lg border-primary/20 max-w-sm">
        <p className="text-primary font-semibold mb-1">{year}</p>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
    </div>
    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background"></div>
  </motion.div>
);

export default Experience;
