import React from "react";
import styled from "styled-components";

const CardWrapper = styled.div`
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.shadow};
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0px 4px 6px ${({ theme }) => theme.shadow};
  text-align: center;
  min-width: 250px;
`;

const RfidTag = styled.div`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.text_primary};
`;

const Timestamp = styled.div`
  font-size: 1rem;
  margin-top: 0.5rem;
  color: ${({ theme }) => theme.text_secondary};
`;

const PassCard = ({ enrollment, name, reason, time }) => (
  <CardWrapper>
    <RfidTag>Enrollment NO.: {enrollment}</RfidTag>
    <RfidTag>Name: {name}</RfidTag>
    <Timestamp>Time: {time}</Timestamp>
    <Timestamp>Reason: {reason}</Timestamp>
  </CardWrapper>
);

export default PassCard;
