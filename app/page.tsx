"use client";

import Flow from "@/components/Flow";
import { AgentContextProvider } from "@/context/AgentContext";
import { ReactFlowProvider } from "reactflow";

export default function Home() {
	return (
		<main className="w-full h-screen">
			<ReactFlowProvider>
				<AgentContextProvider>
					<Flow />
				</AgentContextProvider>
			</ReactFlowProvider>
		</main>
	);
}
