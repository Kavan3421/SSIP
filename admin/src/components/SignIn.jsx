import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput.jsx";
import Button from "./Button.jsx";
import { AdminSignIn } from "../api/index.js";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/reducers/userSlice.js";

const Container = styled.div`
  width: 100%;
  max-width: 420px;
  background: rgb(211, 211, 211);
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: center;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 600px) {
    width: 90%;
    padding: 24px;
  }
`;

const Title = styled.h2`
  font-size: 26px;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
`;

const Span = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
`;

const SignIn = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateInputs = () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return false;
    }
    return true;
  };

  const handleSignIn = async () => {
    setLoading(true);
    setButtonDisabled(true);

    if (validateInputs()) {
      try {
        const res = await AdminSignIn({ email, password });

        if (res.data?.token && res.data?.admin) {
          dispatch(loginSuccess(res.data));
          alert("Login Successful!");
        } else {
          alert("Unexpected response structure");
        }
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
        setButtonDisabled(false);
      }
    } else {
      setLoading(false);
      setButtonDisabled(false);
    }
  };

  return (
    <Container>
      <Title>Vehicle Security Admin Login</Title>
      <Span>Log in with your registered email and password</Span>

      <TextInput
        label="Email Address"
        placeholder="Enter your email"
        value={email}
        handelChange={(e) => setEmail(e.target.value)}
      />
      <TextInput
        label="Password"
        placeholder="Enter your password"
        password
        value={password}
        handelChange={(e) => setPassword(e.target.value)}
      />

      <Button
        text="Sign In"
        onClick={handleSignIn}
        isLoading={loading}
        isDisabled={buttonDisabled}
      />
    </Container>
  );
};

export default SignIn;
