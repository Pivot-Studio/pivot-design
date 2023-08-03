import { useContext } from 'react';
import { Context } from './context';

export default function useDndContext() {
  return useContext(Context);
}
