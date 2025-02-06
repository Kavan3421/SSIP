import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";
import { registerUser } from "../api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/reducers/userSlice.js";

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  background: rgb(211, 211, 211);
  padding: 36px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 22px;
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

const SignUp = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [enrollmentNumber, setEnrollmentNumber] = useState("");

  const validateInputs = () => {
    if (!name || !email || !password || !vehicleNumber || !enrollmentNumber) {
      alert("Please fill in all fields");
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    setLoading(true);
    setButtonDisabled(true);

    if (validateInputs()) {
      try {
        const res = await registerUser({
          name,
          email,
          password,
          vehicleNumber,
          enrollmentNumber,
        });

        dispatch(loginSuccess(res.data));
        alert("Account Created Successfully!");
      } catch (err) {
        console.error("Error during signup:", err);
        alert(err.response?.data?.message || "Something went wrong!");
      } finally {
        setLoading(false);
        setButtonDisabled(false);
      }
    }
  };

  return (
    <Container>
      <Title>Create New Account 🚀</Title>
      <Span>Enter your details to sign up</Span>

      <TextInput
        label="Full Name"
        placeholder="Enter your full name"
        value={name}
        handelChange={(e) => setName(e.target.value)}
      />
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
      <TextInput
        label="Vehicle Number"
        placeholder="Enter your vehicle number"
        value={vehicleNumber}
        handelChange={(e) => setVehicleNumber(e.target.value)}
      />
      <TextInput
        label="Enrollment Number"
        placeholder="Enter your enrollment number"
        value={enrollmentNumber}
        handelChange={(e) => setEnrollmentNumber(e.target.value)}
      />

      <Button
        text="Sign Up"
        onClick={handleSignUp}
        isLoading={loading}
        isDisabled={buttonDisabled}
      />
    </Container>
  );
};

export default SignUp;
