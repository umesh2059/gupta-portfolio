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

export const downloadResume = () => {
  const a = document.createElement("a");
  a.href = profile.resumeUrl;
  a.download = `${profile.name.replace(/\s/g, "_")}_Resume.pdf`;
  a.click();
};

export const scrollToSection = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export const OPEN_COMMAND_MENU = "open-command-menu";
export const openCommandMenu = () => window.dispatchEvent(new Event(OPEN_COMMAND_MENU));

export const focusTerminal = () => {
  scrollToSection("terminal");
  setTimeout(() => document.getElementById("terminal-input")?.focus({ preventScroll: true }), 400);
};
