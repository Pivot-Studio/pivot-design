import { getWindow } from '../../Draggable/utils/getWindow';

export function isDocument(node: Node): node is Document {
  const { Document } = getWindow(node);

  return node instanceof Document;
}
