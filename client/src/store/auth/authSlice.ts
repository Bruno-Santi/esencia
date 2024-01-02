import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../dashboard";
import { AuthState } from "./interfaces";

// Definición de la interfaz AuthState

// UserType debería ser reemplazado con el tipo real de tu usuario si es necesario

// Obtén el usuario del almacenamiento local
const userLogged = localStorage.getItem("userLogged");

// Estado inicial basado en la interfaz AuthState
const initialState: AuthState = {
  status: userLogged ? "authenticated" : "non-authenticated",
  user: userLogged ? JSON.parse(userLogged) : null,
  errorMessage: null,
  errorRegisterMessage: null,
  loading: false,
};

// Crea el slice utilizando el estado y las funciones definidas
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onChecking: (state) => {
      state.status = "checking";
      state.user = null;
      state.errorMessage = null;
      state.loading = true;
    },
    onLogin: (state, action: PayloadAction<User>) => {
      state.status = "authenticated";
      state.user = action.payload;
      state.errorMessage = null;
      state.loading = false;
    },
    onLogOut: (state, action: PayloadAction<string | null>) => {
      state.status = "non-authenticated";
      state.user = null;
      state.errorMessage = action.payload;
      state.loading = false;
    },
    onLogOutRegister: (state, action: PayloadAction<string | null>) => {
      state.status = "not-authenticated";
      state.user = null;
      state.errorMessage = null;
      state.errorRegisterMessage = action.payload || null;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = null;
      state.errorRegisterMessage = null;
    },
  },
});

export const { onChecking, onLogin, onLogOut, clearErrorMessage, onLogOutRegister } = authSlice.actions;

export default authSlice.reducer;
