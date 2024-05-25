import { createSlice } from '@reduxjs/toolkit';

type IInitState = {
  count: number;
};

const initialState: IInitState = {
  count: 0,
};

const increment = (
  state: IInitState,
  action: { type: string; payload: number },
) => {
  state.count += action.payload;
};

const decrement = (
  state: IInitState,
  action: { type: string; payload: number },
) => {
  state.count -= action.payload;
};

const resetState = (state: IInitState) => {
  state.count = 0;
};

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    increment,
    decrement,
    resetState,
  },
});

export default testSlice.reducer;
export const testActions = testSlice.actions;
