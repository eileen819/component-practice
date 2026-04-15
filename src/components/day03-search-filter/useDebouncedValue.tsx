import { useEffect, useRef, useState } from "react";

export default function useDebouncedValue<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [value, delay]);

  return debounced;
}
