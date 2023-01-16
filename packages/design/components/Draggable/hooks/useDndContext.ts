import { useContext } from 'react';
import { Context } from '../context/context';

export default function useDndContext() {
  return useContext(Context);
}
