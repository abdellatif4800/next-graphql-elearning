import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Node, Edge } from "@xyflow/react";

interface RoadmapState {
  nodes: Node[];
  edges: Edge[];
  currentNode: Node | null;
}

const initialState: RoadmapState = {
  nodes: [],
  edges: [],
  currentNode: null,
};

interface TutorialNodeData {
  tutorial: any; // You can type this more strictly if you have a Tutorial type
}

export const roadmapSlice = createSlice(
  {
    name: "roadmaps",
    initialState,
    reducers: {

      addTutorialNode: (state, action: PayloadAction<{ tutorial: any; position?: { x: number; y: number } }>) => {
        const id = `t${state.nodes.length + 1}`;
        const newNode: Node<TutorialNodeData> = {
          id,
          type: "tutorial", // use this in React Flow
          position: action.payload.position || { x: 100, y: 100 },
          data: { tutorial: action.payload.tutorial },
        };
        state.nodes.push(newNode)
        state.currentNode = newNode;
        console.log("newNode", newNode);

      },


      // Update a node by ID
      updateNode: (state, action: PayloadAction<{ id: string; changes: Partial<Node> }>) => {
        const index = state.nodes.findIndex(n => n.id === action.payload.id);
        if (index !== -1) {
          state.nodes[index] = { ...state.nodes[index], ...action.payload.changes };
          if (state.currentNode?.id === action.payload.id) {
            state.currentNode = state.nodes[index]; // sync selected node
          }
        }

      },

      // Set current node
      setCurrentNode: (state, action: PayloadAction<Node | null>) => {
        state.currentNode = action.payload;
      },

      // Remove node
      removeNode: (state, action: PayloadAction<string>) => {
        state.nodes = state.nodes.filter(n => n.id !== action.payload);
        if (state.currentNode?.id === action.payload) state.currentNode = null;
        state.edges = state.edges.filter(e => e.source !== action.payload && e.target !== action.payload);
      },

      // Add edge
      addEdge: (state, action: PayloadAction<Edge>) => {
        state.edges.push(action.payload);
        console.log(state.edges);

      },

      // Update edges if needed
      setEdges: (state, action: PayloadAction<Edge[]>) => {
        state.edges = action.payload;
      },
      setNodes: (state, action: PayloadAction<Node[]>) => {
        state.nodes = action.payload;
        state.currentNode = null;
      },
      updateEdge: (state, action: PayloadAction<{ id: string; changes: Partial<Edge> }>) => {
        const index = state.edges.findIndex(e => e.id === action.payload.id);
        if (index !== -1) {
          state.edges[index] = { ...state.edges[index], ...action.payload.changes };
        }
      },

      removeEdge: (state, action: PayloadAction<string>) => {
        state.edges = state.edges.filter(e => e.id !== action.payload);
      }


    },
  }
)

export const {
  addTutorialNode, addNode, updateNode, removeNode, setCurrentNode, addEdge, setEdges, setNodes, updateEdge, removeEdge
} = roadmapSlice.actions
export default roadmapSlice.reducer
