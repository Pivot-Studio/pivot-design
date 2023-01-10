import { Activator } from '../context/types';

export const useListeners = (activator: Activator | null) => {
  if (!activator) return;
  return {
    [activator.eventName]: activator.handler,
  };
};
