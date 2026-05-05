import { motion } from "framer-motion";

interface Props {
  text: string;
  className?: string;
}

export const ScrollReveal = ({ text, className }: Props) => {
  const chars = text.split("");
  return (
    <motion.p
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.012 } } }}
    >
      {chars.map((c, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 8 },
            show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
          }}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {c}
        </motion.span>
      ))}
    </motion.p>
  );
};
