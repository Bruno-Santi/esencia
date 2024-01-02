import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authSlice } from "./auth/authSlice";
import { dashboardSlice } from "./dashboard/dashboardSlice";

// Configuración para persistir el reducer 'auth'
const authPersistConfig = {
  key: "auth",
  storage,
  blacklist: ["loading", "errorMessage"], // Opciones para excluir propiedades específicas del estado
};

// Configuración para persistir el reducer 'dashboard'
const dashboardPersistConfig = {
  key: "dashboard",
  storage,
  blacklist: [], // Opciones para excluir propiedades específicas del estado
};

const persistedAuthReducer = persistReducer(authPersistConfig, authSlice.reducer);
const persistedDashboardReducer = persistReducer(dashboardPersistConfig, dashboardSlice.reducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    dashboard: persistedDashboardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
