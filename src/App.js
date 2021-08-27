import React from "react";
import Header from "./components/Header";
import GlobalProvider from "./context/GlobalProvider";
import Home from "./components/Home";

function App() {
  return (
    <GlobalProvider>
      <Header />
      <Home />
    </GlobalProvider>
  );
}

export default App;
