import styled from "styled-components";

function Header() {
  return (
    <HeaderWrap>
      <h1>Image Tagging Tool</h1>
    </HeaderWrap>
  );
}

export default Header;

const HeaderWrap = styled.header`
  height: 64px;
  font-weight: bold;
  display: flex;
  align-items: center;
  font-size: 2rem;
  padding: 0 1rem;
`;
