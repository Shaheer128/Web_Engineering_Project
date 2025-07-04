import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WidgetState {
  positions: Record<string, { x: number; y: number }>;
}

const initialState: WidgetState = {
  positions: {},
};

export const widgetSlice = createSlice({
  name: "widgets",
  initialState,
  reducers: {
    updateWidgetPosition: (
      state,
      action: PayloadAction<{ id: string; position: { x: number; y: number } }>
    ) => {
      state.positions[action.payload.id] = action.payload.position;
    },
  },
});

export const { updateWidgetPosition } = widgetSlice.actions;
export default widgetSlice.reducer;