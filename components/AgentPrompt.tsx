import { useAgentContext } from "@/context/AgentContext";
import { FormEvent, useEffect, useState } from "react";
import { getId } from "./Flow";
import { Edge, Node, useReactFlow } from "reactflow";
import { getLayoutedElements, useLayout } from "@/hooks/useLayout";

export const AgentPrompt = () => {
	const [prompt, setPrompt] = useState("");
	const [loading, setLoading] = useState(false);
	const { setEdges, setNodes } = useAgentContext();
	const { onLayout } = useLayout();
	const { fitView } = useReactFlow();
	useEffect(() => {
		if (!loading) {
			window.requestAnimationFrame(() => {
				fitView();
			});
		}
	}, [loading]);

	async function handlePrompt(e: FormEvent) {
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
						user_input: prompt,
						num_topics: 10,
						previous_queries: [],
					}),
				},
			);
			const data = await response.json();
			console.log(data);

			const firstNode = {
				id: getId(),
				type: "custom",
				data: { label: prompt, prevQueries: [], desc: "" },
			};
			nodes.push(firstNode);

			data.topics.forEach((item: string[], i: number) => {
				const newNode = {
					id: getId(),
					type: "custom",
					data: { label: item[0], prevQueries: [prompt], desc: item[1] },
				};
				nodes.push(newNode);

				const edge = {
					id: `${firstNode.id}-${newNode.id}`,
					animated: true,
					source: firstNode.id,
					target: newNode.id,
				};

				edges.push(edge);
			});
			const layouted = getLayoutedElements(nodes, edges, { direction: "LR" });

			setNodes([...layouted.nodes]);
			setEdges([...layouted.edges]);
		} catch (error) {
			console.log(error);
		} finally {
			console.log(nodes, edges);
			setLoading(false);
		}
	}
	return (
		<form onSubmit={handlePrompt} className="flex gap-5 items-center">
			<input
				value={prompt}
				onChange={(e) => setPrompt(e.target.value)}
				className="p-2 rounded-md text-black"
				placeholder="Enter prompt..."
			/>
			<button className="p-2 rounded-md bg-white text-black">
				{loading ? "Asking..." : "Ask"}
			</button>
		</form>
	);
};
