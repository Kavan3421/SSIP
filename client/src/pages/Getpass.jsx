import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { gatepass } from "../api";

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 36px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 0 16px;
    gap: 24px;
  }
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.text_primary};

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const Span = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 90};

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const Gatepass = () => {
  const [reason, setReason] = useState("");
  const [time, setTime] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleSubmit = async () => {
    setButtonLoading(true);
    const token = localStorage.getItem("SurveilEye-app-token");
    if (validateInputs()) {
      try {
        await gatepass(token, { reason, time })
          .then((res) => {
            setButtonLoading(false);
            alert("Message sent successfully");
          })
          .catch((err) => {
            setButtonLoading(false);
            alert(err);
          });
      } catch (err) {
        setButtonLoading(false);
        alert(err);
      }
    } else {
      alert("Please ensure all fields are correctly filled.");
      setButtonDisabled(false);
      setButtonLoading(false);
    }
  };

  const validateInputs = () => {
    if (!reason.trim() || !time.trim()) {
      return false;
    }
    return true;
  };

  return (
    <section>
      <Container>
        <div>
          <Title>Gatepass</Title>
          <Span>
            Please fill in the details below to request for a gatepass
          </Span>
        </div>
        <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
          <TextInput
            label="Reason"
            placeholder="Reason for gatepass"
            value={reason}
            handelChange={(e) => setReason(e.target.value)}
          />
          <TextInput
            label="Time"
            placeholder="Time of gatepass"
            value={time}
            handelChange={(e) => setTime(e.target.value)}
          />
        </div>
        <Button
          text="Submit"
          onClick={() => handleSubmit()}
          isDisabled={buttonDisabled}
          isLoading={buttonLoading}
        />
      </Container>
    </section>
  );
};

export default Gatepass;
