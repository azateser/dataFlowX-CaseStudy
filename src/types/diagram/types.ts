import { Node, EdgeProps } from 'reactflow'

export interface ContextMenuState {
  show: boolean
  x: number
  y: number
  nodeId: string
  isTeam: boolean
}

export interface NodeStyle {
  background: string
  border: string
  borderRadius: string
  padding: string
  color: string
}

export interface NodeData {
  label: string
}

export interface DiagramNode extends Node {
  data: NodeData
  style: NodeStyle
}

export interface DiagramEdge extends Omit<EdgeProps, 'id'> {
  id: string
  style: {
    stroke: string
  }
}

export interface NodePosition {
  x: number
  y: number
}
