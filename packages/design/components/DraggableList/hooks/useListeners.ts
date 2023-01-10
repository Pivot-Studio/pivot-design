import { Activator } from '../context/types';
import { UniqueIdentifier } from '../types';

export const useListeners = (activator: Activator | null, id: UniqueIdentifier) => {
  if (!activator) return;
  return {
    [activator.eventName]: (event: Event) => {
      activator.handler(event, id);
    },
  };
};
