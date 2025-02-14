import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { gatepass, generateQrCode } from "../api";

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin: 0 auto;
  padding: 20px;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 16px;
    gap: 16px;
  }
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.text_primary};
  text-align: center;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const Span = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 90};
  text-align: center;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const QRCodeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 20px;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 8px;
  }
`;

const QRImage = styled.img`
  width: 300px;
  height: 300px;

  @media (max-width: 480px) {
    width: 200px;
    height: 200px;
  }
`;

const DownloadButton = styled.button`
  padding: 10px 14px;
  background-color: blue;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
  transition: background 0.2s;

  &:hover {
    background-color: darkblue;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Gatepass = () => {
  const [reason, setReason] = useState("");
  const [time, setTime] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [qrCode, setQrCode] = useState("");

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const formattedTime = `${String(hour).padStart(2, "0")}:${String(
          minute
        ).padStart(2, "0")}`;
        options.push(formattedTime);
      }
    }
    return options;
  };

  const handleSubmit = async () => {
    setButtonLoading(true);
    const token = localStorage.getItem("SurveilEye-app-token");

    if (!reason.trim() || !time.trim()) {
      alert("Please fill in all fields.");
      setButtonLoading(false);
      return;
    }

    try {
      await gatepass(token, { reason, time });

      const response = await generateQrCode(token, { reason, time });

      if (response?.data?.qrImageUrl) {
        setQrCode(response.data.qrImageUrl);
      } else {
        console.error("QR Code URL not found in response:", response);
      }

      setButtonLoading(false);
      alert("Gatepass approved and QR Code generated successfully!");
    } catch (err) {
      setButtonLoading(false);
      alert("Error generating QR Code. Please try again.");
      console.error(err);
    }
  };

  const downloadQR = async () => {
    if (!qrCode) {
      alert("No QR code found to download.");
      return;
    }

    try {
      const response = await fetch(qrCode, { mode: "cors" });
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "GatePass_QR.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading QR Code:", error);
      alert("Failed to download QR Code. Please try again.");
    }
  };

  return (
    <section>
      <Container>
        <Title>Gatepass</Title>
        <Span>Fill in the details below to request a gatepass</Span>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <TextInput
            label="Reason"
            placeholder="Enter reason for gatepass"
            value={reason}
            handelChange={(e) => setReason(e.target.value)}
          />

          <div>
            <label style={{ fontSize: "12px", color: "black", paddingRight: "10px" }}>
              Time
            </label>
            <Select value={time} onChange={(e) => setTime(e.target.value)}>
              <option value="" disabled>Select Time</option>
              {generateTimeOptions().map((timeOption) => (
                <option key={timeOption} value={timeOption}>
                  {timeOption}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <Button text="Submit" onClick={handleSubmit} isLoading={buttonLoading} />

        {qrCode && (
          <QRCodeContainer>
            <QRImage src={qrCode} alt="QR Code" />
            <DownloadButton onClick={downloadQR}>Download QR</DownloadButton>
          </QRCodeContainer>
        )}
      </Container>
    </section>
  );
};

export default Gatepass;
