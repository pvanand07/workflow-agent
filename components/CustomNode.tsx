import React, { memo } from "react";
import { Handle, Position } from "reactflow";

interface CustomNodeProps {
  data: any;
}

const CustomNode: React.FC<CustomNodeProps> = memo(({ data }) => {
  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
      <div className="bg-neutral-700 p-2 rounded-md flex gap-5">
        <h1>{data.label}</h1>
        <button className="p-1 rounded-md bg-black text-white">Next</button>
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
