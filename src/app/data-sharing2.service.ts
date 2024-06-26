import { Injectable } from '@angular/core';
import { getAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class DataSharing2Service {
  

  genreList?:any;
  tagList?:any;
  taskList?: any;
  id?: string;
  title?: string;
  description?: string;
  published?: boolean;
  published2?:string;
  genre?:string;
  tag?:string;
  status?: string;
  priority?:string;
  deadlineDate?: any;
  deadlineTime?: any;
  freeText?:string;
  Num?:number;
  rate?:number;
  user?:string;


  constructor() {}
}
