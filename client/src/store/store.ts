import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authSlice } from "./auth/authSlice";
import { dashboardSlice } from "./dashboard/dashboardSlice";
import boardsSlice from "./boards/boardsSlice";

const authPersistConfig = {
  key: "auth",
  storage,
  blacklist: ["loading", "errorMessage"],
};

const dashboardPersistConfig = {
  key: "dashboard",
  storage,
  blacklist: [],
};

const boardPersistConfig = {
  key: "board",
  storage,
  blacklist: [],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authSlice.reducer);
const persistedDashboardReducer = persistReducer(dashboardPersistConfig, dashboardSlice.reducer);
const persistedBoardReducer = persistReducer(boardPersistConfig, boardsSlice);
export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    dashboard: persistedDashboardReducer,
    board: boardsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
