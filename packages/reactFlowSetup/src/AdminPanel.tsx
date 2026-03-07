'use client'
import { type Node, type Edge } from "@xyflow/react";
import { useDispatch, useSelector, RootState } from "@repo/reduxSetup";
import {
  addNode,
  addTutorialNode,
  updateNode,
  addEdge,
  updateEdge,
  removeEdge,
  removeNode,
} from "@repo/reduxSetup";
import { TutorialDropdown } from "./customComponents/TutorialsDropdwon";

interface AdminPanelProps {
  currentNode: Node | null;
}

export function AdminPanel({ currentNode }: AdminPanelProps) {
  const dispatch = useDispatch();
  const edges = useSelector((state: RootState) => state.roadmapSlice.edges);

  const handleDeleteNode = () => {
    if (!currentNode) return;
    dispatch(removeNode(currentNode.id));
  };

  const handleUpdateNode = (field: 'label' | 'x' | 'y', value: string | number) => {
    if (!currentNode) return;
    const changes: any = {};
    if (field === 'label') changes.data = { ...currentNode.data, label: value };
    else changes.position = { ...currentNode.position, [field]: Number(value) };
    dispatch(updateNode({ id: currentNode.id, changes }));
  };

  const handleAddEdge = (targetNodeId: string) => {
    if (!currentNode) return;
    const newEdge: Edge = {
      id: `e${currentNode.id}-${targetNodeId}`,
      source: currentNode.id,
      target: targetNodeId,
      type: "step",
    };
    dispatch(addEdge(newEdge));
  };

  const handleUpdateEdge = (edgeId: string, field: 'source' | 'target', value: string) => {
    dispatch(updateEdge({ id: edgeId, changes: { [field]: value } }));
  };

  const handleRemoveEdge = (edgeId: string) => {
    dispatch(removeEdge(edgeId));
  };

  const connectedEdges = currentNode
    ? edges.filter(e => e.source === currentNode.id || e.target === currentNode.id)
    : [];

  return (
    <div className="p-4 space-y-4 border-l border-surface-800 bg-surface-900 text-text-primary">
      <TutorialDropdown />
      {currentNode && (
        <button
          onClick={handleDeleteNode}
          className="w-full py-2 px-4 rounded bg-red-600 text-white font-bold hover:bg-red-500 transition-all shadow-[4px_4px_0px_var(--surface-700)] mt-2"
        >
          Delete Node
        </button>
      )}

      {currentNode ? (
        <>
          {/* Node Details */}
          <div className="space-y-2">
            <label className="block text-sm text-text-secondary">ID</label>
            <input
              type="text"
              value={currentNode.id}
              disabled
              className="w-full border border-surface-800 p-1 bg-surface-800 text-text-primary rounded"
            />


            <label className="block text-sm text-text-secondary">Position X</label>
            <input
              type="number"
              value={currentNode.position?.x || 0}
              onChange={(e) => handleUpdateNode('x', Number(e.target.value))}
              className="w-full border border-surface-800 p-1 bg-surface-800 text-text-primary rounded"
            />

            <label className="block text-sm text-text-secondary">Position Y</label>
            <input
              type="number"
              value={currentNode.position?.y || 0}
              onChange={(e) => handleUpdateNode('y', Number(e.target.value))}
              className="w-full border border-surface-800 p-1 bg-surface-800 text-text-primary rounded"
            />
          </div>

          {/* Edge Controls */}
          <div className="mt-4">
            <h3 className="font-bold mb-2 text-teal-glow">Connected Edges</h3>
            {connectedEdges.length === 0 && <div className="text-text-secondary">No edges</div>}
            {connectedEdges.map(edge => (
              <div key={edge.id} className="border border-surface-800 p-2 mb-2 rounded bg-surface-800 space-y-1 shadow-[2px_2px_0px_var(--surface-700)]">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-text-primary">{edge.id}</span>
                  <button
                    className="text-red-500 text-sm hover:text-red-400"
                    onClick={() => handleRemoveEdge(edge.id)}
                  >
                    Remove
                  </button>
                </div>
                <div>
                  <label className="block text-xs text-text-secondary">Source</label>
                  <input
                    type="text"
                    value={edge.source}
                    onChange={(e) => handleUpdateEdge(edge.id, 'source', e.target.value)}
                    className="w-full border border-surface-700 p-1 bg-surface-700 text-text-primary rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs text-text-secondary">Target</label>
                  <input
                    type="text"
                    value={edge.target}
                    onChange={(e) => handleUpdateEdge(edge.id, 'target', e.target.value)}
                    className="w-full border border-surface-700 p-1 bg-surface-700 text-text-primary rounded"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Quick Add Edge */}
          <div className="mt-2">
            <label className="block text-sm text-text-secondary">Connect to Node ID:</label>
            <input
              type="text"
              placeholder="Target Node ID"
              id="targetNodeId"
              className="w-full border border-surface-700 p-1 mb-1 bg-surface-800 text-text-primary rounded"
            />
            <button
              className="w-full py-2 px-4 rounded bg-emerald-glow text-black font-bold hover:bg-teal-glow transition-all shadow-[4px_4px_0px_var(--surface-700)]"
              onClick={() => {
                const targetIdInput = document.getElementById('targetNodeId') as HTMLInputElement;
                if (targetIdInput?.value) handleAddEdge(targetIdInput.value);
                targetIdInput.value = '';
              }}
            >
              Add Edge
            </button>
          </div>
        </>
      ) : (
        <div className="text-text-secondary">Select a node to edit</div>
      )}
    </div>
  );
}
