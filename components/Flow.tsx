import { useAgentContext } from "@/context/AgentContext";
import React, { useCallback, useEffect } from "react";
import ReactFlow, {
	ReactFlowProvider,
	useNodesState,
	useEdgesState,
	addEdge,
	Controls,
	NodeTypes,
} from "reactflow";
import "reactflow/dist/style.css";
import { AgentPrompt } from "./AgentPrompt";
import CustomNode from "./CustomNode";
import { useLayout } from "@/hooks/useLayout";
import { Modal } from "./Modal";

const nodeTypes: NodeTypes = {
	custom: CustomNode,
};

const initialNodes = [
	{
		id: "provider-1",
		type: "input",
		data: { label: "Node 1" },
		position: { x: 250, y: 5 },
	},
	{ id: "provider-2", data: { label: "Node 2" }, position: { x: 100, y: 100 } },
	{ id: "provider-3", data: { label: "Node 3" }, position: { x: 400, y: 100 } },
	{ id: "provider-4", data: { label: "Node 4" }, position: { x: 400, y: 200 } },
];

const initialEdges = [
	{
		id: "provider-e1-2",
		source: "provider-1",
		target: "provider-2",
		animated: true,
	},
	{ id: "provider-e1-3", source: "provider-1", target: "provider-3" },
];

let id = 1;
export const getId = () => `${id++}`;
const Flow = () => {
	const {
		setEdges,
		setNodes,
		nodes,
		edges,
		onConnect,
		onNodesChange,
		onEdgesChange,
	} = useAgentContext();

	const { onLayout } = useLayout();

	return (
		<div
			className="relative flex justify-center items-center"
			style={{ width: "100vw", height: "100vh" }}
		>
			<Modal />
			<div className="absolute z-50 bottom-10 flex flex-col gap-2">
				<AgentPrompt />
				<div className="flex gap-4">
					<button
						className="p-2 rounded-md bg-neutral-500 text-white"
						onClick={() => onLayout("LR")}
					>
						Horizontal
					</button>
					<button
						className="p-2 rounded-md bg-neutral-500 text-white"
						onClick={() => onLayout("TB")}
					>
						Vertical
					</button>
				</div>
			</div>
			<ReactFlow
				nodeTypes={nodeTypes}
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				fitView
			>
				<Controls />
			</ReactFlow>
		</div>
	);
};

export default Flow;
