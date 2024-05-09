"use client";

import React, {
	createContext,
	useState,
	useContext,
	ReactNode,
	useRef,
	Ref,
	Dispatch,
	SetStateAction,
	useCallback,
} from "react";
import {
	Edge,
	Node,
	OnConnect,
	OnEdgesChange,
	OnNodesChange,
	ReactFlowInstance,
	addEdge,
	useEdgesState,
	useNodesState,
} from "reactflow";

interface AgentContextType {
	onNodesChange: OnNodesChange;
	onEdgesChange: OnEdgesChange;
	reactFlowWrapper: Ref<HTMLDivElement>;
	nodes: Node[];
	edges: Edge[];
	setReactFlowInstance: Dispatch<SetStateAction<ReactFlowInstance | null>>;
	setNodes: Dispatch<SetStateAction<Node[]>>;
	setEdges: Dispatch<SetStateAction<Edge[]>>;
	reactFlowInstance: ReactFlowInstance | null;
	onConnect: OnConnect;
}

const AgentContext = createContext<AgentContextType>({
	onNodesChange: () => { },
	onEdgesChange: () => { },
	reactFlowWrapper: null,
	nodes: [],
	edges: [],
	setReactFlowInstance: () => { },
	setNodes: () => { },
	setEdges: () => { },
	reactFlowInstance: null,
	onConnect: () => { },
});

export const useAgentContext = () => useContext(AgentContext);

interface AgentContextProviderProps {
	children: ReactNode;
}

export interface CustomNodeData {
	color: string;
	label: string;
}

export const getId = () => `randomnode_${+new Date()}`;
export const AgentContextProvider: React.FC<AgentContextProviderProps> = ({
	children,
}) => {
	const [nodes, setNodes, onNodesChange] = useNodesState([]);
	const [edges, setEdges, onEdgesChange] = useEdgesState([]);
	const reactFlowWrapper = useRef(null);
	const [reactFlowInstance, setReactFlowInstance] =
		useState<ReactFlowInstance | null>(null);
	console.log(nodes, edges);
	const onConnect: OnConnect = useCallback(
		(params) => setEdges((els) => addEdge(params, els)),
		[],
	);

	return (
		<AgentContext.Provider
			value={{
				onConnect,
				nodes,
				edges,
				reactFlowWrapper,
				onEdgesChange,
				onNodesChange,
				setReactFlowInstance,
				setNodes,
				setEdges,
				reactFlowInstance,
			}}
		>
			{children}
		</AgentContext.Provider>
	);
};
