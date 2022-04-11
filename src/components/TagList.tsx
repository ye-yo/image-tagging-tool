import { useSelector } from "react-redux";
import styled from "styled-components";
import { ITagBox } from "../interfaces";
import Tag from "./Tag";
import { TagState } from "../redux/store";

function TagList() {
  const tagList = useSelector((state: TagState) => state.tagList);
  return (
    <TagListWrap>
      <Title>Tag List</Title>
      {!tagList.length && <EmptyText>등록된 태그가 없습니다.</EmptyText>}
      {tagList.map((tag: ITagBox) => (
        <Tag {...tag} key={tag.id} />
      ))}
    </TagListWrap>
  );
}

export default TagList;

const TagListWrap = styled.ul`
  margin: 0 auto;
  position: absolute;
  top: 1rem;
  left: 1rem;
  background-color: #fff8;
  padding: 1rem;
  min-width: 120px;
  min-height: 120px;
  z-index: 2;
`;

const Title = styled.p`
  font-size: 1.4rem;
  margin-bottom: 1rem;
`;

const EmptyText = styled.div`
  color: #888;
`;
