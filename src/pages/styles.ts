import styled from "styled-components";

const Wrapper = styled.div`
  background-color: #000ff3;
  width: 500px;

  padding: 40px 30px;
`;

const Title = styled.span`
  font-size: 30px;
  font-weight: 700;
  color: #ffffff;
`;

const DashedContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100px;
  margin-top: 20px;
  color: #ffffff;

  border: 1px dashed rgba(255, 255, 255, 0.5);
`;

const Video = styled.video`
  width: 100%;
  margin-top: 20px;
`;

const Image = styled.img`
  width: 100%;
  margin-top: 20px;
`;

export { Wrapper, Title, DashedContainer, Video, Image };
