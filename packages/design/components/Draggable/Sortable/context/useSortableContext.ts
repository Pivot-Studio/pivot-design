import { useContext } from 'react';
import { Context } from '../context/SortableContext';

export default function useSortableContext() {
  return useContext(Context);
}
