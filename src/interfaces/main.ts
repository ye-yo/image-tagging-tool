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
