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
  name: string;
}

export interface INewTagBox extends IBoxInfo {
  name: string;
}

export interface IUpdatedTagBox {
  id: number;
  name?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}
