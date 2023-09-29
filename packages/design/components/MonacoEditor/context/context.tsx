import { FC, PropsWithChildren, createContext, useContext, useReducer } from 'react';
import { reducer } from './reducer';

export interface MonacoEditorContextDescriptor {}

export const defaultMonacoEditorValue: MonacoEditorContextDescriptor = {};

const Context = createContext<MonacoEditorContextDescriptor>(defaultMonacoEditorValue);

export const EditorContextProvider: FC<PropsWithChildren<MonacoEditorContextDescriptor>> = ({ children, ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    ...defaultMonacoEditorValue,
    ...props,
  });
  return <Context.Provider value={{ ...state, dispatch }}>{children}</Context.Provider>;
};

export const useEditorContext = () => {
  return useContext(Context);
};
