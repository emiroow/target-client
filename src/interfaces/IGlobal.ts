export interface IResponse<T = undefined> {
  massage?: string;
  status?: boolean;
  data?: T;
}
