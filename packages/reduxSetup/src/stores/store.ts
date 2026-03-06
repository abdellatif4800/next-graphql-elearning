import { configureStore } from '@reduxjs/toolkit'
import authSliceReducer from '../slices/authSlice'
import tutorialSliceReducer from '../slices/tutrorialSlice'
import roadmapSliceReducer from '../slices/roadmapsSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      authSlice: authSliceReducer,
      tutorialSlice: tutorialSliceReducer,
      roadmapSlice: roadmapSliceReducer
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
