import { motion } from 'framer-motion';

const StaggeredText = ({ text, className = "", delay = 0 }) => {
    if (!text) return null;
    const words = text.split(" ");
    return (
        <motion.p
            className={`flex flex-wrap gap-x-[0.25em] gap-y-[0.1em] ${className}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "50px" }}
            transition={{ staggerChildren: 0.02, delayChildren: delay }}
        >
            {words.map((word, i) => (
                <motion.span
                    key={i} className="inline-block will-animate"
                    initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                >{word}</motion.span>
            ))}
        </motion.p>
    );
};

export default StaggeredText;
