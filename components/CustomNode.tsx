import React, { FormEvent, memo, useState } from "react";
import { Edge, Handle, Node, Position } from "reactflow";
import { getId } from "./Flow";
import { useAgentContext } from "@/context/AgentContext";
import { useLayout } from "@/hooks/useLayout";

interface CustomNodeProps {
	data: any;
	id: string;
}

const CustomNode: React.FC<CustomNodeProps> = memo(({ id, data }) => {
	const [loading, setLoading] = useState(false);
	const { setNodes, setEdges } = useAgentContext();
	const { onLayout } = useLayout();

	async function handleNext(e: FormEvent) {
		e.preventDefault();
		let nodes: Node[] = [];
		let edges: Edge[] = [];
		try {
			setLoading(true);
			const response = await fetch(
				"https://pvanand-generate-subtopics.hf.space/generate_topics",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						user_input: data.label,
						num_topics: 5,
						previous_queries: data.prevQueries,
					}),
				},
			);
			const result = await response.json();
			console.log(result);

			result.topics.forEach((item: string, i: number) => {
				const newNode = {
					id: getId(),
					type: "custom",
					position: { x: 1000, y: i * 100 },
					data: { label: item, prevQueries: [...data.prevQueries, data.label] },
				};
				nodes.push(newNode);

				const edge = {
					id: `${id}-${newNode.id}`,
					animated: true,
					source: id,
					target: newNode.id,
				};

				edges.push(edge);
			});
			setNodes((prev) => {
				return [...prev, ...nodes];
			});
			setEdges((prev) => {
				return [...prev, ...edges];
			});
		} catch (error) {
			console.log(error);
		} finally {
			console.log(nodes, edges);
			setLoading(false);
		}
	}
	return (
		<>
			<Handle
				type="target"
				position={Position.Left}
				style={{ background: "#555" }}
				onConnect={(params) => console.log("handle onConnect", params)}
			/>
			<div className="bg-neutral-700 p-2 rounded-md flex gap-5">
				<h1>{id}</h1>
				<h1>{data.label}</h1>
				<button
					className="p-1 rounded-md bg-black text-white"
					onClick={handleNext}
				>
					{loading ? "fetching..." : "Next"}
				</button>
			</div>
			<Handle
				type="source"
				position={Position.Right}
				id="b"
				style={{ background: "#555" }}
			/>
		</>
	);
});

CustomNode.displayName = "CustomNode";

export default CustomNode;
