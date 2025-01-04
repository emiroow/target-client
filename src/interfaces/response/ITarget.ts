export interface ITargetResponse {
  totalTodo?: number;
  totalDoneTodo?: number;
  totalPendingTodo?: number;
  _id?: string;
  title?: string;
  subTitle?: string;
  description?: string;
  lastTargetHistory?: {
    _id?: string;
    checked?: boolean;
    title?: string;
    user?: string;
    target?: any;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
  }[];
  emoji?: string;
  user?: string;
  board?: Board;
  status?: string;
  difficulty?: string;
  __v?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Board {
  _id?: string;
  backgroundImageUrl?: string;
  emoji?: string;
  name?: string;
  date?: Date;
  user?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}
