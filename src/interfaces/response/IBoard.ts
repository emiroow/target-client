export interface IBoardResponse {
  boardList?: BoardList[];
}

export interface BoardList {
  _id?: string;
  backgroundImageUrl?: string;
  emoji?: string;
  name?: string;
  date?: string;
  user?: string;
  createdAt?: string;
  updatedAt?: string;
  totalTargets?: number;
  __v?: number;
}
