// LiveFeed.js
import React, { useEffect, useRef } from "react";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  flex:1;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  height: 100%;
  padding: 22px 0px;
  overflow-y: scroll;
`;

const VideoWrapper = styled.video`
  width: 50%;
  height: auto;
  border: 5px solid ${(props) => props.theme.primary};
  box-shadow: 0 4px 8px ${(props) => props.theme.shadow};
  border-radius: 8px;
  background-color: ${(props) => props.theme.bgLight};
`;

const Section = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 0px 16px;
  gap: 22px;
  padding: 0px 16px;
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

const LiveFeed = () => {
  const videoRef = useRef(null);
  const videoRef2 = useRef(null);

  useEffect(() => {
    // Replace 'http://your-backend-url/live-feed' with your backend's stream URL
    const streamUrl =
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
    const streamUrl2 =
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";
    if (videoRef.current) {
      videoRef.current.src = streamUrl;
    }
    if (videoRef2.current) {
      videoRef2.current.src = streamUrl2;
    }
  }, []);

  return (
    <Container>
      <Section>
        <Title>Entry</Title>
        <VideoWrapper
          ref={videoRef}
          autoPlay
          controls
          controlsList="nodownload"
          muted
        >
          Your browser does not support the video tag.
        </VideoWrapper>
        <Title>Exit</Title>
        <VideoWrapper
          ref={videoRef2}
          autoPlay
          controls
          controlsList="nodownload"
          muted
        >
          Your browser does not support the video tag.
        </VideoWrapper>
      </Section>
    </Container>
  );
};

export default LiveFeed;
