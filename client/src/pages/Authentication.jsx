import React, { useState } from "react";
import styled from "styled-components";
import LogoImage from "../utils/Images/Logo.png";
import AuthImage from "../utils/Images/AuthImage.jpg";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

const Container = styled.div`
  min-height: 100vh; /* Ensure the background covers the entire viewport height */
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.bg};
  background-image: url(${AuthImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(222, 222, 222, 0.5); /* Light overlay */
  z-index: 1;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start; /* Align content to the top */
  backdrop-filter: blur(10px);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  z-index: 2;
  padding: 40px;
  gap: 32px;
  width: 100%;
  max-width: 900px;
  max-height: 90vh; /* Avoid overflow */
  overflow-y: auto; /* Enable scrolling */
`;

const Left = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  width: 250px;
  z-index: 10;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* Align items to the top */
  gap: 16px;
  width: 100%;
  overflow-y: auto; /* Allow scrolling for content overflow */
  padding-top: 20px; /* Prevent content from being cut off at the top */
`;

const Text = styled.div`
  font-size: 16px;
  text-align: center;
  color: ${({ theme }) => theme.white};
  margin-top: 16px;
  @media (max-width: 400px) {
    font-size: 14px;
  }
`;

const TextButton = styled.span`
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
`;

const Authentication = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <Container>
      <Overlay />
      <ContentWrapper>
        <Left>
          <Logo src={LogoImage} />
        </Left>
        <Right>
          {!isRegistering ? (
            <>
              <SignIn />
              <Text>
                Don't have an account?{" "}
                <TextButton onClick={() => setIsRegistering(true)}>
                  Register your vehicle
                </TextButton>
              </Text>
            </>
          ) : (
            <>
              <SignUp />
              <Text>
                Already registered?{" "}
                <TextButton onClick={() => setIsRegistering(false)}>
                  Sign In
                </TextButton>
              </Text>
            </>
          )}
        </Right>
      </ContentWrapper>
    </Container>
  );
};

export default Authentication;
