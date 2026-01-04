import { createContext, useContext, useState, useCallback, useRef } from 'react';

const VoidSceneContext = createContext(null);

export const useVoidScene = () => {
    const context = useContext(VoidSceneContext);
    if (!context) {
        console.warn('[VoidSceneContext] useVoidScene called outside of provider');
        return { triggerEffect: () => { } };
    }
    return context;
};

export const VoidSceneProvider = ({ children }) => {
    const [activeEffect, setActiveEffect] = useState(null);
    const effectTimeoutRef = useRef(null);

    const triggerEffect = useCallback((effectType) => {
        console.log(`[VoidSceneContext] Triggering effect: ${effectType}`);

        // Clear any existing effect timeout
        if (effectTimeoutRef.current) {
            clearTimeout(effectTimeoutRef.current);
        }

        setActiveEffect(effectType);

        // Auto-clear effect after duration
        effectTimeoutRef.current = setTimeout(() => {
            setActiveEffect(null);
        }, 800); // Effect duration in ms
    }, []);

    return (
        <VoidSceneContext.Provider value={{ triggerEffect, activeEffect }}>
            {children}
        </VoidSceneContext.Provider>
    );
};

export default VoidSceneContext;
