import { Data, UniqueIdentifier } from '../../types';

export type SortableData = Data<{
  sortable: {
    containerId: UniqueIdentifier;
    items: UniqueIdentifier[];
    index: number;
  };
}>;
