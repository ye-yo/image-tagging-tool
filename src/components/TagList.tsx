import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { ITagBox } from "../interfaces";
import Tag from "./Tag";
import { TagState } from "../redux/store";
import { AiTwotoneFolderAdd, AiTwotoneFolderOpen } from "react-icons/ai";

function TagList() {
  const tagList = useSelector((state: TagState) => state.tagList);
  const [hide, setHide] = useState<boolean>(false);
  const toggleHide = () => {
    setHide((hide: boolean) => !hide);
  };
  return (
    <Wrap className={hide ? "hide" : ""}>
      <Title>
        Tag List
        <BtnHide
          onClick={toggleHide}
          as={hide ? AiTwotoneFolderAdd : AiTwotoneFolderOpen}
        />
      </Title>
      <div>
        <TagListWrap>
          {!tagList.length && <EmptyText>등록된 태그가 없습니다.</EmptyText>}
          {tagList.map((tag: ITagBox) => (
            <Tag {...tag} key={tag.id} />
          ))}
        </TagListWrap>
      </div>
    </Wrap>
  );
}

export default TagList;

const Wrap = styled.div`
  position: absolute;
  top: -2rem;
  left: 1rem;
  height: auto;
  div {
    min-width: 120px;
    overflow: hidden;
    transition: all 1.2s ease;
    max-height: 200px;
  }
  &.hide div {
    max-height: 0;
  }
  z-index: 10;
`;
const TagListWrap = styled.ul`
  padding: 1rem;
  background-color: #fff8;
`;

const Title = styled.p`
  font-size: 1.4rem;
  margin-bottom: 0.6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.4rem;
`;

const EmptyText = styled.div`
  color: #888;
`;

const BtnHide = styled(AiTwotoneFolderAdd)`
  color: #666;
  cursor: pointer;
  font-size: 1.2rem;
  p {
    opacity: 0;
    transition: opacity 1s;
  }
`;
