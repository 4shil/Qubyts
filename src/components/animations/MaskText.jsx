import { motion } from 'framer-motion';

const MaskText = ({ children, className = "", delay = 0 }) => (
    <div className={`overflow-hidden ${className}`}>
        <motion.div
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true, margin: "50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: delay }}
            className="will-animate"
        >
            {children}
        </motion.div>
    </div>
);

export default MaskText;
