import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const WORDS = ["Caribbean.", "Rum.", "Flavour.", "Music.", "Nightlife."];

export default function TypingWord({ className = "", startDelay = 0 }) {
  const reduce = useReducedMotion();
  const [started, setStarted] = useState(reduce);
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState(reduce ? WORDS[0] : "");
  const [deleting, setDeleting] = useState(false);

  // Don't start typing until the entrance animation has actually
  // revealed this element — otherwise it types silently while invisible.
  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(t);
  }, [reduce, startDelay]);

  useEffect(() => {
    if (!started || reduce) return;
    const current = WORDS[wordIndex];
    let timeout;

    if (!deleting && text.length < current.length) {
      timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), 75);
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1200);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), 40);
    } else if (deleting && text.length === 0) {
      timeout = setTimeout(() => {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % WORDS.length);
      }, 250);
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, started, reduce]);

  return (
    <span className={className}>
      {text}
      {!reduce && (
        <span className="ml-0.5 inline-block h-[0.9em] w-[2px] animate-pulse bg-current align-middle" />
      )}
    </span>
  );
}
