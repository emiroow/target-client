export interface ITaskResponse {
  _id?: string;
  checked?: boolean;
  title?: string;
  user?: string;
  target?: Target;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface Target {
  _id?: string;
  title?: string;
  subTitle?: string;
  description?: string;
  emoji?: string;
  totalTodo?: number;
  totalDoneTodo?: number;
  totalPendingTodo?: number;
  user?: string;
  board?: string;
  status?: string;
  difficulty?: string;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}
