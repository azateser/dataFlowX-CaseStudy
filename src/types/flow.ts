import { Node, EdgeProps } from 'reactflow'

export interface CustomNode extends Node {
  data: {
    label: string
  }
}

export interface CustomEdge extends Omit<EdgeProps, 'id'> {
  id: string
  data?: {
    label?: string
  }
}

export type FlowContextMenuEvent = {
  event: React.MouseEvent
  nodeId: string
  isTeam: boolean
}
