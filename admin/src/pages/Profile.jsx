import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { lightTheme } from "../utils/Themes.js";
import { useSelector } from "react-redux";

const Container = styled.div`
  padding: 16px;
  width: 100%;
  margin: auto;
  box-shadow: 0 2px 4px ${lightTheme.shadow};
  background-color: ${lightTheme.bg};
  border-radius: 8px;
  @media (min-width: 768px) {
    max-width: 480px;
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 16px;
  color: ${lightTheme.text_primary};
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 4px;
  color: ${lightTheme.text_secondary};
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid ${lightTheme.disabled};
  border-radius: 4px;
  font-size: 1rem;
  color: ${lightTheme.text_primary};
  &:focus {
    outline: none;
    border-color: ${lightTheme.primary};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const Button = styled.button`
  padding: 8px 16px;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: ${lightTheme.white};
  background-color: ${(props) => (props.primary ? lightTheme.primary : lightTheme.disabled)};
  &:hover {
    opacity: 0.9;
  }
`;

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    vehicleNumber: "",
    enrollmentNumber: "",
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || "",
        email: currentUser.email || "",
        vehicleNumber: currentUser.vehicleNumber || "",
        enrollmentNumber: currentUser.enrollmentNumber || "",
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSave = () => {
    console.log("Updated User Data:", formData);
    setIsEditing(false);
  };

  if (!currentUser) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <Title>Profile</Title>
      <div>
        <FormGroup>
          <Label>Name:</Label>
          {isEditing ? (
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          ) : (
            <p>{formData.name}</p>
          )}
        </FormGroup>

        <FormGroup>
          <Label>Email:</Label>
          {isEditing ? (
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          ) : (
            <p>{formData.email}</p>
          )}
        </FormGroup>

        <FormGroup>
          <Label>Vehicle Number:</Label>
          {isEditing ? (
            <Input
              type="text"
              name="vehicleNumber"
              value={formData.vehicleNumber}
              onChange={handleChange}
            />
          ) : (
            <p>{formData.vehicleNumber}</p>
          )}
        </FormGroup>

        <FormGroup>
          <Label>Enrollment Number:</Label>
          {isEditing ? (
            <Input
              type="number"
              name="enrollmentNumber"
              value={formData.enrollmentNumber}
              onChange={handleChange}
            />
          ) : (
            <p>{formData.enrollmentNumber}</p>
          )}
        </FormGroup>

        <ButtonGroup>
          {isEditing ? (
            <>
              <Button onClick={handleEditToggle}>Cancel</Button>
              <Button primary onClick={handleSave}>Save</Button>
            </>
          ) : (
            <Button primary onClick={handleEditToggle}>Edit</Button>
          )}
        </ButtonGroup>
      </div>
    </Container>
  );
};

export default Profile;
