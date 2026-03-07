"use client"

import { useState, useCallback } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Background, BackgroundVariant, MiniMap, Panel, Controls, BaseEdge, getStraightPath, type Edge, type Node, StepEdge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { TutorialNode } from './customComponents/TutorialNode';

// 1. Alias the Redux addEdge so it doesn't conflict with XYFlow's addEdge
import { setCurrentNode, updateNode, useDispatch, addEdge as reduxAddEdge } from '@repo/reduxSetup';

// 2. Define nodeTypes OUTSIDE the component to prevent re-renders, and bypass the strict type check
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const nodeTypes: any = { tutorial: TutorialNode };

// Define edgeTypes outside as well for the same performance reasons
const edgeTypes = {
  step: StepEdge,
};

const defaultEdgeOptions = {
  type: 'step',
};

interface ReactFlowComponentProps {
  nodes: Node[];
  edges: Edge[];
  setNodes?: React.Dispatch<React.SetStateAction<Node[]>>;
  setEdges?: React.Dispatch<React.SetStateAction<Edge[]>>;
  isEditable?: boolean; // optional flag for view mode
}

export function ReactFlowComponent(
  { nodes, edges, setNodes, setEdges, isEditable }: ReactFlowComponentProps
) {
  const dispatch = useDispatch();

  // Handle node changes (dragging, resizing)
  const onNodesChange = useCallback(
    (changes: any) => {
      if (!setNodes) return;
      setNodes((prevNodes) => {
        const updatedNodes = applyNodeChanges(changes, prevNodes);

        // Update each node that changed in Redux
        changes.forEach((change: any) => {
          if (change.type === 'position' || change.type === 'dimensions') {
            const node = updatedNodes.find((n) => n.id === change.id);
            if (node) {
              dispatch(updateNode({
                id: node.id,
                changes: {
                  position: node.position,
                  measured: node.measured, // if you track width/height
                },
              }));
            }
          }
        });

        return updatedNodes;
      });
    },
    [setNodes, dispatch]
  );

  const onEdgesChange = useCallback(
    (changes: any) => {
      if (!setEdges) return;
      setEdges((prevEdges) => applyEdgeChanges(changes, prevEdges));
    },
    [setEdges]
  );

  const onConnect = useCallback(
    (params: any) => {
      if (!setEdges) return;
      setEdges((prevEdges) => {
        const newEdges = addEdge(params, prevEdges);
        // Add edge to Redux
        const addedEdge = newEdges.find(
          e => !prevEdges.some(pe => pe.id === e.id)
        );
        // Use the aliased redux action here!
        if (addedEdge) dispatch(reduxAddEdge(addedEdge));
        return newEdges;
      });
    },
    [setEdges, dispatch]
  );

  const onNodeClick = (_: any, node: Node) => {
    dispatch(setCurrentNode(node));
  };

  return (
    <div className='h-full w-full'>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={isEditable ? onConnect : undefined}
        onNodeClick={onNodeClick}
        nodesDraggable={isEditable}
        nodesConnectable={isEditable}
        elementsSelectable={isEditable}
        defaultEdgeOptions={defaultEdgeOptions}
        edgeTypes={edgeTypes}
        fitView
      >
        <Background color="#ccc" variant={BackgroundVariant.Dots} />
        <Controls />
      </ReactFlow>
    </div>
  );
}
