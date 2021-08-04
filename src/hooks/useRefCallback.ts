import { useRef, useEffect, useCallback } from "react";

export const useRefCallback = <T extends any[]>(
  value: ((...args: T) => void) | undefined,
  deps?: React.DependencyList
): ((...args: T) => void) => {
  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;
  }, deps ?? [value]);

  const result = useCallback((...args: T) => {
    ref.current?.(...args);
  }, []);

  return result;
};
