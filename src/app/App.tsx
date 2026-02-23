import React from "react";
import { AppRouter } from "./providers/router/AppRouter";
import { GlobalStyles } from "./styles/globalStyles";

function App() {
  return (
    <>
      <GlobalStyles />
      <AppRouter />
    </>
  );
}

export default App;
