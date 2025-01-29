import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { CircularProgress } from "@mui/material";
import EntryExitCard from "../components/EntryExitCard";
import { getDataByDate } from "../api";

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
  max-width: 1600px;
  display: flex;
  gap: 22px;
  padding: 0px 16px;
  @media (max-width: 600px) {
    gap: 12px;
    flex-direction: column;
  }
`;

const Left = styled.div`
  flex: 0.2;
  height: fit-content;
  padding: 18px;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 14px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
`;

const Right = styled.div`
  flex: 1;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.primary};
  @media (max-width: 600px) {
    font-size: 14px;
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

const SecTitle = styled.div`
  font-size: 22px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
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

const DatabyDate = () => {
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [logsByTag, setLogsByTag] = useState({});

  const getTodaysData = async () => {
    setLoading(true);
    setLogsByTag({});
    const token = localStorage.getItem("SurveilEye-app-token");

    const queryString = date ? `?date=${date}` : "";
    console.log(queryString);
    try {
      const response = await getDataByDate(token, queryString);
      console.log("Raw API Response:", response);

      setLogsByTag(response?.data?.logs || {});
    } catch (error) {
      console.error("Error fetching today's data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTodaysData();
  }, [date]);
  return (
    <Container>
      <Wrapper>
        <Left>
          <Title>Select Date</Title>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              onChange={(e) => setDate(`${e.$M + 1}/${e.$D}/${e.$y}`)}
            />
          </LocalizationProvider>
        </Left>
        <Right>
          <Section>
            <SecTitle>Data</SecTitle>
            {loading ? (
              <CircularProgress />
            ) : (
              <CardWrapper>
                {Object.entries(logsByTag).map(([rfidTag, data]) => {
                  return data.logs.map((log, index) => (
                    <EntryExitCard
                      key={`${rfidTag}-${index}`}
                      type={log.type}
                      time={log.timestamp}
                      enrollment={log.enrollmentNumber}
                      name={log.name}
                    />
                  ));
                })}
              </CardWrapper>
            )}
          </Section>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default DatabyDate;
