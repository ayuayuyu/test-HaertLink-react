import { useState } from "react";
import Room from "./commponents/Room";
import Home from "./commponents/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { ChakraProvider } from "@mui/material";

import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={`/`} element={<Home />} />
          <Route path={`/room`} element={<Room />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
