export interface ICoordinate {
  x: number;
  y: number;
}

export interface IBoxInfo {
  x: number;
  y: number;
  width: number;
  height: number;
}
export interface ITagBox extends IBoxInfo {
  id: number;
  text: string;
}

export interface INewTagBox extends IBoxInfo {
  text: string;
}

export interface IUpdatedTagBox {
  id: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}
