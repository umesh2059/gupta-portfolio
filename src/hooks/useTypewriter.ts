import { useEffect, useState } from "react";

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Types `text` out once, one character at a time. */
export const useTypeOnce = (text: string, speed = 70, startDelay = 200) => {
  const [count, setCount] = useState(() => (reducedMotion() ? text.length : 0));

  useEffect(() => {
    if (count >= text.length) return;
    const t = setTimeout(() => setCount((c) => c + 1), count === 0 ? startDelay : speed);
    return () => clearTimeout(t);
  }, [count, text, speed, startDelay]);

  return { typed: text.slice(0, count), done: count >= text.length };
};

/** Types each word, pauses, deletes it, then moves to the next one, forever. */
export const useTypeLoop = (words: string[], pause = 1800) => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(() => (reducedMotion() ? words[0] : ""));
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reducedMotion()) return;
    const word = words[index % words.length];
    let delay = deleting ? 35 : 65;
    if (!deleting && text === word) delay = pause;
    if (deleting && text === "") delay = 250;

    const t = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true);
      else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => i + 1);
      } else setText(word.slice(0, text.length + (deleting ? -1 : 1)));
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, index, words, pause]);

  return text;
};
