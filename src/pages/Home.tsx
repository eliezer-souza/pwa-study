import React, { useEffect, useRef, useState, useCallback } from "react";
import { Wrapper, Title, DashedContainer, Video, Image } from "./styles";
import { Webcam } from "../Camera";

const Home = React.memo(() => {
  let webcam: Webcam;
  const webcamRef = useRef<HTMLVideoElement>(null);
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    const canvasElement = document.createElement("canvas");
    webcam = new Webcam(webcamRef.current, canvasElement);
    webcam.setup().catch((e) => console.log(e));
  }, [webcamRef]);

  const handleClickTakePhoto = useCallback(() => {
    const { base64 } = webcam.takeBase64Photo();
    setPhoto(base64);
  }, []);

  return (
    <Wrapper>
      <Title>Upload</Title>
      <Video autoPlay ref={webcamRef} />

      <DashedContainer onClick={handleClickTakePhoto}>
        <i className="ri-camera-fill ri-xl" />
        <span>Take your photo</span>
      </DashedContainer>
      <Image src={photo} />
    </Wrapper>
  );
});

export default Home;
