import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput.jsx";
import Button from "./Button.jsx";
import { AdminSignIn } from "../api/index.js";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/reducers/userSlice.js";

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 36px;
  
`;
const Title = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.black};
`;
const Span = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.black};
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
        console.log(res);
        
        // Ensure correct response structure
        if (res.data && res.data.token && res.data.admin) {
          dispatch(loginSuccess(res.data));
          alert("Login Success");
        } else {
          alert("Unexpected response structure");
        }
      } catch (err) {
        console.error(err);
        const errorMessage = err.response?.data?.message || "An unexpected error occurred.";
        alert(errorMessage);
      } finally {
        setLoading(false);
        setButtonDisabled(false);
      }
    } else {
      alert("Please ensure all fields are correctly filled.");
      setLoading(false);
      setButtonDisabled(false);
    }
  };


  return (
    <Container>
      <div>
        <Title>Vehicle Security Admin Login</Title>
        <Span>Please log in with your registered email and password</Span>
      </div>
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexDirection: "column",
        }}
      >
        <TextInput
          label="Email Address"
          placeholder="Enter your email address"
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
      </div>
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
