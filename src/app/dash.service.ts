import { Timestamp } from "firebase/firestore";

export interface Task {
  id: string;
  title: string;
  status: string;
  priority: string;
  deadlineDate: Timestamp;
  user: string;
  genre:string;
  freeText:any;
  taskTime:any;
}

export interface Genre {
  [x: string]: unknown;
  id: string;
  name: string;
}
