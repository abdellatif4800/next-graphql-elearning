import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// We remove the Node and Edge imports from @xyflow/react completely here!
// This stops Immer from recursively serializing massive DOM types and crashing TS.

export interface RoadmapState {
  nodes: any[];
  edges: any[];
  currentNode: any | null;
}

const initialState: RoadmapState = {
  nodes: [],
  edges: [],
  currentNode: null,
};

export const roadmapSlice = createSlice({
  name: "roadmaps",
  initialState,
  reducers: {
    addTutorialNode: (state, action: PayloadAction<{ tutorial: any; position?: { x: number; y: number } }>) => {
      const id = `t${state.nodes.length + 1}`;
      const newNode = {
        id,
        type: "tutorial",
        position: action.payload.position || { x: 100, y: 100 },
        data: { tutorial: action.payload.tutorial },
      };

      state.nodes.push(newNode);
      state.currentNode = newNode;
    },

    addNode: (state, action: PayloadAction<any>) => {
      state.nodes.push(action.payload);
    },

    updateNode: (state, action: PayloadAction<{ id: string; changes: any }>) => {
      const index = state.nodes.findIndex(n => n.id === action.payload.id);
      if (index !== -1) {
        state.nodes[index] = { ...state.nodes[index], ...action.payload.changes };
        if (state.currentNode?.id === action.payload.id) {
          state.currentNode = state.nodes[index];
        }
      }
    },

    setCurrentNode: (state, action: PayloadAction<any | null>) => {
      state.currentNode = action.payload;
    },

    removeNode: (state, action: PayloadAction<string>) => {
      state.nodes = state.nodes.filter(n => n.id !== action.payload);
      if (state.currentNode?.id === action.payload) state.currentNode = null;
      state.edges = state.edges.filter(e => e.source !== action.payload && e.target !== action.payload);
    },

    addEdge: (state, action: PayloadAction<any>) => {
      state.edges.push(action.payload);
    },

    setEdges: (state, action: PayloadAction<any[]>) => {
      state.edges = action.payload;
    },

    setNodes: (state, action: PayloadAction<any[]>) => {
      state.nodes = action.payload;
      state.currentNode = null;
    },

    updateEdge: (state, action: PayloadAction<{ id: string; changes: any }>) => {
      const index = state.edges.findIndex(e => e.id === action.payload.id);
      if (index !== -1) {
        state.edges[index] = { ...state.edges[index], ...action.payload.changes };
      }
    },

    removeEdge: (state, action: PayloadAction<string>) => {
      state.edges = state.edges.filter(e => e.id !== action.payload);
    }
  },
});

export const {
  addTutorialNode,
  addNode,
  updateNode,
  removeNode,
  setCurrentNode,
  addEdge,
  setEdges,
  setNodes,
  updateEdge,
  removeEdge
} = roadmapSlice.actions;

export default roadmapSlice.reducer;
