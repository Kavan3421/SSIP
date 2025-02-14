import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getDataByDate } from "../api/index.js"; // API call function
import { io } from "socket.io-client";

const Container = styled.div`
  flex: 1;
  height: 100%;
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
      console.error("❌ Error fetching today's data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initialize Socket.IO and handle real-time updates
  useEffect(() => {
    const newSocket = io("http://localhost:8080", {
      transports: ["websocket"],
      reconnection: true,
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("✅ Connected to WebSocket server");
    });

    newSocket.on("entryLogUpdated", () => {
      console.log("📌 New entry log detected. Fetching updated data...");
      getTodaysData();
    });

    newSocket.on("exitLogUpdated", () => {
      console.log("📌 New exit log detected. Fetching updated data...");
      getTodaysData();
    });

    newSocket.on("disconnect", () => {
      console.warn("❌ Disconnected from WebSocket server");
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Fetch data on component mount
  useEffect(() => {
    getTodaysData();
  }, []);

  return (
    <Container>
      <Section>
        <Title>Today's Data</Title>
        {loading && <p>Loading...</p>}
        <Table>
          <thead>
            <tr>
              <Th>Enrollment No.</Th>
              <Th>Name</Th>
              <Th>Type</Th>
              <Th>Time</Th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(logsByTag).map(([rfidTag, data]) =>
              data.logs.map((log, index) => (
                <tr key={`${rfidTag}-${index}`}>
                  <Td>{log.enrollmentNumber}</Td>
                  <Td>{log.name}</Td>
                  <Td>{log.type}</Td>
                  <Td>{log.timestamp}</Td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Section>
    </Container>
  );
};

export default Dashboard;
