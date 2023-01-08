import Manager from './manager';
import { ActionType, DragActionEnum, State } from './types';

export function reducer(state: State, action: ActionType) {
  const { manager } = state;
  switch (action.type) {
    case DragActionEnum.ACTIVATED: {
      return { ...state, activeId: action.payload };
    }
    case DragActionEnum.INACTIVATED: {
      return { ...state, activeId: '' };
    }
    case DragActionEnum.PUSH_NODE: {
      manager.push(action.payload);
      return { ...state, manager };
    }
    case DragActionEnum.TRANSFORM: {
      return {
        ...state,
        transform: action.payload,
      };
    }
    default:
      return { ...state };
  }
}
export const initialState: State = {
  activeId: '',
  manager: new Manager(),
  transform: {
    x: 0,
    y: 0,
  },
};
