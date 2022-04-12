import { ITagBox, IBoxInfo } from "../interfaces";
import styled, { css } from "styled-components";
import { useEffect, memo } from "react";
import { useDispatch } from "react-redux";
import useDrag from "../hooks/useDrag";
import { update } from "../redux/store";

function Box({ id, width, height, x, y, name }: ITagBox) {
  const dispatch = useDispatch();
  const { dragging, position, dragEvents } = useDrag(
    document.getElementById("canvas"),
    {
      x,
      y,
    }
  );

  useEffect(() => {
    dispatch(update({ id, ...position }));
  }, [dispatch, id, position]);

  return (
    <BoxWrap
      draggable
      key={id}
      width={width}
      height={height}
      x={x}
      y={y}
      {...dragEvents}
    >
      {name}
    </BoxWrap>
  );
}

export default memo(Box);

const BoxWrap = styled.div`
  position: absolute;
  border: 1px solid #3ed9b0;
  background-color: #a9ff6f33;
  padding: 1px;
  overflow: hidden;
  font-weight: 600;
  font-size: 1.2rem;
  line-height: 1.14;
  z-index: 2;
  ${({ width, height, x, y }: IBoxInfo) => css`
    width: ${width}px;
    height: ${height}px;
    top: ${y}px;
    left: ${x}px;
  `}
  cursor: pointer;
  :hover {
    background-color: #ff6f6f33;
  }
`;
