import React from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "./utils/Themes.js";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import styled from "styled-components";
// import Authentication from "./pages/Authentication";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ContactEmergency } from "@mui/icons-material";
import DatabyDate from "./pages/DatabyDate";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  overflow-x: hidden;
  overflow-y: hidden;
  transition: all 0.2s ease;
`;

function App() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        {/* {currentUser ? ( */}
          <Container>
            <Navbar />
            <Routes>
              <Route path="/" exact element={<Dashboard />} />
              <Route path="/databydate" exact element={<DatabyDate/>} />
              <Route path="/contact" exact element={<Contact/>} />
            </Routes>
          </Container>
        {/* ) : (
          <Container>
            <Authentication />
          </Container>
        )} */}
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
