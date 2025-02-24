import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getDataByDate } from "../api/index.js"; // API call function for fetching data
import EntryExitCard from "../components/EntryExitCard.jsx";
import io from "socket.io-client";

const Container = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 22px 0px;
  overflow-y: scroll;
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

const Title = styled.div`
  padding: 0px 16px;
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

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [logsByTag, setLogsByTag] = useState({});
  const [socket, setSocket] = useState(null);

  // Function to fetch today's data
  const getTodaysData = async () => {
    setLoading(true);
    const token = localStorage.getItem("SurveilEye-app-token");

    try {
      const response = await getDataByDate(token, "");
      setLogsByTag(response?.data?.logs);
    } catch (error) {
      console.error("Error fetching today's data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initialize Socket.IO and handle real-time updates
  useEffect(() => {
    const newSocket = io("https://ssip-xv3o.onrender.com");
    setSocket(newSocket);

    // Listen for entry log updates
    newSocket.on("entryLogUpdated", () => {
      console.log("New entry log detected. Fetching updated data...");
      getTodaysData(); // Refresh data
    });

    // Listen for exit log updates
    newSocket.on("exitLogUpdated", () => {
      console.log("New exit log detected. Fetching updated data...");
      getTodaysData(); // Refresh data
    });

    return () => {
      newSocket.disconnect(); // Clean up the socket connection
    };
  }, []);

  // Fetch data on component mount
  useEffect(() => {
    getTodaysData();
  }, []);
  

  useEffect(() => {
    getTodaysData();
  }, []);

  return (
    <Container>
      <Section>
        <Title>Today's Data</Title>
        {loading && <p>Loading...</p>}
        <CardWrapper>
          {Object.entries(logsByTag).map(([rfidTag, data]) => {
            return data.logs.map((log, index) => (
              <EntryExitCard
                key={`${rfidTag}-${index}`}
                rfidTag={rfidTag}
                type={log.type}
                time={log.timestamp}
              />
            ));
          })}
        </CardWrapper>
      </Section>
    </Container>
  );
};

export default Dashboard;
