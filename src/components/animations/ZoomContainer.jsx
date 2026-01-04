import { motion } from 'framer-motion';

const ZoomContainer = ({ children, className = "" }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "50px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={className}
    >{children}</motion.div>
);

export default ZoomContainer;
