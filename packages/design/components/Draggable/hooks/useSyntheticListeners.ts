import { Activator } from '../context/types';
import { UniqueIdentifier } from '../types';

export const useSyntheticListeners = (activator: Activator | null, id: UniqueIdentifier) => {
  if (!activator) return;
  return {
    [activator.eventName]: (event: Event) => {
      activator.handler(event, id);
    },
  };
};
