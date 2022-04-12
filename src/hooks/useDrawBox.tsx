import { useState, MouseEvent, RefObject } from "react";
import { ICoordinate } from "../interfaces";
import { useDispatch, useSelector } from "react-redux";
import { add, TagState } from "../redux/store";

const getTagName = () => {
  return prompt("영역의 이름은 무엇인가요?") || "";
};

const useDrawBox = (canvasRef: RefObject<HTMLCanvasElement>) => {
  const dispatch = useDispatch();
  const tagList = useSelector((state: TagState) => state.tagList);

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

  const drawBox = ({ x, y }: ICoordinate) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx && startPosition) {
      ctx?.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.strokeStyle = "#e66868";
      ctx.fillStyle = "#e6686847";
      const width = x - startPosition.x;
      const height = y - startPosition.y;
      ctx.fillRect(startPosition.x, startPosition.y, width, height);
      ctx.strokeRect(startPosition.x, startPosition.y, width, height);
    }
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
        name: getTagName(),
      };

      dispatch(add(newBox));
    }
  };
  return {
    tagList,
    handleMouseStart,
    handleMouseEnd,
    handleMouseMove,
  };
};

export default useDrawBox;
