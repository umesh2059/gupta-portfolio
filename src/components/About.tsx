import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Code2, Database, Layout, Server, Smartphone } from "lucide-react";
import { Card } from "@/components/ui/card";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skills = [
    { name: "React.js", icon: Layout, level: 90 },
    { name: "Node.js", icon: Server, level: 85 },
    { name: "MongoDB", icon: Database, level: 80 },
    { name: "Express.js", icon: Code2, level: 85 },
    { name: "TypeScript", icon: Code2, level: 75 },
    { name: "Responsive Design", icon: Smartphone, level: 90 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background"></div>
      
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A passionate learner constantly exploring new technologies
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Education & Bio */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <Card className="p-6 glass border-primary/20">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Education</h3>
                  <p className="text-muted-foreground mb-1">
                    Bachelor of Technology in Computer Science
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Third Year Student | Expected Graduation: 2026
                  </p>
                </div>
              </div>
            </Card>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">My Journey</h3>
              <p className="text-muted-foreground leading-relaxed">
                As a third-year Computer Science student, I've developed a strong
                passion for full-stack web development. My journey began with
                learning HTML and CSS, and has evolved into building complex
                applications using the MERN stack.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I believe in continuous learning and staying updated with the
                latest technologies. Every project is an opportunity to learn
                something new and push my boundaries as a developer.
              </p>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold mb-6">Technical Skills</h3>
            <div className="space-y-4">
              {skills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <motion.div key={skill.name} variants={itemVariants}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Icon className="h-5 w-5 text-primary" />
                        <span className="font-medium">{skill.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        className="h-full gradient-primary rounded-full"
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
