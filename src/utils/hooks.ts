import { useEffect, useState, useCallback, useRef, useMemo, EffectCallback } from 'react';
import { generateId } from '.';

import * as hooks from './hooks'; // import this file into itself to default export everything
export default hooks;

// Usage: useMount(() => do something on mount);
// Usage Unmount: useMount(() => () => do something on unmount);
export function useMount(cb: EffectCallback) {
  useEffect(cb, []);
}

// Usage: useWhenValid(() => { do something because it's valid });
export function useWhenValid(cb: Function, param: any) {
  // Run the cb only when the param changes and is a valid parameter
  useEffect(() => {
    if (param) {
      cb();
    }
  }, [param]);
}

// Usage: const isMounted = useIsMounted(); ... if (isMounted()) { //do something}
export const useIsMounted = () => {
  const ref = useRef(false);
  useEffect(() => {
    ref.current = true;
    return () => {
      ref.current = false;
    };
  }, []);
  return () => ref.current;
};

// Usage: const forceUpdate = useForceUpdate(); ... forceUpdate();
export function useForceUpdate() {
  const [, setTick] = useState(0);
  const update = useCallback(() => {
    setTick((tick) => tick + 1);
  }, []);
  return update;
}

// Usage: const uniqueId = useUniqueId();
export function useUniqueId() {
  const value = useMemo(() => generateId(), []);
  return value;
}

// https://usehooks.com/useWindowSize/
// export function useWindowSize() {
//   const isClient = typeof window === 'object';

//   function getSize() {
//     return {
//       width: isClient ? window.innerWidth : undefined,
//       height: isClient ? window.innerHeight : undefined,
//     };
//   }

//   const [windowSize, setWindowSize] = useState(getSize);

//   useEffect(() => {
//     if (!isClient) {
//       return;
//     }

//     const handleResize = debounce(() => {
//       setWindowSize(getSize());
//     }, 50);

//     window.addEventListener('resize', handleResize);
//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []); // Empty array ensures that effect is only run on mount and unmount

//   return windowSize;
// }

/*
const [dbFunc] = useDebouncedCallback(async (q) => {
  await onUpdate(q);
}, 300);
dbFunc('test');
dbFunc('test2'); // Only this will get run
*/
export function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
  options: { maxWait?: number; leading?: boolean } = {},
): [T, () => void, () => void] {
  const maxWait = options.maxWait;
  const maxWaitHandler = useRef<undefined | number>();
  const maxWaitArgs: { current: any[] } = useRef([]);

  const leading = options.leading;
  const wasLeadingCalled: { current: boolean } = useRef(false);

  const functionTimeoutHandler = useRef<undefined | number>();
  const isComponentUnmounted = useRef(false);

  const debouncedFunction = useRef(callback);
  debouncedFunction.current = callback;

  const cancelDebouncedCallback: () => void = useCallback(() => {
    clearTimeout(functionTimeoutHandler.current);
    clearTimeout(maxWaitHandler.current);
    maxWaitHandler.current = undefined;
    maxWaitArgs.current = [];
    functionTimeoutHandler.current = undefined;
    wasLeadingCalled.current = false;
  }, []);

  useEffect(
    () => () => {
      // we use flag, as we allow to call callPending outside the hook
      isComponentUnmounted.current = true;
    },
    [],
  );

  const debouncedCallback = useCallback(
    (...args) => {
      maxWaitArgs.current = args;
      clearTimeout(functionTimeoutHandler.current);

      if (!functionTimeoutHandler.current && leading && !wasLeadingCalled.current) {
        debouncedFunction.current(...args);
        wasLeadingCalled.current = true;
        return;
      }

      // @ts-ignore
      functionTimeoutHandler.current = setTimeout(() => {
        cancelDebouncedCallback();

        if (!isComponentUnmounted.current) {
          debouncedFunction.current(...args);
        }
      }, delay);

      if (maxWait && !maxWaitHandler.current) {
        // @ts-ignore
        maxWaitHandler.current = setTimeout(() => {
          const args = maxWaitArgs.current;
          cancelDebouncedCallback();

          if (!isComponentUnmounted.current) {
            debouncedFunction.current.apply(null, args);
          }
        }, maxWait);
      }
    },
    [maxWait, delay, cancelDebouncedCallback, leading],
  );

  const callPending = () => {
    // Call pending callback only if we have anything in our queue
    if (!functionTimeoutHandler.current) {
      return;
    }

    debouncedFunction.current.apply(null, maxWaitArgs.current);
    cancelDebouncedCallback();
  };

  // At the moment, we use 3 args array so that we save backward compatibility
  return [debouncedCallback as T, cancelDebouncedCallback, callPending];
}
