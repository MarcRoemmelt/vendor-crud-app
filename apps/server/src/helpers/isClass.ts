export const isClass = <T, A, C extends new (...args: A[]) => T>(fn: unknown): fn is C =>
    typeof fn === 'function' && /^\s*class/.test(fn.toString());
