import { motion, Variants } from "framer-motion";

interface Props {
  text: string;
  className?: string;
  delay?: number;
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const word: Variants = {
  hidden: { y: 40, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring", damping: 14, stiffness: 100 } },
};

export const WordsPullUp = ({ text, className, delay = 0 }: Props) => (
  <motion.span
    className={className}
    style={{ display: "inline-block" }}
    variants={container}
    initial="hidden"
    animate="show"
    transition={{ delayChildren: delay }}
  >
    {text.split(" ").map((w, i) => (
      <motion.span key={i} variants={word} style={{ display: "inline-block", marginRight: "0.25em" }}>
        {w}
      </motion.span>
    ))}
  </motion.span>
);

interface MultiStyleProps {
  parts: { text: string; className?: string }[];
  className?: string;
}

export const WordsPullUpMultiStyle = ({ parts, className }: MultiStyleProps) => (
  <motion.span
    className={className}
    variants={container}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.4 }}
    style={{ display: "inline-block" }}
  >
    {parts.flatMap((p, pi) =>
      p.text.split(" ").map((w, i) => (
        <motion.span
          key={`${pi}-${i}`}
          variants={word}
          className={p.className}
          style={{ display: "inline-block", marginRight: "0.25em" }}
        >
          {w}
        </motion.span>
      ))
    )}
  </motion.span>
);
