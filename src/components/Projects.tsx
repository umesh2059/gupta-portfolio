import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with cart, payments, and admin dashboard",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=500&q=80",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      github: "https://github.com",
      live: "https://example.com",
    },
    {
      title: "Social Media Dashboard",
      description: "Analytics dashboard for social media metrics with real-time updates",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80",
      tech: ["React", "Express", "Socket.io", "Chart.js"],
      github: "https://github.com",
      live: "https://example.com",
    },
    {
      title: "Task Management App",
      description: "Collaborative task manager with drag-and-drop and team features",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&q=80",
      tech: ["React", "Firebase", "Tailwind", "DnD Kit"],
      github: "https://github.com",
      live: "https://example.com",
    },
    {
      title: "Weather Forecast App",
      description: "Real-time weather application with location-based forecasts",
      image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=500&q=80",
      tech: ["React", "OpenWeather API", "Geolocation"],
      github: "https://github.com",
      live: "https://example.com",
    },
  ];

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Here are some of my recent projects showcasing my skills and experience
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 glass border-primary/20 h-full">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 gap-2">
                    <Button size="sm" variant="secondary" asChild>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Github className="h-4 w-4" />
                        Code
                      </a>
                    </Button>
                    <Button size="sm" className="gradient-primary" asChild>
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Live Demo
                      </a>
                    </Button>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
