import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  counterValue: 0,
  colorMode: "light", 
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increaseCounter: (state) => {
      state.counterValue += 1;
    },
    decreaseCounter: (state) => {
      state.counterValue -= 1;
    },
    toggleColorMode: (state) => {
      // 切換顏色模式
      state.colorMode = state.colorMode === "light" ? "dark" : "light";
    },
  },
});

export const selectColorMode = (state) => state.counter.colorMode; // 修正選擇器
export const selectCounter = (state) => state.counter.counterValue;
export const { increaseCounter, decreaseCounter, toggleColorMode } = counterSlice.actions;

export default counterSlice.reducer;
