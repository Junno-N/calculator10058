import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  genreName: string = '';
  tagName: string = '';
  user:any;
  constructor() { }
}
