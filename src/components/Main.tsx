import { useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import TagList from "./TagList";
import { ITagBox, IBoxInfo } from "../interfaces/main";
import { useDrawBox } from "../hooks/useDrawBox";

function Main() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { boxList, handleMouseStart, handleMouseEnd, handleMouseMove } =
    useDrawBox(canvasRef);

  const initCanvas = () => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = wrap?.clientWidth || 0;
      canvas.height = wrap?.clientHeight || 0;
    }
  };

  useEffect(() => {
    initCanvas();
    return () => {};
  }, []);

  return (
    <MainWrap>
      <CanvasWrap ref={wrapRef}>
        <img alt="이미지" src={require("../assets/sample.jpg")} />
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseStart}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseEnd}
          onMouseLeave={handleMouseEnd}
        />
        <BoxList>
          {boxList.map(({ width, height, x, y, text, id }: ITagBox) => (
            <Box key={id} width={width} height={height} x={x} y={y}>
              {text}
            </Box>
          ))}
        </BoxList>
      </CanvasWrap>
      <TagList />
    </MainWrap>
  );
}

export default Main;

const MainWrap = styled.main`
  position: relative;
  max-width: 1000px;
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
    height: 100%;
    width: 100%;
  }

  img {
    display: block;
    width: 100%;
  }
`;

const BoxList = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Box = styled.div`
  position: absolute;
  border: 1px solid #3ed9b0;
  background-color: #a9ff6f33;
  ${({ width, height, x, y }: IBoxInfo) => css`
    width: ${width}px;
    height: ${height}px;
    top: ${y}px;
    left: ${x}px;
  `}
`;
