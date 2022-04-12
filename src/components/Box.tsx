import { ITagBox, IBoxInfo } from "../interfaces";
import styled from "styled-components";
import { useEffect, useRef, memo } from "react";
import { useDispatch } from "react-redux";
import useDrag from "../hooks/useDrag";
import useResize from "../hooks/useResize";
import { update } from "../redux/store";

function Box({ id, width, height, x, y, name }: ITagBox) {
  const dispatch = useDispatch();
  const resizableRef = useRef<HTMLDivElement>(null);
  const { size, resizing } = useResize(resizableRef, {
    width,
    height,
  });
  const { position, dragEvents } = useDrag(
    document.getElementById("canvas"),
    {
      x,
      y,
    },
    resizing
  );

  useEffect(() => {
    dispatch(update({ id, ...position }));
  }, [dispatch, id, position]);

  useEffect(() => {
    if (!resizing) {
      dispatch(update({ id, ...size }));
    }
  }, [dispatch, id, resizing, size]);

  return (
    <BoxWrap
      ref={resizableRef}
      draggable
      key={id}
      width={size.width}
      height={size.height}
      x={x}
      y={y}
      {...dragEvents}
    >
      {name}
    </BoxWrap>
  );
}

export default memo(Box);

const BoxWrap = styled.div.attrs<IBoxInfo>(({ width, height, x, y }) => ({
  style: {
    width: `${width}px`,
    height: `${height}px`,
    top: `${y}px`,
    left: `${x}px`,
  },
}))<IBoxInfo>`
  position: absolute;
  border: 1px solid #3ed9b0;
  background-color: #a9ff6f33;
  padding: 1px;
  font-weight: 600;
  font-size: 1.2rem;
  line-height: 1.14;
  z-index: 2;

  cursor: pointer;
  :hover {
    background-color: #ff6f6f33;
  }
`;
