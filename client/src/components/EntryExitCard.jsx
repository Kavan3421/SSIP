import React from 'react';
import styled from 'styled-components';

const CardWrapper = styled.div`
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.shadow};
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0px 4px 6px ${({ theme }) => theme.shadow};
  text-align: center;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.text_primary};
`;

const Type = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
`;

const Timestamp = styled.div`
  font-size: 1rem;
  margin-top: 0.5rem;
  color: ${({ theme }) => theme.text_secondary};
`;

const EntryExitCard = ({ EntryExitData }) => (
  <CardWrapper>
    <Title>Entry/Exit:</Title>
    <Type>{EntryExitData.type}</Type>
    <Timestamp>Time: {EntryExitData.time}</Timestamp>
  </CardWrapper>
);

export default EntryExitCard;
