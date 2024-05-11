"use client";

import Flow from "@/components/Flow";
import { AgentContextProvider } from "@/context/AgentContext";
import { ModalProvider } from "@/context/ModalContext";
import { ReactFlowProvider } from "reactflow";

export default function Home() {
	return (
		<main className="w-full h-screen">
			<ReactFlowProvider>
				<AgentContextProvider>
					<ModalProvider>
						<Flow />
					</ModalProvider>
				</AgentContextProvider>
			</ReactFlowProvider>
		</main>
	);
}
