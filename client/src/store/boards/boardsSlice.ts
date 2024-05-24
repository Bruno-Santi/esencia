import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loadingBoards: false,
  boards: [],
  activeBoard: [],
};

export const boardsSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    onLoadBoards: (state) => {
      state.loadingBoards = true;
    },
    setTeamBoards: (state, { payload }) => {
      state.loadingBoards = false;
      state.boards = payload;
    },
    setActiveBoard: (state, { payload }) => {
      state.loadingBoards = false;
      state.activeBoard = payload;
    },
    cleanBoards: (state) => {
      state.activeBoard = [];
      state.boards = [];
    },
    updateBoard: (state, { payload }) => {
      const boardIndex = state.boards.findIndex((board) => board._id === payload._id);

      if (boardIndex !== -1) {
        state.boards[boardIndex] = payload;
      }

      if (state.activeBoard._id === payload._id) {
        state.activeBoard = payload;
      }
    },
  },
});

export const { onLoadBoards, setTeamBoards, setActiveBoard, cleanBoards, updateBoard } = boardsSlice.actions;

export default boardsSlice.reducer;
