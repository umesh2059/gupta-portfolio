import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const [text, setText] = useState("");
  const roles = [
    "Full-Stack Developer",
    "MERN Stack Enthusiast",
    "React Developer",
    "Node.js Developer",
  ];
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (text.length < currentRole.length) {
            setText(currentRole.slice(0, text.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 1500);
          }
        } else {
          if (text.length > 0) {
            setText(currentRole.slice(0, text.length - 1));
          } else {
            setIsDeleting(false);
            setRoleIndex((roleIndex + 1) % roles.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex, roles]);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 gradient-primary opacity-10 animate-pulse"></div>
      <div className="absolute inset-0 bg-background/50"></div>

      {/* Floating shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }}></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-2"
          >
            <p className="text-lg text-muted-foreground">Hello, I'm</p>
            <h1 className="text-5xl md:text-7xl font-bold text-gradient">
              Your Name
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="h-16 md:h-20"
          >
            <h2 className="text-2xl md:text-4xl font-semibold text-foreground">
              {text}
              <span className="animate-pulse">|</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Third-year Computer Science student passionate about building
            innovative web applications and solving complex problems
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6"
          >
            <Button size="lg" className="gradient-primary text-white group">
              <a href="#contact" className="flex items-center">
                Get In Touch
                <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="group">
              <Download className="mr-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
              Download Resume
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex gap-4 justify-center pt-8"
          >
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:your.email@example.com"
              className="p-3 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
            >
              <Mail className="h-5 w-5" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <ArrowDown className="h-6 w-6 text-muted-foreground animate-bounce" />
      </motion.div>
    </section>
  );
};

export default Hero;
