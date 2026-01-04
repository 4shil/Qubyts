import { motion } from 'framer-motion';

const SplitTextReveal = ({ children, className = "", delay = 0, type = "words" }) => {
    const text = typeof children === 'string' ? children : String(children);
    const items = type === "chars" ? text.split("") : text.split(" ");

    return (
        <div className={`inline-block ${className}`}>
            {items.map((item, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 50, rotateX: 20 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true, margin: "50px" }}
                    transition={{ duration: 0.6, delay: delay + (i * 0.03), ease: "easeOut" }}
                    className="inline-block will-animate origin-bottom"
                >
                    {item === " " ? "\u00A0" : item}
                    {type === "words" && i !== items.length - 1 && "\u00A0"}
                </motion.span>
            ))}
        </div>
    );
};

export default SplitTextReveal;
