import { createSlice } from "@reduxjs/toolkit";


const videoStore = createSlice({
  name: "video",
  initialState: {
    isMuted: true,
    videos: [],
  },
  reducers: {
    setMuted: (state) => {
      state.isMuted = !state.isMuted;
    },
    setVideos: (state, action) => {
      state.videos = Array.isArray(action.payload) ? action.payload : [];
    },
  },
});

export const { setMuted, setVideos } = videoStore.actions;
export default videoStore.reducer;

