import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { counts } from "../utils/data.js";
import { addWorkout, getDashboardDetails, getWorkouts } from "../api/index.js";
import EntryExitCard from "../components/EntryExitCard.jsx";

const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 22px 0px;
  overflow-y: scroll;
`;
const Wrapper = styled.div`
  flex: 1;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;
const Title = styled.div`
  padding: 0px 16px;
  font-size: 22px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
`;
const FlexWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 22px;
  padding: 0px 16px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;
const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 16px;
  gap: 22px;
  padding: 0px 16px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;
const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-bottom: 100px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [buttonLoading, setButtonLoading] = useState(false);

  const dashboardData = async () => {
    setLoading(true);
    const token = localStorage.getItem("SurveilEye-app-token");
    await getDashboardDetails(token).then((res) => {
      setData(res.data);
      setLoading(false);
    });
  };

  const EntryExitData = {
    type: "entry",
    name: "xyz",
    enroll: "12202080701052",
    time: 12,
  };

  return (
    <Container>
      <Section>
        <Title>Todays Data</Title>
        <CardWrapper>
          <EntryExitCard EntryExitData={EntryExitData} />
          <EntryExitCard EntryExitData={EntryExitData} />
          <EntryExitCard EntryExitData={EntryExitData} />
          <EntryExitCard EntryExitData={EntryExitData} />
          <EntryExitCard EntryExitData={EntryExitData} />
          <EntryExitCard EntryExitData={EntryExitData} />
        </CardWrapper>
      </Section>
    </Container>
  );
};

export default Dashboard;
