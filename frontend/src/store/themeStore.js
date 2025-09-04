import { createSlice } from "@reduxjs/toolkit";

const initialTheme = "dark";

const themeStore = createSlice({
  name: "theme",
  initialState: {
    theme: initialTheme,
  },
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
});

export const { toggleTheme } = themeStore.actions;
export default themeStore.reducer;
