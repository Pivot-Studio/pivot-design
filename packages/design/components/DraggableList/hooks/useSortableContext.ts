import { useContext } from 'react';
import { Context } from '../context/context';

export default function useSortableContext() {
  return useContext(Context);
}
