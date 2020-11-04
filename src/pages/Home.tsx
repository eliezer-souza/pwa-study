import React, { useEffect, useRef, useState, useCallback } from "react";
import { Wrapper, Title, DashedContainer, Video, Image } from "./styles";
import { Webcam } from "../Camera";

const Home = React.memo(() => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [photo, setPhoto] = useState<string | undefined>("");
  const cameraRef = useRef<Webcam>();

  useEffect(() => {
    const canvasElement = document.createElement("canvas");
    cameraRef.current = new Webcam(videoRef.current, canvasElement);
    cameraRef.current.setup().catch((e) => console.log(e));
  }, [videoRef]);

  const handleClickTakePhoto = useCallback(() => {
    const photo = cameraRef.current?.takeBase64Photo();
    setPhoto(photo?.base64);
  }, []);

  return (
    <Wrapper>
      <Title>Upload</Title>
      <Video autoPlay playsInline ref={videoRef} />
      <DashedContainer onClick={handleClickTakePhoto}>
        <i className="ri-camera-fill ri-xl" />
        <span>Take your photo</span>
      </DashedContainer>
      <Image src={photo} />
    </Wrapper>
  );
});

export default Home;
