import { useAgentContext } from "@/context/AgentContext";
import Dagre from "@dagrejs/dagre";
import React, { useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  Panel,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from "reactflow";

import "reactflow/dist/style.css";

const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

export const getLayoutedElements = (nodes, edges, options) => {
  g.setGraph({ rankdir: options.direction });

  edges.forEach((edge) => g.setEdge(edge.source, edge.target));
  nodes.forEach((node) => g.setNode(node.id, node));

  Dagre.layout(g);

  return {
    nodes: nodes.map((node) => {
      const { x, y } = g.node(node.id);

      return { ...node, position: { x, y } };
    }),
    edges,
  };
};

export const useLayout = () => {
  const { fitView } = useReactFlow();
  const { nodes, edges, setNodes, setEdges } = useAgentContext();

  const onLayout = useCallback(
    (direction) => {
      console.log("this ran", nodes, edges);
      const layouted = getLayoutedElements(nodes, edges, { direction });

      setNodes([...layouted.nodes]);
      setEdges([...layouted.edges]);

      window.requestAnimationFrame(() => {
        fitView();
      });
    },
    [nodes, edges],
  );

  return { onLayout };
};
