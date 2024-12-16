import { useEffect, useState } from "react"

export const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState<string>('');

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearInterval(handler);
    }, [value, delay]);

    return {
        debouncedValue: debouncedValue
    }
}