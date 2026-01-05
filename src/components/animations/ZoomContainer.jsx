import { motion } from 'framer-motion';

const ZoomContainer = ({ children, className = "" }) => (
    <motion.div
        initial={{ opacity: 0, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "0px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={className}
    >{children}</motion.div>
);

export default ZoomContainer;
