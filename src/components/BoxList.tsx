import { useSelector } from "react-redux";
import { ITagBox } from "../interfaces";
import Box from "./Box";
import { TagState } from "../redux/store";
import styled from "styled-components";

function BoxList() {
  const tagList = useSelector((state: TagState) => state.tagList);
  return (
    <BoxListWrap>
      {tagList.map((box: ITagBox) => (
        <Box key={box.id} {...box} />
      ))}
    </BoxListWrap>
  );
}

export default BoxList;

const BoxListWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
