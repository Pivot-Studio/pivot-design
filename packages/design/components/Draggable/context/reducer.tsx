import Manager from './manager';
import { ActionType, DragActionEnum, State } from './types';

export function reducer(state: State, action: ActionType) {
  const { manager } = state;
  switch (action.type) {
    case DragActionEnum.ACTIVATED: {
      return { ...state, activeId: action.payload.activeId, container: action.payload.container };
    }
    case DragActionEnum.INACTIVATED: {
      return { ...state, activeId: '' };
    }
    case DragActionEnum.PUSH_NODE: {
      manager.push(action.payload.node, action.payload.type);
      return { ...state };
    }
    case DragActionEnum.REMOVE_NODE: {
      manager.remove(action.payload.id, action.payload.type);
      return { ...state };
    }
    case DragActionEnum.TRANSFORM: {
      return {
        ...state,
        transform: action.payload.transform,
        container: action.payload.container,
      };
    }
    default:
      return { ...state };
  }
}
export const initialState = () => ({
  activeId: '',
  container: '',
  manager: new Manager(),
  transform: {
    x: 0,
    y: 0,
  },
  activator: null,
});
