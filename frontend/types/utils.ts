export type Awaited<T> = T extends Promise<infer U> ? U : T;

export type FirstArg<T> = T extends (arg: infer A) => any ? Awaited<A> : never;

// Optional: Your Diff helper if needed
export type Diff<A, B, K extends keyof any> =
  Omit<A, K> & Omit<B, K>; // Simplified version
