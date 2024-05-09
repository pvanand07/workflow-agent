import { useAgentContext } from "@/context/AgentContext";
import { useState } from "react";

let id = 1;
const getId = () => `${id++}`;

export const AgentPrompt = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const { setEdges, setNodes } = useAgentContext();

  async function handlePrompt(e: FormEvent) {
    e.preventDefault();
    let nodes = [];
    let edges = [];
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
        position: { x: 100, y: 100 },
        data: { label: prompt },
      };
      nodes.push(firstNode);

      data.topics.forEach((item, i) => {
        const newNode = {
          id: getId(),
          type: "custom",
          position: { x: 500, y: i * 100 },
          data: { label: item },
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
      setNodes(nodes);
      setEdges(edges);
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
