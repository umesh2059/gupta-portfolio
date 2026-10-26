import { toast } from "sonner";
import { profile } from "@/data/resume";

export const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText(profile.email);
    toast.success("Email copied", { description: profile.email });
  } catch {
    window.location.href = `mailto:${profile.email}`;
  }
};

export const resumeFileName = `${profile.name.replace(/\s/g, "_")}_Resume.pdf`;

/** Downloads the resume straight to the visitor's device (no new tab, no PDF viewer). */
export const downloadResume = async () => {
  const id = toast.loading("Preparing resume…");
  try {
    const res = await fetch(profile.resumeUrl);
    const blob = await res.blob();
    // A missing file falls back to index.html on most hosts, so check it's really a PDF.
    if (!res.ok || !blob.type.includes("pdf")) throw new Error("not a pdf");
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = resumeFileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast.success("Resume downloaded", { id, description: resumeFileName });
  } catch {
    toast.error("Resume isn't available right now", {
      id,
      description: `Email me at ${profile.email} and I'll send it over.`,
    });
  }
};

export const scrollToSection = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export const OPEN_COMMAND_MENU = "open-command-menu";
export const openCommandMenu = () => window.dispatchEvent(new Event(OPEN_COMMAND_MENU));

export const focusTerminal = () => {
  scrollToSection("terminal");
  setTimeout(() => document.getElementById("terminal-input")?.focus({ preventScroll: true }), 400);
};
