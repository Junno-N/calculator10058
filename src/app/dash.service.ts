import { Timestamp } from "firebase/firestore";

export interface Task {
  id: string;
  title: string;
  status: string;
  priority: string;
  deadlineDate: Timestamp;
  user: string;
  genre:string;
}

export interface Genre {
  id: string;
  name: string;
}
