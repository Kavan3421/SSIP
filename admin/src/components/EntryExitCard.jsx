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

const Type = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
`;

const Timestamp = styled.div`
  font-size: 1rem;
  margin-top: 0.5rem;
  color: ${({ theme }) => theme.text_secondary};
`;

const EntryExitCard = ({ enrollment, name, type, time }) => (
  <CardWrapper>
    <RfidTag>Enrollment NO.: {enrollment}</RfidTag>
    <RfidTag>Name: {name}</RfidTag>
    <Type>{type === "entry" ? "Entry" : "Exit"}</Type>
    <Timestamp>Time: {time}</Timestamp>
  </CardWrapper>
);

export default EntryExitCard;
