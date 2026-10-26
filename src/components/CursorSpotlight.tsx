import { useEffect, useRef } from "react";

// A soft glow that follows the cursor, plus per-card border glow for elements with the .spot class.
const CursorSpotlight = () => {
  const glow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        glow.current?.style.setProperty("--x", `${e.clientX}px`);
        glow.current?.style.setProperty("--y", `${e.clientY}px`);
        if (glow.current) glow.current.style.opacity = "1";
        document.querySelectorAll<HTMLElement>(".spot").forEach((el) => {
          const r = el.getBoundingClientRect();
          el.style.setProperty("--mx", `${e.clientX - r.left}px`);
          el.style.setProperty("--my", `${e.clientY - r.top}px`);
        });
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <>
      <div aria-hidden className="dot-grid pointer-events-none fixed inset-0 -z-10" />
      <div
        ref={glow}
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-0 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(600px circle at var(--x, 50%) var(--y, 0px), rgb(var(--accent) / 0.07), transparent 45%)",
        }}
      />
    </>
  );
};

export default CursorSpotlight;
