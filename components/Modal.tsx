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
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const node = getNode(id);
    if (!node) return;
    setCurrentNode(node);
  }, [id]);
  if (!isOpen) return null;

  async function generateReport() {
    try {
      setLoading(true);
      const response = await fetch(
        "https://pvanand-generate-subtopics.hf.space/generate_report",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            topic: currentNode.data.label,
            description: currentNode?.data.desc,
          }),
        },
      );
      const result = await response.json();
      console.log(result);
      setReport(result.report);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen w-full flex sm:p-0  items-center z-50 bg-black/70 justify-center fixed top-0 left-0 rounded-md ">
      <div className="p-10  relative flex w-[70vw] flex-col items-center justify-center gap-2 rounded-3xl bg-neutral-600">
        <button
          onClick={() => {
            closeModal();
            setCurrentNode(null);
            setReport("");
          }}
          className="absolute top-4 right-4 rounded-md bg-black text-white p-2"
        >
          close
        </button>
        <div className="flex flex-col gap-2 text-white">
          <h1 className="font-semibold text-xl">{currentNode?.data.label}</h1>
          <h1>{currentNode?.data.desc}</h1>
        </div>
        <div
          className="h-[30vh] w-full overflow-y-scroll"
          dangerouslySetInnerHTML={{ __html: report }}
        ></div>
        <button
          className="p-2 bg-black text-white rounded-md"
          onClick={generateReport}
        >
          {loading ? "Generating Report..." : "Generate Report"}
        </button>
      </div>
    </div>
  );
};
