import React from 'react';
import styled from 'styled-components';

const CardWrapper = styled.div`
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.shadow};
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px ${({ theme }) => theme.shadow};
  text-align: center;
`;

const Title = styled.h5`
  font-size: 15px;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.text_primary};
`;

const Type = styled.div`
  font-size: 10px;
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
`;

const Timestamp = styled.div`
  font-size: 10px;
  margin-top: 0.5rem;
  color: ${({ theme }) => theme.text_secondary};
`;

const EntryExitCard = ({ EntryExitData }) => (
  <CardWrapper>
    <Title>Entry/Exit:</Title>
    <Type>Name:{EntryExitData.name}</Type>
    <Type>ID:{EntryExitData.enroll}</Type>
    <Type>{EntryExitData.type}</Type>
    <Timestamp>Time: {EntryExitData.time}</Timestamp>
  </CardWrapper>
);

export default EntryExitCard;
