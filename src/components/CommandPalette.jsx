import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Moon, Sun, Eye, Zap, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import useAppStore from '../store/useAppStore';

const CommandPalette = () => {
    const { isDark, toggleTheme } = useTheme();
    const {
        commandPaletteOpen,
        closeCommandPalette,
        sections,
        toggleHighContrast,
        isHighContrast,
        triggerEffect
    } = useAppStore();

    const [query, setQuery] = useState('');
    const inputRef = useRef(null);

    // Keyboard shortcut listener
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                useAppStore.getState().toggleCommandPalette();
            }
            if (e.key === 'Escape' && commandPaletteOpen) {
                closeCommandPalette();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [commandPaletteOpen, closeCommandPalette]);

    // Focus input when opened
    useEffect(() => {
        if (commandPaletteOpen && inputRef.current) {
            inputRef.current.focus();
        }
        setQuery('');
    }, [commandPaletteOpen]);

    const commands = [
        { id: 'theme', label: `Switch to ${isDark ? 'Light' : 'Dark'} Mode`, icon: isDark ? Sun : Moon, action: toggleTheme },
        { id: 'contrast', label: `${isHighContrast ? 'Disable' : 'Enable'} High Contrast`, icon: Eye, action: toggleHighContrast },
        { id: 'explode', label: 'Trigger Explode Effect', icon: Zap, action: () => triggerEffect('explode') },
        { id: 'pulse', label: 'Trigger Pulse Effect', icon: Zap, action: () => triggerEffect('pulse') },
        ...sections.map((section, index) => ({
            id: section.id,
            label: `Go to ${section.name}`,
            icon: null,
            action: () => {
                const el = document.getElementById(section.id);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            }
        }))
    ];

    const filteredCommands = commands.filter(cmd =>
        cmd.label.toLowerCase().includes(query.toLowerCase())
    );

    const executeCommand = (cmd) => {
        cmd.action();
        closeCommandPalette();
    };

    return (
        <AnimatePresence>
            {commandPaletteOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh]"
                    onClick={closeCommandPalette}
                >
                    {/* Backdrop */}
                    <div className={`absolute inset-0 ${isDark ? 'bg-black/80' : 'bg-white/80'} backdrop-blur-sm`} />

                    {/* Palette */}
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        onClick={(e) => e.stopPropagation()}
                        className={`relative w-full max-w-lg mx-4 overflow-hidden brutalist-border ${isDark ? 'bg-black/95 border-white/20' : 'bg-white/95 border-black/20'
                            }`}
                    >
                        {/* Search Input */}
                        <div className={`flex items-center gap-3 px-4 py-3 border-b ${isDark ? 'border-white/10' : 'border-black/10'
                            }`}>
                            <Search size={18} className="opacity-40" />
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Type a command or search..."
                                className={`flex-1 bg-transparent outline-none text-sm font-mono ${isDark ? 'text-white placeholder:text-white/30' : 'text-black placeholder:text-black/30'
                                    }`}
                            />
                            <button onClick={closeCommandPalette} className="opacity-40 hover:opacity-100">
                                <X size={18} />
                            </button>
                        </div>

                        {/* Commands List */}
                        <div className="max-h-[40vh] overflow-y-auto">
                            {filteredCommands.map((cmd, index) => (
                                <button
                                    key={cmd.id}
                                    onClick={() => executeCommand(cmd)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${isDark
                                            ? 'hover:bg-white/5 text-white/70 hover:text-white'
                                            : 'hover:bg-black/5 text-black/70 hover:text-black'
                                        }`}
                                >
                                    {cmd.icon && <cmd.icon size={16} className="opacity-50" />}
                                    {!cmd.icon && <span className="w-4 text-center text-[10px] opacity-30">{index + 1}</span>}
                                    <span className="text-sm">{cmd.label}</span>
                                </button>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className={`px-4 py-2 text-[10px] font-mono opacity-30 border-t ${isDark ? 'border-white/10' : 'border-black/10'
                            }`}>
                            Press <kbd className="px-1 py-0.5 bg-current/10 rounded">↵</kbd> to select · <kbd className="px-1 py-0.5 bg-current/10 rounded">ESC</kbd> to close
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CommandPalette;
