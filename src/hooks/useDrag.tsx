import { useState, useEffect, DragEvent } from "react";
import { ICoordinate } from "../interfaces";

const useDrag = (
  canvas: HTMLElement | null,
  position: ICoordinate,
  prevent: boolean
) => {
  const [startPosition, setStartPosition] = useState<ICoordinate>({
    x: 0,
    y: 0,
  });
  const [newPosition, setNewPosition] = useState<ICoordinate>(position);
  const [dragging, setDragging] = useState<boolean>(false);

  useEffect(() => {
    document?.addEventListener("dragover", (e) => e.preventDefault());
    return () => {
      canvas?.removeEventListener("dragover", (e) => e.preventDefault());
    };
  }, [canvas]);

  const getPosition = (e: DragEvent) => {
    return {
      x: position.x + (e.pageX - startPosition.x),
      y: position.y + (e.pageY - startPosition.y),
    };
  };
  const handleDragStart = (e: DragEvent) => {
    if (prevent) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.effectAllowed = "move";
    setDragging(true);
    setStartPosition({ x: e.pageX, y: e.pageY });
  };
  const handleDragEnd = (e: DragEvent) => {
    const img = new Image();
    e.dataTransfer.setDragImage(img, 0, 0);
    if (dragging) {
      updatePosition(e);
      setDragging(false);
    }
  };

  const updatePosition = (e: DragEvent) => {
    const pos = getPosition(e);
    if (pos.x < 0 || pos.y < 0) {
      return;
    }
    setNewPosition(pos);
  };

  return {
    dragging,
    position: newPosition,
    dragEvents: {
      onDragStart: handleDragStart,
      onDragEnd: handleDragEnd,
    },
  };
};

export default useDrag;
