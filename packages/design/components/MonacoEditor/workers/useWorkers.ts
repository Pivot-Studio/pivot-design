/** compiler web worker */
const compilerWorker = new Worker(
  new URL('./compilerWorker.ts', import.meta.url),
  {
    type: 'module',
  }
);

export function useWorkers() {
  return { compilerWorker };
}
