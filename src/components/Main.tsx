import { useRef } from "react";
import styled from "styled-components";
import TagList from "./TagList";
import BoxList from "./BoxList";
import useDrawBox from "../hooks/useDrawBox";

function Main() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { handleMouseStart, handleMouseEnd, handleMouseMove } =
    useDrawBox(canvasRef);

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
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseStart}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseEnd}
          onMouseLeave={handleMouseEnd}
        />
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
  max-width: 800px;
  margin: 50px auto 0;
`;
const CanvasWrap = styled.div`
  min-width: 100%;
  height: fit-content;
  canvas {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    margin: 0 auto;
    z-index: 1;
    width: 100%;
    height: 100%;
  }

  img {
    display: block;
    width: 100%;
  }
`;
