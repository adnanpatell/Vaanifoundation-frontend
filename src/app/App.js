import React, { Suspense, useState, useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import JumboApp from "@jumbo/components/JumboApp";
import AppLayout from "./AppLayout";
import JumboTheme from "@jumbo/components/JumboTheme";
import AppRoutes from "./AppRoutes";
import configureStore, { history } from "./redux/store";
import JumboDialog from "@jumbo/components/JumboDialog";
import JumboDialogProvider from "@jumbo/components/JumboDialog/JumboDialogProvider";
import { SnackbarProvider } from "notistack";
import AppProvider from "./AppProvider";
import { config } from "./config/main";
import JumboRTL from "@jumbo/JumboRTL/JumboRTL";
import Div from "@jumbo/shared/Div";
import { CircularProgress } from "@mui/material";
import JumboAuthProvider from "@jumbo/components/JumboAuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { io } from "socket.io-client";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const store = configureStore();

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_API_URL);
    setSocket(newSocket);

    return () => newSocket.close();
  }, [setSocket]);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter history={history}>
          <AppProvider>
            <JumboApp activeLayout={config.defaultLayout}>
              <JumboTheme init={config.theme}>
                <JumboRTL>
                  <JumboDialogProvider>
                    <JumboDialog />
                    <SnackbarProvider
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      maxSnack={3}
                    >
                      <JumboAuthProvider>
                        <AppLayout socket={socket}>
                          <Suspense
                            fallback={
                              <Div
                                sx={{
                                  display: "flex",
                                  minWidth: 0,
                                  alignItems: "center",
                                  alignContent: "center",
                                  height: "100%",
                                }}
                              >
                                <CircularProgress sx={{ m: "-40px auto 0" }} />
                              </Div>
                            }
                          >
                            <AppRoutes />
                          </Suspense>
                        </AppLayout>
                      </JumboAuthProvider>
                    </SnackbarProvider>
                  </JumboDialogProvider>
                </JumboRTL>
              </JumboTheme>
            </JumboApp>
            <ToastContainer />
          </AppProvider>
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
