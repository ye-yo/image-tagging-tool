import { useRef, useState, memo } from "react";
import styled, { css } from "styled-components";
import { ITagBox } from "../interfaces";
import { FiEdit2 } from "react-icons/fi";
import { VscChromeClose } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { remove, update } from "../store";

function Tag({ id, name }: ITagBox) {
  const dispatch = useDispatch();

  const inputRef = useRef<HTMLSpanElement | null>(null);
  const [editable, setEditable] = useState<boolean>(false);

  const handleEditTag = () => {
    setEditable(true);
  };

  const handleEndEdit = () => {
    if (inputRef.current) inputRef.current.scrollLeft = 0;
    dispatch(update({ id, name: inputRef.current?.innerText }));
    setEditable(false);
  };
  const handleRemoveTag = () => {
    dispatch(remove(id));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === "Enter") {
      handleEndEdit();
    }
  };

  return (
    <TagWrap key={id} editable={editable}>
      <EditInput
        ref={inputRef}
        contentEditable={editable}
        suppressContentEditableWarning={true}
        onKeyDown={handleKeyDown}
      >
        {name}
      </EditInput>
      <BtnEndEdit type="submit" onClick={handleEndEdit}>
        Done
      </BtnEndEdit>
      <FiEdit2 onClick={handleEditTag} />
      <VscChromeClose onClick={handleRemoveTag} />
    </TagWrap>
  );
}

export default memo(Tag);

interface ITagWrap {
  editable: boolean;
}
const TagWrap = styled.li`
  margin-bottom: 0.2rem;
  padding: 0.4rem;
  display: flex;
  transition: all 0.4s;
  svg {
    visibility: hidden;
    width: 1.2rem;
    height: 1.2rem;
    padding: 2px;
    cursor: pointer;
    :hover {
      opacity: 0.8;
    }
    display: ${({ editable }: ITagWrap) => (editable ? "none" : "initial")};
  }
  button {
    display: ${({ editable }: ITagWrap) => (editable ? "initial" : "none")};
  }

  :hover {
    background-color: #c3c3c31b;
    svg {
      visibility: visible;
    }
  }
`;

const EditInput = styled.span`
  max-width: 200px;
  min-width: 100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  flex: 1;
  margin-right: 16px;
  padding-top: 4px;
  ::before {
    content: "•";
    margin-right: 4px;
  }
  ${({ contentEditable }) =>
    contentEditable &&
    css`
      ::before {
        visibility: hidden;
      }
      border-bottom: 1px solid gray;
      text-overflow: clip;
    `}
`;

const BtnEndEdit = styled.button`
  background-color: #dddddd88;
  border: 0;
  padding: 4px;
  :hover {
    opacity: 0.8;
  }
`;
