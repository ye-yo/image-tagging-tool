import { useRef } from "react";
import styled from "styled-components";
import TagList from "./TagList";
import BoxList from "./BoxList";
import useDrawBox from "../hooks/useDrawBox";

function Main() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useDrawBox(canvasRef);

  const handleImageLoad = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const wrap = e.currentTarget;
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = wrap?.width || 0;
      canvas.height = wrap?.height || 0;
    }
  };

  return (
    <MainWrap>
      <CanvasWrap>
        <Canvas ref={canvasRef} {...drawing} />
        <img
          alt="이미지"
          src={require("../assets/sample.jpg")}
          onLoad={handleImageLoad}
        />
        <BoxList />
      </CanvasWrap>
      <TagList />
    </MainWrap>
  );
}

export default Main;

const MainWrap = styled.main`
  position: relative;
  max-width: 640px;
  margin: 50px auto 0;
`;
const CanvasWrap = styled.div`
  min-width: 100%;
  height: fit-content;

  img {
    display: block;
    width: 100%;
  }
`;

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  margin: 0 auto;
  z-index: ${({ drawing }: { drawing: boolean }) => (drawing ? 100 : 1)};
  width: 100%;
  height: 100%;
`;
