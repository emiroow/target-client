export interface ITargetResponse {
  totalTodo?: number;
  totalDoneTodo?: number;
  totalPendingTodo?: number;
  _id?: string;
  title?: string;
  subTitle?: string;
  description?: string;
  emoji?: string;
  user?: string;
  board?: Board;
  status?: string;
  difficulty?: string;
  __v?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Board {
  _id?: string;
  backgroundImageUrl?: string;
  emoji?: string;
  name?: string;
  date?: Date;
  user?: string;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}
