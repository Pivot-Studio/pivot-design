import { MonacoEditorContextDescriptor } from './context';

export function reducer(state: MonacoEditorContextDescriptor, action): MonacoEditorContextDescriptor {
  switch (action.type) {
    case '': {
      return { ...state };
    }
    default:
      return { ...state };
  }
}
