import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { CircularProgress } from "@mui/material";
import { getPassByDate } from "../api";

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

const SecTitle = styled.div`
  font-size: 22px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 16px;
  gap: 22px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Th = styled.th`
  background: ${({ theme }) => theme.primary};
  color: white;
  padding: 10px;
  text-align: left;
  border: 1px solid ${({ theme }) => theme.shadow};
`;

const Td = styled.td`
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.shadow};
`;

const PassbyDate = () => {
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [logsByTag, setLogsByTag] = useState({});

  const fetchLogsByDate = async () => {
    setLoading(true);
    setLogsByTag({});
    const token = localStorage.getItem("SurveilEye-app-token");
    const queryString = date ? `?date=${date}` : "";
    try {
      const response = await getPassByDate(token, queryString);
      setLogsByTag(response?.data?.logs || {});
    } catch (error) {
      console.error("Error fetching logs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (date) {
      fetchLogsByDate();
    }
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
              <Table>
                <thead>
                  <tr>
                    <Th>Enrollment No.</Th>
                    <Th>Name</Th>
                    <Th>Time</Th>
                    <Th>Reason</Th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(logsByTag).map(([rfidTag, data]) =>
                    data.logs.map((log, index) => (
                      <tr key={`${rfidTag}-${index}`}>
                        <Td>{log.enrollmentNumber}</Td>
                        <Td>{log.name}</Td>
                        <Td>{log.time}</Td>
                        <Td>{log.reason}</Td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            )}
          </Section>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default PassbyDate;
