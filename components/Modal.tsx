import { FormEvent, ReactNode, useEffect, useState } from "react";
import { useModal } from "@/context/ModalContext";
import { Node, useReactFlow } from "reactflow";

type LookupType = {
	[key: string]: ReactNode;
};

export const Modal = () => {
	const { isOpen, closeModal, id } = useModal();
	const { getNode } = useReactFlow();
	const [currentNode, setCurrentNode] = useState<Node | null>(null);
	useEffect(() => {
		const node = getNode(id);
		if (!node) return;
		setCurrentNode(node);
	}, [id]);
	if (!isOpen) return null;

	async function generateReport() { }

	return (
		<div className="h-screen w-full flex sm:p-0 p-10 items-center z-50 bg-black/70 justify-center fixed top-0 left-0 rounded-md ">
			<div className="p-10  relative flex flex-col items-center justify-center gap-10 rounded-3xl bg-neutral-600">
				<button
					onClick={() => {
						closeModal();
					}}
					className="absolute top-2 right-2 "
				>
					close
				</button>
				<div className="flex flex-col gap-10 text-white">
					{currentNode?.data.label}
				</div>
			</div>
		</div>
	);
};
