import styled from "styled-components";
import TagList from "./TagList";

function Main() {
  return (
    <MainWrap>
      <CanvasWrap>
        <canvas></canvas>
      </CanvasWrap>
      <TagList />
    </MainWrap>
  );
}

export default Main;

const MainWrap = styled.main`
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
`;
const CanvasWrap = styled.main``;
