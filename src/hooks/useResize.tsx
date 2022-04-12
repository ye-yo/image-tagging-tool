import { useState, useEffect, RefObject, useRef, useCallback } from "react";
import { ICoordinate, ISize } from "../interfaces";

const handleStyle = `
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translate(50%, 50%);
  border-radius: 50%;
  cursor: se-resize;
  width: 20px;
  height: 20px;

  z-index: 2;
`;
const useResize = (resizableRef: RefObject<HTMLDivElement>, size: ISize) => {
  const startPosition = useRef<ICoordinate>({
    x: 0,
    y: 0,
  });
  const [newSize, setNewSize] = useState<ISize>(size);
  const resizing = useRef<boolean>(false);
  const [resizingState, setResizingState] = useState<boolean>(false);
  const handleMouseDown = (e: MouseEvent) => {
    e.stopPropagation();
    startPosition.current = { x: e.pageX, y: e.pageY };
    resizing.current = true;
    setResizingState(true);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      if (resizing.current) {
        setNewSize({
          width: size.width + (e.pageX - startPosition.current.x),
          height: size.height + (e.pageY - startPosition.current.y),
        });
      }
    },
    [size.height, size.width]
  );

  const handleMouseUp = (e: MouseEvent) => {
    resizing.current = false;
    setResizingState(false);
  };
  useEffect(() => {
    const handle = document.createElement("div");
    handle.setAttribute("style", handleStyle);
    handle.addEventListener<any>("mousedown", handleMouseDown);
    handle.addEventListener<any>("mousemove", handleMouseMove);
    handle.addEventListener<any>("mouseup", handleMouseUp);
    handle.addEventListener<any>("mouseleave", handleMouseUp);
    resizableRef.current?.append(handle);
    return () => {
      handle.addEventListener<any>("mousedown", handleMouseDown);
      handle.addEventListener<any>("mousemove", handleMouseMove);
      handle.addEventListener<any>("mouseup", handleMouseUp);
      handle.addEventListener<any>("mouseleave", handleMouseUp);
    };
  }, [handleMouseMove, resizableRef]);

  return {
    size: newSize,
    resizing: resizingState,
  };
};

export default useResize;
