import { ITagBox, INewTagBox, IUpdatedTagBox } from "./interfaces";

const ADD = "tag/ADD" as const;
const REMOVE = "tag/REMOVE" as const;
const UPDATE = "tag/UPDATE" as const;

export const add = (tagBox: INewTagBox) => ({
  type: ADD,
  payload: tagBox,
});
export const remove = (tagId: number) => ({
  type: REMOVE,
  payload: tagId,
});
export const update = (tagBox: IUpdatedTagBox) => ({
  type: UPDATE,
  payload: tagBox,
});

type TagAction =
  | ReturnType<typeof add>
  | ReturnType<typeof remove>
  | ReturnType<typeof update>;

export type TagState = {
  tagList: ITagBox[];
};

const initialState: TagState = {
  tagList: [],
};

function tagReducer(
  state: TagState = initialState,
  action: TagAction
): TagState {
  switch (action.type) {
    case ADD:
      const length = state.tagList.length;
      const lastId = length > 0 ? state.tagList[length - 1].id + 1 : 0;
      return {
        tagList: [...state.tagList, { id: lastId, ...action.payload }],
      };
    case REMOVE:
      return {
        tagList: state.tagList.filter(
          (item: { id: number }) => item.id !== action.payload
        ),
      };
    case UPDATE:
      return {
        tagList: state.tagList.map((item) =>
          item.id === action.payload.id ? { ...item, ...action.payload } : item
        ),
      };
    default:
      return state;
  }
}

export default tagReducer;
