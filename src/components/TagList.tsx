import styled from "styled-components";

function TagList() {
  return (
    <TagListWrap>
      <Tag>tag</Tag>
      <Tag>tag</Tag>
      <Tag>tag</Tag>
    </TagListWrap>
  );
}

export default TagList;

const TagListWrap = styled.ul`
  margin: 0 auto;
  position: absolute;
  top: 1rem;
  left: 1rem;
  background-color: white;
  padding: 1rem 1rem 1rem 2rem;
  min-width: 100px;
`;

const Tag = styled.li`
  list-style-type: disc;
  margin-bottom: 0.4rem;
  font-size: 1rem;
`;
