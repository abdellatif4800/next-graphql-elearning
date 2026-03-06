import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TurorialState {
  isPublic: boolean;
  editOrCreate: string;
  currentEditorTutorialId: string
}

const initialState: TurorialState = {
  isPublic: false,
  editOrCreate: "create",
  currentEditorTutorialId: ""
}

export const tutorialSlice = createSlice(
  {
    name: "tutorials",
    initialState,
    reducers: {
      setIsPublic: (state, action: PayloadAction<boolean>) => {
        state.isPublic = action.payload;
      },

      setEditOrCreate: (
        state,
        action: PayloadAction<"edit" | "create">
      ) => {
        state.editOrCreate = action.payload;
        console.log(action.payload);

      },

      setCurrentEditorTutorialId: (state, action: PayloadAction<string>) => {
        state.currentEditorTutorialId = action.payload
        console.log(action.payload)
      }
    }
  }
)

export const {
  setIsPublic, setEditOrCreate, setCurrentEditorTutorialId

} = tutorialSlice.actions
export default tutorialSlice.reducer
