export function useWorkers() {
  /** compiler web worker */
  const compilerWorker = new Worker(
    new URL('./compilerWorker.ts', import.meta.url),
    {
      type: 'module',
    }
  );

  return { compilerWorker };
}
