// All portfolio content lives here. Edit this file to update the site.

export const profile = {
  name: "Umesh Gupta",
  title: "Full-Stack Developer",
  roles: ["Full-Stack Developer", "AI App Builder", "Freelance Web Developer"], // rotate under the name
  initials: "UG",
  tagline: "I build full-stack web apps — AI tools, e-commerce platforms and client websites that ship to production.",
  location: "Bangalore, India",
  timeZone: "Asia/Kolkata",
  email: "umeshg2059@gmail.com",
  phone: "", // e.g. "+91 87388 86270" — leave empty to keep it private
  photo: "/image.jpg",
  photoFocus: "52% 70%", // where your face is in the photo (x% y%); the frame zooms in on this point
  resumeUrl: "/resume.pdf",
  githubUsername: "umesh2059",
  openToWork: true,
  summary:
    "Final-year Computer Science student and full-stack developer who ships production web apps — from AI-powered tools to e-commerce platforms and client websites. I work mostly with React, TypeScript, Node.js and MongoDB, and I care about clean UI, fast pages and code that's easy to maintain.",
};

// The "Now" strip under the header. Update it whenever you start something new.
export const now = {
  building: "AI Influencer v2",
  learning: "Next.js 15 & Docker",
};

// Leave a link empty ("") to hide it.
export const socials = {
  github: "https://github.com/umesh2059",
  linkedin: "https://www.linkedin.com/in/umesh-gupta-976676309/",
  x: "", // e.g. "https://x.com/yourhandle"
  website: "https://www.umeshgupta.com.np/",
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  description: string;
  tech: string[];
};

export const experience: Experience[] = [
  {
    company: "Sonisoft IT",
    role: "Full-Stack Developer Intern",
    period: "Jun 2024 – Aug 2024",
    description:
      "Built responsive web apps with React and Node.js on client projects alongside senior developers. Implemented RESTful APIs, integrated third-party services and improved application performance by 30%.",
    tech: ["React", "Node.js", "Express", "REST API"],
  },
  {
    company: "Octanet Services Pvt. Ltd.",
    role: "Web Development Intern",
    period: "Jan 2024 – Mar 2024",
    description:
      "Built interactive interfaces with React and TypeScript, designed MongoDB schemas, took part in code reviews and agile sprints, and documented project codebases.",
    tech: ["React", "TypeScript", "MongoDB"],
  },
];

export type Project = {
  repo: string; // GitHub repo name under githubUsername — live stars/language come from the API
  title: string;
  subtitle: string;
  color: string; // Tailwind text color for the subtitle
  summary: string;
  tech: string[];
  live?: string;
};

export const projects: Project[] = [
  {
    repo: "Construction-Company",
    title: "Susta Construction",
    subtitle: "Client Website",
    color: "text-orange-600 dark:text-orange-400",
    summary:
      "Live website for a construction company. Visitors can explore projects, see upcoming events and apply for internships through an interactive, responsive interface.",
    tech: ["TypeScript", "React", "Tailwind CSS"],
    live: "https://www.sustacompany.com.np/",
  },
  {
    repo: "ecommerce",
    title: "E-Commerce Store",
    subtitle: "Full-Stack Shop",
    color: "text-pink-600 dark:text-pink-400",
    summary:
      "Users browse products, view details and buy securely online. An admin dashboard manages products, inventory and orders.",
    tech: ["TypeScript", "React", "Node.js"],
    live: "https://ecommerce-nine-theta-50.vercel.app",
  },
  {
    repo: "mind-whisper-ai-96",
    title: "Mind Whisper AI",
    subtitle: "AI Mental Health",
    color: "text-emerald-600 dark:text-emerald-400",
    summary:
      "AI mental-health support system. Users express their emotions and get guidance from an intelligent chatbot, bridging the gap to professional care.",
    tech: ["TypeScript", "React", "AI Chatbot"],
    live: "https://mind-whisper-ai-96.vercel.app",
  },
  {
    repo: "Ai-influencer",
    title: "AI Influencer",
    subtitle: "AI Content Platform",
    color: "text-violet-600 dark:text-violet-400",
    summary:
      "AI content platform with sign-up and login, where users generate AI images and videos to create influencer-style content quickly.",
    tech: ["TypeScript", "React", "Auth", "Generative AI"],
    live: "https://ai-influencer-ten.vercel.app",
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Frontend", items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML / CSS"] },
  { group: "Backend", items: ["Node.js", "Express", "REST APIs", "Firebase", "PHP"] },
  { group: "Database", items: ["PostgreSQL", "Prisma ORM", "Neon", "MongoDB", "MySQL"] },
  { group: "Tools", items: ["Git", "GitHub", "Vercel", "Postman", "VS Code"] },
];

export const education = [
  {
    degree: "B.Tech in Computer Science Engineering",
    school: "", // add your college name
    period: "2023 – 2027",
  },
  {
    degree: "Higher Secondary Education — Science",
    school: "",
    period: "2021 – 2022",
  },
  {
    degree: "Secondary Education",
    school: "",
    period: "2020",
  },
];
