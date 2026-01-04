import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X } from 'lucide-react';

const GeminiTerminal = ({ isOpen, onClose }) => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([
        { role: 'system', text: 'Q-CORE v2.6.0 INITIALIZED... WAITING FOR INPUT.' }
    ]);
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    const handleSend = async () => {
        if (!input.trim()) return;
        const msg = input;
        setInput('');
        setHistory(p => [...p, { role: 'user', text: `> ${msg}` }]);
        setLoading(true);
        setTimeout(() => {
            setHistory(p => [...p, {
                role: 'ai',
                text: "Q-Core: Analysis complete. Entropy levels stable within 0.004%."
            }]);
            setLoading(false);
        }, 1000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60]"
                    />
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.95 }}
                        className="fixed inset-0 m-auto w-full max-w-2xl h-[600px] z-[70] px-4 pointer-events-auto flex flex-col"
                    >
                        <div className="bg-[#050505] border border-white/10 rounded-xl shadow-2xl flex flex-col h-full overflow-hidden font-mono">
                            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
                                <div className="flex items-center gap-2">
                                    <Terminal size={14} className="text-cyan-400" />
                                    <span className="text-[10px] text-white/60 tracking-widest">Q-CORE</span>
                                </div>
                                <button onClick={onClose} className="cursor-scale">
                                    <X size={16} className="text-white/40 hover:text-white" />
                                </button>
                            </div>
                            <div
                                ref={scrollRef}
                                className="flex-1 p-6 overflow-y-auto text-sm space-y-4 text-white/70"
                            >
                                {history.map((m, i) => (
                                    <div
                                        key={i}
                                        className={m.role === 'user' ? 'text-white' : 'text-cyan-200/60'}
                                    >
                                        {m.text}
                                    </div>
                                ))}
                                {loading && (
                                    <div className="text-cyan-400 animate-pulse">
                                        Processing Quantum States...
                                    </div>
                                )}
                            </div>
                            <div className="p-4 border-t border-white/10 bg-white/5">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                                    placeholder="Input command..."
                                    autoFocus
                                    className="w-full bg-transparent border-none outline-none text-white text-sm"
                                />
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default GeminiTerminal;
