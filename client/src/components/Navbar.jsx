import React, { useState } from "react";
import styled from "styled-components";
import LogoImg from "../utils/Images/Logo.png";
import { Link as LinkR, NavLink } from "react-router-dom";
import { MenuRounded, Close } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../redux/reducers/userSlice.js";

const Nav = styled.nav`
  background-color: ${({ theme }) => theme.bg};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid ${({ theme }) => theme.text_secondary + 20};
  transition: background-color 0.3s ease;
`;

const NavContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavLogo = styled(LinkR)`
  display: flex;
  align-items: center;
  gap: 16px;
  font-weight: 600;
  font-size: 20px;
  text-decoration: none;
  color: ${({ theme }) => theme.black};
`;

const Logo = styled.img`
  height: 80px;
`;

const MobileIcon = styled.div`
  display: none;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    display: flex;
  }
`;

const NavItems = styled.ul`
  display: flex;
  align-items: center;
  gap: 32px;
  list-style: none;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Navlink = styled(NavLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover,
  &.active {
    color: ${({ theme }) => theme.primary};
  }
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  color: ${({ theme }) => theme.primary};

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const TextButton = styled.div`

  color: ${({ theme }) => theme.secondary});
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: color 0.3s ease;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  right: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
  width: 70%;
  height: 100vh;
  background: ${({ theme }) => theme.bg};
  display: flex;
  flex-direction: column;
  padding: 80px 20px;
  transition: right 0.4s ease-in-out;
  box-shadow: ${({ isOpen }) =>
    isOpen ? "-10px 0px 30px rgba(0, 0, 0, 0.2)" : "none"};
  z-index: 999;
`;

const MobileNavLink = styled(Navlink)`
  margin-bottom: 20px;
  font-size: 18px;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const CloseIcon = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
`;

const Navbar = ({ currentUser }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Nav>
      <NavContainer>
        <MobileIcon onClick={() => setIsOpen(true)}>
          <MenuRounded sx={{ fontSize: 30 }} />
        </MobileIcon>
        <NavLogo to="/">
          <Logo src={LogoImg} alt="Logo" />
          SurveilEye
        </NavLogo>

        <NavItems>
          <Navlink to="/">Dashboard</Navlink>
          <Navlink to="/databydate">My History</Navlink>
          <Navlink to="/contact">Contact Us</Navlink>
          <Navlink to="/gatepass">Gatepass</Navlink>
          <Navlink to="/profile">Profile</Navlink>
        </NavItems>

        <UserContainer>
          <Avatar src={currentUser?.img}>{currentUser?.name?.[0]}</Avatar>
          <TextButton onClick={() => dispatch(logout())}>Logout</TextButton>
        </UserContainer>

        <MobileMenu isOpen={isOpen}>
          <CloseIcon onClick={() => setIsOpen(false)}>
            <Close sx={{ fontSize: 30 }} />
          </CloseIcon>
          <MobileNavLink to="/" onClick={() => setIsOpen(false)}>
            Dashboard
          </MobileNavLink>
          <MobileNavLink to="/databydate" onClick={() => setIsOpen(false)}>
            My History
          </MobileNavLink>
          <MobileNavLink to="/contact" onClick={() => setIsOpen(false)}>
            Contact Us
          </MobileNavLink>
          <MobileNavLink to="/gatepass" onClick={() => setIsOpen(false)}>
            Gatepass
          </MobileNavLink>
          <MobileNavLink to="/profile" onClick={() => setIsOpen(false)}>
            Profile
          </MobileNavLink>
          <TextButton onClick={() => { dispatch(logout()); setIsOpen(false); }}>
            Logout
          </TextButton>
        </MobileMenu>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;
