import { useState, useEffect } from "react"

export function useDebouncedValue<T>(value: T, delayMS: number) {
    const [debouncedValue, setDebouncedValue] = useState<T>();

    useEffect(() => {
        const curTimeout = setTimeout(() => {
            setDebouncedValue(value);
        }, delayMS);

        return () => {
            clearTimeout(curTimeout);
        }
    }, [value, delayMS]);

    return debouncedValue;
}