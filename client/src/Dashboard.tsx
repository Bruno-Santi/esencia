import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router/AppRouter";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#007bff", // color primario de tu aplicación
    },
    secondary: {
      main: "#6c757d", // color secundario de tu aplicación
    },
    // otros colores y configuraciones de paleta según sea necesario
  },
  // otros ajustes de tema como typography, breakpoints, etc.
});

export const Dashboard = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};
