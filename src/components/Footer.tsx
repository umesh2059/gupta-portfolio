import { Github, Linkedin, Mail, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Mail, href: "mailto:your.email@example.com", label: "Email" },
  ];

  return (
    <footer className="border-t border-border/40 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Full-Stack Developer. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="p-2 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>

          <div className="text-center md:text-right">
            <p className="text-sm text-muted-foreground">
              Built with React & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
