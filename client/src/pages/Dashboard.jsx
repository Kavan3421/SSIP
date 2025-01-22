import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getDataByDate } from "../api/index.js";
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
  const [todaysData, setTodaysData] = useState([]);

  const getTodaysData = async () => {
    setLoading(true);
    const token = localStorage.getItem("SurveilEye-app-token");
    await getDataByDate(token, "").then((res) => {
      setTodaysData(res?.data?.todaysWorkouts);
      setLoading(false);
    });
  };

  useEffect(() => {
    getTodaysData();
  }, []);

  // const EntryExitData = {
  //   type: "entry",
  //   time: 12,
  // };

  return (
    <Container>
      <Section>
        <Title>Todays Data</Title>
        <CardWrapper>
          {todaysData.map((EntryExitData) => (
            <EntryExitCard EntryExitData={EntryExitData}/>
          ))}
        </CardWrapper>
      </Section>
    </Container>
  );
};

export default Dashboard;
