import { useRef, useEffect, useState, MouseEvent } from "react";
import styled, { css } from "styled-components";
import TagList from "./TagList";

interface ICoordinate {
  x: number;
  y: number;
}

interface IBoxInfo {
  x: number;
  y: number;
  width: number;
  height: number;
}
interface ITagBox extends IBoxInfo {
  id: number;
  text: string;
}

function Main() {
  const [boxList, setBoxList] = useState<ITagBox[]>([]);
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [startPosition, setStartPosition] = useState<ICoordinate | undefined>({
    x: 0,
    y: 0,
  });
  const [taggingStart, setTaggingStart] = useState<boolean>(false);

  const getPosition = (e: MouseEvent) => {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;
    var rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const initCanvas = () => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = wrap?.clientWidth || 0;
      canvas.height = wrap?.clientHeight || 0;
    }
  };

  const handleMouseStart = (e: MouseEvent) => {
    setTaggingStart(true);
    setStartPosition(getPosition(e));
  };
  const handleMouseEnd = (e: MouseEvent) => {
    if (taggingStart) {
      const position = getPosition(e);
      if (position) {
        createBox(position);
      }
      setTaggingStart(false);
    }
  };
  const handleMouseMove = (e: MouseEvent) => {
    if (taggingStart) {
      const position = getPosition(e);
      if (position) {
        drawBox(position);
      }
    }
  };

  const getId = () => {
    return boxList.length > 0 ? boxList[boxList.length - 1].id + 1 : 0;
  };

  const createBox = ({ x, y }: ICoordinate) => {
    if (startPosition) {
      const width = x - startPosition.x;
      const height = y - startPosition.y;
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      ctx?.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      if (width < 1 || height < 1) return;
      const newBox = {
        x: startPosition.x,
        y: startPosition.y,
        width,
        height,
        text: "선글라스",
        id: getId(),
      };
      setBoxList((boxList) => [...boxList, newBox]);
    }
  };

  const drawBox = ({ x, y }: ICoordinate) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx && startPosition) {
      ctx?.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.strokeStyle = "#e66868";
      ctx.fillStyle = "#e6686847";
      ctx.fillRect(
        startPosition.x,
        startPosition.y,
        x - startPosition.x,
        y - startPosition.y
      );
      ctx.strokeRect(
        startPosition.x,
        startPosition.y,
        x - startPosition.x,
        y - startPosition.y
      );
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
