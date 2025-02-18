import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface InitialState {
  isDarkMode: Boolean;
  isSideBarCollapsed: Boolean;
}
const initialState: InitialState = {
  isDarkMode: false,
  isSideBarCollapsed: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    toggleMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
    toggleSideBar: (state, action: PayloadAction<boolean>) => {
      state.isSideBarCollapsed = action.payload;
    },
  },
});
export const { toggleMode, toggleSideBar } = globalSlice.actions;
export default globalSlice.reducer;
