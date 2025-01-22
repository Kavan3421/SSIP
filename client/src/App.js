import React from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "./utils/Themes.js";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import styled from "styled-components";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import ProfileUpdate from "./pages/ProfileUpdate.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DatabyDate from "./pages/DatabyDate";
import Authentication from "./pages/Authentication.jsx";

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
        {currentUser ? (
        <Container>
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Dashboard />} />
            <Route path="/databydate" exact element={<DatabyDate />} />
            <Route path="/contact" exact element={<Contact />} />
            <Route path="/profile" exact element={<ProfileUpdate />} />
          </Routes>
        </Container>
         ) : (
          <Container>
            <Authentication />
          </Container>
        )}
        <footer class="footer">
          <p>Created By Team SurveilEye</p>
        </footer>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
