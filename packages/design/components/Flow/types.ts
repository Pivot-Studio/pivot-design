import { Edge, Node, ReactFlowProps } from "@xyflow/react";

export interface Props extends ReactFlowProps<Node, Edge>{
  defaultNodes?:Node[]
  defaultEdges?:Edge[]
}