import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";
import { registerUser } from "../api";

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
  color: ${({ theme }) => theme.text_primary};
`;
const Span = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 90};
`;

const ApplyForRegistration = () => {
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [photos, setPhotos] = useState([]);

  const validateInputs = () => {
    if (!name || !email || !vehicleNumber || !password || !confirmPassword) {
      alert("Please fill in all fields");
      return false;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleFileChange = (e) => {
    setPhotos(e.target.files);
  };

  const handleApply = async () => {
    setLoading(true);
    setButtonDisabled(true);

    if (!validateInputs()) {
      setLoading(false);
      setButtonDisabled(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("vehicle_number", vehicleNumber);
    formData.append("password", password);
    formData.append("confirm_password", confirmPassword);
    Array.from(photos).forEach((photo) => {
      formData.append("photos", photo);
    });

    try {
      const res = await registerUser(formData);
      alert(res.data.message || "Registration successful!");
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || "An unexpected error occurred.";
      alert(errorMessage);
    } finally {
      setLoading(false);
      setButtonDisabled(false);
    }
  };

  return (
    <Container>
      <div>
        <Title>Apply for Registration 🚗</Title>
        <Span>Please fill in the details below to register your vehicle</Span>
      </div>
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexDirection: "column",
        }}
      >
        <TextInput
          label="Full Name"
          placeholder="Enter your full name"
          value={name}
          handelChange={(e) => setName(e.target.value)}
        />
        <TextInput
          label="Email Address"
          placeholder="Enter your email address"
          value={email}
          handelChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          label="Vehicle Number"
          placeholder="Enter your vehicle number"
          value={vehicleNumber}
          handelChange={(e) => setVehicleNumber(e.target.value)}
        />
        <TextInput
          label="Password"
          placeholder="Enter your password"
          password
          value={password}
          handelChange={(e) => setPassword(e.target.value)}
        />
        <TextInput
          label="Confirm Password"
          placeholder="Re-enter your password"
          password
          value={confirmPassword}
          handelChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div>
          <label
            style={{
              fontSize: "16px",
              fontWeight: "400",
              marginBottom: "10px",
              display: "block",
            }}
          >
            Upload Photos
          </label>
          <input type="file" multiple onChange={handleFileChange} />
        </div>
        <Button
          text="Apply"
          onClick={handleApply}
          isLoading={loading}
          isDisabled={buttonDisabled}
        />
      </div>
    </Container>
  );
};

export default ApplyForRegistration;
