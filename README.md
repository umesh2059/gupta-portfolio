# Umesh Gupta — Resume-Style Portfolio

A clean, single-page portfolio laid out like a resume. Visitors can scan my
experience, skills and projects the way they would read a CV, see live GitHub
stats, download my resume as a PDF, and reach me on LinkedIn, X, GitHub or email.

> **Status:** built.
> `public/resume.pdf` still needs to be added. See the open questions at the bottom.

---

## 1. What changes

| Today | After the redesign |
|---|---|
| Landing-page style with a typing animation, floating blobs and glass cards | Resume layout: a sticky sidebar with my profile and a main column of sections |
| 4 placeholder projects (Unsplash images, `github.com` links) | Real projects from [github.com/umesh2059](https://github.com/umesh2059), the ones I pick |
| The "Download Resume" button does nothing | Downloads `public/resume.pdf` |
| Footer links point to `github.com`, `linkedin.com`, `twitter.com` | Real links to GitHub, LinkedIn, X and email |
| No GitHub activity | A GitHub section with a contribution graph, stats and top languages |
| Contact form only shows a toast and never sends | Working form via Formspree or EmailJS, or a plain mailto (to be decided) |
| Data is hardcoded inside every component | All content lives in one file, `src/data/resume.ts` |

---

## 2. Page layout

A single dark column, 700px wide, using the Geist and Geist Mono fonts with indigo and sky accents:

```
UG                          Experience  Projects  Skills  GitHub   ← fixed nav, blurs on scroll
Umesh Gupta                                          [photo]
Full-Stack Developer · ● Open to work
One-line tagline
[GitHub] [LinkedIn] [X] [Email] [Resume ⬇]

EXPERIENCE ───────────────   role · company · dates · description · tech chips
PROJECTS ─────────────────   01 Name  subtitle            ↗ live  ⌥ code
SKILLS ───────────────────   Frontend / Backend / Database / Tools
EDUCATION ────────────────
GITHUB ACTIVITY ──────────   stats · languages · contribution graph
```

## 3. Features

- **Typed header:** `> umesh gupta▌` types itself out, and roles rotate underneath.
- **"Now" strip:** live local time in Bangalore, the last GitHub push (pulled live), and what I'm
  currently building and learning. Edit `now` in `resume.ts`.
- **Interactive terminal:** visitors type `help`, `whoami`, `projects`, `skills`, `contact`,
  `resume`, `email`, `theme` and more. It supports ↑/↓ history, Tab to autocomplete and Ctrl+L
  to clear, and has a few hidden easter eggs.
- **Command menu (Ctrl/⌘ + K):** jump to sections, copy email, download resume, switch theme,
  open socials.
- **Cursor spotlight:** a soft amber glow follows the mouse over a dot grid, and project and stat
  cards light up at their edges on hover. Turned off on touch screens and for reduced motion.
- **Light and dark themes:** dark by default, and the choice is remembered. `?theme=light` in the
  URL forces light mode.
- **Project cards:** live stars and last-update time from GitHub.
- **GitHub Activity:** repos, stars, followers, top languages and the contribution graph, all live.
- **Small touches:** scroll progress bar, copy-email button with a toast, back-to-top button,
  terminal-style 404 page.
- **Resume download:** `public/resume.pdf`.

## 4. Tech stack

Kept from the current project:
- React 18 + TypeScript + Vite
- Tailwind CSS + shadcn/ui
- framer-motion, for subtle fade-ins only
- lucide-react icons

Added:
- `react-github-calendar` for the contribution graph
- `@tanstack/react-query` (already installed) to fetch and cache GitHub API data

Also: `cmdk` for the command menu and `sonner` for toasts.

---

## 5. Folder structure (after the redesign)

```
gupta-portfolio/
├── public/
│   ├── image.jpg          # profile photo (existing)
│   ├── resume.pdf         # ← you provide this
│   └── og-image.png       # preview image for shared links
├── src/
│   ├── data/
│   │   └── resume.ts      # ★ ALL content: profile, links, experience, projects, skills…
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx       # name, photo, social buttons, resume
│   │   ├── Section.tsx    # shared section wrapper (heading + divider)
│   │   ├── Experience.tsx
│   │   ├── Projects.tsx   # ProjectCard + live repo stats
│   │   ├── GitHubStats.tsx
│   │   ├── Skills.tsx
│   │   ├── Education.tsx
│   │   └── ui/            # only the shadcn components that are used
│   ├── hooks/
│   │   └── useGitHub.ts   # fetch the user profile and repos
│   ├── pages/Index.tsx
│   └── index.css          # dark theme + animations
└── README.md
```

---

## 6. Updating content later

Everything is edited in **`src/data/resume.ts`**:

```ts
export const profile = {
  name: "Umesh Gupta",
  title: "Full-Stack Developer",
  location: "Bangalore, India",
  email: "umeshg2059@gmail.com",
  resumeUrl: "/resume.pdf",
  socials: {
    github:   "https://github.com/umesh2059",
    linkedin: "https://www.linkedin.com/in/umesh-gupta-976676309/",
    x:        "https://x.com/<your-handle>",
  },
};

export const projects = [
  {
    repo: "umesh2059/<repo-name>",    // live stars/forks/language come from GitHub
    title: "Project Name",
    summary: "One line on what it does.",
    highlights: ["What you built", "Impact or result"],
    tech: ["React", "Node.js"],
    live: "https://…",                 // optional
  },
];
```

To replace the resume, drop a new file at `public/resume.pdf`.

---

## 7. Run locally

```sh
npm install
npm run dev        # http://localhost:8080
npm run build      # production build in dist/
npm run preview    # preview the production build
```

## 8. Deploy

Works on **Vercel** or **Netlify**: import the repo and use build command
`npm run build` with output `dist`. GitHub Pages also works if `base` is set
in `vite.config.ts`.

---

## 9. Open questions (please answer before I build)

1. **Projects.** Which GitHub repos should be shown? Give the repo names, plus a
   live demo link for each if there is one.
2. **X / Twitter handle.** What is it? Any other links, such as LeetCode,
   Instagram or a blog?
3. **Resume PDF.** Put it at `public/resume.pdf`, or tell me its path.
4. **Content checks.** Is the current content correct?
   - The About section says both "third-year" and "fourth-year". Which one is right?
   - Internships: Sonisoft IT (Jun–Aug 2024) and Octanet (Jan–Mar 2024)
   - Phone `+91 8738886270`: show it publicly, or hide it?
   - Your college name for the Education section
5. **Contact form.** Should it really send email (Formspree, free with a sign-up),
   or should it be replaced with plain email and LinkedIn buttons?
6. **Style.** Minimal black and white like a printed resume, or keep the current
   purple gradient accent?
