import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { contact } from "../api";

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

const ContactDetails = styled.div`
  margin-top: 40px;
  text-align: center;

  h3 {
    font-size: 20px;
    color: ${({ theme }) => theme.text_primary};
    margin-bottom: 16px;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      font-size: 14px;
      color: ${({ theme }) => theme.text_secondary};

      strong {
        font-weight: 600;
        color: ${({ theme }) => theme.text_primary};
      }

      &:not(:last-child) {
        margin-bottom: 8px;
      }
    }
  }

  @media (max-width: 768px) {
    h3 {
      font-size: 18px;
    }

    li {
      font-size: 12px;
    }
  }
`;

const Contact = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleSubmit = async () => {
    setButtonLoading(true);
    const token = localStorage.getItem("SurveilEye-app-token");
    if (validateInputs()) {
      try {
        await contact(token, { name, email, message })
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
    if (!name.trim() || !email.trim() || !message.trim()) {
      return false;
    }
    return true;
  };

  return (
    <section>
      <Container>
        <div>
          <Title>Contact Us</Title>
          <Span>
            We'd love to hear from you! Fill out the form below or reach us
            through our contact details.
          </Span>
        </div>
        <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
          <TextInput
            label="Name"
            placeholder="Enter your name"
            value={name}
            handelChange={(e) => setName(e.target.value)}
          />
          <TextInput
            label="Email"
            placeholder="Enter your email address"
            value={email}
            handelChange={(e) => setEmail(e.target.value)}
          />
          <TextInput
            label="Message"
            placeholder="Write your message"
            value={message}
            handelChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <Button
          text="Submit"
          onClick={() => handleSubmit()}
          isDisabled={buttonDisabled}
          isLoading={buttonLoading}
        />
      </Container>

      <ContactDetails>
        <h3>Our Contact Details</h3>
        <ul>
          <li>
            <strong>Email:</strong> support@surveileye.com
          </li>
          <li>
            <strong>Phone:</strong> +91 9313203461
          </li>
          <li>
            <strong>Address:</strong> MBIT, Near GIDC, New Vidhya Nagar,
            Anand
          </li>
        </ul>
      </ContactDetails>
    </section>
  );
};

export default Contact;
